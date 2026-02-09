// src/game/scenarios/events/rosa.ts
// マッスル・ローザ イベント - 救済キャラクター

import { ScenarioChapter } from '@/types';

/**
 * ローザ イベントシナリオ
 * 
 * 主人公を助ける姐御肌のキャラクター
 * ゼフィロスの悪事を知っており、ピンチ時に助けてくれる
 * 
 * トリガー条件:
 * - Day 5で初登場（通常イベント）
 * - ゼフィロスに会った後に警告イベント
 * - 経営難時に救済イベント
 * - ゼフィロスを撃退するイベント
 */
export const ROSA_EVENTS: ScenarioChapter[] = [
  // ============================================
  // ローザ初登場 - 花屋の姐さん
  // ============================================
  {
    id: 'rosa_intro',
    title: '花屋の姐さん',
    description: '近所の花屋の店主ローザとの出会い',
    triggerCondition: {
      day: 5,
      flag: { key: 'prologue_complete', value: true }
    },
    events: [
      {
        id: 'rosa_int_1',
        type: 'narration',
        text: 'カフェの扉が勢いよく開いた。',
        nextEventId: 'rosa_int_2'
      },
      {
        id: 'rosa_int_2',
        type: 'narration',
        text: '入ってきたのは、身長2メートルはありそうな筋骨隆々の...女性？',
        nextEventId: 'rosa_int_3'
      },
      {
        id: 'rosa_int_3',
        type: 'narration',
        text: 'ピンクのエプロンに大きなリボン。腕には「愛」と書かれたタトゥー。',
        nextEventId: 'rosa_int_4'
      },
      {
        id: 'rosa_int_4',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'マッスル・ローザ',
        text: 'アンタがハナコばあちゃんの孫かい！？ あたしはローザ！ 隣で花屋やってんのよ！',
        emotion: 'happy',
        nextEventId: 'rosa_int_5'
      },
      {
        id: 'rosa_int_5',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'は、はい...！ 初めまして...！',
        emotion: 'surprised',
        nextEventId: 'rosa_int_6'
      },
      {
        id: 'rosa_int_6',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: 'ハナコばあちゃんにはお世話になったのよ。あたしが冒険者辞めて花屋始める時、色々助けてもらってさ。',
        emotion: 'normal',
        nextEventId: 'rosa_int_7'
      },
      {
        id: 'rosa_int_7',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: 'だから、アンタのことも面倒見てやるわ！ 困ったことがあったら何でも言いな！',
        emotion: 'happy',
        nextEventId: 'rosa_int_8'
      },
      {
        id: 'rosa_int_8',
        type: 'choice',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: '（迫力がすごい...でも悪い人じゃなさそう）',
        choices: [
          {
            text: 'ありがとうございます！ 心強いです',
            nextEventId: 'rosa_int_9a',
            effects: {
              reputation: 5
            }
          },
          {
            text: '元冒険者...ですか？',
            nextEventId: 'rosa_int_9b'
          },
          {
            text: '（少し怖い...）',
            nextEventId: 'rosa_int_9c'
          }
        ]
      },
      {
        id: 'rosa_int_9a',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: 'おっ、素直でいい子じゃないの！ ハナコばあちゃんに似てるわ！',
        emotion: 'happy',
        nextEventId: 'rosa_int_10'
      },
      {
        id: 'rosa_int_9b',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: 'そうよ！ 昔はAランク冒険者として鳴らしたもんよ！ 「鉄拳のローザ」って呼ばれてたわ！',
        emotion: 'happy',
        nextEventId: 'rosa_int_9b_2'
      },
      {
        id: 'rosa_int_9b_2',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: '今は花に囲まれて穏やかに暮らしてるけどね。でも腕っぷしは衰えてないわよ！',
        emotion: 'normal',
        nextEventId: 'rosa_int_10'
      },
      {
        id: 'rosa_int_9c',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: 'あら、怖がらないでよ！ 見た目はアレだけど、心は乙女なんだから！',
        emotion: 'sad',
        nextEventId: 'rosa_int_9c_2'
      },
      {
        id: 'rosa_int_9c_2',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: '...まあ、慣れてもらうしかないわね。ほら、これお近づきのしるし！',
        emotion: 'happy',
        nextEventId: 'rosa_int_10'
      },
      {
        id: 'rosa_int_10',
        type: 'narration',
        text: 'ローザは大きな花束を差し出した。色とりどりの美しい花が咲き誇っている。',
        nextEventId: 'rosa_int_11'
      },
      {
        id: 'rosa_int_11',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: 'カフェに飾りな！ お客さんも喜ぶわよ！',
        emotion: 'happy',
        nextEventId: 'rosa_int_12'
      },
      {
        id: 'rosa_int_12',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'わあ、綺麗...！ ありがとうございます、ローザさん！',
        emotion: 'happy',
        nextEventId: 'rosa_int_13'
      },
      {
        id: 'rosa_int_13',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: '「姐さん」でいいわよ！ じゃ、また来るわね！',
        emotion: 'happy',
        nextEventId: 'rosa_int_end'
      },
      {
        id: 'rosa_int_end',
        type: 'effect',
        effects: {
          reputation: 3,
          flag: { key: 'rosa_met', value: true }
        },
        nextEventId: null
      }
    ],
    isCompleted: false
  },

  // ============================================
  // ローザの警告 - ゼフィロスについて
  // ============================================
  {
    id: 'rosa_warning',
    title: 'ローザの警告',
    description: 'ゼフィロスの危険性について警告される',
    triggerCondition: {
      flag: { key: 'rosa_warning_trigger', value: true }
    },
    events: [
      {
        id: 'rosa_warn_1',
        type: 'narration',
        text: '閉店後、ローザが血相を変えてやってきた。',
        nextEventId: 'rosa_warn_2'
      },
      {
        id: 'rosa_warn_2',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: 'アンタ！ ゼフィロスに会ったって本当！？',
        emotion: 'angry',
        nextEventId: 'rosa_warn_3'
      },
      {
        id: 'rosa_warn_3',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'えっ、はい...金融業の妖精さんが来て...',
        emotion: 'surprised',
        nextEventId: 'rosa_warn_4'
      },
      {
        id: 'rosa_warn_4',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: 'あいつは「金融業」なんて上品なもんじゃないわ！ ただの高利貸しよ！',
        emotion: 'angry',
        nextEventId: 'rosa_warn_5'
      },
      {
        id: 'rosa_warn_5',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: 'この森で何人もの商人が、あいつに店を奪われてきたの。',
        emotion: 'normal',
        nextEventId: 'rosa_warn_6'
      },
      {
        id: 'rosa_warn_6',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: '最初は親切そうに近づいてきて、困った時に「助けてあげる」って言うのよ。',
        emotion: 'normal',
        nextEventId: 'rosa_warn_7'
      },
      {
        id: 'rosa_warn_7',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: 'でも一度借りたら最後...法外な利息で雪だるま式に借金が膨らむ。',
        emotion: 'sad',
        nextEventId: 'rosa_warn_8'
      },
      {
        id: 'rosa_warn_8',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: 'そして最後には店も、自由も、全部奪われるのよ。',
        emotion: 'angry',
        nextEventId: 'rosa_warn_9'
      },
      {
        id: 'rosa_warn_9',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'そんな...！ 私、断ってよかった...',
        emotion: 'surprised',
        nextEventId: 'rosa_warn_10'
      },
      {
        id: 'rosa_warn_10',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: '断ったのかい！？ えらいわ！ でも...気をつけな。',
        emotion: 'normal',
        nextEventId: 'rosa_warn_11'
      },
      {
        id: 'rosa_warn_11',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: 'あいつは断られると嫌がらせを始めるのよ。仕入れ先に圧力かけたり、悪い噂を流したり。',
        emotion: 'normal',
        nextEventId: 'rosa_warn_12'
      },
      {
        id: 'rosa_warn_12',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: 'でも心配しないで。困ったらあたしに言いな。力になるから！',
        emotion: 'happy',
        nextEventId: 'rosa_warn_13'
      },
      {
        id: 'rosa_warn_13',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'ローザ姐さん...ありがとうございます！',
        emotion: 'happy',
        nextEventId: 'rosa_warn_end'
      },
      {
        id: 'rosa_warn_end',
        type: 'effect',
        effects: {
          flag: { key: 'rosa_warned', value: true }
        },
        nextEventId: null
      }
    ],
    isCompleted: false
  },

  // ============================================
  // ローザの救済 - 経営難を助ける
  // ============================================
  {
    id: 'rosa_help',
    title: 'ローザの救いの手',
    description: '経営難の時、ローザが助けてくれる',
    triggerCondition: {
      flag: { key: 'rosa_help_trigger', value: true }
    },
    events: [
      {
        id: 'rosa_help_1',
        type: 'narration',
        text: '経営が苦しい日々が続いていた。もう限界かもしれない...',
        nextEventId: 'rosa_help_2'
      },
      {
        id: 'rosa_help_2',
        type: 'narration',
        text: 'そんな時、ローザが大量の荷物を抱えてやってきた。',
        nextEventId: 'rosa_help_3'
      },
      {
        id: 'rosa_help_3',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: 'アンタ、顔色悪いわよ！ ちゃんと食べてる!?',
        emotion: 'angry',
        nextEventId: 'rosa_help_4'
      },
      {
        id: 'rosa_help_4',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'ローザ姐さん...実は、経営が厳しくて...',
        emotion: 'sad',
        nextEventId: 'rosa_help_5'
      },
      {
        id: 'rosa_help_5',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: '知ってるわよ。だから来たんじゃない。ほら、これ使いな！',
        emotion: 'normal',
        nextEventId: 'rosa_help_6'
      },
      {
        id: 'rosa_help_6',
        type: 'narration',
        text: 'ローザが置いた荷物の中には、新鮮な食材や調味料がぎっしり詰まっていた。',
        nextEventId: 'rosa_help_7'
      },
      {
        id: 'rosa_help_7',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'こんなにたくさん...！ でも、お金が...',
        emotion: 'surprised',
        nextEventId: 'rosa_help_8'
      },
      {
        id: 'rosa_help_8',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: '金なんかいらないわよ！ あたしの知り合いの農家から分けてもらったの。',
        emotion: 'happy',
        nextEventId: 'rosa_help_9'
      },
      {
        id: 'rosa_help_9',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: 'それに、これも。',
        emotion: 'normal',
        nextEventId: 'rosa_help_10'
      },
      {
        id: 'rosa_help_10',
        type: 'narration',
        text: 'ローザは小さな袋を渡してきた。中には金貨が入っている。',
        nextEventId: 'rosa_help_11'
      },
      {
        id: 'rosa_help_11',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: '20,000Gよ。返さなくていいから。',
        emotion: 'normal',
        nextEventId: 'rosa_help_12'
      },
      {
        id: 'rosa_help_12',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'そんな...受け取れません...！',
        emotion: 'surprised',
        nextEventId: 'rosa_help_13'
      },
      {
        id: 'rosa_help_13',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: 'いいから受け取りな！ ハナコばあちゃんに恩返しできるのは、今しかないんだから。',
        emotion: 'happy',
        nextEventId: 'rosa_help_14'
      },
      {
        id: 'rosa_help_14',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: 'それに...アンタが潰れたら、ゼフィロスの思う壺よ。それだけは許せないわ。',
        emotion: 'angry',
        nextEventId: 'rosa_help_15'
      },
      {
        id: 'rosa_help_15',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'ローザ姐さん...本当に、ありがとうございます...！',
        emotion: 'happy',
        nextEventId: 'rosa_help_16'
      },
      {
        id: 'rosa_help_16',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: '泣くんじゃないわよ！ さあ、明日から頑張りな！',
        emotion: 'happy',
        nextEventId: 'rosa_help_end'
      },
      {
        id: 'rosa_help_end',
        type: 'effect',
        effects: {
          money: 20000,
          reputation: 10,
          flag: { key: 'rosa_helped', value: true }
        },
        nextEventId: null
      }
    ],
    isCompleted: false
  },

  // ============================================
  // ローザの物流支援 - 妨害対策
  // ============================================
  {
    id: 'rosa_supply_line',
    title: '姐さんのコネクション',
    description: 'ゼフィロスの妨害に対抗する',
    triggerCondition: {
      flag: { key: 'rosa_supply_trigger', value: true }
    },
    events: [
      {
        id: 'rosa_sup_1',
        type: 'narration',
        text: 'ゼフィロスの妨害で、仕入れ先が次々と取引を断ってきた。',
        nextEventId: 'rosa_sup_2'
      },
      {
        id: 'rosa_sup_2',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'どうしよう...このままじゃ、お店を開けられない...',
        emotion: 'sad',
        nextEventId: 'rosa_sup_3'
      },
      {
        id: 'rosa_sup_3',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: '大丈夫よ！ あたしに任せな！',
        emotion: 'happy',
        nextEventId: 'rosa_sup_4'
      },
      {
        id: 'rosa_sup_4',
        type: 'narration',
        text: 'ローザが勢いよく店に入ってきた。',
        nextEventId: 'rosa_sup_5'
      },
      {
        id: 'rosa_sup_5',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: '冒険者時代のツテを使って、新しい仕入れ先を見つけてきたわ！',
        emotion: 'happy',
        nextEventId: 'rosa_sup_6'
      },
      {
        id: 'rosa_sup_6',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: 'ゼフィロスの手が届かない、遠方の農家や商人たちよ。品質も保証するわ！',
        emotion: 'normal',
        nextEventId: 'rosa_sup_7'
      },
      {
        id: 'rosa_sup_7',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: '本当ですか!? ローザ姐さん、すごい...！',
        emotion: 'happy',
        nextEventId: 'rosa_sup_8'
      },
      {
        id: 'rosa_sup_8',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: 'あたしを誰だと思ってんのよ！ Aランク冒険者の人脈、なめんじゃないわよ！',
        emotion: 'happy',
        nextEventId: 'rosa_sup_9'
      },
      {
        id: 'rosa_sup_9',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: 'これで、あの金ピカ妖精の妨害なんか怖くないわ！',
        emotion: 'angry',
        nextEventId: 'rosa_sup_end'
      },
      {
        id: 'rosa_sup_end',
        type: 'effect',
        effects: {
          reputation: 5,
          flag: { key: 'rosa_supply_secured', value: true },
          flag2: { key: 'zephyros_sabotage_countered', value: true }
        },
        nextEventId: null
      }
    ],
    isCompleted: false
  },

  // ============================================
  // ローザ vs ゼフィロス - 対決
  // ============================================
  {
    id: 'rosa_vs_zephyros',
    title: '姐さんの鉄拳',
    description: 'ローザがゼフィロスと対決する',
    triggerCondition: {
      flag: { key: 'rosa_confrontation_trigger', value: true }
    },
    events: [
      {
        id: 'rosa_vs_1',
        type: 'narration',
        text: 'ある日、ゼフィロスがまたカフェにやってきた。',
        nextEventId: 'rosa_vs_2'
      },
      {
        id: 'rosa_vs_2',
        type: 'dialogue',
        speaker: 'zephyros',
        speakerName: 'ゼフィロス',
        text: 'やあ、オーナーさん。まだ諦めていないようですね。感心しますよ。',
        emotion: 'smirk',
        nextEventId: 'rosa_vs_3'
      },
      {
        id: 'rosa_vs_3',
        type: 'dialogue',
        speaker: 'zephyros',
        speakerName: 'ゼフィロス',
        text: 'でも、そろそろ限界でしょう？ 今なら特別条件で...',
        emotion: 'happy',
        nextEventId: 'rosa_vs_4'
      },
      {
        id: 'rosa_vs_4',
        type: 'narration',
        text: 'その時、カフェの扉が蹴り破られた。',
        nextEventId: 'rosa_vs_5'
      },
      {
        id: 'rosa_vs_5',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: 'ゼフィロス！！！ アンタ、まだこの子に付きまとってんの！？',
        emotion: 'angry',
        nextEventId: 'rosa_vs_6'
      },
      {
        id: 'rosa_vs_6',
        type: 'dialogue',
        speaker: 'zephyros',
        speakerName: 'ゼフィロス',
        text: 'おやおや、「鉄拳のローザ」じゃありませんか。相変わらず野蛮ですね。',
        emotion: 'normal',
        nextEventId: 'rosa_vs_7'
      },
      {
        id: 'rosa_vs_7',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: 'アンタがこの森でやってきた悪事、全部知ってるわよ。',
        emotion: 'angry',
        nextEventId: 'rosa_vs_8'
      },
      {
        id: 'rosa_vs_8',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: '証拠も集めてある。森の評議会に訴えることだってできるのよ？',
        emotion: 'normal',
        nextEventId: 'rosa_vs_9'
      },
      {
        id: 'rosa_vs_9',
        type: 'dialogue',
        speaker: 'zephyros',
        speakerName: 'ゼフィロス',
        text: '...ふん。証拠だと？ ハッタリでしょう。',
        emotion: 'angry',
        nextEventId: 'rosa_vs_10'
      },
      {
        id: 'rosa_vs_10',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: '試してみる？ あたしが本気出したら、アンタなんか一発よ。',
        emotion: 'angry',
        nextEventId: 'rosa_vs_11'
      },
      {
        id: 'rosa_vs_11',
        type: 'narration',
        text: 'ローザが拳を握りしめると、その筋肉がミシミシと音を立てた。',
        nextEventId: 'rosa_vs_12'
      },
      {
        id: 'rosa_vs_12',
        type: 'dialogue',
        speaker: 'zephyros',
        speakerName: 'ゼフィロス',
        text: '...チッ。覚えておきなさい。',
        emotion: 'angry',
        nextEventId: 'rosa_vs_13'
      },
      {
        id: 'rosa_vs_13',
        type: 'narration',
        text: 'ゼフィロスは舌打ちをすると、光の中に消えていった。',
        nextEventId: 'rosa_vs_14'
      },
      {
        id: 'rosa_vs_14',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: 'ふう...これで当分は来ないでしょ。',
        emotion: 'normal',
        nextEventId: 'rosa_vs_15'
      },
      {
        id: 'rosa_vs_15',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'ローザ姐さん...！ 本当にありがとうございます...！',
        emotion: 'happy',
        nextEventId: 'rosa_vs_16'
      },
      {
        id: 'rosa_vs_16',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: '礼なんかいいわよ。アンタはここでカフェを続けな。それが一番の恩返しよ。',
        emotion: 'happy',
        nextEventId: 'rosa_vs_17'
      },
      {
        id: 'rosa_vs_17',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: 'ハナコばあちゃんの店を、守り抜くのよ！',
        emotion: 'happy',
        nextEventId: 'rosa_vs_end'
      },
      {
        id: 'rosa_vs_end',
        type: 'effect',
        effects: {
          reputation: 15,
          flag: { key: 'zephyros_defeated', value: true },
          flag2: { key: 'rosa_confrontation_done', value: true }
        },
        nextEventId: null
      }
    ],
    isCompleted: false
  },

  // ============================================
  // ローザからのプレゼント - 定期イベント
  // ============================================
  {
    id: 'rosa_gift',
    title: '姐さんからの差し入れ',
    description: 'ローザが時々プレゼントをくれる',
    triggerCondition: {
      flag: { key: 'rosa_gift_trigger', value: true }
    },
    events: [
      {
        id: 'rosa_gift_1',
        type: 'narration',
        text: 'ローザが花束を持ってやってきた。',
        nextEventId: 'rosa_gift_2'
      },
      {
        id: 'rosa_gift_2',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: 'ほら、今日も持ってきたわよ！ カフェに飾りな！',
        emotion: 'happy',
        nextEventId: 'rosa_gift_3'
      },
      {
        id: 'rosa_gift_3',
        type: 'dialogue',
        speaker: 'protagonist',
        speakerName: '主人公',
        text: 'ありがとうございます、ローザ姐さん！ いつも綺麗な花ですね。',
        emotion: 'happy',
        nextEventId: 'rosa_gift_4'
      },
      {
        id: 'rosa_gift_4',
        type: 'dialogue',
        speaker: 'rosa',
        speakerName: 'ローザ',
        text: 'フラワーアレンジメントには自信があるのよ！ 元冒険者だけど、女心は忘れてないわ！',
        emotion: 'happy',
        nextEventId: 'rosa_gift_end'
      },
      {
        id: 'rosa_gift_end',
        type: 'effect',
        effects: {
          reputation: 3,
          flag: { key: 'rosa_gift_received', value: true }
        },
        nextEventId: null
      }
    ],
    isCompleted: false
  }
];

/**
 * ローザ関連のフラグを自動設定
 */
export function updateRosaFlags(
  money: number,
  flags: Record<string, boolean | string | number>,
  day: number
): Record<string, boolean | string | number> {
  const updatedFlags = { ...flags };
  
  // 警告トリガー（ゼフィロスに会った後、ローザに会っている場合）
  if (flags['zephyros_met'] && flags['rosa_met'] && !flags['rosa_warned']) {
    updatedFlags['rosa_warning_trigger'] = true;
  }
  
  // 救済トリガー（資金10,000G以下、ゼフィロス断った、ローザに会っている）
  if (money <= 10000 && flags['zephyros_refused'] && flags['rosa_met'] && !flags['rosa_helped']) {
    updatedFlags['rosa_help_trigger'] = true;
  }
  
  // 物流支援トリガー（妨害を受けた、ローザに警告された）
  if (flags['zephyros_sabotaged'] && flags['rosa_warned'] && !flags['rosa_supply_secured']) {
    updatedFlags['rosa_supply_trigger'] = true;
  }
  
  // 対決トリガー（妨害対策済み、評判回復中）
  if (flags['rosa_supply_secured'] && flags['zephyros_refused'] && !flags['zephyros_defeated']) {
    // ランダムまたは特定条件で発生
    if (day % 14 === 0) { // 2週間ごとにチャンス
      updatedFlags['rosa_confrontation_trigger'] = true;
    }
  }
  
  // プレゼントトリガー（週1回、ローザと友好関係）
  if (flags['rosa_met'] && day % 7 === 0 && !flags['rosa_gift_received_this_week']) {
    updatedFlags['rosa_gift_trigger'] = true;
  }
  
  return updatedFlags;
}

/**
 * ローザとの関係状態を取得
 */
export function getRosaRelationship(
  flags: Record<string, boolean | string | number>
): {
  hasMet: boolean;
  hasWarned: boolean;
  hasHelped: boolean;
  hasDefeatedZephyros: boolean;
  relationshipLevel: 'unknown' | 'acquaintance' | 'friend' | 'ally';
} {
  const hasMet = flags['rosa_met'] === true;
  const hasWarned = flags['rosa_warned'] === true;
  const hasHelped = flags['rosa_helped'] === true;
  const hasDefeatedZephyros = flags['zephyros_defeated'] === true;
  
  let relationshipLevel: 'unknown' | 'acquaintance' | 'friend' | 'ally' = 'unknown';
  
  if (hasDefeatedZephyros) {
    relationshipLevel = 'ally';
  } else if (hasHelped) {
    relationshipLevel = 'friend';
  } else if (hasMet) {
    relationshipLevel = 'acquaintance';
  }
  
  return { hasMet, hasWarned, hasHelped, hasDefeatedZephyros, relationshipLevel };
}

/**
 * ローザの救済で得られる支援内容
 */
export function getRosaHelpRewards(): {
  money: number;
  reputation: number;
  supplies: string[];
} {
  return {
    money: 20000,
    reputation: 10,
    supplies: ['新鮮な食材', '高品質な調味料', '季節の花束']
  };
}
