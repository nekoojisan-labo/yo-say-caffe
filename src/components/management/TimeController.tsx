import { Button } from '@/components/common';
import { formatTime, TIME_SETTINGS } from '@/store/cafeStore';

interface TimeControllerProps {
  currentTime: number;
  isOpen: boolean;
  isPaused: boolean;
  speed: 1 | 2 | 4;
  mode: 'auto' | 'manual';
  onTogglePause: () => void;
  onSetSpeed: (speed: 1 | 2 | 4) => void;
  onSetMode: (mode: 'auto' | 'manual') => void;
  onOrder: () => void;
  onEndDay: () => void;
}

export function TimeController({
  currentTime,
  isOpen,
  isPaused,
  speed,
  mode,
  onTogglePause,
  onSetSpeed,
  onSetMode,
  onOrder,
  onEndDay,
}: TimeControllerProps) {
  const progress =
    ((currentTime - TIME_SETTINGS.START_TIME) /
      (TIME_SETTINGS.END_TIME - TIME_SETTINGS.START_TIME)) *
    100;

  const isEndOfDay = currentTime >= TIME_SETTINGS.END_TIME;

  return (
    <div className="space-y-3">
      {/* 時刻表示とプログレスバー */}
      <div className="flex items-center gap-4">
        {/* 現在時刻 */}
        <div className="flex items-center gap-2 min-w-[100px]">
          <span className="text-xl">⏰</span>
          <span className="text-2xl font-bold text-gray-800">
            {formatTime(currentTime)}
          </span>
        </div>

        {/* プログレスバー */}
        <div className="flex-1">
          <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-fairy-pink-200 to-fairy-pink-300 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
            {/* 時間帯マーカー */}
            <div className="absolute inset-0 flex justify-between px-1">
              <TimeMarker label="9:00" position={0} />
              <TimeMarker label="12:00" position={25} />
              <TimeMarker label="15:00" position={50} />
              <TimeMarker label="18:00" position={75} />
              <TimeMarker label="21:00" position={100} />
            </div>
          </div>
        </div>

        {/* 閉店時刻 */}
        <span className="text-sm text-gray-500">
          閉店 {formatTime(TIME_SETTINGS.END_TIME)}
        </span>
      </div>

      {/* コントロールボタン */}
      <div className="flex items-center justify-between">
        {/* 左: 再生コントロール */}
        <div className="flex items-center gap-2">
          {/* 一時停止/再生 */}
          <Button
            variant={isPaused ? 'primary' : 'secondary'}
            size="sm"
            onClick={onTogglePause}
            disabled={isEndOfDay}
          >
            {isPaused ? '▶ 再生' : '⏸ 停止'}
          </Button>

          {/* 速度選択 */}
          <div className="flex items-center bg-fairy-lavender-100 rounded-lg p-1">
            {([1, 2, 4] as const).map((s) => (
              <button
                key={s}
                onClick={() => onSetSpeed(s)}
                className={`
                  px-3 py-1 rounded-md text-sm font-medium transition-all
                  ${
                    speed === s
                      ? 'bg-white shadow-soft text-fairy-pink-500'
                      : 'text-gray-500 hover:text-gray-700'
                  }
                `}
                disabled={isEndOfDay}
              >
                {s === 1 ? '×1' : s === 2 ? '×2' : '×4'}
              </button>
            ))}
          </div>

          {/* モード切替 */}
          <div className="flex items-center bg-fairy-lavender-100 rounded-lg p-1 ml-2">
            <button
              onClick={() => onSetMode('auto')}
              className={`
                px-3 py-1 rounded-md text-sm font-medium transition-all
                ${
                  mode === 'auto'
                    ? 'bg-white shadow-soft text-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }
              `}
            >
              🤖 オート
            </button>
            <button
              onClick={() => onSetMode('manual')}
              className={`
                px-3 py-1 rounded-md text-sm font-medium transition-all
                ${
                  mode === 'manual'
                    ? 'bg-white shadow-soft text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }
              `}
            >
              👆 手動
            </button>
          </div>
        </div>

        {/* 右: アクションボタン */}
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={onOrder}>
            📦 発注
          </Button>
          <Button
            variant={isEndOfDay ? 'primary' : 'ghost'}
            size="sm"
            onClick={onEndDay}
          >
            🔚 営業終了
          </Button>
        </div>
      </div>
    </div>
  );
}

function TimeMarker({ label, position }: { label: string; position: number }) {
  return (
    <div
      className="absolute top-full mt-1 text-[10px] text-gray-400 -translate-x-1/2"
      style={{ left: `${position}%` }}
    >
      {label}
    </div>
  );
}
