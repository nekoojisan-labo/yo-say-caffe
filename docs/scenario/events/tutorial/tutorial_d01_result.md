# tutorial_d01_result

## 目的

Day1営業終了後の結果確認イベント。
売上、原価、利益、評判、翌日の改善という経営サイクルを説明する。

## 基本情報

| 項目 | 内容 |
|---|---|
| eventId | tutorial_d01_result |
| category | tutorial |
| day | 1 |
| triggerCondition | tutorial_open_done = true |
| relatedCharacters | protagonist, shion |
| resultFlags | tutorial_day1_complete = true |
| unlocks | Day2 / tutorial_d02_shouran |
| estimatedReadTime | 1〜2分 |

## このイベントで伝えること

- 営業後は結果を確認する。
- 売上から仕入れ・経費を引いたものが利益。
- 初日は大成功でなくてよい。
- 結果を見て、明日の仕入れや方針を調整する。

## トーン

初営業後の疲れと小さな達成感。
大成功ではなく、「ここから育てる」感じにする。

## イベント本文

### event: tut_result_001

- type: narration
- text:

夕方を過ぎ、最後のお客様が店を出ていった。

カップを片付け、カウンターを拭き終えるころには、足が少し重くなっていた。
けれど、不思議と嫌な疲れではなかった。

- nextEventId: tut_result_002

### event: tut_result_002

- type: dialogue
- speaker: protagonist
- emotion: happy
- text:

初日……終わった……。

- nextEventId: tut_result_003

### event: tut_result_003

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: happy
- text:

よくやった。
初日にしては落ち着いていた。

- nextEventId: tut_result_004

### event: tut_result_004

- type: dialogue
- speaker: protagonist
- emotion: normal
- text:

でも、途中でクッキーが足りなくなりそうで焦りました。
珈琲も、思ったより出ましたね。

- nextEventId: tut_result_005

### event: tut_result_005

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: normal
- text:

それが今日の学びだ。
営業が終わったら、必ず結果を見る。

売上、仕入れにかかった費用、残った材料、そして評判。
それらが、明日の判断材料になる。

- nextEventId: tut_result_006

### event: tut_result_006

- type: dialogue
- speaker: protagonist
- emotion: surprised
- text:

売れたらそれで終わり、じゃないんですね。

- nextEventId: tut_result_007

### event: tut_result_007

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: normal
- text:

売上だけを見れば、判断を誤る。

たくさん売れても、仕入れすぎていれば利益は残らない。
少ししか売れなくても、無駄が少なければ次につながる。

- nextEventId: tut_result_008

### event: tut_result_008

- type: dialogue
- speaker: protagonist
- emotion: normal
- text:

今日の結果を見て、明日の仕入れを考える……。

- nextEventId: tut_result_009

### event: tut_result_009

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: happy
- text:

そうだ。
店は一日で完成しない。
昨日より少し良くする。それを積み重ねる。

- nextEventId: tut_result_010

### event: tut_result_010

- type: narration
- text:

祖母の仕入れ帳の隣に、私は今日の結果を書き込んだ。

字はまだ少し震えている。
けれど、その一行は確かに、私の最初の営業記録だった。

- nextEventId: tut_result_011

### event: tut_result_011

- type: dialogue
- speaker: protagonist
- emotion: happy
- text:

明日は、今日より少しうまくやってみます。

- nextEventId: tut_result_012

### event: tut_result_012

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: happy
- text:

その調子だ。
明日は、もう一つ大事なことを教えよう。

- nextEventId: tut_result_013

### event: tut_result_013

- type: effect
- text:

【チュートリアル】
結果画面で、今日の売上・利益・来客数・評判を確認しましょう。

結果を見て、明日の仕入れや経営方針を調整することが大切です。

- effects:
  - flag.tutorial_day1_complete = true
- nextEventId: null

## 実装メモ

- 結果画面表示後にこのイベントを出すか、このイベント後に結果画面へ誘導するかはUI実装時に決める。
- Day1は失敗しても詰まない設計にする。
- チュートリアル中は、赤字でもシオンがフォローする。
