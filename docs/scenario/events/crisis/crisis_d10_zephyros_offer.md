# crisis_d10_zephyros_offer

## 目的

メイン危機であるゼフィロスの初接近イベント。
経営シミュレーションにおける資金・評判・契約リスクを、物語上の緊張として提示する。

ゼフィロスは最初から露骨な悪役にしすぎず、丁寧・親切・有能そうに見せる。
ただし、言葉の端々に支配欲と金の匂いを出す。

## 基本情報

- eventId: `crisis_d10_zephyros_offer`
- title: `金色の申し出`
- category: `crisis`
- day: 10
- triggerCondition:
  - `tutorial_complete === true`
  - `reputation >= 10`
- relatedCharacters:
  - protagonist
  - zephyros
  - shion
- unlock / effects:
  - 選択肢により `zephyros_proposal` を `interested / declined / pending` に分岐
  - `flag: { key: 'zephyros_met', value: true }`

## 位置づけ

序盤の経営成功に対する「甘い罠」。
プレイヤーに、資金を増やしたい気持ちと怪しさの両方を感じさせる。

ここでの選択は、Day12ローザ警告、Day15以降の妨害または契約リスクへつながる。

---

## イベント本文

### event: crisis_d10_zephyros_offer

```yaml
eventId: crisis_d10_zephyros_offer
title: 金色の申し出
category: crisis
day: 10
triggerCondition:
  reputation: 10
```

---

### 01

```yaml
id: zeph_offer_001
type: narration
text: >
  昼の混雑が落ち着き、店内に静けさが戻ったころ。
  扉のベルが、妙に澄んだ音を立てた。
nextEventId: zeph_offer_002
```

### 02

```yaml
id: zeph_offer_002
type: narration
text: >
  入ってきたのは、金色の羽を持つ妖精だった。
  きらびやかな上着、宝石のついた杖、そして人好きのする笑顔。
nextEventId: zeph_offer_003
```

### 03

```yaml
id: zeph_offer_003
type: dialogue
speaker: zephyros
speakerName: ？？？
emotion: happy
text: >
  これはこれは。
  噂通り、可愛らしくて居心地のよいお店ですね。
nextEventId: zeph_offer_004
```

### 04

```yaml
id: zeph_offer_004
type: dialogue
speaker: protagonist
speakerName: 主人公
emotion: normal
text: >
  いらっしゃいませ。
  お席へご案内しますね。
nextEventId: zeph_offer_005
```

### 05

```yaml
id: zeph_offer_005
type: dialogue
speaker: zephyros
speakerName: ？？？
emotion: normal
text: >
  ありがとうございます。
  ですが、今日はお茶だけでなく、少しご挨拶もしたくて参りました。
nextEventId: zeph_offer_006
```

### 06

```yaml
id: zeph_offer_006
type: dialogue
speaker: zephyros
speakerName: ゼフィロス
emotion: happy
text: >
  私はゼフィロス・ゴールドウィング。
  このあたりで、投資と金融の相談を受けております。
nextEventId: zeph_offer_007
```

### 07

```yaml
id: zeph_offer_007
type: dialogue
speaker: protagonist
speakerName: 主人公
emotion: surprised
text: >
  投資と金融……ですか？
nextEventId: zeph_offer_008
```

### 08

```yaml
id: zeph_offer_008
type: dialogue
speaker: zephyros
speakerName: ゼフィロス
emotion: normal
text: >
  ええ。
  才能ある店を見つけ、必要な資金と人脈をお渡しする。
  いわば、夢を育てる仕事です。
nextEventId: zeph_offer_009
```

### 09

```yaml
id: zeph_offer_009
type: narration
text: >
  ゼフィロスは店内を見回し、棚に並んだ焼き菓子や、窓辺の花に視線を移した。
nextEventId: zeph_offer_010
```

### 10

```yaml
id: zeph_offer_010
type: dialogue
speaker: zephyros
speakerName: ゼフィロス
emotion: happy
text: >
  祖母様から受け継いだ店を、ここまで形にした。
  たいしたものです。
nextEventId: zeph_offer_011
```

### 11

```yaml
id: zeph_offer_011
type: dialogue
speaker: protagonist
speakerName: 主人公
emotion: normal
text: >
  ありがとうございます。
  でも、まだ始めたばかりで……。
nextEventId: zeph_offer_012
```

### 12

```yaml
id: zeph_offer_012
type: dialogue
speaker: zephyros
speakerName: ゼフィロス
emotion: smirk
text: >
  だからこそ、です。
  始めたばかりの店には、勢いがあります。
  そして、勢いには資金が必要です。
nextEventId: zeph_offer_013
```

### 13

```yaml
id: zeph_offer_013
type: dialogue
speaker: protagonist
speakerName: 主人公
emotion: surprised
text: >
  資金……。
nextEventId: zeph_offer_014
```

### 14

```yaml
id: zeph_offer_014
type: dialogue
speaker: zephyros
speakerName: ゼフィロス
emotion: happy
text: >
  たとえば、新しい調理器具。
  客席の増設。
  高級茶葉の仕入れ。
  看板を少し立派にするだけでも、評判は変わります。
nextEventId: zeph_offer_015
```

### 15

```yaml
id: zeph_offer_015
type: dialogue
speaker: zephyros
speakerName: ゼフィロス
emotion: normal
text: >
  私なら、そのための資金をすぐにご用意できます。
  最初は、五万ゴールドほどでいかがでしょう。
nextEventId: zeph_offer_016
```

### 16

```yaml
id: zeph_offer_016
type: dialogue
speaker: protagonist
speakerName: 主人公
emotion: surprised
text: >
  五万……！
  そんな大きなお金、すぐには……。
nextEventId: zeph_offer_017
```

### 17

```yaml
id: zeph_offer_017
type: dialogue
speaker: zephyros
speakerName: ゼフィロス
emotion: happy
text: >
  ご安心を。
  返済は、お店が軌道に乗ってからで構いません。
  利息も、常識的な範囲で。
nextEventId: zeph_offer_018
```

### 18

```yaml
id: zeph_offer_018
type: narration
text: >
  常識的な範囲。
  その言葉はやわらかいのに、なぜか少しだけ冷たく聞こえた。
nextEventId: zeph_offer_019
```

### 19

```yaml
id: zeph_offer_019
type: dialogue
speaker: shion
speakerName: シオン
emotion: normal
text: >
  ……契約書は、お持ちですの？
nextEventId: zeph_offer_020
```

### 20

```yaml
id: zeph_offer_020
type: dialogue
speaker: zephyros
speakerName: ゼフィロス
emotion: smirk
text: >
  おや。
  森の守護者殿にお会いできるとは光栄です。
  もちろん、正式な書類は後日お持ちしますよ。
nextEventId: zeph_offer_021
```

### 21

```yaml
id: zeph_offer_021
type: dialogue
speaker: shion
speakerName: シオン
emotion: normal
text: >
  そうですか。
  ならば、今この場で返事を急がせる必要はありませんわね。
nextEventId: zeph_offer_022
```

### 22

```yaml
id: zeph_offer_022
type: dialogue
speaker: zephyros
speakerName: ゼフィロス
emotion: happy
text: >
  もちろんです。
  私はいつでも、若い才能の味方ですから。
nextEventId: zeph_offer_choice
```

### 23 choice

```yaml
id: zeph_offer_choice
type: choice
speaker: protagonist
speakerName: 主人公
text: >
  ゼフィロスの申し出に、どう答えよう……。
choices:
  - text: 詳しい話を聞いてみたいです
    nextEventId: zeph_offer_interested
    effects:
      flag:
        key: zephyros_proposal
        value: interested
  - text: 今はお断りします
    nextEventId: zeph_offer_declined
    effects:
      flag:
        key: zephyros_proposal
        value: declined
  - text: 少し考えさせてください
    nextEventId: zeph_offer_pending
    effects:
      flag:
        key: zephyros_proposal
        value: pending
```

---

### 24A

```yaml
id: zeph_offer_interested
type: dialogue
speaker: zephyros
speakerName: ゼフィロス
emotion: happy
text: >
  ええ、ええ。
  前向きなお返事、嬉しく思います。
  後日、正式な条件をお持ちしましょう。
nextEventId: zeph_offer_end_interested
```

### 25A

```yaml
id: zeph_offer_end_interested
type: narration
text: >
  ゼフィロスは満足げに微笑み、金色の羽を揺らして店を出ていった。
  シオンは、その背中を黙って見送っていた。
nextEventId: zeph_offer_end
```

---

### 24B

```yaml
id: zeph_offer_declined
type: dialogue
speaker: zephyros
speakerName: ゼフィロス
emotion: normal
text: >
  そうですか。
  慎重なのは美徳です。
  ですが、機会はいつまでも待ってはくれませんよ。
nextEventId: zeph_offer_end_declined
```

### 25B

```yaml
id: zeph_offer_end_declined
type: narration
text: >
  ゼフィロスの笑顔は崩れなかった。
  けれど一瞬だけ、その瞳から温度が消えた気がした。
nextEventId: zeph_offer_end
```

---

### 24C

```yaml
id: zeph_offer_pending
type: dialogue
speaker: zephyros
speakerName: ゼフィロス
emotion: happy
text: >
  ええ、じっくりお考えください。
  良い契約は、焦って結ぶものではありませんから。
nextEventId: zeph_offer_end_pending
```

### 25C

```yaml
id: zeph_offer_end_pending
type: narration
text: >
  ゼフィロスは名刺を置いて帰っていった。
  厚い紙に金の文字で、彼の名前が刻まれている。
nextEventId: zeph_offer_end
```

---

### 26 common end

```yaml
id: zeph_offer_end
type: dialogue
speaker: shion
speakerName: シオン
emotion: sad
text: >
  ……あの方の言葉は、よく磨かれています。
  だからこそ、簡単に信じてはいけません。
nextEventId: zeph_offer_027
```

### 27

```yaml
id: zeph_offer_027
type: dialogue
speaker: protagonist
speakerName: 主人公
emotion: normal
text: >
  シオンは、何か知っているんですか？
nextEventId: zeph_offer_028
```

### 28

```yaml
id: zeph_offer_028
type: dialogue
speaker: shion
speakerName: シオン
emotion: normal
text: >
  まだ確かなことは言えません。
  けれど、契約は料理と違って、あとから味を変えられないのですわ。
nextEventId: zeph_offer_029
```

### 29

```yaml
id: zeph_offer_029
type: effect
effects:
  flag:
    key: zephyros_met
    value: true
nextEventId: null
```

---

## 実装メモ

- ゼフィロスは初回では悪役確定にしない。
- 選択肢はどれを選んでも危機導入へ進むが、後続イベントの反応を変えられる。
- `interested` は契約リスク強め、`declined` は妨害リスク強め、`pending` は警告イベントを自然につなぎやすい。
- シオンは契約そのものを即否定せず、「急ぐな」と止める。
