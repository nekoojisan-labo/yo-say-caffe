import { useGameStore } from '@/store';
import { TUTORIAL_FLAGS } from '@/game/scenarios/tutorial';

interface TutorialOverlayProps {
  targetArea?: 'procurement' | 'operation' | 'result' | 'protagonist' | 'cafe-open';
}

export function TutorialOverlay({ targetArea }: TutorialOverlayProps) {
  const { scenarioFlags, day, tutorialCompleted } = useGameStore();

  // チュートリアル完了後は表示しない
  if (tutorialCompleted || day > 3) return null;

  // 現在のチュートリアル状態に応じたメッセージ
  const getMessage = (): { title: string; message: string; show: boolean } | null => {
    // Day 1: 仕入れ
    if (
      targetArea === 'procurement' &&
      scenarioFlags[TUTORIAL_FLAGS.PROCUREMENT_INTRO] &&
      !scenarioFlags[TUTORIAL_FLAGS.PROCUREMENT_DONE]
    ) {
      return {
        title: '仕入れをしましょう',
        message: 'メニューを選んで発注数を決めてください。\n最初は少なめがおすすめです。',
        show: true,
      };
    }

    // Day 1: 営業開始
    if (
      targetArea === 'cafe-open' &&
      scenarioFlags[TUTORIAL_FLAGS.OPERATION_INTRO] &&
      !scenarioFlags[TUTORIAL_FLAGS.OPERATION_DONE]
    ) {
      return {
        title: 'お店を開けましょう',
        message: '「CAFE OPEN」ボタンを押して\n営業を開始しましょう！',
        show: true,
      };
    }

    // Day 2: 照覧の魔法
    if (
      targetArea === 'protagonist' &&
      scenarioFlags[TUTORIAL_FLAGS.SHOURAN_INTRO] &&
      !scenarioFlags[TUTORIAL_FLAGS.SHOURAN_DONE]
    ) {
      return {
        title: '照覧の魔法',
        message: '「主人公」タブをタップして\nあなたのステータスを確認しましょう。',
        show: true,
      };
    }

    return null;
  };

  const content = getMessage();
  if (!content || !content.show) return null;

  return (
    <div className="absolute inset-0 z-40 pointer-events-none">
      {/* 半透明オーバーレイ */}
      <div className="absolute inset-0 bg-black/30" />

      {/* ヒントボックス */}
      <div
        className="absolute bottom-24 left-1/2 transform -translate-x-1/2 
                   bg-gradient-to-br from-purple-900/95 to-indigo-900/95 
                   rounded-xl p-4 max-w-xs shadow-2xl pointer-events-auto
                   border-2 border-yellow-400/50"
        style={{
          animation: 'pulse 2s ease-in-out infinite',
        }}
      >
        {/* 矢印 */}
        <div
          className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 
                      w-0 h-0 border-l-8 border-r-8 border-t-8 
                      border-l-transparent border-r-transparent border-t-yellow-400/50"
        />

        <h3 className="text-yellow-300 font-bold text-lg mb-2 flex items-center gap-2">
          <span className="text-xl">💡</span>
          {content.title}
        </h3>
        <p className="text-white/90 text-sm whitespace-pre-wrap leading-relaxed">
          {content.message}
        </p>
      </div>

      {/* ターゲットエリアのハイライト */}
      {targetArea && (
        <style>{`
          [data-tutorial-target="${targetArea}"] {
            position: relative;
            z-index: 50;
            animation: tutorial-highlight 1.5s ease-in-out infinite;
          }
          
          @keyframes tutorial-highlight {
            0%, 100% {
              box-shadow: 0 0 0 4px rgba(255, 215, 0, 0.5);
            }
            50% {
              box-shadow: 0 0 0 8px rgba(255, 215, 0, 0.3);
            }
          }
        `}</style>
      )}
    </div>
  );
}

// ===== チュートリアル進行ヘルパーコンポーネント =====
export function TutorialProgressIndicator() {
  const { day, scenarioFlags, tutorialCompleted } = useGameStore();

  if (tutorialCompleted || day > 3) return null;

  // 進行状況を計算
  const getProgress = (): { current: number; total: number; label: string } => {
    const total = 6; // 全チュートリアルステップ数
    let current = 0;

    if (scenarioFlags[TUTORIAL_FLAGS.PROLOGUE_COMPLETE]) current++;
    if (scenarioFlags[TUTORIAL_FLAGS.DAY1_COMPLETE]) current++;
    if (scenarioFlags[TUTORIAL_FLAGS.SHOURAN_INTRO]) current++;
    if (scenarioFlags[TUTORIAL_FLAGS.SHOURAN_DONE]) current++;
    if (scenarioFlags[TUTORIAL_FLAGS.DAY2_COMPLETE]) current++;
    if (scenarioFlags[TUTORIAL_FLAGS.TUTORIAL_COMPLETE]) current++;

    const labels = [
      'プロローグ',
      'Day 1: 仕入れ・営業',
      'Day 2: 照覧の魔法',
      'Day 2: 仕入れのコツ',
      'Day 3: 仕上げ',
      'チュートリアル完了',
    ];

    return {
      current,
      total,
      label: labels[Math.min(current, labels.length - 1)],
    };
  };

  const progress = getProgress();

  return (
    <div className="fixed top-16 left-4 z-30 bg-black/50 rounded-lg p-2 text-xs">
      <div className="text-yellow-300 font-bold mb-1">
        チュートリアル進行中
      </div>
      <div className="text-white/80 mb-1">{progress.label}</div>
      <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-500"
          style={{ width: `${(progress.current / progress.total) * 100}%` }}
        />
      </div>
      <div className="text-white/60 text-right mt-1">
        {progress.current}/{progress.total}
      </div>
    </div>
  );
}
