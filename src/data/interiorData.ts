import type { InteriorItem } from '@/types';

export const INTERIOR_DATA: InteriorItem[] = [
  // ===== 席 =====
  {
    id: 'seat_1',
    name: '基本席(1席目)',
    category: 'seat',
    price: 0,
    effect: {
      type: 'capacity',
      value: 3,
    },
    unlocked: true,
    owned: true,
  },
  {
    id: 'seat_2',
    name: '基本席(2席目)',
    category: 'seat',
    price: 0,
    effect: {
      type: 'capacity',
      value: 3,
    },
    unlocked: true,
    owned: true,
  },
  {
    id: 'seat_3',
    name: '基本席(3席目)',
    category: 'seat',
    price: 0,
    effect: {
      type: 'capacity',
      value: 3,
    },
    unlocked: true,
    owned: true,
  },
  {
    id: 'seat_4',
    name: '追加席(4席目)',
    category: 'seat',
    price: 5000,
    effect: {
      type: 'capacity',
      value: 3,
    },
    unlockCondition: { type: 'default' },
    unlocked: true,
    owned: false,
  },
  {
    id: 'seat_5',
    name: '追加席(5席目)',
    category: 'seat',
    price: 8000,
    effect: {
      type: 'capacity',
      value: 3,
    },
    unlockCondition: { type: 'rank', rank: 'D' },
    unlocked: false,
    owned: false,
  },
  {
    id: 'seat_6',
    name: '追加席(6席目)',
    category: 'seat',
    price: 12000,
    effect: {
      type: 'capacity',
      value: 3,
    },
    unlockCondition: { type: 'rank', rank: 'C' },
    unlocked: false,
    owned: false,
  },

  // ===== 装飾 =====
  {
    id: 'plant_small',
    name: '小さな観葉植物',
    category: 'decoration',
    price: 1500,
    effect: {
      type: 'satisfaction',
      value: 3,
    },
    unlocked: true,
    owned: false,
  },
  {
    id: 'plant_large',
    name: '大きな観葉植物',
    category: 'decoration',
    price: 3000,
    effect: {
      type: 'attractIkemen',
      value: 10,
      targetIkemen: ['mizuki'],
    },
    unlocked: true,
    owned: false,
  },
  {
    id: 'art_poster',
    name: 'アートポスター',
    category: 'decoration',
    price: 2000,
    effect: {
      type: 'attractIkemen',
      value: 10,
      targetIkemen: ['shion'],
    },
    unlocked: true,
    owned: false,
  },
  {
    id: 'cute_tablecloth',
    name: 'キュートなテーブルクロス',
    category: 'decoration',
    price: 1500,
    effect: {
      type: 'satisfaction',
      value: 5,
    },
    unlocked: true,
    owned: false,
  },
  {
    id: 'fairy_lights',
    name: 'フェアリーライト',
    category: 'decoration',
    price: 2500,
    effect: {
      type: 'attractIkemen',
      value: 10,
      targetIkemen: ['lucia'],
    },
    unlocked: true,
    owned: false,
  },
  {
    id: 'dark_curtain',
    name: 'シックなカーテン',
    category: 'decoration',
    price: 3000,
    effect: {
      type: 'attractIkemen',
      value: 10,
      targetIkemen: ['kagerou'],
    },
    unlockCondition: { type: 'rank', rank: 'E' },
    unlocked: false,
    owned: false,
  },
  {
    id: 'sports_goods',
    name: 'スポーツグッズコーナー',
    category: 'decoration',
    price: 4000,
    effect: {
      type: 'attractIkemen',
      value: 15,
      targetIkemen: ['soma', 'riku'],
    },
    unlockCondition: { type: 'rank', rank: 'D' },
    unlocked: false,
    owned: false,
  },
  {
    id: 'bookshelf',
    name: '本棚',
    category: 'decoration',
    price: 5000,
    effect: {
      type: 'attractIkemen',
      value: 15,
      targetIkemen: ['shion', 'aoi'],
    },
    unlockCondition: { type: 'rank', rank: 'C' },
    unlocked: false,
    owned: false,
  },
  {
    id: 'starry_ceiling',
    name: '星空の天井装飾',
    category: 'decoration',
    price: 8000,
    effect: {
      type: 'attractIkemen',
      value: 20,
      targetIkemen: ['aoi'],
    },
    unlockCondition: { type: 'rank', rank: 'B' },
    unlocked: false,
    owned: false,
  },
  {
    id: 'ice_sculpture',
    name: '氷の彫刻',
    category: 'decoration',
    price: 6000,
    effect: {
      type: 'attractIkemen',
      value: 15,
      targetIkemen: ['yukito'],
    },
    unlockCondition: { type: 'rank', rank: 'C' },
    unlocked: false,
    owned: false,
  },

  // ===== 設備 =====
  {
    id: 'espresso_machine',
    name: 'エスプレッソマシン',
    category: 'equipment',
    price: 10000,
    effect: {
      type: 'menuUnlock',
      value: ['espresso', 'latte', 'cappuccino'],
    },
    unlockCondition: { type: 'rank', rank: 'D' },
    unlocked: false,
    owned: false,
  },
  {
    id: 'oven',
    name: '本格オーブン',
    category: 'equipment',
    price: 15000,
    effect: {
      type: 'menuUnlock',
      value: ['scone', 'croissant'],
    },
    unlockCondition: { type: 'rank', rank: 'C' },
    unlocked: false,
    owned: false,
  },
  {
    id: 'showcase',
    name: 'ケーキショーケース',
    category: 'equipment',
    price: 20000,
    effect: {
      type: 'satisfaction',
      value: 10,
    },
    unlockCondition: { type: 'rank', rank: 'B' },
    unlocked: false,
    owned: false,
  },
];

// カテゴリ別に内装を取得
export function getInteriorsByCategory(category: InteriorItem['category']): InteriorItem[] {
  return INTERIOR_DATA.filter(item => item.category === category);
}

// 購入可能な内装を取得
export function getPurchasableInteriors(): InteriorItem[] {
  return INTERIOR_DATA.filter(item => item.unlocked && !item.owned && item.price > 0);
}

// 所有している内装を取得
export function getOwnedInteriors(): InteriorItem[] {
  return INTERIOR_DATA.filter(item => item.owned);
}

// 席の数を取得
export function getOwnedSeatCount(): number {
  return INTERIOR_DATA.filter(item => item.category === 'seat' && item.owned).length;
}
