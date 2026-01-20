import type { FinancialStats, Advice } from '@/types';

// 損益分岐点の計算
export function calculateBreakEvenPoint(
  fixedCost: number,
  averageCostRate: number
): number {
  // BEP = 固定費 / (1 - 変動費率)
  if (averageCostRate >= 1) return Infinity;
  return Math.ceil(fixedCost / (1 - averageCostRate));
}

// 原価率の計算
export function calculateCostRate(cost: number, sales: number): number {
  return sales > 0 ? cost / sales : 0;
}

// 利益率の計算
export function calculateProfitRate(profit: number, sales: number): number {
  return sales > 0 ? profit / sales : 0;
}

// 財務統計を計算
export function calculateFinancialStats(
  sales: number,
  cost: number,
  fixedCost: number,
  waste: number
): FinancialStats {
  const profit = sales - cost - fixedCost - waste;
  const costRate = calculateCostRate(cost, sales);
  const profitRate = calculateProfitRate(profit, sales);
  const breakEvenPoint = calculateBreakEvenPoint(fixedCost, costRate);
  const breakEvenAchievement = sales / breakEvenPoint;
  const wasteRate = sales > 0 ? waste / sales : 0;

  return {
    sales,
    cost,
    fixedCost,
    waste,
    profit,
    costRate,
    profitRate,
    breakEvenPoint,
    breakEvenAchievement,
    wasteRate,
  };
}

// 経営アドバイス生成
export function generateAdvices(stats: FinancialStats): Advice[] {
  const advices: Advice[] = [];

  // 原価率チェック
  if (stats.costRate > 0.45) {
    advices.push({
      type: 'warning',
      text: '原価率が高めです。高利益率メニューの開発や価格見直しを検討しましょう',
    });
  } else if (stats.costRate > 0 && stats.costRate < 0.35) {
    advices.push({
      type: 'positive',
      text: '原価率が理想的です！この調子を維持しましょう',
    });
  }

  // 利益率チェック
  if (stats.profitRate < 0.1 && stats.sales > 0) {
    advices.push({
      type: 'warning',
      text: '利益率が低めです。固定費の削減や売上UPの施策を検討しましょう',
    });
  }

  // 損益分岐点チェック
  if (stats.breakEvenAchievement < 1 && stats.sales > 0) {
    advices.push({
      type: 'danger',
      text: '損益分岐点を下回っています！来客数UPが急務です',
    });
  } else if (stats.breakEvenAchievement > 1.5) {
    advices.push({
      type: 'positive',
      text: '損益分岐点を大きく上回っています！順調です',
    });
  }

  // 廃棄チェック
  if (stats.wasteRate > 0.1) {
    advices.push({
      type: 'warning',
      text: '廃棄が増えています。発注量の見直しを検討してください',
    });
  }

  // 利益チェック
  if (stats.profit < 0) {
    advices.push({
      type: 'danger',
      text: '赤字です！早急に経営改善が必要です',
    });
  } else if (stats.profit > 5000) {
    advices.push({
      type: 'positive',
      text: '好調な利益を出しています！投資のチャンスかもしれません',
    });
  }

  return advices;
}

// 数値をフォーマット
export function formatMoney(amount: number): string {
  return amount.toLocaleString() + 'G';
}

// パーセンテージをフォーマット
export function formatPercent(rate: number, decimals: number = 1): string {
  return (rate * 100).toFixed(decimals) + '%';
}
