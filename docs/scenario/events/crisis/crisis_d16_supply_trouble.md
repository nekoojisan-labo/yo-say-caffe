# crisis_d16_supply_trouble

## 基本情報

| 項目 | 内容 |
|---|---|
| eventId | crisis_d16_supply_trouble |
| title | 届かない材料 |
| category | crisis / management |
| day | 16 |
| triggerCondition | `sabotage_started === true` |
| relatedCharacters | protagonist, shion, rosa |
| purpose | 経営シミュレーション上の危機をプレイヤーに体感させる |

## 役割

Day15で妨害が始まった後、実際に営業へ影響が出るイベント。
プレイヤーに「いつもの営業ができない」状況を見せ、経営判断・代替案・仲間の助けへつなぐ。

このイベントは、単なる説明ではなく、メニュー欠品・客の反応・主人公の焦りを通して危機を体感させる。

## イベント本文

### 1. 仕入れ画面前

**narration**

翌朝。
仕入れ台帳を開いた瞬間、胸の奥が冷たくなった。

昨日に続いて、牛乳が届いていない。
それだけではない。
小麦粉も、蜂蜜も、いつもの半分しか届いていなかった。

**protagonist**

「これじゃ、クッキーもケーキも数が出せない……」

**shion**

「昨日より悪いな」

**protagonist**

「営業、できるかな」

**shion**

「できる形を探すしかない」

### 2. 営業中の欠品

**narration**

開店してすぐ、常連のリス獣人がカウンターにやってきた。

**customer_squirrel**

「今日は蜂蜜クッキーある？ あれ、好きなんだ」

**protagonist**

「ごめんなさい。今日は材料が少なくて、数を減らしていて……」

**customer_squirrel**

「そっか……残念。でも、また来るよ」

**narration**

笑ってくれたのに、胸が痛い。
一人ひとりのお客さんをがっかりさせるたび、店の灯りが少しずつ弱くなるような気がした。

### 3. シオンの助言

**shion**

「今ある材料で出せるものを絞れ」

**protagonist**

「メニューを減らすってこと？」

**shion**

「そうだ。全部を守ろうとすれば、全部が薄くなる」

**protagonist**

「……できるものを、ちゃんと出す」

**shion**

「それが店を守る判断だ」

### 4. 選択肢

**choice**

今日の営業方針を決めよう。

1. `提供メニューを絞って品質を守る`
   - next: `supply_d16_quality`
   - effects: `reputation +3`, `money -500`, `flag.quality_over_quantity = true`

2. `少しずつでも全メニューを出す`
   - next: `supply_d16_all_menu`
   - effects: `money +500`, `reputation -3`, `flag.tried_all_menu = true`

3. `今日は短縮営業にする`
   - next: `supply_d16_short_open`
   - effects: `money -1000`, `reputation +1`, `flag.short_opened = true`

### 5-A. 品質を守る

**protagonist**

「今日は、出せるものだけにします。その代わり、ちゃんと美味しいものを出したい」

**shion**

「いい。店の信用は、数よりも積み重ねだ」

**narration**

黒板メニューを書き直す。
少ない材料でも、できることはある。

### 5-B. 全メニューを出す

**protagonist**

「少しずつでも、全部出します。せっかく来てくれた人に、選んでもらいたいから」

**shion**

「気持ちは分かる。だが、無理は味に出るぞ」

**narration**

何とか数を揃えた。
けれど、いつものような余裕はない。

### 5-C. 短縮営業

**protagonist**

「今日は短縮営業にします。無理に開けて、もっと迷惑をかけたくない」

**shion**

「勇気のいる判断だ。だが、休むことも守ることの一つだ」

**narration**

入口に、短縮営業のお知らせを貼った。
悔しいけれど、今は店を折らないことが大切だ。

### 6. ローザからの手紙

**narration**

営業が落ち着いた頃、扉の下から一枚の紙が差し込まれた。

**protagonist**

「手紙……？」

**narration**

紙には、力強い文字でこう書かれていた。

**rosa_letter**

『明日の朝、裏口に来な。あたしの知り合いを紹介する。仕入れの道は一つじゃないわ。ローザ』

**protagonist**

「ローザさん……」

**shion**

「動きが早いな」

**protagonist**

「うん。私も、できることをしなきゃ」

**effect**

```json
{
  "flag": { "key": "supply_trouble_seen", "value": true },
  "flag2": { "key": "rosa_rescue_available", "value": true }
}
```

## 実装メモ

- このイベントは経営画面と強く接続する。
- 実装時は、当日限定で一部メニューの販売可能数を減らすなどの処理と連動できる。
- ただし初期プロトタイプでは、文章イベント＋軽い reputation/money 変動だけでも成立する。
