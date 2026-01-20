import { create } from 'zustand';
import type { GameState, ScreenType, ShopRank } from '@/types';

interface GameStore extends GameState {
  // 画面遷移
  setScreen: (screen: ScreenType) => void;

  // ゲームモード切り替え
  setGameMode: (mode: GameState['gameMode']) => void;

  // 日数進行
  advanceDay: () => void;

  // お金の操作
  addMoney: (amount: number) => void;
  deductMoney: (amount: number) => boolean;

  // ランク更新
  setShopRank: (rank: ShopRank) => void;

  // ゲーム状態をリセット
  resetGame: () => void;

  // ゲーム状態を設定（ロード用）
  setGameState: (state: Partial<GameState>) => void;
}

const initialState: GameState = {
  currentScreen: 'title',
  day: 1,
  money: 10000, // 初期資金
  shopRank: 'F',
  gameMode: 'menu',
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

  resetGame: () => set(initialState),

  setGameState: (state) => set(state),
}));
