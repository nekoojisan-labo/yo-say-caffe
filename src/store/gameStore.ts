import { create } from 'zustand';
import type { GameState, ScreenType, ShopRank } from '@/types';
import type { InteriorCategory } from '@/data/interiorData';

interface GameStore extends GameState {
  // 画面遷移
  setScreen: (screen: ScreenType) => void;

  // ゲームモード切り替え
  setGameMode: (mode: GameState['gameMode']) => void;

  // 日数進行
  advanceDay: () => void;
  nextDay: () => void;

  // お金の操作
  addMoney: (amount: number) => void;
  deductMoney: (amount: number) => boolean;

  // ランク更新
  setShopRank: (rank: ShopRank) => void;

  // メニュー解放
  unlockMenu: (menuId: string) => void;

  // 内装アイテム
  buyInterior: (itemId: string) => void;
  equipInterior: (itemId: string, category: InteriorCategory) => void;

  // 評判
  addReputation: (amount: number) => void;

  // ゲーム状態をリセット
  resetGame: () => void;

  // ゲーム状態を設定（ロード用）
  setGameState: (state: Partial<GameState>) => void;

  // 追加プロパティ
  unlockedMenus: string[];
  ownedInteriors: string[];
  equippedInteriors: Record<InteriorCategory, string | null>;
  reputation: number;
}

const initialInteriors: Record<InteriorCategory, string | null> = {
  wall: null,
  floor: null,
  furniture: null,
  decoration: null,
  lighting: null,
};

// 初期解放メニュー
const initialUnlockedMenus = [
  'coffee',
  'tea',
  'juice',
  'cake',
  'cookie',
];

const initialState: GameState & {
  unlockedMenus: string[];
  ownedInteriors: string[];
  equippedInteriors: Record<InteriorCategory, string | null>;
  reputation: number;
} = {
  currentScreen: 'title',
  day: 1,
  money: 10000, // 初期資金
  shopRank: 'F',
  gameMode: 'menu',
  unlockedMenus: initialUnlockedMenus,
  ownedInteriors: [],
  equippedInteriors: initialInteriors,
  reputation: 0,
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  setScreen: (screen) => set({ currentScreen: screen }),

  setGameMode: (mode) => set({ gameMode: mode }),

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

  setShopRank: (rank) => set({ shopRank: rank }),

  unlockMenu: (menuId) =>
    set((state) => ({
      unlockedMenus: state.unlockedMenus.includes(menuId)
        ? state.unlockedMenus
        : [...state.unlockedMenus, menuId],
    })),

  buyInterior: (itemId) =>
    set((state) => ({
      ownedInteriors: state.ownedInteriors.includes(itemId)
        ? state.ownedInteriors
        : [...state.ownedInteriors, itemId],
    })),

  equipInterior: (itemId, category) =>
    set((state) => ({
      equippedInteriors: {
        ...state.equippedInteriors,
        [category]: itemId,
      },
    })),

  addReputation: (amount) =>
    set((state) => ({
      reputation: state.reputation + amount,
    })),

  nextDay: () => set((state) => ({ day: state.day + 1 })),

  resetGame: () => set(initialState),

  setGameState: (state) => set(state),
}));
