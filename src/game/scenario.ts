import { CharacterId } from './characters';

// シナリオイベントの種類
export type ScenarioEventType = 
  | 'dialogue'      // 会話
  | 'choice'        // 選択肢
  | 'narration'     // ナレーション
  | 'effect'        // 効果（お金増減、評判変動など）
  | 'image'         // 立ち絵変更
  | 'background';   // 背景変更

// 選択肢の結果
export interface ChoiceOption {
  text: string;
  nextEventId: string;
  effects?: {
    money?: number;
    reputation?: number;
    affection?: { characterId: CharacterId; amount: number };
    flag?: { key: string; value: boolean | string | number };
  };
}

// シナリオイベント
export interface ScenarioEvent {
  id: string;
  type: ScenarioEventType;
  speaker?: CharacterId | 'protagonist' | 'narration';
  speakerName?: string; // カスタム名（「？？？」など）
  text?: string;
  emotion?: 'normal' | 'happy' | 'sad' | 'angry' | 'surprised' | 'smirk';
  choices?: ChoiceOption[];
  effects?: {
    money?: number;
    reputation?: number;
    flag?: { key: string; value: boolean | string | number };
  };
  background?: string;
  nextEventId?: string | null; // nullで終了
}

// シナリオチャプター
export interface ScenarioChapter {
  id: string;
  title: string;
  description: string;
  triggerCondition: {
    day?: number;           // 特定の日
    dayRange?: [number, number]; // 日数範囲
    reputation?: number;    // 評判が一定以上
    money?: number;         // 資金が一定以上
    flag?: { key: string; value: boolean | string | number };
  };
  events: ScenarioEvent[];
  isCompleted?: boolean;
}

// ============================================
// シナリオデータ
// ============================================

export const SCENARIO_CHAPTERS: ScenarioChapter[] = [
  // ============================================
  // 第1章: 順調な滑り出し（Day 1〜7）
  // ============================================
  {
    id: 'chapter1_rosa_intro',
    title: '花屋の姐さん',
    description: 'マッスル・ローザとの出会い',
    triggerCondition: { day: 5 },
    events: [
      {
        id: 'ch1_rosa_1',
        type: 'narration',
        text: '営業を終えて店内を片付けていると、ドアベルが鳴った。',
        nextEventId: 'ch1_rosa_2',
      },
      {
        id: 'ch1_rosa_2',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: '？？？',
        text: 'ちょっと、まだやってる？ 花届けに来たんだけど。',
        emotion: 'normal',
        nextEventId: 'ch1_rosa_3',
      },
      {
        id: 'ch1_rosa_3',
        type: 'narration',
        text: '振り返ると、そこには…身長2メートルはあろうかという筋骨隆々の人物が立っていた。\nピンクのエプロンとリボンを身につけ、腕には色とりどりの花束を抱えている。',
        nextEventId: 'ch1_rosa_4',
      },
      {
        id: 'ch1_rosa_4',
        type: 'dialogue',
        speaker: 'protagonist',
        text: 'え、えっと…花…ですか？',
        nextEventId: 'ch1_rosa_5',
      },
      {
        id: 'ch1_rosa_5',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'マッスル・ローザ',
        text: 'そ。隣で花屋やってるローザよ。あんた、新しくここ始めたんでしょ？\n開店祝い、持ってきてあげたの。',
        emotion: 'normal',
        nextEventId: 'ch1_rosa_6',
      },
      {
        id: 'ch1_rosa_6',
        type: 'dialogue',
        speaker: 'protagonist',
        text: 'あ、ありがとうございます！嬉しいです！',
        nextEventId: 'ch1_rosa_7',
      },
      {
        id: 'ch1_rosa_7',
        type: 'dialogue',
        speaker: 'rosa',
        text: 'ふーん…まあ、頑張んなさいよ。この辺りは色々とややこしいから。',
        emotion: 'normal',
        nextEventId: 'ch1_rosa_8',
      },
      {
        id: 'ch1_rosa_8',
        type: 'dialogue',
        speaker: 'protagonist',
        text: 'ややこしい…？',
        nextEventId: 'ch1_rosa_9',
      },
      {
        id: 'ch1_rosa_9',
        type: 'dialogue',
        speaker: 'rosa',
        text: '…いや、なんでもないわ。それより、このクッキー美味しそうね。一つもらっていい？',
        emotion: 'normal',
        nextEventId: 'ch1_rosa_10',
      },
      {
        id: 'ch1_rosa_10',
        type: 'dialogue',
        speaker: 'protagonist',
        text: 'もちろんです！どうぞ！',
        nextEventId: 'ch1_rosa_11',
      },
      {
        id: 'ch1_rosa_11',
        type: 'dialogue',
        speaker: 'rosa',
        text: '……うん、悪くないわね。腕、あるじゃない。\nまた来るわ。',
        emotion: 'happy',
        nextEventId: 'ch1_rosa_12',
      },
      {
        id: 'ch1_rosa_12',
        type: 'narration',
        text: 'ローザさんは豪快に手を振って去っていった。\n隣の花屋さん…頼りになりそうな人だ。',
        effects: {
          reputation: 5,
          flag: { key: 'met_rosa', value: true },
        },
        nextEventId: null,
      },
    ],
  },

  // ============================================
  // 第2章: 不穏な影（Day 8〜14）
  // ============================================
  {
    id: 'chapter2_zephyros_intro',
    title: '金色の来訪者',
    description: 'ゼフィロスとの出会い',
    triggerCondition: { day: 10, reputation: 15 },
    events: [
      {
        id: 'ch2_zeph_1',
        type: 'narration',
        text: 'カフェの評判が少しずつ広まってきた頃、見慣れない客が現れた。',
        nextEventId: 'ch2_zeph_2',
      },
      {
        id: 'ch2_zeph_2',
        type: 'dialogue',
        speaker: 'zephyros',
        speakerName: '？？？',
        text: 'おや、これは素晴らしいカフェですね。噂には聞いておりましたが、期待以上です。',
        emotion: 'normal',
        nextEventId: 'ch2_zeph_3',
      },
      {
        id: 'ch2_zeph_3',
        type: 'narration',
        text: '金色の羽を持つ小柄な妖精が、優雅に微笑んでいる。\n全身に宝石をちりばめた派手な服装で、どこか胡散臭さを感じる。',
        nextEventId: 'ch2_zeph_4',
      },
      {
        id: 'ch2_zeph_4',
        type: 'dialogue',
        speaker: 'zephyros',
        speakerName: 'ゼフィロス',
        text: '申し遅れました。私はゼフィロス・ゴールドウィング。\nこの街で少々、投資業を営んでおります。',
        emotion: 'normal',
        nextEventId: 'ch2_zeph_5',
      },
      {
        id: 'ch2_zeph_5',
        type: 'dialogue',
        speaker: 'protagonist',
        text: 'ご来店ありがとうございます。何かお召し上がりになりますか？',
        nextEventId: 'ch2_zeph_6',
      },
      {
        id: 'ch2_zeph_6',
        type: 'dialogue',
        speaker: 'zephyros',
        text: 'ええ、後ほど。実は今日は、ビジネスのお話をしに参りました。',
        emotion: 'smirk',
        nextEventId: 'ch2_zeph_7',
      },
      {
        id: 'ch2_zeph_7',
        type: 'dialogue',
        speaker: 'zephyros',
        text: 'このカフェ、将来性がありますね。私が投資すれば、もっと大きく成長できますよ。\n共同経営…いかがでしょう？',
        emotion: 'normal',
        nextEventId: 'ch2_zeph_choice',
      },
      {
        id: 'ch2_zeph_choice',
        type: 'choice',
        speaker: 'protagonist',
        text: '（どう答えよう…）',
        choices: [
          {
            text: '興味があります',
            nextEventId: 'ch2_zeph_accept',
            effects: {
              flag: { key: 'zephyros_proposal', value: 'interested' },
            },
          },
          {
            text: '今は結構です',
            nextEventId: 'ch2_zeph_decline',
            effects: {
              flag: { key: 'zephyros_proposal', value: 'declined' },
            },
          },
          {
            text: '考えさせてください',
            nextEventId: 'ch2_zeph_later',
            effects: {
              flag: { key: 'zephyros_proposal', value: 'pending' },
            },
          },
        ],
      },
      // 興味がある場合
      {
        id: 'ch2_zeph_accept',
        type: 'dialogue',
        speaker: 'zephyros',
        text: 'おお、賢明な判断です！では、詳しい契約書を後日お持ちしますね。\n…きっと、良いお取引ができますよ。',
        emotion: 'happy',
        nextEventId: 'ch2_zeph_end_accept',
      },
      {
        id: 'ch2_zeph_end_accept',
        type: 'narration',
        text: 'ゼフィロスは満足げに去っていった。\n…本当に大丈夫だろうか。',
        nextEventId: null,
      },
      // 断る場合
      {
        id: 'ch2_zeph_decline',
        type: 'dialogue',
        speaker: 'zephyros',
        text: '…そうですか。残念ですね。\nですが、気が変わったらいつでもお声がけください。',
        emotion: 'normal',
        nextEventId: 'ch2_zeph_end_decline',
      },
      {
        id: 'ch2_zeph_end_decline',
        type: 'narration',
        text: 'ゼフィロスは微笑みを崩さず去っていったが、\nその目には一瞬、冷たい光が宿ったように見えた。',
        effects: {
          flag: { key: 'zephyros_rejected', value: true },
        },
        nextEventId: null,
      },
      // 保留する場合
      {
        id: 'ch2_zeph_later',
        type: 'dialogue',
        speaker: 'zephyros',
        text: 'ええ、もちろん。じっくりお考えください。\n私はいつでもお待ちしておりますよ。',
        emotion: 'normal',
        nextEventId: 'ch2_zeph_end_later',
      },
      {
        id: 'ch2_zeph_end_later',
        type: 'narration',
        text: 'ゼフィロスは名刺を置いて去っていった。\n…シオンに相談してみた方がいいかもしれない。',
        nextEventId: null,
      },
    ],
  },

  // シオンの警告（ゼフィロス登場後）
  {
    id: 'chapter2_shion_warning',
    title: 'シオンの忠告',
    description: 'ゼフィロスについてシオンが警告する',
    triggerCondition: { 
      day: 11,
      flag: { key: 'zephyros_proposal', value: 'pending' },
    },
    events: [
      {
        id: 'ch2_shion_1',
        type: 'dialogue',
        speaker: 'shion',
        text: 'あの…少しお話があるのですが。',
        emotion: 'normal',
        nextEventId: 'ch2_shion_2',
      },
      {
        id: 'ch2_shion_2',
        type: 'dialogue',
        speaker: 'protagonist',
        text: 'どうしたの、シオン？',
        nextEventId: 'ch2_shion_3',
      },
      {
        id: 'ch2_shion_3',
        type: 'dialogue',
        speaker: 'shion',
        text: '昨日いらした金色の羽の方…ゼフィロスという妖精ですわよね。',
        emotion: 'sad',
        nextEventId: 'ch2_shion_4',
      },
      {
        id: 'ch2_shion_4',
        type: 'dialogue',
        speaker: 'shion',
        text: 'あの方、なんだか胡散臭いですわ。\n森の精霊たちも、あまり良い噂を聞かないと…',
        emotion: 'sad',
        nextEventId: 'ch2_shion_5',
      },
      {
        id: 'ch2_shion_5',
        type: 'dialogue',
        speaker: 'protagonist',
        text: 'そうなんだ…気をつけた方がいいかな。',
        nextEventId: 'ch2_shion_6',
      },
      {
        id: 'ch2_shion_6',
        type: 'dialogue',
        speaker: 'shion',
        text: 'ええ。何かあったら、すぐに相談してくださいね。\n私も調べてみますわ。',
        emotion: 'normal',
        effects: {
          flag: { key: 'shion_warned', value: true },
        },
        nextEventId: null,
      },
    ],
  },

  // ローザの忠告
  {
    id: 'chapter2_rosa_warning',
    title: '姐さんの警告',
    description: 'ローザがゼフィロスについて警告する',
    triggerCondition: { 
      day: 12,
      flag: { key: 'met_rosa', value: true },
    },
    events: [
      {
        id: 'ch2_rosa_1',
        type: 'narration',
        text: '閉店後、ローザさんが血相を変えて飛び込んできた。',
        nextEventId: 'ch2_rosa_2',
      },
      {
        id: 'ch2_rosa_2',
        type: 'dialogue',
        speaker: 'rosa',
        text: 'あんた！ゼフィロスと会ったんですって！？',
        emotion: 'angry',
        nextEventId: 'ch2_rosa_3',
      },
      {
        id: 'ch2_rosa_3',
        type: 'dialogue',
        speaker: 'protagonist',
        text: 'え、ええ…投資のお話を…',
        nextEventId: 'ch2_rosa_4',
      },
      {
        id: 'ch2_rosa_4',
        type: 'dialogue',
        speaker: 'rosa',
        text: '絶対に関わっちゃダメよ！あいつは悪徳商人なの！',
        emotion: 'angry',
        nextEventId: 'ch2_rosa_5',
      },
      {
        id: 'ch2_rosa_5',
        type: 'dialogue',
        speaker: 'rosa',
        text: 'あたしの知り合いも何人もやられてるのよ。\n最初は甘い顔して近づいてきて、契約したら最後…\n法外な利息で身ぐるみ剥がされるわ。',
        emotion: 'sad',
        nextEventId: 'ch2_rosa_6',
      },
      {
        id: 'ch2_rosa_6',
        type: 'dialogue',
        speaker: 'protagonist',
        text: 'そんな…教えてくれてありがとう、ローザさん。',
        nextEventId: 'ch2_rosa_7',
      },
      {
        id: 'ch2_rosa_7',
        type: 'dialogue',
        speaker: 'rosa',
        text: '困ったことがあったらあたしに言いなさい。\n元冒険者を舐めないでほしいわね。',
        emotion: 'normal',
        effects: {
          flag: { key: 'rosa_warned', value: true },
        },
        nextEventId: null,
      },
    ],
  },

  // ============================================
  // 第3章: 妨害工作（Day 15〜21）
  // ============================================
  {
    id: 'chapter3_sabotage',
    title: '見えない敵',
    description: 'ゼフィロスの妨害が始まる',
    triggerCondition: { 
      day: 15,
      flag: { key: 'zephyros_rejected', value: true },
    },
    events: [
      {
        id: 'ch3_sab_1',
        type: 'narration',
        text: '最近、仕入れがうまくいかない。\nいつもの業者が「在庫がない」と断ってくるようになった。',
        nextEventId: 'ch3_sab_2',
      },
      {
        id: 'ch3_sab_2',
        type: 'narration',
        text: 'それだけではない。\n「あのカフェ、衛生状態が悪いらしい」という根も葉もない噂が流れている。',
        effects: {
          reputation: -10,
        },
        nextEventId: 'ch3_sab_3',
      },
      {
        id: 'ch3_sab_3',
        type: 'dialogue',
        speaker: 'shion',
        text: 'これは…おかしいですわ。\n明らかに誰かが裏で手を回していますね。',
        emotion: 'angry',
        nextEventId: 'ch3_sab_4',
      },
      {
        id: 'ch3_sab_4',
        type: 'dialogue',
        speaker: 'protagonist',
        text: 'ゼフィロス…彼の仕業かな…',
        nextEventId: 'ch3_sab_5',
      },
      {
        id: 'ch3_sab_5',
        type: 'narration',
        text: 'その時、店のドアが勢いよく開いた。',
        nextEventId: 'ch3_sab_6',
      },
      {
        id: 'ch3_sab_6',
        type: 'dialogue',
        speaker: 'rosa',
        text: 'あたしに任せな！',
        emotion: 'happy',
        nextEventId: 'ch3_sab_7',
      },
      {
        id: 'ch3_sab_7',
        type: 'dialogue',
        speaker: 'rosa',
        text: '仕入れルート、あたしの元冒険者仲間で確保できるわ。\n遠方の農家とか、ゼフィロスの手が届かない所を知ってるの。',
        emotion: 'normal',
        nextEventId: 'ch3_sab_8',
      },
      {
        id: 'ch3_sab_8',
        type: 'dialogue',
        speaker: 'protagonist',
        text: 'ローザさん…！本当にありがとう！',
        nextEventId: 'ch3_sab_9',
      },
      {
        id: 'ch3_sab_9',
        type: 'dialogue',
        speaker: 'rosa',
        text: '礼はいいわよ。あのクズ妖精、調子に乗りすぎなのよ。\nあんたみたいな真面目な子をいじめるなんて、許せないわ。',
        emotion: 'angry',
        nextEventId: 'ch3_sab_10',
      },
      {
        id: 'ch3_sab_10',
        type: 'dialogue',
        speaker: 'shion',
        text: '私も、森の精霊たちに情報を集めてもらいますわ。\nゼフィロスの弱みを見つけましょう。',
        emotion: 'normal',
        effects: {
          flag: { key: 'rosa_helping', value: true },
          flag: { key: 'shion_investigating', value: true },
        },
        nextEventId: null,
      },
    ],
  },

  // ============================================
  // 第4章: 反撃（Day 22〜28）
  // ============================================
  {
    id: 'chapter4_counterattack',
    title: '逆転の証拠',
    description: '証拠を集めてゼフィロスに反撃',
    triggerCondition: { 
      day: 25,
      flag: { key: 'rosa_helping', value: true },
    },
    events: [
      {
        id: 'ch4_counter_1',
        type: 'dialogue',
        speaker: 'shion',
        text: '見つけましたわ！ゼフィロスの不正契約の証拠です！',
        emotion: 'happy',
        nextEventId: 'ch4_counter_2',
      },
      {
        id: 'ch4_counter_2',
        type: 'dialogue',
        speaker: 'rosa',
        text: 'あたしの仲間も証言してくれるって。\n被害者が何人も名乗り出てきたわ。',
        emotion: 'happy',
        nextEventId: 'ch4_counter_3',
      },
      {
        id: 'ch4_counter_3',
        type: 'dialogue',
        speaker: 'protagonist',
        text: 'これで…ゼフィロスを告発できる！',
        nextEventId: 'ch4_counter_4',
      },
      {
        id: 'ch4_counter_4',
        type: 'narration',
        text: '街の商人組合に証拠を持ち込んだ。\n審議の結果、ゼフィロスの悪事が白日の下にさらされた。',
        nextEventId: 'ch4_counter_5',
      },
      {
        id: 'ch4_counter_5',
        type: 'dialogue',
        speaker: 'zephyros',
        text: 'くっ…覚えていなさい…！',
        emotion: 'angry',
        nextEventId: 'ch4_counter_6',
      },
      {
        id: 'ch4_counter_6',
        type: 'narration',
        text: 'ゼフィロスは街を追放された。\n彼に苦しめられていた人々から、感謝の言葉が届く。',
        effects: {
          reputation: 30,
          money: 10000,
          flag: { key: 'zephyros_defeated', value: true },
        },
        nextEventId: 'ch4_counter_7',
      },
      {
        id: 'ch4_counter_7',
        type: 'dialogue',
        speaker: 'rosa',
        text: 'やったじゃない、あんた！\nこれであたしたちの勝ちよ！',
        emotion: 'happy',
        nextEventId: 'ch4_counter_8',
      },
      {
        id: 'ch4_counter_8',
        type: 'dialogue',
        speaker: 'shion',
        text: '本当によかったですわ。\nこれで安心してカフェを続けられますね。',
        emotion: 'happy',
        nextEventId: null,
      },
    ],
  },

  // ============================================
  // 第5章: 新たな日常（Day 29〜）
  // ============================================
  {
    id: 'chapter5_peace',
    title: '平和な日々',
    description: '事件解決後の日常',
    triggerCondition: { 
      day: 30,
      flag: { key: 'zephyros_defeated', value: true },
    },
    events: [
      {
        id: 'ch5_peace_1',
        type: 'narration',
        text: 'ゼフィロスがいなくなってから、街には平和が戻った。\nカフェの評判も、以前にも増して高まっている。',
        nextEventId: 'ch5_peace_2',
      },
      {
        id: 'ch5_peace_2',
        type: 'dialogue',
        speaker: 'rosa',
        text: 'ねえあんた、あたしの花とあんたのケーキ、\nコラボで売ったら絶対ヒットすると思うのよ。',
        emotion: 'happy',
        nextEventId: 'ch5_peace_3',
      },
      {
        id: 'ch5_peace_3',
        type: 'dialogue',
        speaker: 'protagonist',
        text: 'いいね！フラワーケーキとか作ってみようかな。',
        nextEventId: 'ch5_peace_4',
      },
      {
        id: 'ch5_peace_4',
        type: 'dialogue',
        speaker: 'shion',
        text: '素敵ですわ！私も新しいレシピを考えますね。',
        emotion: 'happy',
        nextEventId: 'ch5_peace_5',
      },
      {
        id: 'ch5_peace_5',
        type: 'narration',
        text: '新たな仲間と、新たな夢。\n妖精カフェの物語は、まだまだ続いていく――',
        effects: {
          flag: { key: 'main_story_complete', value: true },
        },
        nextEventId: null,
      },
    ],
  },
];

// シナリオ取得用ヘルパー
export const getTriggeredScenario = (
  day: number, 
  reputation: number, 
  money: number, 
  flags: Record<string, boolean | string | number>,
  completedScenarios: string[]
): ScenarioChapter | null => {
  for (const chapter of SCENARIO_CHAPTERS) {
    // 既に完了済みならスキップ
    if (completedScenarios.includes(chapter.id)) continue;
    
    const cond = chapter.triggerCondition;
    
    // 日付チェック
    if (cond.day && day !== cond.day) continue;
    if (cond.dayRange && (day < cond.dayRange[0] || day > cond.dayRange[1])) continue;
    
    // 評判チェック
    if (cond.reputation && reputation < cond.reputation) continue;
    
    // 資金チェック
    if (cond.money && money < cond.money) continue;
    
    // フラグチェック
    if (cond.flag && flags[cond.flag.key] !== cond.flag.value) continue;
    
    return chapter;
  }
  return null;
};
