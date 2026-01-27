import { useState, useMemo } from 'react';
import { useGameStore, useInventoryStore } from '@/store';
import { Header, Button, Tab } from '@/components/common';
import { OrderItem } from './OrderItem';
import { OrderSummary } from './OrderSummary';
import { useOrder } from '@/hooks/useOrder';
import { MENU_DATA } from '@/data/menuData';
import type { MenuItem } from '@/types';

type CategoryFilter = 'all' | 'drink' | 'food' | 'sweet';

export function OrderScreen() {
  const { setScreen, money } = useGameStore();
  const { unlockedMenus, inventory } = useInventoryStore();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [orders, setOrders] = useState<Record<string, number>>({});

  const { calculateTotalCost, confirmOrder, getRecommendedOrder } = useOrder();

  // 解放済みメニューをフィルタリング
  const filteredMenus = useMemo(() => {
    return MENU_DATA.filter((menu) => {
      if (!unlockedMenus.includes(menu.id)) return false;
      if (activeCategory === 'all') return true;
      return menu.category === activeCategory;
    });
  }, [unlockedMenus, activeCategory]);

  // 発注数を変更
  const handleOrderChange = (itemId: string, amount: number) => {
    setOrders((prev) => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + amount),
    }));
  };

  // 発注数を直接設定
  const handleOrderSet = (itemId: string, amount: number) => {
    setOrders((prev) => ({
      ...prev,
      [itemId]: Math.max(0, amount),
    }));
  };

  // 発注をクリア
  const handleClearOrders = () => {
    setOrders({});
  };

  // 発注を確定
  const handleConfirmOrder = () => {
    const success = confirmOrder(orders);
    if (success) {
      setOrders({});
      setScreen('cafe');
    }
  };

  // 合計金額
  const totalCost = calculateTotalCost(orders);
  const canAfford = money >= totalCost;
  const orderCount = Object.values(orders).filter((v) => v > 0).length;

  const tabs = [
    { id: 'all', label: '📦 全て' },
    { id: 'drink', label: '☕ ドリンク' },
    { id: 'food', label: '🍞 フード' },
    { id: 'sweet', label: '🍰 スイーツ' },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-fairy-pink-50 to-fairy-lavender-100">
      <Header />

      <div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">
        {/* タイトル */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">📦 発注・仕入れ</h1>
          <div className="text-sm text-gray-500">
            発注 → 翌日入荷
          </div>
        </div>

        {/* カテゴリタブ */}
        <Tab
          tabs={tabs}
          activeTab={activeCategory}
          onTabChange={(id) => setActiveCategory(id as CategoryFilter)}
          variant="pills"
          size="sm"
        />

        {/* 発注リスト */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {filteredMenus.map((menu) => {
            const stock = inventory[menu.id]?.stock ?? 0;
            const pending = inventory[menu.id]?.pendingOrder ?? 0;
            const orderAmount = orders[menu.id] || 0;
            const recommended = getRecommendedOrder(menu.id);

            return (
              <OrderItem
                key={menu.id}
                menu={menu}
                currentStock={stock}
                pendingOrder={pending}
                orderAmount={orderAmount}
                recommended={recommended}
                onOrderChange={(amount) => handleOrderChange(menu.id, amount)}
                onOrderSet={(amount) => handleOrderSet(menu.id, amount)}
              />
            );
          })}
        </div>

        {/* 発注サマリー */}
        <OrderSummary
          orderCount={orderCount}
          totalCost={totalCost}
          currentMoney={money}
          canAfford={canAfford}
        />

        {/* ボタン */}
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => setScreen('cafe')} fullWidth>
            戻る
          </Button>
          <Button
            variant="secondary"
            onClick={handleClearOrders}
            disabled={orderCount === 0}
          >
            クリア
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirmOrder}
            disabled={!canAfford || orderCount === 0}
            fullWidth
          >
            発注確定 ({totalCost.toLocaleString()}G)
          </Button>
        </div>
      </div>
    </div>
  );
}
