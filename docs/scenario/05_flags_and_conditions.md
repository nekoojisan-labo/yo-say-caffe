# 05 フラグ・条件管理

## 目的

シナリオの発生条件、分岐、完了判定、エンディング判定に使うフラグを整理する。

フラグ名が揺れると、イベントが発生しない・二重発生する・エンディングに到達できない原因になる。

## 命名ルール

### 基本形

```text
対象_状態
```

例:

- `prologue_complete`
- `tutorial_complete`
- `rosa_met`
- `zephyros_met`
- `zephyros_defeated`

### キャラ好感度しきい値

```text
characterId_affection_数値
```

例:

- `shion_affection_100`
- `shion_affection_300`
- `lucia_affection_500`
- `lucia_affection_800`

### チャプター完了

```text
characterId_chapter番号_complete
```

例:

- `shion_chapter1_complete`
- `lucia_chapter3_complete`

### ルート完了

```text
characterId_route_complete
```

例:

- `shion_route_complete`
- `lucia_route_complete`

## 基本フラグ

| フラグ | 意味 |
|---|---|
| game_started | ゲーム開始済み |
| prologue_complete | プロローグ完了 |
| tutorial_complete | チュートリアル完了 |
| main_story_complete | メインストーリー完了 |
| ending_decided | エンディング判定済み |

## チュートリアルフラグ

| フラグ | 意味 |
|---|---|
| tutorial_procurement_intro | 仕入れ説明を表示済み |
| tutorial_procurement_done | 仕入れ操作完了 |
| tutorial_operation_intro | 営業説明を表示済み |
| tutorial_operation_done | 営業操作完了 |
| tutorial_day1_complete | Day1チュートリアル完了 |
| tutorial_shouran_intro | 照覧説明を表示済み |
| tutorial_shouran_done | 照覧操作完了 |
| tutorial_day2_complete | Day2チュートリアル完了 |

## ローザ関連フラグ

| フラグ | 意味 |
|---|---|
| rosa_met | ローザと出会った |
| rosa_warned | ゼフィロスについて警告された |
| rosa_helping | ローザが救済に動いている |
| rosa_evidence_ready | ローザ側の証言・証拠が揃った |

## ゼフィロス関連フラグ

| フラグ | 意味 |
|---|---|
| zephyros_met | ゼフィロスと出会った |
| zephyros_refused | ゼフィロスの提案を断った |
| zephyros_considering | ゼフィロスの提案を保留した |
| zephyros_debt | ゼフィロスから借金した |
| zephyros_payment_missed | 返済を滞納した |
| zephyros_sabotaged | ゼフィロスによる妨害が発生した |
| zephyros_cafe_mortgaged | カフェを担保にした |
| zephyros_defeated | ゼフィロスを撃退した |
| zephyros_bad_end_trigger | ゼフィロスBad End条件を満たした |

## シオン関連フラグ

| フラグ | 意味 |
|---|---|
| shion_chapter1_complete | シオン第1章完了 |
| shion_chapter2_complete | シオン第2章完了 |
| shion_chapter3_complete | シオン第3章完了 |
| shion_chapter4_complete | シオン第4章完了 |
| shion_chapter5_complete | シオン第5章完了 |
| shion_route_complete | シオンルート完了 |
| shion_investigating | シオンがゼフィロス調査中 |

## ルシア関連フラグ

| フラグ | 意味 |
|---|---|
| lucia_first_visit | ルシア初来店条件 |
| lucia_chapter1_complete | ルシア第1章完了 |
| lucia_chapter2_complete | ルシア第2章完了 |
| lucia_chapter3_complete | ルシア第3章完了 |
| lucia_chapter4_complete | ルシア第4章完了 |
| lucia_chapter5_complete | ルシア第5章完了 |
| lucia_route_complete | ルシアルート完了 |

## 経営状態フラグ

| フラグ | 条件案 | 意味 |
|---|---|---|
| money_crisis | money <= 20000 | 資金難 |
| money_desperate | money <= 5000 | 危機的資金難 |
| reputation_low | reputation <= 10 | 評判低迷 |
| reputation_high | reputation >= 50 | 評判が高い |
| consecutive_loss_warning | 赤字連続 | 経営警告 |
| shop_success | reputation >= 60 and money >= 50000 | 経営成功状態 |

## 幻装関連フラグ

| フラグ | 条件案 | 意味 |
|---|---|---|
| glamor_level_2 | glamor.level >= 2 | 幻装レベル2到達 |
| glamor_level_3 | glamor.level >= 3 | 幻装レベル3到達 |
| glamor_level_4 | glamor.level >= 4 | 幻装レベル4到達 |
| glamor_level_5 | glamor.level >= 5 | 幻装レベル5到達 |
| glamor_level_6 | glamor.level >= 6 | 幻装レベル6到達 |
| glamor_unstable | stability低下 | 幻装が不安定 |

## エンディング条件案

### Bad End: 金色の籠

```text
zephyros_cafe_mortgaged == true
かつ
返済不能
```

または

```text
zephyros_bad_end_trigger == true
```

### Bad End: 閉店

```text
money < 0
または
reputation <= 0
```

### Normal End

```text
day >= 30
かつ
Bad End条件を満たしていない
かつ
zephyros_defeated == false
```

### Success End

```text
day >= 30
かつ
zephyros_defeated == true
かつ
reputation >= 50
```

### Shion Romance End

```text
shion_route_complete == true
かつ
shion_affection >= 800
かつ
zephyros_defeated == true
```

### Lucia Romance End

```text
lucia_route_complete == true
かつ
lucia_affection >= 800
かつ
glamor.level >= 6
かつ
reputation >= 60
```

### True End

```text
zephyros_defeated == true
かつ
reputation >= 70
かつ
money >= 50000
かつ
いずれかの恋愛ルート完了
```

## 要修正・要確認のフラグ揺れ

以下は既存コードに揺れがある可能性があるため、実装修正前に統一する。

| 候補A | 候補B | 推奨 |
|---|---|---|
| met_rosa | rosa_met | rosa_met |
| zephyros_rejected | zephyros_refused | zephyros_refused |
| shion_warned | shion_investigating | 用途を分ける |
| zephyros_proposal | zephyros_considering / zephyros_refused / zephyros_debt | 分岐ごとの明示フラグにする |

## 実装上の注意

現在の型では `effects.flag` が単数前提の箇所がある。

複数フラグを同時に立てたい場合は、以下のどちらかを選ぶ必要がある。

1. `flag`, `flag2`, `flag3` を使う
2. `flags: Array<{ key, value }>` に拡張する

長期的には `flags` 配列方式の方が安全。
