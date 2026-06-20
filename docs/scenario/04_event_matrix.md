# 04 イベントマトリクス

## 目的

イベント本文を書く前に、全イベントの位置、条件、効果を一覧化する。

経営シミュレーション + 恋愛シミュレーションでは、本文の完成度より先に「いつ・なぜ・何が起こるか」を決める必要がある。

## イベント種別

| 種別 | 用途 |
|---|---|
| main | メインストーリー |
| tutorial | 操作説明 |
| management | 経営状態イベント |
| romance | 恋愛キャラ個別イベント |
| crisis | 資金難・妨害・Bad End関連 |
| rescue | 救済・協力者イベント |
| ending | エンディング判定 |

## 30日プロトタイプ イベント一覧

| ID | 種別 | 発生条件 | タイトル | 登場キャラ | 主な効果 |
|---|---|---|---|---|---|
| prologue_chapter1 | main | day=1, game_started | プロローグ：森のカフェ | 主人公, シオン | prologue_complete |
| tutorial_day1_procurement | tutorial | day=1, prologue_complete | 仕入れの基本 | シオン | tutorial_procurement_intro |
| tutorial_day1_operation | tutorial | tutorial_procurement_done | 営業の基本 | シオン | tutorial_operation_intro |
| tutorial_day1_result | tutorial | tutorial_operation_done | 結果確認 | シオン | tutorial_day1_complete |
| tutorial_day2_shouran | tutorial | day=2, tutorial_day1_complete | 照覧の魔法 | シオン | tutorial_shouran_intro |
| tutorial_day2_advice | tutorial | tutorial_shouran_done | 仕入れのコツ | シオン | tutorial_day2_complete |
| tutorial_day3_complete | tutorial | day=3, tutorial_day2_complete | チュートリアル完了 | シオン | tutorial_complete |
| rosa_intro | main/rescue | day=5, prologue_complete | 花屋の姐さん | ローザ | rosa_met, reputation+ |
| shion_chapter1 | romance | day>=7, prologue_complete | 森の賢者の秘密 | シオン | shion_chapter1_complete, affection+ |
| lucia_chapter1 | romance | lucia_first_visit | 光の王子 | ルシア | lucia_chapter1_complete, affection+ |
| zephyros_approach | crisis | money_crisis | 甘い誘惑 | ゼフィロス | zephyros_met, 選択分岐 |
| zephyros_collection_1 | crisis | zephyros_collection_trigger_1 | 取り立て | ゼフィロス | debt処理, payment_missed |
| zephyros_sabotage | crisis | zephyros_sabotage_trigger | 影の妨害 | ゼフィロス | reputation-, zephyros_sabotaged |
| rosa_warning | rescue | rosa_warning_trigger | ローザの警告 | ローザ | rosa_warned |
| rosa_supply_help | rescue | zephyros_sabotaged or money_low | 仕入れルート確保 | ローザ | rosa_helping |
| shion_investigation | main/rescue | zephyros_sabotaged, shion_chapter1_complete | 森の調査 | シオン | shion_investigating |
| counterattack_prepare | main | rosa_helping, shion_investigating | 証拠集め | ローザ, シオン | evidence_ready |
| zephyros_counterattack | main | evidence_ready | 逆転の告発 | 主人公, ローザ, シオン, ゼフィロス | zephyros_defeated |
| ending_judgement | ending | day>=30 | 未来の選択 | 条件次第 | ending_decided |

## イベント本文テンプレート

```ts
{
  id: 'event_id',
  title: 'イベントタイトル',
  description: '短い説明',
  triggerCondition: {
    day: 10,
    flag: { key: 'flag_name', value: true }
  },
  events: [
    {
      id: 'event_1',
      type: 'narration',
      text: '本文',
      nextEventId: 'event_2'
    },
    {
      id: 'event_2',
      type: 'dialogue',
      speaker: 'characterId',
      speakerName: '表示名',
      text: 'セリフ',
      emotion: 'normal',
      nextEventId: null
    }
  ]
}
```

## 選択肢設計ルール

選択肢は、単なる好感度増減だけにしない。

良い選択肢は、以下のどれかを変える。

- 好感度
- 資金
- 評判
- 幻装レベル
- 危機フラグ
- 後続イベント
- エンディング条件

## 選択肢例

### ゼフィロス借金提案

| 選択肢 | 効果 | 後続 |
|---|---|---|
| お断りします | zephyros_refused | 妨害ルート |
| 少し考えさせてください | zephyros_considering | 再提案ルート |
| 50,000G借りる | money+50000, zephyros_debt | 取り立てルート |

### ルシア初来店

| 選択肢 | 効果 | 意味 |
|---|---|---|
| 特製フルーツタルト | lucia affection +15 | 甘いもの好きを掴む |
| 紅茶と焼き菓子 | lucia affection +10 | 上品さを見せる |
| メニューをご覧ください | lucia affection +5 | 控えめ対応 |

## イベント渋滞チェック

同じ日に以下が重なりすぎないようにする。

- チュートリアル
- メインイベント
- 恋愛イベント
- 危機イベント
- 経営結果イベント

特に Day 5, Day 7, Day 10, Day 15, Day 28 は重要イベントが集中しやすい。

## 到達不能チェック

イベント実装前に確認すること。

- 発生条件のフラグがどこかで立つか
- 完了フラグが立つか
- 選択肢の `nextEventId` が存在するか
- Bad End 条件が厳しすぎないか
- 恋愛エンド条件が30日内で達成可能か
- `day` 条件が `day ===` なのか `day >=` なのか明確か

## 現時点の要確認項目

- `src/game/scenario.ts` と `src/game/scenarios/` の役割整理
- `met_rosa` と `rosa_met` のような同義フラグの統一
- `zephyros_rejected` と `zephyros_refused` の統一
- `flag` を複数立てる場合の型仕様確認
- ScenarioScreen 実装時のイベント再生順序
