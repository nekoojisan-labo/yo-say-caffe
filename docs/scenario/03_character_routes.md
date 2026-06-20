# 03 キャラクター別ルート設計

## 目的

恋愛ルートを、経営シミュレーションから浮かない形で設計する。

各キャラクターは単なる恋愛対象ではなく、カフェ経営、森の問題、主人公の成長に関わる役割を持つ。

## ルート共通構造

| 段階 | 好感度目安 | 内容 |
|---|---:|---|
| 出会い | 0 | 初来店、第一印象、店との接点 |
| 関係開始 | 100 | 個人的な悩みや背景に触れる |
| 秘密 | 300 | 立場・過去・弱みが明らかになる |
| 葛藤 | 500 | 主人公との関係に障害が出る |
| 決断 | 800 | 恋愛として向き合う |
| エンディング | 条件達成 | 経営結果・幻装レベル・好感度で分岐 |

## シオン

### 役割

森の守護者。祖母ハナコと深い関係があり、主人公を見守る案内役。

### 魅力

- 静かで神秘的
- 長く孤独を抱えている
- 厳しいが、主人公を大切に見守る
- 祖母の記憶を通して物語の核心に近い

### 経営との接点

- チュートリアル担当
- 照覧の魔法の説明者
- 森の住人との信頼回復に関わる
- ゼフィロス対策では調査役になる

### ルート構成

| 章 | 条件案 | 内容 | 効果 |
|---|---|---|---|
| 第1章 森の賢者の秘密 | Day7, prologue_complete | シオンの正体と森の秘密に触れる | shion_chapter1_complete |
| 第2章 失われた記憶 | shion_affection_100 | 夢を通じてシオンの過去を見る | shion_chapter2_complete |
| 第3章 封印の真実 | shion_affection_300 | 森にかけられた封印を知る | shion_chapter3_complete |
| 第4章 千年の想い | shion_affection_500 | 祖母ハナコとの関係と孤独が明かされる | shion_chapter4_complete |
| 第5章 永遠の絆 | shion_affection_800 | 主人公とシオンが未来を選ぶ | shion_route_complete |

### エンド条件案

- shion_route_complete
- shion_affection >= 800
- zephyros_defeated
- reputation >= 40

## ルシア

### 役割

妖精王国の第一王子。王族階級の恋愛ルート。

### 魅力

- 華やかで王子らしい
- 自由を求めてカフェに来る
- 表向きは余裕があるが、王宮の重圧を抱える
- 主人公の素朴な店に癒やされる

### 経営との接点

- 高級メニュー、評判、幻装レベルと相性が高い
- 王族来店によりカフェの評判が上がる
- 王宮関係者の来店や圧力イベントにつながる
- 幻装レベルが正式な場に出る条件になる

### ルート構成

| 章 | 条件案 | 内容 | 効果 |
|---|---|---|---|
| 第1章 光の王子 | lucia_first_visit | 初来店。王子であることを明かす | lucia_chapter1_complete |
| 第2章 仮面の下 | lucia_affection_100 | 王宮での孤独に触れる | lucia_chapter2_complete |
| 第3章 王宮の影 | lucia_affection_300 | 王宮派閥や婚約問題が示される | lucia_chapter3_complete |
| 第4章 禁じられた恋 | lucia_affection_500 | 身分差と幻装レベルの壁 | lucia_chapter4_complete |
| 第5章 光と共に | lucia_affection_800, glamor >= 6 | 王子と共に未来を選ぶ | lucia_route_complete |

### エンド条件案

- lucia_route_complete
- lucia_affection >= 800
- glamor.level >= 6
- reputation >= 60
- zephyros_defeated

## ローザ

### 役割

隣の花屋。元冒険者。主人公の救済役であり、地域との接続役。

### 魅力

- 筋骨隆々だが乙女心がある
- 豪快で面倒見がいい
- 祖母ハナコへの恩義がある
- ゼフィロスの危険性を知っている

### 経営との接点

- 花束で店の雰囲気を上げる
- 仕入れルートを助ける
- 経営難時に救済イベントを起こす
- ゼフィロス撃退の証言者・協力者になる

### ルート構成

恋愛ルートではなく、メイン支援ルートとして扱う。

| 段階 | 条件案 | 内容 | 効果 |
|---|---|---|---|
| 初登場 | Day5 | 花束を持って登場 | rosa_met |
| 警告 | zephyros_met | ゼフィロスの危険性を伝える | rosa_warned |
| 救済 | money_low or zephyros_sabotaged | 仕入れ先を紹介 | rosa_helping |
| 反撃 | shion_investigating | 証言者を集める | rosa_evidence_ready |
| 決着 | rosa_evidence_ready | ゼフィロス撃退に協力 | zephyros_defeated |

## ゼフィロス

### 役割

悪徳金融業者。初期プロトタイプのメイン危機。

### 魅力・怖さ

- 派手で胡散臭い
- 丁寧な口調で近づく
- 困っている時に甘い条件を出す
- 契約後に支配を強める
- 断ると妨害する

### 経営との接点

- 資金難時に借金を提案
- 借金を受けると返済イベントが発生
- 断ると悪評や仕入れ妨害が発生
- ローザ・シオンの協力で撃退可能

### 危機ルート構成

| 段階 | 条件案 | 内容 | 効果 |
|---|---|---|---|
| 接近 | money_crisis | 借金を提案 | zephyros_met |
| 選択 | zephyros_met | 借りる / 断る / 保留 | zephyros_debt or zephyros_refused |
| 取り立て | zephyros_debt | 利息請求 | debt増減 |
| 妨害 | zephyros_refused | 悪評・仕入れ妨害 | zephyros_sabotaged |
| 担保提案 | money_desperate | カフェ担保の提案 | zephyros_cafe_mortgaged |
| Bad End | debt返済不能 | カフェを失う | bad_end_debt |
| 撃退 | 証拠・協力者あり | 商人組合へ告発 | zephyros_defeated |

## 今後追加する恋愛キャラの設計テンプレート

```md
## キャラ名

### 役割

### 魅力

### 経営との接点

### ルート構成

| 章 | 条件案 | 内容 | 効果 |
|---|---|---|---|

### エンド条件案

### 口調メモ
```
