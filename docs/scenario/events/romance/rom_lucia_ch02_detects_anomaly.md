# rom_lucia_ch02_detects_anomaly

## 基本情報

| 項目 | 内容 |
|---|---|
| eventId | rom_lucia_ch02_detects_anomaly |
| title | 王子が気づいた違和感 |
| category | romance / main-support |
| day | 21 |
| triggerCondition | `lucia_ch01_complete === true` and `sabotage_started === true` |
| relatedCharacters | protagonist, lucia, shion |
| purpose | ルシアルートをメイン危機へ接続し、王族としての視点を活かす |

## 役割

ルシアがカフェの異変に気づき、単なる甘い王子ではなく、社会構造や商人組合の力関係を理解している人物として描く。
主人公との距離を縮めつつ、終盤の告発・商人組合ルートへの伏線を作る。

## イベント本文

### 1. いつもと違う来店

**narration**

昼過ぎ。
店内が少し落ち着いた頃、扉のベルが涼やかに鳴った。

入ってきたのは、ルシアだった。
けれど、いつものような柔らかな笑顔はない。
彼は店内を一目見て、すぐに小さく眉を寄せた。

**lucia**

「今日は、席に余裕があるね」

**protagonist**

「はい。少し、客足が落ちていて……」

**lucia**

「少し、ではないように見える」

### 2. 王子の観察眼

**narration**

ルシアはカウンター席に座ると、メニュー表に目を落とした。

**lucia**

「蜂蜜を使う菓子が減っている。ミルク系の飲み物も、数を絞っているね」

**protagonist**

「分かるんですか？」

**lucia**

「王宮では、食材の流通も政治の一部だからね。何が出せないかを見れば、どこを締められているか分かる」

**protagonist**

「締められている……」

**lucia**

「言葉がきつかったね。だが、これは偶然の欠品ではないと思う」

### 3. ゼフィロスの名

**shion**

「ルシア。ゼフィロス・ゴールドウィングを知っているか」

**lucia**

「知っている。表向きは投資家。実態は、弱った店に入り込む金貸しだ」

**protagonist**

「やっぱり……」

**lucia**

「証拠がなければ、表では裁けない。彼はそれをよく知っている」

**shion**

「厄介だな」

**lucia**

「だからこそ、感情で動いてはいけない」

### 4. 選択肢

**choice**

ルシアに何を相談しよう？

1. `商人組合について聞く`
   - next: `lucia_ch02_guild`
   - effects: `affection.lucia +10`, `flag.learned_about_merchant_guild = true`

2. `王族として助けられないか聞く`
   - next: `lucia_ch02_royal_help`
   - effects: `affection.lucia +5`, `flag.asked_lucia_royal_help = true`

3. `この店のことは自分で守りたいと言う`
   - next: `lucia_ch02_self_reliance`
   - effects: `affection.lucia +15`, `flag.lucia_respects_owner_pride = true`

### 5-A. 商人組合について

**protagonist**

「商人組合って、こういう時に頼れる場所なんですか？」

**lucia**

「本来はね。取引の公正さを守るための組織だ」

**protagonist**

「本来は……？」

**lucia**

「組織は人でできている。中にゼフィロスと近い者がいれば、動きは鈍る」

### 5-B. 王族として助けられないか

**protagonist**

「ルシアさんが王族なら、何かできたりしませんか？」

**lucia**

「できる。けれど、今すぐ僕が名前を出せば、この店は『王子の後ろ盾で勝った店』になる」

**protagonist**

「それは……」

**lucia**

「君の店の信用を、僕の身分で塗りつぶしたくない」

### 5-C. 自分で守りたい

**protagonist**

「助けてほしい気持ちはあります。でも、この店のことは、できる限り自分で守りたいです」

**lucia**

「……いい答えだ」

**protagonist**

「無謀ですか？」

**lucia**

「いや。店主の顔をしている」

### 6. ルシアの提案

**lucia**

「僕が表立って動くのは、まだ早い」

**protagonist**

「では、どうすれば……」

**lucia**

「記録を残すんだ。届かなかった材料、キャンセルされた注文、流れた噂、来なくなった客の話。全部」

**shion**

「証拠の土台か」

**lucia**

「そう。商人組合を動かすなら、感情ではなく記録が要る」

**protagonist**

「記録……私にもできそうです」

**lucia**

「できるさ。経営者の強さは、派手な魔法だけじゃない。毎日の帳面にも宿る」

### 7. 小さな甘さ

**narration**

ルシアは、残っていたシンプルな焼き菓子を一つ注文した。

**lucia**

「今日はこれをいただくよ」

**protagonist**

「すみません。いつものフルーツタルトは出せなくて」

**lucia**

「僕は、これがいい」

**protagonist**

「え？」

**lucia**

「店が苦しい時に出せる一皿には、その店の本当の味が出る」

**narration**

ルシアは焼き菓子を一口食べ、静かに微笑んだ。

**lucia**

「美味しい。ちゃんと、この店の味だ」

### 8. 終了

**protagonist**

「ありがとうございます。私、記録をつけます。ちゃんと戦うために」

**lucia**

「その時が来たら、僕も力になる。君の努力を消さない形で」

**shion**

「王子にしては、控えめな支援だな」

**lucia**

「店主の物語を、僕が奪うわけにはいかないからね」

**effect**

```json
{
  "flag": { "key": "evidence_log_started", "value": true },
  "flag2": { "key": "lucia_ch02_complete", "value": true },
  "flag3": { "key": "merchant_guild_route_seed", "value": true }
}
```

## 実装メモ

- ルシアは権力で即解決しない。
- 彼の役割は「組織・証拠・公的手続き」への導線。
- 終盤のゼフィロス告発で `evidence_log_started` と `merchant_guild_route_seed` を参照できる。
