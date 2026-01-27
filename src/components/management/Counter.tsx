import { useCafeStore } from '@/store';

interface CounterProps {
  onServe?: (customerId: string) => void;
}

export function Counter({ onServe: _onServe }: CounterProps) {
  const { mode, customers } = useCafeStore();

  // カウンターで待っている客
  const waitingCustomers = customers.filter(
    (c) => c.status === 'ordering' && !c.seatId
  );

  return (
    <div className="flex flex-col items-center gap-2">
      {/* カウンター */}
      <div className="relative">
        {/* カウンター台 */}
        <div className="w-64 h-4 bg-gradient-to-r from-amber-600 to-amber-700 rounded-t-lg shadow-md" />
        <div className="w-64 h-8 bg-gradient-to-r from-amber-700 to-amber-800 rounded-b-lg shadow-lg flex items-center justify-center">
          <span className="text-amber-200 text-xs">☕ カウンター</span>
        </div>

        {/* 主人公 */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="w-12 h-12 bg-fairy-pink-100 rounded-full flex items-center justify-center border-2 border-fairy-pink-200 shadow-soft">
            <span className="text-2xl">👧</span>
          </div>
          <span className="text-xs text-gray-500 mt-1">主人公</span>
        </div>
      </div>

      {/* 手動モード時: 対応中の客表示 */}
      {mode === 'manual' && waitingCustomers.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 mt-2">
          <p className="text-xs text-yellow-700 text-center">
            🔔 {waitingCustomers.length}人が注文待ち
          </p>
        </div>
      )}

      {/* オートモード表示 */}
      {mode === 'auto' && (
        <div className="bg-fairy-mint-50 border border-fairy-mint-100 rounded-lg px-3 py-1 mt-2">
          <p className="text-xs text-green-600">🤖 オート対応中</p>
        </div>
      )}
    </div>
  );
}
