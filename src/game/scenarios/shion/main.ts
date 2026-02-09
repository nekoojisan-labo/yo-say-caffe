// src/game/scenarios/shion/main.ts
// シオン メインシナリオ - 森の守護者との恋物語（5章構成）

import { ScenarioChapter } from '@/types';

/**
 * シオン メインシナリオ
 * 
 * 第1章: 森の賢者の秘密（Day 7〜、プロローグ完了後）
 * 第2章: 失われた記憶（好感度100〜）
 * 第3章: 封印の真実（好感度300〜）
 * 第4章: 千年の想い（好感度500〜）
 * 第5章: 永遠の絆（好感度800〜）
 */
export const SHION_MAIN_SCENARIOS: ScenarioChapter[] = [
  // ============================================
  // 第1章: 森の賢者の秘密
  // ============================================
  {
    id: 'shion_chapter1',
    title: '第1章：森の賢者の秘密',
    description: 'シオンの正体と森の秘密に触れる',
    triggerCondition: {
      day: 7,
      flag: { key: 'prologue_complete', value: true }
    },
    events: [
      {
        id: 'sh1_1',
        type: 'narration',
        text: 'カフェを開いて1週間が経った。少しずつ、この仕事にも慣れてきた。',
        nextEventId: 'sh1_2'
      },
      {
        id: 'sh1_2',
        type: 'narration',
        text: '閉店後、店の片付けをしていると、シオンが姿を現した。',
        nextEventId: 'sh1_3'
      },
      {
        id: 'sh1_3',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...順調のようだな。ハナコも喜んでいるだろう。',
        emotion: 'normal',
        nextEventId: 'sh1_4'
      },
      {
        id: 'sh1_4',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'シオンさん...いつも見守ってくれてありがとうございます。',
        emotion: 'happy',
        nextEventId: 'sh1_5'
      },
      {
        id: 'sh1_5',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...シオンでいい。「さん」は必要ない。',
        emotion: 'normal',
        nextEventId: 'sh1_6'
      },
      {
        id: 'sh1_6',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'あの...シオン。ずっと気になっていたことがあるんです。',
        emotion: 'normal',
        nextEventId: 'sh1_7'
      },
      {
        id: 'sh1_7',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...なんだ？',
        emotion: 'normal',
        nextEventId: 'sh1_8'
      },
      {
        id: 'sh1_8',
        type: 'choice',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: '何を聞こうか...',
        choices: [
          {
            text: 'なぜ千年も森を守っているの？',
            nextEventId: 'sh1_9a',
            effects: {
              affection: { characterId: 'shion', amount: 15 }
            }
          },
          {
            text: '祖母とはどんな関係だったの？',
            nextEventId: 'sh1_9b',
            effects: {
              affection: { characterId: 'shion', amount: 10 }
            }
          },
          {
            text: 'シオンは何者なの？',
            nextEventId: 'sh1_9c',
            effects: {
              affection: { characterId: 'shion', amount: 5 }
            }
          }
        ]
      },
      // 選択肢A: 千年の理由
      {
        id: 'sh1_9a',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...鋭いな。それを聞くか。',
        emotion: 'surprised',
        nextEventId: 'sh1_10a'
      },
      {
        id: 'sh1_10a',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '私は...かつて大きな過ちを犯した。その贖罪として、この森を守り続けている。',
        emotion: 'sad',
        nextEventId: 'sh1_11'
      },
      // 選択肢B: 祖母との関係
      {
        id: 'sh1_9b',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: 'ハナコは...特別な人間だった。私の孤独を癒してくれた、唯一の存在だ。',
        emotion: 'sad',
        nextEventId: 'sh1_10b'
      },
      {
        id: 'sh1_10b',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '彼女がいなければ、私はとうに心を閉ざしていただろう。',
        emotion: 'sad',
        nextEventId: 'sh1_11'
      },
      // 選択肢C: 正体
      {
        id: 'sh1_9c',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...直接的な質問だな。私は「森のエルダー」と呼ばれる存在だ。',
        emotion: 'normal',
        nextEventId: 'sh1_10c'
      },
      {
        id: 'sh1_10c',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '人間でもエルフでもない。この森そのものに近い存在...と言えばわかるか。',
        emotion: 'normal',
        nextEventId: 'sh1_11'
      },
      // 共通ルート
      {
        id: 'sh1_11',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...今はこれ以上話せない。だが、いずれお前にも全てを話す時が来るだろう。',
        emotion: 'normal',
        nextEventId: 'sh1_12'
      },
      {
        id: 'sh1_12',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'シオン...',
        emotion: 'sad',
        nextEventId: 'sh1_13'
      },
      {
        id: 'sh1_13',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...お前の淹れた珈琲は、ハナコに似た味がする。悪くない。',
        emotion: 'happy',
        nextEventId: 'sh1_14'
      },
      {
        id: 'sh1_14',
        type: 'narration',
        text: 'シオンは珍しく微笑むと、光の中に消えていった。',
        nextEventId: 'sh1_end'
      },
      {
        id: 'sh1_end',
        type: 'effect',
        effects: {
          flag: { key: 'shion_chapter1_complete', value: true }
        },
        nextEventId: null
      }
    ],
    isCompleted: false
  },

  // ============================================
  // 第2章: 失われた記憶
  // ============================================
  {
    id: 'shion_chapter2',
    title: '第2章：失われた記憶',
    description: 'シオンの過去と森の秘密が明らかに',
    triggerCondition: {
      flag: { key: 'shion_affection_100', value: true }
    },
    events: [
      {
        id: 'sh2_1',
        type: 'narration',
        text: 'ある夜、不思議な夢を見た。',
        nextEventId: 'sh2_2'
      },
      {
        id: 'sh2_2',
        type: 'narration',
        text: '美しい森の中、銀髪の少年が一人で泣いていた。',
        nextEventId: 'sh2_3'
      },
      {
        id: 'sh2_3',
        type: 'narration',
        text: 'その姿は、どこかシオンに似ていた——',
        nextEventId: 'sh2_4'
      },
      {
        id: 'sh2_4',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: '...ッ！',
        emotion: 'surprised',
        nextEventId: 'sh2_5'
      },
      {
        id: 'sh2_5',
        type: 'narration',
        text: '目が覚めると、シオンがベッドの傍に立っていた。',
        nextEventId: 'sh2_6'
      },
      {
        id: 'sh2_6',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...見てしまったか。私の記憶を。',
        emotion: 'sad',
        nextEventId: 'sh2_7'
      },
      {
        id: 'sh2_7',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'シオン...あれは何？ なぜ泣いていたの？',
        emotion: 'sad',
        nextEventId: 'sh2_8'
      },
      {
        id: 'sh2_8',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...千年前の話だ。私はかつて、一人の少女を守れなかった。',
        emotion: 'sad',
        nextEventId: 'sh2_9'
      },
      {
        id: 'sh2_9',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '彼女は...私にとって大切な存在だった。だが、私の力が及ばず...',
        emotion: 'sad',
        nextEventId: 'sh2_10'
      },
      {
        id: 'sh2_10',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...それ以来、私は誰かを近くに置くことを避けてきた。',
        emotion: 'sad',
        nextEventId: 'sh2_11'
      },
      {
        id: 'sh2_11',
        type: 'choice',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'シオンの痛みを感じて...',
        choices: [
          {
            text: '（そっと手を握る）',
            nextEventId: 'sh2_12a',
            effects: {
              affection: { characterId: 'shion', amount: 25 }
            }
          },
          {
            text: '辛かったね...',
            nextEventId: 'sh2_12b',
            effects: {
              affection: { characterId: 'shion', amount: 15 }
            }
          },
          {
            text: '（何も言えなかった）',
            nextEventId: 'sh2_12c',
            effects: {
              affection: { characterId: 'shion', amount: 10 }
            }
          }
        ]
      },
      {
        id: 'sh2_12a',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...ッ！ お前は...なぜ...',
        emotion: 'surprised',
        nextEventId: 'sh2_13a'
      },
      {
        id: 'sh2_13a',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...温かいな。人の手は。忘れていた。',
        emotion: 'happy',
        nextEventId: 'sh2_14'
      },
      {
        id: 'sh2_12b',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...ああ。だが、もう過ぎたことだ。',
        emotion: 'sad',
        nextEventId: 'sh2_14'
      },
      {
        id: 'sh2_12c',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...すまない。重い話をしてしまったな。',
        emotion: 'normal',
        nextEventId: 'sh2_14'
      },
      {
        id: 'sh2_14',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: 'だが...お前といると、不思議と心が落ち着く。ハナコと同じだ。',
        emotion: 'happy',
        nextEventId: 'sh2_15'
      },
      {
        id: 'sh2_15',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: 'いや...もしかしたら、それ以上かもしれない。',
        emotion: 'normal',
        nextEventId: 'sh2_16'
      },
      {
        id: 'sh2_16',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'シオン...？',
        emotion: 'surprised',
        nextEventId: 'sh2_17'
      },
      {
        id: 'sh2_17',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...何でもない。休め。明日も仕事があるだろう。',
        emotion: 'normal',
        nextEventId: 'sh2_18'
      },
      {
        id: 'sh2_18',
        type: 'narration',
        text: 'シオンの声は、いつもより優しく聞こえた。',
        nextEventId: 'sh2_end'
      },
      {
        id: 'sh2_end',
        type: 'effect',
        effects: {
          flag: { key: 'shion_chapter2_complete', value: true }
        },
        nextEventId: null
      }
    ],
    isCompleted: false
  },

  // ============================================
  // 第3章: 封印の真実
  // ============================================
  {
    id: 'shion_chapter3',
    title: '第3章：封印の真実',
    description: '森に隠された封印とシオンの使命',
    triggerCondition: {
      flag: { key: 'shion_affection_300', value: true }
    },
    events: [
      {
        id: 'sh3_1',
        type: 'narration',
        text: 'ある日、森の奥から不穏な気配が漂ってきた。',
        nextEventId: 'sh3_2'
      },
      {
        id: 'sh3_2',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...来い。見せたいものがある。',
        emotion: 'normal',
        nextEventId: 'sh3_3'
      },
      {
        id: 'sh3_3',
        type: 'narration',
        text: 'シオンに導かれ、森の最深部へと向かった。',
        nextEventId: 'sh3_4'
      },
      {
        id: 'sh3_4',
        type: 'narration',
        text: 'そこには、巨大な古木があった。幹には複雑な紋様が刻まれている。',
        nextEventId: 'sh3_5'
      },
      {
        id: 'sh3_5',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: 'これが「封印の樹」だ。千年前、私はこの樹に強大な闇を封じた。',
        emotion: 'normal',
        nextEventId: 'sh3_6'
      },
      {
        id: 'sh3_6',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: '闘...？',
        emotion: 'surprised',
        nextEventId: 'sh3_7'
      },
      {
        id: 'sh3_7',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: 'かつてこの森を滅ぼそうとした災厄。それを封じるために、私は全ての力を捧げた。',
        emotion: 'normal',
        nextEventId: 'sh3_8'
      },
      {
        id: 'sh3_8',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: 'そして...封印を維持するために、私はこの森に縛られることになった。',
        emotion: 'sad',
        nextEventId: 'sh3_9'
      },
      {
        id: 'sh3_9',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'それで千年も...ずっと一人で...',
        emotion: 'sad',
        nextEventId: 'sh3_10'
      },
      {
        id: 'sh3_10',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: 'だが、封印は永遠ではない。少しずつ力が弱まっている。',
        emotion: 'normal',
        nextEventId: 'sh3_11'
      },
      {
        id: 'sh3_11',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: 'このカフェが繁盛すると、人々の幸せな気持ちが森に力を与える。それが封印を補強するのだ。',
        emotion: 'normal',
        nextEventId: 'sh3_12'
      },
      {
        id: 'sh3_12',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'だから祖母はカフェを...そしてシオンが私を助けてくれたのは...',
        emotion: 'normal',
        nextEventId: 'sh3_13'
      },
      {
        id: 'sh3_13',
        type: 'choice',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...そうだ。だが、それだけではない。お前自身に惹かれているのも事実だ。',
        choices: [
          {
            text: '私も...シオンのことが気になってる',
            nextEventId: 'sh3_14a',
            effects: {
              affection: { characterId: 'shion', amount: 30 }
            }
          },
          {
            text: '封印のために、私にできることは？',
            nextEventId: 'sh3_14b',
            effects: {
              affection: { characterId: 'shion', amount: 20 }
            }
          },
          {
            text: '...（どう答えていいかわからない）',
            nextEventId: 'sh3_14c',
            effects: {
              affection: { characterId: 'shion', amount: 10 }
            }
          }
        ]
      },
      {
        id: 'sh3_14a',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...ッ！ お前は...本当に...',
        emotion: 'surprised',
        nextEventId: 'sh3_15a'
      },
      {
        id: 'sh3_15a',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...嬉しい。千年ぶりに、この感情を思い出した。',
        emotion: 'happy',
        nextEventId: 'sh3_16'
      },
      {
        id: 'sh3_14b',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...お前らしいな。今まで通り、カフェを続けてくれればいい。',
        emotion: 'happy',
        nextEventId: 'sh3_16'
      },
      {
        id: 'sh3_14c',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...すまない。急すぎたな。忘れてくれ。',
        emotion: 'sad',
        nextEventId: 'sh3_16'
      },
      {
        id: 'sh3_16',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '一つ約束してほしい。もし封印が完全に解けそうになったら...その時は私を頼ってくれ。',
        emotion: 'normal',
        nextEventId: 'sh3_17'
      },
      {
        id: 'sh3_17',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'うん、約束する。',
        emotion: 'normal',
        nextEventId: 'sh3_18'
      },
      {
        id: 'sh3_18',
        type: 'narration',
        text: '封印の樹が、淡い光を放った。まるで二人の約束を祝福するかのように。',
        nextEventId: 'sh3_end'
      },
      {
        id: 'sh3_end',
        type: 'effect',
        effects: {
          flag: { key: 'shion_chapter3_complete', value: true },
          flag2: { key: 'seal_truth_revealed', value: true }
        },
        nextEventId: null
      }
    ],
    isCompleted: false
  },

  // ============================================
  // 第4章: 千年の想い
  // ============================================
  {
    id: 'shion_chapter4',
    title: '第4章：千年の想い',
    description: 'シオンの本当の気持ちと告白',
    triggerCondition: {
      flag: { key: 'shion_affection_500', value: true }
    },
    events: [
      {
        id: 'sh4_1',
        type: 'narration',
        text: '満月の夜。カフェの庭で、シオンが月を見上げていた。',
        nextEventId: 'sh4_2'
      },
      {
        id: 'sh4_2',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...来たか。ここに座れ。',
        emotion: 'normal',
        nextEventId: 'sh4_3'
      },
      {
        id: 'sh4_3',
        type: 'narration',
        text: 'シオンの隣に座ると、いつもと違う空気を感じた。',
        nextEventId: 'sh4_4'
      },
      {
        id: 'sh4_4',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '千年生きてきて、多くのものを見てきた。美しいもの、醜いもの、儚いもの。',
        emotion: 'normal',
        nextEventId: 'sh4_5'
      },
      {
        id: 'sh4_5',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: 'だが...お前のような存在は初めてだ。',
        emotion: 'normal',
        nextEventId: 'sh4_6'
      },
      {
        id: 'sh4_6',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'シオン...？',
        emotion: 'surprised',
        nextEventId: 'sh4_7'
      },
      {
        id: 'sh4_7',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: 'お前といると、時間を忘れる。封印のことも、過去の罪も。',
        emotion: 'normal',
        nextEventId: 'sh4_8'
      },
      {
        id: 'sh4_8',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: 'ただ...お前の傍にいたいと思う。これが人間の言う「恋」なのかもしれない。',
        emotion: 'happy',
        nextEventId: 'sh4_9'
      },
      {
        id: 'sh4_9',
        type: 'narration',
        text: 'シオンが初めて、はっきりと気持ちを告げた。',
        nextEventId: 'sh4_10'
      },
      {
        id: 'sh4_10',
        type: 'choice',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: '心臓が高鳴る。どう答えよう...',
        choices: [
          {
            text: '私も同じ気持ち。ずっと一緒にいたい',
            nextEventId: 'sh4_11a',
            effects: {
              affection: { characterId: 'shion', amount: 50 }
            }
          },
          {
            text: 'シオンのこと、大切に思ってる',
            nextEventId: 'sh4_11b',
            effects: {
              affection: { characterId: 'shion', amount: 30 }
            }
          },
          {
            text: '...まだ心の準備ができていない',
            nextEventId: 'sh4_11c',
            effects: {
              affection: { characterId: 'shion', amount: 10 }
            }
          }
        ]
      },
      {
        id: 'sh4_11a',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...本当か？ 私は人間ではない。共に老いることもできない。それでもいいのか？',
        emotion: 'surprised',
        nextEventId: 'sh4_12a'
      },
      {
        id: 'sh4_12a',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'それでも。シオンと過ごす時間は、私にとってかけがえのないものだから。',
        emotion: 'happy',
        nextEventId: 'sh4_13a'
      },
      {
        id: 'sh4_13a',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...ありがとう。千年待った甲斐があった。',
        emotion: 'happy',
        nextEventId: 'sh4_14'
      },
      {
        id: 'sh4_11b',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...それだけで十分だ。焦る必要はない。',
        emotion: 'happy',
        nextEventId: 'sh4_14'
      },
      {
        id: 'sh4_11c',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...そうか。急かしてすまなかった。私は待てる。千年でも。',
        emotion: 'sad',
        nextEventId: 'sh4_14'
      },
      {
        id: 'sh4_14',
        type: 'narration',
        text: 'シオンの手が、そっと私の手を包んだ。温かくて、優しい。',
        nextEventId: 'sh4_15'
      },
      {
        id: 'sh4_15',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: 'これからも、傍にいてくれるか？',
        emotion: 'happy',
        nextEventId: 'sh4_16'
      },
      {
        id: 'sh4_16',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'うん...ずっと。',
        emotion: 'happy',
        nextEventId: 'sh4_17'
      },
      {
        id: 'sh4_17',
        type: 'narration',
        text: '月明かりの下、二人の影が一つに重なった。',
        nextEventId: 'sh4_end'
      },
      {
        id: 'sh4_end',
        type: 'effect',
        effects: {
          flag: { key: 'shion_chapter4_complete', value: true },
          flag2: { key: 'shion_confession', value: true }
        },
        nextEventId: null
      }
    ],
    isCompleted: false
  },

  // ============================================
  // 第5章: 永遠の絆
  // ============================================
  {
    id: 'shion_chapter5',
    title: '第5章：永遠の絆',
    description: '封印の危機と二人の決意',
    triggerCondition: {
      flag: { key: 'shion_affection_800', value: true }
    },
    events: [
      {
        id: 'sh5_1',
        type: 'narration',
        text: 'ある日、森全体が震えた。封印が限界に近づいている。',
        nextEventId: 'sh5_2'
      },
      {
        id: 'sh5_2',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...ついに来たか。封印が崩壊しかけている。',
        emotion: 'normal',
        nextEventId: 'sh5_3'
      },
      {
        id: 'sh5_3',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'シオン！ どうすればいい!?',
        emotion: 'surprised',
        nextEventId: 'sh5_4'
      },
      {
        id: 'sh5_4',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '方法は一つ。私の全ての力を封印に注ぎ込む。',
        emotion: 'normal',
        nextEventId: 'sh5_5'
      },
      {
        id: 'sh5_5',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: 'だが...そうすれば、私は消えてしまうかもしれない。',
        emotion: 'sad',
        nextEventId: 'sh5_6'
      },
      {
        id: 'sh5_6',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'そんな...！ シオンがいなくなるなんて嫌だ！',
        emotion: 'sad',
        nextEventId: 'sh5_7'
      },
      {
        id: 'sh5_7',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...お前と出会えて、幸せだった。それだけで十分だ。',
        emotion: 'happy',
        nextEventId: 'sh5_8'
      },
      {
        id: 'sh5_8',
        type: 'choice',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: '何かできることはないの...!?',
        choices: [
          {
            text: '私の力も使って！ 一緒に封印を！',
            nextEventId: 'sh5_9a',
            effects: {
              affection: { characterId: 'shion', amount: 100 }
            }
          },
          {
            text: '絶対に離さない。何があっても',
            nextEventId: 'sh5_9b',
            effects: {
              affection: { characterId: 'shion', amount: 80 }
            }
          },
          {
            text: '...（シオンの手を強く握る）',
            nextEventId: 'sh5_9c',
            effects: {
              affection: { characterId: 'shion', amount: 60 }
            }
          }
        ]
      },
      {
        id: 'sh5_9a',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...！ お前の中に眠る力...ハナコから受け継いだ「繋ぐ力」か！',
        emotion: 'surprised',
        nextEventId: 'sh5_10'
      },
      {
        id: 'sh5_9b',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...お前の想いが、私に力を与えている。これなら...！',
        emotion: 'surprised',
        nextEventId: 'sh5_10'
      },
      {
        id: 'sh5_9c',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...この温もりが、私を繋ぎ止めている。ありがとう。',
        emotion: 'happy',
        nextEventId: 'sh5_10'
      },
      {
        id: 'sh5_10',
        type: 'narration',
        text: '二人の手が重なった瞬間、眩い光が森を包んだ。',
        nextEventId: 'sh5_11'
      },
      {
        id: 'sh5_11',
        type: 'narration',
        text: 'カフェで育まれた幸せの記憶、お客様との絆、シオンへの想い——',
        nextEventId: 'sh5_12'
      },
      {
        id: 'sh5_12',
        type: 'narration',
        text: 'それら全てが、封印を補強する力となって流れ込んでいく。',
        nextEventId: 'sh5_13'
      },
      {
        id: 'sh5_13',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...封印が安定した。お前のおかげだ。',
        emotion: 'happy',
        nextEventId: 'sh5_14'
      },
      {
        id: 'sh5_14',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'シオン...！ 消えなかった...！',
        emotion: 'happy',
        nextEventId: 'sh5_15'
      },
      {
        id: 'sh5_15',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: 'ああ。そして...もう一つ、変化がある。',
        emotion: 'normal',
        nextEventId: 'sh5_16'
      },
      {
        id: 'sh5_16',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '封印との契約が変わった。もう森に縛られることはない。',
        emotion: 'happy',
        nextEventId: 'sh5_17'
      },
      {
        id: 'sh5_17',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: 'お前と共に生きることが、新しい契約の条件になった。',
        emotion: 'happy',
        nextEventId: 'sh5_18'
      },
      {
        id: 'sh5_18',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'それって...ずっと一緒にいられるってこと...？',
        emotion: 'surprised',
        nextEventId: 'sh5_19'
      },
      {
        id: 'sh5_19',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: 'ああ。千年の孤独の末に、やっと見つけた。',
        emotion: 'happy',
        nextEventId: 'sh5_20'
      },
      {
        id: 'sh5_20',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '——私の永遠を、お前に捧げよう。',
        emotion: 'happy',
        nextEventId: 'sh5_21'
      },
      {
        id: 'sh5_21',
        type: 'narration',
        text: '森の木々が祝福の光を放つ中、二人は永遠の契りを交わした。',
        nextEventId: 'sh5_end'
      },
      {
        id: 'sh5_end',
        type: 'effect',
        effects: {
          flag: { key: 'shion_chapter5_complete', value: true },
          flag2: { key: 'shion_route_complete', value: true },
          flag3: { key: 'seal_restored', value: true }
        },
        nextEventId: null
      }
    ],
    isCompleted: false
  }
];

/**
 * シオンシナリオの進行状況を取得
 */
export function getShionProgress(
  completedScenarios: string[],
  flags: Record<string, boolean | string | number>
): {
  currentChapter: number;
  isRouteComplete: boolean;
  nextTrigger: string;
} {
  if (flags['shion_route_complete']) {
    return { currentChapter: 5, isRouteComplete: true, nextTrigger: '完了' };
  }
  if (flags['shion_chapter5_complete']) {
    return { currentChapter: 5, isRouteComplete: false, nextTrigger: 'エンディングへ' };
  }
  if (flags['shion_chapter4_complete']) {
    return { currentChapter: 4, isRouteComplete: false, nextTrigger: '好感度800以上' };
  }
  if (flags['shion_chapter3_complete']) {
    return { currentChapter: 3, isRouteComplete: false, nextTrigger: '好感度500以上' };
  }
  if (flags['shion_chapter2_complete']) {
    return { currentChapter: 2, isRouteComplete: false, nextTrigger: '好感度300以上' };
  }
  if (flags['shion_chapter1_complete']) {
    return { currentChapter: 1, isRouteComplete: false, nextTrigger: '好感度100以上' };
  }
  if (flags['prologue_complete']) {
    return { currentChapter: 0, isRouteComplete: false, nextTrigger: 'Day7以降' };
  }
  return { currentChapter: 0, isRouteComplete: false, nextTrigger: 'プロローグ完了' };
}

/**
 * 次のシオンシナリオを取得
 */
export function getNextShionScenario(
  completedScenarios: string[],
  flags: Record<string, boolean | string | number>,
  day: number
): ScenarioChapter | null {
  for (const scenario of SHION_MAIN_SCENARIOS) {
    // 既に完了している場合はスキップ
    if (completedScenarios.includes(scenario.id)) continue;
    
    const trigger = scenario.triggerCondition;
    
    // Day条件のチェック
    if (trigger.day && day < trigger.day) continue;
    
    // フラグ条件のチェック
    if (trigger.flag) {
      if (flags[trigger.flag.key] !== trigger.flag.value) continue;
    }
    
    return scenario;
  }
  
  return null;
}
