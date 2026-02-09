import { ScenarioChapter } from '@/types';

// ===== チュートリアルシナリオ =====
// Day 1〜3 のチュートリアル期間で発生するイベント

export const TUTORIAL_SCENARIOS: ScenarioChapter[] = [
  // ============================================
  // Day 1: 仕入れチュートリアル
  // ============================================
  {
    id: 'tutorial_day1_procurement',
    title: '仕入れの基本',
    description: 'シオンから仕入れの方法を学ぶ',
    triggerCondition: {
      day: 1,
      flag: { key: 'prologue_complete', value: true },
    },
    priority: 100,
    events: [
      {
        id: 'tut_d1_1',
        type: 'dialogue',
        speaker: 'shion',
        text: 'では、カフェ経営の基本をお教えしますわね。\nまずは「仕入れ」からです。',
        emotion: 'normal',
        nextEventId: 'tut_d1_2',
      },
      {
        id: 'tut_d1_2',
        type: 'dialogue',
        speaker: 'shion',
        text: 'お客様に提供するメニューの材料を、\n事前に発注しておく必要があります。',
        emotion: 'normal',
        nextEventId: 'tut_d1_3',
      },
      {
        id: 'tut_d1_3',
        type: 'dialogue',
        speaker: 'shion',
        text: '仕入れすぎると廃棄ロスが出ますし、\n足りないとお客様に提供できません。',
        emotion: 'normal',
        nextEventId: 'tut_d1_4',
      },
      {
        id: 'tut_d1_4',
        type: 'dialogue',
        speaker: 'shion',
        text: '最初は少なめに仕入れて、\n様子を見ながら調整していきましょう。',
        emotion: 'happy',
        nextEventId: 'tut_d1_5',
      },
      {
        id: 'tut_d1_5',
        type: 'effect',
        text: '【チュートリアル】\n\n仕入れ画面で、各メニューの発注数を決めましょう。\n最初は「コーヒー」を5個、「クッキー」を3個\n程度から始めてみましょう。',
        effects: {
          flag: { key: 'tutorial_procurement_intro', value: true },
        },
        nextEventId: null,
      },
    ],
  },

  // ============================================
  // Day 1: 営業開始チュートリアル
  // ============================================
  {
    id: 'tutorial_day1_operation',
    title: '営業の基本',
    description: '営業の流れを学ぶ',
    triggerCondition: {
      day: 1,
      flag: { key: 'tutorial_procurement_done', value: true },
    },
    priority: 99,
    events: [
      {
        id: 'tut_op_1',
        type: 'dialogue',
        speaker: 'shion',
        text: '仕入れが完了しましたわね。\nでは、お店を開けましょう！',
        emotion: 'happy',
        nextEventId: 'tut_op_2',
      },
      {
        id: 'tut_op_2',
        type: 'dialogue',
        speaker: 'shion',
        text: '営業中は、お客様が自動的に来店します。\n時間帯によって客足が変わりますわ。',
        emotion: 'normal',
        nextEventId: 'tut_op_3',
      },
      {
        id: 'tut_op_3',
        type: 'dialogue',
        speaker: 'shion',
        text: '朝は少なめ、お昼時がピーク、\n夕方から夜にかけてまた増えます。',
        emotion: 'normal',
        nextEventId: 'tut_op_4',
      },
      {
        id: 'tut_op_4',
        type: 'dialogue',
        speaker: 'shion',
        text: 'たまに「特別なお客様」が来ることもありますわ。\nイケメン妖精たちですわね。ふふ。',
        emotion: 'happy',
        nextEventId: 'tut_op_5',
      },
      {
        id: 'tut_op_5',
        type: 'effect',
        text: '【チュートリアル】\n\n「CAFE OPEN」ボタンを押して\n営業を開始しましょう！\n\n営業は9:00〜21:00まで続きます。',
        effects: {
          flag: { key: 'tutorial_operation_intro', value: true },
        },
        nextEventId: null,
      },
    ],
  },

  // ============================================
  // Day 1: 営業終了・結果確認
  // ============================================
  {
    id: 'tutorial_day1_result',
    title: '結果確認',
    description: '1日の結果を確認する',
    triggerCondition: {
      day: 1,
      flag: { key: 'tutorial_operation_done', value: true },
    },
    priority: 98,
    events: [
      {
        id: 'tut_res_1',
        type: 'dialogue',
        speaker: 'shion',
        text: 'お疲れ様でした！\n初日の営業が終わりましたわ。',
        emotion: 'happy',
        nextEventId: 'tut_res_2',
      },
      {
        id: 'tut_res_2',
        type: 'dialogue',
        speaker: 'shion',
        text: '結果画面では、今日の売上と利益、\n来客数などが確認できます。',
        emotion: 'normal',
        nextEventId: 'tut_res_3',
      },
      {
        id: 'tut_res_3',
        type: 'dialogue',
        speaker: 'shion',
        text: '「売上」から「原価」と「経費」を引いたものが\n「利益」になりますわ。',
        emotion: 'normal',
        nextEventId: 'tut_res_4',
      },
      {
        id: 'tut_res_4',
        type: 'dialogue',
        speaker: 'shion',
        text: '最初は赤字になることもありますが、\n焦らなくて大丈夫ですわ。',
        emotion: 'happy',
        nextEventId: 'tut_res_5',
      },
      {
        id: 'tut_res_5',
        type: 'dialogue',
        speaker: 'shion',
        text: '少しずつお店の評判を上げて、\nお客様を増やしていきましょう。',
        emotion: 'happy',
        effects: {
          flag: { key: 'tutorial_day1_complete', value: true },
        },
        nextEventId: null,
      },
    ],
  },

  // ============================================
  // Day 2: 照覧の魔法チュートリアル
  // ============================================
  {
    id: 'tutorial_day2_shouran',
    title: '照覧の魔法',
    description: 'ステータス確認方法を学ぶ',
    triggerCondition: {
      day: 2,
      flag: { key: 'tutorial_day1_complete', value: true },
    },
    priority: 100,
    events: [
      {
        id: 'tut_sh_1',
        type: 'dialogue',
        speaker: 'shion',
        text: '2日目ですわね。\n今日は大切なことをお教えします。',
        emotion: 'normal',
        nextEventId: 'tut_sh_2',
      },
      {
        id: 'tut_sh_2',
        type: 'dialogue',
        speaker: 'shion',
        text: '「照覧の魔法」をご存知ですか？\nこの世界で自分の状態を確認する方法です。',
        emotion: 'normal',
        nextEventId: 'tut_sh_3',
      },
      {
        id: 'tut_sh_3',
        type: 'dialogue',
        speaker: 'protagonist',
        text: '照覧の魔法…？',
        nextEventId: 'tut_sh_4',
      },
      {
        id: 'tut_sh_4',
        type: 'dialogue',
        speaker: 'shion',
        text: '魅力、話術、センス…そして「幻装レベル」。\nあなたの成長を数値で見ることができますわ。',
        emotion: 'normal',
        nextEventId: 'tut_sh_5',
      },
      {
        id: 'tut_sh_5',
        type: 'dialogue',
        speaker: 'shion',
        text: '幻装レベルとは、あなたの魔力の輝きのこと。\nレベルが上がると、見た目も華やかになりますわ。',
        emotion: 'happy',
        nextEventId: 'tut_sh_6',
      },
      {
        id: 'tut_sh_6',
        type: 'dialogue',
        speaker: 'shion',
        text: 'そして…幻装レベルは、\n素敵な殿方との関係にも影響しますの。',
        emotion: 'happy',
        nextEventId: 'tut_sh_7',
      },
      {
        id: 'tut_sh_7',
        type: 'dialogue',
        speaker: 'protagonist',
        text: 'え…？どういうこと…？',
        nextEventId: 'tut_sh_8',
      },
      {
        id: 'tut_sh_8',
        type: 'dialogue',
        speaker: 'shion',
        text: 'ふふ、それはおいおい分かりますわ。\nまずは下のメニューから「主人公」を選んでみて。',
        emotion: 'happy',
        nextEventId: 'tut_sh_9',
      },
      {
        id: 'tut_sh_9',
        type: 'effect',
        text: '【チュートリアル】\n\n画面下部のメニューから\n「主人公」タブをタップして\n照覧の魔法を体験しましょう！',
        effects: {
          flag: { key: 'tutorial_shouran_intro', value: true },
        },
        nextEventId: null,
      },
    ],
  },

  // ============================================
  // Day 2: 仕入れアドバイス
  // ============================================
  {
    id: 'tutorial_day2_advice',
    title: '仕入れのコツ',
    description: '昨日の結果を踏まえたアドバイス',
    triggerCondition: {
      day: 2,
      flag: { key: 'tutorial_shouran_done', value: true },
    },
    priority: 90,
    events: [
      {
        id: 'tut_adv_1',
        type: 'dialogue',
        speaker: 'shion',
        text: '照覧の魔法、体験できましたか？\nでは、今日の仕入れについてアドバイスを。',
        emotion: 'normal',
        nextEventId: 'tut_adv_2',
      },
      {
        id: 'tut_adv_2',
        type: 'dialogue',
        speaker: 'shion',
        text: '昨日の売れ行きを参考に、\n仕入れ量を調整してみましょう。',
        emotion: 'normal',
        nextEventId: 'tut_adv_3',
      },
      {
        id: 'tut_adv_3',
        type: 'dialogue',
        speaker: 'shion',
        text: 'よく売れたメニューは少し増やして、\n売れ残ったものは減らす。基本ですわね。',
        emotion: 'normal',
        nextEventId: 'tut_adv_4',
      },
      {
        id: 'tut_adv_4',
        type: 'dialogue',
        speaker: 'shion',
        text: 'あと、お客様の好みに合わせた仕入れをすると、\n特別なお客様が来やすくなりますわよ。',
        emotion: 'happy',
        effects: {
          flag: { key: 'tutorial_day2_complete', value: true },
        },
        nextEventId: null,
      },
    ],
  },

  // ============================================
  // Day 3: チュートリアル完了
  // ============================================
  {
    id: 'tutorial_day3_complete',
    title: 'チュートリアル完了',
    description: 'チュートリアル終了、本番開始',
    triggerCondition: {
      day: 3,
      flag: { key: 'tutorial_day2_complete', value: true },
    },
    priority: 100,
    events: [
      {
        id: 'tut_end_1',
        type: 'dialogue',
        speaker: 'shion',
        text: '3日間、よく頑張りましたわね！\nこれで基本的な経営の流れは掴めたと思います。',
        emotion: 'happy',
        nextEventId: 'tut_end_2',
      },
      {
        id: 'tut_end_2',
        type: 'dialogue',
        speaker: 'shion',
        text: '明日からは、あなた自身の判断で\nカフェを経営していくことになります。',
        emotion: 'normal',
        nextEventId: 'tut_end_3',
      },
      {
        id: 'tut_end_3',
        type: 'dialogue',
        speaker: 'shion',
        text: 'もちろん、私はいつでもアドバイスしますわ。\n困ったことがあれば、遠慮なく聞いてくださいね。',
        emotion: 'happy',
        nextEventId: 'tut_end_4',
      },
      {
        id: 'tut_end_4',
        type: 'dialogue',
        speaker: 'shion',
        text: 'それと…このカフェには、\n時々素敵な妖精の殿方がいらっしゃいます。',
        emotion: 'normal',
        nextEventId: 'tut_end_5',
      },
      {
        id: 'tut_end_5',
        type: 'dialogue',
        speaker: 'shion',
        text: '彼らと仲良くなると、\n色々と良いことがありますわよ。ふふ。',
        emotion: 'happy',
        nextEventId: 'tut_end_6',
      },
      {
        id: 'tut_end_6',
        type: 'dialogue',
        speaker: 'shion',
        text: 'では、改めて…\n妖精カフェの経営、よろしくお願いしますわね！',
        emotion: 'happy',
        nextEventId: 'tut_end_7',
      },
      {
        id: 'tut_end_7',
        type: 'effect',
        text: '【チュートリアル完了！】\n\nこれで基本的な操作は習得しました。\n\n・仕入れで材料を確保\n・営業でお客様をおもてなし\n・結果を確認して次に活かす\n\nこのサイクルを繰り返して、\nカフェを繁盛させましょう！',
        effects: {
          flag: { key: 'tutorial_complete', value: true },
        },
        nextEventId: null,
      },
    ],
  },
];

// ===== チュートリアルフラグ管理 =====
export const TUTORIAL_FLAGS = {
  // プロローグ
  PROLOGUE_COMPLETE: 'prologue_complete',
  
  // Day 1
  PROCUREMENT_INTRO: 'tutorial_procurement_intro',
  PROCUREMENT_DONE: 'tutorial_procurement_done',
  OPERATION_INTRO: 'tutorial_operation_intro',
  OPERATION_DONE: 'tutorial_operation_done',
  DAY1_COMPLETE: 'tutorial_day1_complete',
  
  // Day 2
  SHOURAN_INTRO: 'tutorial_shouran_intro',
  SHOURAN_DONE: 'tutorial_shouran_done',
  DAY2_COMPLETE: 'tutorial_day2_complete',
  
  // Day 3
  TUTORIAL_COMPLETE: 'tutorial_complete',
} as const;

// ===== チュートリアル進行チェック =====
export const isTutorialActive = (
  day: number,
  flags: Record<string, boolean | string | number>
): boolean => {
  // Day 4以降、またはチュートリアル完了フラグがあれば終了
  if (day > 3) return false;
  if (flags[TUTORIAL_FLAGS.TUTORIAL_COMPLETE]) return false;
  return true;
};

// ===== 次のチュートリアルステップを取得 =====
export const getNextTutorialScenario = (
  day: number,
  flags: Record<string, boolean | string | number>
): ScenarioChapter | null => {
  if (!isTutorialActive(day, flags)) return null;

  // 優先度順にソート
  const sortedScenarios = [...TUTORIAL_SCENARIOS].sort(
    (a, b) => (b.priority || 0) - (a.priority || 0)
  );

  for (const scenario of sortedScenarios) {
    const cond = scenario.triggerCondition;

    // 日付チェック
    if (cond.day !== undefined && day !== cond.day) continue;

    // フラグチェック
    if (cond.flag && flags[cond.flag.key] !== cond.flag.value) continue;

    return scenario;
  }

  return null;
};
