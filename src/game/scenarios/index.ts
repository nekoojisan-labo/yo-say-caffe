// src/game/scenarios/index.ts
// シナリオ統合ファイル - 全シナリオの管理とトリガー判定

import { ScenarioChapter, IkemenId } from '@/types';

// 各シナリオのインポート
import { PROLOGUE, getPrologueScenario } from './prologue';
import { TUTORIAL_SCENARIOS, getNextTutorialScenario, isTutorialActive } from './tutorial';
import { SHION_MAIN_SCENARIOS, getShionProgress, getNextShionScenario } from './shion/main';
import { ZEPHYROS_EVENTS, updateZephyrosFlags, getZephyrosStatus, calculateDebtInterest } from './events/zephyros';
import { ROSA_EVENTS, updateRosaFlags, getRosaRelationship } from './events/rosa';
import { SHOURAN_EVENTS, updateGlamorFlags, updateWeeklyShouranTrigger, updateHiddenStatTrigger, calculateGlamorLevel, calculateGlamorProgress, calculateGlamorStability, GLAMOR_LEVEL_THRESHOLDS } from './events/shouran';
import { LUCIA_SCENARIOS, getLuciaProgress, updateLuciaAffectionFlags } from './ikemen/lucia';

// ============================================
// 全シナリオの統合
// ============================================

/**
 * 全シナリオを統合した配列
 */
export const ALL_SCENARIOS: ScenarioChapter[] = [
  ...PROLOGUE,
  ...TUTORIAL_SCENARIOS,
  ...SHION_MAIN_SCENARIOS,
  ...ZEPHYROS_EVENTS,
  ...ROSA_EVENTS,
  ...SHOURAN_EVENTS,
  ...LUCIA_SCENARIOS
];

/**
 * シナリオをIDで検索
 */
export function getScenarioById(id: string): ScenarioChapter | undefined {
  return ALL_SCENARIOS.find(scenario => scenario.id === id);
}

/**
 * カテゴリ別シナリオ取得
 */
export const SCENARIOS_BY_CATEGORY = {
  prologue: PROLOGUE,
  tutorial: TUTORIAL_SCENARIOS,
  shion: SHION_MAIN_SCENARIOS,
  zephyros: ZEPHYROS_EVENTS,
  rosa: ROSA_EVENTS,
  shouran: SHOURAN_EVENTS,
  lucia: LUCIA_SCENARIOS
};

// ============================================
// シナリオトリガー判定
// ============================================

/**
 * トリガー条件を満たすシナリオを取得
 */
export function getTriggeredScenario(
  day: number,
  _reputation: number,
  money: number,
  flags: Record<string, boolean | string | number>,
  completedScenarios: string[],
  _affection?: Record<IkemenId, number>
): ScenarioChapter | null {
  // 優先度順にチェック

  // 1. プロローグ（最優先）
  const prologueScenario = getPrologueScenario(day, flags, completedScenarios);
  if (prologueScenario) return prologueScenario;

  // 2. チュートリアル
  if (isTutorialActive(day, flags)) {
    const tutorialScenario = getNextTutorialScenario(day, flags);
    if (tutorialScenario && !completedScenarios.includes(tutorialScenario.id)) {
      return tutorialScenario;
    }
  }

  // 3. 照覧チュートリアル（Day 2）
  const shouranTutorial = SHOURAN_EVENTS.find(s => s.id === 'shouran_tutorial');
  if (shouranTutorial && day >= 2 && flags['prologue_complete'] && !completedScenarios.includes('shouran_tutorial')) {
    return shouranTutorial;
  }

  // 4. ゼフィロス関連（危機的状況）
  for (const scenario of ZEPHYROS_EVENTS) {
    if (completedScenarios.includes(scenario.id)) continue;
    if (checkTriggerCondition(scenario, day, _reputation, money, flags)) {
      return scenario;
    }
  }

  // 5. ローザ関連（救済イベント）
  for (const scenario of ROSA_EVENTS) {
    if (completedScenarios.includes(scenario.id)) continue;
    if (checkTriggerCondition(scenario, day, _reputation, money, flags)) {
      return scenario;
    }
  }

  // 6. シオンメインシナリオ
  const shionScenario = getNextShionScenario(completedScenarios, flags, day);
  if (shionScenario) return shionScenario;

  // 7. 照覧イベント（レベルアップ/ダウン等）
  for (const scenario of SHOURAN_EVENTS) {
    if (scenario.id === 'shouran_tutorial') continue; // 既にチェック済み
    if (completedScenarios.includes(scenario.id)) continue;
    if (checkTriggerCondition(scenario, day, _reputation, money, flags)) {
      return scenario;
    }
  }

  // 8. イケメン個別シナリオ
  for (const scenario of LUCIA_SCENARIOS) {
    if (completedScenarios.includes(scenario.id)) continue;
    if (checkTriggerCondition(scenario, day, _reputation, money, flags)) {
      return scenario;
    }
  }

  return null;
}

/**
 * シナリオのトリガー条件をチェック
 */
function checkTriggerCondition(
  scenario: ScenarioChapter,
  day: number,
  reputation: number,
  money: number,
  flags: Record<string, boolean | string | number>
): boolean {
  const trigger = scenario.triggerCondition;

  // triggerCondition が未定義なら条件なし = 常にtrue
  if (!trigger) return true;

  // Day条件
  if (trigger.day !== undefined && day < trigger.day) {
    return false;
  }

  // Day範囲条件
  if (trigger.dayRange) {
    if (Array.isArray(trigger.dayRange)) {
      const [minDay, maxDay] = trigger.dayRange;
      if (day < minDay || day > maxDay) {
        return false;
      }
    } else {
      if (trigger.dayRange.min !== undefined && day < trigger.dayRange.min) return false;
      if (trigger.dayRange.max !== undefined && day > trigger.dayRange.max) return false;
    }
  }

  // 評判条件
  if (trigger.reputation !== undefined && reputation < trigger.reputation) {
    return false;
  }

  // 資金条件
  if (trigger.money !== undefined && money < trigger.money) {
    return false;
  }

  // フラグ条件
  if (trigger.flag) {
    if (typeof trigger.flag === 'string') {
      // string の場合: flagValue が指定されていればその値と比較、なければ truthy チェック
      if (trigger.flagValue !== undefined) {
        if (flags[trigger.flag] !== trigger.flagValue) return false;
      } else {
        if (!flags[trigger.flag]) return false;
      }
    } else {
      // { key, value } オブジェクトの場合
      if (flags[trigger.flag.key] !== trigger.flag.value) return false;
    }
  }

  return true;
}

// ============================================
// 好感度フラグ自動更新
// ============================================

/**
 * 全イケメンの好感度フラグを更新
 */
export function updateAffectionFlags(
  affection: Record<IkemenId, number>,
  currentFlags: Record<string, boolean | string | number>
): Record<string, boolean | string | number> {
  let updatedFlags = { ...currentFlags };

  const ikemenIds: IkemenId[] = [
    'lucia', 'kagerou', 'haruto', 'ren', 'mizuki',
    'souma', 'yukito', 'riku', 'aoi', 'shion'
  ];

  const thresholds = [100, 300, 500, 800];

  for (const id of ikemenIds) {
    const currentAffection = affection[id] || 0;

    for (const threshold of thresholds) {
      const flagKey = `${id}_affection_${threshold}`;
      if (currentAffection >= threshold && !updatedFlags[flagKey]) {
        updatedFlags[flagKey] = true;
      }
    }
  }

  // ルシア専用の更新
  updatedFlags = updateLuciaAffectionFlags(affection['lucia'] || 0, updatedFlags);

  return updatedFlags;
}

/**
 * 危機関連フラグを更新
 */
export function updateCrisisFlags(
  money: number,
  _reputation: number,
  debt: number,
  day: number,
  flags: Record<string, boolean | string | number>
): Record<string, boolean | string | number> {
  let updatedFlags = { ...flags };

  // ゼフィロス関連
  updatedFlags = updateZephyrosFlags(money, debt, updatedFlags, day);

  // ローザ関連
  updatedFlags = updateRosaFlags(money, updatedFlags, day);

  return updatedFlags;
}

/**
 * 幻装関連フラグを更新
 */
export function updateAllGlamorFlags(
  currentLevel: number,
  previousLevel: number,
  glamorPoints: number,
  consecutiveProfitDays: number,
  consecutiveLossDays: number,
  reputation: number,
  day: number,
  totalAffection: number,
  flags: Record<string, boolean | string | number>
): Record<string, boolean | string | number> {
  let updatedFlags = { ...flags };

  // 安定度を計算
  const stability = calculateGlamorStability(consecutiveProfitDays, consecutiveLossDays, reputation);

  // 幻装レベル関連
  updatedFlags = updateGlamorFlags(currentLevel, previousLevel, glamorPoints, stability, updatedFlags);

  // 週末の照覧
  updatedFlags = updateWeeklyShouranTrigger(day, updatedFlags);

  // 隠しステータス
  updatedFlags = updateHiddenStatTrigger(totalAffection, updatedFlags);

  return updatedFlags;
}

// ============================================
// 日次フラグ一括更新
// ============================================

/**
 * 日次処理で全フラグを更新
 */
export function updateDailyFlags(
  state: {
    day: number;
    money: number;
    reputation: number;
    debt: number;
    glamor: { level: number; points: number };
    previousGlamorLevel: number;
    consecutiveProfitDays: number;
    consecutiveLossDays: number;
    affection: Record<IkemenId, number>;
    flags: Record<string, boolean | string | number>;
  }
): Record<string, boolean | string | number> {
  let updatedFlags = { ...state.flags };

  // 好感度フラグ
  updatedFlags = updateAffectionFlags(state.affection, updatedFlags);

  // 危機フラグ
  updatedFlags = updateCrisisFlags(
    state.money,
    state.reputation,
    state.debt,
    state.day,
    updatedFlags
  );

  // 総好感度を計算
  const totalAffection = Object.values(state.affection).reduce((sum, val) => sum + val, 0);

  // 幻装フラグ
  updatedFlags = updateAllGlamorFlags(
    state.glamor.level,
    state.previousGlamorLevel,
    state.glamor.points,
    state.consecutiveProfitDays,
    state.consecutiveLossDays,
    state.reputation,
    state.day,
    totalAffection,
    updatedFlags
  );

  return updatedFlags;
}

// ============================================
// シナリオ進行状況
// ============================================

/**
 * 全シナリオの進行状況を取得
 */
export function getAllScenarioProgress(
  completedScenarios: string[],
  flags: Record<string, boolean | string | number>
): {
  prologue: { isComplete: boolean };
  tutorial: { isComplete: boolean; day: number };
  shion: ReturnType<typeof getShionProgress>;
  zephyros: ReturnType<typeof getZephyrosStatus>;
  rosa: ReturnType<typeof getRosaRelationship>;
  lucia: ReturnType<typeof getLuciaProgress>;
  totalCompleted: number;
  totalScenarios: number;
} {
  const prologueComplete = flags['prologue_complete'] === true;
  const tutorialComplete = flags['tutorial_complete'] === true;

  return {
    prologue: { isComplete: prologueComplete },
    tutorial: {
      isComplete: tutorialComplete,
      day: tutorialComplete ? 3 : (flags['tutorial_day1_complete'] ? 2 : 1)
    },
    shion: getShionProgress(completedScenarios, flags),
    zephyros: getZephyrosStatus(flags),
    rosa: getRosaRelationship(flags),
    lucia: getLuciaProgress(completedScenarios, flags),
    totalCompleted: completedScenarios.length,
    totalScenarios: ALL_SCENARIOS.length
  };
}

/**
 * 特定のイケメンのシナリオ進行状況を取得
 */
export function getIkemenScenarioProgress(
  ikemenId: IkemenId,
  completedScenarios: string[],
  flags: Record<string, boolean | string | number>
): {
  currentChapter: number;
  isRouteComplete: boolean;
  nextTrigger: string;
} {
  switch (ikemenId) {
    case 'lucia':
      const luciaProgress = getLuciaProgress(completedScenarios, flags);
      return {
        currentChapter: luciaProgress.currentChapter,
        isRouteComplete: luciaProgress.isRouteComplete,
        nextTrigger: luciaProgress.nextTrigger
      };
    case 'shion':
      return getShionProgress(completedScenarios, flags);
    // 他のイケメンは今後追加
    default:
      return {
        currentChapter: 0,
        isRouteComplete: false,
        nextTrigger: '未実装'
      };
  }
}

// ============================================
// エクスポート
// ============================================

// シナリオデータ
export {
  PROLOGUE,
  TUTORIAL_SCENARIOS,
  SHION_MAIN_SCENARIOS,
  ZEPHYROS_EVENTS,
  ROSA_EVENTS,
  SHOURAN_EVENTS,
  LUCIA_SCENARIOS
};

// ヘルパー関数
export {
  // プロローグ
  getPrologueScenario,

  // チュートリアル
  getNextTutorialScenario,
  isTutorialActive,

  // シオン
  getShionProgress,
  getNextShionScenario,

  // ゼフィロス
  updateZephyrosFlags,
  getZephyrosStatus,
  calculateDebtInterest,

  // ローザ
  updateRosaFlags,
  getRosaRelationship,

  // 照覧
  updateGlamorFlags,
  updateWeeklyShouranTrigger,
  updateHiddenStatTrigger,
  calculateGlamorLevel,
  calculateGlamorProgress,
  calculateGlamorStability,
  GLAMOR_LEVEL_THRESHOLDS,

  // ルシア
  getLuciaProgress,
  updateLuciaAffectionFlags
};

// ============================================
// デバッグ用
// ============================================

/**
 * 全シナリオの一覧を出力
 */
export function debugListAllScenarios(): void {
  console.log('=== 全シナリオ一覧 ===');
  console.log(`総数: ${ALL_SCENARIOS.length}`);

  console.log('\n【プロローグ】');
  PROLOGUE.forEach(s => console.log(`  - ${s.id}: ${s.title}`));

  console.log('\n【チュートリアル】');
  TUTORIAL_SCENARIOS.forEach(s => console.log(`  - ${s.id}: ${s.title}`));

  console.log('\n【シオン】');
  SHION_MAIN_SCENARIOS.forEach(s => console.log(`  - ${s.id}: ${s.title}`));

  console.log('\n【ゼフィロス】');
  ZEPHYROS_EVENTS.forEach(s => console.log(`  - ${s.id}: ${s.title}`));

  console.log('\n【ローザ】');
  ROSA_EVENTS.forEach(s => console.log(`  - ${s.id}: ${s.title}`));

  console.log('\n【照覧】');
  SHOURAN_EVENTS.forEach(s => console.log(`  - ${s.id}: ${s.title}`));

  console.log('\n【ルシア】');
  LUCIA_SCENARIOS.forEach(s => console.log(`  - ${s.id}: ${s.title}`));
}

/**
 * フラグの状態をダンプ
 */
export function debugDumpFlags(flags: Record<string, boolean | string | number>): void {
  console.log('=== フラグ状態 ===');
  Object.entries(flags).forEach(([key, value]) => {
    console.log(`  ${key}: ${value}`);
  });
}
