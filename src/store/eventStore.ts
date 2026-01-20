import { create } from 'zustand';
import type { GameEvent, EventScene } from '@/types';

interface EventStore {
  // 現在のイベント
  currentEvent: GameEvent | null;
  currentSceneIndex: number;

  // モード
  isAutoMode: boolean;
  isSkipMode: boolean;

  // テキスト表示進行度
  textProgress: number;

  // 選択肢表示
  showChoices: boolean;

  // イベントログ
  eventLog: Array<{
    speaker: string;
    text: string;
  }>;

  // 完了済みイベント
  completedEvents: string[];

  // 解放済みCG
  unlockedCGs: string[];

  // イベントフラグ
  eventFlags: Record<string, boolean>;

  // イベント開始
  startEvent: (event: GameEvent) => void;

  // イベント終了
  endEvent: () => void;

  // 次のシーンへ
  nextScene: () => void;

  // 特定のシーンへ（分岐用）
  goToScene: (sceneId: string) => void;

  // テキスト進行度を更新
  setTextProgress: (progress: number) => void;

  // 選択肢表示トグル
  setShowChoices: (show: boolean) => void;

  // オートモードトグル
  toggleAutoMode: () => void;

  // スキップモードトグル
  toggleSkipMode: () => void;

  // イベント完了をマーク
  completeEvent: (eventId: string) => void;

  // CGを解放
  unlockCG: (cgId: string) => void;

  // フラグを設定
  setEventFlag: (flagId: string, value: boolean) => void;

  // フラグを取得
  getEventFlag: (flagId: string) => boolean;

  // 現在のシーンを取得
  getCurrentScene: () => EventScene | null;

  // データを設定（ロード用）
  setCompletedEvents: (events: string[]) => void;
  setUnlockedCGs: (cgs: string[]) => void;
  setEventFlags: (flags: Record<string, boolean>) => void;

  // リセット
  resetEvent: () => void;
}

const initialState = {
  currentEvent: null as GameEvent | null,
  currentSceneIndex: 0,
  isAutoMode: false,
  isSkipMode: false,
  textProgress: 0,
  showChoices: false,
  eventLog: [] as Array<{ speaker: string; text: string }>,
  completedEvents: [] as string[],
  unlockedCGs: [] as string[],
  eventFlags: {} as Record<string, boolean>,
};

export const useEventStore = create<EventStore>((set, get) => ({
  ...initialState,

  startEvent: (event) =>
    set({
      currentEvent: event,
      currentSceneIndex: 0,
      textProgress: 0,
      showChoices: false,
      eventLog: [],
    }),

  endEvent: () =>
    set({
      currentEvent: null,
      currentSceneIndex: 0,
      isAutoMode: false,
      isSkipMode: false,
      textProgress: 0,
      showChoices: false,
    }),

  nextScene: () => {
    const state = get();
    if (!state.currentEvent) return;

    const currentScene = state.currentEvent.scenes[state.currentSceneIndex];
    if (!currentScene) return;

    // テキストが完了していない場合は完了させる
    if (state.textProgress < 1) {
      set({ textProgress: 1 });
      return;
    }

    // 選択肢がある場合は選択肢を表示
    if (currentScene.choices && !state.showChoices) {
      set({ showChoices: true });
      return;
    }

    // 次のシーンへ
    const nextIndex = state.currentSceneIndex + 1;
    if (nextIndex >= state.currentEvent.scenes.length) {
      // イベント終了
      get().completeEvent(state.currentEvent.id);
      if (state.currentEvent.hasCG && state.currentEvent.cgId) {
        get().unlockCG(state.currentEvent.cgId);
      }
      get().endEvent();
      return;
    }

    // ログに追加
    set((s) => ({
      currentSceneIndex: nextIndex,
      textProgress: 0,
      showChoices: false,
      eventLog: [
        ...s.eventLog,
        {
          speaker: currentScene.dialogue.speaker,
          text: currentScene.dialogue.text,
        },
      ],
    }));
  },

  goToScene: (sceneId) => {
    const state = get();
    if (!state.currentEvent) return;

    const sceneIndex = state.currentEvent.scenes.findIndex(
      (s) => s.id === sceneId
    );
    if (sceneIndex === -1) return;

    set({
      currentSceneIndex: sceneIndex,
      textProgress: 0,
      showChoices: false,
    });
  },

  setTextProgress: (progress) => set({ textProgress: progress }),

  setShowChoices: (show) => set({ showChoices: show }),

  toggleAutoMode: () =>
    set((state) => ({ isAutoMode: !state.isAutoMode, isSkipMode: false })),

  toggleSkipMode: () =>
    set((state) => ({ isSkipMode: !state.isSkipMode, isAutoMode: false })),

  completeEvent: (eventId) =>
    set((state) => ({
      completedEvents: state.completedEvents.includes(eventId)
        ? state.completedEvents
        : [...state.completedEvents, eventId],
    })),

  unlockCG: (cgId) =>
    set((state) => ({
      unlockedCGs: state.unlockedCGs.includes(cgId)
        ? state.unlockedCGs
        : [...state.unlockedCGs, cgId],
    })),

  setEventFlag: (flagId, value) =>
    set((state) => ({
      eventFlags: { ...state.eventFlags, [flagId]: value },
    })),

  getEventFlag: (flagId) => {
    return get().eventFlags[flagId] ?? false;
  },

  getCurrentScene: () => {
    const state = get();
    if (!state.currentEvent) return null;
    return state.currentEvent.scenes[state.currentSceneIndex] ?? null;
  },

  setCompletedEvents: (events) => set({ completedEvents: events }),
  setUnlockedCGs: (cgs) => set({ unlockedCGs: cgs }),
  setEventFlags: (flags) => set({ eventFlags: flags }),

  resetEvent: () => set(initialState),
}));
