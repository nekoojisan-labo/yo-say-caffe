# yo-say-caffe
妖精カフェ物語

## ドキュメント
- **[ワークフロー](docs/WORKFLOW.md)** - 🌟 最初に読む！共同開発の基本ルール
- [開発手順書](docs/DEVELOPMENT_GUIDE.md) - 開発の進め方、優先順位、チェックリスト
- [共同開発ガイド](docs/COLLABORATION_GUIDE.md) - 詳細な並行開発ルール
- [タスク担当状況](docs/TASK_ASSIGNMENTS.md) - 誰が何を担当しているか

## Web版の動かし方
1. 依存関係をインストール: `npm install`
2. 開発サーバー起動: `npm run dev`
3. ブラウザで `http://localhost:5173` を開く

## デスクトップ版のビルド
```bash
# Windows
npm run electron:build:win

# Mac
npm run electron:build:mac

# Linux
npm run electron:build:linux
```
