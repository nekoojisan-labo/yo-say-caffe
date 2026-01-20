import { useGameStore } from '@/store';
import { MoneyDisplay } from './MoneyDisplay';

interface HeaderProps {
  showSettings?: boolean;
  onSettingsClick?: () => void;
}

export function Header({ showSettings = true, onSettingsClick }: HeaderProps) {
  const { day, money, shopRank } = useGameStore();
  const setScreen = useGameStore((state) => state.setScreen);

  const handleSettingsClick = () => {
    if (onSettingsClick) {
      onSettingsClick();
    } else {
      setScreen('settings');
    }
  };

  return (
    <header className="w-full h-14 bg-white/90 backdrop-blur-sm border-b border-fairy-pink-200 shadow-soft px-4 flex items-center justify-between">
      <div className="flex items-center gap-6">
        {/* 所持金 */}
        <div className="flex items-center gap-2">
          <span className="text-lg">💰</span>
          <MoneyDisplay amount={money} />
        </div>

        {/* 日数 */}
        <div className="flex items-center gap-2">
          <span className="text-lg">📅</span>
          <span className="font-medium text-gray-700">Day {day}</span>
        </div>

        {/* 店舗ランク */}
        <div className="flex items-center gap-2">
          <span className="text-lg">⭐</span>
          <span className="font-medium text-gray-700">
            Rank: <span className="text-fairy-pink-500 font-bold">{shopRank}</span>
          </span>
        </div>
      </div>

      {/* 設定ボタン */}
      {showSettings && (
        <button
          onClick={handleSettingsClick}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-fairy-lavender-100 hover:bg-fairy-lavender-200 transition-colors"
          aria-label="設定"
        >
          <span className="text-xl">⚙️</span>
        </button>
      )}
    </header>
  );
}
