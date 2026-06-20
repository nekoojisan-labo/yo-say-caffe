# main_d01_prologue

## 目的

Day1開始時に発生する導入イベント。
主人公が祖母の遺したカフェを継ぐ理由、カフェの役割、シオンとの初接触、今後の経営と恋愛要素の種を置く。

旧版シナリオは参照しない。ここから新正本として扱う。

## 基本情報

| 項目 | 内容 |
|---|---|
| eventId | main_d01_prologue |
| category | main |
| day | 1 |
| triggerCondition | game_started = true |
| relatedCharacters | protagonist, shion |
| resultFlags | prologue_complete = true |
| unlocks | tutorial_d01_procurement |
| estimatedReadTime | 2〜3分 |

## このイベントで伝えること

- 主人公は祖母のカフェ「喫茶フェアリーテイル」を継ぐ。
- カフェは森と人間の町、妖精界をつなぐ特別な場所。
- シオンは森の守護者であり、祖母と深い縁がある。
- 主人公は不安を抱えつつも、店を開ける決意をする。
- 経営・幻装・恋愛の詳細説明はここでは詰め込まない。

## トーン

静かで少し寂しい導入。
ただし重くしすぎず、最後は「やってみよう」と前を向く。
シオンは冷たすぎず、まだ距離があるが面倒見の良さがにじむ。

## イベント本文

### event: pro_001

- type: narration
- text:

森の朝は、町より少しだけ遅く目を覚ます。

木々の葉先に残った露が、淡い光を受けてきらめいていた。
その奥に、小さな看板を掲げた一軒のカフェがある。

「喫茶フェアリーテイル」。
それが、祖母が遺した店の名前だった。

- nextEventId: pro_002

### event: pro_002

- type: narration
- text:

祖母が亡くなってから、ひと月。

片付けも、手続きも、気持ちの整理も、何ひとつ終わった気がしないまま、私はこの店の鍵を受け取った。

扉の前に立つと、胸の奥がきゅっと縮む。

- nextEventId: pro_003

### event: pro_003

- type: dialogue
- speaker: protagonist
- emotion: sad
- text:

おばあちゃん……私、本当にここを続けられるのかな。

- nextEventId: pro_004

### event: pro_004

- type: narration
- text:

古びた鍵を差し込む。

かちり、と音がした。
扉を開けると、懐かしい珈琲豆の香りと、焼き菓子の甘い匂いが、まだ店の奥に残っていた。

- nextEventId: pro_005

### event: pro_005

- type: narration
- text:

窓辺には、祖母が大切にしていた小さな花瓶。
カウンターには、使い込まれた木のトレイ。

何もかもが、昨日まで祖母がここにいたみたいだった。

- nextEventId: pro_006

### event: pro_006

- type: narration
- text:

その時、店の奥から淡い光がこぼれた。

棚の影でも、窓の反射でもない。
森の木漏れ日を閉じ込めたような、不思議な光だった。

- nextEventId: pro_007

### event: pro_007

- type: dialogue
- speaker: protagonist
- emotion: surprised
- text:

……誰か、いるの？

- nextEventId: pro_008

### event: pro_008

- type: narration
- text:

光の中から、銀の髪を持つ青年が姿を現した。

人間離れした整った顔立ち。
けれど、その目はどこか遠くを見ているようで、長い時間をひとりで過ごしてきた人の静けさがあった。

- nextEventId: pro_009

### event: pro_009

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: normal
- text:

ようやく来たか。
お前が、ハナコの孫娘だな。

- nextEventId: pro_010

### event: pro_010

- type: dialogue
- speaker: protagonist
- emotion: surprised
- text:

ハナコ……おばあちゃんの名前を？
あなたは……？

- nextEventId: pro_011

### event: pro_011

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: normal
- text:

私はシオン。
この森の守護者だ。

ハナコとは、古い約束がある。

- nextEventId: pro_012

### event: pro_012

- type: dialogue
- speaker: protagonist
- emotion: normal
- text:

森の守護者……？

- nextEventId: pro_013

### event: pro_013

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: normal
- text:

このカフェは、ただの店ではない。
森に暮らす者、町に暮らす者、そして妖精界の者たちが、同じ席で茶を飲める場所だ。

- nextEventId: pro_014

### event: pro_014

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: normal
- text:

ハナコは、その場所を守り続けた。
不器用で、頑固で、よく笑う人間だった。

- nextEventId: pro_015

### event: pro_015

- type: dialogue
- speaker: protagonist
- emotion: sad
- text:

……おばあちゃんらしいです。

- nextEventId: pro_016

### event: pro_016

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: normal
- text:

だからこそ、お前に問う。
この店を閉じるか。
それとも、引き継ぐか。

- nextEventId: pro_choice_001

### event: pro_choice_001

- type: choice
- speaker: protagonist
- text:

私は――

choices:

1. text: おばあちゃんの店を続けたい
   - nextEventId: pro_017a
   - effects:
     - affection.shion +10
     - flag.protagonist_resolve = continue

2. text: 正直、まだ怖いです
   - nextEventId: pro_017b
   - effects:
     - affection.shion +5
     - flag.protagonist_resolve = anxious

### event: pro_017a

- type: dialogue
- speaker: protagonist
- emotion: normal
- text:

続けたいです。
できるかどうかは、まだ分からないけど……。

でも、おばあちゃんが大切にした場所を、すぐに諦めたくありません。

- nextEventId: pro_018

### event: pro_017b

- type: dialogue
- speaker: protagonist
- emotion: sad
- text:

怖いです。
私にできるのか、自信もありません。

でも……それでも、何もせずに閉めるのは嫌なんです。

- nextEventId: pro_018

### event: pro_018

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: happy
- text:

……そうか。
ならば、まずはそれで十分だ。

- nextEventId: pro_019

### event: pro_019

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: normal
- text:

経営のことは、少しずつ覚えればいい。
仕入れ、営業、評判、資金。
どれも最初から完璧にできる者などいない。

- nextEventId: pro_020

### event: pro_020

- type: dialogue
- speaker: protagonist
- emotion: normal
- text:

シオンは、手伝ってくれるんですか？

- nextEventId: pro_021

### event: pro_021

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: normal
- text:

ハナコとの約束だ。
それに……この店が消えるのは、私も困る。

- nextEventId: pro_022

### event: pro_022

- type: narration
- text:

シオンは窓の外へ視線を向けた。

森の奥で、かすかに羽音がした気がする。
これから出会う誰かの気配が、木々の間を通り抜けていった。

- nextEventId: pro_023

### event: pro_023

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: normal
- text:

今日は開店準備から始めよう。
まずは、何をどれだけ仕入れるかを決める。

- nextEventId: pro_024

### event: pro_024

- type: dialogue
- speaker: protagonist
- emotion: happy
- text:

はい。
……喫茶フェアリーテイル、今日から私が開けます。

- nextEventId: pro_end

### event: pro_end

- type: effect
- effects:
  - flag.prologue_complete = true
- nextEventId: null

## 実装メモ

- このイベント終了後、`tutorial_d01_procurement` を発火可能にする。
- 選択肢は好感度差のみ。メイン進行は分岐させない。
- 主人公の名前入力機能がある場合、speakerNameは動的表示にする。
- ここでは幻装の詳細は説明しない。Day2の照覧イベントに回す。
