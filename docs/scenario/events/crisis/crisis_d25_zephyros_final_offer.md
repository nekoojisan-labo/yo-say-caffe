# crisis_d25_zephyros_final_offer

## 基本情報

| 項目 | 内容 |
|---|---|
| eventId | crisis_d25_zephyros_final_offer |
| title | 金色の契約書 |
| category | crisis / branch |
| day | 25 |
| triggerCondition | `guild_preparation_complete === true` |
| relatedCharacters | protagonist, zephyros |
| purpose | 対決前にゼフィロスが最後の誘惑・脅しを行い、Bad End分岐の入口を作る |

## 役割

商人組合への告発準備が整った直後、ゼフィロスが主人公を一人で訪ねる。
ここで「金で解決する」「楽になる」「店を大きくできる」という誘惑を出し、プレイヤーに明確な選択を迫る。

## イベント本文

### 1. 閉店後の来訪

**narration**

閉店後。
証拠の束を鞄にしまい、明日の準備をしていた。

その時、ドアベルが鳴った。
営業時間は終わっている。
鍵も、閉めたはずだった。

**zephyros**

「こんばんは。少し、お話をよろしいですか？」

**protagonist**

「ゼフィロスさん……」

**narration**

金色の羽が、薄暗い店内で不自然に輝いている。
彼はいつも通り、にこやかに微笑んでいた。

### 2. 甘い提案

**zephyros**

「最近、大変そうですね。仕入れに噂に、商人組合への準備まで」

**protagonist**

「どうして、それを」

**zephyros**

「この街で商売をしていれば、自然と耳に入りますよ」

**narration**

ゼフィロスは、カウンターに一枚の契約書を置いた。
紙の端には、金色の装飾が施されている。

**zephyros**

「最後のご提案です。私と正式に提携しませんか？」

**protagonist**

「提携……？」

**zephyros**

「資金、仕入れ、人脈、宣伝。全て私が用意しましょう。あなたはただ、看板として微笑んでいればいい」

### 3. 祖母の店を奪う言葉

**protagonist**

「それは、私の店じゃなくなります」

**zephyros**

「店とは、利益を出してこそ店です。思い出だけで経営はできませんよ」

**protagonist**

「……」

**zephyros**

「お祖母様の店を潰したくないのでしょう？ ならば、現実的な選択を」

**narration**

その言葉が、一番痛い場所に刺さった。
店を守りたい。
潰したくない。
その気持ちがあるからこそ、心が揺れる。

### 4. 脅し

**zephyros**

「明日、商人組合に行くそうですね」

**protagonist**

「……はい」

**zephyros**

「無駄ですよ。証拠など、見方を変えればいくらでも否定できる」

**protagonist**

「それでも、私は」

**zephyros**

「あなた一人が傷つくなら、まだいい。ですが、周りの方々も巻き込まれますよ？」

**narration**

ローザさん。
シオン。
ルシアさん。
常連さんたち。
モモじい。

名前が胸の中をよぎる。

### 5. 選択肢

**choice**

ゼフィロスの契約書に、どう答える？

1. `絶対に契約しない`
   - next: `final_offer_refuse`
   - effects: `flag.final_offer_refused = true`, `reputation +5`

2. `少しだけ迷いを見せる`
   - next: `final_offer_waver`
   - effects: `flag.final_offer_wavered = true`

3. `契約書に手を伸ばす`
   - next: `final_offer_accept_bad_seed`
   - effects: `flag.final_offer_accepted = true`, `flag.bad_end_debt_seed = true`

### 6-A. 拒絶

**protagonist**

「契約しません」

**zephyros**

「……ほう」

**protagonist**

「この店は、祖母の思い出だけじゃありません。今ここに来てくれる人たちの場所です」

**zephyros**

「綺麗事ですね」

**protagonist**

「そうかもしれません。でも、その綺麗事で毎日コーヒーを淹れています」

### 6-B. 迷う

**protagonist**

「もし……契約したら、本当に店は守れるんですか」

**zephyros**

「もちろん。あなたは苦労から解放されます」

**narration**

一瞬だけ、その言葉が甘く聞こえた。
苦労から解放される。
責任から逃げられる。

けれど、カウンターの向こうに祖母の古い写真が見えた。

**protagonist**

「……でも、それは私が守ったことにはなりません」

### 6-C. 契約書に手を伸ばす

**protagonist**

「私……もう、疲れました」

**zephyros**

「賢明です。あなたには、誰かに守られる方が向いている」

**narration**

指先が契約書に触れる。
その瞬間、紙の金色が、檻のように見えた。

**protagonist**

「……これは、本当に救いなの？」

**zephyros**

「救いですよ。私に従う限りは」

### 7. シオンの気配

**narration**

店の奥で、風が鳴った。
窓は閉まっている。
それでも、森の匂いがした。

**shion_voice**

『自分で選べ』

**narration**

声は一瞬だった。
けれど、確かに聞こえた。

### 8. 終了

**protagonist**

「明日、商人組合に行きます」

**zephyros**

「後悔しますよ」

**protagonist**

「するかもしれません。でも、逃げた後悔よりはいいです」

**narration**

ゼフィロスは笑みを消した。
初めて、彼の目に冷たい怒りが宿る。

**zephyros**

「では、明日。あなたの小さな勇気が、どれほど脆いか見せてあげましょう」

**effect**

```json
{
  "flag": { "key": "final_offer_seen", "value": true }
}
```

## 実装メモ

- `final_offer_accepted` は即Bad Endではなく、Day30のBad End条件に使う。
- ただし、プロトタイプではこの選択肢をロックしてもよい。
- 終盤対決前の心理圧として重要。
