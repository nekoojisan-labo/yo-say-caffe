// ===== ゲーム全体の状態 =====

export interface GameState {
  currentScreen: ScreenType;
  day: number;
  money: number;
  shopRank: ShopRank;
  gameMode: 'management' | 'romance' | 'menu';
}

// 画面タイプ
export type ScreenType =
  | 'title'
  | 'home'
  | 'cafe'
  | 'order'
  | 'management'
  | 'menu-dev'
  | 'interior'
  | 'result'
  | 'protagonist'
  | 'ikemen-list'
  | 'ikemen-detail'
  | 'event'
  | 'gallery'
  | 'save'
  | 'settings';

// 店舗ランク
export type ShopRank = 'F' | 'E' | 'D' | 'C' | 'B' | 'A' | 'S';

// ===== 主人公 =====

export interface Protagonist {
  name: string;
  level: number;
  stats: {
    charm: number;    // 魅力
    talk: number;     // 話術
    sense: number;    // センス
  };
  appearance: {
    hair: string;       // 髪型ID
    outfit: string;     // 服装ID
    makeup: string;     // メイクID
    accessory: string;  // アクセサリーID
    aura: string;       // オーラID
  };
}

// ===== イケメン妖精 =====

export interface Ikemen {
  id: string;
  name: string;
  personality: PersonalityType;
  element: ElementType;
  favoriteMenus: string[];
  affection: number;
  unlocked: boolean;
  visitCount: number;
  events: EventProgress[];
}

// 性格属性
export type PersonalityType =
  | 'prince'       // 王子様系
  | 'cool'         // クール系
  | 'childhood'    // 幼なじみ系
  | 'tsundere'     // ツンデレ系
  | 'healing'      // 癒し系
  | 'oraora'       // オラオラ系
  | 'yandere'      // ヤンデレ系
  | 'sporty'       // 体育会系
  | 'mysterious'   // ミステリアス系
  | 'intellectual';// 眼鏡インテリ系

// 妖精属性
export type ElementType =
  | 'light'   // 光
  | 'dark'    // 闇
  | 'wind'    // 風
  | 'fire'    // 炎
  | 'water'   // 水
  | 'thunder' // 雷
  | 'ice'     // 氷
  | 'earth'   // 土
  | 'star'    // 星
  | 'forest'; // 森

// ===== メニュー =====

export interface MenuItem {
  id: string;
  name: string;
  category: 'drink' | 'food' | 'sweet';
  cost: number;
  price: number;
  developCost: number;
  attractsIkemen: string[];
  unlocked: boolean;
  description?: string;
  flavorText?: string;
  unlockCondition?: UnlockCondition;
}

// 解放条件
export interface UnlockCondition {
  type: 'default' | 'rank' | 'affection' | 'event';
  rank?: ShopRank;
  ikemenId?: string;
  affection?: number;
  eventId?: string;
}

// ===== 在庫 =====

export interface InventoryItem {
  stock: number;
  pendingOrder: number;
  waste: number;
}

export interface Inventory {
  [itemId: string]: InventoryItem;
}

// ===== 営業結果 =====

export interface DayResult {
  day: number;
  customers: number;
  sales: number;
  cost: number;
  fixedCost: number;
  profit: number;
  wastedItems: number;
  avgSatisfaction: number;
  ikemenVisits: { ikemenId: string; affectionGain: number }[];
  protagonistChanges: Partial<Protagonist['stats']>;
}

// ===== イベント =====

export interface GameEvent {
  id: string;
  ikemenId: string;
  title: string;
  requiredAffection: number;
  scenes: EventScene[];
  hasCG: boolean;
  cgId?: string;
}

// イベントシーン
export interface EventScene {
  id: string;
  background: string;
  character?: {
    id: string;
    expression: string;
    position: 'left' | 'center' | 'right';
  };
  dialogue: {
    speaker: string;
    text: string;
  };
  choices?: EventChoice[];
}

// 選択肢
export interface EventChoice {
  text: string;
  affectionChange: number;
  nextSceneId: string;
}

// イベント進行状況
export interface EventProgress {
  eventId: string;
  completed: boolean;
  cgUnlocked: boolean;
}

// ===== 内装 =====

export interface InteriorItem {
  id: string;
  name: string;
  category: 'seat' | 'decoration' | 'equipment';
  price: number;
  effect: InteriorEffect;
  unlockCondition?: UnlockCondition;
  unlocked: boolean;
  owned: boolean;
}

export interface InteriorEffect {
  type: 'capacity' | 'attractIkemen' | 'satisfaction' | 'menuUnlock';
  value: number | string[];
  targetIkemen?: string[];
}

// ===== カフェの状態 =====

export interface CafeState {
  currentTime: number;  // 分単位（9:00 = 540）
  isOpen: boolean;
  isPaused: boolean;
  speed: 1 | 2 | 4;
  mode: 'auto' | 'manual';
  seats: SeatState[];
  customers: CustomerState[];
  todayStats: {
    customers: number;
    sales: number;
    cost: number;
    ikemenVisits: { ikemenId: string; affectionGain: number }[];
  };
}

// 席の状態
export interface SeatState {
  id: string;
  occupied: boolean;
  customerId?: string;
}

// 客の状態
export interface CustomerState {
  id: string;
  isIkemen: boolean;
  ikemenId?: string;
  status: 'entering' | 'ordering' | 'waiting' | 'eating' | 'leaving';
  satisfaction: number;
  orderedItem?: string;
  seatId?: string;
}

// ===== オーディオ設定 =====

export interface AudioSettings {
  bgmVolume: number;
  seVolume: number;
  bgmMuted: boolean;
  seMuted: boolean;
}

// ゲーム設定
export interface GameSettings {
  audio: AudioSettings;
  textSpeed: 'slow' | 'normal' | 'fast' | 'instant';
  autoSpeed: 'slow' | 'normal' | 'fast';
  defaultCafeMode: 'auto' | 'manual';
  showConfirmDialog: boolean;
}

// ===== セーブデータ =====

export interface SaveData {
  version: string;
  savedAt: string;
  gameState: GameState;
  protagonist: Protagonist;
  ikemenList: Ikemen[];
  inventory: Inventory;
  unlockedMenus: string[];
  unlockedInteriors: string[];
  ownedInteriors: string[];
  unlockedCGs: string[];
  eventFlags: Record<string, boolean>;
  salesHistory: Record<string, number[]>;
  settings: GameSettings;
}

// セーブスロット情報
export interface SaveSlotInfo {
  slotId: number;
  exists: boolean;
  day?: number;
  money?: number;
  rank?: string;
  savedAt?: string;
}

// ===== CG =====

export interface CGItem {
  id: string;
  ikemenId: string;
  title: string;
  eventId: string;
  order: number;
}

// ===== 経営指標 =====

export interface FinancialStats {
  sales: number;
  cost: number;
  fixedCost: number;
  waste: number;
  profit: number;
  costRate: number;
  profitRate: number;
  breakEvenPoint: number;
  breakEvenAchievement: number;
  wasteRate: number;
}

// 経営アドバイス
export interface Advice {
  type: 'positive' | 'warning' | 'danger';
  text: string;
}

// ===== 通知 =====

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}
