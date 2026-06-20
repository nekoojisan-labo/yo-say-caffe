# main_d07_first_regulars

## 目的

チュートリアル後、カフェが少しずつ日常として回り始めたことを示す。
単なる操作説明から、主人公が自分の判断で店を切り盛りする段階へ移行させる。

このイベントでは、常連客の存在を出し、評判・客層・メニュー選びが今後の恋愛イベントや危機イベントにつながることを示す。

## 基本情報

- eventId: `main_d07_first_regulars`
- category: `main`
- day: 7
- triggerCondition:
  - `tutorial_complete === true`
- relatedCharacters:
  - protagonist
  - shion
  - regular_customer_group
- unlock / effects:
  - `flag: { key: 'first_regulars_seen', value: true }`
  - `reputation: +5`

## 位置づけ

Day1〜3で操作を学び、Day5でローザと出会った後の最初の日常イベント。
「店が続いている」「お客様が戻ってきている」「主人公が店主として見られ始めた」ことを見せる。

この後、Day7以降のシオン第1章、Day8〜10のルシア来店、Day10のゼフィロス接近へつなぐ。

---

## イベント本文

### event: main_d07_first_regulars

```yaml
eventId: main_d07_first_regulars
title: 最初の常連さん
category: main
day: 7
triggerCondition:
  flag:
    key: tutorial_complete
    value: true
```

---

### 01

```yaml
id: d07_regulars_001
type: narration
text: >
  カフェを開いてから、七日目の朝。
  最初のころは静かだった店内にも、少しずつ見覚えのある顔が増えてきた。
nextEventId: d07_regulars_002
```

### 02

```yaml
id: d07_regulars_002
type: narration
text: >
  窓際の席には、毎朝同じ時間に来る小さな妖精のおばあさん。
  カウンターには、仕事前に濃い珈琲を飲んでいく獣人の配達員。
nextEventId: d07_regulars_003
```

### 03

```yaml
id: d07_regulars_003
type: dialogue
speaker: protagonist
speakerName: 主人公
emotion: happy
text: >
  いらっしゃいませ。
  いつものハーブティーでよろしいですか？
nextEventId: d07_regulars_004
```

### 04

```yaml
id: d07_regulars_004
type: dialogue
speaker: regular_customer
speakerName: 小さな妖精の常連客
emotion: happy
text: >
  ええ、お願いね。
  あなた、少し顔つきが変わったわ。
nextEventId: d07_regulars_005
```

### 05

```yaml
id: d07_regulars_005
type: dialogue
speaker: protagonist
speakerName: 主人公
emotion: surprised
text: >
  顔つき、ですか？
nextEventId: d07_regulars_006
```

### 06

```yaml
id: d07_regulars_006
type: dialogue
speaker: regular_customer
speakerName: 小さな妖精の常連客
emotion: normal
text: >
  最初の日は、店に立っているだけで精一杯という顔だったもの。
  今日はちゃんと、この店の人の顔をしているわ。
nextEventId: d07_regulars_007
```

### 07

```yaml
id: d07_regulars_007
type: dialogue
speaker: protagonist
speakerName: 主人公
emotion: happy
text: >
  ……ありがとうございます。
  そう言ってもらえると、少しだけ自信が出ます。
nextEventId: d07_regulars_008
```

### 08

```yaml
id: d07_regulars_008
type: narration
text: >
  その日の昼前には、焼き菓子を目当てに来る客も増えていた。
  完売にはまだ遠いけれど、空席ばかりだった初日とは明らかに違う。
nextEventId: d07_regulars_009
```

### 09

```yaml
id: d07_regulars_009
type: dialogue
speaker: shion
speakerName: シオン
emotion: normal
text: >
  ……悪くない流れですわね。
nextEventId: d07_regulars_010
```

### 10

```yaml
id: d07_regulars_010
type: dialogue
speaker: protagonist
speakerName: 主人公
emotion: surprised
text: >
  シオン？
  いつからそこに？
nextEventId: d07_regulars_011
```

### 11

```yaml
id: d07_regulars_011
type: dialogue
speaker: shion
speakerName: シオン
emotion: normal
text: >
  少し前からですわ。
  お客様の顔を覚え、好みに合わせて出すものを変える。
  それができるようになれば、ただの店番ではなく店主です。
nextEventId: d07_regulars_012
```

### 12

```yaml
id: d07_regulars_012
type: dialogue
speaker: protagonist
speakerName: 主人公
emotion: normal
text: >
  店主……。
  まだ、私がそう名乗っていいのか迷います。
nextEventId: d07_regulars_013
```

### 13

```yaml
id: d07_regulars_013
type: dialogue
speaker: shion
speakerName: シオン
emotion: happy
text: >
  迷いながらでも、店に立ち続ける者を店主と呼ぶのですわ。
  ハナコ様も、最初から完璧だったわけではありません。
nextEventId: d07_regulars_014
```

### 14

```yaml
id: d07_regulars_014
type: dialogue
speaker: protagonist
speakerName: 主人公
emotion: sad
text: >
  おばあちゃんも……？
nextEventId: d07_regulars_015
```

### 15

```yaml
id: d07_regulars_015
type: dialogue
speaker: shion
speakerName: シオン
emotion: normal
text: >
  ええ。
  失敗も、赤字も、泣き言も、それはもう山ほど。
  けれど最後には、誰よりもこの店を大切にしていました。
nextEventId: d07_regulars_016
```

### 16

```yaml
id: d07_regulars_016
type: dialogue
speaker: protagonist
speakerName: 主人公
emotion: happy
text: >
  ……私も、そうなりたいです。
nextEventId: d07_regulars_017
```

### 17

```yaml
id: d07_regulars_017
type: dialogue
speaker: shion
speakerName: シオン
emotion: happy
text: >
  なら、今日の営業を丁寧に終えることですわ。
  大きな夢は、小さな一日を積み重ねた先にあります。
nextEventId: d07_regulars_018
```

### 18

```yaml
id: d07_regulars_018
type: effect
text: >
  常連客が少しずつ増え始めた。
  カフェの評判が少し上がった。
effects:
  reputation: 5
  flag:
    key: first_regulars_seen
    value: true
nextEventId: null
```

---

## 実装メモ

- このイベントは経営がプレイヤーの手に移ったことを演出する。
- シオン恋愛第1章へつなぐため、シオンの優しさと祖母への記憶を軽く出す。
- まだ恋愛色は強くしない。
- 常連客は今後、評判イベントや噂イベントで再利用可能。
