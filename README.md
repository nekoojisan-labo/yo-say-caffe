# yo-say-caffe
妖精カフェ物語

## ドキュメント
- [開発手順書](docs/DEVELOPMENT_GUIDE.md) - 開発の進め方、優先順位、チェックリスト

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
