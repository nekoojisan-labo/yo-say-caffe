# main_d12_rosa_warning

## 目的

ゼフィロス接近後、ローザが危険性を警告するイベント。
ローザの救済キャラとしての立場を強め、同時にゼフィロスが単なる投資家ではないことを明確にする。

ただし、ローザは情報を一方的に説明するだけでなく、主人公を本気で心配している人物として描く。

## 基本情報

- eventId: `main_d12_rosa_warning`
- title: `姐さんの忠告`
- category: `main`
- day: 12
- triggerCondition:
  - `zephyros_met === true`
  - `rosa_met === true` または `main_d05_rosa_intro_complete === true`
- relatedCharacters:
  - protagonist
  - rosa
  - shion
- unlock / effects:
  - `flag: { key: 'rosa_warned_about_zephyros', value: true }`
  - `flag: { key: 'zephyros_risk_known', value: true }`

## 位置づけ

Day10のゼフィロス接近を受けた警告イベント。
Day15以降の妨害・借金・救済イベントの前振り。

ローザは強いが、強引に問題を解決するのではなく、主人公が自分で判断するための情報を渡す役。

---

## イベント本文

### event: main_d12_rosa_warning

```yaml
eventId: main_d12_rosa_warning
title: 姐さんの忠告
category: main
day: 12
triggerCondition:
  flag:
    key: zephyros_met
    value: true
```

---

### 01

```yaml
id: rosa_warn_001
type: narration
text: >
  閉店後。
  売上を数え終え、明日の仕入れを考えていた時だった。
nextEventId: rosa_warn_002
```

### 02

```yaml
id: rosa_warn_002
type: narration
text: >
  店の扉が、いつもより勢いよく開いた。
nextEventId: rosa_warn_003
```

### 03

```yaml
id: rosa_warn_003
type: dialogue
speaker: rosa
speakerName: ローザ
emotion: angry
text: >
  あんた！
  ゼフィロスが来たって本当！？
nextEventId: rosa_warn_004
```

### 04

```yaml
id: rosa_warn_004
type: dialogue
speaker: protagonist
speakerName: 主人公
emotion: surprised
text: >
  ローザさん！？
  え、ええ……投資のお話をしに来ましたけど。
nextEventId: rosa_warn_005
```

### 05

```yaml
id: rosa_warn_005
type: dialogue
speaker: rosa
speakerName: ローザ
emotion: angry
text: >
  投資？
  あいつが？
  そんな綺麗な言葉で包んでるだけよ！
nextEventId: rosa_warn_006
```

### 06

```yaml
id: rosa_warn_006
type: dialogue
speaker: protagonist
speakerName: 主人公
emotion: sad
text: >
  やっぱり、危ない人なんですか？
nextEventId: rosa_warn_007
```

### 07

```yaml
id: rosa_warn_007
type: dialogue
speaker: rosa
speakerName: ローザ
emotion: normal
text: >
  危ないなんてもんじゃないわ。
  あいつは、困っている店を見つけては甘い言葉で近づくの。
nextEventId: rosa_warn_008
```

### 08

```yaml
id: rosa_warn_008
type: dialogue
speaker: rosa
speakerName: ローザ
emotion: sad
text: >
  最初は資金を貸す。
  次に追加の条件をつける。
  返せなくなったころに、店も、看板も、客も、全部持っていく。
nextEventId: rosa_warn_009
```

### 09

```yaml
id: rosa_warn_009
type: dialogue
speaker: protagonist
speakerName: 主人公
emotion: surprised
text: >
  そんな……。
nextEventId: rosa_warn_010
```

### 10

```yaml
id: rosa_warn_010
type: dialogue
speaker: rosa
speakerName: ローザ
emotion: sad
text: >
  昔、あたしの知り合いもやられたわ。
  いい腕のパン職人だった。
  でも、契約書一枚で店を失った。
nextEventId: rosa_warn_011
```

### 11

```yaml
id: rosa_warn_011
type: dialogue
speaker: protagonist
speakerName: 主人公
emotion: sad
text: >
  ローザさん……。
nextEventId: rosa_warn_012
```

### 12

```yaml
id: rosa_warn_012
type: dialogue
speaker: rosa
speakerName: ローザ
emotion: angry
text: >
  だから、あんたには同じ目に遭ってほしくないのよ。
  ハナコばあちゃんの店まで、あいつに食い物にされるなんて絶対に嫌。
nextEventId: rosa_warn_013
```

### 13

```yaml
id: rosa_warn_013
type: dialogue
speaker: protagonist
speakerName: 主人公
emotion: normal
text: >
  教えてくれて、ありがとうございます。
  私、もっとちゃんと確認します。
nextEventId: rosa_warn_014
```

### 14

```yaml
id: rosa_warn_014
type: dialogue
speaker: rosa
speakerName: ローザ
emotion: normal
text: >
  うん。
  怖がるだけじゃだめ。
  相手を知って、逃げ道を用意して、必要なら戦うの。
nextEventId: rosa_warn_015
```

### 15

```yaml
id: rosa_warn_015
type: dialogue
speaker: protagonist
speakerName: 主人公
emotion: surprised
text: >
  戦う……ですか？
nextEventId: rosa_warn_016
```

### 16

```yaml
id: rosa_warn_016
type: dialogue
speaker: rosa
speakerName: ローザ
emotion: smirk
text: >
  そうよ。
  あたしは元冒険者。
  花束だけじゃなくて、荒事の場数も踏んでるんだから。
nextEventId: rosa_warn_017
```

### 17

```yaml
id: rosa_warn_017
type: dialogue
speaker: shion
speakerName: シオン
emotion: normal
text: >
  ローザの言う通りですわ。
  ゼフィロスの申し出を断るにせよ、受けるにせよ、情報が必要です。
nextEventId: rosa_warn_018
```

### 18

```yaml
id: rosa_warn_018
type: dialogue
speaker: protagonist
speakerName: 主人公
emotion: normal
text: >
  では、まず何をすればいいでしょう？
nextEventId: rosa_warn_019
```

### 19

```yaml
id: rosa_warn_019
type: dialogue
speaker: shion
speakerName: シオン
emotion: normal
text: >
  契約書を見ずに返事をしないこと。
  資金繰りを一人で抱え込まないこと。
  そして、店の評判を落とさないことですわ。
nextEventId: rosa_warn_020
```

### 20

```yaml
id: rosa_warn_020
type: dialogue
speaker: rosa
speakerName: ローザ
emotion: happy
text: >
  仕入れで困ったら、あたしに言いなさい。
  花屋だけど、元冒険者仲間の伝手はまだあるから。
nextEventId: rosa_warn_021
```

### 21

```yaml
id: rosa_warn_021
type: dialogue
speaker: protagonist
speakerName: 主人公
emotion: happy
text: >
  ……はい。
  一人で抱え込まないようにします。
nextEventId: rosa_warn_022
```

### 22

```yaml
id: rosa_warn_022
type: narration
text: >
  ローザは大きな手で、どん、と自分の胸を叩いた。
  その音は少し怖かったけれど、不思議と心強かった。
nextEventId: rosa_warn_023
```

### 23

```yaml
id: rosa_warn_023
type: dialogue
speaker: rosa
speakerName: ローザ
emotion: happy
text: >
  あんたの店は、あんた一人の店じゃないわ。
  ハナコばあちゃんが残した縁も、ちゃんとここに残ってる。
nextEventId: rosa_warn_024
```

### 24

```yaml
id: rosa_warn_024
type: dialogue
speaker: protagonist
speakerName: 主人公
emotion: sad
text: >
  おばあちゃんが残した縁……。
nextEventId: rosa_warn_025
```

### 25

```yaml
id: rosa_warn_025
type: dialogue
speaker: shion
speakerName: シオン
emotion: happy
text: >
  ええ。
  それもまた、このカフェの力ですわ。
nextEventId: rosa_warn_end
```

### 26

```yaml
id: rosa_warn_end
type: effect
effects:
  flag:
    key: rosa_warned_about_zephyros
    value: true
  flag2:
    key: zephyros_risk_known
    value: true
nextEventId: null
```

---

## 実装メモ

- ローザは主人公を子ども扱いしすぎず、守るために情報を渡す。
- シオンは冷静な補足役。
- このイベントで「一人で経営するゲーム」から「関係性で危機を乗り越えるゲーム」へ移行する。
- Day15以降の妨害イベントで、ローザの仕入れルート救済につなぐ。
