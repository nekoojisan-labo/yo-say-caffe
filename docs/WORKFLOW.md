# 🧚 妖精カフェ物語 - 共同開発ルール

> **このドキュメントを読めば、誰でもすぐに開発に参加できます**

---

## 📌 30秒でわかる開発フロー

```
あなたの作業ブランチ    develop(統合)      main(本番)
       │                    │                 │
       │  ① 作業完了        │                 │
       ├──────PR──────────→│                 │
       │                    │  ② まとまったら │
       │                    ├───────PR──────→│
       │                    │                 │
                         AI同士で            nekoojisan
                         マージOK            がレビュー
```

---

## 🌳 ブランチ構造

```
main (本番)
 │
 └── develop (AI作業の統合先)
      │
      ├── claude/xxx (Claude Code の作業)
      │
      └── codex/xxx  (Codex/他AIの作業)
```

| ブランチ | 用途 | マージ権限 |
|---------|------|-----------|
| `main` | 安定版・リリース用 | **nekoojisanのみ** |
| `develop` | AI作業の統合 | AI同士でOK |
| `claude/*`, `codex/*` | 各AIの作業用 | 本人のみ |

---

## 🔄 作業の流れ

### Step 1: 作業開始
```bash
# developから最新を取得
git fetch origin develop
git checkout -b claude/あなたのタスク名 origin/develop
```

### Step 2: 作業中
- こまめにコミット（1機能 = 1コミット）
- 共有ファイル（types/index.ts等）を編集したら即push

### Step 3: 作業完了
```bash
# developへPR作成
git push -u origin claude/あなたのタスク名
# → GitHub/GitLabでPR作成
```

### Step 4: マージ
- **develop へのマージ**: AI同士で確認してマージ
- **main へのマージ**: nekoojisanがレビュー後にマージ

---

## 📁 担当領域（コンフリクト防止）

### 原則: **1ファイル = 1担当者**

```
src/
├── components/
│   ├── scenario/*      ← UI担当AI
│   ├── gallery/*       ← UI担当AI
│   └── common/*        ← 共有（追記のみ）
│
├── data/
│   └── events/*        ← データ担当AI
│
├── game/
│   └── scenarios/*     ← シナリオ担当AI
│
├── store/*             ← 共有（要相談）
├── types/*             ← 共有（追記のみ）
│
public/assets/          ← 人間（nekoojisan）
```

### 共有ファイルのルール

| ファイル | ルール |
|---------|--------|
| `src/types/index.ts` | **追記のみ**、既存を変更しない |
| `src/App.tsx` | **追記のみ**、編集後すぐpush |
| `src/store/*.ts` | 拡張時は他のAIに通知 |
| `package.json` | 依存追加時は他に通知 |

---

## 🚫 やってはいけないこと

| NG | 理由 |
|----|------|
| ❌ 他の人が担当中のファイルを編集 | コンフリクト発生 |
| ❌ developに直接push | レビューなしは危険 |
| ❌ mainに直接push | 絶対NG |
| ❌ 既存の型定義を変更 | 全体に影響する |
| ❌ force push | 履歴が壊れる |

---

## ✅ 作業前チェックリスト

```
□ developから最新をpullした
□ 担当ファイルがTASK_ASSIGNMENTS.mdに記録されている
□ 他の人が同じファイルを触っていない
□ ブランチ名が claude/xxx または codex/xxx 形式
```

---

## 💬 通知が必要な場面

| 場面 | 通知内容 |
|------|---------|
| 作業開始時 | 「○○を担当します」 |
| 共有ファイル編集時 | 「types/index.ts に△△を追加しました」 |
| PR作成時 | 「○○のPRを出しました、レビューお願いします」 |
| 大きな設計変更時 | 事前に相談 |

---

## 📋 現在の担当状況

**→ [TASK_ASSIGNMENTS.md](./TASK_ASSIGNMENTS.md) を確認**

---

## 🛠️ よく使うコマンド

```bash
# 開発サーバー起動
npm run dev

# 型チェック
npm run type-check

# lint
npm run lint

# デスクトップ版ビルド
npm run electron:build:win   # Windows
npm run electron:build:mac   # Mac
npm run electron:build:linux # Linux
```

---

## ❓ 困ったら

1. **コンフリクトが起きた** → 相手のAIに相談、どちらの変更を優先するか決める
2. **どのファイルを触ればいいかわからない** → DEVELOPMENT_GUIDE.md を確認
3. **担当が被った** → TASK_ASSIGNMENTS.md を確認して調整

---

## 📚 関連ドキュメント

| ドキュメント | 内容 |
|-------------|------|
| [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) | 開発手順、優先順位、チェックリスト |
| [TASK_ASSIGNMENTS.md](./TASK_ASSIGNMENTS.md) | 誰が何を担当しているか |
| [COLLABORATION_GUIDE.md](./COLLABORATION_GUIDE.md) | 詳細な共同開発ルール |
