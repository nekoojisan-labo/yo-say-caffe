# main_d29_cafe_recovery

## 基本情報

| 項目 | 内容 |
|---|---|
| eventId | main_d29_cafe_recovery |
| title | もう一度、店を開ける朝 |
| category | main / recovery |
| day | 29 |
| triggerCondition | `guild_confrontation_won === true` |
| relatedCharacters | protagonist, rosa, shion, lucia, customers |
| purpose | 危機後の余韻と、カフェが再び日常へ戻る手応えを描く |

## 役割

商人組合での対決後、すぐに完全復活するのではなく、傷ついた店をもう一度開けるイベント。
メイン危機の勝利を、経営シミュレーションらしく「営業再開」「常連の来店」「メニュー復活」で体感させる。

## イベント本文

### 1. 翌朝

**narration**

商人組合での審議から一夜明けた。

朝の森は、いつもと同じように静かだった。
けれど、店の扉に手をかけた時、胸の奥で何かが少しだけ軽くなっているのを感じた。

**protagonist**

「……開けよう」

**narration**

鍵を回す音が、いつもよりはっきり響いた。

### 2. 店内の準備

**narration**

カウンターを拭き、椅子を整え、黒板メニューを書き直す。

今日は、蜂蜜クッキーを出せる。
ミルクティーも出せる。
まだ数は多くないけれど、昨日までよりずっと多い。

**shion**

「仕入れは戻り始めているようだな」

**protagonist**

「モモじいさんが、朝一番で届けてくれました」

**shion**

「信用は、一度つながると強い」

### 3. ローザの花

**narration**

開店前、ローザが大きな花束を抱えて入ってきた。

**rosa**

「景気づけよ！」

**protagonist**

「すごい量……！」

**rosa**

「昨日あんた、ちゃんと立ったでしょ。今日は店も胸張って立たせなきゃ」

**narration**

ローザの花を窓辺に飾る。
店内が、一気に明るくなった。

### 4. ルシアの来店

**lucia**

「今日は、昨日よりいい香りがする」

**protagonist**

「ルシアさん。来てくれたんですね」

**lucia**

「当然だろう。店がもう一度開く朝を見逃すわけにはいかない」

**rosa**

「王子様って、意外と律儀なのね」

**lucia**

「意外と、は余計かな」

### 5. 常連たち

**narration**

開店のベルを鳴らすと、最初に入ってきたのは小鳥妖精だった。
続いて、リス獣人。
それから、見覚えのある常連たちが少しずつ席を埋めていく。

**customer_bird_fairy**

「今日は、蜂蜜クッキーある？」

**protagonist**

「あります。数は少ないけど、ちゃんと焼きました」

**customer_squirrel**

「やった。じゃあ一つ。いや、二つ！」

**protagonist**

「二つですね」

**narration**

笑い声が店に戻ってくる。
それだけで、泣きそうになる。

### 6. 選択肢

**choice**

営業再開の日。今日の一杯を誰に出そう？

1. `最初の常連に出す`
   - next: `recovery_customer`
   - effects: `reputation +5`, `flag.recovery_customer_first = true`

2. `ローザに出す`
   - next: `recovery_rosa`
   - effects: `flag.recovery_rosa_first = true`

3. `シオンに出す`
   - next: `recovery_shion`
   - effects: `affection.shion +10`, `flag.recovery_shion_first = true`

4. `ルシアに出す`
   - next: `recovery_lucia`
   - effects: `affection.lucia +10`, `flag.recovery_lucia_first = true`

### 7-A. 常連へ

**protagonist**

「お待たせしました。今日の最初の蜂蜜クッキーです」

**customer_bird_fairy**

「わあ……やっぱり、この味だ」

**narration**

その一言で、昨日までの不安が少し溶けた。

### 7-B. ローザへ

**protagonist**

「ローザさん、最初の一杯です」

**rosa**

「あら、いいの？」

**protagonist**

「たくさん助けてもらったので」

**rosa**

「泣かせるじゃない。……でも、味見は厳しくいくわよ」

### 7-C. シオンへ

**protagonist**

「シオン。最初の一杯、飲んでくれますか」

**shion**

「私でいいのか」

**protagonist**

「はい。ずっと見守ってくれたから」

**shion**

「……なら、いただこう」

### 7-D. ルシアへ

**protagonist**

「ルシアさん。最初の一杯です」

**lucia**

「光栄だね」

**protagonist**

「助言、ありがとうございました。帳面がなければ、昨日は立てませんでした」

**lucia**

「立ったのは君だよ」

### 8. 復興の実感

**narration**

昼を過ぎる頃には、店内にいつもの音が戻っていた。
カップが触れる音。
椅子を引く音。
誰かが笑う声。

売上は、まだ元通りではない。
評判も、完全には戻っていない。

でも、今日この店は開いている。
それだけで、確かな勝利だった。

### 9. 終了

**protagonist**

「明日で、開店して三十日目ですね」

**rosa**

「もうそんなになるのね」

**lucia**

「最初の節目だ」

**shion**

「そして、次の始まりでもある」

**narration**

夕暮れの光が、窓辺の花を照らしている。
明日、この店は一つの答えを迎える。

**effect**

```json
{
  "reputation": 10,
  "flag": { "key": "cafe_recovery_seen", "value": true }
}
```

## 実装メモ

- Day30のエンディング分岐直前イベント。
- 選択肢は恋愛エンド優先度の補助条件に使える。
- 完全復活ではなく、継続できる希望を描く。
