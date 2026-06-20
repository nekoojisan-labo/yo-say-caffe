# main_d24_guild_preparation

## 基本情報

| 項目 | 内容 |
|---|---|
| eventId | main_d24_guild_preparation |
| title | 商人組合へ向かう前に |
| category | main / investigation |
| day | 24 |
| triggerCondition | `evidence_gathering_started === true` and `alternative_supplier_unlocked === true` |
| relatedCharacters | protagonist, lucia, rosa, shion |
| purpose | 商人組合での対決準備を整え、各キャラの役割を確定する |

## 役割

集めた証拠を整理し、商人組合に持ち込む準備をする。
この段階ではまだ対決しない。各キャラが何を担うかを明確にし、主人公が中心に立つ構図を作る。

## イベント本文

### 1. 証拠の山

**narration**

カウンターの上には、紙の束がいくつも並んでいた。

発注記録。
配達停止の控え。
掲示板に書かれた噂の写し。
常連客の証言。
モモじいの取引記録。

それらを見て、ローザが低く唸った。

**rosa**

「思ったより、きっちり残ってるじゃない」

**protagonist**

「ルシアさんに書き方を教えてもらったので」

**lucia**

「僕は少し助言しただけだ。集めたのは君だよ」

**shion**

「そして、この店に関わる者たちだ」

### 2. 商人組合の仕組み

**lucia**

「商人組合に持ち込むなら、要点を三つに絞るべきだ」

**protagonist**

「三つ？」

**lucia**

「一つ、発注妨害。二つ、虚偽の噂。三つ、取引先への圧力」

**rosa**

「そこに被害者の証言が乗れば、あいつも逃げにくいわね」

**shion**

「だが、ゼフィロス側も言い逃れを用意しているだろう」

**lucia**

「だから、明日は感情で押さない。順番に示す」

### 3. 主人公の不安

**protagonist**

「私が話すんですよね」

**rosa**

「もちろん。あんたの店の話なんだから」

**protagonist**

「……失敗したら？」

**shion**

「失敗しても、店が終わるわけではない」

**lucia**

「でも、怖いよね」

**protagonist**

「はい。怖いです」

**lucia**

「怖いまま立てるなら、それは勇気だ」

### 4. 選択肢

**choice**

商人組合に出す主張の中心を決めよう。

1. `発注妨害を中心にする`
   - next: `guild_prep_orders`
   - effects: `flag.guild_focus_orders = true`

2. `虚偽の噂を中心にする`
   - next: `guild_prep_rumor`
   - effects: `flag.guild_focus_rumor = true`

3. `取引先への圧力を中心にする`
   - next: `guild_prep_pressure`
   - effects: `flag.guild_focus_pressure = true`

### 5-A. 発注妨害

**protagonist**

「まず発注妨害を中心にします。記録が一番はっきり残っているから」

**lucia**

「いい判断だ。数字と日付は強い」

### 5-B. 虚偽の噂

**protagonist**

「噂の被害を中心にしたいです。お客さんの信頼に関わるから」

**shion**

「店の名を守る戦いだな」

### 5-C. 取引先への圧力

**protagonist**

「取引先への圧力を中心にします。私だけじゃなく、周りの人まで巻き込んでいるから」

**rosa**

「いいわね。あたしもその線で証言する」

### 6. 役割分担

**lucia**

「僕は商人組合の進行を見て、必要なら制度面を補足する」

**shion**

「私は森の精霊が拾った情報を、証言として使える形に整える」

**rosa**

「あたしは被害者連中を連れてくる。あいつに泣かされた店、ひとつやふたつじゃないからね」

**protagonist**

「私は……この店の店主として話します」

**lucia**

「それが一番大切だ」

### 7. 終了

**narration**

証拠の束を紐でまとめた。
重い。
紙なのに、ずっしりと重い。

でも、それは不安の重さだけではなかった。
この数週間、自分が店を守ろうとしてきた重さでもあった。

**protagonist**

「明日、行きます」

**rosa**

「胸張って行きな」

**shion**

「我々も共にいる」

**lucia**

「君の言葉で、この店を守ろう」

**effect**

```json
{
  "flag": { "key": "guild_preparation_complete", "value": true }
}
```

## 実装メモ

- Day28商人組合対決の前提。
- 選択肢は対決時の主張順や台詞差分に使える。
- このイベント後、Day25でゼフィロスが先回りして誘惑・脅しを行う。
