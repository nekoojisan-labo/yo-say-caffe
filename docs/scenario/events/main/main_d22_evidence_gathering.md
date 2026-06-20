# main_d22_evidence_gathering

## 基本情報

| 項目 | 内容 |
|---|---|
| eventId | main_d22_evidence_gathering |
| title | 帳面に残る真実 |
| category | main / investigation / management |
| day | 22 |
| triggerCondition | `evidence_log_started === true` |
| relatedCharacters | protagonist, shion, lucia, rosa |
| purpose | 経営記録を武器に変え、終盤の告発へつなげる |

## 役割

ルシアの助言を受け、主人公が店の帳面・発注控え・掲示板の噂・客の証言を集め始めるイベント。
経営シミュレーションらしく、日々の記録がストーリー上の武器になることを示す。

## イベント本文

### 1. 帳面を開く

**narration**

閉店後。
カウンターの上に、帳面を広げた。

売上、仕入れ、欠品、キャンセルされた注文。
いつもなら数字として見ていたものが、今日は違って見える。

これは、店が苦しんだ記録だ。
そして、店が折れなかった記録でもある。

**protagonist**

「届かなかった牛乳、キャンセル扱いにされた小麦粉、掲示板の噂……全部、日付を入れて残しておこう」

**shion**

「感情は流れる。記録は残る」

**protagonist**

「ルシアさんの言っていた通りですね」

### 2. 証言集め

**narration**

翌朝から、常連客にも少しずつ話を聞いた。

無理に証言を求めるのではなく、覚えていることを教えてもらう。
誰が、いつ、どんな噂を聞いたのか。
どの業者から、どんな言葉をかけられたのか。

**customer_bird_fairy**

「掲示板で見たのは、三日前の朝だったよ」

**customer_squirrel**

「材料が悪いって言ってたの、見たことない妖精だった」

**momoji**

「わしの方にも、妙な使いが来たぞ。この店と取引するな、とな」

**protagonist**

「ありがとうございます。全部、書き残しておきます」

### 3. ローザの証言

**rosa**

「あたしも書くわ」

**protagonist**

「ローザさんも？」

**rosa**

「あいつに店を潰された連中、何人か知ってるの。連絡を取ってみる」

**protagonist**

「危なくないですか？」

**rosa**

「危ないから、あたしが行くのよ」

**shion**

「無茶はするな」

**rosa**

「それ、あんたにだけは言われたくないわね」

### 4. 選択肢

**choice**

証拠集めで、まずどこを重点的に調べよう？

1. `発注記録を整理する`
   - next: `evidence_d22_orders`
   - effects: `flag.order_records整理 = true`, `reputation +1`

2. `客の証言を集める`
   - next: `evidence_d22_customers`
   - effects: `flag.customer_testimonies = true`, `affection.shion +5`

3. `業者への圧力を調べる`
   - next: `evidence_d22_suppliers`
   - effects: `flag.supplier_pressure_records = true`, `affection.lucia +5`

### 5-A. 発注記録

**protagonist**

「まず、数字で分かるところから固めます。発注日と配達状況を全部まとめます」

**shion**

「堅実だ。相手が否定しても、帳面は嘘をつかない」

### 5-B. 客の証言

**protagonist**

「お客さんが聞いた噂を集めます。迷惑をかけないように、短く」

**shion**

「人の声は弱い。だが、集まれば森のざわめきになる」

### 5-C. 業者への圧力

**protagonist**

「取引先への圧力を調べたいです。そこが一番、直接的な妨害だと思うから」

**shion**

「なら、慎重に動け。業者も脅されている可能性がある」

### 6. ルシアからの助言

**narration**

夕方、ルシアが短い手紙を届けてくれた。

**lucia_letter**

『記録は、日付・相手・内容・被害を分けて書くといい。感情は別欄に。証拠と訴えを混ぜないこと。ルシア』

**protagonist**

「すごい……分かりやすい」

**rosa**

「王子って、こういうところはちゃんとしてるのね」

**shion**

「余計な装飾がない。実務向きだ」

### 7. 終了

**narration**

帳面の最後に、新しいページを作った。

『ゼフィロス関連記録』

その文字を書く手は、少し震えていた。
けれど、もう逃げるための震えではない。
戦う準備を始めるための震えだった。

**protagonist**

「この店が何をされたのか、ちゃんと残します」

**effect**

```json
{
  "flag": { "key": "evidence_gathering_started", "value": true },
  "flag2": { "key": "evidence_log_updated", "value": true }
}
```

## 実装メモ

- `evidence_gathering_started` はDay24以降の告発準備条件に使う。
- 選択肢ごとの証拠タイプは、終盤対決で台詞差分に使える。
- 実装時、flag名に日本語を使わない場合は `order_records_checked` へ置き換える。
