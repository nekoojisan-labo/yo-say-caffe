import { GameState, DayResult } from '@/types';

// レベル変換テーブル
const LEVEL_THRESHOLDS = [
    { level: 6, points: 600 },
    { level: 5, points: 480 },
    { level: 4, points: 360 },
    { level: 3, points: 240 },
    { level: 2, points: 140 },
    { level: 1, points: 60 },
    { level: 0, points: 0 },
];

/**
 * ポイントからレベルを算出
 */
export function getGlamorLevelFromPoints(points: number): number {
    const match = LEVEL_THRESHOLDS.find((t) => points >= t.points);
    return match ? match.level : 0;
}

/**
 * 日次のポイント変動を計算
 */
export function calculatePointsDelta(state: GameState, result: DayResult): number {
    const { reputation } = state;
    const { profit, cashAfter } = result;

    let delta = 0;

    // 1. 利益による変動
    if (profit > 0) {
        delta += Math.floor(profit / 100);
    } else if (profit < 0) {
        delta -= Math.ceil(Math.abs(profit) / 80);
    }

    // 2. 評判による補正
    delta += Math.floor((reputation - 50) / 10);

    // 3. 資金レベルによるペナルティ
    if (cashAfter < 300) {
        delta -= 3;
    } else if (cashAfter < 600) {
        delta -= 1;
    }

    return delta;
}

/**
 * 安定度の変動を計算
 */
export function calculateStabilityDelta(params: {
    profit: number;
    reputation: number;
    levelDelta: number;
}): number {
    const { profit, reputation, levelDelta } = params;
    let delta = 0;

    if (profit > 0) delta += 3;
    if (profit < 0) delta -= 5;

    if (reputation >= 60) delta += 2;
    if (reputation <= 40) delta -= 2;

    if (levelDelta < 0) delta -= 8;
    if (levelDelta > 0) delta += 5;

    return delta;
}
