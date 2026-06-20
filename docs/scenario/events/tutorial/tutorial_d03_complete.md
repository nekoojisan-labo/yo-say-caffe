# tutorial_d03_complete

## 目的

Day3にチュートリアル区間を締めるイベント。
仕入れ、営業、結果確認、照覧の魔法を一通り学んだことを確認し、Day4以降の自由経営へつなぐ。

## 基本情報

| 項目 | 内容 |
|---|---|
| eventId | tutorial_d03_complete |
| category | tutorial |
| day | 3 |
| triggerCondition | tutorial_shouran_done = true |
| relatedCharacters | protagonist, shion |
| resultFlags | tutorial_complete = true |
| unlocks | free management / main_d05_rosa_intro / rom_shion_ch01 |
| estimatedReadTime | 1〜2分 |

## このイベントで伝えること

- 基本操作を習得した。
- Day4以降はプレイヤー判断で経営する。
- 困った時はシオンが助言する。
- 特別な来客や新しい出会いが始まることを予告する。

## トーン

一段落した安心感。
同時に「ここからが本番」という期待感を出す。

## イベント本文

### event: tut_complete_001

- type: narration
- text:

三日目の営業を終える頃には、私は少しだけ店の動きに慣れてきていた。

仕入れ帳を開き、昨日の結果と今日の売れ行きを比べる。
まだ迷うことばかりだけど、何を見ればいいのかは分かり始めていた。

- nextEventId: tut_complete_002

### event: tut_complete_002

- type: dialogue
- speaker: protagonist
- emotion: normal
- text:

珈琲は少し多めでもよさそう。
クッキーは日によって変わるかな……。

- nextEventId: tut_complete_003

### event: tut_complete_003

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: happy
- text:

いい顔になってきたな。

- nextEventId: tut_complete_004

### event: tut_complete_004

- type: dialogue
- speaker: protagonist
- emotion: surprised
- text:

え？ そうですか？

- nextEventId: tut_complete_005

### event: tut_complete_005

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: normal
- text:

初日は、何かを壊しそうな顔をしていた。
今は、次に何を試すか考えている顔だ。

- nextEventId: tut_complete_006

### event: tut_complete_006

- type: dialogue
- speaker: protagonist
- emotion: happy
- text:

それ、褒めてます？

- nextEventId: tut_complete_007

### event: tut_complete_007

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: happy
- text:

もちろんだ。

- nextEventId: tut_complete_008

### event: tut_complete_008

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: normal
- text:

これで、基本は一通り覚えた。
仕入れ、営業、結果の確認、そして照覧の魔法。

明日からは、お前自身の判断で店を動かしていくことになる。

- nextEventId: tut_complete_009

### event: tut_complete_009

- type: dialogue
- speaker: protagonist
- emotion: normal
- text:

私の判断で……。

- nextEventId: tut_complete_010

### event: tut_complete_010

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: normal
- text:

失敗もするだろう。
仕入れを外す日も、思うように客が来ない日もある。

だが、結果を見て考え直せばいい。
店はそうやって育つ。

- nextEventId: tut_complete_011

### event: tut_complete_011

- type: dialogue
- speaker: protagonist
- emotion: normal
- text:

はい。
すぐに立派な店主にはなれないけど、少しずつ続けます。

- nextEventId: tut_complete_012

### event: tut_complete_012

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: normal
- text:

それでいい。
それから……この森は、噂が広まるのが早い。

ハナコの孫が店を開けたと知れば、これから色々な者が訪ねてくるだろう。

- nextEventId: tut_complete_013

### event: tut_complete_013

- type: dialogue
- speaker: protagonist
- emotion: surprised
- text:

色々な者……。

- nextEventId: tut_complete_014

### event: tut_complete_014

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: happy
- text:

怖がるな。
出会いは、店を変える。
店もまた、出会った者を変える。

- nextEventId: tut_complete_015

### event: tut_complete_015

- type: narration
- text:

窓の外で、森の風が小さく鳴った。

明日からは、祖母の店ではなく、私が開ける喫茶フェアリーテイルになる。
その実感が、少しずつ胸に満ちていく。

- nextEventId: tut_complete_016

### event: tut_complete_016

- type: dialogue
- speaker: protagonist
- emotion: happy
- text:

よし。
明日も、開店します。

- nextEventId: tut_complete_017

### event: tut_complete_017

- type: effect
- text:

【チュートリアル完了】
基本的な経営の流れを覚えました。

これからは、仕入れ・営業・結果確認を繰り返しながら、店の評判と幻装レベルを育てていきましょう。

- effects:
  - flag.tutorial_complete = true
- nextEventId: null

## 実装メモ

- Day4以降、通常経営を解放する。
- チュートリアル完了後は、経営状況によって危機イベントや来客イベントが発生する。
- Day5にローザ初登場を予定。
- シオン第1章はDay7以降のメイン/恋愛導入として扱う。
