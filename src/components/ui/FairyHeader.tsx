import { CoinIcon, SettingsIcon } from '@/components/icons';

interface FairyHeaderProps {
  title: string;
  gold: number;
  onSettings?: () => void;
}

export function FairyHeader({ title, gold, onSettings }: FairyHeaderProps) {
  return (
    <header
      className="fixed inset-x-0 top-0 z-40 border-b backdrop-blur-md"
      style={{
        background: 'var(--theme-nav-bg)',
        borderBottomColor: 'var(--theme-nav-border)',
      }}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4">
        <h1
          className="text-lg font-black tracking-wide sm:text-xl"
          style={{ color: 'var(--theme-text)' }}
        >
          {title}
        </h1>

        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2 rounded-full border px-3 py-1.5 backdrop-blur-sm"
            style={{
              background: 'var(--theme-card-bg)',
              borderColor: 'var(--theme-card-border)',
              color: 'var(--theme-text)',
            }}
          >
            <CoinIcon size={18} color="currentColor" />
            <span className="text-sm font-bold tabular-nums sm:text-base">
              {gold.toLocaleString()}
            </span>
          </div>

          <button
            type="button"
            onClick={onSettings}
            className="flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 hover:scale-105 hover:brightness-125"
            style={{
              background: 'var(--theme-card-bg)',
              borderColor: 'var(--theme-card-border)',
              color: 'var(--theme-text)',
            }}
            aria-label="Settings"
          >
            <SettingsIcon size={18} color="currentColor" />
          </button>
        </div>
      </div>
    </header>
  );
}
