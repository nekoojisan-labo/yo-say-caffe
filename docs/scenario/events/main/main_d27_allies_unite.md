# main_d27_allies_unite

## 基本情報

| 項目 | 内容 |
|---|---|
| eventId | main_d27_allies_unite |
| title | 小さな店の味方たち |
| category | main / pre-climax |
| day | 27 |
| triggerCondition | `final_offer_seen === true` and `guild_preparation_complete === true` |
| relatedCharacters | protagonist, rosa, shion, lucia, customers |
| purpose | クライマックス前に仲間・常連・取引先との絆を確認する |

## 役割

商人組合での対決直前、主人公が孤立していないことを示す。
ただし、全員が主人公を持ち上げるだけではなく、それぞれが自分の立場で店を支える構図にする。

## イベント本文

### 1. 対決前夜

**narration**

商人組合へ行く前日の夜。
店内には、いつもより多くの灯りがともっていた。

ローザが花を運び、シオンが証拠の束を整え、ルシアが書類の順番を確認している。

その光景を見ていると、ここが小さな作戦会議室のように思えた。

**protagonist**

「なんだか、すごいことになってきましたね」

**rosa**

「何言ってんの。あんたの店を守るんだから、これくらい当然よ」

**lucia**

「明日は、派手さより正確さが大事だ」

**shion**

「そして、折れないことだ」

### 2. 常連たちの支援

**narration**

扉のベルが鳴った。
もう閉店時間を過ぎている。

入ってきたのは、常連の小鳥妖精とリス獣人だった。

**customer_bird_fairy**

「あの、これ……私が見た掲示板の写し。役に立つかな」

**customer_squirrel**

「僕も証言するよ。蜂蜜クッキーが食べられなかった恨みは深いからね」

**protagonist**

「二人とも……」

**rosa**

「ほら見なさい。ちゃんと味方はいるのよ」

### 3. モモじいの荷札

**narration**

続いて、裏口からモモじいが顔を出した。

**momoji**

「明日は組合に行くんじゃろ。これを持っていきなさい」

**protagonist**

「これは？」

**momoji**

「わしの牧場に来た圧力の記録じゃ。荷札に、相手の使った印が残っとる」

**lucia**

「これは強い証拠になる」

**momoji**

「ハナコさんの店を、くだらん金貸しに潰されてたまるかい」

### 4. 選択肢

**choice**

集まってくれた人たちに、何を伝えよう？

1. `感謝を伝える`
   - next: `allies_thanks`
   - effects: `reputation +5`, `flag.allies_thanked = true`

2. `必ず店を守ると宣言する`
   - next: `allies_declare`
   - effects: `flag.owner_resolve_declared = true`

3. `怖いけれど頑張ると正直に言う`
   - next: `allies_honest`
   - effects: `affection.shion +5`, `affection.lucia +5`, `flag.honest_courage = true`

### 5-A. 感謝

**protagonist**

「皆さん、本当にありがとうございます。私一人だったら、ここまで来られませんでした」

**rosa**

「そういうのは勝ってからもう一回言いなさい」

**lucia**

「でも、今言うのも大切だ」

### 5-B. 宣言

**protagonist**

「明日、必ずこの店を守ります」

**shion**

「その言葉、森も聞いた」

**rosa**

「いい顔になったじゃない」

### 5-C. 正直に言う

**protagonist**

「正直、怖いです。でも、怖いまま行きます」

**lucia**

「それでいい。怖さを知らない勇気は、ただの無謀だ」

**shion**

「お前は、逃げずに立っている」

### 6. 仲間の役割確認

**lucia**

「明日、僕は後方から制度面を補足する。前に出すぎないようにするよ」

**shion**

「私は証言の矛盾を見つける。森の声と記録を照合する」

**rosa**

「あたしは被害者代表ってやつね。あいつが逃げようとしたら、花束で殴る」

**protagonist**

「花束で……」

**rosa**

「安心しなさい。トゲ抜きはしてあるわ」

**narration**

緊張していた空気が、少しだけゆるんだ。

### 7. 終了

**narration**

最後に、みんなで一杯ずつコーヒーを飲んだ。
豪華なメニューではない。
特別な魔法もない。

けれど、カップの湯気の向こうに、確かにこの店の未来が見えた気がした。

**protagonist**

「明日、行きましょう」

**all**

「ええ」

**effect**

```json
{
  "flag": { "key": "allies_united", "value": true }
}
```

## 実装メモ

- Day28商人組合対決の直前イベント。
- ギャグはローザで軽く入れるが、緊張感を壊しすぎない。
- 常連客とモモじいを再登場させ、店が社会的につながっていることを示す。
