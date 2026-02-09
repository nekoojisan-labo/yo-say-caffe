# 妖精カフェ物語 - 開発手順書

このドキュメントは、ゲーム開発の進め方、優先順位、各種ファイル作成の手順をまとめたものです。

---

## 目次

1. [現状サマリー](#1-現状サマリー)
2. [開発フェーズ概要](#2-開発フェーズ概要)
3. [Phase 1: 基盤整備](#3-phase-1-基盤整備)
4. [Phase 2: アセット準備](#4-phase-2-アセット準備)
5. [Phase 3: シナリオ・イベント実装](#5-phase-3-シナリオイベント実装)
6. [Phase 4: UI/UX実装](#6-phase-4-uiux実装)
7. [Phase 5: 統合・テスト](#7-phase-5-統合テスト)
8. [ファイル作成優先順位](#8-ファイル作成優先順位)
9. [命名規則・ルール](#9-命名規則ルール)
10. [チェックリスト](#10-チェックリスト)

---

## 1. 現状サマリー

### 完成済み（すぐに使える）

| 領域 | 完成度 | 詳細 |
|------|--------|------|
| 型定義 | 100% | `src/types/index.ts` - 全型定義完備 |
| 状態管理 | 100% | 9つのZustandストア実装済み |
| メニューデータ | 100% | 20種類以上のメニュー定義 |
| キャラマスター | 100% | 10人のイケメン妖精定義 |
| 内装データ | 100% | 席・装飾・設備 計20種類 |
| 経営画面UI | 90% | カフェ営業・発注・管理画面 |

### 未完成（これから作業が必要）

| 領域 | 完成度 | 必要な作業 |
|------|--------|-----------|
| イベントデータ | 30% | 3人分のみ → 全10人分必要 |
| アセット画像 | 0% | 立ち絵・背景・CG全て未配置 |
| 音声ファイル | 0% | BGM・SE未配置 |
| シナリオUI | 0% | イベント再生画面未実装 |
| ギャラリー | 0% | CG閲覧画面未実装 |

---

## 2. 開発フェーズ概要

```
┌─────────────────────────────────────────────────────────────────┐
│  Phase 1: 基盤整備（1-2日）                                      │
│  ├─ ディレクトリ構造の整理                                       │
│  ├─ 命名規則の統一（Charactor → characters）                     │
│  └─ プレースホルダー画像の準備                                   │
├─────────────────────────────────────────────────────────────────┤
│  Phase 2: アセット準備（並行作業可）                             │
│  ├─ キャラクター立ち絵（10人 × 表情差分）                        │
│  ├─ 背景画像（10-15枚）                                          │
│  ├─ CG画像（20枚）                                               │
│  └─ BGM/SE（11トラック + 13効果音）                              │
├─────────────────────────────────────────────────────────────────┤
│  Phase 3: シナリオ・イベント実装（コア作業）                     │
│  ├─ イベントデータ完成（残り7人分）                              │
│  ├─ シナリオテキスト執筆                                         │
│  └─ 分岐・選択肢設計                                             │
├─────────────────────────────────────────────────────────────────┤
│  Phase 4: UI/UX実装                                              │
│  ├─ シナリオ再生画面                                             │
│  ├─ キャラ詳細画面                                               │
│  ├─ ギャラリー画面                                               │
│  └─ 主人公カスタマイズ画面                                       │
├─────────────────────────────────────────────────────────────────┤
│  Phase 5: 統合・テスト                                           │
│  ├─ 全画面の動作確認                                             │
│  ├─ セーブ/ロードテスト                                          │
│  ├─ バランス調整                                                 │
│  └─ ビルド・配布準備                                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Phase 1: 基盤整備

### 3-1. ディレクトリ構造の整理

**現状の問題:**
- `Charactor` のスペルミス（正: `characters`）
- 画像ディレクトリが空

**作業手順:**

```bash
# 1. 正しいディレクトリ構造を作成
public/assets/
├── images/
│   ├── characters/          # キャラクター立ち絵
│   │   ├── lucia/
│   │   ├── kagerou/
│   │   ├── haruto/
│   │   ├── ren/
│   │   ├── mizuki/
│   │   ├── soma/
│   │   ├── yukito/
│   │   ├── riku/
│   │   ├── aoi/
│   │   └── shion/
│   ├── backgrounds/         # 背景画像
│   ├── cgs/                 # イベントCG
│   ├── ui/                  # UIパーツ
│   └── items/               # アイテム・メニューアイコン
├── audio/
│   ├── bgm/                 # BGM
│   └── se/                  # 効果音
└── fonts/                   # カスタムフォント（任意）
```

### 3-2. 必要なコマンド

```bash
# ディレクトリ作成
mkdir -p public/assets/images/characters/{lucia,kagerou,haruto,ren,mizuki,soma,yukito,riku,aoi,shion}
mkdir -p public/assets/images/{backgrounds,cgs,ui,items}
mkdir -p public/assets/audio/{bgm,se}

# 古いディレクトリを削除（必要に応じて）
rm -rf public/assets/Charactor
rm -rf public/assets/images/Charactor
```

### 3-3. ImagePlaceholder の確認

`src/components/common/ImagePlaceholder.tsx` が以下のパスを参照しているか確認:

```typescript
// キャラクター
`/assets/images/characters/${characterId}/${expression}.png`

// 背景
`/assets/images/backgrounds/${backgroundId}.png`

// CG
`/assets/images/cgs/${cgId}.png`
```

---

## 4. Phase 2: アセット準備

### 4-1. キャラクター立ち絵

**必要ファイル一覧:**

| キャラID | 必須表情 | 追加表情（推奨） |
|----------|----------|-----------------|
| lucia | normal, smile | gentle, sad, surprised, angry |
| kagerou | normal, smile | cool, mysterious, rare_smile |
| haruto | normal, smile | energetic, surprised, shy |
| ren | normal, smile | gentle, serious, blush |
| mizuki | normal, smile | elegant, sad, surprised |
| soma | normal, smile | cool, thinking, rare_emotion |
| yukito | normal, smile | gentle, sad, hopeful |
| riku | normal, smile | energetic, confused, determined |
| aoi | normal, smile | calm, curious, gentle |
| shion | normal, smile | mysterious, playful, serious |

**ファイル配置例:**
```
public/assets/images/characters/lucia/
├── normal.png
├── smile.png
├── gentle.png
├── sad.png
└── surprised.png
```

**推奨サイズ:** 800x1200px（透過PNG）

### 4-2. 背景画像

**必要な背景:**

| 背景ID | 説明 | 使用シーン |
|--------|------|-----------|
| cafe_interior | カフェ店内 | 日常・営業シーン |
| cafe_counter | カウンター周辺 | 接客シーン |
| garden | 中庭・テラス | デートイベント |
| kitchen | 厨房 | 料理イベント |
| sunset | 夕暮れの街並み | ロマンチックシーン |
| night | 夜の店内 | 夜イベント |
| park | 近くの公園 | 休日イベント |
| shopping_street | 商店街 | お出かけイベント |
| festival | お祭り会場 | 季節イベント |
| beach | 海辺 | 夏イベント |

**推奨サイズ:** 1920x1080px

### 4-3. CG画像

**CG一覧（cgData.ts より）:**

| cgId | キャラ | イベント |
|------|--------|---------|
| lucia_cg_01 | ルシア | 初めての笑顔 |
| lucia_cg_02 | ルシア | 月下の告白 |
| kagerou_cg_01 | カゲロウ | 影の中の真実 |
| kagerou_cg_02 | カゲロウ | 夜明けの約束 |
| ... | ... | ... |

**推奨サイズ:** 1920x1080px

### 4-4. 音声ファイル

**BGM（audioData.ts より）:**

| trackId | 説明 | 使用シーン |
|---------|------|-----------|
| title | タイトル曲 | タイトル画面 |
| cafe_morning | 朝のカフェ | 営業開始 |
| cafe_afternoon | 昼のカフェ | 営業中 |
| cafe_evening | 夕方のカフェ | 営業終盤 |
| event_happy | 楽しいイベント | コメディシーン |
| event_romantic | ロマンチック | 恋愛シーン |
| event_sad | 悲しいシーン | シリアスシーン |
| event_tension | 緊張シーン | 盛り上がり |
| result_good | 好結果 | 営業成功 |
| result_bad | 悪結果 | 営業失敗 |
| ending | エンディング | ED |

**SE:**
- click, cancel, coin, levelup, notification
- door_open, order, serve, success, fail
- affection_up, unlock, save

**推奨形式:** MP3 または OGG

---

## 5. Phase 3: シナリオ・イベント実装

### 5-1. イベントデータ構造

**ファイル:** `src/data/eventData.ts`

```typescript
// イベント定義の例
export const EVENT_DATA: GameEvent[] = [
  {
    id: 'lucia_01',
    ikemenId: 'lucia',
    title: '光の妖精との出会い',
    requiredAffection: 0,  // 解放条件
    hasCG: true,
    cgId: 'lucia_cg_01',
    scenes: [
      {
        id: 'lucia_01_01',
        background: 'cafe_interior',
        character: {
          id: 'lucia',
          expression: 'normal',
          position: 'center'
        },
        dialogue: {
          speaker: 'ルシア',
          text: 'ようこそ、妖精カフェへ。'
        }
      },
      // 続くシーン...
    ]
  }
];
```

### 5-2. イベント作成手順

1. **プロット作成**
   - 各キャラ2イベント（好感度0用、好感度MAX用）
   - 1イベント = 10-20シーン程度

2. **シーン詳細記述**
   ```
   シーン1: 背景[カフェ内], キャラ[ルシア/normal/center]
   台詞: 「ようこそ、妖精カフェへ」

   シーン2: 背景[同じ], キャラ[ルシア/smile/center]
   台詞: 「今日は何をお探しですか？」
   ```

3. **eventData.ts に追加**

4. **cgData.ts と整合性確認**

### 5-3. 未実装キャラのイベント

**優先度順:**

| 優先度 | キャラ | 理由 |
|--------|--------|------|
| 高 | ren | ランクE解放（早期に遭遇） |
| 高 | mizuki | ランクD解放 |
| 中 | soma | ランクC解放 |
| 中 | yukito | ランクB解放 |
| 中 | riku | ランクA解放 |
| 低 | aoi | ランクS解放 |
| 低 | shion | ランクS解放 |

---

## 6. Phase 4: UI/UX実装

### 6-1. 必要な新規コンポーネント

```
src/components/
├── scenario/                    # 【新規作成】
│   ├── ScenarioScreen.tsx      # シナリオ再生メイン
│   ├── BackgroundLayer.tsx     # 背景表示
│   ├── CharacterLayer.tsx      # 立ち絵表示
│   ├── DialogueBox.tsx         # 台詞ボックス
│   ├── ChoiceList.tsx          # 選択肢表示
│   └── index.ts
│
├── gallery/                     # 【新規作成】
│   ├── GalleryScreen.tsx       # ギャラリーメイン
│   ├── CGViewer.tsx            # CG拡大表示
│   └── index.ts
│
├── character/                   # 【新規作成】
│   ├── IkemenDetailScreen.tsx  # キャラ詳細
│   ├── AffectionMeter.tsx      # 好感度表示
│   └── index.ts
│
└── protagonist/                 # 【新規作成】
    ├── ProtagonistScreen.tsx   # 主人公画面
    ├── CustomizePanel.tsx      # カスタマイズUI
    └── index.ts
```

### 6-2. 実装順序

1. **ScenarioScreen**（最優先）
   - イベント再生の中核
   - 背景・キャラ・台詞の表示
   - クリックで次へ進む

2. **DialogueBox**
   - 話者名表示
   - テキスト表示（タイプライター効果推奨）

3. **ChoiceList**
   - 選択肢分岐対応

4. **GalleryScreen**
   - 解放済みCG一覧
   - クリックで拡大

5. **IkemenDetailScreen**
   - 好感度、プロフィール表示

---

## 7. Phase 5: 統合・テスト

### 7-1. テスト項目

**機能テスト:**
- [ ] タイトル → ゲーム開始の流れ
- [ ] 営業シミュレーション一連
- [ ] イベント発生 → 再生 → 完了
- [ ] セーブ/ロード
- [ ] 設定変更の永続化

**バランステスト:**
- [ ] 金銭バランス（破産しない/簡単すぎない）
- [ ] 好感度上昇速度
- [ ] ランクアップ難易度

**クロスプラットフォーム:**
- [ ] Web版（Chrome, Firefox, Safari）
- [ ] Electron版（Windows, Mac）

### 7-2. ビルドコマンド

```bash
# Web版
npm run build

# デスクトップ版
npm run electron:build:win    # Windows
npm run electron:build:mac    # Mac
npm run electron:build:linux  # Linux
```

---

## 8. ファイル作成優先順位

### 最優先（ゲームを動かすために必須）

| 順番 | ファイル/作業 | 理由 |
|------|--------------|------|
| 1 | ディレクトリ構造整理 | 全ての基盤 |
| 2 | プレースホルダー画像 | 画像なしでもUI確認可能に |
| 3 | ScenarioScreen.tsx | イベント再生のコア |
| 4 | 残りキャラのイベントデータ | ゲーム内容の本体 |

### 高優先（ゲーム体験に重要）

| 順番 | ファイル/作業 | 理由 |
|------|--------------|------|
| 5 | キャラ立ち絵（主要3人） | ビジュアル体験 |
| 6 | 背景画像（主要5枚） | 雰囲気作り |
| 7 | BGM（主要5曲） | 没入感 |
| 8 | GalleryScreen.tsx | やりこみ要素 |

### 中優先（完成度向上）

| 順番 | ファイル/作業 | 理由 |
|------|--------------|------|
| 9 | 残りキャラ立ち絵 | コンテンツ充実 |
| 10 | CG画像 | イベント報酬 |
| 11 | SE | フィードバック向上 |
| 12 | IkemenDetailScreen.tsx | キャラ愛着 |

### 低優先（あれば良い）

| 順番 | ファイル/作業 | 理由 |
|------|--------------|------|
| 13 | ProtagonistScreen.tsx | カスタマイズ |
| 14 | 追加イベント | リプレイ性 |
| 15 | 実績システム | やりこみ |

---

## 9. 命名規則・ルール

### ID命名規則

| 種類 | フォーマット | 例 |
|------|-------------|-----|
| キャラID | 英小文字 | `lucia`, `kagerou` |
| イベントID | `{キャラID}_{連番}` | `lucia_01`, `lucia_02` |
| シーンID | `{イベントID}_{連番}` | `lucia_01_01` |
| CG ID | `{キャラID}_cg_{連番}` | `lucia_cg_01` |
| 背景ID | 英小文字_スネーク | `cafe_interior` |
| BGM ID | 英小文字_スネーク | `cafe_morning` |
| SE ID | 英小文字_スネーク | `door_open` |

### ファイル命名規則

| 種類 | フォーマット | 例 |
|------|-------------|-----|
| 立ち絵 | `{expression}.png` | `smile.png` |
| 背景 | `{backgroundId}.png` | `cafe_interior.png` |
| CG | `{cgId}.png` | `lucia_cg_01.png` |
| BGM | `{trackId}.mp3` | `cafe_morning.mp3` |
| SE | `{soundId}.mp3` | `click.mp3` |

### コード規則

- コンポーネント: PascalCase (`ScenarioScreen.tsx`)
- フック: camelCase with `use` prefix (`useScenario.ts`)
- ストア: camelCase with `Store` suffix (`scenarioStore.ts`)
- 型: PascalCase (`GameEvent`, `EventScene`)

---

## 10. チェックリスト

### Phase 1 チェックリスト

- [ ] `public/assets/images/characters/` に10キャラ分のディレクトリ作成
- [ ] `public/assets/images/backgrounds/` ディレクトリ作成
- [ ] `public/assets/images/cgs/` ディレクトリ作成
- [ ] `public/assets/audio/bgm/` ディレクトリ作成
- [ ] `public/assets/audio/se/` ディレクトリ作成
- [ ] 古い `Charactor` ディレクトリ削除
- [ ] ImagePlaceholder のパス確認・修正

### Phase 2 チェックリスト

- [ ] プレースホルダー立ち絵（10キャラ × normal）
- [ ] プレースホルダー背景（5枚）
- [ ] 本番立ち絵（優先3キャラ）
- [ ] 本番背景（優先5枚）
- [ ] BGM（優先5曲）
- [ ] SE（優先5種）

### Phase 3 チェックリスト

- [ ] lucia イベント完成確認
- [ ] kagerou イベント完成確認
- [ ] haruto イベント完成確認
- [ ] ren イベント作成
- [ ] mizuki イベント作成
- [ ] soma イベント作成
- [ ] yukito イベント作成
- [ ] riku イベント作成
- [ ] aoi イベント作成
- [ ] shion イベント作成
- [ ] 全イベントとCG IDの整合性確認

### Phase 4 チェックリスト

- [ ] ScenarioScreen 実装
- [ ] DialogueBox 実装
- [ ] CharacterLayer 実装
- [ ] BackgroundLayer 実装
- [ ] ChoiceList 実装
- [ ] GalleryScreen 実装
- [ ] IkemenDetailScreen 実装
- [ ] App.tsx に新画面を統合

### Phase 5 チェックリスト

- [ ] 全画面の遷移テスト
- [ ] イベント再生テスト
- [ ] セーブ/ロードテスト
- [ ] Web版ビルド確認
- [ ] Electron版ビルド確認

---

## 付録: クイックスタート

今すぐ開発を始めるなら、以下の順序で進めてください：

```bash
# 1. ディレクトリ作成
mkdir -p public/assets/images/characters/{lucia,kagerou,haruto,ren,mizuki,soma,yukito,riku,aoi,shion}
mkdir -p public/assets/images/{backgrounds,cgs,ui}
mkdir -p public/assets/audio/{bgm,se}

# 2. 開発サーバー起動
npm run dev

# 3. ブラウザで確認
open http://localhost:5173
```

次に `src/components/scenario/ScenarioScreen.tsx` を作成し、イベント再生機能を実装します。
