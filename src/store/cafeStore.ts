import { create } from 'zustand';
import type { CafeState, SeatState, CustomerState, DayResult } from '@/types';

// 時間設定
export const TIME_SETTINGS = {
  START_TIME: 9 * 60,      // 9:00 = 540分
  END_TIME: 21 * 60,       // 21:00 = 1260分
  REAL_MS_TO_GAME_MINUTES: 200,  // 200ms = ゲーム内1分
};

// 客の来店確率（1分あたり）
export const SPAWN_CONFIG = {
  baseRate: {
    morning: 0.03,    // 9-12時
    lunch: 0.06,      // 12-14時（ピーク）
    afternoon: 0.04,  // 14-17時
    evening: 0.05,    // 17-21時
  },
  ikemenChance: 0.15, // イケメン出現確率
};

interface CafeStore extends CafeState {
  // 営業開始
  startDay: (seatCount: number) => void;

  // 営業終了
  endDay: () => DayResult;

  // 時間を進める
  tick: () => void;

  // 一時停止トグル
  togglePause: () => void;

  // 速度設定
  setSpeed: (speed: 1 | 2 | 4) => void;

  // モード設定
  setMode: (mode: 'auto' | 'manual') => void;

  // 客を来店させる
  spawnCustomer: (isIkemen: boolean, ikemenId?: string) => void;

  // 客に商品を提供
  serveCustomer: (customerId: string, itemId: string, price: number, cost: number) => void;

  // 客が退店
  customerLeave: (customerId: string) => void;

  // 客を席に案内
  seatCustomer: (customerId: string, seatId: string) => void;

  // 客のステータスを更新
  updateCustomerStatus: (customerId: string, status: CustomerState['status']) => void;

  // 好感度変化を記録
  recordIkemenVisit: (ikemenId: string, affectionGain: number) => void;

  // リセット
  resetCafe: () => void;
}

const initialState: CafeState = {
  currentTime: TIME_SETTINGS.START_TIME,
  isOpen: false,
  isPaused: true,
  speed: 1,
  mode: 'auto',
  seats: [],
  customers: [],
  todayStats: {
    customers: 0,
    sales: 0,
    cost: 0,
    ikemenVisits: [],
  },
};

let customerIdCounter = 0;

export const useCafeStore = create<CafeStore>((set, get) => ({
  ...initialState,

  startDay: (seatCount) => {
    const seats: SeatState[] = [];
    for (let i = 0; i < seatCount; i++) {
      seats.push({
        id: `seat_${i + 1}`,
        occupied: false,
      });
    }

    set({
      currentTime: TIME_SETTINGS.START_TIME,
      isOpen: true,
      isPaused: false,
      seats,
      customers: [],
      todayStats: {
        customers: 0,
        sales: 0,
        cost: 0,
        ikemenVisits: [],
      },
    });
  },

  endDay: () => {
    const state = get();
    const result: DayResult = {
      day: 0, // 呼び出し側で設定
      customers: state.todayStats.customers,
      sales: state.todayStats.sales,
      cost: state.todayStats.cost,
      fixedCost: 800, // 固定費
      profit: state.todayStats.sales - state.todayStats.cost - 800,
      wastedItems: 0, // 別途計算
      avgSatisfaction: 80, // 仮の値
      ikemenVisits: state.todayStats.ikemenVisits,
      protagonistChanges: {},
    };

    set({
      isOpen: false,
      isPaused: true,
    });

    return result;
  },

  tick: () =>
    set((state) => {
      if (!state.isOpen || state.isPaused) return state;
      const newTime = state.currentTime + state.speed;
      if (newTime >= TIME_SETTINGS.END_TIME) {
        return { ...state, currentTime: TIME_SETTINGS.END_TIME, isOpen: false };
      }
      return { ...state, currentTime: newTime };
    }),

  togglePause: () =>
    set((state) => ({ isPaused: !state.isPaused })),

  setSpeed: (speed) => set({ speed }),

  setMode: (mode) => set({ mode }),

  spawnCustomer: (isIkemen, ikemenId) => {
    const customerId = `customer_${++customerIdCounter}`;
    const customer: CustomerState = {
      id: customerId,
      isIkemen,
      ikemenId,
      status: 'entering',
      satisfaction: 100,
    };

    set((state) => ({
      customers: [...state.customers, customer],
      todayStats: {
        ...state.todayStats,
        customers: state.todayStats.customers + 1,
      },
    }));
  },

  serveCustomer: (customerId, itemId, price, cost) =>
    set((state) => ({
      customers: state.customers.map((c) =>
        c.id === customerId
          ? { ...c, status: 'eating' as const, orderedItem: itemId }
          : c
      ),
      todayStats: {
        ...state.todayStats,
        sales: state.todayStats.sales + price,
        cost: state.todayStats.cost + cost,
      },
    })),

  customerLeave: (customerId) =>
    set((state) => {
      const customer = state.customers.find((c) => c.id === customerId);
      const seatId = customer?.seatId;

      return {
        customers: state.customers.filter((c) => c.id !== customerId),
        seats: state.seats.map((s) =>
          s.id === seatId ? { ...s, occupied: false, customerId: undefined } : s
        ),
      };
    }),

  seatCustomer: (customerId, seatId) =>
    set((state) => ({
      customers: state.customers.map((c) =>
        c.id === customerId
          ? { ...c, seatId, status: 'ordering' as const }
          : c
      ),
      seats: state.seats.map((s) =>
        s.id === seatId ? { ...s, occupied: true, customerId } : s
      ),
    })),

  updateCustomerStatus: (customerId, status) =>
    set((state) => ({
      customers: state.customers.map((c) =>
        c.id === customerId ? { ...c, status } : c
      ),
    })),

  recordIkemenVisit: (ikemenId, affectionGain) =>
    set((state) => ({
      todayStats: {
        ...state.todayStats,
        ikemenVisits: [
          ...state.todayStats.ikemenVisits,
          { ikemenId, affectionGain },
        ],
      },
    })),

  resetCafe: () => set(initialState),
}));

// 時間帯を取得するヘルパー
export function getTimeOfDay(currentTime: number): 'morning' | 'lunch' | 'afternoon' | 'evening' {
  const hour = Math.floor(currentTime / 60);
  if (hour < 12) return 'morning';
  if (hour < 14) return 'lunch';
  if (hour < 17) return 'afternoon';
  return 'evening';
}

// 時間を HH:MM 形式で取得
export function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}
