# tutorial_d02_shouran

## 目的

Day2に発生する「照覧の魔法」チュートリアル。
主人公の成長、幻装レベル、経営と魅力の連動、恋愛条件の基礎を自然に説明する。

## 基本情報

| 項目 | 内容 |
|---|---|
| eventId | tutorial_d02_shouran |
| category | tutorial |
| day | 2 |
| triggerCondition | tutorial_day1_complete = true |
| relatedCharacters | protagonist, shion |
| resultFlags | tutorial_shouran_intro = true |
| unlocks | protagonist/status screen |
| estimatedReadTime | 2分 |

## このイベントで伝えること

- 照覧の魔法は主人公の状態確認機能。
- 経営がうまくいくと、主人公の魔力と幻装が育つ。
- 幻装は見た目だけでなく、特別な相手との関係にも影響する。
- 数値管理を世界観内の魔法として説明する。

## トーン

昨日より少し前向き。
シオンは説明役だが、魔法の話なので少し幻想的にする。
恋愛要素は匂わせる程度。

## イベント本文

### event: tut_shouran_001

- type: narration
- text:

二日目の朝。

昨日より少しだけ早く店に来た私は、窓を開けて森の空気を入れた。
湿った土と若葉の匂いが、珈琲豆の香りに混ざる。

- nextEventId: tut_shouran_002

### event: tut_shouran_002

- type: dialogue
- speaker: protagonist
- emotion: happy
- text:

昨日より、少しだけ落ち着いてるかも。

- nextEventId: tut_shouran_003

### event: tut_shouran_003

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: normal
- text:

なら、今日はお前自身の状態を見る方法を教える。

- nextEventId: tut_shouran_004

### event: tut_shouran_004

- type: dialogue
- speaker: protagonist
- emotion: surprised
- text:

私自身の状態？

- nextEventId: tut_shouran_005

### event: tut_shouran_005

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: normal
- text:

照覧の魔法だ。
この森で店を営む者は、自分の魔力の流れを確かめることができる。

- nextEventId: tut_shouran_006

### event: tut_shouran_006

- type: narration
- text:

シオンが指先を軽く振ると、カウンターの上に淡い光の輪が浮かんだ。

光の中に、文字のようなものがゆっくりと形を取っていく。

- nextEventId: tut_shouran_007

### event: tut_shouran_007

- type: dialogue
- speaker: protagonist
- emotion: surprised
- text:

わ……これ、私のことが表示されてる？

- nextEventId: tut_shouran_008

### event: tut_shouran_008

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: normal
- text:

そうだ。
資金、評判、そして幻装レベル。
今の店と、お前自身の状態が映る。

- nextEventId: tut_shouran_009

### event: tut_shouran_009

- type: dialogue
- speaker: protagonist
- emotion: normal
- text:

幻装レベル……昨日も少し聞いた気がします。

- nextEventId: tut_shouran_010

### event: tut_shouran_010

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: normal
- text:

幻装は、この店に集まる魔力が、お前の姿に宿る現象だ。

店が賑わい、評判が上がり、お前が自信を持つほど、幻装は美しく安定する。

- nextEventId: tut_shouran_011

### event: tut_shouran_011

- type: dialogue
- speaker: protagonist
- emotion: surprised
- text:

経営と、私の見た目がつながってるんですか？

- nextEventId: tut_shouran_012

### event: tut_shouran_012

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: happy
- text:

不思議だろう。
だが、この店はそういう場所だ。

人をもてなし、信頼を集めるほど、お前自身の輝きも増していく。

- nextEventId: tut_shouran_013

### event: tut_shouran_013

- type: dialogue
- speaker: protagonist
- emotion: normal
- text:

……ちょっと緊張しますね。

- nextEventId: tut_shouran_014

### event: tut_shouran_014

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: normal
- text:

緊張する必要はない。
幻装は飾りではなく、お前が積み重ねた結果だ。

背伸びではなく、成長だと思えばいい。

- nextEventId: tut_shouran_015

### event: tut_shouran_015

- type: dialogue
- speaker: protagonist
- emotion: normal
- text:

成長……。

- nextEventId: tut_shouran_016

### event: tut_shouran_016

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: normal
- text:

そして幻装は、特別な相手との関係にも影響する。

身分の高い妖精や、強い魔力を持つ者と向き合うには、それに見合う輝きが必要になることもある。

- nextEventId: tut_shouran_017

### event: tut_shouran_017

- type: dialogue
- speaker: protagonist
- emotion: surprised
- text:

特別な相手……？

- nextEventId: tut_shouran_018

### event: tut_shouran_018

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: happy
- text:

それは、いずれ分かる。
今はまず、自分の状態を確認するところからだ。

- nextEventId: tut_shouran_019

### event: tut_shouran_019

- type: effect
- text:

【チュートリアル】
主人公画面で、照覧の魔法を確認しましょう。

確認できるもの：
- 資金
- 評判
- 幻装レベル
- 成長の進み具合

幻装レベルは、経営結果や評判によって変化します。

- effects:
  - flag.tutorial_shouran_intro = true
- nextEventId: null

## 実装メモ

- このイベント後、主人公ステータス画面へ誘導する。
- ステータス確認完了時に `tutorial_shouran_done = true` を立てる。
- 恋愛条件の詳細はキャラ別イベントで説明する。
- 幻装レベルは見た目変化と恋愛/身分条件の橋渡しとして使う。
