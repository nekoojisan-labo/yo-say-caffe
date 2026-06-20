# main_d18_rosa_supply_rescue

## 基本情報

| 項目 | 内容 |
|---|---|
| eventId | main_d18_rosa_supply_rescue |
| title | 花屋の裏ルート |
| category | main / rescue / management |
| day | 18 |
| triggerCondition | `rosa_rescue_available === true` |
| relatedCharacters | protagonist, rosa, shion |
| purpose | ローザを救済キャラとして機能させ、危機への対抗手段を得る |

## 役割

ゼフィロスの妨害で止まった仕入れに対し、ローザが元冒険者時代の人脈を使って代替ルートを紹介する。
主人公が「助けてもらうだけ」ではなく、自分で信頼を取りに行くイベントにする。

## イベント本文

### 1. 花屋の裏口

**narration**

翌朝。
ローザに言われた通り、カフェの裏口ではなく、隣の花屋の裏口へ向かった。

表の店先は、いつも通り華やかな花でいっぱいだ。
けれど裏手には、木箱や麻袋、使い込まれた荷車が並んでいる。
花屋というより、小さな補給基地みたいだった。

**rosa**

「来たわね」

**protagonist**

「ローザさん。昨日の手紙、ありがとうございます」

**rosa**

「お礼はまだ早いわよ。これからが本番なんだから」

### 2. 代替仕入れルート

**narration**

ローザが腕を組むと、その背後から、背の低いヤギ獣人の商人が顔を出した。
背中には大きな木箱を背負っている。

**rosa**

「紹介するわ。山向こうの牧場から来てる、ミルク屋のモモじいよ」

**momoji**

「ふぉっふぉ。ローザの姐さんに頼まれちゃ断れんでな」

**protagonist**

「初めまして。喫茶フェアリーテイルの店主です」

**momoji**

「礼儀のいい子じゃ。ハナコさんの孫なら、まあ信用できる」

**protagonist**

「祖母を知っているんですか？」

**momoji**

「もちろんじゃ。あの人の珈琲には、何度も助けられた」

### 3. 信用の条件

**momoji**

「だがの。取引は情だけでは続かん」

**protagonist**

「はい」

**momoji**

「毎朝、必要な数を正直に伝えること。無理な注文をしないこと。支払いを遅らせないこと」

**protagonist**

「守ります」

**rosa**

「それと、変な見栄張らないこと。足りない時は足りないって言いなさい」

**protagonist**

「……はい。昨日、それを少し学びました」

### 4. 選択肢

**choice**

モモじいとの初回取引。どうお願いしよう？

1. `必要最低限だけ注文する`
   - next: `rosa_rescue_careful`
   - effects: `money -800`, `reputation +2`, `flag.careful_supplier_order = true`

2. `少し多めに注文して備える`
   - next: `rosa_rescue_stock`
   - effects: `money -1500`, `flag.extra_stock_order = true`

3. `今後の相談先になってほしいと頼む`
   - next: `rosa_rescue_relation`
   - effects: `reputation +1`, `flag.supplier_relationship_started = true`

### 5-A. 必要最低限

**protagonist**

「まずは、今日必要な分だけお願いします。無理をして続かなくなるのが怖いので」

**momoji**

「ほう。若いのに堅実じゃな」

**rosa**

「いいじゃない。商売は見栄より継続よ」

### 5-B. 少し多め

**protagonist**

「明日以降も不安なので、少しだけ多めにお願いできますか？」

**momoji**

「備えるのは悪くない。ただし、使い切れる分だけじゃぞ」

**shion**

「保管の管理も必要になるな」

### 5-C. 相談先

**protagonist**

「注文だけじゃなくて、仕入れの相談もさせてもらえませんか。まだ分からないことが多くて」

**momoji**

「分からんと言える者は伸びる。よかろう、少しなら見てやる」

**rosa**

「ほらね。素直は武器になるのよ」

### 6. ローザの本音

**narration**

モモじいが荷車を置いて去った後、ローザは大きな背中で空を見上げた。

**rosa**

「ハナコばあちゃんにも、同じことがあったのよ」

**protagonist**

「祖母にも？」

**rosa**

「店が大きくなり始めた頃、変な連中に目をつけられた。でも、あの人は折れなかった」

**protagonist**

「……祖母は、どうやって乗り越えたんですか」

**rosa**

「一人で抱えなかったのよ」

**protagonist**

「一人で……」

**rosa**

「助けを借りて、借りた分をちゃんと返して、そうやって店の信用を育てたの」

### 7. 終了

**protagonist**

「私も、そうします。ちゃんと続けられる店にしたい」

**rosa**

「その意気よ。あんたはもう、ただ守られるだけの子じゃないわ」

**shion**

「今日の判断は、店主としての一歩だ」

**effect**

```json
{
  "reputation": 5,
  "flag": { "key": "alternative_supplier_unlocked", "value": true },
  "flag2": { "key": "rosa_rescue_complete", "value": true }
}
```

## 実装メモ

- 後続の経営処理で、一定期間の仕入れペナルティ軽減に使える。
- モモじいはサブキャラとして再利用可能。
- ローザの救済は強すぎないように、完全解決ではなく「対抗手段の獲得」に留める。
