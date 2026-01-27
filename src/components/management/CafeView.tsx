import { useCafeStore } from '@/store';
import { Seat } from './Seat';
import { Counter } from './Counter';
import { Showcase } from './Showcase';
import { Customer } from './Customer';

export function CafeView() {
  const { seats, customers } = useCafeStore();

  return (
    <div className="w-full h-full bg-white rounded-2xl shadow-card border border-fairy-pink-100 overflow-hidden">
      {/* カフェ俯瞰ビュー */}
      <div className="relative w-full h-full p-4">
        {/* 背景グリッド */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                'linear-gradient(#FFB6C1 1px, transparent 1px), linear-gradient(90deg, #FFB6C1 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
        </div>

        {/* 入口 */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="text-2xl">🚪</div>
          <span className="text-xs text-gray-400">入口</span>
        </div>

        {/* 客席エリア */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 flex gap-6">
          {seats.map((seat, index) => (
            <Seat
              key={seat.id}
              seat={seat}
              seatNumber={index + 1}
              customer={customers.find((c) => c.seatId === seat.id)}
            />
          ))}

          {/* 席追加スロット（まだ購入していない席） */}
          {seats.length < 6 && (
            <div className="w-20 h-24 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400">
              <span className="text-2xl">+</span>
              <span className="text-xs">席追加</span>
            </div>
          )}
        </div>

        {/* カウンター */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">
          <Counter />
        </div>

        {/* ショーケース */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <Showcase />
        </div>

        {/* 移動中の客 */}
        {customers
          .filter((c) => c.status === 'entering' || c.status === 'leaving')
          .map((customer) => (
            <Customer
              key={customer.id}
              customer={customer}
              floating
            />
          ))}
      </div>
    </div>
  );
}
