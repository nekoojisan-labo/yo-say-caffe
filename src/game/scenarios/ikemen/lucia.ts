// src/game/scenarios/ikemen/lucia.ts
// ルシア 個別シナリオ - 光の王子との恋物語（5章構成）

import { ScenarioChapter } from '@/types';

/**
 * ルシア 個別シナリオ
 * 
 * 王族階級 - 結婚には幻装レベル6が必要
 * 
 * 第1章: 光の王子（初来店）
 * 第2章: 仮面の下（好感度100〜）
 * 第3章: 王宮の影（好感度300〜）
 * 第4章: 禁じられた恋（好感度500〜）
 * 第5章: 光と共に（好感度800〜）
 */
export const LUCIA_SCENARIOS: ScenarioChapter[] = [
  // ============================================
  // 第1章: 光の王子
  // ============================================
  {
    id: 'lucia_chapter1',
    title: '第1章：光の王子',
    description: '妖精王国の王子ルシアとの出会い',
    triggerCondition: {
      flag: { key: 'lucia_first_visit', value: true }
    },
    events: [
      {
        id: 'luc1_1',
        type: 'narration',
        text: 'ある日の午後、カフェに眩い光が差し込んだ。',
        nextEventId: 'luc1_2'
      },
      {
        id: 'luc1_2',
        type: 'narration',
        text: '入ってきたのは、金色の髪に透き通るような碧眼の青年。その姿は、まるで光の化身のようだった。',
        nextEventId: 'luc1_3'
      },
      {
        id: 'luc1_3',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: 'ここが噂の「フェアリーテイル」か。なかなか趣のある店だね。',
        emotion: 'normal',
        nextEventId: 'luc1_4'
      },
      {
        id: 'luc1_4',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'いらっしゃいませ。お好きな席へどうぞ。',
        emotion: 'normal',
        nextEventId: 'luc1_5'
      },
      {
        id: 'luc1_5',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: 'ありがとう。君がここの店主？ 若いのに感心だ。',
        emotion: 'happy',
        nextEventId: 'luc1_6'
      },
      {
        id: 'luc1_6',
        type: 'narration',
        text: '（この人...どこか普通じゃない雰囲気がある...）',
        nextEventId: 'luc1_7'
      },
      {
        id: 'luc1_7',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: 'おすすめは何かな？ 僕は甘いものが好きなんだ。',
        emotion: 'normal',
        nextEventId: 'luc1_8'
      },
      {
        id: 'luc1_8',
        type: 'choice',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: '何をお勧めしよう...',
        choices: [
          {
            text: '特製フルーツタルトがおすすめです',
            nextEventId: 'luc1_9a',
            effects: {
              affection: { characterId: 'lucia', amount: 15 }
            }
          },
          {
            text: '紅茶と焼き菓子のセットはいかがですか',
            nextEventId: 'luc1_9b',
            effects: {
              affection: { characterId: 'lucia', amount: 10 }
            }
          },
          {
            text: 'メニューをご覧ください',
            nextEventId: 'luc1_9c',
            effects: {
              affection: { characterId: 'lucia', amount: 5 }
            }
          }
        ]
      },
      {
        id: 'luc1_9a',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: 'フルーツタルト！ いいね、それをもらおう。君のセンス、気に入ったよ。',
        emotion: 'happy',
        nextEventId: 'luc1_10'
      },
      {
        id: 'luc1_9b',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: '紅茶か。上品な選択だね。それでお願いしよう。',
        emotion: 'normal',
        nextEventId: 'luc1_10'
      },
      {
        id: 'luc1_9c',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: 'ふむ...じゃあ、一番高いものをもらおうか。',
        emotion: 'normal',
        nextEventId: 'luc1_10'
      },
      {
        id: 'luc1_10',
        type: 'narration',
        text: '注文を受け、丁寧に準備して提供した。',
        nextEventId: 'luc1_11'
      },
      {
        id: 'luc1_11',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: '...美味しい。王宮の菓子職人にも負けない味だ。',
        emotion: 'happy',
        nextEventId: 'luc1_12'
      },
      {
        id: 'luc1_12',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: '王宮...？ もしかして、あなたは...',
        emotion: 'surprised',
        nextEventId: 'luc1_13'
      },
      {
        id: 'luc1_13',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: 'ああ、言ってなかったね。僕はルシア。妖精王国の第一王子だ。',
        emotion: 'normal',
        nextEventId: 'luc1_14'
      },
      {
        id: 'luc1_14',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'お、王子様...!?',
        emotion: 'surprised',
        nextEventId: 'luc1_15'
      },
      {
        id: 'luc1_15',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: 'そんなに驚かないでくれ。ここでは普通の客として扱ってほしいんだ。',
        emotion: 'normal',
        nextEventId: 'luc1_16'
      },
      {
        id: 'luc1_16',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: '王宮は息が詰まるからね。たまにはこうして、自由に過ごしたいんだ。',
        emotion: 'sad',
        nextEventId: 'luc1_17'
      },
      {
        id: 'luc1_17',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: 'また来てもいいかな？ 君の店、気に入ったよ。',
        emotion: 'happy',
        nextEventId: 'luc1_18'
      },
      {
        id: 'luc1_18',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'はい、いつでもお待ちしています。',
        emotion: 'happy',
        nextEventId: 'luc1_19'
      },
      {
        id: 'luc1_19',
        type: 'narration',
        text: 'ルシアは優雅に微笑むと、金貨を多めにテーブルに置いて去っていった。',
        nextEventId: 'luc1_end'
      },
      {
        id: 'luc1_end',
        type: 'effect',
        effects: {
          money: 500,
          flag: { key: 'lucia_met', value: true },
          flag2: { key: 'lucia_chapter1_complete', value: true }
        },
        nextEventId: null
      }
    ],
    isCompleted: false
  },

  // ============================================
  // 第2章: 仮面の下
  // ============================================
  {
    id: 'lucia_chapter2',
    title: '第2章：仮面の下',
    description: 'ルシアの本当の姿を知る',
    triggerCondition: {
      flag: { key: 'lucia_affection_100', value: true }
    },
    events: [
      {
        id: 'luc2_1',
        type: 'narration',
        text: 'ルシアは定期的にカフェを訪れるようになった。',
        nextEventId: 'luc2_2'
      },
      {
        id: 'luc2_2',
        type: 'narration',
        text: '今日は珍しく、疲れた様子で入ってきた。',
        nextEventId: 'luc2_3'
      },
      {
        id: 'luc2_3',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: '...いつもの席、空いてるかな。',
        emotion: 'sad',
        nextEventId: 'luc2_4'
      },
      {
        id: 'luc2_4',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'ルシア様、今日は元気がないみたいですね...',
        emotion: 'sad',
        nextEventId: 'luc2_5'
      },
      {
        id: 'luc2_5',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: '...「様」はやめてくれ。ここでは普通に接してほしいって言っただろう？',
        emotion: 'normal',
        nextEventId: 'luc2_6'
      },
      {
        id: 'luc2_6',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: 'すまない、今日は少し...王宮で嫌なことがあってね。',
        emotion: 'sad',
        nextEventId: 'luc2_7'
      },
      {
        id: 'luc2_7',
        type: 'choice',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'どうしよう...',
        choices: [
          {
            text: '話を聞きましょうか？',
            nextEventId: 'luc2_8a',
            effects: {
              affection: { characterId: 'lucia', amount: 20 }
            }
          },
          {
            text: '特別なお菓子を用意しますね',
            nextEventId: 'luc2_8b',
            effects: {
              affection: { characterId: 'lucia', amount: 15 }
            }
          },
          {
            text: 'そっとしておきますね',
            nextEventId: 'luc2_8c',
            effects: {
              affection: { characterId: 'lucia', amount: 10 }
            }
          }
        ]
      },
      {
        id: 'luc2_8a',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: '...君は優しいね。王宮では誰も、僕の話なんて聞いてくれない。',
        emotion: 'sad',
        nextEventId: 'luc2_9'
      },
      {
        id: 'luc2_8b',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: '...ありがとう。君の心遣いが嬉しいよ。',
        emotion: 'happy',
        nextEventId: 'luc2_9'
      },
      {
        id: 'luc2_8c',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: '...いや、少し話を聞いてもらえないかな。君になら、話せる気がする。',
        emotion: 'normal',
        nextEventId: 'luc2_9'
      },
      {
        id: 'luc2_9',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: '王子という立場は、思っているより窮屈なんだ。',
        emotion: 'sad',
        nextEventId: 'luc2_10'
      },
      {
        id: 'luc2_10',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: '常に完璧を求められる。笑顔の仮面を被り続けなければならない。',
        emotion: 'sad',
        nextEventId: 'luc2_11'
      },
      {
        id: 'luc2_11',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: '政略結婚の話も絶えない。僕の意思なんて、誰も気にしない。',
        emotion: 'sad',
        nextEventId: 'luc2_12'
      },
      {
        id: 'luc2_12',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'ルシア...',
        emotion: 'sad',
        nextEventId: 'luc2_13'
      },
      {
        id: 'luc2_13',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: 'でも、この店に来ると...ホッとするんだ。君の前では、仮面を外せる気がする。',
        emotion: 'happy',
        nextEventId: 'luc2_14'
      },
      {
        id: 'luc2_14',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: 'ありがとう。話を聞いてくれて。...また来るよ。',
        emotion: 'happy',
        nextEventId: 'luc2_end'
      },
      {
        id: 'luc2_end',
        type: 'effect',
        effects: {
          flag: { key: 'lucia_chapter2_complete', value: true }
        },
        nextEventId: null
      }
    ],
    isCompleted: false
  },

  // ============================================
  // 第3章: 王宮の影
  // ============================================
  {
    id: 'lucia_chapter3',
    title: '第3章：王宮の影',
    description: '王宮からの圧力とルシアの決意',
    triggerCondition: {
      flag: { key: 'lucia_affection_300', value: true }
    },
    events: [
      {
        id: 'luc3_1',
        type: 'narration',
        text: 'ある日、見知らぬ妖精がカフェにやってきた。',
        nextEventId: 'luc3_2'
      },
      {
        id: 'luc3_2',
        type: 'narration',
        text: '高級そうな服装、見下すような目。王宮の使者のようだ。',
        nextEventId: 'luc3_3'
      },
      {
        id: 'luc3_3',
        type: 'dialogue',
        speaker: 'narration',
        speakerName: '王宮の使者',
        text: 'お前がこの店の主人か。ルシア殿下がここに通っていると聞いたが。',
        emotion: 'normal',
        nextEventId: 'luc3_4'
      },
      {
        id: 'luc3_4',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'は、はい...時々いらっしゃいます...',
        emotion: 'surprised',
        nextEventId: 'luc3_5'
      },
      {
        id: 'luc3_5',
        type: 'dialogue',
        speaker: 'narration',
        speakerName: '王宮の使者',
        text: '殿下はもうすぐ婚約が決まる身だ。下賤な店に入り浸られては困る。',
        emotion: 'angry',
        nextEventId: 'luc3_6'
      },
      {
        id: 'luc3_6',
        type: 'dialogue',
        speaker: 'narration',
        speakerName: '王宮の使者',
        text: '今後、殿下が来ても追い返せ。さもなくば、この店を潰すことになるぞ。',
        emotion: 'angry',
        nextEventId: 'luc3_7'
      },
      {
        id: 'luc3_7',
        type: 'narration',
        text: '使者が去った後、ルシアが現れた。',
        nextEventId: 'luc3_8'
      },
      {
        id: 'luc3_8',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: '...今の男、何か言っていたかい？',
        emotion: 'normal',
        nextEventId: 'luc3_9'
      },
      {
        id: 'luc3_9',
        type: 'choice',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: '正直に話すべきか...',
        choices: [
          {
            text: '正直に全て話す',
            nextEventId: 'luc3_10a',
            effects: {
              affection: { characterId: 'lucia', amount: 25 }
            }
          },
          {
            text: '大したことじゃないと誤魔化す',
            nextEventId: 'luc3_10b',
            effects: {
              affection: { characterId: 'lucia', amount: 10 }
            }
          }
        ]
      },
      {
        id: 'luc3_10a',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: '...そうか。君に迷惑をかけてしまったね。すまない。',
        emotion: 'sad',
        nextEventId: 'luc3_11'
      },
      {
        id: 'luc3_10b',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: '...嘘が下手だね。顔に書いてあるよ。大丈夫、察しはついてる。',
        emotion: 'normal',
        nextEventId: 'luc3_11'
      },
      {
        id: 'luc3_11',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: '婚約か...。僕の意思は関係なく、全て決められていくんだ。',
        emotion: 'sad',
        nextEventId: 'luc3_12'
      },
      {
        id: 'luc3_12',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: 'でも...僕はもう、自分を偽るのは嫌なんだ。',
        emotion: 'normal',
        nextEventId: 'luc3_13'
      },
      {
        id: 'luc3_13',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: '君といる時間が、僕にとってどれだけ大切か...彼らにはわからないだろうね。',
        emotion: 'happy',
        nextEventId: 'luc3_14'
      },
      {
        id: 'luc3_14',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: '心配しないで。この店は僕が守る。誰にも潰させない。',
        emotion: 'normal',
        nextEventId: 'luc3_end'
      },
      {
        id: 'luc3_end',
        type: 'effect',
        effects: {
          flag: { key: 'lucia_chapter3_complete', value: true },
          flag2: { key: 'lucia_protection', value: true }
        },
        nextEventId: null
      }
    ],
    isCompleted: false
  },

  // ============================================
  // 第4章: 禁じられた恋
  // ============================================
  {
    id: 'lucia_chapter4',
    title: '第4章：禁じられた恋',
    description: 'ルシアの告白',
    triggerCondition: {
      flag: { key: 'lucia_affection_500', value: true }
    },
    events: [
      {
        id: 'luc4_1',
        type: 'narration',
        text: '閉店後、ルシアがカフェに残っていた。',
        nextEventId: 'luc4_2'
      },
      {
        id: 'luc4_2',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: '...少し、話があるんだ。座ってくれないかな。',
        emotion: 'normal',
        nextEventId: 'luc4_3'
      },
      {
        id: 'luc4_3',
        type: 'narration',
        text: 'ルシアの表情は真剣だった。',
        nextEventId: 'luc4_4'
      },
      {
        id: 'luc4_4',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: '僕は王子として生まれた。それは変えられない事実だ。',
        emotion: 'normal',
        nextEventId: 'luc4_5'
      },
      {
        id: 'luc4_5',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: 'でも...心は自由だ。誰を好きになるかは、僕自身が決める。',
        emotion: 'normal',
        nextEventId: 'luc4_6'
      },
      {
        id: 'luc4_6',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: '君が好きだ。王子としてではなく、一人の男として。',
        emotion: 'happy',
        nextEventId: 'luc4_7'
      },
      {
        id: 'luc4_7',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'ルシア...！',
        emotion: 'surprised',
        nextEventId: 'luc4_8'
      },
      {
        id: 'luc4_8',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: '身分の差があるのは分かっている。王宮が許さないことも。',
        emotion: 'sad',
        nextEventId: 'luc4_9'
      },
      {
        id: 'luc4_9',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: 'でも、僕は君と一緒にいたい。それが僕の本心だ。',
        emotion: 'normal',
        nextEventId: 'luc4_10'
      },
      {
        id: 'luc4_10',
        type: 'choice',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: '心臓が高鳴る...',
        choices: [
          {
            text: '私も...ルシアが好き',
            nextEventId: 'luc4_11a',
            effects: {
              affection: { characterId: 'lucia', amount: 50 }
            }
          },
          {
            text: 'でも、王宮が...',
            nextEventId: 'luc4_11b',
            effects: {
              affection: { characterId: 'lucia', amount: 30 }
            }
          },
          {
            text: '...考えさせてください',
            nextEventId: 'luc4_11c',
            effects: {
              affection: { characterId: 'lucia', amount: 15 }
            }
          }
        ]
      },
      {
        id: 'luc4_11a',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: '...本当に？ 嬉しい...！ こんなに幸せな気持ちは初めてだ。',
        emotion: 'happy',
        nextEventId: 'luc4_12'
      },
      {
        id: 'luc4_11b',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: '王宮のことは僕が何とかする。君は何も心配しなくていい。',
        emotion: 'normal',
        nextEventId: 'luc4_12'
      },
      {
        id: 'luc4_11c',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: '...もちろん。急かすつもりはないよ。ただ、僕の気持ちは変わらない。',
        emotion: 'normal',
        nextEventId: 'luc4_12'
      },
      {
        id: 'luc4_12',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: 'これからは、もっと君のことを守りたい。傍にいさせてくれ。',
        emotion: 'happy',
        nextEventId: 'luc4_13'
      },
      {
        id: 'luc4_13',
        type: 'narration',
        text: 'ルシアの手が、そっと私の手を包んだ。温かくて、優しい。',
        nextEventId: 'luc4_end'
      },
      {
        id: 'luc4_end',
        type: 'effect',
        effects: {
          flag: { key: 'lucia_chapter4_complete', value: true },
          flag2: { key: 'lucia_confession', value: true }
        },
        nextEventId: null
      }
    ],
    isCompleted: false
  },

  // ============================================
  // 第5章: 光と共に
  // ============================================
  {
    id: 'lucia_chapter5',
    title: '第5章：光と共に',
    description: 'ルシアとの未来',
    triggerCondition: {
      flag: { key: 'lucia_affection_800', value: true }
    },
    events: [
      {
        id: 'luc5_1',
        type: 'narration',
        text: 'ある日、ルシアが正装で現れた。',
        nextEventId: 'luc5_2'
      },
      {
        id: 'luc5_2',
        type: 'narration',
        text: 'その姿は、いつもの彼とは違う。王子としての威厳に満ちていた。',
        nextEventId: 'luc5_3'
      },
      {
        id: 'luc5_3',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: '今日は、大切な話があって来たんだ。',
        emotion: 'normal',
        nextEventId: 'luc5_4'
      },
      {
        id: 'luc5_4',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: '昨日、父上...国王に直談判してきた。',
        emotion: 'normal',
        nextEventId: 'luc5_5'
      },
      {
        id: 'luc5_5',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: '国王様に...!?',
        emotion: 'surprised',
        nextEventId: 'luc5_6'
      },
      {
        id: 'luc5_6',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: '君と結婚したいと。政略結婚は受け入れられないと。',
        emotion: 'normal',
        nextEventId: 'luc5_7'
      },
      {
        id: 'luc5_7',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: '最初は激怒されたよ。でも、最後には認めてくれた。',
        emotion: 'happy',
        nextEventId: 'luc5_8'
      },
      {
        id: 'luc5_8',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: '条件がある。君の幻装レベルが最高位であること。それなら、王族の伴侶として認められると。',
        emotion: 'normal',
        nextEventId: 'luc5_9'
      },
      {
        id: 'luc5_9',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: '...君なら、きっと達成できる。僕は信じている。',
        emotion: 'happy',
        nextEventId: 'luc5_10'
      },
      {
        id: 'luc5_10',
        type: 'choice',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'ルシアの真剣な眼差しを受けて...',
        choices: [
          {
            text: '必ず達成してみせる。ルシアと一緒にいたいから',
            nextEventId: 'luc5_11a',
            effects: {
              affection: { characterId: 'lucia', amount: 100 }
            }
          },
          {
            text: 'ルシアがそこまでしてくれるなら...',
            nextEventId: 'luc5_11b',
            effects: {
              affection: { characterId: 'lucia', amount: 70 }
            }
          }
        ]
      },
      {
        id: 'luc5_11a',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: '...ありがとう。君となら、どんな困難も乗り越えられる。',
        emotion: 'happy',
        nextEventId: 'luc5_12'
      },
      {
        id: 'luc5_11b',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: '僕は君のために何でもする。だから、一緒に頑張ろう。',
        emotion: 'happy',
        nextEventId: 'luc5_12'
      },
      {
        id: 'luc5_12',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: 'いつか、君を光の王宮に迎える日を楽しみにしている。',
        emotion: 'happy',
        nextEventId: 'luc5_13'
      },
      {
        id: 'luc5_13',
        type: 'dialogue',
        speaker: 'lucia',
        speakerName: 'ルシア',
        text: '僕の光は、君だけを照らすから。',
        emotion: 'happy',
        nextEventId: 'luc5_14'
      },
      {
        id: 'luc5_14',
        type: 'narration',
        text: 'ルシアが優しく抱きしめてくれた。その温もりは、光のように暖かかった。',
        nextEventId: 'luc5_end'
      },
      {
        id: 'luc5_end',
        type: 'effect',
        effects: {
          flag: { key: 'lucia_chapter5_complete', value: true },
          flag2: { key: 'lucia_route_complete', value: true }
        },
        nextEventId: null
      }
    ],
    isCompleted: false
  }
];

/**
 * ルシアシナリオの進行状況を取得
 */
export function getLuciaProgress(
  completedScenarios: string[],
  flags: Record<string, boolean | string | number>
): {
  currentChapter: number;
  isRouteComplete: boolean;
  nextTrigger: string;
  canMarry: boolean;
} {
  const isRouteComplete = flags['lucia_route_complete'] === true;
  const glamorLevel6 = flags['glamor_level_6_achieved'] === true;
  
  let currentChapter = 0;
  let nextTrigger = '初来店を待つ';
  
  if (flags['lucia_chapter5_complete']) {
    currentChapter = 5;
    nextTrigger = isRouteComplete ? '完了' : 'エンディングへ';
  } else if (flags['lucia_chapter4_complete']) {
    currentChapter = 4;
    nextTrigger = '好感度800以上';
  } else if (flags['lucia_chapter3_complete']) {
    currentChapter = 3;
    nextTrigger = '好感度500以上';
  } else if (flags['lucia_chapter2_complete']) {
    currentChapter = 2;
    nextTrigger = '好感度300以上';
  } else if (flags['lucia_chapter1_complete']) {
    currentChapter = 1;
    nextTrigger = '好感度100以上';
  } else if (flags['lucia_met']) {
    currentChapter = 1;
    nextTrigger = '好感度100以上';
  }
  
  return {
    currentChapter,
    isRouteComplete,
    nextTrigger,
    canMarry: isRouteComplete && glamorLevel6
  };
}

/**
 * ルシアの好感度フラグを更新
 */
export function updateLuciaAffectionFlags(
  affection: number,
  flags: Record<string, boolean | string | number>
): Record<string, boolean | string | number> {
  const updatedFlags = { ...flags };
  
  if (affection >= 100 && !flags['lucia_affection_100']) {
    updatedFlags['lucia_affection_100'] = true;
  }
  if (affection >= 300 && !flags['lucia_affection_300']) {
    updatedFlags['lucia_affection_300'] = true;
  }
  if (affection >= 500 && !flags['lucia_affection_500']) {
    updatedFlags['lucia_affection_500'] = true;
  }
  if (affection >= 800 && !flags['lucia_affection_800']) {
    updatedFlags['lucia_affection_800'] = true;
  }
  
  return updatedFlags;
}
