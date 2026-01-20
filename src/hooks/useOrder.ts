import { useCallback } from 'react';
import { useGameStore, useInventoryStore, useNotificationStore } from '@/store';
import { useAudio } from './useAudio';
import { MENU_DATA } from '@/data/menuData';

export function useOrder() {
  const { money, deductMoney } = useGameStore();
  const { inventory, salesHistory, confirmOrders } = useInventoryStore();
  const { addNotification } = useNotificationStore();
  const { playSE } = useAudio();

  // 推奨発注数を計算
  const getRecommendedOrder = useCallback(
    (itemId: string): { min: number; max: number; average: number } => {
      const history = salesHistory[itemId] || [];
      const currentStock = inventory[itemId]?.stock || 0;
      const pendingOrder = inventory[itemId]?.pendingOrder || 0;

      // 過去の販売データがない場合はデフォルト値
      if (history.length === 0) {
        return { min: 5, max: 10, average: 7 };
      }

      // 直近3日の平均
      const recentDays = history.slice(-3);
      const recentAverage =
        recentDays.length > 0
          ? recentDays.reduce((a, b) => a + b, 0) / recentDays.length
          : 0;

      // 週間平均
      const weekAverage =
        history.length > 0
          ? history.reduce((a, b) => a + b, 0) / history.length
          : 0;

      // 基準値（高い方を採用）
      const base = Math.max(recentAverage, weekAverage);

      // 実効在庫（現在庫 + 発注中）
      const effectiveStock = currentStock + pendingOrder;

      // 推奨数を計算（目標在庫 - 実効在庫）
      const min = Math.max(0, Math.ceil(base * 0.8) - effectiveStock);
      const max = Math.max(0, Math.ceil(base * 1.5) - effectiveStock);
      const average = Math.max(0, Math.ceil(base) - effectiveStock);

      return { min, max, average };
    },
    [inventory, salesHistory]
  );

  // 発注の合計金額を計算
  const calculateTotalCost = useCallback(
    (orders: Record<string, number>): number => {
      return Object.entries(orders).reduce((total, [itemId, amount]) => {
        const menu = MENU_DATA.find((m) => m.id === itemId);
        if (menu && amount > 0) {
          return total + menu.cost * amount;
        }
        return total;
      }, 0);
    },
    []
  );

  // 発注を確定
  const confirmOrder = useCallback(
    (orders: Record<string, number>): boolean => {
      const totalCost = calculateTotalCost(orders);

      // 所持金チェック
      if (totalCost > money) {
        addNotification('error', '所持金が不足しています');
        playSE('error');
        return false;
      }

      // 発注数チェック
      const orderCount = Object.values(orders).filter((v) => v > 0).length;
      if (orderCount === 0) {
        addNotification('warning', '発注するアイテムを選択してください');
        return false;
      }

      // 所持金から引く
      const success = deductMoney(totalCost);
      if (!success) {
        addNotification('error', '所持金が不足しています');
        playSE('error');
        return false;
      }

      // 発注中に追加
      confirmOrders(orders);

      // 通知
      playSE('coin');
      addNotification(
        'success',
        `発注が完了しました（${totalCost.toLocaleString()}G）`
      );

      return true;
    },
    [money, deductMoney, confirmOrders, addNotification, playSE, calculateTotalCost]
  );

  return {
    getRecommendedOrder,
    calculateTotalCost,
    confirmOrder,
  };
}
