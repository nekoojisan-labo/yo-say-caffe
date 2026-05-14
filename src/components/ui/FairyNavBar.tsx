import { ComponentType } from 'react';
import {
  BookIcon,
  ChartIcon,
  DevIcon,
  HomeIcon,
  PersonIcon,
  SaveIcon,
  IconProps,
} from '@/components/icons';
import { ScreenType } from '@/types';

interface FairyNavBarProps {
  onNavigate: (screen: ScreenType) => void;
  currentScreen: ScreenType;
}

const navItems: Array<{
  screen: ScreenType;
  label: string;
  Icon: ComponentType<IconProps>;
}> = [
  { screen: 'menu-dev', label: '開発', Icon: DevIcon },
  { screen: 'interior', label: '内装', Icon: HomeIcon },
  { screen: 'ikemen-list', label: '図鑑', Icon: BookIcon },
  { screen: 'protagonist', label: '主人公', Icon: PersonIcon },
  { screen: 'save', label: 'セーブ', Icon: SaveIcon },
  { screen: 'management', label: '経営', Icon: ChartIcon },
];

export function FairyNavBar({
  onNavigate,
  currentScreen,
}: FairyNavBarProps) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t backdrop-blur-md"
      style={{
        background: 'var(--theme-nav-bg)',
        borderTopColor: 'var(--theme-nav-border)',
      }}
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-6 gap-2 px-3 py-2">
        {navItems.map(({ screen, label, Icon }) => {
          const isActive = currentScreen === screen;

          return (
            <button
              key={screen}
              type="button"
              onClick={() => onNavigate(screen)}
              className="flex min-h-[64px] flex-col items-center justify-center gap-1 rounded-2xl border text-xs font-semibold transition-all duration-200 hover:scale-105 hover:brightness-125"
              style={{
                background: isActive ? 'var(--theme-card-bg)' : 'transparent',
                borderColor: isActive ? 'var(--theme-card-border)' : 'transparent',
                color: 'var(--theme-text)',
                boxShadow: isActive ? '0 0 18px rgba(255,255,255,0.12)' : 'none',
              }}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={20} color="currentColor" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
