/// <reference types="vite/client" />

// Electron API の型定義
interface ElectronAPI {
  saveGame: (slotId: number, data: import('./types').SaveData) => Promise<{ success: boolean; error?: string }>;
  loadGame: (slotId: number) => Promise<{ success: boolean; data?: import('./types').SaveData; error?: string }>;
  getSaveSlots: () => Promise<import('./types').SaveSlotInfo[]>;
  exportSave: (data: import('./types').SaveData) => Promise<{ success: boolean; path?: string }>;
  importSave: () => Promise<{ success: boolean; data?: import('./types').SaveData; error?: string }>;
  deleteSave: (slotId: number) => Promise<{ success: boolean; error?: string }>;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}

export {};
