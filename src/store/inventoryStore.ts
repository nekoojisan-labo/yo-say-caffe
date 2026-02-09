import { create } from 'zustand';
import type { Inventory } from '@/types';
import { MENU_DATA } from '@/data/menuData';

interface InventoryStore {
  inventory: Inventory;
  unlockedMenus: string[];
  salesHistory: Record<string, number[]>;
  wasteHistory: Record<string, number[]>;

  getStock: (itemId: string) => number;
  getTotalStock: () => number;
  addStock: (itemId: string, amount: number) => void;
  consumeStock: (itemId: string, amount: number) => boolean;
  addPendingOrder: (itemId: string, amount: number) => void;
  confirmOrders: (orders: Record<string, number>) => void;
  processDayChange: () => void;
  recordSale: (itemId: string, amount: number) => void;
  recordWaste: (itemId: string, amount: number) => void;
  unlockMenu: (menuId: string) => void;
  isMenuUnlocked: (menuId: string) => boolean;
  setInventory: (inventory: Inventory) => void;
  setUnlockedMenus: (menus: string[]) => void;
  setSalesHistory: (history: Record<string, number[]>) => void;
  resetInventory: () => void;
}

function createInitialInventory(): Inventory {
  const inventory: Inventory = {};
  MENU_DATA.filter((menu) => menu.unlocked).forEach((menu) => {
    inventory[menu.id] = { stock: 10, pendingOrder: 0 };
  });
  return inventory;
}

function getInitialUnlockedMenus(): string[] {
  return MENU_DATA.filter((menu) => menu.unlocked).map((menu) => menu.id);
}

export const useInventoryStore = create<InventoryStore>((set, get) => ({
  inventory: createInitialInventory(),
  unlockedMenus: getInitialUnlockedMenus(),
  salesHistory: {},
  wasteHistory: {},

  getStock: (itemId) => {
    const item = get().inventory[itemId];
    return item ? item.stock : 0;
  },

  getTotalStock: () => {
    const inv = get().inventory;
    return Object.values(inv).reduce((sum, item) => sum + item.stock, 0);
  },

  addStock: (itemId, amount) =>
    set((state) => {
      const current = state.inventory[itemId] ?? { stock: 0, pendingOrder: 0 };
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
      const current = state.inventory[itemId] ?? { stock: 0, pendingOrder: 0 };
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
        };
      });
      return { inventory: newInventory };
    }),

  recordSale: (itemId, amount) =>
    set((state) => {
      const history = state.salesHistory[itemId] ?? [];
      const newHistory =
        history.length === 0
          ? [amount]
          : [...history.slice(0, -1), (history[history.length - 1] ?? 0) + amount];
      return {
        salesHistory: {
          ...state.salesHistory,
          [itemId]: newHistory.slice(-7),
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

      const newInventory = {
        ...state.inventory,
        [menuId]: { stock: 0, pendingOrder: 0 },
      };

      return {
        unlockedMenus: [...state.unlockedMenus, menuId],
        inventory: newInventory,
      };
    }),

  isMenuUnlocked: (menuId) => {
    return get().unlockedMenus.includes(menuId);
  },

  setInventory: (inventory) => set({ inventory }),
  setUnlockedMenus: (menus) => set({ unlockedMenus: menus }),
  setSalesHistory: (history) => set({ salesHistory: history }),

  resetInventory: () =>
    set({
      inventory: createInitialInventory(),
      unlockedMenus: getInitialUnlockedMenus(),
      salesHistory: {},
      wasteHistory: {},
    }),
}));
