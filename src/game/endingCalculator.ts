// src/game/endingCalculator.ts
// エンディング判定システム - Day100でのエンディング分岐を管理

import { IkemenId, EndingType } from '@/types';
import { IKEMEN_CHARACTERS, canMarry, getRequiredGlamorForMarriage, getRankLabel } from './characters';

/**
 * エンディングの種類
 */
export type EndingCategory = 
  | 'true_end'      // トゥルーエンド（シオン + 最高条件）
  | 'marriage_end'  // 結婚エンド（各イケメン）
  | 'unrequited_end' // 片思いエンド（好感度MAXだが条件不足）
  | 'success_end'   // 経営成功エンド
  | 'normal_end'    // 通常エンド
  | 'bad_end_debt'  // バッドエンド（借金）
  | 'bad_end_bankrupt'; // バッドエンド（破産）

/**
 * エンディング結果
 */
export interface EndingResult {
  category: EndingCategory;
  title: string;
  subtitle: string;
  description: string;
  partnerId?: IkemenId;
  partnerName?: string;
  achievements: string[];
  unlocks: string[];
  score: number;
}

/**
 * エンディング判定に必要なステート
 */
export interface EndingJudgementState {
  day: number;
  money: number;
  debt: number;
  reputation: number;
  glamor: {
    level: number;
    points: number;
  };
  affection: Record<IkemenId, number>;
  flags: Record<string, boolean | string | number>;
  completedScenarios: string[];
}

/**
 * 経営成績の判定基準
 */
export const BUSINESS_THRESHOLDS = {
  outstanding: 500000,  // 経営大成功
  success: 100000,      // 経営成功
  survive: 0,           // 経営継続
  // 0未満または借金ありは失敗
};

/**
 * 好感度MAXの閾値
 */
export const AFFECTION_MAX_THRESHOLD = 1000;

/**
 * エンディングを判定
 */
export function calculateEnding(state: EndingJudgementState): EndingResult {
  // 1. バッドエンドチェック（最優先）
  const badEnd = checkBadEnding(state);
  if (badEnd) return badEnd;
  
  // 2. トゥルーエンドチェック（シオン特別ルート）
  const trueEnd = checkTrueEnding(state);
  if (trueEnd) return trueEnd;
  
  // 3. 結婚エンドチェック（好感度MAX + 幻装条件）
  const marriageEnd = checkMarriageEnding(state);
  if (marriageEnd) return marriageEnd;
  
  // 4. 片思いエンドチェック（好感度MAXだが幻装不足）
  const unrequitedEnd = checkUnrequitedEnding(state);
  if (unrequitedEnd) return unrequitedEnd;
  
  // 5. 経営成功エンドチェック
  const successEnd = checkSuccessEnding(state);
  if (successEnd) return successEnd;
  
  // 6. 通常エンド（上記のいずれにも該当しない）
  return getNormalEnding(state);
}

/**
 * バッドエンドをチェック
 */
function checkBadEnding(state: EndingJudgementState): EndingResult | null {
  // 借金バッドエンド
  if (state.flags['bad_end_debt'] === true) {
    return {
      category: 'bad_end_debt',
      title: 'Bad End',
      subtitle: '金色の籠',
      description: 'ゼフィロスの罠に落ち、借金を返せなくなった私は、カフェと自由を失った。金色に輝く籠の中で、永遠に働き続ける日々が始まる...',
      achievements: ['借金地獄'],
      unlocks: [],
      score: 0
    };
  }
  
  // 破産バッドエンド
  if (state.money < 0 && state.debt > 0) {
    return {
      category: 'bad_end_bankrupt',
      title: 'Bad End',
      subtitle: '夢の終わり',
      description: '資金が尽き、カフェを続けることができなくなった。祖母の遺したこの場所を守れなかった悔しさを胸に、私は森を去った...',
      achievements: ['閉店'],
      unlocks: [],
      score: 0
    };
  }
  
  return null;
}

/**
 * トゥルーエンドをチェック（シオン専用）
 */
function checkTrueEnding(state: EndingJudgementState): EndingResult | null {
  const shionAffection = state.affection['shion'] || 0;
  const isRouteComplete = state.flags['shion_route_complete'] === true;
  const sealRestored = state.flags['seal_restored'] === true;
  const isOutstanding = state.money >= BUSINESS_THRESHOLDS.outstanding;
  const isMaxGlamor = state.glamor.level >= 6;
  
  // 全条件を満たす場合のみトゥルーエンド
  if (
    shionAffection >= AFFECTION_MAX_THRESHOLD &&
    isRouteComplete &&
    sealRestored &&
    isOutstanding &&
    isMaxGlamor
  ) {
    return {
      category: 'true_end',
      title: 'True End',
      subtitle: '永遠の森',
      description: '封印を守り、カフェを大成功に導き、そしてシオンと永遠の絆を結んだ。千年の孤独を終わらせ、二人は森と共に永遠の時を歩み始める。これは、最も幸せな結末——',
      partnerId: 'shion',
      partnerName: 'シオン',
      achievements: [
        '森の守護者との絆',
        '封印の完全修復',
        '経営大成功',
        '最高位の幻装',
        '真実の愛'
      ],
      unlocks: [
        'ギャラリー：トゥルーエンドCG',
        'サウンド：永遠の森',
        'おまけシナリオ：千年後の物語'
      ],
      score: 10000
    };
  }
  
  return null;
}

/**
 * 結婚エンドをチェック
 */
function checkMarriageEnding(state: EndingJudgementState): EndingResult | null {
  // 好感度MAXかつ結婚可能なイケメンを探す
  const marriageCandidates: { id: IkemenId; affection: number }[] = [];
  
  const ikemenIds: IkemenId[] = [
    'lucia', 'kagerou', 'haruto', 'ren', 'mizuki',
    'souma', 'yukito', 'riku', 'aoi', 'shion'
  ];
  
  for (const id of ikemenIds) {
    const affection = state.affection[id] || 0;
    if (affection >= AFFECTION_MAX_THRESHOLD) {
      if (canMarry(id, state.glamor.level, affection)) {
        marriageCandidates.push({ id, affection });
      }
    }
  }
  
  // 最も好感度の高いキャラを選択
  if (marriageCandidates.length > 0) {
    marriageCandidates.sort((a, b) => b.affection - a.affection);
    const partner = marriageCandidates[0];
    const ikemen = IKEMEN_CHARACTERS[partner.id];
    
    return getMarriageEndingForCharacter(partner.id, ikemen.name, state);
  }
  
  return null;
}

/**
 * キャラクター別の結婚エンド内容を取得
 */
function getMarriageEndingForCharacter(
  id: IkemenId,
  name: string,
  state: EndingJudgementState
): EndingResult {
  const ikemen = IKEMEN_CHARACTERS[id];
  const rankLabel = getRankLabel(ikemen.rank);
  const isSuccess = state.money >= BUSINESS_THRESHOLDS.success;
  
  // キャラクター別のエンディング内容
  const endingDetails: Record<IkemenId, { subtitle: string; description: string }> = {
    lucia: {
      subtitle: '光の王宮へ',
      description: `妖精王国の第一王子ルシアと結ばれた私は、光の王宮へと迎えられた。カフェは信頼できる者に任せ、私は王妃として、そして永遠にルシアの傍で生きていく。`
    },
    yukito: {
      subtitle: '雪の国の姫',
      description: `雪の国の王子ユキトと結ばれ、私は極北の美しい国へと旅立った。厳しい寒さの中でも、ユキトの温かさに包まれて、幸せな日々を送っている。`
    },
    kagerou: {
      subtitle: '影と光の契り',
      description: `影の一族の当主カゲロウと結ばれた。光と影、対照的な二人だが、だからこそ惹かれ合う。彼の影の中で、私は永遠の安らぎを見つけた。`
    },
    mizuki: {
      subtitle: '水鏡の誓い',
      description: `水の一族の長ミズキと結ばれた。清らかな湖のほとりで誓いを交わし、私たちは穏やかな日々を過ごしている。`
    },
    shion: {
      subtitle: '森の花嫁',
      description: `森の守護者シオンと結ばれた。千年の時を経て、彼はようやく孤独から解放された。私たちは森と共に、永遠の時を歩んでいく。`
    },
    haruto: {
      subtitle: '騎士の誓い',
      description: `王国騎士団のハルトと結ばれた。彼は私を守ると誓い、私は彼を支えると誓った。二人で歩む未来は、希望に満ちている。`
    },
    ren: {
      subtitle: '剣と愛と',
      description: `剣士レンと結ばれた。無口で不器用な彼だが、その愛情は誰よりも深い。静かで穏やかな、幸せな日々が続いている。`
    },
    riku: {
      subtitle: '大地の絆',
      description: `農家の青年リクと結ばれた。彼と一緒に畑を耕し、カフェを営む。素朴だけれど、何よりも幸せな日々。`
    },
    souma: {
      subtitle: '風と自由と',
      description: `旅人ソウマと結ばれた。彼と共に世界を旅しながら、各地でカフェを開く。自由で冒険に満ちた人生が始まった。`
    },
    aoi: {
      subtitle: '歌声と共に',
      description: `吟遊詩人アオイと結ばれた。彼の歌声と私の珈琲。二人でカフェを営みながら、人々に癒しを届ける日々。`
    }
  };
  
  const details = endingDetails[id] || {
    subtitle: `${name}との幸せ`,
    description: `${name}と結ばれ、幸せな日々を過ごしている。`
  };
  
  const achievements = [
    `${name}との結婚`,
    `${rankLabel}との縁`,
    isSuccess ? '経営成功' : '経営継続'
  ];
  
  const score = calculateEndingScore(state, id);
  
  return {
    category: 'marriage_end',
    title: 'Happy End',
    subtitle: details.subtitle,
    description: details.description,
    partnerId: id,
    partnerName: name,
    achievements,
    unlocks: [
      `ギャラリー：${name}エンディングCG`,
      `サウンド：${name}のテーマ`
    ],
    score
  };
}

/**
 * 片思いエンドをチェック
 */
function checkUnrequitedEnding(state: EndingJudgementState): EndingResult | null {
  // 好感度MAXだが結婚条件を満たさないイケメンを探す
  const unrequitedCandidates: { id: IkemenId; affection: number; requiredGlamor: number }[] = [];
  
  const ikemenIds: IkemenId[] = [
    'lucia', 'kagerou', 'haruto', 'ren', 'mizuki',
    'souma', 'yukito', 'riku', 'aoi', 'shion'
  ];
  
  for (const id of ikemenIds) {
    const affection = state.affection[id] || 0;
    if (affection >= AFFECTION_MAX_THRESHOLD) {
      const requiredGlamor = getRequiredGlamorForMarriage(id);
      if (state.glamor.level < requiredGlamor) {
        unrequitedCandidates.push({ id, affection, requiredGlamor });
      }
    }
  }
  
  // 最も好感度の高いキャラを選択
  if (unrequitedCandidates.length > 0) {
    unrequitedCandidates.sort((a, b) => b.affection - a.affection);
    const target = unrequitedCandidates[0];
    const ikemen = IKEMEN_CHARACTERS[target.id];
    const rankLabel = getRankLabel(ikemen.rank);
    
    return {
      category: 'unrequited_end',
      title: 'Bittersweet End',
      subtitle: '届かぬ想い',
      description: `${ikemen.name}への想いは本物だった。でも、${rankLabel}である彼と結ばれるには、私の幻装が足りなかった。いつか届く日を信じて、私は今日もカフェを続ける...`,
      partnerId: target.id,
      partnerName: ikemen.name,
      achievements: [
        `${ikemen.name}への想い`,
        '身分の壁'
      ],
      unlocks: [],
      score: calculateEndingScore(state, target.id) * 0.7
    };
  }
  
  return null;
}

/**
 * 経営成功エンドをチェック
 */
function checkSuccessEnding(state: EndingJudgementState): EndingResult | null {
  if (state.money >= BUSINESS_THRESHOLDS.outstanding) {
    return {
      category: 'success_end',
      title: 'Good End',
      subtitle: '繁盛カフェ',
      description: 'カフェは大繁盛し、森一番の人気店になった。祖母の遺志を継ぎ、私は今日も笑顔でお客様を迎える。恋愛は...まだこれからかもしれない。',
      achievements: [
        '経営大成功',
        '森一番の人気店',
        '祖母の遺志'
      ],
      unlocks: [
        'ギャラリー：繁盛カフェCG'
      ],
      score: calculateEndingScore(state)
    };
  }
  
  if (state.money >= BUSINESS_THRESHOLDS.success) {
    return {
      category: 'success_end',
      title: 'Good End',
      subtitle: '順調な経営',
      description: 'カフェの経営は軌道に乗り、安定した日々を送っている。大成功とは言えないが、祖母も喜んでくれているはず。',
      achievements: [
        '経営成功',
        '安定経営'
      ],
      unlocks: [],
      score: calculateEndingScore(state)
    };
  }
  
  return null;
}

/**
 * 通常エンドを取得
 */
function getNormalEnding(state: EndingJudgementState): EndingResult {
  return {
    category: 'normal_end',
    title: 'Normal End',
    subtitle: '日々は続く',
    description: '大きな成功も、大きな失敗もなく、100日が過ぎた。カフェは細々と続いている。祖母の店を守れたことに、小さな誇りを感じながら...',
    achievements: [
      '100日経過',
      'カフェ存続'
    ],
    unlocks: [],
    score: calculateEndingScore(state)
  };
}

/**
 * エンディングスコアを計算
 */
function calculateEndingScore(
  state: EndingJudgementState,
  partnerId?: IkemenId
): number {
  let score = 0;
  
  // 資金スコア
  score += Math.floor(state.money / 100);
  
  // 評判スコア
  score += state.reputation * 10;
  
  // 幻装スコア
  score += state.glamor.level * 100;
  score += state.glamor.points;
  
  // 好感度スコア
  const totalAffection = Object.values(state.affection).reduce((sum, val) => sum + val, 0);
  score += totalAffection;
  
  // パートナーボーナス
  if (partnerId) {
    const partnerAffection = state.affection[partnerId] || 0;
    score += partnerAffection * 2;
    
    const ikemen = IKEMEN_CHARACTERS[partnerId];
    if (ikemen) {
      // 階級ボーナス
      const rankBonus: Record<string, number> = {
        royal: 500,
        noble: 300,
        knight: 200,
        commoner: 100
      };
      score += rankBonus[ikemen.rank] || 0;
    }
  }
  
  // シナリオ完了ボーナス
  score += state.completedScenarios.length * 50;
  
  return Math.floor(score);
}

/**
 * エンディング到達可能性をチェック
 */
export function checkEndingPossibility(state: EndingJudgementState): {
  trueEnd: { possible: boolean; requirements: string[] };
  marriageEnds: { id: IkemenId; name: string; possible: boolean; requirements: string[] }[];
  successEnd: { possible: boolean; requirements: string[] };
} {
  const result = {
    trueEnd: { possible: false, requirements: [] as string[] },
    marriageEnds: [] as { id: IkemenId; name: string; possible: boolean; requirements: string[] }[],
    successEnd: { possible: false, requirements: [] as string[] }
  };
  
  // トゥルーエンド
  const trueEndReqs: string[] = [];
  if ((state.affection['shion'] || 0) < AFFECTION_MAX_THRESHOLD) {
    trueEndReqs.push(`シオンの好感度をMAX(${AFFECTION_MAX_THRESHOLD})にする`);
  }
  if (state.flags['shion_route_complete'] !== true) {
    trueEndReqs.push('シオンルートを完了する');
  }
  if (state.money < BUSINESS_THRESHOLDS.outstanding) {
    trueEndReqs.push(`資金を${BUSINESS_THRESHOLDS.outstanding.toLocaleString()}G以上にする`);
  }
  if (state.glamor.level < 6) {
    trueEndReqs.push('幻装レベルを6にする');
  }
  result.trueEnd.possible = trueEndReqs.length === 0;
  result.trueEnd.requirements = trueEndReqs;
  
  // 各イケメンの結婚エンド
  const ikemenIds: IkemenId[] = [
    'lucia', 'kagerou', 'haruto', 'ren', 'mizuki',
    'souma', 'yukito', 'riku', 'aoi', 'shion'
  ];
  
  for (const id of ikemenIds) {
    const ikemen = IKEMEN_CHARACTERS[id];
    const reqs: string[] = [];
    const affection = state.affection[id] || 0;
    
    if (affection < AFFECTION_MAX_THRESHOLD) {
      reqs.push(`好感度をMAX(${AFFECTION_MAX_THRESHOLD})にする`);
    }
    
    const requiredGlamor = getRequiredGlamorForMarriage(id);
    if (state.glamor.level < requiredGlamor) {
      reqs.push(`幻装レベルを${requiredGlamor}以上にする`);
    }
    
    result.marriageEnds.push({
      id,
      name: ikemen.name,
      possible: reqs.length === 0,
      requirements: reqs
    });
  }
  
  // 経営成功エンド
  const successReqs: string[] = [];
  if (state.money < BUSINESS_THRESHOLDS.success) {
    successReqs.push(`資金を${BUSINESS_THRESHOLDS.success.toLocaleString()}G以上にする`);
  }
  result.successEnd.possible = successReqs.length === 0;
  result.successEnd.requirements = successReqs;
  
  return result;
}

/**
 * Day100までの残り日数を計算
 */
export function getDaysUntilEnding(currentDay: number): number {
  return Math.max(0, 100 - currentDay);
}

/**
 * エンディングカテゴリの日本語名を取得
 */
export function getEndingCategoryLabel(category: EndingCategory): string {
  const labels: Record<EndingCategory, string> = {
    true_end: 'トゥルーエンド',
    marriage_end: '結婚エンド',
    unrequited_end: '片思いエンド',
    success_end: '経営成功エンド',
    normal_end: 'ノーマルエンド',
    bad_end_debt: 'バッドエンド（借金）',
    bad_end_bankrupt: 'バッドエンド（破産）'
  };
  return labels[category] || category;
}

/**
 * デバッグ用：エンディング判定状況を出力
 */
export function debugEndingStatus(state: EndingJudgementState): void {
  console.log('=== エンディング判定状況 ===');
  console.log(`Day: ${state.day} / 100`);
  console.log(`残り日数: ${getDaysUntilEnding(state.day)}`);
  console.log(`資金: ${state.money.toLocaleString()}G`);
  console.log(`借金: ${state.debt.toLocaleString()}G`);
  console.log(`評判: ${state.reputation}`);
  console.log(`幻装Lv: ${state.glamor.level}`);
  
  console.log('\n【好感度】');
  Object.entries(state.affection).forEach(([id, value]) => {
    if (value > 0) {
      const max = value >= AFFECTION_MAX_THRESHOLD ? ' (MAX)' : '';
      console.log(`  ${id}: ${value}${max}`);
    }
  });
  
  const possibility = checkEndingPossibility(state);
  
  console.log('\n【到達可能なエンディング】');
  if (possibility.trueEnd.possible) {
    console.log('  ✓ トゥルーエンド');
  }
  possibility.marriageEnds.forEach(me => {
    if (me.possible) {
      console.log(`  ✓ 結婚エンド（${me.name}）`);
    }
  });
  if (possibility.successEnd.possible) {
    console.log('  ✓ 経営成功エンド');
  }
  
  console.log('\n【現在の判定結果】');
  const ending = calculateEnding(state);
  console.log(`  ${getEndingCategoryLabel(ending.category)}: ${ending.subtitle}`);
  console.log(`  スコア: ${ending.score}`);
}
