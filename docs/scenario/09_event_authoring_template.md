# イベント作成テンプレート

このテンプレートは、各イベントを本文化する前に使う。

イベントは、Markdownで仕様を固めてから `ScenarioChapter[]` に変換する。

## イベント仕様テンプレート

```md
# Event: <event_id>

## 基本情報

| 項目 | 内容 |
|---|---|
| eventId | `<event_id>` |
| title |  |
| category | main / management / romance / crisis / ending / tutorial |
| day |  |
| triggerCondition |  |
| priority |  |
| relatedCharacters |  |
| estimatedReadTime | 1〜3分 |

## 目的

このイベントでプレイヤーに何を感じさせるか。

- 
- 
- 

## ゲーム上の役割

このイベントがゲーム進行に与える意味。

- 経営上の変化:
- 恋愛上の変化:
- メイン危機への接続:
- 次イベントへの接続:

## 前提条件

- day:
- flag:
- money:
- reputation:
- glamor:
- affection:

## イベント概要

3〜5行で、何が起こるかを書く。

## 登場キャラクター

| キャラ | 役割 | 感情 |
|---|---|---|
| protagonist |  |  |
|  |  |  |

## 選択肢

| 選択肢 | 意味 | 効果 | 次イベント |
|---|---|---|---|
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

## effects

```ts
effects: {
  money?: number;
  reputation?: number;
  glamor?: number;
  affection?: { characterId: CharacterId; amount: number };
  flag?: { key: string; value: boolean | string | number };
}
```

## 本文構成

1. 導入ナレーション
2. キャラクター登場
3. 状況説明
4. 主人公の反応
5. 選択肢または感情の山
6. 効果・フラグ変化
7. 次への余韻

## 本文ドラフト

### event 1

- type:
- speaker:
- speakerName:
- emotion:
- text:
- nextEventId:

### event 2

- type:
- speaker:
- speakerName:
- emotion:
- text:
- nextEventId:

## 実装時メモ

- background:
- image:
- BGM:
- SE:
- UI注意:

## チェック

- [ ] 旧版シナリオを前提にしていない
- [ ] 発生条件が明確
- [ ] フラグ名が `05_flags_and_conditions.md` と一致
- [ ] 1イベントが長すぎない
- [ ] 選択肢に意味がある
- [ ] キャラの口調がブレていない
- [ ] 経営・恋愛・危機のどれに関わるか明確
- [ ] 次イベントへの接続がある
```

## ID命名ルール

### メイン

```text
main_d01_prologue
main_d05_rosa_intro
main_d10_zephyros_seed
main_d15_crisis_start
main_d25_counterattack
main_d30_finale
```

### チュートリアル

```text
tut_d01_procurement
tut_d01_open
tut_d01_result
tut_d02_shouran
tut_d03_freeplay_start
```

### 恋愛

```text
rom_shion_ch01
rom_shion_ch02
rom_lucia_ch01
rom_lucia_ch02
```

### 危機

```text
crisis_zephyros_offer
crisis_zephyros_sabotage
crisis_debt_warning
crisis_bad_end_debt
```

### エンディング

```text
end_bad_debt
end_normal_cafe
end_romance_shion
end_romance_lucia
end_true_fairytale
```

## category の使い分け

| category | 用途 |
|---|---|
| main | 物語全体の軸 |
| tutorial | 操作説明を含む導入 |
| management | 経営状態に応じたイベント |
| romance | 好感度・恋愛ルートイベント |
| crisis | 資金難、妨害、悪役関連 |
| ending | エンディング |

## 本文作成時の注意

### 経営イベント

経営イベントは、数字変化だけで終わらせない。

悪い例:

> 評判が下がった。

良い例:

> いつもなら笑い声で満ちている午後の店内が、今日は少しだけ静かだった。客席の隅で、誰かがこちらを見ながら小声で何かを囁いている。

### 恋愛イベント

恋愛イベントは、相手が主人公を好きになるだけの話にしない。

必ず、以下のどれかと接続する。

- カフェ経営
- 祖母の記憶
- 森の秘密
- 幻装レベル
- ゼフィロス危機
- キャラ本人の葛藤

### 危機イベント

危機イベントは、プレイヤーに選択余地を残す。

- 相談する
- 借りる
- 断る
- 調べる
- 仲間を頼る
- 評判回復に動く

ただし、全選択肢が即Bad Endにつながるような設計にはしない。

### エンディング

エンディングは、最後だけで決まるのではなく、30日間の積み上げで決まるようにする。

条件例:

- money
- reputation
- glamor.level
- affection
- flags
- debt
- zephyros_defeated
