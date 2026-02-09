// src/game/glamorCalculator.ts
// 幻装レベル計算システム - 経営状況に基づく幻装ポイントとレベルの管理

import { GLAMOR_LEVEL_THRESHOLDS } from './scenarios/events/shouran';

/**
 * 幻装レベルの範囲
 */
export const GLAMOR_LEVEL_MIN = 0;
export const GLAMOR_LEVEL_MAX = 6;

/**
 * 幻装ポイントの初期値（レベル3相当）
 */
export const INITIAL_GLAMOR_POINTS = 240;
export const INITIAL_GLAMOR_LEVEL = 3;

/**
 * 日次の幻装ポイント変動要因
 */
export interface DailyGlamorFactors {
  dailyProfit: number;           // 日次利益（売上 - 仕入れ）
  customersServed: number;       // 接客した客数
  customerSatisfaction: number;  // 平均満足度（1-5）
  reputation: number;            // 現在の評判
  specialEvents: number;         // 特別イベントボーナス
  ikemenVisits: number;          // イケメン来店数
  consecutiveProfitDays: number; // 連続黒字日数
  consecutiveLossDays: number;   // 連続赤字日数
}

/**
 * ポイント計算の係数
 */
const GLAMOR_COEFFICIENTS = {
  // 利益による変動
  profit: {
    large: { threshold: 10000, points: 15 },    // 大きな利益
    medium: { threshold: 5000, points: 10 },    // 中程度の利益
    small: { threshold: 1000, points: 5 },      // 小さな利益
    breakeven: { threshold: 0, points: 0 },     // 損益分岐
    smallLoss: { threshold: -1000, points: -3 }, // 小さな損失
    mediumLoss: { threshold: -5000, points: -8 }, // 中程度の損失
    largeLoss: { threshold: -Infinity, points: -15 } // 大きな損失
  },
  
  // 客数による変動
  customers: {
    perCustomer: 0.5,  // 1人あたり0.5ポイント
    bonusThreshold: 20, // 20人以上でボーナス
    bonus: 5            // ボーナスポイント
  },
  
  // 満足度による変動
  satisfaction: {
    excellent: { threshold: 4.5, points: 8 },  // 4.5以上
    good: { threshold: 4.0, points: 5 },       // 4.0以上
    average: { threshold: 3.0, points: 2 },    // 3.0以上
    poor: { threshold: 2.0, points: -3 },      // 2.0以上
    terrible: { threshold: 0, points: -8 }     // 2.0未満
  },
  
  // 評判による変動
  reputation: {
    multiplier: 0.1  // 評判 × 0.1 ポイント
  },
  
  // イケメン来店ボーナス
  ikemenVisit: {
    perVisit: 3  // 1人来店あたり3ポイント
  },
  
  // 連続日数ボーナス/ペナルティ
  consecutive: {
    profitBonus: 2,    // 連続黒字1日あたり+2
    profitMaxBonus: 20, // 連続黒字ボーナス上限
    lossPenalty: 3,     // 連続赤字1日あたり-3
    lossMaxPenalty: 30  // 連続赤字ペナルティ上限
  }
};

/**
 * 日次の幻装ポイント変動を計算
 */
export function calculateDailyGlamorChange(factors: DailyGlamorFactors): {
  totalChange: number;
  breakdown: {
    profit: number;
    customers: number;
    satisfaction: number;
    reputation: number;
    ikemenVisits: number;
    consecutive: number;
    specialEvents: number;
  };
} {
  const breakdown = {
    profit: 0,
    customers: 0,
    satisfaction: 0,
    reputation: 0,
    ikemenVisits: 0,
    consecutive: 0,
    specialEvents: 0
  };
  
  // 利益による変動
  const profitCoef = GLAMOR_COEFFICIENTS.profit;
  if (factors.dailyProfit >= profitCoef.large.threshold) {
    breakdown.profit = profitCoef.large.points;
  } else if (factors.dailyProfit >= profitCoef.medium.threshold) {
    breakdown.profit = profitCoef.medium.points;
  } else if (factors.dailyProfit >= profitCoef.small.threshold) {
    breakdown.profit = profitCoef.small.points;
  } else if (factors.dailyProfit >= profitCoef.breakeven.threshold) {
    breakdown.profit = profitCoef.breakeven.points;
  } else if (factors.dailyProfit >= profitCoef.smallLoss.threshold) {
    breakdown.profit = profitCoef.smallLoss.points;
  } else if (factors.dailyProfit >= profitCoef.mediumLoss.threshold) {
    breakdown.profit = profitCoef.mediumLoss.points;
  } else {
    breakdown.profit = profitCoef.largeLoss.points;
  }
  
  // 客数による変動
  const custCoef = GLAMOR_COEFFICIENTS.customers;
  breakdown.customers = Math.floor(factors.customersServed * custCoef.perCustomer);
  if (factors.customersServed >= custCoef.bonusThreshold) {
    breakdown.customers += custCoef.bonus;
  }
  
  // 満足度による変動
  const satCoef = GLAMOR_COEFFICIENTS.satisfaction;
  if (factors.customerSatisfaction >= satCoef.excellent.threshold) {
    breakdown.satisfaction = satCoef.excellent.points;
  } else if (factors.customerSatisfaction >= satCoef.good.threshold) {
    breakdown.satisfaction = satCoef.good.points;
  } else if (factors.customerSatisfaction >= satCoef.average.threshold) {
    breakdown.satisfaction = satCoef.average.points;
  } else if (factors.customerSatisfaction >= satCoef.poor.threshold) {
    breakdown.satisfaction = satCoef.poor.points;
  } else {
    breakdown.satisfaction = satCoef.terrible.points;
  }
  
  // 評判による変動
  breakdown.reputation = Math.floor(factors.reputation * GLAMOR_COEFFICIENTS.reputation.multiplier);
  
  // イケメン来店ボーナス
  breakdown.ikemenVisits = factors.ikemenVisits * GLAMOR_COEFFICIENTS.ikemenVisit.perVisit;
  
  // 連続日数ボーナス/ペナルティ
  const consCoef = GLAMOR_COEFFICIENTS.consecutive;
  if (factors.consecutiveProfitDays > 0) {
    breakdown.consecutive = Math.min(
      factors.consecutiveProfitDays * consCoef.profitBonus,
      consCoef.profitMaxBonus
    );
  } else if (factors.consecutiveLossDays > 0) {
    breakdown.consecutive = -Math.min(
      factors.consecutiveLossDays * consCoef.lossPenalty,
      consCoef.lossMaxPenalty
    );
  }
  
  // 特別イベントボーナス
  breakdown.specialEvents = factors.specialEvents;
  
  // 合計
  const totalChange = 
    breakdown.profit +
    breakdown.customers +
    breakdown.satisfaction +
    breakdown.reputation +
    breakdown.ikemenVisits +
    breakdown.consecutive +
    breakdown.specialEvents;
  
  return { totalChange, breakdown };
}

/**
 * 幻装ポイントからレベルを計算
 */
export function calculateGlamorLevel(points: number): number {
  for (let level = GLAMOR_LEVEL_MAX; level >= GLAMOR_LEVEL_MIN; level--) {
    if (points >= GLAMOR_LEVEL_THRESHOLDS[level]) {
      return level;
    }
  }
  return GLAMOR_LEVEL_MIN;
}

/**
 * 次のレベルまでの進捗を計算
 */
export function calculateLevelProgress(points: number, currentLevel: number): {
  currentPoints: number;
  requiredPoints: number;
  progressPercent: number;
  pointsToNextLevel: number;
} {
  if (currentLevel >= GLAMOR_LEVEL_MAX) {
    return {
      currentPoints: points,
      requiredPoints: GLAMOR_LEVEL_THRESHOLDS[GLAMOR_LEVEL_MAX],
      progressPercent: 100,
      pointsToNextLevel: 0
    };
  }
  
  const currentThreshold = GLAMOR_LEVEL_THRESHOLDS[currentLevel];
  const nextThreshold = GLAMOR_LEVEL_THRESHOLDS[currentLevel + 1];
  const progressPoints = points - currentThreshold;
  const requiredPoints = nextThreshold - currentThreshold;
  const progressPercent = Math.floor((progressPoints / requiredPoints) * 100);
  const pointsToNextLevel = nextThreshold - points;
  
  return {
    currentPoints: progressPoints,
    requiredPoints,
    progressPercent: Math.min(100, Math.max(0, progressPercent)),
    pointsToNextLevel: Math.max(0, pointsToNextLevel)
  };
}

/**
 * 幻装ポイントを更新（範囲制限付き）
 */
export function updateGlamorPoints(
  currentPoints: number,
  change: number
): {
  newPoints: number;
  newLevel: number;
  previousLevel: number;
  levelChanged: boolean;
  levelUp: boolean;
  levelDown: boolean;
} {
  const previousLevel = calculateGlamorLevel(currentPoints);
  
  // ポイントを更新（最小0、上限なし）
  const newPoints = Math.max(0, currentPoints + change);
  const newLevel = calculateGlamorLevel(newPoints);
  
  const levelChanged = newLevel !== previousLevel;
  const levelUp = newLevel > previousLevel;
  const levelDown = newLevel < previousLevel;
  
  return {
    newPoints,
    newLevel,
    previousLevel,
    levelChanged,
    levelUp,
    levelDown
  };
}

/**
 * 週次の幻装安定度を計算
 */
export function calculateWeeklyStability(
  weeklyProfits: number[],  // 過去7日間の利益
  weeklyReputation: number[], // 過去7日間の評判
  currentLevel: number
): {
  stabilityScore: number;  // 0-100
  trend: 'rising' | 'stable' | 'falling';
  riskLevel: 'safe' | 'caution' | 'danger';
  advice: string;
} {
  // 利益の安定度
  const avgProfit = weeklyProfits.reduce((a, b) => a + b, 0) / weeklyProfits.length;
  const profitVariance = weeklyProfits.reduce((sum, p) => sum + Math.pow(p - avgProfit, 2), 0) / weeklyProfits.length;
  const profitStability = Math.max(0, 100 - Math.sqrt(profitVariance) / 100);
  
  // 評判の安定度
  const avgReputation = weeklyReputation.reduce((a, b) => a + b, 0) / weeklyReputation.length;
  const repTrend = weeklyReputation[weeklyReputation.length - 1] - weeklyReputation[0];
  
  // 総合安定度
  let stabilityScore = Math.floor((profitStability + avgReputation) / 2);
  stabilityScore = Math.min(100, Math.max(0, stabilityScore));
  
  // トレンド判定
  let trend: 'rising' | 'stable' | 'falling';
  if (avgProfit > 3000 && repTrend > 0) {
    trend = 'rising';
  } else if (avgProfit < 0 || repTrend < -5) {
    trend = 'falling';
  } else {
    trend = 'stable';
  }
  
  // リスクレベル判定
  let riskLevel: 'safe' | 'caution' | 'danger';
  if (stabilityScore >= 70 && trend !== 'falling') {
    riskLevel = 'safe';
  } else if (stabilityScore >= 40 || trend === 'stable') {
    riskLevel = 'caution';
  } else {
    riskLevel = 'danger';
  }
  
  // アドバイス生成
  let advice: string;
  if (riskLevel === 'danger') {
    advice = '経営状況が危険です。売上を増やし、支出を抑えましょう。';
  } else if (riskLevel === 'caution') {
    advice = '経営は安定していますが、油断は禁物です。';
  } else if (trend === 'rising') {
    advice = '素晴らしい経営です！この調子で続けましょう。';
  } else {
    advice = '順調な経営です。さらなる成長を目指しましょう。';
  }
  
  return { stabilityScore, trend, riskLevel, advice };
}

/**
 * 幻装レベルに応じた見た目の説明を取得
 */
export function getGlamorAppearanceDescription(level: number): {
  title: string;
  description: string;
  visualEffects: string[];
} {
  const descriptions: Record<number, { title: string; description: string; visualEffects: string[] }> = {
    0: {
      title: '素顔',
      description: '魔法のない、ありのままの姿。',
      visualEffects: ['通常の服装', '特になし']
    },
    1: {
      title: 'ほのかな輝き',
      description: 'わずかに魔法の光をまとった姿。',
      visualEffects: ['肌に僅かなツヤ', '髪に軽い光沢']
    },
    2: {
      title: '淡い光',
      description: '魔法の力が少しずつ姿に現れ始めた。',
      visualEffects: ['肌の透明感アップ', '瞳に輝き', 'シンプルなアクセサリー']
    },
    3: {
      title: '魔法の衣',
      description: '魔法の力が安定し、美しさが増した。',
      visualEffects: ['華やかな服装', '髪に光の粒子', '肌の輝き']
    },
    4: {
      title: '輝く美貌',
      description: '魔法の力が高まり、目を引く美しさに。',
      visualEffects: ['豪華な衣装', '髪に花飾り', 'オーラのような光', '宝石のアクセサリー']
    },
    5: {
      title: '貴婦人の風格',
      description: '貴族にも引けを取らない気品ある姿。',
      visualEffects: ['ドレス風の衣装', '髪に光の冠', '周囲に淡い光', '高貴なオーラ']
    },
    6: {
      title: '妖精の輝き',
      description: '最高位の幻装。妖精のように美しい姿。',
      visualEffects: ['最高級のドレス', '光の翼のようなエフェクト', '全身が淡く輝く', '王族に匹敵する気品']
    }
  };
  
  return descriptions[level] || descriptions[0];
}

/**
 * 幻装レベルによる来店ボーナスを計算
 */
export function calculateGlamorVisitBonus(level: number): {
  reputationBonus: number;
  satisfactionBonus: number;
  tipBonus: number;
} {
  const bonuses: Record<number, { reputationBonus: number; satisfactionBonus: number; tipBonus: number }> = {
    0: { reputationBonus: 0, satisfactionBonus: 0, tipBonus: 0 },
    1: { reputationBonus: 1, satisfactionBonus: 0.05, tipBonus: 0.02 },
    2: { reputationBonus: 2, satisfactionBonus: 0.1, tipBonus: 0.05 },
    3: { reputationBonus: 3, satisfactionBonus: 0.15, tipBonus: 0.08 },
    4: { reputationBonus: 5, satisfactionBonus: 0.2, tipBonus: 0.12 },
    5: { reputationBonus: 8, satisfactionBonus: 0.25, tipBonus: 0.18 },
    6: { reputationBonus: 12, satisfactionBonus: 0.3, tipBonus: 0.25 }
  };
  
  return bonuses[level] || bonuses[0];
}

/**
 * 幻装維持に必要な最低条件を取得
 */
export function getGlamorMaintenanceRequirements(level: number): {
  minDailyProfit: number;
  minReputation: number;
  minCustomers: number;
} {
  const requirements: Record<number, { minDailyProfit: number; minReputation: number; minCustomers: number }> = {
    0: { minDailyProfit: -Infinity, minReputation: 0, minCustomers: 0 },
    1: { minDailyProfit: -5000, minReputation: 5, minCustomers: 3 },
    2: { minDailyProfit: -2000, minReputation: 10, minCustomers: 5 },
    3: { minDailyProfit: 0, minReputation: 15, minCustomers: 8 },
    4: { minDailyProfit: 2000, minReputation: 25, minCustomers: 12 },
    5: { minDailyProfit: 5000, minReputation: 40, minCustomers: 18 },
    6: { minDailyProfit: 10000, minReputation: 60, minCustomers: 25 }
  };
  
  return requirements[level] || requirements[0];
}

/**
 * デバッグ用：幻装状態をログ出力
 */
export function debugGlamorStatus(
  points: number,
  level: number,
  factors?: DailyGlamorFactors
): void {
  console.log('=== 幻装ステータス ===');
  console.log(`現在のポイント: ${points}`);
  console.log(`現在のレベル: ${level}`);
  
  const progress = calculateLevelProgress(points, level);
  console.log(`次のレベルまで: ${progress.pointsToNextLevel}pt (${progress.progressPercent}%)`);
  
  const appearance = getGlamorAppearanceDescription(level);
  console.log(`見た目: ${appearance.title}`);
  console.log(`説明: ${appearance.description}`);
  
  if (factors) {
    const change = calculateDailyGlamorChange(factors);
    console.log('\n=== 日次変動 ===');
    console.log(`合計: ${change.totalChange > 0 ? '+' : ''}${change.totalChange}`);
    console.log('内訳:');
    Object.entries(change.breakdown).forEach(([key, value]) => {
      if (value !== 0) {
        console.log(`  ${key}: ${value > 0 ? '+' : ''}${value}`);
      }
    });
  }
}
