import { useCafeStore } from '@/store';
import { MoneyDisplay } from '@/components/common';

export function DailySummaryMini() {
  const { todayStats } = useCafeStore();
  const { customers, sales, ikemenVisits } = todayStats;

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-soft border border-fairy-pink-100">
      <div className="flex items-center justify-around gap-4">
        {/* 本日売上 */}
        <div className="flex items-center gap-2">
          <span className="text-gray-500 text-sm">本日売上:</span>
          <MoneyDisplay amount={sales} size="md" />
        </div>

        {/* 区切り線 */}
        <div className="w-px h-6 bg-gray-200" />

        {/* 来客数 */}
        <div className="flex items-center gap-2">
          <span className="text-gray-500 text-sm">来客:</span>
          <span className="font-bold text-gray-800">{customers}人</span>
        </div>

        {/* 区切り線 */}
        <div className="w-px h-6 bg-gray-200" />

        {/* イケメン来店 */}
        <div className="flex items-center gap-2">
          <span className="text-gray-500 text-sm">🧚‍♂️:</span>
          <span className="font-bold text-fairy-pink-500">
            {ikemenVisits.length}人
          </span>
        </div>
      </div>
    </div>
  );
}
