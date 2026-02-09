// src/game/metaParameters.ts
// メタパラメータ計算システム - 仕入れ内容に基づいてイケメンの来店確率を決定

import { IkemenId, MetaParameters } from '@/types';
import { IKEMEN_CHARACTERS, IkemenCharacter, VISITABLE_IKEMEN_LIST } from './characters';
import { InventoryItem } from '@/store/inventoryStore';
import { MENU_ITEMS } from './menuData';

/**
 * メタパラメータの基準値
 */
export const BASE_META_PARAMETERS: MetaParameters = {
  luxury: 50,      // 高級感
  volume: 50,      // ボリューム
  healing: 50,     // 癒し
  stability: 50,   // 安定感
  mystery: 50,     // 神秘性
  reputation: 10   // 評判（初期値）
};

/**
 * メニューカテゴリごとのメタパラメータ影響値
 */
export const CATEGORY_META_EFFECTS: Record<string, Partial<MetaParameters>> = {
  // コーヒー系 - 安定感と高級感
  coffee: {
    stability: 15,
    luxury: 10,
    healing: 5
  },
  // 紅茶系 - 高級感と癒し
  tea: {
    luxury: 15,
    healing: 10,
    mystery: 5
  },
  // スイーツ系 - 癒しとボリューム
  sweets: {
    healing: 15,
    volume: 10,
    luxury: 5
  },
  // 軽食系 - ボリュームと安定感
  food: {
    volume: 20,
    stability: 10
  },
  // 特別メニュー - 神秘性と高級感
  special: {
    mystery: 20,
    luxury: 15,
    healing: 5
  },
  // 季節限定 - バランス型
  seasonal: {
    luxury: 10,
    healing: 10,
    mystery: 10
  }
};

/**
 * 仕入れ量によるボリュームパラメータ補正
 */
export const VOLUME_THRESHOLDS = {
  low: { max: 10, bonus: -10 },      // 10個以下: ボリューム-10
  normal: { max: 30, bonus: 0 },     // 11-30個: 変化なし
  high: { max: 50, bonus: 10 },      // 31-50個: ボリューム+10
  veryHigh: { max: Infinity, bonus: 20 } // 51個以上: ボリューム+20
};

/**
 * 価格帯による高級感パラメータ補正
 */
export const PRICE_LUXURY_EFFECT = {
  budget: { maxPrice: 300, luxuryBonus: -10 },    // 低価格帯
  standard: { maxPrice: 500, luxuryBonus: 0 },    // 標準価格帯
  premium: { maxPrice: 800, luxuryBonus: 10 },    // 高価格帯
  luxury: { maxPrice: Infinity, luxuryBonus: 20 } // 最高級
};

/**
 * 在庫からメタパラメータを計算
 */
export function calculateMetaParameters(
  inventory: InventoryItem[],
  currentReputation: number
): MetaParameters {
  // 基準値からスタート
  const params: MetaParameters = { ...BASE_META_PARAMETERS, reputation: currentReputation };
  
  if (inventory.length === 0) {
    return params;
  }
  
  // 総仕入れ量
  let totalQuantity = 0;
  let totalValue = 0;
  let categoryEffects: Partial<MetaParameters> = {};
  
  // 各在庫アイテムの影響を計算
  inventory.forEach(item => {
    const menuItem = MENU_ITEMS.find(m => m.id === item.menuItemId);
    if (!menuItem) return;
    
    totalQuantity += item.quantity;
    totalValue += menuItem.price * item.quantity;
    
    // カテゴリ効果を蓄積
    const catEffect = CATEGORY_META_EFFECTS[menuItem.category];
    if (catEffect) {
      Object.entries(catEffect).forEach(([key, value]) => {
        const paramKey = key as keyof MetaParameters;
        if (typeof value === 'number') {
          categoryEffects[paramKey] = (categoryEffects[paramKey] || 0) + value * (item.quantity / 10);
        }
      });
    }
  });
  
  // カテゴリ効果を適用
  Object.entries(categoryEffects).forEach(([key, value]) => {
    const paramKey = key as keyof MetaParameters;
    if (typeof value === 'number' && typeof params[paramKey] === 'number') {
      (params[paramKey] as number) += Math.floor(value);
    }
  });
  
  // ボリューム補正
  let volumeBonus = 0;
  if (totalQuantity <= VOLUME_THRESHOLDS.low.max) {
    volumeBonus = VOLUME_THRESHOLDS.low.bonus;
  } else if (totalQuantity <= VOLUME_THRESHOLDS.normal.max) {
    volumeBonus = VOLUME_THRESHOLDS.normal.bonus;
  } else if (totalQuantity <= VOLUME_THRESHOLDS.high.max) {
    volumeBonus = VOLUME_THRESHOLDS.high.bonus;
  } else {
    volumeBonus = VOLUME_THRESHOLDS.veryHigh.bonus;
  }
  params.volume += volumeBonus;
  
  // 平均価格による高級感補正
  const avgPrice = totalQuantity > 0 ? totalValue / totalQuantity : 0;
  let luxuryBonus = 0;
  if (avgPrice <= PRICE_LUXURY_EFFECT.budget.maxPrice) {
    luxuryBonus = PRICE_LUXURY_EFFECT.budget.luxuryBonus;
  } else if (avgPrice <= PRICE_LUXURY_EFFECT.standard.maxPrice) {
    luxuryBonus = PRICE_LUXURY_EFFECT.standard.luxuryBonus;
  } else if (avgPrice <= PRICE_LUXURY_EFFECT.premium.maxPrice) {
    luxuryBonus = PRICE_LUXURY_EFFECT.premium.luxuryBonus;
  } else {
    luxuryBonus = PRICE_LUXURY_EFFECT.luxury.luxuryBonus;
  }
  params.luxury += luxuryBonus;
  
  // 値を0-100の範囲にクランプ
  params.luxury = clamp(params.luxury, 0, 100);
  params.volume = clamp(params.volume, 0, 100);
  params.healing = clamp(params.healing, 0, 100);
  params.stability = clamp(params.stability, 0, 100);
  params.mystery = clamp(params.mystery, 0, 100);
  
  return params;
}

/**
 * イケメンの来店確率を計算
 */
export function calculateVisitProbability(
  ikemen: IkemenCharacter,
  metaParams: MetaParameters
): number {
  // 基本確率
  let probability = ikemen.baseVisitChance;
  
  // メタパラメータとの相性を計算
  const weights = ikemen.metaParameterWeights;
  
  // 各パラメータの影響を計算（重み付け）
  const luxuryMatch = (metaParams.luxury / 100) * weights.luxury;
  const volumeMatch = (metaParams.volume / 100) * weights.volume;
  const healingMatch = (metaParams.healing / 100) * weights.healing;
  const stabilityMatch = (metaParams.stability / 100) * weights.stability;
  const mysteryMatch = (metaParams.mystery / 100) * weights.mystery;
  
  // 合計マッチ度（0-1の範囲）
  const totalWeight = weights.luxury + weights.volume + weights.healing + weights.stability + weights.mystery;
  const matchScore = (luxuryMatch + volumeMatch + healingMatch + stabilityMatch + mysteryMatch) / totalWeight;
  
  // 確率を調整（マッチ度が高いほど来店確率が上がる）
  probability *= (0.5 + matchScore); // 0.5x ~ 1.5x の範囲
  
  // 評判による補正
  const reputationBonus = metaParams.reputation / 100 * 0.2; // 最大+20%
  probability += reputationBonus;
  
  // 確率を0-1の範囲にクランプ
  return clamp(probability, 0.05, 0.95); // 最低5%、最高95%
}

/**
 * 本日来店するイケメンを決定
 */
export function determineVisitingIkemen(
  metaParams: MetaParameters,
  maxVisitors: number = 3,
  excludeIds: IkemenId[] = []
): IkemenId[] {
  const visitors: IkemenId[] = [];
  
  // 来店可能なイケメンリスト（除外リストを適用）
  const availableIkemen = VISITABLE_IKEMEN_LIST.filter(
    ikemen => !excludeIds.includes(ikemen.id as IkemenId)
  );
  
  // 各イケメンの来店確率を計算してソート
  const ikemenWithProbability = availableIkemen.map(ikemen => ({
    ikemen,
    probability: calculateVisitProbability(ikemen, metaParams)
  })).sort((a, b) => b.probability - a.probability);
  
  // 確率に基づいて来店を決定
  for (const { ikemen, probability } of ikemenWithProbability) {
    if (visitors.length >= maxVisitors) break;
    
    const roll = Math.random();
    if (roll < probability) {
      visitors.push(ikemen.id as IkemenId);
    }
  }
  
  // 最低1人は来店するように調整（確率が高い順に選択）
  if (visitors.length === 0 && ikemenWithProbability.length > 0) {
    visitors.push(ikemenWithProbability[0].ikemen.id as IkemenId);
  }
  
  return visitors;
}

/**
 * イケメンの好むメニューカテゴリを取得
 */
export function getPreferredCategories(ikemenId: IkemenId): string[] {
  const ikemen = IKEMEN_CHARACTERS[ikemenId];
  if (!ikemen) return [];
  return ikemen.favoriteMenuCategories;
}

/**
 * 特定のメタパラメータを上げるためのアドバイスを生成
 */
export function getParameterAdvice(
  currentParams: MetaParameters,
  targetIkemenId?: IkemenId
): string[] {
  const advice: string[] = [];
  
  if (targetIkemenId) {
    const ikemen = IKEMEN_CHARACTERS[targetIkemenId];
    if (ikemen) {
      const weights = ikemen.metaParameterWeights;
      
      // 最も重視するパラメータを特定
      const priorities = [
        { param: 'luxury', weight: weights.luxury, name: '高級感' },
        { param: 'volume', weight: weights.volume, name: 'ボリューム' },
        { param: 'healing', weight: weights.healing, name: '癒し' },
        { param: 'stability', weight: weights.stability, name: '安定感' },
        { param: 'mystery', weight: weights.mystery, name: '神秘性' }
      ].sort((a, b) => b.weight - a.weight);
      
      const topPriority = priorities[0];
      const currentValue = currentParams[topPriority.param as keyof MetaParameters];
      
      if (typeof currentValue === 'number' && currentValue < 70) {
        advice.push(`${ikemen.name}は${topPriority.name}を重視します。${getParameterHint(topPriority.param)}`);
      }
    }
  }
  
  // 一般的なアドバイス
  if (currentParams.luxury < 40) {
    advice.push('高級感が低めです。紅茶や特別メニューを増やしてみましょう。');
  }
  if (currentParams.volume < 40) {
    advice.push('ボリュームが不足しています。軽食や仕入れ量を増やしてみましょう。');
  }
  if (currentParams.healing < 40) {
    advice.push('癒し要素が少ないです。スイーツを充実させてみましょう。');
  }
  
  return advice;
}

/**
 * パラメータ別のヒント
 */
function getParameterHint(param: string): string {
  switch (param) {
    case 'luxury':
      return '紅茶や特別メニューを仕入れると上がります。';
    case 'volume':
      return '軽食を多めに仕入れると上がります。';
    case 'healing':
      return 'スイーツを充実させると上がります。';
    case 'stability':
      return 'コーヒーを安定して提供すると上がります。';
    case 'mystery':
      return '特別メニューや季節限定を取り入れると上がります。';
    default:
      return '';
  }
}

/**
 * 数値を範囲内にクランプ
 */
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * メタパラメータの変化をログ出力（デバッグ用）
 */
export function logMetaParameterChanges(
  before: MetaParameters,
  after: MetaParameters
): void {
  console.log('=== メタパラメータ変化 ===');
  console.log(`高級感: ${before.luxury} → ${after.luxury} (${after.luxury - before.luxury >= 0 ? '+' : ''}${after.luxury - before.luxury})`);
  console.log(`ボリューム: ${before.volume} → ${after.volume} (${after.volume - before.volume >= 0 ? '+' : ''}${after.volume - before.volume})`);
  console.log(`癒し: ${before.healing} → ${after.healing} (${after.healing - before.healing >= 0 ? '+' : ''}${after.healing - before.healing})`);
  console.log(`安定感: ${before.stability} → ${after.stability} (${after.stability - before.stability >= 0 ? '+' : ''}${after.stability - before.stability})`);
  console.log(`神秘性: ${before.mystery} → ${after.mystery} (${after.mystery - before.mystery >= 0 ? '+' : ''}${after.mystery - before.mystery})`);
}
