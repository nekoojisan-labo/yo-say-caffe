import { create } from 'zustand';
import type { Inventory } from '@/types';
import { MENU_DATA } from '@/data/menuData';

interface InventoryStore {
  inventory: Inventory;
  unlockedMenus: string[];
  salesHistory: Record<string, number[]>; // 過去7日分の販売履歴
  wasteHistory: Record<string, number[]>; // 過去7日分の廃棄履歴
  dailySales: Record<string, number>; // 今日の販売数

  // 在庫を取得
  getStock: (itemId: string) => number;

  // 在庫を追加
  addStock: (itemId: string, amount: number) => void;

  // 在庫を消費
  consumeStock: (itemId: string, amount: number) => boolean;

  // 発注中を追加
  addPendingOrder: (itemId: string, amount: number) => void;

  // 発注を確定（複数アイテム）
  confirmOrders: (orders: Record<string, number>) => void;

  // 日替わり処理（発注中を在庫に反映）
  processDayChange: () => void;

  // 販売を記録
  recordSale: (itemId: string, amount: number) => void;

  // 廃棄を記録
  recordWaste: (itemId: string, amount: number) => void;

  // メニューを解放
  unlockMenu: (menuId: string) => void;

  // メニューが解放済みかチェック
  isMenuUnlocked: (menuId: string) => boolean;

  // 今日の販売を記録
  addDailySale: (itemId: string, amount: number) => void;

  // 今日の販売をリセット
  resetDailySales: () => void;

  // データを設定（ロード用）
  setInventory: (inventory: Inventory) => void;
  setUnlockedMenus: (menus: string[]) => void;
  setSalesHistory: (history: Record<string, number[]>) => void;

  // リセット
  resetInventory: () => void;
}

// 初期在庫（初期解放メニューのみ）
function createInitialInventory(): Inventory {
  const inventory: Inventory = {};
  MENU_DATA.filter((menu) => menu.unlocked).forEach((menu) => {
    inventory[menu.id] = { stock: 10, pendingOrder: 0, waste: 0 };
  });
  return inventory;
}

// 初期解放メニュー
function getInitialUnlockedMenus(): string[] {
  return MENU_DATA.filter((menu) => menu.unlocked).map((menu) => menu.id);
}

export const useInventoryStore = create<InventoryStore>((set, get) => ({
  inventory: createInitialInventory(),
  unlockedMenus: getInitialUnlockedMenus(),
  salesHistory: {},
  wasteHistory: {},
  dailySales: {},

  getStock: (itemId) => {
    const item = get().inventory[itemId];
    return item ? item.stock : 0;
  },

  addStock: (itemId, amount) =>
    set((state) => {
      const current = state.inventory[itemId] ?? { stock: 0, pendingOrder: 0, waste: 0 };
      return {
        inventory: {
          ...state.inventory,
          [itemId]: { ...current, stock: current.stock + amount },
        },
      };
    }),

  consumeStock: (itemId, amount) => {
    const stock = get().getStock(itemId);
    if (stock < amount) return false;

    set((state) => {
      const current = state.inventory[itemId];
      return {
        inventory: {
          ...state.inventory,
          [itemId]: { ...current, stock: current.stock - amount },
        },
      };
    });
    return true;
  },

  addPendingOrder: (itemId, amount) =>
    set((state) => {
      const current = state.inventory[itemId] ?? { stock: 0, pendingOrder: 0, waste: 0 };
      return {
        inventory: {
          ...state.inventory,
          [itemId]: { ...current, pendingOrder: current.pendingOrder + amount },
        },
      };
    }),

  confirmOrders: (orders) => {
    Object.entries(orders).forEach(([itemId, amount]) => {
      if (amount > 0) {
        get().addPendingOrder(itemId, amount);
      }
    });
  },

  processDayChange: () =>
    set((state) => {
      const newInventory = { ...state.inventory };
      Object.keys(newInventory).forEach((itemId) => {
        const item = newInventory[itemId];
        newInventory[itemId] = {
          stock: item.stock + item.pendingOrder,
          pendingOrder: 0,
          waste: 0, // 新しい日なので廃棄リセット
        };
      });
      return { inventory: newInventory };
    }),

  recordSale: (itemId, amount) =>
    set((state) => {
      const history = state.salesHistory[itemId] ?? [];
      // 最新の日に加算（最後の要素）
      const newHistory =
        history.length === 0
          ? [amount]
          : [...history.slice(0, -1), (history[history.length - 1] ?? 0) + amount];
      return {
        salesHistory: {
          ...state.salesHistory,
          [itemId]: newHistory.slice(-7), // 最新7日分を保持
        },
      };
    }),

  recordWaste: (itemId, amount) =>
    set((state) => {
      const history = state.wasteHistory[itemId] ?? [];
      const newHistory =
        history.length === 0
          ? [amount]
          : [...history.slice(0, -1), (history[history.length - 1] ?? 0) + amount];
      return {
        wasteHistory: {
          ...state.wasteHistory,
          [itemId]: newHistory.slice(-7),
        },
      };
    }),

  unlockMenu: (menuId) =>
    set((state) => {
      if (state.unlockedMenus.includes(menuId)) return state;

      // 在庫に追加
      const newInventory = {
        ...state.inventory,
        [menuId]: { stock: 0, pendingOrder: 0, waste: 0 },
      };

      return {
        unlockedMenus: [...state.unlockedMenus, menuId],
        inventory: newInventory,
      };
    }),

  isMenuUnlocked: (menuId) => {
    return get().unlockedMenus.includes(menuId);
  },

  addDailySale: (itemId, amount) =>
    set((state) => ({
      dailySales: {
        ...state.dailySales,
        [itemId]: (state.dailySales[itemId] ?? 0) + amount,
      },
    })),

  resetDailySales: () => set({ dailySales: {} }),

  setInventory: (inventory) => set({ inventory }),
  setUnlockedMenus: (menus) => set({ unlockedMenus: menus }),
  setSalesHistory: (history) => set({ salesHistory: history }),

  resetInventory: () =>
    set({
      inventory: createInitialInventory(),
      unlockedMenus: getInitialUnlockedMenus(),
      salesHistory: {},
      wasteHistory: {},
      dailySales: {},
    }),
}));
