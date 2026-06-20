# 02 30日プロトタイプ進行表

## 目的

まずは完成可能な最小単位として、30日で1周できるプロトタイプを設計する。

目的は以下。

- 経営シミュレーションの基本サイクルを体験できる
- 恋愛イベントの入口を体験できる
- ゼフィロス危機を通してメインストーリーに山を作る
- Bad / Normal / Romance / True の方向性を確認できる

## 全体構造

| 期間 | 役割 | 主な内容 |
|---|---|---|
| Day 1 | 導入 | カフェ継承、シオン登場、世界観説明 |
| Day 1-3 | チュートリアル | 仕入れ、営業、結果、照覧の魔法 |
| Day 4-7 | 通常経営開始 | ローザ登場、シオン第1章、評判形成 |
| Day 8-14 | 出会いと誘惑 | ルシア来店、ゼフィロス接近、資金難の芽 |
| Day 15-21 | 危機 | 妨害、悪い噂、仕入れトラブル、借金ルート分岐 |
| Day 22-27 | 反撃準備 | ローザ救済、シオン調査、証拠集め |
| Day 28-30 | 決着 | ゼフィロス対決、エンディング分岐 |

## Day別の基本進行

| Day | 種別 | イベント案 | 条件 | 効果 |
|---|---|---|---|---|
| 1 | メイン | プロローグ：森のカフェ | game_started | prologue_complete |
| 1 | 経営 | 仕入れチュートリアル | prologue_complete | tutorial_procurement_intro |
| 1 | 経営 | 営業チュートリアル | tutorial_procurement_done | tutorial_operation_intro |
| 1 | 経営 | 結果確認 | tutorial_operation_done | tutorial_day1_complete |
| 2 | 経営 | 照覧の魔法 | tutorial_day1_complete | tutorial_shouran_intro |
| 2 | 経営 | 仕入れアドバイス | tutorial_shouran_done | tutorial_day2_complete |
| 3 | 経営 | チュートリアル完了 | tutorial_day2_complete | tutorial_complete |
| 5 | メイン | ローザ登場 | prologue_complete | rosa_met |
| 7 | 恋愛 | シオン第1章 | prologue_complete | shion_chapter1_complete |
| 8-10 | 恋愛 | ルシア初来店 | reputation >= 10 または lucia_first_visit | lucia_chapter1_complete |
| 10-14 | 危機 | ゼフィロス接近 | money_crisis または reputation >= 15 | zephyros_met |
| 15-18 | 危機 | 妨害開始 | zephyros_refused or zephyros_rejected | zephyros_sabotaged |
| 18-22 | 救済 | ローザの警告・救済 | zephyros_met | rosa_warned |
| 22-27 | 調査 | シオンが証拠を探す | shion_chapter1_complete, zephyros_sabotaged | shion_investigating |
| 28 | 決戦 | ゼフィロス告発 | rosa_warned, shion_investigating | zephyros_defeated |
| 30 | 結末 | エンディング判定 | day >= 30 | ending_decided |

## 経営サイクルとの接続

1日の基本サイクルは以下。

1. PREP: 仕入れ・準備
2. OPEN: 営業
3. RESULT: 売上・評判・利益確認
4. ADVICE: アドバイス / イベント発生

シナリオは、基本的に以下のタイミングで発生する。

- 朝: チュートリアル、準備アドバイス
- 営業中: 特別客来店、恋愛キャラ来店
- 閉店後: メインストーリー、危機イベント、相談イベント
- 結果後: 経営状態に応じた警告・救済

## 初期エンディング案

| エンディング | 条件案 | 内容 |
|---|---|---|
| Bad End: 金色の籠 | zephyros_cafe_mortgaged または debt未返済 | カフェを失う |
| Bad End: 閉店 | money < 0, reputation低迷 | 経営継続不能 |
| Normal End | zephyros_defeated なし、経営は継続 | 小さな店として再出発 |
| Success End | zephyros_defeated, reputation >= 50 | カフェが地域に認められる |
| Shion Romance End | shion_affection高, シオン章進行 | 森の守護者と未来を選ぶ |
| Lucia Romance End | lucia_affection高, glamor >= 6 | 王子との関係を選ぶ |
| True End | zephyros_defeated, reputation高, 特定恋愛条件 | カフェが森と街をつなぐ正式な場所になる |

## 30日版でやらないこと

初期プロトタイプでは以下を後回しにする。

- 全10人の恋愛ルート完成
- 全キャラの専用エンディング
- 音声付きイベント
- 大量のランダム日常イベント
- 複雑な三角関係
- 長期経営バランス

## 30日版の完成条件

- Day1からDay30までイベントが破綻なく進む
- 経営失敗と成功の両方がある
- シオンとルシアの恋愛入口がある
- ローザが救済キャラとして機能する
- ゼフィロスが明確な危機として機能する
- エンディング判定ができる
