import { create } from 'zustand';
import type { AudioSettings } from '@/types';

interface AudioStore extends AudioSettings {
  // BGM音量設定
  setBGMVolume: (volume: number) => void;

  // SE音量設定
  setSEVolume: (volume: number) => void;

  // BGMミュートトグル
  toggleBGMMute: () => void;

  // SEミュートトグル
  toggleSEMute: () => void;

  // BGMミュート設定
  setBGMMuted: (muted: boolean) => void;

  // SEミュート設定
  setSEMuted: (muted: boolean) => void;

  // 設定を一括設定（ロード用）
  setAudioSettings: (settings: AudioSettings) => void;

  // リセット
  resetAudio: () => void;
}

const initialSettings: AudioSettings = {
  bgmVolume: 0.7,
  seVolume: 0.9,
  bgmMuted: false,
  seMuted: false,
};

export const useAudioStore = create<AudioStore>((set) => ({
  ...initialSettings,

  setBGMVolume: (volume) =>
    set({ bgmVolume: Math.max(0, Math.min(1, volume)) }),

  setSEVolume: (volume) =>
    set({ seVolume: Math.max(0, Math.min(1, volume)) }),

  toggleBGMMute: () =>
    set((state) => ({ bgmMuted: !state.bgmMuted })),

  toggleSEMute: () =>
    set((state) => ({ seMuted: !state.seMuted })),

  setBGMMuted: (muted) => set({ bgmMuted: muted }),

  setSEMuted: (muted) => set({ seMuted: muted }),

  setAudioSettings: (settings) => set(settings),

  resetAudio: () => set(initialSettings),
}));
