interface OrderSummaryProps {
  orderCount: number;
  totalCost: number;
  currentMoney: number;
  canAfford: boolean;
}

export function OrderSummary({
  orderCount,
  totalCost,
  currentMoney,
  canAfford,
}: OrderSummaryProps) {
  const remainingMoney = currentMoney - totalCost;
  const shortage = totalCost - currentMoney;

  return (
    <div className="bg-white rounded-xl p-4 shadow-soft border border-fairy-pink-100">
      <h3 className="font-bold text-gray-800 mb-3">📊 発注サマリー</h3>

      <div className="space-y-2 text-sm">
        {/* 発注点数 */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">発注点数:</span>
          <span className="font-medium text-gray-800">{orderCount}種類</span>
        </div>

        {/* 発注合計 */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">発注合計:</span>
          <span className="font-bold text-fairy-gold text-lg">
            {totalCost.toLocaleString()}G
          </span>
        </div>

        {/* 区切り線 */}
        <div className="border-t border-gray-100 my-2" />

        {/* 発注後残高 */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">発注後残高:</span>
          <span
            className={`font-bold text-lg ${
              canAfford ? 'text-green-600' : 'text-red-500'
            }`}
          >
            {canAfford
              ? `${remainingMoney.toLocaleString()}G`
              : `-${shortage.toLocaleString()}G`}
          </span>
        </div>

        {/* 警告メッセージ */}
        {!canAfford && totalCost > 0 && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm flex items-center gap-2">
              <span>⚠️</span>
              <span>所持金が不足しています（不足: {shortage.toLocaleString()}G）</span>
            </p>
          </div>
        )}

        {/* 発注なしの場合 */}
        {orderCount === 0 && (
          <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-gray-500 text-sm text-center">
              発注するアイテムを選択してください
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
