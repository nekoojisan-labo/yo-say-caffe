import { SaveData } from '@/types';

const SAVE_KEY = 'yosay_cafe_save_v1';

export const SaveManager = {
    // 保存
    saveGame(data: Omit<SaveData, 'version' | 'savedAt'>): void {
        const saveData: SaveData = {
            ...data,
            version: '1.0.0',
            savedAt: new Date().toISOString(),
        };
        localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
    },

    // ロード
    loadGame(): SaveData | null {
        const data = localStorage.getItem(SAVE_KEY);
        if (!data) return null;
        try {
            const parsed = JSON.parse(data) as SaveData;
            return this.migrateSaveData(parsed);
        } catch (e) {
            console.error('Failed to parse save data', e);
            return null;
        }
    },

    // エクスポート（JSON文字列）
    exportToJSON(data: SaveData): string {
        return JSON.stringify(data, null, 2);
    },

    // インポート
    importFromJSON(json: string): SaveData | null {
        try {
            const data = JSON.parse(json);
            if (data && data.gameState && data.protagonist) {
                return this.migrateSaveData(data as SaveData);
            }
            return null;
        } catch (e) {
            console.error('Failed to import JSON', e);
            return null;
        }
    },

    // データマイグレーション (0..10 -> 0..6 など)
    migrateSaveData(data: SaveData): SaveData {
        const { gameState } = data;
        if (gameState.glamor && gameState.glamor.level > 6) {
            gameState.glamor.level = 6;
            // setIdも同期
            if (gameState.protagonistVisual) {
                gameState.protagonistVisual.setId = `glamor_L06`;
            }
        }
        return data;
    },

    // 初期化
    clearSave(): void {
        localStorage.removeItem(SAVE_KEY);
    }
};
