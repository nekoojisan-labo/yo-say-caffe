# AGENTS.md

## プロジェクト概要
妖精カフェ（yo-say-caffe）は恋愛×店舗経営シミュレーションゲーム。
Electronデスクトップアプリとして開発中。

## 技術スタック
- 言語: TypeScript
- UI: React + Tailwind CSS
- ビルド: Vite
- 状態管理: Zustand
- デスクトップ: Electron

## ディレクトリ構成
- electron/ - Electronメインプロセス・プリロード
- src/main.tsx - アプリのエントリーポイント
- src/App.tsx - ルートコンポーネント
- src/components/common/ - 共通UIコンポーネント
- src/components/common/screens/ - 画面コンポーネント
- src/components/layout/ - レイアウト系コンポーネント
- src/store/ - Zustandストア（ゲーム状態・在庫・通知など）
- src/game/ - ゲームロジック・シナリオ・イベントテンプレート
- src/game/characters.ts - 全キャラクター定義（IkemenCharacter, SpecialCharacter）
- src/game/scenarios/ - シナリオファイル（プロローグ・キャラ別・イベント別）
- src/game/eventTemplates/ - デイリーイベントテンプレート
- src/data/ - マスターデータ（ikemenData, cgData, eventData等）
- src/types/index.ts - 型定義
- src/utils/ - ユーティリティ関数
- src/assets/images/ - 画像アセット
- saves/ - セーブデータ

## 開発コマンド
- 依存インストール: npm install
- 開発サーバー: npm run dev
- ビルド: npm run build
- 型チェック: npx tsc --noEmit

## キャラクター追加時に触るファイル
1. src/types/index.ts - IkemenId に新IDを追加
2. src/game/characters.ts - IKEMEN_CHARACTERS に定義追加
3. src/data/ikemenData.ts - IKEMEN_MASTER_DATA に追加
4. src/data/cgData.ts - CG定義追加
5. src/data/eventData.ts - イベントシーン追加
6. src/game/scenarios/ikemen/（新キャラ名）.ts - 恋愛シナリオ
7. src/game/scenarios/events/（新キャラ名）.ts - イベントシナリオ
8. src/game/eventTemplates/daily.ts - デイリーイベント追加

## コーディング規約
- 日本語コメントOK
- コンポーネントは関数コンポーネント + hooks
- 状態管理はZustandストアを使用
- ゲームロジックは src/game/ に集約
- マスターデータは src/data/ に集約
- キャラIDは小文字英字（例: lucia, soma, shion）

## 開発フロー
- mainブランチ: nekoojisan が管理。直接pushしない
- feature/goro-port: goro担当の作業ブランチ
- 作業完了後はPRを作成してレビューを受ける
- コミットメッセージは日本語OK

## 注意事項
- ソウマのIDは 'soma'（'souma' ではない）
- シオン(shion)はbaseVisitChance: 100の常駐キャラ
- 特殊キャラ（zephyros, rosa）は恋愛対象外
