# ending_d30_branching

## 基本情報

| 項目 | 内容 |
|---|---|
| eventId | ending_d30_branching |
| title | 三十日目の答え |
| category | ending |
| day | 30 |
| triggerCondition | `day >= 30` |
| relatedCharacters | protagonist, shion, lucia, rosa, zephyros |
| purpose | 30日プロトタイプのエンディング分岐を定義する |

## 役割

30日プロトタイプの締めくくり。
経営・危機解決・恋愛好感度・選択肢の結果によって、複数のエンディングへ分岐する。

このファイルは本文だけでなく、実装時の分岐条件メモも兼ねる。

## エンディング優先順

実装時は、上から順に判定する。

1. Bad End：金色の籠
2. True End：森と店の灯り
3. Shion Romance End：森の守護者と店主
4. Lucia Romance End：王子と小さなカフェ
5. Success End：評判のカフェ
6. Normal End：続いていく日々

---

# 1. Bad End：金色の籠

## 条件案

```text
final_offer_accepted === true
または
money < 0 and guild_confrontation_won !== true
```

## 本文

**narration**

契約書にサインをした日から、店は見違えるように変わった。

豪華な看板。
高価な食器。
派手な広告。
客足も、一時的には増えた。

けれど、カウンターに立つたび、胸の奥が冷えていく。

**zephyros**

「笑顔が硬いですね。看板店主なのですから、もっと華やかに」

**protagonist**

「……はい」

**narration**

祖母の古いカップは片付けられた。
常連たちの席も、予約客用に変えられた。
ローザの花は、ゼフィロスが選んだ金色の造花に置き換えられた。

店は残った。
けれど、私の守りたかったカフェは、もうここにはない。

**ending_title**

Bad End：金色の籠

**ending_description**

あなたは店を失わなかった。けれど、店の心を手放してしまった。

---

# 2. True End：森と店の灯り

## 条件案

```text
guild_confrontation_won === true
cafe_recovery_seen === true
alternative_supplier_unlocked === true
evidence_gathering_started === true
reputation >= 60
shion_ch02_complete === true
lucia_ch02_complete === true
```

## 本文

**narration**

三十日目の朝。
喫茶フェアリーテイルの扉には、新しい札がかかっていた。

『本日も、森と街のあいだで営業中』

その文字は、ローザが花で飾り、ルシアが少しだけ書式を整え、シオンが静かに見守ってくれたものだ。

**protagonist**

「最初は、三十日も続けられるか不安でした」

**rosa**

「今じゃ、すっかり店主の顔よ」

**lucia**

「この店は、ただのカフェではなくなった。街の小さな店たちにとっても、希望になったんだ」

**shion**

「ハナコが守った灯りは、お前の手で新しくなった」

**narration**

森の妖精も、街の商人も、獣人も、王族も。
今日のカフェには、いろんな客が同じテーブルを囲んでいる。

完璧な店ではない。
失敗もする。
迷う日もある。

それでも、この店には帰ってこられる灯りがある。

**protagonist**

「いらっしゃいませ。喫茶フェアリーテイルへようこそ」

**ending_title**

True End：森と店の灯り

**ending_description**

あなたはカフェを守り、森と街をつなぐ新しい居場所を作った。

---

# 3. Shion Romance End：森の守護者と店主

## 条件案

```text
guild_confrontation_won === true
shion_ch02_complete === true
affection.shion >= 100
shion_supported === true or recovery_shion_first === true
```

## 本文

**narration**

閉店後。
店の灯りを落とすと、森の気配が静かに近づいてきた。

シオンは窓辺に立ち、いつものように外を見ている。
けれど、その横顔は以前ほど遠くなかった。

**protagonist**

「シオン」

**shion**

「なんだ」

**protagonist**

「明日も、店に来てくれますか」

**shion**

「私は守護者だ。森に異変がなければ、ここにいる必要はない」

**protagonist**

「必要がなくても、来てほしいです」

**narration**

シオンは少しだけ目を見開いた。
長い沈黙のあと、ほんのわずかに笑う。

**shion**

「……困った店主だ」

**protagonist**

「だめですか？」

**shion**

「だめなら、ここにはいない」

**narration**

森の守護者は、千年の孤独を抱えていた。
けれど今、その孤独の隣に、小さなカフェの灯りがある。

**ending_title**

Romance End：森の守護者と店主

**ending_description**

あなたはシオンと共に、森とカフェを見守る未来を選んだ。

---

# 4. Lucia Romance End：王子と小さなカフェ

## 条件案

```text
guild_confrontation_won === true
lucia_ch02_complete === true
affection.lucia >= 100
lucia_respects_owner_pride === true or recovery_lucia_first === true
```

## 本文

**narration**

閉店間際、ルシアが最後の客として残っていた。

王子としてではなく、いつもの席に座る一人の客として。

**lucia**

「今日の焼き菓子も美味しかった」

**protagonist**

「ありがとうございます。まだ王宮の菓子職人には敵わないと思いますけど」

**lucia**

「比べるものじゃないよ」

**protagonist**

「そうですか？」

**lucia**

「王宮の菓子は完璧だ。でも、ここには帰ってきたくなる味がある」

**narration**

ルシアは少しだけ照れたように笑った。

**lucia**

「僕は、この店に救われている。王子ではなく、ただのルシアとしていられるから」

**protagonist**

「それなら、いつでも来てください。ただし、ちゃんとお客さんとして」

**lucia**

「もちろん。……いつか、客以外の立場でも来られると嬉しいけれど」

**narration**

その言葉の意味に気づいて、頬が熱くなる。

小さなカフェと、妖精王国の王子。
立場は遠い。
けれど、今日の距離は、最初の日よりずっと近い。

**ending_title**

Romance End：王子と小さなカフェ

**ending_description**

あなたはルシアと、身分を越えて少しずつ近づく未来を選んだ。

---

# 5. Success End：評判のカフェ

## 条件案

```text
guild_confrontation_won === true
reputation >= 50
money >= 0
```

## 本文

**narration**

三十日目の営業を終え、帳面を閉じた。

まだ大繁盛とは言えない。
けれど、赤字に怯えていた最初の日とは違う。

常連が増えた。
仕入れ先も増えた。
困った時に相談できる人もできた。

**protagonist**

「少しは、店主らしくなれたかな」

**rosa**

「少しどころじゃないわよ」

**shion**

「この店の灯りは、安定してきた」

**lucia**

「これからもっと良い店になる」

**narration**

喫茶フェアリーテイルは、今日も森の入口で明かりを灯している。

**ending_title**

Success End：評判のカフェ

**ending_description**

あなたは危機を越え、評判のカフェとして次の季節へ進み始めた。

---

# 6. Normal End：続いていく日々

## 条件案

```text
money >= 0
```

## 本文

**narration**

三十日目の夜。
店内には、静かなコーヒーの香りが残っていた。

大成功とは言えない。
失敗も多かった。
思うようにいかない日もあった。

けれど、店は今日も閉店時間まで営業できた。
そして明日も、扉を開けることができる。

**protagonist**

「続けられる。それだけでも、すごいことなんだ」

**shion**

「ああ。続くものは、強い」

**narration**

祖母のカップを棚に戻す。
明日の仕入れ予定を書き込む。

物語はまだ終わらない。
この店の日々は、ここから続いていく。

**ending_title**

Normal End：続いていく日々

**ending_description**

あなたは大きな成功には届かなかったが、カフェを続けるための一歩を守った。

---

## 実装メモ

- 初期プロトタイプでは `affection >= 100` を仮条件にする。
- 本実装では、30日内で到達可能な好感度設計に合わせて調整する。
- True End は条件が多いため、初回プレイでは狙いにくい設計でよい。
- Bad End はプレイヤーに理不尽感が出ないよう、契約選択や資金マイナスなど明確な原因を必要とする。
