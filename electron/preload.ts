import { contextBridge, ipcRenderer } from 'electron';

// セーブデータの型
interface SaveData {
  version: string;
  savedAt: string;
  gameState: {
    day: number;
    money: number;
    shopRank: string;
  };
  [key: string]: unknown;
}

// セーブスロット情報の型
interface SaveSlotInfo {
  slotId: number;
  exists: boolean;
  day?: number;
  money?: number;
  rank?: string;
  savedAt?: string;
}

// APIの型定義
interface ElectronAPI {
  saveGame: (slotId: number, data: SaveData) => Promise<{ success: boolean; error?: string }>;
  loadGame: (slotId: number) => Promise<{ success: boolean; data?: SaveData; error?: string }>;
  getSaveSlots: () => Promise<SaveSlotInfo[]>;
  exportSave: (data: SaveData) => Promise<{ success: boolean; path?: string }>;
  importSave: () => Promise<{ success: boolean; data?: SaveData; error?: string }>;
  deleteSave: (slotId: number) => Promise<{ success: boolean; error?: string }>;
}

// レンダラープロセスに公開するAPI
const electronAPI: ElectronAPI = {
  // セーブ
  saveGame: (slotId: number, data: SaveData) =>
    ipcRenderer.invoke('save-game', slotId, data),

  // ロード
  loadGame: (slotId: number) =>
    ipcRenderer.invoke('load-game', slotId),

  // セーブスロット一覧取得
  getSaveSlots: () =>
    ipcRenderer.invoke('get-save-slots'),

  // エクスポート
  exportSave: (data: SaveData) =>
    ipcRenderer.invoke('export-save', data),

  // インポート
  importSave: () =>
    ipcRenderer.invoke('import-save'),

  // 削除
  deleteSave: (slotId: number) =>
    ipcRenderer.invoke('delete-save', slotId),
};

// contextBridgeを使用してAPIを安全に公開
contextBridge.exposeInMainWorld('electronAPI', electronAPI);

// TypeScript用の型定義
declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
