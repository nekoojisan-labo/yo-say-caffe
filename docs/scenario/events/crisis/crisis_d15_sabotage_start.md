# crisis_d15_sabotage_start

## 基本情報

| 項目 | 内容 |
|---|---|
| eventId | crisis_d15_sabotage_start |
| title | 見えない手 |
| category | crisis |
| day | 15 |
| triggerCondition | `day >= 15` and `zephyros_offer_seen === true` and `rosa_warning_seen === true` |
| relatedCharacters | protagonist, shion, rosa, zephyros |
| purpose | ゼフィロスの脅威を「言葉」から「実害」へ進める |

## 役割

Day10のゼフィロス接近、Day12のローザ警告を受けて、初めて店に具体的な妨害が起きるイベント。
ただし、いきなり大事件にはせず、仕入れの遅延・小さな悪評・常連の不安という形で、経営シミュレーション側へ影響を出す。

## 発生前提

- 主人公はゼフィロスの申し出を受けた、断った、保留した、いずれの場合でも発生可能。
- ただし、断った場合は報復色を強める。
- 保留または興味ありの場合は、囲い込みの圧力として見せる。

## イベント本文

### 1. 開店前の違和感

**narration**

朝、いつもより少し早く店に着いた。
森の空気は変わらず澄んでいる。
けれど、店の前に置かれているはずの牛乳箱が、今日は空だった。

**protagonist**

「あれ……？ 今日の分、届いてない……？」

**narration**

昨日のうちに発注は済ませてある。
数も、届け先も、いつもと同じ。
間違えるような内容ではない。

**shion**

「妙だな。配達の妖精は、時間にうるさいことで知られている」

**protagonist**

「じゃあ、何かあったのかな」

### 2. 小さな悪評

**narration**

開店してしばらくすると、常連の小鳥妖精が、申し訳なさそうに声をかけてきた。

**customer_bird_fairy**

「あのね、店主さん。変な噂を聞いたの」

**protagonist**

「変な噂？」

**customer_bird_fairy**

「このカフェ、材料の管理がずさんだって。森の掲示板に書かれてたって……」

**protagonist**

「そんな……！」

**narration**

胸の奥が、きゅっと縮む。
仕入れも保管も、まだ完璧とは言えない。
それでも、食べ物を扱うことだけは、祖母の店を汚さないように気をつけてきた。

**shion**

「事実ではない。だが、噂は事実より早く広がる」

### 3. ゼフィロスの影

**narration**

その時、窓の外を金色の羽が横切った。
一瞬だけ、派手な帽子の縁が見えた気がした。

**protagonist**

「今の……」

**shion**

「ゼフィロスか」

**protagonist**

「やっぱり、あの人が？」

**shion**

「断定はできない。だが、偶然と呼ぶには出来すぎている」

### 4. 主人公の選択

**choice**

（どう動こう……）

1. `まず事実確認をする`
   - next: `crisis_d15_check`
   - effects: `reputation +2`, `flag.acted_carefully = true`

2. `すぐゼフィロスを問い詰める`
   - next: `crisis_d15_confront`
   - effects: `flag.acted_impulsively = true`

3. `ローザさんに相談する`
   - next: `crisis_d15_ask_rosa`
   - effects: `flag.asked_rosa_for_help = true`

### 5-A. 事実確認

**protagonist**

「まず、配達元と掲示板を確認します。噂に振り回されたら、もっと危ない気がする」

**shion**

「いい判断だ。焦りは、相手に隙を見せる」

**narration**

配達元に確認すると、発注は確かに受け付けられていた。
しかし、途中で別の業者から「注文はキャンセルされた」と連絡が入ったという。

**protagonist**

「そんな連絡、してないのに……」

### 5-B. 問い詰める

**protagonist**

「私、ゼフィロスさんに聞いてきます！」

**shion**

「待て。相手の手の内が見えないまま動くのは危険だ」

**protagonist**

「でも、このまま黙ってたら……！」

**narration**

怒りで足が前に出かけた瞬間、店の扉が開いた。

### 5-C. ローザに相談

**protagonist**

「ローザさんに相談してみます。こういうこと、何か知ってるかもしれない」

**shion**

「彼女なら、街の噂にも詳しいだろう」

**narration**

隣の花屋へ向かおうとしたところで、ちょうどローザが大股で店に入ってきた。

### 6. ローザ登場

**rosa**

「やっぱり来たわね。嫌な予感がしてたのよ」

**protagonist**

「ローザさん……！」

**rosa**

「仕入れが止まったんでしょ。あと、変な噂も流れてる」

**protagonist**

「どうしてそれを？」

**rosa**

「あたしの花屋にも来たのよ。『あのカフェと付き合うと面倒なことになる』って言いに来た業者がね」

**shion**

「圧力か」

**rosa**

「ええ。やり口が古いわ。だから余計に腹が立つ」

### 7. 終了

**narration**

見えないところで、何かが動き始めている。
ただの経営不振ではない。
この店を、誰かが意図的に揺さぶっている。

**protagonist**

「……負けたくないです。この店は、祖母の店だから」

**rosa**

「その顔ができるなら大丈夫。あたしも動くわ」

**shion**

「私も森の精霊に確認させよう」

**effect**

```json
{
  "reputation": -5,
  "flag": { "key": "sabotage_started", "value": true },
  "flag2": { "key": "shion_investigation_seed", "value": true },
  "flag3": { "key": "rosa_supply_help_seed", "value": true }
}
```

## 実装メモ

- 既存型が `flag2`, `flag3` を正式対応していない場合は、実装時に効果イベントを分割する。
- 選択肢結果は、この時点では大きなルート分岐にしない。主人公の性格・後続台詞差分に使う程度に留める。
- 評判低下は重すぎない `-5` 程度。経営危機の入口として扱う。
