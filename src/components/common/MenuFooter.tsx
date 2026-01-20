import { useGameStore } from '@/store';
import type { ScreenType } from '@/types';

interface MenuItemConfig {
  id: ScreenType;
  icon: string;
  label: string;
}

const MENU_ITEMS: MenuItemConfig[] = [
  { id: 'cafe', icon: '☕', label: '営業' },
  { id: 'management', icon: '📊', label: '経営' },
  { id: 'menu-dev', icon: '📝', label: '開発' },
  { id: 'interior', icon: '🏠', label: '内装' },
  { id: 'protagonist', icon: '👧', label: '主人公' },
  { id: 'ikemen-list', icon: '💕', label: '図鑑' },
  { id: 'save', icon: '💾', label: 'セーブ' },
];

interface MenuFooterProps {
  className?: string;
}

export function MenuFooter({ className = '' }: MenuFooterProps) {
  const currentScreen = useGameStore((state) => state.currentScreen);
  const setScreen = useGameStore((state) => state.setScreen);

  return (
    <footer
      className={`
        w-full h-16 bg-white/95 backdrop-blur-sm
        border-t border-fairy-pink-100 shadow-soft
        flex items-center justify-around px-2
        ${className}
      `}
    >
      {MENU_ITEMS.map((item) => (
        <MenuButton
          key={item.id}
          icon={item.icon}
          label={item.label}
          isActive={currentScreen === item.id}
          onClick={() => setScreen(item.id)}
        />
      ))}
    </footer>
  );
}

interface MenuButtonProps {
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
}

function MenuButton({ icon, label, isActive, onClick, disabled }: MenuButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex flex-col items-center justify-center
        w-14 h-14 rounded-xl
        transition-all duration-200
        ${
          isActive
            ? 'bg-fairy-pink-100 text-fairy-pink-500 scale-105'
            : 'text-gray-500 hover:bg-fairy-pink-50 hover:text-fairy-pink-400'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-[10px] font-medium mt-0.5">{label}</span>
    </button>
  );
}

// コンパクト版（特定の画面用）
interface CompactMenuFooterProps {
  items: MenuItemConfig[];
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  className?: string;
}

export function CompactMenuFooter({
  items,
  currentScreen,
  onNavigate,
  className = '',
}: CompactMenuFooterProps) {
  return (
    <div
      className={`
        flex items-center justify-center gap-2 p-2
        bg-white/90 rounded-xl shadow-soft
        ${className}
      `}
    >
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`
            flex items-center gap-1.5 px-3 py-2 rounded-lg
            transition-all duration-200 text-sm font-medium
            ${
              currentScreen === item.id
                ? 'bg-fairy-pink-200 text-white'
                : 'bg-fairy-lavender-100 text-gray-600 hover:bg-fairy-lavender-200'
            }
          `}
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}
