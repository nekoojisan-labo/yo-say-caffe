# tutorial_d01_procurement

## 目的

Day1の最初の操作説明イベント。
仕入れの意味を、シナリオ会話として自然に説明する。
プレイヤーに「経営判断をするゲーム」だと理解させる。

## 基本情報

| 項目 | 内容 |
|---|---|
| eventId | tutorial_d01_procurement |
| category | tutorial |
| day | 1 |
| triggerCondition | prologue_complete = true |
| relatedCharacters | protagonist, shion |
| resultFlags | tutorial_procurement_intro = true |
| unlocks | procurement screen / tutorial_d01_open |
| estimatedReadTime | 1〜2分 |

## このイベントで伝えること

- カフェ営業前に材料を仕入れる必要がある。
- 仕入れすぎると資金を圧迫し、売れ残りが出る。
- 仕入れ不足だと売るものがなくなり、評判が下がる。
- 最初は少なめに始めて、結果を見て調整する。

## トーン

説明は短く、シオンが実務的に教える。
主人公は不安だが、プレイヤーと同じ視点で疑問を持つ。

## イベント本文

### event: tut_proc_001

- type: narration
- text:

カウンターの上に、古びた帳面が置かれていた。

表紙には祖母の字で「仕入れ帳」と書かれている。
ページをめくると、豆、茶葉、小麦粉、果物、砂糖……細かな記録がびっしり並んでいた。

- nextEventId: tut_proc_002

### event: tut_proc_002

- type: dialogue
- speaker: protagonist
- emotion: surprised
- text:

うわ……おばあちゃん、こんなに細かく管理してたんだ。

- nextEventId: tut_proc_003

### event: tut_proc_003

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: normal
- text:

店を続けるなら、まずは仕入れだ。
何を作るにも、材料がなければ始まらない。

- nextEventId: tut_proc_004

### event: tut_proc_004

- type: dialogue
- speaker: protagonist
- emotion: normal
- text:

たくさん仕入れておけば安心……ってわけじゃないんですよね？

- nextEventId: tut_proc_005

### event: tut_proc_005

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: happy
- text:

分かっているなら上出来だ。
仕入れすぎれば、資金が減る。
売れ残れば、材料は無駄になる。

- nextEventId: tut_proc_006

### event: tut_proc_006

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: normal
- text:

だが、少なすぎても困る。
お客様が来たのに出せるものがなければ、評判を落とすことになる。

- nextEventId: tut_proc_007

### event: tut_proc_007

- type: dialogue
- speaker: protagonist
- emotion: sad
- text:

最初から難しいですね……。

- nextEventId: tut_proc_008

### event: tut_proc_008

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: normal
- text:

だから最初は小さく始める。
売れ方を見て、次の日に調整すればいい。

商売は一度で当てるものではない。
続けながら、店の呼吸を覚えるものだ。

- nextEventId: tut_proc_009

### event: tut_proc_009

- type: dialogue
- speaker: protagonist
- emotion: normal
- text:

店の呼吸……。

- nextEventId: tut_proc_010

### event: tut_proc_010

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: normal
- text:

今日は初日だ。
定番の珈琲と、焼き菓子を少し用意すればいい。

おすすめは、珈琲を5杯分、クッキーを3皿分。
まずはそれで様子を見る。

- nextEventId: tut_proc_011

### event: tut_proc_011

- type: effect
- text:

【チュートリアル】
仕入れ画面で、今日の材料を発注しましょう。

最初のおすすめ：
- 珈琲：5
- クッキー：3

仕入れすぎると資金が減り、少なすぎると営業中に品切れします。

- effects:
  - flag.tutorial_procurement_intro = true
- nextEventId: null

## 実装メモ

- このイベントは操作説明用。終了後、仕入れ画面へ誘導する。
- 実際に仕入れが完了したら `tutorial_procurement_done = true` を立てる。
- 推奨数量はゲームバランス調整に合わせて後で変更可能。
- UI上の文言と本文の数字がズレないよう、将来的には定数化を検討する。
