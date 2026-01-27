import type { FinancialStats } from '@/types';
import { Card } from '@/components/common';

interface FinancialSummaryProps {
  stats: FinancialStats;
  previousStats?: FinancialStats;
}

export function FinancialSummary({ stats, previousStats }: FinancialSummaryProps) {
  const profitChange = previousStats
    ? stats.profit - previousStats.profit
    : undefined;

  return (
    <Card title="💰 収支サマリー" titleIcon="">
      <div className="space-y-2">
        {/* 売上 */}
        <div className="flex justify-between items-center">
          <span className="text-gray-700">売上</span>
          <span className="font-bold text-gray-800">
            {stats.sales.toLocaleString()}G
          </span>
        </div>

        <div className="border-t border-gray-100" />

        {/* 原価 */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">原価</span>
          <div className="text-right">
            <span className="text-red-500">
              -{stats.cost.toLocaleString()}G
            </span>
            <span className="text-xs text-gray-400 ml-2">
              (原価率 {(stats.costRate * 100).toFixed(1)}%)
            </span>
          </div>
        </div>

        {/* 固定費 */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">固定費</span>
          <span className="text-red-500">
            -{stats.fixedCost.toLocaleString()}G
          </span>
        </div>

        {/* 廃棄ロス */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">廃棄ロス</span>
          <span className="text-red-500">
            -{stats.waste.toLocaleString()}G
          </span>
        </div>

        <div className="border-t-2 border-gray-200" />

        {/* 純利益 */}
        <div className="flex justify-between items-center">
          <span className="text-gray-800 font-medium">純利益</span>
          <div className="flex items-center gap-2">
            <span
              className={`text-xl font-bold ${
                stats.profit >= 0 ? 'text-green-600' : 'text-red-500'
              }`}
            >
              {stats.profit >= 0 ? '+' : ''}
              {stats.profit.toLocaleString()}G
            </span>
            <span className="text-sm text-gray-400">
              (利益率 {(stats.profitRate * 100).toFixed(1)}%)
            </span>
            {stats.profit >= 0 ? (
              <span className="text-green-500">📈</span>
            ) : (
              <span className="text-red-500">📉</span>
            )}
          </div>
        </div>

        {/* 前期比較 */}
        {profitChange !== undefined && profitChange !== 0 && (
          <div className="text-right">
            <span
              className={`text-sm ${
                profitChange >= 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              前期比: {profitChange >= 0 ? '+' : ''}
              {profitChange.toLocaleString()}G
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}
