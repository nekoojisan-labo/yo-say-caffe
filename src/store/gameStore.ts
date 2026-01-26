import { create } from 'zustand';
import type { GameState, ScreenType, ShopRank, DayPhase, GameFlags, FinancialStats, DayResult, EventPayload, ManagementState, ManagementDecision, RomanceFocus } from '@/types';
import { CharacterId, CHARACTER_LIST } from '@/game/characters';
import { ManagementEngine } from '@/utils/managementEngine';

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

  // ゲーム状態をリセット
  resetGame: () => void;

  // ゲーム状態を設定（ロード用）
  setGameState: (state: Partial<GameState>) => void;
}

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

const initialState: GameState = {
  currentScreen: 'title',
  day: 1,
  money: 100000,
  reputation: 10,
  glamor: {
    level: 3,
    stability: 80,
    points: 240, // L3の初期値
  },
  protagonistVisual: {
    setId: 'mc_L3',
    parts: {
      full: '' // Initially empty, will be resolved on first use or set manually
    }
  },
  affection: initialAffection,
  encyclopediaUnlocked: initialEncyclopedia,
  lastAppearedDay: initialAppearance,
  shopRank: 'F',
  gameMode: 'management',
  dayPhase: 'PREP',
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

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  setScreen: (screen) => set({ currentScreen: screen }),

  setGameMode: (mode) => set({ gameMode: mode }),

  setDayPhase: (phase) => set({ dayPhase: phase }),

  setLockedRoute: (id) => set({ lockedRouteId: id }),

  advanceDay: () => set((state) => ({ day: state.day + 1 })),

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

  updateReputation: (delta) => set((state) => ({
    reputation: Math.max(0, Math.min(100, state.reputation + delta))
  })),

  updateGlamor: (changes) => set((state) => ({
    glamor: { ...state.glamor, ...changes }
  })),

  updateKPI: (kpi) => set((state) => ({
    kpi: { ...state.kpi, ...kpi }
  })),

  updateFlags: (flags) => set((state) => ({
    flags: { ...state.flags, ...flags }
  })),

  updateHistory: (summary) => set((state) => ({
    history: {
      ...state.history,
      lastDaySummary: summary,
      dailyResults: [...state.history.dailyResults, summary]
    }
  })),

  updateProtagonistVisual: (visual) => set({ protagonistVisual: visual }),

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

        // introBase=30 を一律付与
        const introBase = event.type === 'intro' ? 30 : 0;
        const delta = (choice.heartDelta || 0) + introBase;

        nextAffection[charId] = Math.max(0, Math.min(9999, currentAff + delta));
        nextLastAppeared[charId] = state.day;

        // 初登場時は図鑑解放
        if (event.type === 'intro') {
          nextEncyclopedia[charId] = true;
        }

        // --- Heat (Oshi) Logic ---
        const isPositive = (choice.heartDelta || 0) > 0;

        if (nextFocus.id === charId) {
          // 対象キャラへの反応
          nextFocus.heat = Math.max(0, Math.min(100, nextFocus.heat + (isPositive ? 10 : -5)));
        } else if (isPositive) {
          // 別キャラに好意的な場合、現在の推し熱が冷める
          if (nextFocus.id) {
            nextFocus.heat = Math.max(0, nextFocus.heat - 3);
          }

          // 熱が高いキャラがいない、または新しいキャラに乗り換える判定 (簡易的に、現在熱が低いなら乗り換え)
          if (nextFocus.heat < 10) {
            nextFocus.id = charId;
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
          points: Math.max(0, state.glamor.points + (choice.glamorPointsDelta || 0))
        },
        history: {
          ...state.history,
          lastEventId: eventId
        },
        // 固有のエフェクトがあれば適用
        ...(choice.effects || {})
      };
    });
  },

  setShopRank: (rank) => set({ shopRank: rank }),

  resetGame: () => set(initialState),

  setGameState: (state) => set(state),

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
      }
    }));
  },

  updateManagement: (changes) => set((state) => ({
    management: { ...state.management, ...changes }
  })),

  updateRomanceFocus: (changes) => set((state) => ({
    romanceFocus: { ...state.romanceFocus, ...changes }
  })),

  addRomanceTicket: (charId) => set((state) => ({
    romanceTickets: {
      ...state.romanceTickets,
      [charId]: Math.min(9, (state.romanceTickets[charId] || 0) + 1)
    }
  })),

  useRomanceTicket: (charId) => set((state) => ({
    romanceTickets: {
      ...state.romanceTickets,
      [charId]: Math.max(0, (state.romanceTickets[charId] || 0) - 1)
    }
  })),
}));
