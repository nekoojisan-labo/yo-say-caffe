import type { MenuItem } from '@/types';
import { Button } from '@/components/common';

interface OrderItemProps {
  menu: MenuItem;
  currentStock: number;
  pendingOrder: number;
  orderAmount: number;
  recommended: { min: number; max: number; average: number };
  onOrderChange: (amount: number) => void;
  onOrderSet: (amount: number) => void;
}

export function OrderItem({
  menu,
  currentStock,
  pendingOrder,
  orderAmount,
  recommended,
  onOrderChange,
  onOrderSet,
}: OrderItemProps) {
  const isLowStock = currentStock <= 2;
  const subtotal = orderAmount * menu.cost;

  return (
    <div
      className={`
        bg-white rounded-xl p-4 shadow-soft border
        ${isLowStock ? 'border-yellow-300' : 'border-fairy-pink-100'}
      `}
    >
      {/* ヘッダー */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{getCategoryIcon(menu.category)}</span>
          <div>
            <h3 className="font-bold text-gray-800">{menu.name}</h3>
            <p className="text-sm text-gray-500">原価: {menu.cost}G</p>
          </div>
        </div>

        {/* 在庫警告 */}
        {isLowStock && (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
            ⚠️ 在庫少
          </span>
        )}
      </div>

      {/* 在庫情報 */}
      <div className="flex items-center gap-4 mb-3 text-sm">
        <div className="flex items-center gap-1">
          <span className="text-gray-500">現在庫:</span>
          <span
            className={`font-bold ${
              currentStock === 0
                ? 'text-red-500'
                : isLowStock
                ? 'text-yellow-600'
                : 'text-gray-700'
            }`}
          >
            {currentStock}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-500">発注中:</span>
          <span className="text-blue-600 font-medium">{pendingOrder}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-500">💡推奨:</span>
          <span className="text-green-600">
            {recommended.min}〜{recommended.max}個
          </span>
        </div>
      </div>

      {/* 発注数入力 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onOrderChange(-10)}
            disabled={orderAmount < 10}
          >
            -10
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onOrderChange(-1)}
            disabled={orderAmount < 1}
          >
            -1
          </Button>

          {/* 発注数表示 */}
          <div className="w-20 text-center">
            <input
              type="number"
              value={orderAmount}
              onChange={(e) => onOrderSet(parseInt(e.target.value) || 0)}
              min={0}
              className="w-full text-center text-xl font-bold text-fairy-pink-500 bg-fairy-pink-50 rounded-lg py-2 border border-fairy-pink-200 focus:outline-none focus:ring-2 focus:ring-fairy-pink-300"
            />
          </div>

          <Button variant="secondary" size="sm" onClick={() => onOrderChange(1)}>
            +1
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onOrderChange(10)}
          >
            +10
          </Button>
        </div>

        {/* 小計 */}
        <div className="text-right">
          <span className="text-gray-500 text-sm">小計: </span>
          <span className="font-bold text-fairy-gold">
            {subtotal.toLocaleString()}G
          </span>
        </div>
      </div>

      {/* クイック設定ボタン */}
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onOrderSet(recommended.average)}
          className="px-3 py-1 text-xs bg-green-50 text-green-600 rounded-full hover:bg-green-100 transition-colors"
        >
          推奨数を設定
        </button>
        <button
          onClick={() => onOrderSet(recommended.max)}
          className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
        >
          最大数を設定
        </button>
        {orderAmount > 0 && (
          <button
            onClick={() => onOrderSet(0)}
            className="px-3 py-1 text-xs bg-gray-50 text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
          >
            クリア
          </button>
        )}
      </div>
    </div>
  );
}

function getCategoryIcon(category: 'drink' | 'food' | 'sweet'): string {
  switch (category) {
    case 'drink':
      return '☕';
    case 'food':
      return '🥪';
    case 'sweet':
      return '🍰';
    default:
      return '📦';
  }
}
