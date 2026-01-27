import type { SeatState, CustomerState } from '@/types';
import { Customer } from './Customer';

interface SeatProps {
  seat: SeatState;
  seatNumber: number;
  customer?: CustomerState;
  onClick?: () => void;
}

export function Seat({ seat, seatNumber, customer, onClick }: SeatProps) {
  const isOccupied = seat.occupied && customer;

  return (
    <div
      className={`
        relative w-20 h-24 rounded-xl border-2 transition-all duration-200
        ${
          isOccupied
            ? 'bg-fairy-pink-50 border-fairy-pink-200'
            : 'bg-gray-50 border-gray-200 hover:border-fairy-pink-200'
        }
        ${onClick ? 'cursor-pointer' : ''}
      `}
      onClick={onClick}
    >
      {/* 席番号 */}
      <div className="absolute -top-2 -left-2 w-6 h-6 bg-fairy-lavender-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
        {seatNumber}
      </div>

      {/* 椅子アイコン or 客 */}
      <div className="w-full h-full flex items-center justify-center">
        {isOccupied ? (
          <Customer customer={customer} />
        ) : (
          <span className="text-3xl opacity-30">🪑</span>
        )}
      </div>

      {/* 客の状態表示 */}
      {isOccupied && customer && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
          <CustomerStatusBadge status={customer.status} />
        </div>
      )}
    </div>
  );
}

function CustomerStatusBadge({ status }: { status: CustomerState['status'] }) {
  const statusConfig = {
    entering: { label: '入店中', color: 'bg-blue-100 text-blue-600' },
    ordering: { label: '注文中', color: 'bg-yellow-100 text-yellow-600' },
    waiting: { label: '待機中', color: 'bg-orange-100 text-orange-600' },
    eating: { label: '食事中', color: 'bg-green-100 text-green-600' },
    leaving: { label: '退店中', color: 'bg-gray-100 text-gray-600' },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`
        px-2 py-0.5 rounded-full text-[10px] font-medium whitespace-nowrap
        ${config.color}
      `}
    >
      {config.label}
    </span>
  );
}
