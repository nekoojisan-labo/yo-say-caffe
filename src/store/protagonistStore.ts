import { create } from 'zustand';
import type { Protagonist } from '@/types';

interface ProtagonistStore {
  protagonist: Protagonist;

  // 名前を設定
  setName: (name: string) => void;

  // ステータスを変更
  changeStats: (changes: Partial<Protagonist['stats']>) => void;

  // 見た目を変更
  changeAppearance: (changes: Partial<Protagonist['appearance']>) => void;

  // レベルアップ
  levelUp: () => void;

  // 主人公データを設定（ロード用）
  setProtagonist: (protagonist: Protagonist) => void;

  // リセット
  resetProtagonist: () => void;
}

const initialProtagonist: Protagonist = {
  name: '主人公',
  level: 1,
  stats: {
    charm: 10,  // 魅力
    talk: 10,   // 話術
    sense: 10,  // センス
  },
  appearance: {
    hair: 'default',
    outfit: 'default',
    makeup: 'default',
    accessory: 'none',
    aura: 'none',
  },
};

export const useProtagonistStore = create<ProtagonistStore>((set) => ({
  protagonist: initialProtagonist,

  setName: (name) =>
    set((state) => ({
      protagonist: { ...state.protagonist, name },
    })),

  changeStats: (changes) =>
    set((state) => ({
      protagonist: {
        ...state.protagonist,
        stats: {
          charm: Math.max(0, state.protagonist.stats.charm + (changes.charm ?? 0)),
          talk: Math.max(0, state.protagonist.stats.talk + (changes.talk ?? 0)),
          sense: Math.max(0, state.protagonist.stats.sense + (changes.sense ?? 0)),
        },
      },
    })),

  changeAppearance: (changes) =>
    set((state) => ({
      protagonist: {
        ...state.protagonist,
        appearance: { ...state.protagonist.appearance, ...changes },
      },
    })),

  levelUp: () =>
    set((state) => ({
      protagonist: {
        ...state.protagonist,
        level: state.protagonist.level + 1,
      },
    })),

  setProtagonist: (protagonist) => set({ protagonist }),

  resetProtagonist: () => set({ protagonist: initialProtagonist }),
}));
