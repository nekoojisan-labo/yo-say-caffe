// src/game/scenarios/prologue.ts
// プロローグシナリオ - シオンとの出会いと世界観説明

import { ScenarioChapter } from '@/types';

/**
 * プロローグシナリオ
 * ゲーム開始時に自動で発生
 * 主人公がカフェを継ぐことになった経緯とシオンとの出会いを描く
 */
export const PROLOGUE: ScenarioChapter[] = [
  {
    id: 'prologue_chapter1',
    title: 'プロローグ：森のカフェ',
    description: '祖母の遺したカフェを継ぐことになった主人公',
    triggerCondition: {
      day: 1,
      flag: { key: 'game_started', value: true }
    },
    events: [
      // シーン1: 導入 - カフェの外観
      {
        id: 'pro_1_1',
        type: 'narration',
        text: '森の奥深く、木漏れ日が差し込む小道の先に、一軒の小さなカフェがあった。',
        nextEventId: 'pro_1_2'
      },
      {
        id: 'pro_1_2',
        type: 'narration',
        text: '「喫茶フェアリーテイル」——私の祖母が長年営んでいた、妖精やエルフ、獣人たちが集うカフェ。',
        nextEventId: 'pro_1_3'
      },
      {
        id: 'pro_1_3',
        type: 'narration',
        text: '先月、祖母が亡くなり、私はこのカフェを継ぐことになった。',
        nextEventId: 'pro_1_4'
      },
      {
        id: 'pro_1_4',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: '祖母の店...私に続けられるかな。',
        emotion: 'sad',
        nextEventId: 'pro_1_5'
      },
      {
        id: 'pro_1_5',
        type: 'narration',
        text: 'カフェの扉を開けると、懐かしい珈琲の香りが漂ってきた。',
        nextEventId: 'pro_1_6'
      },
      {
        id: 'pro_1_6',
        type: 'narration',
        text: '店内には、祖母の思い出が詰まった調度品が並んでいる。',
        nextEventId: 'pro_1_7'
      },
      
      // シーン2: シオンとの出会い
      {
        id: 'pro_1_7',
        type: 'narration',
        text: 'その時——店の奥から、不思議な光が漏れているのに気づいた。',
        nextEventId: 'pro_1_8'
      },
      {
        id: 'pro_1_8',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: '...誰かいるの？',
        emotion: 'surprised',
        nextEventId: 'pro_1_9'
      },
      {
        id: 'pro_1_9',
        type: 'narration',
        text: '光の中から、長い銀髪を持つ美しい青年が姿を現した。',
        nextEventId: 'pro_1_10'
      },
      {
        id: 'pro_1_10',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...ようやく来たか。お前が、ハナコの孫娘だな。',
        emotion: 'normal',
        nextEventId: 'pro_1_11'
      },
      {
        id: 'pro_1_11',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'えっ...!? あなたは誰!?',
        emotion: 'surprised',
        nextEventId: 'pro_1_12'
      },
      {
        id: 'pro_1_12',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '私はシオン。この森の守護者であり...お前の祖母とは古い友人だ。',
        emotion: 'normal',
        nextEventId: 'pro_1_13'
      },
      {
        id: 'pro_1_13',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '千年以上、この森を見守ってきた。',
        emotion: 'normal',
        nextEventId: 'pro_1_14'
      },
      {
        id: 'pro_1_14',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: '千年...!? 祖母の友人...？',
        emotion: 'surprised',
        nextEventId: 'pro_1_15'
      },
      
      // シーン3: 世界観と状況説明
      {
        id: 'pro_1_15',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: 'このカフェは、ただの店ではない。森と人間界、そして妖精界をつなぐ特別な場所だ。',
        emotion: 'normal',
        nextEventId: 'pro_1_16'
      },
      {
        id: 'pro_1_16',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: 'ハナコ...お前の祖母は、その役目を長年果たしてきた。',
        emotion: 'normal',
        nextEventId: 'pro_1_17'
      },
      {
        id: 'pro_1_17',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: '祖母が...そんな大切な仕事を...',
        emotion: 'sad',
        nextEventId: 'pro_1_18'
      },
      {
        id: 'pro_1_18',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: 'そして今、その役目はお前に引き継がれた。',
        emotion: 'normal',
        nextEventId: 'pro_1_19'
      },
      {
        id: 'pro_1_19',
        type: 'choice',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: '私に...そんな大役が務まるでしょうか？',
        choices: [
          {
            text: '祖母のために、頑張ります',
            nextEventId: 'pro_1_20a',
            effects: {
              affection: { characterId: 'shion', amount: 10 }
            }
          },
          {
            text: '正直、自信がありません...',
            nextEventId: 'pro_1_20b',
            effects: {
              affection: { characterId: 'shion', amount: 5 }
            }
          }
        ]
      },
      {
        id: 'pro_1_20a',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...ふん、その意気だ。ハナコもそう言っていたよ。',
        emotion: 'happy',
        nextEventId: 'pro_1_21'
      },
      {
        id: 'pro_1_20b',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '...正直なのはいいことだ。だが、心配するな。私が手伝おう。',
        emotion: 'normal',
        nextEventId: 'pro_1_21'
      },
      
      // シーン4: 幻装の魔法について
      {
        id: 'pro_1_21',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: 'ところで、お前にはまだ教えていないことがある。',
        emotion: 'normal',
        nextEventId: 'pro_1_22'
      },
      {
        id: 'pro_1_22',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '「幻装の魔法」——これがこのカフェで働く上で欠かせない力だ。',
        emotion: 'normal',
        nextEventId: 'pro_1_23'
      },
      {
        id: 'pro_1_23',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: '幻装の魔法...？',
        emotion: 'surprised',
        nextEventId: 'pro_1_24'
      },
      {
        id: 'pro_1_24',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: 'この森の住人たちは、様々な種族がいる。妖精、エルフ、獣人...',
        emotion: 'normal',
        nextEventId: 'pro_1_25'
      },
      {
        id: 'pro_1_25',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '彼らの中には、身分の高い者も多い。カフェの店主には相応の品格が求められる。',
        emotion: 'normal',
        nextEventId: 'pro_1_26'
      },
      {
        id: 'pro_1_26',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '幻装の魔法は、お前の姿を美しく変える力だ。経営が上手くいけば、魔力が高まり、より美しい姿になれる。',
        emotion: 'normal',
        nextEventId: 'pro_1_27'
      },
      {
        id: 'pro_1_27',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'カフェの経営と...見た目が連動するということですか？',
        emotion: 'normal',
        nextEventId: 'pro_1_28'
      },
      {
        id: 'pro_1_28',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: 'そうだ。そして「照覧の魔法」を使えば、自分の状態を確認できる。',
        emotion: 'normal',
        nextEventId: 'pro_1_29'
      },
      {
        id: 'pro_1_29',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: '詳しい使い方は、明日以降に教えよう。まずは今日、店の準備をするといい。',
        emotion: 'normal',
        nextEventId: 'pro_1_30'
      },
      
      // シーン5: プロローグ終了
      {
        id: 'pro_1_30',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: 'ああ、それと...何か困ったことがあれば、いつでも声をかけろ。',
        emotion: 'normal',
        nextEventId: 'pro_1_31'
      },
      {
        id: 'pro_1_31',
        type: 'dialogue',
        speaker: 'shion',
        speakerName: 'シオン',
        text: 'ハナコとの約束だからな...お前のことは、私が見守る。',
        emotion: 'happy',
        nextEventId: 'pro_1_32'
      },
      {
        id: 'pro_1_32',
        type: 'narration',
        text: 'シオンは優しく微笑むと、光の中に消えていった。',
        nextEventId: 'pro_1_33'
      },
      {
        id: 'pro_1_33',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: '森の守護者...祖母との約束...私、頑張らなきゃ。',
        emotion: 'normal',
        nextEventId: 'pro_1_34'
      },
      {
        id: 'pro_1_34',
        type: 'narration',
        text: 'こうして、私の「喫茶フェアリーテイル」での日々が始まった——',
        nextEventId: 'pro_1_end'
      },
      {
        id: 'pro_1_end',
        type: 'effect',
        effects: {
          flag: { key: 'prologue_complete', value: true }
        },
        nextEventId: null
      }
    ],
    isCompleted: false
  }
];

/**
 * プロローグ完了チェック
 */
export function isPrologueComplete(flags: Record<string, boolean | string | number>): boolean {
  return flags['prologue_complete'] === true;
}

/**
 * プロローグを取得
 */
export function getPrologueScenario(
  day: number,
  flags: Record<string, boolean | string | number>,
  completedScenarios: string[]
): ScenarioChapter | null {
  // 既に完了している場合はnull
  if (completedScenarios.includes('prologue_chapter1')) {
    return null;
  }
  
  // Day1でゲームが開始されたらプロローグを返す
  if (day === 1 && flags['game_started'] === true && !flags['prologue_complete']) {
    return PROLOGUE[0];
  }
  
  return null;
}
