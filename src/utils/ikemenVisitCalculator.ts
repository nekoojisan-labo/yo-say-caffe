// src/utils/ikemenVisitCalculator.ts
// イケメン来店計算システム - 日次の来店者決定と来店イベント管理

import { IkemenId, MetaParameters } from '@/types';
import { 
  IKEMEN_CHARACTERS, 
  IkemenCharacter, 
  VISITABLE_IKEMEN_LIST,
  IKEMEN_BY_RANK 
} from '@/game/characters';
import { calculateVisitProbability } from '@/game/metaParameters';

/**
 * 時間帯の定義
 */
export type TimeSlot = 'morning' | 'noon' | 'afternoon' | 'evening' | 'night';

/**
 * 時間帯の表示名
 */
export const TIME_SLOT_LABELS: Record<TimeSlot, string> = {
  morning: '朝（8:00-10:00）',
  noon: '昼（11:00-14:00）',
  afternoon: '午後（14:00-17:00）',
  evening: '夕方（17:00-19:00）',
  night: '夜（19:00-21:00）'
};

/**
 * 来店情報
 */
export interface VisitInfo {
  ikemenId: IkemenId;
  timeSlot: TimeSlot;
  probability: number;
  isSpecialVisit: boolean;  // 特別イベントでの来店か
  triggerReason?: string;   // 来店理由（デバッグ用）
}

/**
 * 1日の来店スケジュール
 */
export interface DailyVisitSchedule {
  day: number;
  visitors: VisitInfo[];
  totalVisitors: number;
  specialEvents: string[];
}

/**
 * 来店履歴
 */
export interface VisitHistory {
  ikemenId: IkemenId;
  day: number;
  timeSlot: TimeSlot;
  orderedItems: string[];
  satisfaction: number;  // 1-5
  affectionGained: number;
}

/**
 * 時間帯ごとの来店確率補正
 */
const TIME_SLOT_MODIFIERS: Record<TimeSlot, number> = {
  morning: 0.7,    // 朝は来店少なめ
  noon: 1.2,       // 昼は来店多め
  afternoon: 1.0,  // 午後は標準
  evening: 1.1,    // 夕方はやや多め
  night: 0.8       // 夜は少なめ
};

/**
 * 曜日による来店確率補正（0=日曜日）
 */
const DAY_OF_WEEK_MODIFIERS: Record<number, number> = {
  0: 1.3,  // 日曜日: +30%
  1: 0.8,  // 月曜日: -20%
  2: 0.9,  // 火曜日: -10%
  3: 1.0,  // 水曜日: 標準
  4: 1.0,  // 木曜日: 標準
  5: 1.1,  // 金曜日: +10%
  6: 1.2   // 土曜日: +20%
};

/**
 * イケメンの好む時間帯かどうかを判定
 */
function isPreferredTimeSlot(ikemen: IkemenCharacter, timeSlot: TimeSlot): boolean {
  return ikemen.visitTimePreference.includes(timeSlot);
}

/**
 * 時間帯による来店確率を計算
 */
function calculateTimeSlotProbability(
  ikemen: IkemenCharacter,
  timeSlot: TimeSlot,
  baseProbability: number
): number {
  let probability = baseProbability;
  
  // 時間帯の基本補正
  probability *= TIME_SLOT_MODIFIERS[timeSlot];
  
  // イケメンの好む時間帯なら確率アップ
  if (isPreferredTimeSlot(ikemen, timeSlot)) {
    probability *= 1.5;
  } else {
    probability *= 0.5;
  }
  
  return probability;
}

/**
 * 連続来店ペナルティを計算
 */
function calculateConsecutiveVisitPenalty(
  ikemenId: IkemenId,
  recentVisits: VisitHistory[],
  currentDay: number
): number {
  // 直近3日間の来店をチェック
  const recentDays = [currentDay - 1, currentDay - 2, currentDay - 3];
  const visitCount = recentVisits.filter(
    v => v.ikemenId === ikemenId && recentDays.includes(v.day)
  ).length;
  
  // 連続来店するほどペナルティ
  switch (visitCount) {
    case 0: return 1.0;   // ペナルティなし
    case 1: return 0.7;   // 昨日来た: -30%
    case 2: return 0.4;   // 2日連続: -60%
    case 3: return 0.2;   // 3日連続: -80%
    default: return 0.1;
  }
}

/**
 * 好感度による来店ボーナスを計算
 */
function calculateAffectionBonus(affection: number): number {
  if (affection >= 800) return 1.5;      // 恋心: +50%
  if (affection >= 500) return 1.3;      // 信頼: +30%
  if (affection >= 300) return 1.2;      // 親交: +20%
  if (affection >= 100) return 1.1;      // 知人: +10%
  return 1.0;                            // 初対面: ボーナスなし
}

/**
 * 1日の来店スケジュールを生成
 */
export function generateDailyVisitSchedule(
  day: number,
  metaParams: MetaParameters,
  affections: Record<IkemenId, number>,
  recentVisits: VisitHistory[],
  options: {
    maxVisitorsPerDay?: number;
    guaranteedVisitor?: IkemenId;
    excludeIds?: IkemenId[];
  } = {}
): DailyVisitSchedule {
  const {
    maxVisitorsPerDay = 5,
    guaranteedVisitor,
    excludeIds = []
  } = options;
  
  const visitors: VisitInfo[] = [];
  const specialEvents: string[] = [];
  const dayOfWeek = day % 7;
  
  // 来店可能なイケメンリスト
  const availableIkemen = VISITABLE_IKEMEN_LIST.filter(
    ikemen => !excludeIds.includes(ikemen.id as IkemenId)
  );
  
  // 保証された来店者を追加
  if (guaranteedVisitor && !excludeIds.includes(guaranteedVisitor)) {
    const ikemen = IKEMEN_CHARACTERS[guaranteedVisitor];
    if (ikemen) {
      const preferredTime = ikemen.visitTimePreference[0] || 'afternoon';
      visitors.push({
        ikemenId: guaranteedVisitor,
        timeSlot: preferredTime,
        probability: 1.0,
        isSpecialVisit: true,
        triggerReason: 'シナリオイベント'
      });
      specialEvents.push(`${ikemen.name}が特別来店`);
    }
  }
  
  // 時間帯ごとに来店者を決定
  const timeSlots: TimeSlot[] = ['morning', 'noon', 'afternoon', 'evening', 'night'];
  
  for (const timeSlot of timeSlots) {
    if (visitors.length >= maxVisitorsPerDay) break;
    
    // 各イケメンの来店確率を計算
    const candidates = availableIkemen
      .filter(ikemen => !visitors.some(v => v.ikemenId === ikemen.id))
      .map(ikemen => {
        const ikemenId = ikemen.id as IkemenId;
        
        // 基本確率（メタパラメータベース）
        let probability = calculateVisitProbability(ikemen, metaParams);
        
        // 時間帯補正
        probability = calculateTimeSlotProbability(ikemen, timeSlot, probability);
        
        // 曜日補正
        probability *= DAY_OF_WEEK_MODIFIERS[dayOfWeek];
        
        // 連続来店ペナルティ
        probability *= calculateConsecutiveVisitPenalty(ikemenId, recentVisits, day);
        
        // 好感度ボーナス
        const affection = affections[ikemenId] || 0;
        probability *= calculateAffectionBonus(affection);
        
        return { ikemen, probability, timeSlot };
      })
      .filter(c => c.probability > 0.05) // 確率5%未満は除外
      .sort((a, b) => b.probability - a.probability);
    
    // 確率に基づいて来店を決定
    for (const candidate of candidates) {
      if (visitors.length >= maxVisitorsPerDay) break;
      
      const roll = Math.random();
      if (roll < candidate.probability) {
        visitors.push({
          ikemenId: candidate.ikemen.id as IkemenId,
          timeSlot: candidate.timeSlot,
          probability: candidate.probability,
          isSpecialVisit: false,
          triggerReason: `メタパラメータマッチ（${Math.floor(candidate.probability * 100)}%）`
        });
      }
    }
  }
  
  // 最低1人は来店するように調整
  if (visitors.length === 0 && availableIkemen.length > 0) {
    // 最も確率の高いイケメンを選択
    const fallbackIkemen = availableIkemen
      .map(ikemen => ({
        ikemen,
        probability: calculateVisitProbability(ikemen, metaParams)
      }))
      .sort((a, b) => b.probability - a.probability)[0];
    
    if (fallbackIkemen) {
      const preferredTime = fallbackIkemen.ikemen.visitTimePreference[0] || 'afternoon';
      visitors.push({
        ikemenId: fallbackIkemen.ikemen.id as IkemenId,
        timeSlot: preferredTime,
        probability: fallbackIkemen.probability,
        isSpecialVisit: false,
        triggerReason: '最低来店保証'
      });
    }
  }
  
  // 時間帯順にソート
  const timeSlotOrder: Record<TimeSlot, number> = {
    morning: 0,
    noon: 1,
    afternoon: 2,
    evening: 3,
    night: 4
  };
  visitors.sort((a, b) => timeSlotOrder[a.timeSlot] - timeSlotOrder[b.timeSlot]);
  
  return {
    day,
    visitors,
    totalVisitors: visitors.length,
    specialEvents
  };
}

/**
 * 特定のイケメンを呼び込むためのアドバイスを生成
 */
export function getVisitAdvice(
  targetIkemenId: IkemenId,
  currentMetaParams: MetaParameters
): string[] {
  const ikemen = IKEMEN_CHARACTERS[targetIkemenId];
  if (!ikemen) return [];
  
  const advice: string[] = [];
  const weights = ikemen.metaParameterWeights;
  
  // 最も重視するパラメータを特定
  const paramPriorities = [
    { key: 'luxury', weight: weights.luxury, name: '高級感', current: currentMetaParams.luxury },
    { key: 'volume', weight: weights.volume, name: 'ボリューム', current: currentMetaParams.volume },
    { key: 'healing', weight: weights.healing, name: '癒し', current: currentMetaParams.healing },
    { key: 'stability', weight: weights.stability, name: '安定感', current: currentMetaParams.stability },
    { key: 'mystery', weight: weights.mystery, name: '神秘性', current: currentMetaParams.mystery }
  ].sort((a, b) => b.weight - a.weight);
  
  // トップ2のパラメータについてアドバイス
  for (let i = 0; i < 2; i++) {
    const param = paramPriorities[i];
    if (param.current < 60) {
      advice.push(`${ikemen.name}は${param.name}を好みます（現在: ${param.current}）`);
    }
  }
  
  // 好む時間帯
  const preferredTimes = ikemen.visitTimePreference
    .map(t => TIME_SLOT_LABELS[t])
    .join('、');
  advice.push(`来店しやすい時間帯: ${preferredTimes}`);
  
  // 好むメニューカテゴリ
  if (ikemen.favoriteMenuCategories.length > 0) {
    const categories = ikemen.favoriteMenuCategories.join('、');
    advice.push(`好むメニュー: ${categories}`);
  }
  
  return advice;
}

/**
 * ランク別の来店傾向を取得
 */
export function getVisitTrendByRank(
  metaParams: MetaParameters
): Record<string, { avgProbability: number; likelyVisitors: string[] }> {
  const result: Record<string, { avgProbability: number; likelyVisitors: string[] }> = {};
  
  for (const [rank, ikemenList] of Object.entries(IKEMEN_BY_RANK)) {
    const probabilities = ikemenList.map(ikemen => 
      calculateVisitProbability(ikemen, metaParams)
    );
    
    const avgProbability = probabilities.reduce((a, b) => a + b, 0) / probabilities.length;
    const likelyVisitors = ikemenList
      .filter((_, i) => probabilities[i] > 0.3)
      .map(ikemen => ikemen.name);
    
    result[rank] = { avgProbability, likelyVisitors };
  }
  
  return result;
}

/**
 * 来店予測サマリーを生成
 */
export function generateVisitForecast(
  metaParams: MetaParameters,
  affections: Record<IkemenId, number>
): string[] {
  const forecast: string[] = [];
  
  // 各イケメンの来店確率を計算
  const predictions = VISITABLE_IKEMEN_LIST.map(ikemen => {
    const ikemenId = ikemen.id as IkemenId;
    let probability = calculateVisitProbability(ikemen, metaParams);
    probability *= calculateAffectionBonus(affections[ikemenId] || 0);
    return { ikemen, probability };
  }).sort((a, b) => b.probability - a.probability);
  
  // 上位3人を予測として表示
  forecast.push('【来店予測】');
  predictions.slice(0, 3).forEach((pred, index) => {
    const percent = Math.floor(pred.probability * 100);
    const stars = percent >= 60 ? '★★★' : percent >= 40 ? '★★☆' : '★☆☆';
    forecast.push(`${index + 1}. ${pred.ikemen.name} ${stars} (${percent}%)`);
  });
  
  return forecast;
}

/**
 * デバッグ用：全イケメンの来店確率を出力
 */
export function debugVisitProbabilities(
  metaParams: MetaParameters,
  affections: Record<IkemenId, number>
): void {
  console.log('=== 来店確率デバッグ ===');
  console.log('メタパラメータ:', metaParams);
  
  VISITABLE_IKEMEN_LIST.forEach(ikemen => {
    const ikemenId = ikemen.id as IkemenId;
    const baseProbability = calculateVisitProbability(ikemen, metaParams);
    const affectionBonus = calculateAffectionBonus(affections[ikemenId] || 0);
    const finalProbability = baseProbability * affectionBonus;
    
    console.log(`${ikemen.name}: 基本${Math.floor(baseProbability * 100)}% × 好感度${affectionBonus} = ${Math.floor(finalProbability * 100)}%`);
  });
}
