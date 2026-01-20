import type { CGItem } from '@/types';

export const CG_DATA: CGItem[] = [
  // ルシア
  {
    id: 'lucia_tea_party',
    ikemenId: 'lucia',
    title: '特別なお茶会',
    eventId: 'lucia_03',
    order: 1,
  },
  {
    id: 'lucia_confession',
    ikemenId: 'lucia',
    title: '光の告白',
    eventId: 'lucia_04',
    order: 2,
  },

  // カゲロウ
  {
    id: 'kagerou_moonlight',
    ikemenId: 'kagerou',
    title: '月夜の語らい',
    eventId: 'kagerou_03',
    order: 1,
  },
  {
    id: 'kagerou_confession',
    ikemenId: 'kagerou',
    title: '闇の中の光',
    eventId: 'kagerou_04',
    order: 2,
  },

  // ハルト
  {
    id: 'haruto_festival',
    ikemenId: 'haruto',
    title: '風の祭り',
    eventId: 'haruto_03',
    order: 1,
  },
  {
    id: 'haruto_confession',
    ikemenId: 'haruto',
    title: 'ずっと一緒に',
    eventId: 'haruto_04',
    order: 2,
  },

  // レン
  {
    id: 'ren_fireworks',
    ikemenId: 'ren',
    title: '花火大会',
    eventId: 'ren_03',
    order: 1,
  },
  {
    id: 'ren_confession',
    ikemenId: 'ren',
    title: '炎の告白',
    eventId: 'ren_04',
    order: 2,
  },

  // ミズキ
  {
    id: 'mizuki_spring',
    ikemenId: 'mizuki',
    title: '水辺の散歩',
    eventId: 'mizuki_03',
    order: 1,
  },
  {
    id: 'mizuki_confession',
    ikemenId: 'mizuki',
    title: '穏やかな想い',
    eventId: 'mizuki_04',
    order: 2,
  },

  // ソウマ
  {
    id: 'soma_training',
    ikemenId: 'soma',
    title: '特訓デート',
    eventId: 'soma_03',
    order: 1,
  },
  {
    id: 'soma_confession',
    ikemenId: 'soma',
    title: '電撃告白',
    eventId: 'soma_04',
    order: 2,
  },

  // ユキト
  {
    id: 'yukito_sweets',
    ikemenId: 'yukito',
    title: '二人だけのスイーツ',
    eventId: 'yukito_03',
    order: 1,
  },
  {
    id: 'yukito_confession',
    ikemenId: 'yukito',
    title: '氷の心が溶ける時',
    eventId: 'yukito_04',
    order: 2,
  },

  // リク
  {
    id: 'riku_sports',
    ikemenId: 'riku',
    title: '一緒に走ろう',
    eventId: 'riku_03',
    order: 1,
  },
  {
    id: 'riku_confession',
    ikemenId: 'riku',
    title: '大地の誓い',
    eventId: 'riku_04',
    order: 2,
  },

  // アオイ
  {
    id: 'aoi_stargazing',
    ikemenId: 'aoi',
    title: '星降る夜に',
    eventId: 'aoi_03',
    order: 1,
  },
  {
    id: 'aoi_confession',
    ikemenId: 'aoi',
    title: '星の導き',
    eventId: 'aoi_04',
    order: 2,
  },

  // シオン
  {
    id: 'shion_library',
    ikemenId: 'shion',
    title: '静かな図書館',
    eventId: 'shion_03',
    order: 1,
  },
  {
    id: 'shion_confession',
    ikemenId: 'shion',
    title: '知恵の告白',
    eventId: 'shion_04',
    order: 2,
  },
];

// イケメン別にCGを取得
export function getCGsForIkemen(ikemenId: string): CGItem[] {
  return CG_DATA.filter(cg => cg.ikemenId === ikemenId).sort((a, b) => a.order - b.order);
}

// 解放済みCGを取得
export function getUnlockedCGs(unlockedIds: string[]): CGItem[] {
  return CG_DATA.filter(cg => unlockedIds.includes(cg.id));
}

// CG回収率を計算
export function calculateCGProgress(unlockedIds: string[]): {
  total: number;
  unlocked: number;
  percentage: number;
} {
  const total = CG_DATA.length;
  const unlocked = CG_DATA.filter(cg => unlockedIds.includes(cg.id)).length;
  const percentage = total > 0 ? Math.round((unlocked / total) * 100) : 0;
  return { total, unlocked, percentage };
}
