// src/game/scenarios/events/zephyros.ts
// ゼフィロス イベント - 悪徳成金妖精（Bad Endルート）

import { ScenarioChapter } from '@/types';

/**
 * ゼフィロス イベントシナリオ
 * 
 * 資金難時に登場し、借金を持ちかける悪役キャラクター
 * 借金を受けるとBad Endルートへ
 * 
 * トリガー条件:
 * - 資金が20,000G以下で初登場
 * - 借金後は定期的に取り立てイベント発生
 * - 返済不能でBad End
 */
export const ZEPHYROS_EVENTS: ScenarioChapter[] = [
  // ============================================
  // ゼフィロス初登場 - 甘い誘惑
  // ============================================
  {
    id: 'zephyros_approach',
    title: '甘い誘惑',
    description: '資金難の時、謎の妖精が現れる',
    triggerCondition: {
      flag: { key: 'money_crisis', value: true }
    },
    events: [
      {
        id: 'zeph_app_1',
        type: 'narration',
        text: '閉店後、見知らぬ妖精がカフェに入ってきた。',
        nextEventId: 'zeph_app_2'
      },
      {
        id: 'zeph_app_2',
        type: 'narration',
        text: '金色の羽に、宝石をちりばめた派手な服装。どこか胡散臭い笑みを浮かべている。',
        nextEventId: 'zeph_app_3'
      },
      {
        id: 'zeph_app_3',
        type: 'dialogue',
        speaker: 'zephyros',
        speakerName: 'ゼフィロス',
        text: 'おやおや、これはこれは。噂の新しいオーナーさんですね？',
        emotion: 'happy',
        nextEventId: 'zeph_app_4'
      },
      {
        id: 'zeph_app_4',
        type: 'dialogue',
        speaker: 'zephyros',
        speakerName: 'ゼフィロス',
        text: '私はゼフィロス・ゴールドウィング。この辺りでちょっとした金融業を営んでおります。',
        emotion: 'happy',
        nextEventId: 'zeph_app_5'
      },
      {
        id: 'zeph_app_5',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: '金融業...？ あの、何かご用でしょうか？',
        emotion: 'normal',
        nextEventId: 'zeph_app_6'
      },
      {
        id: 'zeph_app_6',
        type: 'dialogue',
        speaker: 'zephyros',
        speakerName: 'ゼフィロス',
        text: 'いえいえ、ただのご挨拶ですよ。ところで...経営の方は順調ですか？',
        emotion: 'normal',
        nextEventId: 'zeph_app_7'
      },
      {
        id: 'zeph_app_7',
        type: 'dialogue',
        speaker: 'zephyros',
        speakerName: 'ゼフィロス',
        text: '最近、資金繰りに苦労されているとか...ふふ、噂は早いものでしてね。',
        emotion: 'smirk',
        nextEventId: 'zeph_app_8'
      },
      {
        id: 'zeph_app_8',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'どうしてそれを...！',
        emotion: 'surprised',
        nextEventId: 'zeph_app_9'
      },
      {
        id: 'zeph_app_9',
        type: 'dialogue',
        speaker: 'zephyros',
        speakerName: 'ゼフィロス',
        text: 'そこで、私からのご提案があります。運転資金をお貸ししましょう。',
        emotion: 'happy',
        nextEventId: 'zeph_app_10'
      },
      {
        id: 'zeph_app_10',
        type: 'dialogue',
        speaker: 'zephyros',
        speakerName: 'ゼフィロス',
        text: '50,000G...いえ、100,000Gでもお貸しできますよ。利息はほんの少しだけ。',
        emotion: 'happy',
        nextEventId: 'zeph_app_11'
      },
      {
        id: 'zeph_app_11',
        type: 'dialogue',
        speaker: 'zephyros',
        speakerName: 'ゼフィロス',
        text: '週利10%...年利に直せばたったの520%です。お安いでしょう？',
        emotion: 'smirk',
        nextEventId: 'zeph_app_12'
      },
      {
        id: 'zeph_app_12',
        type: 'choice',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: '（週利10%...それって暴利では...）',
        choices: [
          {
            text: 'お断りします',
            nextEventId: 'zeph_app_refuse',
            effects: {
              flag: { key: 'zephyros_refused', value: true }
            }
          },
          {
            text: '少し考えさせてください',
            nextEventId: 'zeph_app_consider',
            effects: {
              flag: { key: 'zephyros_considering', value: true }
            }
          },
          {
            text: '50,000Gお借りします...',
            nextEventId: 'zeph_app_accept_50k',
            effects: {
              money: 50000,
              flag: { key: 'zephyros_debt', value: true }
            }
          }
        ]
      },
      // 断った場合
      {
        id: 'zeph_app_refuse',
        type: 'dialogue',
        speaker: 'zephyros',
        speakerName: 'ゼフィロス',
        text: 'おや、そうですか。賢明なご判断で...と言いたいところですが。',
        emotion: 'normal',
        nextEventId: 'zeph_app_refuse_2'
      },
      {
        id: 'zeph_app_refuse_2',
        type: 'dialogue',
        speaker: 'zephyros',
        speakerName: 'ゼフィロス',
        text: 'この森で商売を続けるには、私の協力が必要になりますよ。覚えておいてください。',
        emotion: 'smirk',
        nextEventId: 'zeph_app_refuse_3'
      },
      {
        id: 'zeph_app_refuse_3',
        type: 'narration',
        text: 'ゼフィロスは不気味な笑みを残して去っていった。',
        nextEventId: 'zeph_app_end'
      },
      // 考える場合
      {
        id: 'zeph_app_consider',
        type: 'dialogue',
        speaker: 'zephyros',
        speakerName: 'ゼフィロス',
        text: 'ええ、ええ、ごゆっくりどうぞ。私はいつでもここにいますから。',
        emotion: 'happy',
        nextEventId: 'zeph_app_consider_2'
      },
      {
        id: 'zeph_app_consider_2',
        type: 'dialogue',
        speaker: 'zephyros',
        speakerName: 'ゼフィロス',
        text: 'ただし...あまり長く待たせないでくださいね。条件が変わるかもしれませんから。',
        emotion: 'smirk',
        nextEventId: 'zeph_app_end'
      },
      // 借りた場合
      {
        id: 'zeph_app_accept_50k',
        type: 'dialogue',
        speaker: 'zephyros',
        speakerName: 'ゼフィロス',
        text: 'おお！ 賢明なご判断です！ これで経営も安泰ですね。',
        emotion: 'happy',
        nextEventId: 'zeph_app_accept_2'
      },
      {
        id: 'zeph_app_accept_2',
        type: 'dialogue',
        speaker: 'zephyros',
        speakerName: 'ゼフィロス',
        text: 'では、こちらが契約書です。サインをお願いしますね。',
        emotion: 'happy',
        nextEventId: 'zeph_app_accept_3'
      },
      {
        id: 'zeph_app_accept_3',
        type: 'narration',
        text: '（契約書には小さな文字でびっしりと条項が書かれていた...）',
        nextEventId: 'zeph_app_accept_4'
      },
      {
        id: 'zeph_app_accept_4',
        type: 'dialogue',
        speaker: 'zephyros',
        speakerName: 'ゼフィロス',
        text: '返済は7日後から。毎週5,000Gずつで結構ですよ。ふふふ...',
        emotion: 'smirk',
        nextEventId: 'zeph_app_accept_5'
      },
      {
        id: 'zeph_app_accept_5',
        type: 'narration',
        text: '【警告】借金をしました。毎週の返済が発生します。',
        nextEventId: 'zeph_app_end'
      },
      {
        id: 'zeph_app_end',
        type: 'effect',
        effects: {
          flag: { key: 'zephyros_met', value: true }
        },
        nextEventId: null
      }
    ],
    isCompleted: false
  },

  // ============================================
  // 借金取り立て - 第1回
  // ============================================
  {
    id: 'zephyros_collection_1',
    title: '取り立て',
    description: 'ゼフィロスが返済を求めに来る',
    triggerCondition: {
      flag: { key: 'zephyros_collection_trigger_1', value: true }
    },
    events: [
      {
        id: 'zeph_col1_1',
        type: 'narration',
        text: '約束の日、ゼフィロスがカフェにやってきた。',
        nextEventId: 'zeph_col1_2'
      },
      {
        id: 'zeph_col1_2',
        type: 'dialogue',
        speaker: 'zephyros',
        speakerName: 'ゼフィロス',
        text: 'やあやあ、オーナーさん。今週分の返済、お願いしますね。',
        emotion: 'happy',
        nextEventId: 'zeph_col1_3'
      },
      {
        id: 'zeph_col1_3',
        type: 'dialogue',
        speaker: 'zephyros',
        speakerName: 'ゼフィロス',
        text: '元金50,000G + 利息5,000G = 55,000Gですが...今週は利息分だけで結構ですよ。',
        emotion: 'normal',
        nextEventId: 'zeph_col1_4'
      },
      {
        id: 'zeph_col1_4',
        type: 'choice',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: '（5,000G...払えるだろうか...）',
        choices: [
          {
            text: '5,000G支払う',
            nextEventId: 'zeph_col1_pay',
            effects: {
              money: -5000
            }
          },
          {
            text: '今は払えません...',
            nextEventId: 'zeph_col1_fail',
            effects: {
              flag: { key: 'zephyros_payment_missed', value: true }
            }
          }
        ]
      },
      {
        id: 'zeph_col1_pay',
        type: 'dialogue',
        speaker: 'zephyros',
        speakerName: 'ゼフィロス',
        text: 'ありがとうございます。やはり信頼できる方ですね。',
        emotion: 'happy',
        nextEventId: 'zeph_col1_pay_2'
      },
      {
        id: 'zeph_col1_pay_2',
        type: 'dialogue',
        speaker: 'zephyros',
        speakerName: 'ゼフィロス',
        text: 'では、また来週。お元気で。',
        emotion: 'normal',
        nextEventId: 'zeph_col1_end'
      },
      {
        id: 'zeph_col1_fail',
        type: 'dialogue',
        speaker: 'zephyros',
        speakerName: 'ゼフィロス',
        text: 'おやおや...それは困りましたね。',
        emotion: 'normal',
        nextEventId: 'zeph_col1_fail_2'
      },
      {
        id: 'zeph_col1_fail_2',
        type: 'dialogue',
        speaker: 'zephyros',
        speakerName: 'ゼフィロス',
        text: '仕方ありません。今週分は来週に上乗せしましょう。ただし...延滞利息が付きますよ。',
        emotion: 'smirk',
        nextEventId: 'zeph_col1_fail_3'
      },
      {
        id: 'zeph_col1_fail_3',
        type: 'dialogue',
        speaker: 'zephyros',
        speakerName: 'ゼフィロス',
        text: '次は10,000Gになります。払えるといいですね...ふふふ。',
        emotion: 'smirk',
        nextEventId: 'zeph_col1_end'
      },
      {
        id: 'zeph_col1_end',
        type: 'effect',
        effects: {
          flag: { key: 'zephyros_collection_1_done', value: true }
        },
        nextEventId: null
      }
    ],
    isCompleted: false
  },

  // ============================================
  // ゼフィロスの妨害工作
  // ============================================
  {
    id: 'zephyros_sabotage',
    title: '影の妨害',
    description: 'ゼフィロスがカフェの妨害を始める',
    triggerCondition: {
      flag: { key: 'zephyros_sabotage_trigger', value: true }
    },
    events: [
      {
        id: 'zeph_sab_1',
        type: 'narration',
        text: '最近、妙なことが続いている。',
        nextEventId: 'zeph_sab_2'
      },
      {
        id: 'zeph_sab_2',
        type: 'narration',
        text: '仕入れた食材が届かない。お客様から苦情が増えた。悪い噂が流れている。',
        nextEventId: 'zeph_sab_3'
      },
      {
        id: 'zeph_sab_3',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'どうして急にこんなことが...',
        emotion: 'sad',
        nextEventId: 'zeph_sab_4'
      },
      {
        id: 'zeph_sab_4',
        type: 'narration',
        text: 'その時、店の外でゼフィロスの姿を見かけた気がした。',
        nextEventId: 'zeph_sab_5'
      },
      {
        id: 'zeph_sab_5',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'まさか...ゼフィロスが...？',
        emotion: 'surprised',
        nextEventId: 'zeph_sab_6'
      },
      {
        id: 'zeph_sab_6',
        type: 'narration',
        text: '借金を断ったことへの報復だろうか。このままでは経営が立ち行かなくなる。',
        nextEventId: 'zeph_sab_end'
      },
      {
        id: 'zeph_sab_end',
        type: 'effect',
        effects: {
          reputation: -10,
          flag: { key: 'zephyros_sabotaged', value: true }
        },
        nextEventId: null
      }
    ],
    isCompleted: false
  },

  // ============================================
  // 再度の勧誘（資金が更に減った場合）
  // ============================================
  {
    id: 'zephyros_second_offer',
    title: '最後の提案',
    description: 'ゼフィロスが再び現れる',
    triggerCondition: {
      flag: { key: 'money_desperate', value: true }
    },
    events: [
      {
        id: 'zeph_2nd_1',
        type: 'narration',
        text: '資金が底をつきかけた頃、ゼフィロスが再び現れた。',
        nextEventId: 'zeph_2nd_2'
      },
      {
        id: 'zeph_2nd_2',
        type: 'dialogue',
        speaker: 'zephyros',
        speakerName: 'ゼフィロス',
        text: 'おや、随分とお困りのようですね。私の提案、再考されてはいかが？',
        emotion: 'smirk',
        nextEventId: 'zeph_2nd_3'
      },
      {
        id: 'zeph_2nd_3',
        type: 'dialogue',
        speaker: 'zephyros',
        speakerName: 'ゼフィロス',
        text: '今なら特別に...このカフェを担保にお貸ししますよ。',
        emotion: 'happy',
        nextEventId: 'zeph_2nd_4'
      },
      {
        id: 'zeph_2nd_4',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'カフェを担保に...!?',
        emotion: 'surprised',
        nextEventId: 'zeph_2nd_5'
      },
      {
        id: 'zeph_2nd_5',
        type: 'dialogue',
        speaker: 'zephyros',
        speakerName: 'ゼフィロス',
        text: 'ええ。返済できなければ、このカフェは私のものになります。悪い話ではないでしょう？',
        emotion: 'smirk',
        nextEventId: 'zeph_2nd_6'
      },
      {
        id: 'zeph_2nd_6',
        type: 'choice',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: '（祖母の店を担保に...そんなことは...）',
        choices: [
          {
            text: '絶対にお断りします！',
            nextEventId: 'zeph_2nd_refuse',
            effects: {
              flag: { key: 'zephyros_final_refused', value: true }
            }
          },
          {
            text: '...仕方ありません、お願いします',
            nextEventId: 'zeph_2nd_accept',
            effects: {
              money: 100000,
              flag: { key: 'zephyros_cafe_mortgaged', value: true }
            }
          }
        ]
      },
      {
        id: 'zeph_2nd_refuse',
        type: 'dialogue',
        speaker: 'zephyros',
        speakerName: 'ゼフィロス',
        text: 'ほう...まだ意地を張りますか。面白い。',
        emotion: 'normal',
        nextEventId: 'zeph_2nd_refuse_2'
      },
      {
        id: 'zeph_2nd_refuse_2',
        type: 'dialogue',
        speaker: 'zephyros',
        speakerName: 'ゼフィロス',
        text: 'いいでしょう。ただし、この森で私に逆らうとどうなるか...思い知ることになりますよ。',
        emotion: 'angry',
        nextEventId: 'zeph_2nd_end'
      },
      {
        id: 'zeph_2nd_accept',
        type: 'dialogue',
        speaker: 'zephyros',
        speakerName: 'ゼフィロス',
        text: 'よい判断です！ では、こちらにサインを...',
        emotion: 'happy',
        nextEventId: 'zeph_2nd_accept_2'
      },
      {
        id: 'zeph_2nd_accept_2',
        type: 'narration',
        text: '【警告】カフェを担保に借金しました。返済できなければ店を失います。',
        nextEventId: 'zeph_2nd_end'
      },
      {
        id: 'zeph_2nd_end',
        type: 'effect',
        effects: {
          flag: { key: 'zephyros_second_offer_done', value: true }
        },
        nextEventId: null
      }
    ],
    isCompleted: false
  },

  // ============================================
  // Bad End - 金色の籠
  // ============================================
  {
    id: 'zephyros_bad_end',
    title: 'Bad End：金色の籠',
    description: '借金を返済できず、カフェを失う',
    triggerCondition: {
      flag: { key: 'zephyros_bad_end_trigger', value: true }
    },
    events: [
      {
        id: 'zeph_bad_1',
        type: 'narration',
        text: '返済期限が過ぎた。ゼフィロスが契約書を持ってやってきた。',
        nextEventId: 'zeph_bad_2'
      },
      {
        id: 'zeph_bad_2',
        type: 'dialogue',
        speaker: 'zephyros',
        speakerName: 'ゼフィロス',
        text: '残念ですが、約束は約束です。このカフェは私のものになりました。',
        emotion: 'happy',
        nextEventId: 'zeph_bad_3'
      },
      {
        id: 'zeph_bad_3',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'そんな...祖母の店が...',
        emotion: 'sad',
        nextEventId: 'zeph_bad_4'
      },
      {
        id: 'zeph_bad_4',
        type: 'dialogue',
        speaker: 'zephyros',
        speakerName: 'ゼフィロス',
        text: 'ご安心ください。あなたにはここで働いていただきます。永遠に。',
        emotion: 'smirk',
        nextEventId: 'zeph_bad_5'
      },
      {
        id: 'zeph_bad_5',
        type: 'dialogue',
        speaker: 'zephyros',
        speakerName: 'ゼフィロス',
        text: '借金を返すまで...いえ、利息が増え続ける限り、あなたは自由になれない。',
        emotion: 'happy',
        nextEventId: 'zeph_bad_6'
      },
      {
        id: 'zeph_bad_6',
        type: 'dialogue',
        speaker: 'zephyros',
        speakerName: 'ゼフィロス',
        text: 'さあ、金色の籠の中で、永遠に働いていただきましょう。ふふふ...あはははは！',
        emotion: 'happy',
        nextEventId: 'zeph_bad_7'
      },
      {
        id: 'zeph_bad_7',
        type: 'narration',
        text: 'こうして、私の夢は終わりを告げた——',
        nextEventId: 'zeph_bad_8'
      },
      {
        id: 'zeph_bad_8',
        type: 'narration',
        text: '【Bad End：金色の籠】\n\n借金の罠に落ち、カフェと自由を失った。\nゼフィロスの下で永遠に働き続ける日々が始まる。',
        nextEventId: 'zeph_bad_end'
      },
      {
        id: 'zeph_bad_end',
        type: 'effect',
        effects: {
          flag: { key: 'bad_end_debt', value: true },
          flag2: { key: 'game_over', value: true }
        },
        nextEventId: null
      }
    ],
    isCompleted: false
  }
];

/**
 * ゼフィロス関連のフラグを自動設定
 */
export function updateZephyrosFlags(
  money: number,
  debt: number,
  flags: Record<string, boolean | string | number>,
  day: number
): Record<string, boolean | string | number> {
  const updatedFlags = { ...flags };
  
  // 資金危機フラグ（20,000G以下で未接触）
  if (money <= 20000 && !flags['zephyros_met']) {
    updatedFlags['money_crisis'] = true;
  }
  
  // 資金絶望フラグ（5,000G以下で借金断った後）
  if (money <= 5000 && flags['zephyros_refused'] && !flags['zephyros_cafe_mortgaged']) {
    updatedFlags['money_desperate'] = true;
  }
  
  // 妨害トリガー（断った後、7日経過）
  if (flags['zephyros_refused'] && !flags['zephyros_sabotaged']) {
    const refusedDay = flags['zephyros_refused_day'] as number || day;
    if (day >= refusedDay + 7) {
      updatedFlags['zephyros_sabotage_trigger'] = true;
    }
  }
  
  // 取り立てトリガー（借金後7日ごと）
  if (flags['zephyros_debt'] && debt > 0) {
    const debtStartDay = flags['zephyros_debt_start_day'] as number || day;
    const weeksPassed = Math.floor((day - debtStartDay) / 7);
    
    if (weeksPassed >= 1 && !flags['zephyros_collection_1_done']) {
      updatedFlags['zephyros_collection_trigger_1'] = true;
    }
  }
  
  // Bad Endトリガー（担保借金かつ資金0以下が3日続く）
  if (flags['zephyros_cafe_mortgaged'] && money <= 0) {
    const brokeStreak = (flags['broke_streak'] as number || 0) + 1;
    updatedFlags['broke_streak'] = brokeStreak;
    
    if (brokeStreak >= 3) {
      updatedFlags['zephyros_bad_end_trigger'] = true;
    }
  } else {
    updatedFlags['broke_streak'] = 0;
  }
  
  return updatedFlags;
}

/**
 * 借金の利息計算
 */
export function calculateDebtInterest(
  principal: number,
  weeksPassed: number,
  interestRate: number = 0.1
): { total: number; interest: number; weeklyPayment: number } {
  // 複利計算
  const total = Math.floor(principal * Math.pow(1 + interestRate, weeksPassed));
  const interest = total - principal;
  const weeklyPayment = Math.floor(total * interestRate);
  
  return { total, interest, weeklyPayment };
}

/**
 * ゼフィロスイベントの進行状況を取得
 */
export function getZephyrosStatus(
  flags: Record<string, boolean | string | number>
): {
  hasMet: boolean;
  hasDebt: boolean;
  hasCafeMortgaged: boolean;
  isGameOver: boolean;
  threatLevel: 'none' | 'low' | 'medium' | 'high' | 'critical';
} {
  const hasMet = flags['zephyros_met'] === true;
  const hasDebt = flags['zephyros_debt'] === true;
  const hasCafeMortgaged = flags['zephyros_cafe_mortgaged'] === true;
  const isGameOver = flags['bad_end_debt'] === true;
  
  let threatLevel: 'none' | 'low' | 'medium' | 'high' | 'critical' = 'none';
  
  if (isGameOver) {
    threatLevel = 'critical';
  } else if (hasCafeMortgaged) {
    threatLevel = 'critical';
  } else if (hasDebt) {
    threatLevel = 'high';
  } else if (flags['zephyros_sabotaged']) {
    threatLevel = 'medium';
  } else if (hasMet) {
    threatLevel = 'low';
  }
  
  return { hasMet, hasDebt, hasCafeMortgaged, isGameOver, threatLevel };
}
