import { ReactNode } from 'react';
import {
  BoxIcon,
  CalendarIcon,
  CoffeeIcon,
  SparkleIcon,
  StarIcon,
} from '@/components/icons';
import {
  FairyButton,
  FairyCard,
  FairyHeader,
  FairyNavBar,
} from '@/components/ui';
import { useGameTheme } from '@/hooks/useGameTheme';
import { useGameStore, useInventoryStore } from '@/store';

export function HomeScreen() {
  useGameTheme();

  const { day, money, reputation, shopRank, glamor, setScreen } = useGameStore();
  const { inventory } = useInventoryStore();

  const totalStock = Object.values(inventory).reduce((sum, item) => sum + item.stock, 0);
  const dayNames = ['月', '火', '水', '木', '金', '土', '日'];
  const dayOfWeek = dayNames[(day - 1) % 7];
  const glamorStability = glamor.stability ?? 0;

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        background: 'var(--theme-bg)',
        color: 'var(--theme-text)',
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),_transparent_36%)]" />
        <div className="absolute -left-24 top-24 h-64 w-64 rounded-full bg-pink-300/10 blur-3xl" />
        <div className="absolute right-[-4rem] top-1/3 h-72 w-72 rounded-full bg-violet-300/10 blur-3xl" />
        <div className="absolute bottom-20 left-1/4 h-48 w-48 rounded-full bg-sky-300/10 blur-3xl" />
      </div>

      <FairyHeader
        title="妖精カフェ物語"
        gold={money}
        onSettings={() => setScreen('settings')}
      />

      <main className="relative z-10 mx-auto flex h-full w-full max-w-5xl flex-col overflow-y-auto px-4 pb-28 pt-20 sm:px-6">
        <section className="grid grid-cols-2 gap-3 pt-4 sm:gap-4">
          <StatusCard
            icon={<CalendarIcon size={22} color="currentColor" />}
            label="日付"
            value={`${day}日目`}
            subtext={`${dayOfWeek}曜日`}
          />
          <StatusCard
            icon={<StarIcon size={22} color="currentColor" />}
            label="ランク"
            value={shopRank}
            subtext={`評判 ${reputation}`}
          />
          <StatusCard
            icon={<SparkleIcon size={22} color="currentColor" />}
            label="幻装"
            value={`Lv.${glamor.level}`}
            subtext={`安定度 ${glamorStability}%`}
          />
          <StatusCard
            icon={<BoxIcon size={22} color="currentColor" />}
            label="在庫"
            value={`${totalStock}個`}
            subtext="営業準備OK"
          />
        </section>

        <section className="flex flex-1 flex-col items-center justify-center py-10 sm:py-14">
          <div className="mb-8 w-full max-w-md">
            <FairyCard className="relative overflow-hidden px-5 py-8 sm:px-8 sm:py-10">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_45%)]" />
              <div className="relative flex flex-col items-center gap-5 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-[0_0_30px_rgba(255,255,255,0.12)]">
                  <CoffeeIcon size={36} color="currentColor" />
                </div>
                <FairyButton
                  variant="primary"
                  onClick={() => setScreen('cafe')}
                  className="w-[80%] justify-center gap-3 py-4 text-xl font-black sm:text-2xl"
                >
                  <CoffeeIcon size={24} color="currentColor" />
                  <span>営業開始</span>
                </FairyButton>
                <p
                  className="text-sm font-medium sm:text-base"
                  style={{ color: 'var(--theme-text)' }}
                >
                  仕入れをして、カフェを営業しよう！
                </p>
              </div>
            </FairyCard>
          </div>
          <div className="grid w-full max-w-3xl gap-3 sm:grid-cols-3">
            <MiniHint title="今日の目標" value="お客様を迎える準備を整える" />
            <MiniHint title="カフェランク" value={`${shopRank} / 評判 ${reputation}`} />
            <MiniHint title="幻装状態" value={`Lv.${glamor.level} / 安定度 ${glamorStability}%`} />
          </div>
        </section>
      </main>

      <FairyNavBar currentScreen="home" onNavigate={setScreen} />
    </div>
  );
}

function StatusCard({
  icon,
  label,
  value,
  subtext,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  subtext: string;
}) {
  return (
    <FairyCard className="min-h-[132px] p-4">
      <div className="mb-3 flex items-center gap-2" style={{ color: 'var(--theme-text)' }}>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/10">
          {icon}
        </div>
        <span className="text-xs font-semibold tracking-wide opacity-70">{label}</span>
      </div>
      <p className="text-xl font-black sm:text-2xl" style={{ color: 'var(--theme-text)' }}>
        {value}
      </p>
      <p className="mt-1 text-xs opacity-75 sm:text-sm" style={{ color: 'var(--theme-text)' }}>
        {subtext}
      </p>
    </FairyCard>
  );
}

function MiniHint({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <FairyCard className="p-4">
      <p className="text-xs font-semibold tracking-wide opacity-70" style={{ color: 'var(--theme-text)' }}>
        {title}
      </p>
      <p className="mt-1 text-sm font-medium" style={{ color: 'var(--theme-text)' }}>
        {value}
      </p>
    </FairyCard>
  );
}
