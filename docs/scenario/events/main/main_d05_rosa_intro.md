# main_d05_rosa_intro

## 目的

Day5に発生するローザ初登場イベント。
経営チュートリアル後の最初の強いキャライベントとして、店の外部関係・近所付き合い・救済キャラの存在を提示する。

## 基本情報

| 項目 | 内容 |
|---|---|
| eventId | main_d05_rosa_intro |
| category | main |
| day | 5 |
| triggerCondition | tutorial_complete = true |
| relatedCharacters | protagonist, rosa, shion |
| resultFlags | rosa_met = true |
| unlocks | rosa support events / zephyros warning route |
| estimatedReadTime | 2〜3分 |

## このイベントで伝えること

- ローザは隣の花屋の店主。
- 祖母ハナコに恩があり、主人公のことを気にかけている。
- 見た目は強烈だが、面倒見がよく情に厚い。
- 彼女は後のゼフィロス危機で救済役になる。
- ただし初登場では悪徳金融の説明をしすぎない。軽く「この辺りは変な奴もいる」と匂わせる程度。

## トーン

チュートリアル後の明るいキャライベント。
ローザはギャグ寄りだが、単なるネタキャラにせず、頼れる大人として見せる。
主人公は圧倒されつつも、安心感を覚える。

## イベント本文

### event: rosa_intro_001

- type: narration
- text:

開店から五日目。

少しずつ、店のリズムが見えてきた気がする。
朝に珈琲豆を確認して、昼に焼き菓子を並べ、夕方には結果を帳面に書く。

まだ慣れたとは言えないけれど、店の空気は初日よりずっと柔らかかった。

- nextEventId: rosa_intro_002

### event: rosa_intro_002

- type: dialogue
- speaker: protagonist
- emotion: happy
- text:

今日はクッキー、少し多めにして正解だったかも。

- nextEventId: rosa_intro_003

### event: rosa_intro_003

- type: narration
- text:

そう言って焼き上がったクッキーを並べた、その時だった。

店の扉が、勢いよく開いた。

- nextEventId: rosa_intro_004

### event: rosa_intro_004

- type: dialogue
- speaker: rosa
- speakerName: ？？？
- emotion: happy
- text:

ごめんあそばせぇぇぇぇ！
ハナコばあちゃんの孫って子は、ここにいるかしら！？

- nextEventId: rosa_intro_005

### event: rosa_intro_005

- type: narration
- text:

入ってきたのは、見上げるほど背の高い人物だった。

肩幅は扉より広いんじゃないかと思うくらいで、腕は丸太みたいに太い。
けれど身につけているのは、淡いピンクのエプロンと、花柄のスカーフ。

そして両腕には、抱えきれないほどの花束があった。

- nextEventId: rosa_intro_006

### event: rosa_intro_006

- type: dialogue
- speaker: protagonist
- emotion: surprised
- text:

え、えっと……はい。私です。

- nextEventId: rosa_intro_007

### event: rosa_intro_007

- type: dialogue
- speaker: rosa
- speakerName: ？？？
- emotion: happy
- text:

あらやだ、ほんとにハナコばあちゃんに目元が似てる！
可愛いじゃないの！

- nextEventId: rosa_intro_008

### event: rosa_intro_008

- type: dialogue
- speaker: protagonist
- emotion: surprised
- text:

あ、ありがとうございます……？

- nextEventId: rosa_intro_009

### event: rosa_intro_009

- type: dialogue
- speaker: rosa
- speakerName: ローザ
- emotion: happy
- text:

あたしはローザ。
隣で花屋をやってるの。
昔はちょっとだけ冒険者もしてたけど、今は花とリボンを愛する乙女よ。

- nextEventId: rosa_intro_010

### event: rosa_intro_010

- type: dialogue
- speaker: protagonist
- emotion: normal
- text:

隣の花屋さん……！
いつも綺麗なお花が並んでるお店ですよね。

- nextEventId: rosa_intro_011

### event: rosa_intro_011

- type: dialogue
- speaker: rosa
- speakerName: ローザ
- emotion: happy
- text:

そうそう、それ！
見てくれてたのねぇ。嬉しいわぁ！

で、今日は開店祝いを持ってきたの。

- nextEventId: rosa_intro_012

### event: rosa_intro_012

- type: narration
- text:

ローザはカウンターの上に、色とりどりの花束を置いた。

小さな森の花、町で人気のバラ、見たことのない青い花。
店内が一瞬で明るくなる。

- nextEventId: rosa_intro_013

### event: rosa_intro_013

- type: dialogue
- speaker: protagonist
- emotion: happy
- text:

わあ……すごく綺麗。
本当にいただいていいんですか？

- nextEventId: rosa_intro_014

### event: rosa_intro_014

- type: dialogue
- speaker: rosa
- speakerName: ローザ
- emotion: normal
- text:

もちろんよ。
ハナコばあちゃんには、昔ずいぶん助けてもらったの。

あの人がいなかったら、あたしは今ごろ花屋なんてやれてなかったわ。

- nextEventId: rosa_intro_015

### event: rosa_intro_015

- type: dialogue
- speaker: protagonist
- emotion: normal
- text:

おばあちゃんが、ローザさんを……。

- nextEventId: rosa_intro_016

### event: rosa_intro_016

- type: dialogue
- speaker: rosa
- speakerName: ローザ
- emotion: happy
- text:

だから、今度はあたしの番。
困ったことがあったら、遠慮なく言いなさい。
仕入れでも、力仕事でも、変な客でも、だいたい何とかしてあげる。

- nextEventId: rosa_intro_017

### event: rosa_intro_017

- type: dialogue
- speaker: protagonist
- emotion: surprised
- text:

変な客まで……？

- nextEventId: rosa_intro_018

### event: rosa_intro_018

- type: dialogue
- speaker: rosa
- speakerName: ローザ
- emotion: normal
- text:

この辺り、いい人ばかりだけど、面倒なのもいるのよ。
甘い言葉で近づいて、あとから首根っこを押さえるような連中がね。

- nextEventId: rosa_intro_019

### event: rosa_intro_019

- type: dialogue
- speaker: protagonist
- emotion: sad
- text:

そんな人たちが……。

- nextEventId: rosa_intro_020

### event: rosa_intro_020

- type: dialogue
- speaker: rosa
- speakerName: ローザ
- emotion: happy
- text:

まあ、今から怖がらせるつもりはないわ。
今日はまず、クッキーをひとついただこうかしら。
いい匂いがして、さっきからお腹が鳴ってるのよ！

- nextEventId: rosa_intro_021

### event: rosa_intro_021

- type: dialogue
- speaker: protagonist
- emotion: happy
- text:

もちろんです。
開店祝いのお礼に、ぜひ食べていってください。

- nextEventId: rosa_intro_022

### event: rosa_intro_022

- type: narration
- text:

ローザはクッキーを一口で食べると、ぱっと顔を輝かせた。

大きな手で口元を押さえる仕草だけは、妙に上品だった。

- nextEventId: rosa_intro_023

### event: rosa_intro_023

- type: dialogue
- speaker: rosa
- speakerName: ローザ
- emotion: happy
- text:

あら、おいしいじゃない！
素朴だけど、ちゃんと手をかけてる味だわ。

ハナコばあちゃんの味に、あんたの味が混ざり始めてる。

- nextEventId: rosa_intro_024

### event: rosa_intro_024

- type: dialogue
- speaker: protagonist
- emotion: happy
- text:

私の味……。

- nextEventId: rosa_intro_025

### event: rosa_intro_025

- type: dialogue
- speaker: rosa
- speakerName: ローザ
- emotion: normal
- text:

そうよ。
店を継ぐって、前と同じことをするだけじゃないの。
あんたが続けるなら、あんたの店になっていく。

焦らなくていいわ。

- nextEventId: rosa_intro_026

### event: rosa_intro_026

- type: narration
- text:

その言葉は、思ったより深く胸に残った。

祖母の店を守ることと、自分の店にしていくこと。
その二つは、きっと反対ではないのだ。

- nextEventId: rosa_intro_027

### event: rosa_intro_027

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: normal
- text:

相変わらず、騒がしいな。ローザ。

- nextEventId: rosa_intro_028

### event: rosa_intro_028

- type: dialogue
- speaker: rosa
- speakerName: ローザ
- emotion: happy
- text:

あら、シオンじゃない。
相変わらず湿った顔してるわね！
ちゃんと日に当たりなさいよ！

- nextEventId: rosa_intro_029

### event: rosa_intro_029

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: normal
- text:

余計なお世話だ。

- nextEventId: rosa_intro_030

### event: rosa_intro_030

- type: dialogue
- speaker: protagonist
- emotion: surprised
- text:

二人とも、知り合いなんですか？

- nextEventId: rosa_intro_031

### event: rosa_intro_031

- type: dialogue
- speaker: rosa
- speakerName: ローザ
- emotion: happy
- text:

もちろんよ。
この森で長く暮らしてると、だいたい顔見知りになるの。

- nextEventId: rosa_intro_032

### event: rosa_intro_032

- type: dialogue
- speaker: shion
- speakerName: シオン
- emotion: normal
- text:

ローザは見た目より面倒見がいい。
困った時は頼るといい。

- nextEventId: rosa_intro_033

### event: rosa_intro_033

- type: dialogue
- speaker: rosa
- speakerName: ローザ
- emotion: angry
- text:

見た目より、は余計よ！

- nextEventId: rosa_intro_034

### event: rosa_intro_034

- type: narration
- text:

思わず笑ってしまった。

店の中に、昨日までとは違う賑やかさが広がっている。
祖母の店に、新しい人の声が増えていく。

- nextEventId: rosa_intro_035

### event: rosa_intro_035

- type: dialogue
- speaker: protagonist
- emotion: happy
- text:

ローザさん、ありがとうございます。
これからよろしくお願いします。

- nextEventId: rosa_intro_036

### event: rosa_intro_036

- type: dialogue
- speaker: rosa
- speakerName: ローザ
- emotion: happy
- text:

こちらこそ。
何かあったら、すぐ隣に叫びなさい。
壁くらいなら、あたしがぶち抜いて駆けつけるわ！

- nextEventId: rosa_intro_037

### event: rosa_intro_037

- type: dialogue
- speaker: protagonist
- emotion: surprised
- text:

壁は……できればそのままでお願いします。

- nextEventId: rosa_intro_end

### event: rosa_intro_end

- type: effect
- effects:
  - reputation +5
  - flag.rosa_met = true
- nextEventId: null

## 実装メモ

- ローザは救済キャラとして早めに印象づける。
- `rosa_met = true` 後、ゼフィロス関連イベントでローザ警告/救済を出せるようにする。
- シオンとの掛け合いで世界のつながりを感じさせる。
- ローザの台詞は勢いを出すが、品のない罵倒や下品な方向には寄せない。
- ゼフィロスの説明は伏線程度に留める。
