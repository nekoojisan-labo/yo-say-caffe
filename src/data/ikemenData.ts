import type { Ikemen, ShopRank } from '@/types';

// イケメン解放条件
export interface IkemenUnlockCondition {
  type: 'default' | 'rank';
  rank?: ShopRank;
}

// イケメンマスターデータ
export interface IkemenMasterData {
  id: string;
  name: string;
  personality: Ikemen['personality'];
  element: Ikemen['element'];
  favoriteMenus: string[];
  description: string;
  unlockCondition: IkemenUnlockCondition;
}

export const IKEMEN_MASTER_DATA: IkemenMasterData[] = [
  {
    id: 'lucia',
    name: 'ルシア',
    personality: 'prince',
    element: 'light',
    favoriteMenus: ['tea', 'scone', 'shortcake'],
    description: '光の国からやってきた王子様のような妖精。優雅で紳士的だが、時折見せる天然な一面も魅力。',
    unlockCondition: { type: 'default' },
  },
  {
    id: 'kagerou',
    name: 'カゲロウ',
    personality: 'cool',
    element: 'dark',
    favoriteMenus: ['black_coffee', 'espresso'],
    description: '闇の国出身のクールな妖精。無口だが、実は繊細な心の持ち主。ブラックコーヒーをこよなく愛する。',
    unlockCondition: { type: 'default' },
  },
  {
    id: 'haruto',
    name: 'ハルト',
    personality: 'childhood',
    element: 'wind',
    favoriteMenus: ['sandwich', 'orange_juice'],
    description: '風の国から来た親しみやすい妖精。明るく社交的で、誰とでもすぐに仲良くなれる。',
    unlockCondition: { type: 'default' },
  },
  {
    id: 'ren',
    name: 'レン',
    personality: 'tsundere',
    element: 'fire',
    favoriteMenus: ['spicy_chicken', 'hot_cocoa'],
    description: '炎の国出身の気が強い妖精。素直になれない性格だが、本当は誰よりも優しい。',
    unlockCondition: { type: 'rank', rank: 'E' },
  },
  {
    id: 'mizuki',
    name: 'ミズキ',
    personality: 'healing',
    element: 'water',
    favoriteMenus: ['herb_tea', 'fruit_tart'],
    description: '水の国から来た穏やかな妖精。癒しのオーラを持ち、一緒にいると心が落ち着く。',
    unlockCondition: { type: 'rank', rank: 'E' },
  },
  {
    id: 'soma',
    name: 'ソウマ',
    personality: 'oraora',
    element: 'thunder',
    favoriteMenus: ['energy_drink', 'meat_sandwich'],
    description: '雷の国出身の熱血妖精。オラオラ系だが、実は面倒見が良く仲間思い。',
    unlockCondition: { type: 'rank', rank: 'D' },
  },
  {
    id: 'yukito',
    name: 'ユキト',
    personality: 'yandere',
    element: 'ice',
    favoriteMenus: ['shortcake', 'parfait', 'milk_tea'],
    description: '氷の国から来た美しい妖精。甘いものが大好きで、独占欲が強い一面も。',
    unlockCondition: { type: 'rank', rank: 'D' },
  },
  {
    id: 'riku',
    name: 'リク',
    personality: 'sporty',
    element: 'earth',
    favoriteMenus: ['protein_shake', 'meat_sandwich', 'rice_ball'],
    description: '土の国出身のスポーツマン妖精。明るく元気で、いつも体を動かしている。',
    unlockCondition: { type: 'rank', rank: 'C' },
  },
  {
    id: 'aoi',
    name: 'アオイ',
    personality: 'mysterious',
    element: 'star',
    favoriteMenus: ['seasonal_parfait', 'star_cookie'],
    description: '星の国から来た神秘的な妖精。何を考えているか分からないが、深い知恵を持つ。',
    unlockCondition: { type: 'rank', rank: 'B' },
  },
  {
    id: 'shion',
    name: 'シオン',
    personality: 'intellectual',
    element: 'forest',
    favoriteMenus: ['blend_coffee', 'book_set', 'cheesecake'],
    description: '森の国出身の知的な妖精。眼鏡がトレードマーク。読書とカフェ巡りが趣味。',
    unlockCondition: { type: 'rank', rank: 'A' },
  },
];

// 初期状態のイケメンデータを生成
export function createInitialIkemen(masterData: IkemenMasterData): Ikemen {
  const isUnlocked = masterData.unlockCondition.type === 'default';
  return {
    id: masterData.id,
    name: masterData.name,
    personality: masterData.personality,
    element: masterData.element,
    favoriteMenus: masterData.favoriteMenus,
    affection: 0,
    unlocked: isUnlocked,
    visitCount: 0,
    events: [],
  };
}

// 全イケメンの初期データを生成
export function createAllInitialIkemen(): Ikemen[] {
  return IKEMEN_MASTER_DATA.map(createInitialIkemen);
}

// 店舗ランクに基づいてイケメンを解放
export function getUnlockableIkemen(currentRank: ShopRank): string[] {
  const rankOrder: ShopRank[] = ['F', 'E', 'D', 'C', 'B', 'A', 'S'];
  const currentRankIndex = rankOrder.indexOf(currentRank);

  return IKEMEN_MASTER_DATA
    .filter(ikemen => {
      if (ikemen.unlockCondition.type === 'default') return false;
      if (ikemen.unlockCondition.type === 'rank' && ikemen.unlockCondition.rank) {
        const requiredRankIndex = rankOrder.indexOf(ikemen.unlockCondition.rank);
        return currentRankIndex >= requiredRankIndex;
      }
      return false;
    })
    .map(ikemen => ikemen.id);
}
