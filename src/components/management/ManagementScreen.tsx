import { useState, useMemo } from 'react';
import { useGameStore, useInventoryStore } from '@/store';
import { Header, Button, Tab, Card, ProgressBar } from '@/components/common';
import { FinancialSummary } from './FinancialSummary';
import { SalesChart } from './SalesChart';
import { ManagementAdvice } from './ManagementAdvice';
import { calculateFinancialStats } from '@/utils/financial';

type PeriodFilter = 'today' | 'week' | 'month';

export function ManagementScreen() {
  const { setScreen, day, money } = useGameStore();
  const { salesHistory } = useInventoryStore();
  const [period, setPeriod] = useState<PeriodFilter>('week');

  // 財務データを計算
  const financialStats = useMemo(() => {
    // 簡易的な計算（実際にはsalesHistoryから計算）
    const totalSales = Object.values(salesHistory).reduce(
      (sum, history) => sum + history.reduce((a, b) => a + b, 0) * 150,
      0
    );
    const totalCost = totalSales * 0.33;
    const fixedCost = 800 * day;
    const waste = totalSales * 0.03;

    return calculateFinancialStats(totalSales, totalCost, fixedCost, waste);
  }, [salesHistory, day]);

  // 売上推移データ
  const salesChartData = useMemo(() => {
    const days = period === 'today' ? 1 : period === 'week' ? 7 : 30;
    const labels: string[] = [];
    const values: number[] = [];

    for (let i = days; i >= 1; i--) {
      labels.push(`Day ${Math.max(1, day - i + 1)}`);
      // ダミーデータ
      values.push(Math.floor(Math.random() * 5000) + 2000);
    }

    return { labels, values };
  }, [day, period]);

  const tabs = [
    { id: 'today', label: '今日' },
    { id: 'week', label: '週間' },
    { id: 'month', label: '月間' },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-fairy-pink-50 to-fairy-lavender-100">
      <Header />

      <div className="flex-1 flex flex-col p-4 gap-4 overflow-y-auto">
        {/* タイトル */}
        <h1 className="text-2xl font-bold text-gray-800">📊 経営管理</h1>

        {/* 期間タブ */}
        <Tab
          tabs={tabs}
          activeTab={period}
          onTabChange={(id) => setPeriod(id as PeriodFilter)}
          variant="pills"
          size="sm"
        />

        {/* 収支サマリー */}
        <FinancialSummary stats={financialStats} />

        {/* 損益分岐点分析 */}
        <Card title="📍 損益分岐点分析" titleIcon="">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                固定費: {financialStats.fixedCost.toLocaleString()}G/月
              </span>
              <span className="text-gray-600">
                平均原価率: {(financialStats.costRate * 100).toFixed(1)}%
              </span>
            </div>

            <div className="text-center py-2">
              <span className="text-gray-500">損益分岐点売上: </span>
              <span className="text-xl font-bold text-fairy-pink-500">
                {financialStats.breakEvenPoint.toLocaleString()}G/月
              </span>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">達成率</span>
                <span
                  className={`font-bold ${
                    financialStats.breakEvenAchievement >= 1
                      ? 'text-green-600'
                      : 'text-red-500'
                  }`}
                >
                  {(financialStats.breakEvenAchievement * 100).toFixed(0)}%
                </span>
              </div>
              <ProgressBar
                value={Math.min(financialStats.breakEvenAchievement * 100, 200)}
                max={200}
                color={
                  financialStats.breakEvenAchievement >= 1 ? 'mint' : 'red'
                }
              />
              <div className="flex justify-center mt-1">
                <span className="text-xs text-gray-400">↑ BEP</span>
              </div>
            </div>
          </div>
        </Card>

        {/* 売上推移 */}
        <Card title="📈 売上推移" titleIcon="">
          <SalesChart data={salesChartData} height={150} />
        </Card>

        {/* 経営アドバイス */}
        <ManagementAdvice stats={financialStats} />

        {/* 戻るボタン */}
        <Button variant="ghost" onClick={() => setScreen('cafe')} fullWidth>
          戻る
        </Button>
      </div>
    </div>
  );
}
