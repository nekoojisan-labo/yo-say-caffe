// src/game/scenarios/events/shouran.ts
// 照覧の魔法イベント - ステータス閲覧と幻装レベル変化

import { ScenarioChapter } from '@/types';

/**
 * 照覧の魔法イベントシナリオ
 * 
 * 主人公のステータスを確認する「照覧の魔法」に関するイベント
 * 幻装レベルの変化時にも発生
 * 
 * トリガー条件:
 * - Day 2でチュートリアル（照覧の魔法の説明）
 * - 幻装レベルアップ時
 * - 幻装レベルダウン警告時
 * - 週末の定期チェック
 * - 隠しステータス発見時
 */
export const SHOURAN_EVENTS: ScenarioChapter[] = [
  // ============================================
  // 照覧の魔法チュートリアル
  // ============================================
  {
    id: 'shouran_tutorial',
    title: '照覧の魔法',
    description: 'シオンから照覧の魔法を教わる',
    triggerCondition: {
      day: 2,
      flag: { key: 'prologue_complete', value: true }
    },
    events: [
      {
        id: 'shou_tut_1',
        type: 'narration',
        text: '2日目の朝、シオンが姿を現した。',
        nextEventId: 'shou_tut_2'
      },
      {
        id: 'shou_tut_2',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '約束通り、「照覧の魔法」について教えよう。',
        emotion: 'normal',
        nextEventId: 'shou_tut_3'
      },
      {
        id: 'shou_tut_3',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'はい、お願いします！',
        emotion: 'happy',
        nextEventId: 'shou_tut_4'
      },
      {
        id: 'shou_tut_4',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '照覧の魔法は、自分自身の状態を映し出す鏡のようなものだ。',
        emotion: 'normal',
        nextEventId: 'shou_tut_5'
      },
      {
        id: 'shou_tut_5',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: 'カフェの経営状況、お客様からの信頼、そして...お前自身の「幻装レベル」が確認できる。',
        emotion: 'normal',
        nextEventId: 'shou_tut_6'
      },
      {
        id: 'shou_tut_6',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: '幻装レベル...それが高いほど、綺麗に見えるんですよね？',
        emotion: 'normal',
        nextEventId: 'shou_tut_7'
      },
      {
        id: 'shou_tut_7',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: 'そうだ。幻装レベルは0から6まである。レベルが上がるほど、魔法による美しさが増す。',
        emotion: 'normal',
        nextEventId: 'shou_tut_8'
      },
      {
        id: 'shou_tut_8',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: 'レベル0は魔法なしの素の状態。レベル6は最高位の輝きだ。',
        emotion: 'normal',
        nextEventId: 'shou_tut_9'
      },
      {
        id: 'shou_tut_9',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '今のお前はレベル3...まあ、悪くない出発点だ。',
        emotion: 'normal',
        nextEventId: 'shou_tut_10'
      },
      {
        id: 'shou_tut_10',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'どうすればレベルが上がるんですか？',
        emotion: 'normal',
        nextEventId: 'shou_tut_11'
      },
      {
        id: 'shou_tut_11',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: 'カフェを繁盛させることだ。お客様を喜ばせ、評判を上げ、安定した経営を続ける。',
        emotion: 'normal',
        nextEventId: 'shou_tut_12'
      },
      {
        id: 'shou_tut_12',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: 'その積み重ねが「幻装ポイント」となり、一定以上貯まるとレベルが上がる。',
        emotion: 'normal',
        nextEventId: 'shou_tut_13'
      },
      {
        id: 'shou_tut_13',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '逆に、経営が悪化すればポイントは減る。レベルが下がることもある。',
        emotion: 'normal',
        nextEventId: 'shou_tut_14'
      },
      {
        id: 'shou_tut_14',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: '気をつけないと...！',
        emotion: 'surprised',
        nextEventId: 'shou_tut_15'
      },
      {
        id: 'shou_tut_15',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: 'では、実際に使ってみろ。目を閉じて、心の中で「照覧」と唱えるんだ。',
        emotion: 'normal',
        nextEventId: 'shou_tut_16'
      },
      {
        id: 'shou_tut_16',
        type: 'narration',
        text: '言われた通り、目を閉じて意識を集中させる。',
        nextEventId: 'shou_tut_17'
      },
      {
        id: 'shou_tut_17',
        type: 'narration',
        text: '「照覧」——',
        nextEventId: 'shou_tut_18'
      },
      {
        id: 'shou_tut_18',
        type: 'narration',
        text: '瞬間、目の前に光の文字が浮かび上がった。',
        nextEventId: 'shou_tut_19'
      },
      {
        id: 'shou_tut_19',
        type: 'narration',
        text: '【照覧の魔法】\n\n資金: 100,000G\n評判: ★☆☆☆☆\n幻装レベル: 3\n幻装ポイント: 240/400',
        nextEventId: 'shou_tut_20'
      },
      {
        id: 'shou_tut_20',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'すごい...自分の状態が見える...！',
        emotion: 'surprised',
        nextEventId: 'shou_tut_21'
      },
      {
        id: 'shou_tut_21',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: 'これからは、画面左上の自分のアイコンをタップすれば、いつでも照覧の魔法が使える。',
        emotion: 'normal',
        nextEventId: 'shou_tut_22'
      },
      {
        id: 'shou_tut_22',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '定期的に確認して、自分の状態を把握しておくといい。',
        emotion: 'normal',
        nextEventId: 'shou_tut_23'
      },
      {
        id: 'shou_tut_23',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'はい！ ありがとうございます、シオン！',
        emotion: 'happy',
        nextEventId: 'shou_tut_end'
      },
      {
        id: 'shou_tut_end',
        type: 'effect',
        effects: {
          flag: { key: 'shouran_unlocked', value: true },
          flag2: { key: 'shouran_tutorial_complete', value: true }
        },
        nextEventId: null
      }
    ],
    isCompleted: false
  },

  // ============================================
  // 幻装レベルアップ - レベル4到達
  // ============================================
  {
    id: 'shouran_levelup_4',
    title: '幻装レベルアップ！',
    description: '幻装レベルが4に上がった',
    triggerCondition: {
      flag: { key: 'glamor_levelup_4_trigger', value: true }
    },
    events: [
      {
        id: 'shou_lv4_1',
        type: 'narration',
        text: 'ふと、体が光に包まれるのを感じた。',
        nextEventId: 'shou_lv4_2'
      },
      {
        id: 'shou_lv4_2',
        type: 'narration',
        text: '鏡を見ると、自分の姿が少し変わっている。肌の輝きが増し、髪にツヤが出ている。',
        nextEventId: 'shou_lv4_3'
      },
      {
        id: 'shou_lv4_3',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'これは...幻装レベルが上がった...!?',
        emotion: 'surprised',
        nextEventId: 'shou_lv4_4'
      },
      {
        id: 'shou_lv4_4',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...よくやった。幻装レベルが4に上がったな。',
        emotion: 'happy',
        nextEventId: 'shou_lv4_5'
      },
      {
        id: 'shou_lv4_5',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: 'カフェの経営が順調な証拠だ。この調子で続けるといい。',
        emotion: 'normal',
        nextEventId: 'shou_lv4_6'
      },
      {
        id: 'shou_lv4_6',
        type: 'narration',
        text: '【幻装レベルアップ！】\nレベル3 → レベル4\n\n見た目が少し華やかになりました。\n一部のお客様から好感度ボーナスを得られます。',
        nextEventId: 'shou_lv4_end'
      },
      {
        id: 'shou_lv4_end',
        type: 'effect',
        effects: {
          reputation: 5,
          flag: { key: 'glamor_level_4_achieved', value: true }
        },
        nextEventId: null
      }
    ],
    isCompleted: false
  },

  // ============================================
  // 幻装レベルアップ - レベル5到達
  // ============================================
  {
    id: 'shouran_levelup_5',
    title: '幻装レベルアップ！',
    description: '幻装レベルが5に上がった',
    triggerCondition: {
      flag: { key: 'glamor_levelup_5_trigger', value: true }
    },
    events: [
      {
        id: 'shou_lv5_1',
        type: 'narration',
        text: '体を強い光が包み込んだ。',
        nextEventId: 'shou_lv5_2'
      },
      {
        id: 'shou_lv5_2',
        type: 'narration',
        text: '光が収まると、鏡の中の自分は別人のように美しくなっていた。',
        nextEventId: 'shou_lv5_3'
      },
      {
        id: 'shou_lv5_3',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'わあ...！ こんなに変わるなんて...！',
        emotion: 'happy',
        nextEventId: 'shou_lv5_4'
      },
      {
        id: 'shou_lv5_4',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '幻装レベル5か。ここまで来れば、貴族階級のお客様にも恥ずかしくない姿だ。',
        emotion: 'happy',
        nextEventId: 'shou_lv5_5'
      },
      {
        id: 'shou_lv5_5',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...お前は、本当によく頑張っているな。',
        emotion: 'happy',
        nextEventId: 'shou_lv5_6'
      },
      {
        id: 'shou_lv5_6',
        type: 'narration',
        text: '【幻装レベルアップ！】\nレベル4 → レベル5\n\n貴族階級のイケメンとの結婚が可能になりました。\n評判ボーナスが増加します。',
        nextEventId: 'shou_lv5_end'
      },
      {
        id: 'shou_lv5_end',
        type: 'effect',
        effects: {
          reputation: 10,
          flag: { key: 'glamor_level_5_achieved', value: true }
        },
        nextEventId: null
      }
    ],
    isCompleted: false
  },

  // ============================================
  // 幻装レベルアップ - レベル6到達（最高）
  // ============================================
  {
    id: 'shouran_levelup_6',
    title: '幻装レベル最高到達！',
    description: '幻装レベルが最高の6に到達',
    triggerCondition: {
      flag: { key: 'glamor_levelup_6_trigger', value: true }
    },
    events: [
      {
        id: 'shou_lv6_1',
        type: 'narration',
        text: '眩い光が全身を包み込んだ。',
        nextEventId: 'shou_lv6_2'
      },
      {
        id: 'shou_lv6_2',
        type: 'narration',
        text: '光が収まった時、鏡に映る自分は...まるで妖精のように輝いていた。',
        nextEventId: 'shou_lv6_3'
      },
      {
        id: 'shou_lv6_3',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'これが...最高の幻装...！',
        emotion: 'surprised',
        nextEventId: 'shou_lv6_4'
      },
      {
        id: 'shou_lv6_4',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...見事だ。幻装レベル6——最高位に到達したな。',
        emotion: 'happy',
        nextEventId: 'shou_lv6_5'
      },
      {
        id: 'shou_lv6_5',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: 'この輝きは、王族ですら見惚れるレベルだ。お前は本当に素晴らしい。',
        emotion: 'happy',
        nextEventId: 'shou_lv6_6'
      },
      {
        id: 'shou_lv6_6',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'シオンのおかげです...！ ありがとうございます...！',
        emotion: 'happy',
        nextEventId: 'shou_lv6_7'
      },
      {
        id: 'shou_lv6_7',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...私は何もしていない。全てはお前自身の努力の結果だ。',
        emotion: 'normal',
        nextEventId: 'shou_lv6_8'
      },
      {
        id: 'shou_lv6_8',
        type: 'narration',
        text: '【幻装レベル最高到達！】\nレベル5 → レベル6（MAX）\n\n全てのイケメンとの結婚が可能になりました。\n特別なエンディングが解放されます。',
        nextEventId: 'shou_lv6_end'
      },
      {
        id: 'shou_lv6_end',
        type: 'effect',
        effects: {
          reputation: 20,
          flag: { key: 'glamor_level_6_achieved', value: true },
          flag2: { key: 'max_glamor_achieved', value: true }
        },
        nextEventId: null
      }
    ],
    isCompleted: false
  },

  // ============================================
  // 幻装レベルダウン警告
  // ============================================
  {
    id: 'shouran_leveldown_warning',
    title: '幻装の揺らぎ',
    description: '幻装レベルが下がりそうになっている',
    triggerCondition: {
      flag: { key: 'glamor_unstable', value: true }
    },
    events: [
      {
        id: 'shou_warn_1',
        type: 'narration',
        text: 'ふと、体の輝きが弱まっているのを感じた。',
        nextEventId: 'shou_warn_2'
      },
      {
        id: 'shou_warn_2',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'あれ...なんだか、魔法が弱くなってる気がする...',
        emotion: 'sad',
        nextEventId: 'shou_warn_3'
      },
      {
        id: 'shou_warn_3',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...幻装が不安定になっている。経営状況が芳しくないようだな。',
        emotion: 'normal',
        nextEventId: 'shou_warn_4'
      },
      {
        id: 'shou_warn_4',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: 'このまま続けば、幻装レベルが下がってしまうぞ。',
        emotion: 'normal',
        nextEventId: 'shou_warn_5'
      },
      {
        id: 'shou_warn_5',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'どうすれば...！',
        emotion: 'surprised',
        nextEventId: 'shou_warn_6'
      },
      {
        id: 'shou_warn_6',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '売上を上げ、評判を回復させることだ。まだ間に合う。',
        emotion: 'normal',
        nextEventId: 'shou_warn_7'
      },
      {
        id: 'shou_warn_7',
        type: 'narration',
        text: '【警告】幻装が不安定です\n\n幻装ポイントが低下しています。\nこのまま続くと、幻装レベルが下がります。\n\n・売上を増やしましょう\n・評判を回復しましょう',
        nextEventId: 'shou_warn_end'
      },
      {
        id: 'shou_warn_end',
        type: 'effect',
        effects: {
          flag: { key: 'glamor_warning_shown', value: true }
        },
        nextEventId: null
      }
    ],
    isCompleted: false
  },

  // ============================================
  // 幻装レベルダウン発生
  // ============================================
  {
    id: 'shouran_leveldown',
    title: '幻装レベルダウン',
    description: '幻装レベルが下がってしまった',
    triggerCondition: {
      flag: { key: 'glamor_leveldown_trigger', value: true }
    },
    events: [
      {
        id: 'shou_down_1',
        type: 'narration',
        text: '体から光が失われていくのを感じた。',
        nextEventId: 'shou_down_2'
      },
      {
        id: 'shou_down_2',
        type: 'narration',
        text: '鏡を見ると、昨日より少し地味になった自分がいた。',
        nextEventId: 'shou_down_3'
      },
      {
        id: 'shou_down_3',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: '幻装レベルが...下がっちゃった...',
        emotion: 'sad',
        nextEventId: 'shou_down_4'
      },
      {
        id: 'shou_down_4',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...残念だが、仕方のないことだ。経営を立て直せば、また上げられる。',
        emotion: 'sad',
        nextEventId: 'shou_down_5'
      },
      {
        id: 'shou_down_5',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '諦めるな。お前ならできる。',
        emotion: 'normal',
        nextEventId: 'shou_down_6'
      },
      {
        id: 'shou_down_6',
        type: 'narration',
        text: '【幻装レベルダウン】\n\n経営状況の悪化により、幻装レベルが下がりました。\n一部のイケメンとの結婚条件を満たせなくなる可能性があります。\n\n経営を立て直して、レベルを回復しましょう。',
        nextEventId: 'shou_down_end'
      },
      {
        id: 'shou_down_end',
        type: 'effect',
        effects: {
          flag: { key: 'glamor_leveldown_occurred', value: true }
        },
        nextEventId: null
      }
    ],
    isCompleted: false
  },

  // ============================================
  // 週末の照覧 - 定期チェック
  // ============================================
  {
    id: 'shouran_weekly',
    title: '週末の照覧',
    description: '週末に自分の状態を確認する',
    triggerCondition: {
      flag: { key: 'weekly_shouran_trigger', value: true }
    },
    events: [
      {
        id: 'shou_week_1',
        type: 'narration',
        text: '週末。1週間の疲れを癒しながら、照覧の魔法で自分の状態を確認する。',
        nextEventId: 'shou_week_2'
      },
      {
        id: 'shou_week_2',
        type: 'narration',
        text: '「照覧」——',
        nextEventId: 'shou_week_3'
      },
      {
        id: 'shou_week_3',
        type: 'narration',
        text: '光の文字が浮かび上がり、今週の成果が表示された。',
        nextEventId: 'shou_week_4'
      },
      {
        id: 'shou_week_4',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: '今週も頑張ったな...来週も頑張ろう。',
        emotion: 'normal',
        nextEventId: 'shou_week_end'
      },
      {
        id: 'shou_week_end',
        type: 'effect',
        effects: {
          flag: { key: 'weekly_shouran_done', value: true }
        },
        nextEventId: null
      }
    ],
    isCompleted: false
  },

  // ============================================
  // 隠しステータス発見 - 絆の力
  // ============================================
  {
    id: 'shouran_hidden_stat',
    title: '新たな力の発見',
    description: '照覧の魔法で新しいステータスを発見',
    triggerCondition: {
      flag: { key: 'hidden_stat_trigger', value: true }
    },
    events: [
      {
        id: 'shou_hid_1',
        type: 'narration',
        text: 'いつものように照覧の魔法を使うと、見慣れない項目が表示された。',
        nextEventId: 'shou_hid_2'
      },
      {
        id: 'shou_hid_2',
        type: 'narration',
        text: '【絆の力】——お客様との絆から生まれる、不思議な力。',
        nextEventId: 'shou_hid_3'
      },
      {
        id: 'shou_hid_3',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: '絆の力...？ こんな項目、今まで見えなかったのに...',
        emotion: 'surprised',
        nextEventId: 'shou_hid_4'
      },
      {
        id: 'shou_hid_4',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...気づいたか。それは、お前がお客様と深い絆を結んだ証だ。',
        emotion: 'normal',
        nextEventId: 'shou_hid_5'
      },
      {
        id: 'shou_hid_5',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '絆の力は、カフェを守る不思議な力になる。大切にするといい。',
        emotion: 'happy',
        nextEventId: 'shou_hid_6'
      },
      {
        id: 'shou_hid_6',
        type: 'narration',
        text: '【新ステータス解放】\n「絆の力」が照覧の魔法に追加されました。\n\nお客様との好感度が高いほど、絆の力が強くなります。\n絆の力は、特別なイベントで役立つことがあります。',
        nextEventId: 'shou_hid_end'
      },
      {
        id: 'shou_hid_end',
        type: 'effect',
        effects: {
          flag: { key: 'bond_stat_unlocked', value: true }
        },
        nextEventId: null
      }
    ],
    isCompleted: false
  }
];

/**
 * 幻装レベル関連のフラグを自動設定
 */
export function updateGlamorFlags(
  currentLevel: number,
  previousLevel: number,
  glamorPoints: number,
  stability: number,
  flags: Record<string, boolean | string | number>
): Record<string, boolean | string | number> {
  const updatedFlags = { ...flags };
  
  // レベルアップトリガー
  if (currentLevel > previousLevel) {
    if (currentLevel === 4) updatedFlags['glamor_levelup_4_trigger'] = true;
    if (currentLevel === 5) updatedFlags['glamor_levelup_5_trigger'] = true;
    if (currentLevel === 6) updatedFlags['glamor_levelup_6_trigger'] = true;
  }
  
  // レベルダウントリガー
  if (currentLevel < previousLevel) {
    updatedFlags['glamor_leveldown_trigger'] = true;
  }
  
  // 不安定警告（安定度50%以下）
  if (stability < 50 && !flags['glamor_warning_shown']) {
    updatedFlags['glamor_unstable'] = true;
  } else if (stability >= 50) {
    updatedFlags['glamor_unstable'] = false;
  }
  
  return updatedFlags;
}

/**
 * 週末の照覧トリガーを設定
 */
export function updateWeeklyShouranTrigger(
  day: number,
  flags: Record<string, boolean | string | number>
): Record<string, boolean | string | number> {
  const updatedFlags = { ...flags };
  
  // 7日ごと（日曜日）に週末の照覧
  if (day % 7 === 0 && flags['shouran_unlocked']) {
    updatedFlags['weekly_shouran_trigger'] = true;
    updatedFlags['weekly_shouran_done'] = false;
  }
  
  return updatedFlags;
}

/**
 * 隠しステータストリガーを設定
 */
export function updateHiddenStatTrigger(
  totalAffection: number,
  flags: Record<string, boolean | string | number>
): Record<string, boolean | string | number> {
  const updatedFlags = { ...flags };
  
  // 総好感度が500以上で解放
  if (totalAffection >= 500 && !flags['bond_stat_unlocked']) {
    updatedFlags['hidden_stat_trigger'] = true;
  }
  
  return updatedFlags;
}

/**
 * 幻装レベルに必要なポイント閾値
 */
export const GLAMOR_LEVEL_THRESHOLDS: Record<number, number> = {
  0: 0,
  1: 40,
  2: 120,
  3: 240,
  4: 400,
  5: 600,
  6: 840
};

/**
 * 現在のポイントから幻装レベルを計算
 */
export function calculateGlamorLevel(points: number): number {
  for (let level = 6; level >= 0; level--) {
    if (points >= GLAMOR_LEVEL_THRESHOLDS[level]) {
      return level;
    }
  }
  return 0;
}

/**
 * 次のレベルまでの進捗を計算
 */
export function calculateGlamorProgress(points: number, currentLevel: number): {
  current: number;
  required: number;
  percentage: number;
} {
  if (currentLevel >= 6) {
    return { current: points, required: GLAMOR_LEVEL_THRESHOLDS[6], percentage: 100 };
  }
  
  const currentThreshold = GLAMOR_LEVEL_THRESHOLDS[currentLevel];
  const nextThreshold = GLAMOR_LEVEL_THRESHOLDS[currentLevel + 1];
  const progressPoints = points - currentThreshold;
  const requiredPoints = nextThreshold - currentThreshold;
  const percentage = Math.floor((progressPoints / requiredPoints) * 100);
  
  return {
    current: progressPoints,
    required: requiredPoints,
    percentage: Math.min(100, Math.max(0, percentage))
  };
}

/**
 * 幻装の安定度を計算（経営状況に基づく）
 */
export function calculateGlamorStability(
  consecutiveProfitDays: number,
  consecutiveLossDays: number,
  reputation: number
): number {
  let stability = 50; // 基本値
  
  // 連続黒字で安定度上昇
  stability += consecutiveProfitDays * 5;
  
  // 連続赤字で安定度低下
  stability -= consecutiveLossDays * 10;
  
  // 評判による補正
  stability += Math.floor(reputation / 10);
  
  // 0-100の範囲にクランプ
  return Math.max(0, Math.min(100, stability));
}
