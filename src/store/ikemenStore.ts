import { create } from 'zustand';
import type { Ikemen, EventProgress } from '@/types';
import { createAllInitialIkemen } from '@/data/ikemenData';

interface AffectionChangeResult {
  newAffection: number;
  levelUp: boolean;
  newLevel: number;
  previousLevel: number;
}

interface IkemenStore {
  ikemenList: Ikemen[];
  routeScores: Record<string, number>;

  // イケメンを取得
  getIkemen: (id: string) => Ikemen | undefined;

  // イケメンを解放
  unlockIkemen: (id: string) => void;

  // 好感度を変更
  changeAffection: (id: string, amount: number) => AffectionChangeResult | null;

  // ルートスコアを加算
  addRouteScore: (id: string, amount: number) => void;

  // 最もルートスコアが高いキャラを取得
  getTopRouteCandidate: () => { id: string; score: number } | null;

  // 来店回数を増やす
  incrementVisitCount: (id: string) => void;

  // イベント完了をマーク
  completeEvent: (ikemenId: string, eventId: string, cgUnlocked?: boolean) => void;

  // イベント進行状況を取得
  getEventProgress: (ikemenId: string) => EventProgress[];

  // イケメンデータを設定（ロード用）
  setIkemenList: (ikemenList: Ikemen[]) => void;

  // リセット
  resetIkemen: () => void;
}


// 好感度からレベルを計算
export function getAffectionLevel(affection: number): number {
  if (affection >= 100) return 5; // MAX
  if (affection >= 75) return 4;
  if (affection >= 50) return 3;
  if (affection >= 25) return 2;
  if (affection >= 1) return 1;
  return 0;
}

export const useIkemenStore = create<IkemenStore>((set, get) => ({
  ikemenList: createAllInitialIkemen(),
  routeScores: {},

  getIkemen: (id) => {
    return get().ikemenList.find((ikemen) => ikemen.id === id);
  },

  unlockIkemen: (id) =>
    set((state) => ({
      ikemenList: state.ikemenList.map((ikemen) =>
        ikemen.id === id ? { ...ikemen, unlocked: true } : ikemen
      ),
    })),

  changeAffection: (id, amount) => {
    const ikemen = get().getIkemen(id);
    if (!ikemen) return null;

    const previousLevel = getAffectionLevel(ikemen.affection);
    const newAffection = Math.max(0, Math.min(100, ikemen.affection + amount));
    const newLevel = getAffectionLevel(newAffection);
    const levelUp = newLevel > previousLevel;

    set((state) => ({
      ikemenList: state.ikemenList.map((ik) =>
        ik.id === id ? { ...ik, affection: newAffection } : ik
      ),
    }));

    return { newAffection, levelUp, newLevel, previousLevel };
  },

  addRouteScore: (id, amount) =>
    set((state) => ({
      routeScores: {
        ...state.routeScores,
        [id]: (state.routeScores[id] || 0) + amount,
      },
    })),

  getTopRouteCandidate: () => {
    const scores = get().routeScores;
    let topId = null;
    let maxScore = -1;

    Object.entries(scores).forEach(([id, score]) => {
      if (score > maxScore) {
        maxScore = score;
        topId = id;
      }
    });

    return topId ? { id: topId, score: maxScore } : null;
  },

  incrementVisitCount: (id) =>
    set((state) => ({
      ikemenList: state.ikemenList.map((ikemen) =>
        ikemen.id === id
          ? { ...ikemen, visitCount: ikemen.visitCount + 1 }
          : ikemen
      ),
    })),

  completeEvent: (ikemenId, eventId, cgUnlocked = false) =>
    set((state) => ({
      ikemenList: state.ikemenList.map((ikemen) => {
        if (ikemen.id !== ikemenId) return ikemen;

        const existingProgress = ikemen.events.find(
          (e) => e.eventId === eventId
        );

        if (existingProgress) {
          return {
            ...ikemen,
            events: ikemen.events.map((e) =>
              e.eventId === eventId
                ? { ...e, completed: true, cgUnlocked: cgUnlocked || e.cgUnlocked }
                : e
            ),
          };
        }

        return {
          ...ikemen,
          events: [
            ...ikemen.events,
            { eventId, completed: true, cgUnlocked },
          ],
        };
      }),
    })),

  getEventProgress: (ikemenId) => {
    const ikemen = get().getIkemen(ikemenId);
    return ikemen?.events ?? [];
  },

  setIkemenList: (ikemenList) => set({ ikemenList }),

  resetIkemen: () => set({ ikemenList: createAllInitialIkemen(), routeScores: {} }),
}));
