# tutorial_d01_open

## 目的

Day1の営業開始イベント。
仕入れ後に「店を開ける」操作へ進めるためのチュートリアル。
営業中は自動で客が来ること、時間帯・品切れ・評判が重要になることを説明する。

## 基本情報

| 項目 | 内容 |
|---|---|
| eventId | tutorial_d01_open |
| category | tutorial |
| day | 1 |
| triggerCondition | tutorial_procurement_done = true |
| relatedCharacters | protagonist, shion |
| resultFlags | tutorial_open_intro = true |
| unlocks | cafe open action / tutorial_d01_result |
| estimatedReadTime | 1〜2分 |

## このイベントで伝えること

- 仕入れが終わったら営業開始できる。
- 営業中は来客が自動で発生する。
- 品切れ、提供メニュー、評判が結果に影響する。
- 特別な客や恋愛キャラが来る可能性を匂わせる。

## トーン

初めての開店前の緊張感。
主人公は不安、シオンは落ち着いて背中を押す。

## イベント本文

### event: tut_open_001

- type: narration
- text:

必要な材料を発注し終えると、店内が少しだけ「今日の店」らしくなった。

棚には珈琲豆。
カウンターには焼き菓子の準備。
窓から差し込む光も、さっきより明るく見える。

- nextEventId: tut_open_002

### event: tut_open_002

- type: dialogue
- speaker: protagonist
- emotion: normal
- text:

これで……開店できるんですね。

- nextEventId: tut_open_003

### event: tut_open_003

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: normal
- text:

ああ。
看板を表に出せば、今日の営業が始まる。

- nextEventId: tut_open_004

### event: tut_open_004

- type: dialogue
- speaker: protagonist
- emotion: sad
- text:

お客様、来てくれるかな……。

- nextEventId: tut_open_005

### event: tut_open_005

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: normal
- text:

最初から満席にはならない。
だが、この森にはハナコの店を覚えている者がいる。

まずは、一人目のお客様を大切にしろ。

- nextEventId: tut_open_006

### event: tut_open_006

- type: dialogue
- speaker: protagonist
- emotion: normal
- text:

一人目のお客様……。

- nextEventId: tut_open_007

### event: tut_open_007

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: normal
- text:

営業中は、来店したお客様に用意したメニューを提供する。
材料が足りなければ品切れだ。

品切れが続けば、評判は下がる。
逆に満足して帰る者が増えれば、店の評判は少しずつ広がる。

- nextEventId: tut_open_008

### event: tut_open_008

- type: dialogue
- speaker: protagonist
- emotion: surprised
- text:

評判が上がると、何か変わるんですか？

- nextEventId: tut_open_009

### event: tut_open_009

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: happy
- text:

客が増える。
それから……少し変わった客も来るようになる。

妖精、エルフ、獣人、貴族、王族。
この店は、そういう者たちがふらりと訪れる場所だからな。

- nextEventId: tut_open_010

### event: tut_open_010

- type: dialogue
- speaker: protagonist
- emotion: surprised
- text:

王族まで……！？

- nextEventId: tut_open_011

### event: tut_open_011

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: normal
- text:

驚くのは、実際に来てからでいい。
今は目の前の営業に集中しろ。

- nextEventId: tut_open_012

### event: tut_open_012

- type: narration
- text:

私は小さく息を吸って、店の看板を手に取った。

木製の看板には、祖母の筆跡が残っている。
「本日営業中」――その文字を、表へ向けた。

- nextEventId: tut_open_013

### event: tut_open_013

- type: dialogue
- speaker: protagonist
- emotion: happy
- text:

喫茶フェアリーテイル、開店します。

- nextEventId: tut_open_014

### event: tut_open_014

- type: effect
- text:

【チュートリアル】
「CAFE OPEN」ボタンを押して、営業を開始しましょう。

営業中はお客様が来店し、用意したメニューが自動で提供されます。
結果は営業終了後に確認できます。

- effects:
  - flag.tutorial_open_intro = true
- nextEventId: null

## 実装メモ

- このイベント終了後、営業開始ボタンを強調する。
- 営業が完了したら `tutorial_open_done = true` を立てる。
- 特別客の説明は軽く匂わせるだけ。具体的な恋愛キャラ説明は後日イベントへ回す。
