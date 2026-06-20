# rom_lucia_ch01

## 目的

ルシア恋愛ルートの第1章。
王族キャラとしての華やかさを出しつつ、主人公のカフェが「身分や立場を少し忘れられる場所」であることを見せる。

ルシアは最初から甘くしすぎず、優雅・少し気まぐれ・孤独を隠す王子として導入する。

## 基本情報

- eventId: `rom_lucia_ch01`
- title: `光の王子の午後`
- category: `romance`
- route: `lucia`
- day: 8以降
- triggerCondition:
  - `first_regulars_seen === true`
  - `reputation >= 10`
- relatedCharacters:
  - protagonist
  - lucia
  - shion
- unlock / effects:
  - `affection.lucia: +5〜+15`
  - `flag: { key: 'lucia_ch01_complete', value: true }`
  - `flag: { key: 'lucia_first_visit', value: true }`

## 位置づけ

初の本格恋愛攻略対象の来店イベント。
ルシアは王族階級なので、今後の条件として幻装レベル・評判・高級メニューとの接続を持たせる。

---

## イベント本文

### event: rom_lucia_ch01

```yaml
eventId: rom_lucia_ch01
title: 光の王子の午後
category: romance
route: lucia
triggerCondition:
  reputation: 10
```

---

### 01

```yaml
id: lucia_ch01_001
type: narration
text: >
  午後の光が、店内のテーブルをやわらかく照らしていた。
  焼き菓子の甘い香りが残る、静かな時間。
nextEventId: lucia_ch01_002
```

### 02

```yaml
id: lucia_ch01_002
type: narration
text: >
  その静けさを破るように、扉のベルが涼やかに鳴った。
  まるで光そのものが店に入ってきたようだった。
nextEventId: lucia_ch01_003
```

### 03

```yaml
id: lucia_ch01_003
type: narration
text: >
  金色の髪に、透き通るような碧い瞳。
  仕立ての良い白い上着には、細い金糸の刺繍がきらめいている。
nextEventId: lucia_ch01_004
```

### 04

```yaml
id: lucia_ch01_004
type: dialogue
speaker: lucia
speakerName: ？？？
emotion: normal
text: >
  ここが、最近少し噂になっている森のカフェか。
  思っていたより、落ち着く場所だね。
nextEventId: lucia_ch01_005
```

### 05

```yaml
id: lucia_ch01_005
type: dialogue
speaker: protagonist
speakerName: 主人公
emotion: normal
text: >
  いらっしゃいませ。
  お好きな席へどうぞ。
nextEventId: lucia_ch01_006
```

### 06

```yaml
id: lucia_ch01_006
type: dialogue
speaker: lucia
speakerName: ？？？
emotion: happy
text: >
  ありがとう。
  できれば、窓際の席をもらえるかな。
  森が見える席がいい。
nextEventId: lucia_ch01_007
```

### 07

```yaml
id: lucia_ch01_007
type: dialogue
speaker: protagonist
speakerName: 主人公
emotion: happy
text: >
  はい、こちらへどうぞ。
nextEventId: lucia_ch01_008
```

### 08

```yaml
id: lucia_ch01_008
type: narration
text: >
  案内すると、青年は椅子に腰かけ、店内を興味深そうに見回した。
  その所作は自然なのに、どこか舞台の上の人のように整っている。
nextEventId: lucia_ch01_009
```

### 09

```yaml
id: lucia_ch01_009
type: dialogue
speaker: lucia
speakerName: ？？？
emotion: normal
text: >
  おすすめは？
  甘いものがあると嬉しい。
nextEventId: lucia_ch01_choice
```

### 10 choice

```yaml
id: lucia_ch01_choice
type: choice
speaker: protagonist
speakerName: 主人公
text: >
  何をおすすめしよう……。
choices:
  - text: 季節のフルーツタルトをおすすめする
    nextEventId: lucia_ch01_tart
    effects:
      affection:
        characterId: lucia
        amount: 15
  - text: 紅茶と焼き菓子のセットをおすすめする
    nextEventId: lucia_ch01_tea
    effects:
      affection:
        characterId: lucia
        amount: 10
  - text: まずは定番の珈琲をおすすめする
    nextEventId: lucia_ch01_coffee
    effects:
      affection:
        characterId: lucia
        amount: 5
```

---

### 11A

```yaml
id: lucia_ch01_tart
type: dialogue
speaker: protagonist
speakerName: 主人公
emotion: happy
text: >
  季節のフルーツタルトはいかがでしょう。
  今日の果物は、森のベリーを使っています。
nextEventId: lucia_ch01_tart_2
```

### 12A

```yaml
id: lucia_ch01_tart_2
type: dialogue
speaker: lucia
speakerName: ？？？
emotion: happy
text: >
  森のベリーか。
  それはいいね。飾りだけじゃない、この場所の味がしそうだ。
nextEventId: lucia_ch01_common
```

---

### 11B

```yaml
id: lucia_ch01_tea
type: dialogue
speaker: protagonist
speakerName: 主人公
emotion: normal
text: >
  紅茶と焼き菓子のセットはいかがでしょう。
  香りが強すぎない茶葉なので、午後に向いています。
nextEventId: lucia_ch01_tea_2
```

### 12B

```yaml
id: lucia_ch01_tea_2
type: dialogue
speaker: lucia
speakerName: ？？？
emotion: normal
text: >
  上品な選び方だね。
  では、それをいただこう。
nextEventId: lucia_ch01_common
```

---

### 11C

```yaml
id: lucia_ch01_coffee
type: dialogue
speaker: protagonist
speakerName: 主人公
emotion: normal
text: >
  まずは、定番の珈琲はいかがでしょう。
  祖母のころから続く味です。
nextEventId: lucia_ch01_coffee_2
```

### 12C

```yaml
id: lucia_ch01_coffee_2
type: dialogue
speaker: lucia
speakerName: ？？？
emotion: normal
text: >
  なるほど。
  店の基本を出す、ということか。
  悪くない。
nextEventId: lucia_ch01_common
```

---

### 13 common

```yaml
id: lucia_ch01_common
type: narration
text: >
  注文を用意して運ぶと、青年は一口味わい、少しだけ目を細めた。
nextEventId: lucia_ch01_014
```

### 14

```yaml
id: lucia_ch01_014
type: dialogue
speaker: lucia
speakerName: ？？？
emotion: happy
text: >
  ……美味しい。
  派手ではないけれど、丁寧な味だ。
nextEventId: lucia_ch01_015
```

### 15

```yaml
id: lucia_ch01_015
type: dialogue
speaker: protagonist
speakerName: 主人公
emotion: happy
text: >
  ありがとうございます。
  まだまだ勉強中ですが、そう言っていただけると嬉しいです。
nextEventId: lucia_ch01_016
```

### 16

```yaml
id: lucia_ch01_016
type: dialogue
speaker: lucia
speakerName: ？？？
emotion: normal
text: >
  勉強中の店主、か。
  いい響きだね。完成されすぎていない場所には、息をしやすい余白がある。
nextEventId: lucia_ch01_017
```

### 17

```yaml
id: lucia_ch01_017
type: dialogue
speaker: protagonist
speakerName: 主人公
emotion: surprised
text: >
  息をしやすい……？
nextEventId: lucia_ch01_018
```

### 18

```yaml
id: lucia_ch01_018
type: dialogue
speaker: lucia
speakerName: ？？？
emotion: sad
text: >
  立場のある場所では、誰もが正しい姿を求められる。
  けれど、ここでは少し違う気がした。
nextEventId: lucia_ch01_019
```

### 19

```yaml
id: lucia_ch01_019
type: narration
text: >
  その言葉の奥に、ほんの少し疲れた響きがあった。
nextEventId: lucia_ch01_020
```

### 20

```yaml
id: lucia_ch01_020
type: dialogue
speaker: shion
speakerName: シオン
emotion: normal
text: >
  ……お客様。
  お忍びでいらっしゃるなら、もう少し気配を抑えた方がよろしいかと。
nextEventId: lucia_ch01_021
```

### 21

```yaml
id: lucia_ch01_021
type: dialogue
speaker: protagonist
speakerName: 主人公
emotion: surprised
text: >
  シオン？
  それって、どういう……。
nextEventId: lucia_ch01_022
```

### 22

```yaml
id: lucia_ch01_022
type: dialogue
speaker: lucia
speakerName: ？？？
emotion: smirk
text: >
  さすが森の守護者。
  隠していたつもりだったんだけどな。
nextEventId: lucia_ch01_023
```

### 23

```yaml
id: lucia_ch01_023
type: dialogue
speaker: lucia
speakerName: ルシア
emotion: normal
text: >
  改めて名乗ろう。
  僕はルシア。妖精王国の第一王子だ。
nextEventId: lucia_ch01_024
```

### 24

```yaml
id: lucia_ch01_024
type: dialogue
speaker: protagonist
speakerName: 主人公
emotion: surprised
text: >
  お、王子様……！？
nextEventId: lucia_ch01_025
```

### 25

```yaml
id: lucia_ch01_025
type: dialogue
speaker: lucia
speakerName: ルシア
emotion: happy
text: >
  ここでは、ただの客として扱ってほしい。
  その方が、また来やすいからね。
nextEventId: lucia_ch01_026
```

### 26

```yaml
id: lucia_ch01_026
type: dialogue
speaker: protagonist
speakerName: 主人公
emotion: normal
text: >
  ……わかりました。
  では、ルシア様ではなく、ルシアさんでよろしいですか？
nextEventId: lucia_ch01_027
```

### 27

```yaml
id: lucia_ch01_027
type: dialogue
speaker: lucia
speakerName: ルシア
emotion: happy
text: >
  うん。
  そのくらいが、ちょうどいい。
nextEventId: lucia_ch01_028
```

### 28

```yaml
id: lucia_ch01_028
type: narration
text: >
  ルシアは穏やかに笑い、残りの菓子をゆっくり味わった。
  その笑顔は華やかで、けれどどこか自由を求めているようにも見えた。
nextEventId: lucia_ch01_end
```

### 29

```yaml
id: lucia_ch01_end
type: effect
effects:
  flag:
    key: lucia_ch01_complete
    value: true
  flag2:
    key: lucia_first_visit
    value: true
nextEventId: null
```

---

## 実装メモ

- ルシアは王子だが、初回から強引に恋愛へ寄せない。
- 店の味と雰囲気を評価させ、カフェの存在価値を広げる。
- シオンが正体を見抜くことで、世界観の格を上げる。
- 次章では王宮・身分・幻装レベル条件へつなぐ。
