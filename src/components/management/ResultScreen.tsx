import { useGameStore, useInventoryStore, useCafeStore, useIkemenStore } from '@/store';
import { Header, Button, Card, ProgressBar } from '@/components/common';
import { MENU_DATA } from '@/data/menuData';
import { IKEMEN_MASTER_DATA } from '@/data/ikemenData';
import { useAudio } from '@/hooks';
import { useEffect, useState } from 'react';

interface SalesItem {
  id: string;
  name: string;
  quantity: number;
  revenue: number;
  profit: number;
}

export function ResultScreen() {
  const { setScreen, day, addMoney, nextDay } = useGameStore();
  const { dailySales, inventory, resetDailySales } = useInventoryStore();
  const { todayStats, resetCafe } = useCafeStore();
  const { getTopAffectionIkemen } = useIkemenStore();
  const { playSE } = useAudio();
  const [showAnimation, setShowAnimation] = useState(true);

  // todayStatsから値を取得
  const totalCustomers = todayStats.customers;
  const servedCustomers = Object.values(dailySales).reduce((sum, qty) => sum + qty, 0);
  const ikemenVisits = todayStats.ikemenVisits.map((v) => v.ikemenId);

  // BGM再生
  useEffect(() => {
    playSE('complete');
    const timer = setTimeout(() => setShowAnimation(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // 売上明細を計算
  const salesItems: SalesItem[] = Object.entries(dailySales).map(([itemId, quantity]) => {
    const menu = MENU_DATA.find((m) => m.id === itemId);
    if (!menu) return { id: itemId, name: '不明', quantity, revenue: 0, profit: 0 };

    const revenue = menu.price * quantity;
    const profit = (menu.price - menu.cost) * quantity;

    return {
      id: itemId,
      name: menu.name,
      quantity,
      revenue,
      profit,
    };
  }).filter((item) => item.quantity > 0);

  // 廃棄コスト
  const wasteItems = Object.entries(inventory)
    .filter(([_, data]) => data.waste > 0)
    .map(([itemId, data]) => {
      const menu = MENU_DATA.find((m) => m.id === itemId);
      return {
        id: itemId,
        name: menu?.name || '不明',
        quantity: data.waste,
        cost: (menu?.cost || 0) * data.waste,
      };
    });

  const totalWasteCost = wasteItems.reduce((sum, item) => sum + item.cost, 0);

  // 固定費
  const fixedCost = 800;

  // 純利益
  const totalRevenue = salesItems.reduce((sum, item) => sum + item.revenue, 0);
  const totalProfit = salesItems.reduce((sum, item) => sum + item.profit, 0);
  const netProfit = totalProfit - fixedCost - totalWasteCost;

  // 訪問イケメン
  const visitedIkemen = ikemenVisits.map((id) => IKEMEN_MASTER_DATA.find((ik) => ik.id === id)).filter(Boolean);

  // トップ好感度イケメン
  const topIkemen = getTopAffectionIkemen(1)[0];
  const topIkemenData = topIkemen ? IKEMEN_MASTER_DATA.find((ik) => ik.id === topIkemen.ikemenId) : null;

  // 評価
  const getRating = () => {
    if (netProfit >= 3000) return { rank: 'S', comment: '素晴らしい営業でした！', color: 'text-yellow-500' };
    if (netProfit >= 2000) return { rank: 'A', comment: 'とても良い一日でした！', color: 'text-green-500' };
    if (netProfit >= 1000) return { rank: 'B', comment: '順調な営業です', color: 'text-blue-500' };
    if (netProfit >= 0) return { rank: 'C', comment: 'まずまずの結果です', color: 'text-gray-500' };
    return { rank: 'D', comment: '明日は挽回しましょう...', color: 'text-red-500' };
  };

  const rating = getRating();

  // 次の日へ進む
  const handleNextDay = () => {
    playSE('click');
    addMoney(netProfit);
    resetDailySales();
    resetCafe();
    nextDay();
    setScreen('cafe');
  };

  // ホームへ戻る
  const handleBackToHome = () => {
    playSE('click');
    addMoney(netProfit);
    resetDailySales();
    resetCafe();
    nextDay();
    setScreen('home');
  };

  if (showAnimation) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-fairy-pink-100 to-fairy-lavender-100">
        <div className="text-center animate-bounce-in">
          <h1 className="text-4xl font-bold text-fairy-pink-500 mb-2">営業終了</h1>
          <p className="text-xl text-gray-600">Day {day} お疲れ様でした！</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-fairy-pink-50 to-fairy-lavender-100">
      <Header />

      <div className="flex-1 flex flex-col p-4 gap-4 overflow-y-auto">
        {/* タイトルと評価 */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">📋 Day {day} 営業結果</h1>
          <div className="mt-2 flex items-center justify-center gap-2">
            <span className={`text-5xl font-bold ${rating.color}`}>{rating.rank}</span>
            <span className="text-gray-600">{rating.comment}</span>
          </div>
        </div>

        {/* 売上サマリー */}
        <Card title="💰 売上サマリー" titleIcon="">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">来客数</span>
              <span className="font-medium">{totalCustomers}人</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">提供数</span>
              <span className="font-medium">{servedCustomers}件</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">売上</span>
              <span className="font-medium text-green-600">+{totalRevenue.toLocaleString()}G</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">原価</span>
              <span className="font-medium text-red-500">-{(totalRevenue - totalProfit).toLocaleString()}G</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">固定費</span>
              <span className="font-medium text-red-500">-{fixedCost.toLocaleString()}G</span>
            </div>
            {totalWasteCost > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">廃棄ロス</span>
                <span className="font-medium text-red-500">-{totalWasteCost.toLocaleString()}G</span>
              </div>
            )}
            <div className="border-t border-gray-200 pt-2 flex justify-between">
              <span className="font-bold text-gray-800">純利益</span>
              <span className={`font-bold text-xl ${netProfit >= 0 ? 'text-fairy-gold' : 'text-red-500'}`}>
                {netProfit >= 0 ? '+' : ''}{netProfit.toLocaleString()}G
              </span>
            </div>
          </div>
        </Card>

        {/* 売上明細 */}
        {salesItems.length > 0 && (
          <Card title="📝 売上明細" titleIcon="">
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {salesItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {item.name} x{item.quantity}
                  </span>
                  <span className="text-gray-600">{item.revenue.toLocaleString()}G</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* 廃棄明細 */}
        {wasteItems.length > 0 && (
          <Card title="🗑️ 廃棄明細" titleIcon="">
            <div className="space-y-2">
              {wasteItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {item.name} x{item.quantity}
                  </span>
                  <span className="text-red-500">-{item.cost.toLocaleString()}G</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* イケメン訪問 */}
        {visitedIkemen.length > 0 && (
          <Card title="🧚‍♂️ 今日のイケメン" titleIcon="">
            <div className="flex flex-wrap gap-2">
              {visitedIkemen.map((ik) => ik && (
                <div
                  key={ik.id}
                  className="px-3 py-1 bg-fairy-pink-100 rounded-full text-sm text-fairy-pink-600"
                >
                  {ik.name}
                </div>
              ))}
            </div>
            {topIkemenData && (
              <div className="mt-3 p-3 bg-gradient-to-r from-fairy-pink-100 to-fairy-lavender-100 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">好感度トップ</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🧚‍♂️</span>
                  <div>
                    <p className="font-bold text-fairy-pink-500">{topIkemenData.name}</p>
                    <ProgressBar
                      value={topIkemen?.affection || 0}
                      max={100}
                      color="pink"
                      size="sm"
                      showLabel
                    />
                  </div>
                </div>
              </div>
            )}
          </Card>
        )}

        {/* ボタン */}
        <div className="flex gap-3 mt-auto">
          <Button variant="ghost" onClick={handleBackToHome} className="flex-1">
            ホームへ
          </Button>
          <Button variant="primary" onClick={handleNextDay} className="flex-1">
            次の日へ
          </Button>
        </div>
      </div>
    </div>
  );
}
