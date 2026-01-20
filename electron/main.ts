import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as fs from 'fs';

// セーブディレクトリのパス
const SAVE_DIR = path.join(app.getPath('userData'), 'saves');

// セーブディレクトリが存在しない場合は作成
function ensureSaveDir(): void {
  if (!fs.existsSync(SAVE_DIR)) {
    fs.mkdirSync(SAVE_DIR, { recursive: true });
  }
}

// メインウィンドウの参照を保持
let mainWindow: BrowserWindow | null = null;

// 開発モードかどうかを判定
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

function createWindow(): void {
  // メインウィンドウを作成
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 1024,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    title: '妖精カフェ物語',
    backgroundColor: '#FFF8FA',
  });

  // 開発モードではViteの開発サーバーから読み込み
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    // 本番モードではビルドされたファイルを読み込み
    mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
  }

  // ウィンドウが閉じられたときの処理
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// アプリの初期化が完了したらウィンドウを作成
app.whenReady().then(() => {
  ensureSaveDir();
  createWindow();

  // macOSでドックアイコンがクリックされたときの処理
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// すべてのウィンドウが閉じられたときの処理（macOS以外）
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// ===== IPC通信ハンドラー =====

// セーブスロット情報の型
interface SaveSlotInfo {
  slotId: number;
  exists: boolean;
  day?: number;
  money?: number;
  rank?: string;
  savedAt?: string;
}

// セーブデータの型（簡易版）
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

// ゲームをセーブ
ipcMain.handle('save-game', async (_event, slotId: number, data: SaveData) => {
  const filePath = path.join(SAVE_DIR, `save_${slotId}.json`);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return { success: true };
  } catch (error) {
    return { success: false, error: String(error) };
  }
});

// ゲームをロード
ipcMain.handle('load-game', async (_event, slotId: number) => {
  const filePath = path.join(SAVE_DIR, `save_${slotId}.json`);
  try {
    if (!fs.existsSync(filePath)) {
      return { success: false, error: 'Save not found' };
    }
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return { success: true, data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
});

// セーブスロット一覧を取得
ipcMain.handle('get-save-slots', async () => {
  const slots: SaveSlotInfo[] = [];
  for (let i = 0; i <= 10; i++) {
    const filePath = path.join(SAVE_DIR, `save_${i}.json`);
    if (fs.existsSync(filePath)) {
      try {
        const data: SaveData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        slots.push({
          slotId: i,
          exists: true,
          day: data.gameState.day,
          money: data.gameState.money,
          rank: data.gameState.shopRank,
          savedAt: data.savedAt,
        });
      } catch {
        slots.push({ slotId: i, exists: false });
      }
    } else {
      slots.push({ slotId: i, exists: false });
    }
  }
  return slots;
});

// セーブをエクスポート
ipcMain.handle('export-save', async (_event, data: SaveData) => {
  const { dialog } = await import('electron');
  const result = await dialog.showSaveDialog({
    defaultPath: `fairy_cafe_save_${Date.now()}.json`,
    filters: [{ name: 'JSON', extensions: ['json'] }],
  });

  if (!result.canceled && result.filePath) {
    fs.writeFileSync(result.filePath, JSON.stringify(data, null, 2), 'utf-8');
    return { success: true, path: result.filePath };
  }
  return { success: false };
});

// セーブをインポート
ipcMain.handle('import-save', async () => {
  const { dialog } = await import('electron');
  const result = await dialog.showOpenDialog({
    filters: [{ name: 'JSON', extensions: ['json'] }],
    properties: ['openFile'],
  });

  if (!result.canceled && result.filePaths.length > 0) {
    try {
      const data = JSON.parse(fs.readFileSync(result.filePaths[0], 'utf-8'));
      // バリデーション
      if (!data.version || !data.gameState) {
        return { success: false, error: 'Invalid save file' };
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  }
  return { success: false };
});

// セーブを削除
ipcMain.handle('delete-save', async (_event, slotId: number) => {
  const filePath = path.join(SAVE_DIR, `save_${slotId}.json`);
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: String(error) };
  }
});
