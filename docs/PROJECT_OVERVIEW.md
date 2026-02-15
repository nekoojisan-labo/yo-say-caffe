# 🧚 妖精カフェ物語 - プロジェクト全体設計図

> **このドキュメントを読めば、プロジェクトの全体像がわかります**

---

## 📊 現状サマリー

### リポジトリ状態
```
yo-say-caffe/
├── main                          ← 安定版（リリース用）
├── feature/goro-port             ← 統合ブランチ（= develop）
└── 作業ブランチ
    ├── claude/{タスク名}         ← Claude Code 作業
    └── codex/{タスク名}          ← Codex/他AI 作業
```

### 実装完成度

| 領域 | 完成度 | 主要ファイル |
|------|--------|-------------|
| 型定義 | ✅ 100% | src/types/index.ts |
| 状態管理 | ✅ 100% | src/store/*.ts (9ストア) |
| キャラ定義 | ✅ 100% | src/game/characters.ts (12人) |
| シナリオエンジン | ✅ 95% | src/game/scenario.ts |
| 基本画面UI | ✅ 90% | src/components/common/screens/* |
| シナリオ実装 | 🟡 30% | src/game/scenarios/* (3人/10人) |
| アセット（画像） | 🟡 60% | src/assets/images/* |
| アセット（音声） | ❌ 0% | 未配置 |

---

## 🏗️ 全体構造図

```
┌─────────────────────────────────────────────────────────────────┐
│                        妖精カフェ物語                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │   画面UI    │    │   状態管理   │    │    データ   │         │
│  │ components/ │◄──►│   store/    │◄──►│    data/    │         │
│  └──────┬──────┘    └──────┬──────┘    └─────────────┘         │
│         │                  │                                    │
│         │                  ▼                                    │
│         │           ┌─────────────┐                             │
│         └──────────►│ ゲームロジック│                            │
│                     │    game/    │                             │
│                     └──────┬──────┘                             │
│                            │                                    │
│                            ▼                                    │
│                     ┌─────────────┐                             │
│                     │  アセット   │                             │
│                     │   assets/   │                             │
│                     └─────────────┘                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📁 ディレクトリ構造と担当

```
src/
├── components/          【UI担当AI】
│   ├── common/
│   │   └── screens/     ★ 画面実装（15画面）
│   ├── layout/          ナビゲーション（TopBar, BottomNav）
│   └── management/      経営画面（19コンポーネント）
│
├── game/                【シナリオ担当AI】
│   ├── scenarios/       ★ イケメンシナリオ
│   │   ├── ikemen/      各キャラシナリオ（ルシア等）
│   │   ├── events/      イベントシナリオ（ローザ等）
│   │   ├── shion/       シオン専用シナリオ
│   │   ├── prologue.ts  プロローグ
│   │   └── tutorial.ts  チュートリアル
│   ├── scenario.ts      シナリオエンジン
│   ├── characters.ts    キャラ定義
│   ├── heartSystem.ts   好感度システム
│   └── glamorCalculator.ts 幻装計算
│
├── store/               【共有】変更時は通知
│   ├── gameStore.ts     メイン状態
│   ├── ikemenStore.ts   イケメン好感度
│   ├── protagonistStore.ts 主人公状態
│   └── ...etc (9ストア)
│
├── types/               【共有】追記のみ
│   └── index.ts         全型定義（449行）
│
├── data/                【データ担当】
│   ├── menuData.ts      メニュー（20種類）
│   ├── ikemenData.ts    イケメン（10人）
│   ├── eventData.ts     イベント定義
│   └── ...etc
│
├── utils/               【共有】
│   ├── eventEngine.ts   イベント処理
│   ├── managementEngine.ts 経営ロジック
│   └── ...etc
│
├── hooks/               【共有】
│   ├── useBusinessDay.ts 営業日ロジック
│   └── ...etc
│
└── assets/              【人間担当】
    └── images/
        ├── characters/  キャラ立ち絵（12人分）
        ├── cafemorning.webp 背景（朝）
        ├── cafeevning.webp  背景（夕）
        └── ...etc
```

---

## 👥 キャラクター一覧

### イケメン妖精（10人）

| ID | 名前 | ランク | シナリオ |
|----|------|--------|---------|
| lucia | ルシア | royal (王族) | ✅ 実装済み |
| shion | シオン | royal (王族) | ✅ 実装済み |
| haruto | ハルト | noble (貴族) | 🟡 基本のみ |
| kagerou | カゲロウ | noble (貴族) | 🟡 基本のみ |
| ren | レン | knight (騎士) | ❌ 未実装 |
| mizuki | ミズキ | knight (騎士) | ❌ 未実装 |
| souma | ソウマ | knight (騎士) | ❌ 未実装 |
| yukito | ユキト | commoner (庶民) | ❌ 未実装 |
| riku | リク | commoner (庶民) | ❌ 未実装 |
| aoi | アオイ | commoner (庶民) | ❌ 未実装 |

### 特殊キャラ（2人）

| ID | 名前 | 役割 |
|----|------|------|
| rosa | ローザ | イベントキャラ |
| zephyros | ゼファイロス | イベントキャラ |

---

## 📋 制作手順（Phase）

### Phase 1: 基盤完成 [🔴 高優先]
```
□ 1-1. feature/goro-port と main の差分確認・整理
□ 1-2. ScenarioScreen.tsx の動作確認・改善
□ 1-3. 全画面の遷移テスト
```

### Phase 2: コンテンツ拡充 [🟡 中優先]
```
□ 2-1. レン(ren) シナリオ作成
□ 2-2. ミズキ(mizuki) シナリオ作成
□ 2-3. ソウマ(souma) シナリオ作成
□ 2-4. GalleryScreen 実装（CG閲覧）
□ 2-5. キャラ詳細画面の実装
```

### Phase 3: アセット統合 [🟡 中優先]
```
□ 3-1. 立ち絵画像配置（表情差分）
□ 3-2. 背景画像追加（10枚目標）
□ 3-3. BGM配置（11曲）
□ 3-4. SE配置（13種類）
```

### Phase 4: 残りシナリオ [🟢 低優先]
```
□ 4-1. ユキト(yukito) シナリオ
□ 4-2. リク(riku) シナリオ
□ 4-3. アオイ(aoi) シナリオ
□ 4-4. カゲロウ(kagerou) シナリオ詳細化
□ 4-5. ハルト(haruto) シナリオ詳細化
```

### Phase 5: テスト・リリース
```
□ 5-1. 全機能の動作確認
□ 5-2. セーブ/ロードテスト
□ 5-3. ゲームバランス調整
□ 5-4. Electronビルド（Win/Mac/Linux）
□ 5-5. クロスプラットフォームテスト
```

---

## 🌳 ブランチ運用

```
main (本番)
 │   ← nekoojisan がレビュー・マージ
 │
 └── feature/goro-port (統合ブランチ)
      │   ← AI同士でマージOK
      │
      ├── claude/{タスク名}   Claude Code 作業
      │
      └── codex/{タスク名}    Codex/他AI 作業
```

### PR フロー
1. **作業ブランチで実装** → こまめにコミット
2. **feature/goro-port へ PR** → AI同士で確認してマージ
3. **まとまったら main へ PR** → nekoojisan がレビュー・マージ

---

## 👷 担当分担

| 担当 | 作業内容 | 対象ディレクトリ |
|------|---------|-----------------|
| **AI-A (UI)** | 画面実装、UIコンポーネント | `components/common/screens/*` |
| **AI-B (シナリオ)** | イベント・シナリオ執筆 | `game/scenarios/*` |
| **人間** | アセット準備（画像・音声） | `assets/*` |
| **共同** | レビュー・統合・テスト | feature/goro-port |

---

## 🛠️ 技術スタック

| カテゴリ | 技術 |
|---------|------|
| フレームワーク | React 18 + TypeScript |
| ビルド | Vite |
| スタイリング | Tailwind CSS |
| 状態管理 | Zustand |
| デスクトップ | Electron + electron-builder |

---

## 📚 関連ドキュメント

| ドキュメント | 内容 |
|-------------|------|
| **[WORKFLOW.md](./WORKFLOW.md)** | 共同開発の基本ルール（最初に読む） |
| [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) | 開発手順、優先順位、チェックリスト |
| [COLLABORATION_GUIDE.md](./COLLABORATION_GUIDE.md) | 詳細な並行開発ルール |
| [TASK_ASSIGNMENTS.md](./TASK_ASSIGNMENTS.md) | タスク担当状況 |

---

## 📈 ファイル規模

```
主要ファイル TOP 5:
────────────────────
1. gameStore.ts        15,769行  状態管理の中核
2. index.css            7,644行  グローバルスタイル
3. App.tsx              3,362行  画面マッピング
4. shion/main.ts        1,141行  最大のシナリオ
5. ikemen/lucia.ts        989行  ルシアシナリオ
```

---

*最終更新: 2025年2月*
