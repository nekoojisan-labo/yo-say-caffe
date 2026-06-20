# rom_shion_ch01

## 目的

シオン恋愛ルートの第1章。
恋愛というより、まずは「守護者」「祖母の旧友」「カフェを見守る存在」としての距離を縮める。

主人公が店主として立ち始めたタイミングで、シオンの孤独・長い時間・祖母との関係に初めて触れる。

## 基本情報

- eventId: `rom_shion_ch01`
- title: `森の守護者の横顔`
- category: `romance`
- route: `shion`
- day: 7以降
- triggerCondition:
  - `first_regulars_seen === true`
  - `prologue_complete === true`
- relatedCharacters:
  - protagonist
  - shion
- unlock / effects:
  - `affection.shion: +15` または選択肢により +5〜+15
  - `flag: { key: 'shion_ch01_complete', value: true }`

## 位置づけ

シオンは最初から距離が近いが、恋愛対象としてはまだ遠い存在。
第1章では、主人公が「守られるだけの相手」ではなく、シオンの孤独を少しだけ見る。

---

## イベント本文

### event: rom_shion_ch01

```yaml
eventId: rom_shion_ch01
title: 森の守護者の横顔
category: romance
route: shion
triggerCondition:
  flag:
    key: first_regulars_seen
    value: true
```

---

### 01

```yaml
id: shion_ch01_001
type: narration
text: >
  閉店後。
  洗い終えたカップを棚に戻していると、窓の外で淡い光が揺れた。
nextEventId: shion_ch01_002
```

### 02

```yaml
id: shion_ch01_002
type: narration
text: >
  森の奥へ続く小道に、シオンの姿があった。
  いつものように穏やかで、けれど今日は少しだけ遠くを見ているように見えた。
nextEventId: shion_ch01_003
```

### 03

```yaml
id: shion_ch01_003
type: dialogue
speaker: protagonist
speakerName: 主人公
emotion: normal
text: >
  シオン。
  今日はもう、お店は閉めましたよ。
nextEventId: shion_ch01_004
```

### 04

```yaml
id: shion_ch01_004
type: dialogue
speaker: shion
speakerName: シオン
emotion: normal
text: >
  知っていますわ。
  今日は客の流れも、仕入れの判断も、よくできていました。
nextEventId: shion_ch01_005
```

### 05

```yaml
id: shion_ch01_005
type: dialogue
speaker: protagonist
speakerName: 主人公
emotion: surprised
text: >
  もしかして、ずっと見ていたんですか？
nextEventId: shion_ch01_006
```

### 06

```yaml
id: shion_ch01_006
type: dialogue
speaker: shion
speakerName: シオン
emotion: normal
text: >
  森の守護者ですから。
  この場所も、そこに立つあなたも、見守る役目があります。
nextEventId: shion_ch01_007
```

### 07

```yaml
id: shion_ch01_007
type: dialogue
speaker: protagonist
speakerName: 主人公
emotion: sad
text: >
  役目……。
  シオンは、ずっとそうしてきたんですか？
nextEventId: shion_ch01_008
```

### 08

```yaml
id: shion_ch01_008
type: dialogue
speaker: shion
speakerName: シオン
emotion: normal
text: >
  ええ。
  あなたが生まれるずっと前から。
  ハナコ様がこの店を開く前から。
nextEventId: shion_ch01_choice
```

### 09 choice

```yaml
id: shion_ch01_choice
type: choice
speaker: protagonist
speakerName: 主人公
text: >
  何を聞こう……。
choices:
  - text: ずっと一人で寂しくなかったんですか？
    nextEventId: shion_ch01_lonely
    effects:
      affection:
        characterId: shion
        amount: 15
  - text: おばあちゃんとは、どんな関係だったんですか？
    nextEventId: shion_ch01_hanako
    effects:
      affection:
        characterId: shion
        amount: 10
  - text: 私も、ちゃんと役目を果たせるでしょうか？
    nextEventId: shion_ch01_role
    effects:
      affection:
        characterId: shion
        amount: 5
```

---

### 10A

```yaml
id: shion_ch01_lonely
type: dialogue
speaker: shion
speakerName: シオン
emotion: surprised
text: >
  ……ずいぶん、まっすぐ聞くのですね。
nextEventId: shion_ch01_lonely_2
```

### 11A

```yaml
id: shion_ch01_lonely_2
type: dialogue
speaker: shion
speakerName: シオン
emotion: sad
text: >
  寂しい、という感情を忘れたつもりでいました。
  けれどハナコ様に出会ってから、忘れていただけなのだと気づきましたわ。
nextEventId: shion_ch01_common
```

---

### 10B

```yaml
id: shion_ch01_hanako
type: dialogue
speaker: shion
speakerName: シオン
emotion: sad
text: >
  ハナコ様は、不思議な方でした。
  森を恐れず、私を恐れず、ただ普通に珈琲を差し出したのです。
nextEventId: shion_ch01_hanako_2
```

### 11B

```yaml
id: shion_ch01_hanako_2
type: dialogue
speaker: shion
speakerName: シオン
emotion: happy
text: >
  「守護者だって、休憩は必要でしょう」……そう言って。
  あの方らしいでしょう？
nextEventId: shion_ch01_common
```

---

### 10C

```yaml
id: shion_ch01_role
type: dialogue
speaker: shion
speakerName: シオン
emotion: normal
text: >
  果たせます。
  ただし、ハナコ様と同じになる必要はありません。
nextEventId: shion_ch01_role_2
```

### 11C

```yaml
id: shion_ch01_role_2
type: dialogue
speaker: shion
speakerName: シオン
emotion: happy
text: >
  あなたはあなたのやり方で、この店を守ればよいのです。
  それを、私は見届けます。
nextEventId: shion_ch01_common
```

---

### 12 common

```yaml
id: shion_ch01_common
type: dialogue
speaker: protagonist
speakerName: 主人公
emotion: normal
text: >
  シオンは……おばあちゃんのこと、本当に大切に思っていたんですね。
nextEventId: shion_ch01_013
```

### 13

```yaml
id: shion_ch01_013
type: dialogue
speaker: shion
speakerName: シオン
emotion: sad
text: >
  ええ。
  だからこそ、あなたがこの店を継ぐと知った時、少し怖かった。
nextEventId: shion_ch01_014
```

### 14

```yaml
id: shion_ch01_014
type: dialogue
speaker: protagonist
speakerName: 主人公
emotion: surprised
text: >
  怖かった？
nextEventId: shion_ch01_015
```

### 15

```yaml
id: shion_ch01_015
type: dialogue
speaker: shion
speakerName: シオン
emotion: normal
text: >
  また、大切な場所が変わってしまうのではないかと。
  また、誰かを見送るだけになるのではないかと。
nextEventId: shion_ch01_016
```

### 16

```yaml
id: shion_ch01_016
type: dialogue
speaker: protagonist
speakerName: 主人公
emotion: sad
text: >
  ……私は、まだ頼りないです。
  でも、この店を大切にしたい気持ちは本当です。
nextEventId: shion_ch01_017
```

### 17

```yaml
id: shion_ch01_017
type: dialogue
speaker: shion
speakerName: シオン
emotion: happy
text: >
  それだけで、十分始まりになりますわ。
nextEventId: shion_ch01_018
```

### 18

```yaml
id: shion_ch01_018
type: narration
text: >
  夜風が、森の葉を静かに揺らした。
  シオンの横顔は、いつもより少しだけ近く見えた。
nextEventId: shion_ch01_end
```

### 19

```yaml
id: shion_ch01_end
type: effect
effects:
  flag:
    key: shion_ch01_complete
    value: true
nextEventId: null
```

---

## 実装メモ

- シオンは丁寧語・やや古風・感情を抑える。
- この章では甘すぎない。
- 主人公はシオンの孤独を知り、守られるだけではなく寄り添う入口に立つ。
- 次章以降で「封印」「森の秘密」「祖母との約束」を広げる。
