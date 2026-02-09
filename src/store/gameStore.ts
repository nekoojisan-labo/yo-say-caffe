import { ASSETS } from '@/utils/assets';
import { create } from 'zustand';
import type {
  GameState,
  ScreenType,
  ShopRank,
  DayPhase,
  GameFlags,
  FinancialStats,
  DayResult,
  EventPayload,
  ManagementState,
  ManagementDecision,
  RomanceFocus,
  ScenarioChapter,
  TutorialStep,
  MetaParameters,
} from '@/types';
import { CharacterId, CHARACTER_LIST, IkemenId } from '@/game/characters';
import { ManagementEngine } from '@/utils/managementEngine';

// ===== ストアインターフェース =====
interface GameStore extends GameState {
  // 画面遷移
  setScreen: (screen: ScreenType) => void;

  // ゲームモード切り替え
  setGameMode: (mode: GameState['gameMode']) => void;

  // 日次フェーズ
  setDayPhase: (phase: DayPhase) => void;

  // ルートロック制御
  setLockedRoute: (id: string | null) => void;

  // 日数進行
  advanceDay: () => void;

  // お金の操作
  addMoney: (amount: number) => void;
  deductMoney: (amount: number) => boolean;

  // パラメータ更新
  updateReputation: (delta: number) => void;
  updateGlamor: (changes: Partial<GameState['glamor']>) => void;
  updateKPI: (kpi: Partial<FinancialStats>) => void;
  updateFlags: (flags: Partial<GameFlags>) => void;
  updateHistory: (summary: DayResult) => void;
  updateProtagonistVisual: (visual: GameState['protagonistVisual']) => void;

  // 連続日数更新
  updateConsecutiveDays: (profit: number) => void;

  // Romance Focus / Tickets
  updateRomanceFocus: (changes: Partial<RomanceFocus>) => void;
  addRomanceTicket: (charId: CharacterId) => void;
  useRomanceTicket: (charId: CharacterId) => void;

  // イベント選択肢の適用
  applyEventChoice: (eventId: string, choiceIndex: number, event: EventPayload) => void;

  // ランク更新
  setShopRank: (rank: ShopRank) => void;

  // 経営シミュレーション
  runManagementTurn: (decision: ManagementDecision) => void;
  updateManagement: (changes: Partial<ManagementState>) => void;

  // 図鑑・好感度
  unlockEncyclopedia: (charId: CharacterId) => void;
  addAffection: (charId: CharacterId, amount: number) => void;

  // シナリオ関連
  setCurrentScenario: (scenario: ScenarioChapter | null) => void;
  setCurrentEventIndex: (index: number) => void;
  advanceScenarioEvent: () => void;
  completeScenario: (scenarioId: string) => void;
  updateScenarioFlags: (flags: Record<string, boolean | string | number>) => void;
  setScenarioFlag: (key: string, value: boolean | string | number) => void;

  // チュートリアル関連
  setTutorialStep: (step: TutorialStep | null) => void;
  completeTutorial: () => void;
  skipTutorial: () => void;

  // 借金関連
  takeLoan: (amount: number, interestRate: number) => void;
  repayDebt: (amount: number) => void;
  applyDebtInterest: () => void;
  setGracePeriod: (days: number) => void;

  // メタパラメータ
  updateMetaParameters: (params: Partial<MetaParameters>) => void;
  calculateMetaParameters: (orders: Record<string, number>) => void;

  // ゲーム状態
  resetGame: () => void;
  setGameState: (state: Partial<GameState>) => void;
  startNewGame: (skipTutorial: boolean) => void;
}

// ===== 初期値定義 =====
const initialKPI: FinancialStats = {
  sales: 0,
  cogs: 0,
  profit: 0,
  fixedCost: 0,
  variableCost: 0,
  breakEven: 0,
};

const initialFlags: GameFlags = {
  joinedGuild: false,
  routeLock: null,
  gameOver: false,
  patronStage: 0,
};

const initialMetaParameters: MetaParameters = {
  luxury: 0,
  volume: 0,
  healing: 0,
  stability: 0,
  mystery: 0,
  reputation: 10,
};

const initialAffection = {} as Record<CharacterId, number>;
const initialEncyclopedia = {} as Record<CharacterId, boolean>;
const initialAppearance = {} as Record<CharacterId, number>;
const initialTickets = {} as Record<CharacterId, number>;

CHARACTER_LIST.forEach(char => {
  initialAffection[char.id] = 0;
  initialEncyclopedia[char.id] = false;
  initialAppearance[char.id] = 0;
  initialTickets[char.id] = 0;
});

// シオンは最初から図鑑解放
initialEncyclopedia['shion'] = true;

const initialState: GameState = {
  currentScreen: 'title',
  day: 1,
  money: 100000,
  reputation: 10,
  glamor: {
    level: 3,
    stability: 80,
    points: 240,
  },
  protagonistVisual: {
    setId: 'mc_L3',
    parts: {
      full: ASSETS.mainChara.lv3,
    },
  },

  // キャラクター関連
  affection: initialAffection,
  encyclopediaUnlocked: initialEncyclopedia,
  lastAppearedDay: initialAppearance,

  // シナリオ関連
  completedScenarios: [],
  currentScenario: null,
  currentEventIndex: 0,
  scenarioFlags: {},

  // チュートリアル関連
  tutorialStep: null,
  tutorialCompleted: false,
  isFirstPlaythrough: true,

  // 経営関連
  shopRank: 'F',
  gameMode: 'management',
  dayPhase: 'PREP',
  consecutiveProfitDays: 0,
  consecutiveLossDays: 0,

  // 借金関連
  debt: 0,
  debtInterestRate: 0.1, // 週利10%
  gracePeriodDays: 0,

  // メタパラメータ
  metaParameters: initialMetaParameters,

  flags: initialFlags,
  kpi: initialKPI,
  history: {
    dailyResults: [],
  },
  lockedRouteId: null,
  management: {
    capital: 3000000,
    popularity: 10,
    staffSkill: 30,
    inventoryLoss: 0,
    currentTrend: 'SNS映えスイーツ',
    potential: 80,
    weeklyHistory: [],
  },
  romanceFocus: { id: null, heat: 0 },
  romanceTickets: initialTickets,
};

// ===== ストア作成 =====
export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  // ===== 画面遷移 =====
  setScreen: (screen) => set({ currentScreen: screen }),

  setGameMode: (mode) => set({ gameMode: mode }),

  setDayPhase: (phase) => set({ dayPhase: phase }),

  setLockedRoute: (id) => set({ lockedRouteId: id }),

  // ===== 日数進行 =====
  advanceDay: () => set((state) => {
    const newDay = state.day + 1;
    
    // 借金の利息処理（7日ごと = 週末）
    let newDebt = state.debt;
    if (state.debt > 0 && newDay % 7 === 0) {
      newDebt = Math.floor(state.debt * (1 + state.debtInterestRate));
    }

    // 猶予期間のカウントダウン
    let newGracePeriod = state.gracePeriodDays;
    if (newGracePeriod > 0) {
      newGracePeriod -= 1;
    }

    return {
      day: newDay,
      debt: newDebt,
      gracePeriodDays: newGracePeriod,
    };
  }),

  // ===== お金の操作 =====
  addMoney: (amount) =>
    set((state) => ({
      money: state.money + amount,
    })),

  deductMoney: (amount) => {
    const currentMoney = get().money;
    if (currentMoney < amount) {
      return false;
    }
    set({ money: currentMoney - amount });
    return true;
  },

  // ===== パラメータ更新 =====
  updateReputation: (delta) =>
    set((state) => ({
      reputation: Math.max(0, Math.min(100, state.reputation + delta)),
    })),

  updateGlamor: (changes) =>
    set((state) => ({
      glamor: { ...state.glamor, ...changes },
    })),

  updateKPI: (kpi) =>
    set((state) => ({
      kpi: { ...state.kpi, ...kpi },
    })),

  updateFlags: (flags) =>
    set((state) => ({
      flags: { ...state.flags, ...flags },
    })),

  updateHistory: (summary) =>
    set((state) => ({
      history: {
        ...state.history,
        lastDaySummary: summary,
        dailyResults: [...state.history.dailyResults, summary],
      },
    })),

  updateProtagonistVisual: (visual) => set({ protagonistVisual: visual }),

  // ===== 連続日数更新 =====
  updateConsecutiveDays: (profit) =>
    set((state) => {
      if (profit > 0) {
        return {
          consecutiveProfitDays: state.consecutiveProfitDays + 1,
          consecutiveLossDays: 0,
        };
      } else if (profit < 0) {
        return {
          consecutiveProfitDays: 0,
          consecutiveLossDays: state.consecutiveLossDays + 1,
        };
      }
      return state;
    }),

  // ===== Romance Focus / Tickets =====
  updateRomanceFocus: (changes) =>
    set((state) => ({
      romanceFocus: { ...state.romanceFocus, ...changes },
    })),

  addRomanceTicket: (charId) =>
    set((state) => ({
      romanceTickets: {
        ...state.romanceTickets,
        [charId]: Math.min(9, (state.romanceTickets[charId] || 0) + 1),
      },
    })),

  useRomanceTicket: (charId) =>
    set((state) => ({
      romanceTickets: {
        ...state.romanceTickets,
        [charId]: Math.max(0, (state.romanceTickets[charId] || 0) - 1),
      },
    })),

  // ===== イベント選択肢の適用 =====
  applyEventChoice: (eventId, choiceIndex, event) => {
    const choice = event.choices[choiceIndex];
    if (!choice) return;

    set((state) => {
      const nextAffection = { ...state.affection };
      const nextEncyclopedia = { ...state.encyclopediaUnlocked };
      const nextLastAppeared = { ...state.lastAppearedDay };
      const nextFocus = { ...state.romanceFocus };

      if (event.characterId) {
        const charId = event.characterId as CharacterId;
        const currentAff = nextAffection[charId] || 0;

        const introBase = event.type === 'intro' ? 30 : 0;
        const delta = (choice.heartDelta || 0) + introBase;

        nextAffection[charId] = Math.max(0, Math.min(9999, currentAff + delta));
        nextLastAppeared[charId] = state.day;

        if (event.type === 'intro') {
          nextEncyclopedia[charId] = true;
        }

        const isPositive = (choice.heartDelta || 0) > 0;

        if (nextFocus.id === charId) {
          nextFocus.heat = Math.max(0, Math.min(100, nextFocus.heat + (isPositive ? 10 : -5)));
        } else if (isPositive) {
          if (nextFocus.id) {
            nextFocus.heat = Math.max(0, nextFocus.heat - 3);
          }
          if (nextFocus.heat < 10) {
            nextFocus.id = charId as IkemenId;
            nextFocus.heat = 10;
          }
        }

        if (nextFocus.heat <= 0) {
          nextFocus.id = null;
        }
      }

      return {
        affection: nextAffection,
        encyclopediaUnlocked: nextEncyclopedia,
        lastAppearedDay: nextLastAppeared,
        romanceFocus: nextFocus,
        reputation: Math.max(0, Math.min(100, state.reputation + (choice.repDelta || 0))),
        money: state.money + (choice.cashDelta || 0),
        glamor: {
          ...state.glamor,
          points: Math.max(0, state.glamor.points + (choice.glamorPointsDelta || 0)),
        },
        history: {
          ...state.history,
          lastEventId: eventId,
        },
        ...(choice.effects || {}),
      };
    });
  },

  // ===== ランク更新 =====
  setShopRank: (rank) => set({ shopRank: rank }),

  // ===== 経営シミュレーション =====
  runManagementTurn: (decision) => {
    const { management, shopRank } = get();
    const result = ManagementEngine.runWeeklySimulation(management, decision, shopRank);

    set((state) => ({
      management: {
        ...state.management,
        capital: state.management.capital + result.profit,
        popularity: Math.max(0, Math.min(100, state.management.popularity + result.popularityDelta)),
        staffSkill: Math.max(0, Math.min(100, state.management.staffSkill + result.staffSkillDelta)),
        weeklyHistory: [...state.management.weeklyHistory, result],
      },
    }));
  },

  updateManagement: (changes) =>
    set((state) => ({
      management: { ...state.management, ...changes },
    })),

  // ===== 図鑑・好感度 =====
  unlockEncyclopedia: (charId) =>
    set((state) => ({
      encyclopediaUnlocked: {
        ...state.encyclopediaUnlocked,
        [charId]: true,
      },
    })),

  addAffection: (charId, amount) =>
    set((state) => ({
      affection: {
        ...state.affection,
        [charId]: Math.min(9999, (state.affection[charId] || 0) + amount),
      },
    })),

  // ===== シナリオ関連 =====
  setCurrentScenario: (scenario) =>
    set({
      currentScenario: scenario,
      currentEventIndex: 0,
      currentScreen: scenario ? 'scenario' : get().currentScreen,
    }),

  setCurrentEventIndex: (index) => set({ currentEventIndex: index }),

  advanceScenarioEvent: () =>
    set((state) => ({
      currentEventIndex: state.currentEventIndex + 1,
    })),

  completeScenario: (scenarioId) =>
    set((state) => ({
      completedScenarios: [...state.completedScenarios, scenarioId],
      currentScenario: null,
      currentEventIndex: 0,
      currentScreen: 'home',
    })),

  updateScenarioFlags: (flags) =>
    set((state) => ({
      scenarioFlags: { ...state.scenarioFlags, ...flags },
    })),

  setScenarioFlag: (key, value) =>
    set((state) => ({
      scenarioFlags: { ...state.scenarioFlags, [key]: value },
    })),

  // ===== チュートリアル関連 =====
  setTutorialStep: (step) => set({ tutorialStep: step }),

  completeTutorial: () =>
    set({
      tutorialStep: null,
      tutorialCompleted: true,
      scenarioFlags: {
        ...get().scenarioFlags,
        tutorial_complete: true,
      },
    }),

  skipTutorial: () =>
    set({
      tutorialStep: null,
      tutorialCompleted: true,
      isFirstPlaythrough: false,
      day: 4, // チュートリアル後の日数から開始
      scenarioFlags: {
        ...get().scenarioFlags,
        tutorial_complete: true,
        prologue_complete: true,
      },
    }),

  // ===== 借金関連 =====
  takeLoan: (amount, interestRate) =>
    set((state) => ({
      money: state.money + amount,
      debt: state.debt + amount,
      debtInterestRate: interestRate,
      scenarioFlags: {
        ...state.scenarioFlags,
        has_debt: true,
        zephyros_loan_taken: true,
      },
    })),

  repayDebt: (amount) =>
    set((state) => {
      const actualRepay = Math.min(amount, state.debt);
      const newDebt = state.debt - actualRepay;
      return {
        money: state.money - actualRepay,
        debt: newDebt,
        scenarioFlags: {
          ...state.scenarioFlags,
          has_debt: newDebt > 0,
        },
      };
    }),

  applyDebtInterest: () =>
    set((state) => {
      if (state.debt <= 0) return state;
      const interest = Math.floor(state.debt * state.debtInterestRate);
      return {
        debt: state.debt + interest,
      };
    }),

  setGracePeriod: (days) => set({ gracePeriodDays: days }),

  // ===== メタパラメータ =====
  updateMetaParameters: (params) =>
    set((state) => ({
      metaParameters: { ...state.metaParameters, ...params },
    })),

  calculateMetaParameters: (orders) => {
    // この関数は別ファイル(metaParameters.ts)で詳細実装予定
    // ここでは仮実装
    const state = get();
    
    let luxury = 0;
    let volume = 0;
    let healing = 0;
    
    // 仕入れ内容から計算（詳細は後で実装）
    Object.entries(orders).forEach(([itemId, quantity]) => {
      // メニューデータと照合して計算
      volume += quantity;
    });

    set({
      metaParameters: {
        luxury,
        volume,
        healing,
        stability: state.consecutiveProfitDays * 10,
        mystery: Math.random() * 20, // ランダム要素
        reputation: state.reputation,
      },
    });
  },

  // ===== ゲーム状態 =====
  resetGame: () => set(initialState),

  setGameState: (state) => set(state),

  startNewGame: (skipTutorial) => {
    if (skipTutorial) {
      set({
        ...initialState,
        currentScreen: 'home',
        tutorialStep: null,
        tutorialCompleted: true,
        isFirstPlaythrough: false,
        day: 4,
        scenarioFlags: {
          tutorial_complete: true,
          prologue_complete: true,
        },
      });
    } else {
      set({
        ...initialState,
        currentScreen: 'scenario',
        tutorialStep: 'prologue',
        isFirstPlaythrough: true,
      });
    }
  },
}));
