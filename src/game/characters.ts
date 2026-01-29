import { IkemenRank } from '@/types';

// ===== イケメンID（恋愛対象） =====
export type IkemenId =
  | 'lucia'
  | 'kagerou'
  | 'haruto'
  | 'ren'
  | 'mizuki'
  | 'souma'
  | 'yukito'
  | 'riku'
  | 'aoi'
  | 'shion';

// ===== 特殊キャラID（恋愛対象外） =====
export type SpecialCharacterId = 'zephyros' | 'rosa';

// ===== 全キャラクターID =====
export type CharacterId = IkemenId | SpecialCharacterId;

// ===== キャラクター基本情報 =====
export interface CharacterBase {
  id: CharacterId;
  name: string;
  attribute: string;
  icon: string;
  role: string;
  description: string;
  isRomanceable: boolean;
}

// ===== イケメンキャラクター詳細 =====
export interface IkemenCharacter extends CharacterBase {
  id: IkemenId;
  rank: IkemenRank;
  marriageGlamorReq: number;  // 結婚に必要な幻装レベル
  metaParameterWeights: {
    luxury: number;    // 豪華度への反応（-10〜10）
    volume: number;    // ボリュームへの反応
    healing: number;   // 癒し度への反応
    stability: number; // 安定度への反応
    mystery: number;   // 神秘度への反応
  };
  visitTimePreference: 'morning' | 'noon' | 'evening' | 'night' | 'any';
  favoriteMenuCategories: ('drink' | 'food' | 'sweet')[];
  baseVisitChance: number;  // 基本来店確率（0-100）
}

// ===== イケメンキャラクター定義 =====
export const IKEMEN_CHARACTERS: Record<IkemenId, IkemenCharacter> = {
  lucia: {
    id: 'lucia',
    name: 'ルシア',
    attribute: '光',
    icon: '✨',
    role: 'Holy Prince',
    description: '眩い光を纏う王立騎士団の若きリーダー。誠実で優雅な振る舞いは、多くの女性客を虜にする。',
    isRomanceable: true,
    rank: 'royal',
    marriageGlamorReq: 6,
    metaParameterWeights: {
      luxury: 10,    // 高級志向
      volume: -2,    // 量より質
      healing: 5,    // 癒しも好む
      stability: 3,  // 安定した店を好む
      mystery: 0,
    },
    visitTimePreference: 'noon',
    favoriteMenuCategories: ['sweet', 'drink'],
    baseVisitChance: 15,
  },

  kagerou: {
    id: 'kagerou',
    name: 'カゲロウ',
    attribute: '闇',
    icon: '🌑',
    role: 'Silent Shadow',
    description: '影に潜む謎多き忍び。無口だが、時折見せる鋭い眼差しと優しさに中毒者が続出している。',
    isRomanceable: true,
    rank: 'noble',
    marriageGlamorReq: 5,
    metaParameterWeights: {
      luxury: 2,
      volume: 0,
      healing: 3,
      stability: 0,
      mystery: 10,   // 神秘的な雰囲気を好む
    },
    visitTimePreference: 'night',
    favoriteMenuCategories: ['drink'],
    baseVisitChance: 10,
  },

  haruto: {
    id: 'haruto',
    name: 'ハルト',
    attribute: '風',
    icon: '🍃',
    role: 'Freedom Wings',
    description: '風のように自由奔放な吟遊詩人。彼の奏でる調べは疲れた心を癒し、店内に爽やかな風を運ぶ。',
    isRomanceable: true,
    rank: 'knight',
    marriageGlamorReq: 4,
    metaParameterWeights: {
      luxury: 0,
      volume: 3,
      healing: 8,    // 癒し系が大好き
      stability: -2, // 自由人なので安定より変化を好む
      mystery: 2,
    },
    visitTimePreference: 'any',
    favoriteMenuCategories: ['drink', 'sweet'],
    baseVisitChance: 25,
  },

  ren: {
    id: 'ren',
    name: 'レン',
    attribute: '炎',
    icon: '🔥',
    role: 'Burning Passion',
    description: '情熱的な若き料理人。熱血漢で真っ直ぐな性格は、周囲を熱く活気づかせる。',
    isRomanceable: true,
    rank: 'knight',
    marriageGlamorReq: 4,
    metaParameterWeights: {
      luxury: 0,
      volume: 10,    // ボリューム重視！
      healing: 0,
      stability: 5,  // しっかりした経営を好む
      mystery: -3,
    },
    visitTimePreference: 'noon',
    favoriteMenuCategories: ['food'],
    baseVisitChance: 20,
  },

  mizuki: {
    id: 'mizuki',
    name: 'ミズキ',
    attribute: '水',
    icon: '💧',
    role: 'Calm Stream',
    description: '冷静沈着で知的な魔導士。静かな佇まいと透き通るような美しさがカフェの品格を高めている。',
    isRomanceable: true,
    rank: 'noble',
    marriageGlamorReq: 5,
    metaParameterWeights: {
      luxury: 5,
      volume: -5,    // 少量で上品なものを好む
      healing: 7,    // 紅茶が好き
      stability: 5,
      mystery: 3,
    },
    visitTimePreference: 'evening',
    favoriteMenuCategories: ['drink'],
    baseVisitChance: 15,
  },

  souma: {
    id: 'souma',
    name: 'ソウマ',
    attribute: '雷',
    icon: '⚡',
    role: 'Flash Beast',
    description: '野性味溢れる雷の戦士。粗野に見えるが、動物や子供には優しい一面を持つ。',
    isRomanceable: true,
    rank: 'commoner',
    marriageGlamorReq: 3,
    metaParameterWeights: {
      luxury: -5,    // 高級品より庶民的なものを好む
      volume: 8,     // 大食い
      healing: 0,
      stability: 0,
      mystery: 0,
    },
    visitTimePreference: 'any',
    favoriteMenuCategories: ['food', 'sweet'],
    baseVisitChance: 30,
  },

  yukito: {
    id: 'yukito',
    name: 'ユキト',
    attribute: '氷',
    icon: '❄️',
    role: 'Ice Duke',
    description: '孤高の冷徹公爵。氷のように冷たい態度の裏に、深い孤独を抱えている。',
    isRomanceable: true,
    rank: 'royal',
    marriageGlamorReq: 6,
    metaParameterWeights: {
      luxury: 10,    // 最高級のみ
      volume: -8,    // 質重視
      healing: 3,
      stability: 8,  // 格式ある店を好む
      mystery: 5,
    },
    visitTimePreference: 'evening',
    favoriteMenuCategories: ['drink', 'sweet'],
    baseVisitChance: 5,  // 来店しにくい
  },

  riku: {
    id: 'riku',
    name: 'リク',
    attribute: '土',
    icon: '⛰️',
    role: 'Solid Guardian',
    description: '包容力のある巨漢の鍛冶師。誰よりも頼りになる、街の守り手。',
    isRomanceable: true,
    rank: 'knight',
    marriageGlamorReq: 4,
    metaParameterWeights: {
      luxury: 0,
      volume: 5,
      healing: 3,
      stability: 10,  // 安定経営を最も重視
      mystery: -3,
    },
    visitTimePreference: 'morning',
    favoriteMenuCategories: ['food', 'drink'],
    baseVisitChance: 20,
  },

  aoi: {
    id: 'aoi',
    name: 'アオイ',
    attribute: '星',
    icon: '⭐',
    role: 'Starlight Seer',
    description: '未来を見通す謎の少年。幼い外見に反して、深遠な知識を持つ。',
    isRomanceable: true,
    rank: 'commoner',
    marriageGlamorReq: 3,
    metaParameterWeights: {
      luxury: 0,
      volume: 0,
      healing: 5,
      stability: 0,
      mystery: 10,   // 神秘的なものに惹かれる
    },
    visitTimePreference: 'night',
    favoriteMenuCategories: ['sweet', 'drink'],
    baseVisitChance: 15,
  },

  shion: {
    id: 'shion',
    name: 'シオン',
    attribute: '森',
    icon: '🌳',
    role: 'Forest Sage',
    description: '自然を愛する森の賢者。主人公のカフェ経営を導く、頼れるアドバイザー。千年の孤独を抱える最後の賢者。',
    isRomanceable: true,
    rank: 'noble',
    marriageGlamorReq: 5,
    metaParameterWeights: {
      luxury: 3,
      volume: 0,
      healing: 8,
      stability: 5,
      mystery: 5,
    },
    visitTimePreference: 'any',
    favoriteMenuCategories: ['drink', 'sweet'],
    baseVisitChance: 100,  // 常駐（特殊）
  },
};

// ===== 特殊キャラクター定義 =====
export interface SpecialCharacter extends CharacterBase {
  id: SpecialCharacterId;
  appearanceCondition: string;  // 出現条件の説明
}

export const SPECIAL_CHARACTERS: Record<SpecialCharacterId, SpecialCharacter> = {
  zephyros: {
    id: 'zephyros',
    name: 'ゼフィロス',
    attribute: '金',
    icon: '💰',
    role: 'Golden Tyrant',
    description: '街で幅を利かせる成金妖精。紳士的な仮面の下に冷酷な本性を隠す。高利貸しと不正契約で富を築いた悪徳商人。',
    isRomanceable: false,
    appearanceCondition: '資金が20,000G以下になると出現',
  },
  rosa: {
    id: 'rosa',
    name: 'マッスル・ローザ',
    attribute: '花',
    icon: '🌹',
    role: 'Flower Guardian',
    description: '元冒険者の花屋店主。筋肉と優しさで主人公を守る姐御肌。ゼフィロスの悪事を知る数少ない人物。',
    isRomanceable: false,
    appearanceCondition: 'Day 5で初登場、ピンチ時に助けてくれる',
  },
};

// ===== 全キャラクター統合 =====
export const CHARACTERS: Record<CharacterId, CharacterBase> = {
  ...IKEMEN_CHARACTERS,
  ...SPECIAL_CHARACTERS,
};

// ===== リスト形式 =====
export const IKEMEN_LIST = Object.values(IKEMEN_CHARACTERS);
export const SPECIAL_CHARACTER_LIST = Object.values(SPECIAL_CHARACTERS);
export const CHARACTER_LIST = Object.values(CHARACTERS);

// ===== 階級別イケメンリスト =====
export const IKEMEN_BY_RANK: Record<IkemenRank, IkemenCharacter[]> = {
  royal: IKEMEN_LIST.filter(c => c.rank === 'royal'),
  noble: IKEMEN_LIST.filter(c => c.rank === 'noble'),
  knight: IKEMEN_LIST.filter(c => c.rank === 'knight'),
  commoner: IKEMEN_LIST.filter(c => c.rank === 'commoner'),
};

// ===== ヘルパー関数 =====

/**
 * キャラクターIDからキャラクター情報を取得
 */
export const getCharacter = (id: CharacterId): CharacterBase | undefined => {
  return CHARACTERS[id];
};

/**
 * イケメンIDからイケメン情報を取得
 */
export const getIkemen = (id: IkemenId): IkemenCharacter | undefined => {
  return IKEMEN_CHARACTERS[id];
};

/**
 * 結婚可能かどうかを判定
 */
export const canMarry = (ikemenId: IkemenId, glamorLevel: number, affection: number): boolean => {
  const ikemen = IKEMEN_CHARACTERS[ikemenId];
  if (!ikemen) return false;
  
  const requiredAffection = 1000; // 好感度MAX
  return glamorLevel >= ikemen.marriageGlamorReq && affection >= requiredAffection;
};

/**
 * 結婚に必要な幻装レベルを取得
 */
export const getRequiredGlamorForMarriage = (ikemenId: IkemenId): number => {
  const ikemen = IKEMEN_CHARACTERS[ikemenId];
  return ikemen?.marriageGlamorReq ?? 6;
};

/**
 * 階級の日本語名を取得
 */
export const getRankLabel = (rank: IkemenRank): string => {
  const labels: Record<IkemenRank, string> = {
    royal: '王族',
    noble: '貴族',
    knight: '騎士',
    commoner: '庶民',
  };
  return labels[rank];
};

/**
 * シオン以外のイケメンリスト（来店判定用）
 */
export const VISITABLE_IKEMEN_LIST = IKEMEN_LIST.filter(c => c.id !== 'shion');
