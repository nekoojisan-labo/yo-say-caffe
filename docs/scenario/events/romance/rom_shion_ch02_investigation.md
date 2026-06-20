# rom_shion_ch02_investigation

## 基本情報

| 項目 | 内容 |
|---|---|
| eventId | rom_shion_ch02_investigation |
| title | 森が聞いた声 |
| category | romance / investigation / main-support |
| day | 20 |
| triggerCondition | `shion_ch01_complete === true` and `sabotage_started === true` |
| relatedCharacters | protagonist, shion |
| purpose | シオン恋愛ルートを危機本筋へ接続し、彼の守護者としての力と孤独を見せる |

## 役割

シオンが森の精霊を使ってゼフィロス周辺の情報を集める。
ただし、単に便利な調査役にせず、長く森を守ってきた存在としての疲れや、主人公への距離の近づきを描く。

## イベント本文

### 1. 閉店後の静けさ

**narration**

閉店後。
店内の灯りを落とすと、窓の外の森がいつもより近く感じられた。

ここ数日の騒ぎで、心も体も落ち着かない。
それでも、カウンターを拭く手だけは止めたくなかった。

**protagonist**

「今日も、何とか終わった……」

**shion**

「無理をしているな」

**protagonist**

「してます。でも、何もしない方が怖いんです」

**shion**

「……ハナコも、そう言っていた」

### 2. 森の精霊の報告

**narration**

シオンが静かに指を鳴らす。
すると、窓の隙間から小さな光がいくつも入り込んできた。
蛍のようで、声のようで、風のようでもある。

**protagonist**

「これ……精霊？」

**shion**

「ああ。森に残った声を拾ってきた」

**spirit_voice**

『金の羽』『契約書』『商人組合』『逆らう店には荷を回すな』

**protagonist**

「今の……」

**shion**

「ゼフィロスの名は直接出ていない。だが、手下か協力者が動いているのは間違いない」

### 3. シオンの苦さ

**protagonist**

「すごいですね。森の声が聞けるなんて」

**shion**

「すごいものではない」

**protagonist**

「え？」

**shion**

「聞こえるというのは、聞きたくないものまで届くということだ」

**narration**

シオンの表情が、ほんの少し曇る。
長い時間を生きてきた人の顔だった。

**shion**

「喜びも、怒りも、嘘も、後悔も。森は全部覚えている」

**protagonist**

「シオンは、それをずっと聞いてきたんですか」

**shion**

「千年もいれば、嫌でもな」

### 4. 選択肢

**choice**

シオンに何と声をかけよう？

1. `一人で抱えなくていいと言う`
   - next: `shion_ch02_support`
   - effects: `affection.shion +15`, `flag.shion_supported = true`

2. `調査を続けてほしいと頼む`
   - next: `shion_ch02_request`
   - effects: `affection.shion +5`, `flag.shion_investigation_continues = true`

3. `少し休んでほしいと言う`
   - next: `shion_ch02_rest`
   - effects: `affection.shion +10`, `flag.shion_rest_suggested = true`

### 5-A. 一人で抱えなくていい

**protagonist**

「シオン。一人で抱えなくていいです」

**shion**

「……私は守護者だ」

**protagonist**

「でも、今はこの店の仲間でもあります」

**shion**

「仲間、か」

**narration**

シオンはその言葉を、初めて聞いたもののように繰り返した。

### 5-B. 調査を頼む

**protagonist**

「もう少し調べてもらえますか。証拠が必要だと思うんです」

**shion**

「分かっている。感情だけで動けば、相手の思う壺だ」

**protagonist**

「お願いします。私も、店の記録を確認します」

### 5-C. 休んでほしい

**protagonist**

「シオンも、少し休んでください」

**shion**

「私は疲れない」

**protagonist**

「体じゃなくて、心の話です」

**shion**

「……妙なことを言う」

**narration**

そう言いながらも、シオンの声は少しだけ柔らかかった。

### 6. 祖母の記憶

**shion**

「ハナコも昔、同じようなことを言った」

**protagonist**

「祖母が？」

**shion**

「ああ。『森を守るなら、たまには森に甘えなさい』とな」

**protagonist**

「おばあちゃんらしいです」

**shion**

「……お前も、少し似ている」

**narration**

シオンは窓の外へ視線を向けた。
けれど、その横顔はもう、遠い誰かだけを見ているようには見えなかった。

### 7. 終了

**shion**

「証拠を集める。ゼフィロスの尻尾を掴むには、もう少し時間がいる」

**protagonist**

「私も、店を守りながら待ちます」

**shion**

「無茶はするな。お前が倒れれば、この店の灯りも消える」

**protagonist**

「……はい」

**effect**

```json
{
  "flag": { "key": "shion_investigation_started", "value": true },
  "flag2": { "key": "shion_ch02_complete", "value": true }
}
```

## 実装メモ

- シオン好感度100相当のイベントとしても利用可能。
- メイン危機と恋愛イベントを分離しすぎないこと。
- シオンは万能解決役にしない。証拠集めには時間がかかる設計にする。
