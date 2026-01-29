// src/types/index.ts
// ゲーム全体の型定義

// ===== キャラクターID =====

// イケメンのID
export type IkemenId =
  | 'lucia'
  | 'kagerou'
  | 'haruto'
  | 'ren'
  | 'mizuki'
  | 'souma'
  | 'yukito'
  | 'riku'
  | 'aoi'
  | 'shion';

// 特殊キャラクターのID
export type SpecialCharacterId = 'zephyros' | 'rosa';

// 全キャラクターのID
export type CharacterId = IkemenId | SpecialCharacterId;

// イケメンの階級
export type IkemenRank = 'royal' | 'noble' | 'knight' | 'commoner';

// 階級の日本語ラベル
export const IKEMEN_RANK_LABELS: Record<IkemenRank, string> = {
  royal: '王族',
  noble: '貴族',
  knight: '騎士',
  commoner: '庶民'
};

// 階級別の幻装レベル要件
export const RANK_GLAMOR_REQUIREMENTS: Record<IkemenRank, number> = {
  royal: 6,    // 王族: Lv6必須
  noble: 5,    // 貴族: Lv5以上
  knight: 4,   // 騎士: Lv4以上
  commoner: 0  // 庶民: 制限なし
};

// ===== メタパラメータ =====

export interface MetaParameters {
  luxury: number;     // 高級感 (0-100)
  volume: number;     // ボリューム (0-100)
  healing: number;    // 癒し (0-100)
  stability: number;  // 安定感 (0-100)
  mystery: number;    // 神秘性 (0-100)
  reputation: number; // 評判
}

// ===== シナリオ関連 =====

// シナリオイベントの種類
export type ScenarioEventType = 
  | 'dialogue' 
  | 'choice' 
  | 'narration' 
  | 'effect' 
  | 'image' 
  | 'background';

// 感情表現の種類
export type EmotionType = 
  | 'normal' 
  | 'happy' 
  | 'sad' 
  | 'angry' 
  | 'surprised' 
  | 'smirk';

// 選択肢
export interface ChoiceOption {
  text: string;
  nextEventId: string;
  effects?: {
    money?: number;
    reputation?: number;
    affection?: {
      characterId: CharacterId;
      amount: number;
    };
    flag?: {
      key: string;
      value: boolean | string | number;
    };
  };
}

// シナリオイベント
export interface ScenarioEvent {
  id: string;
  type: ScenarioEventType;
  speaker?: CharacterId | 'protagonist' | 'narration';
  speakerName?: string;
  text?: string;
  emotion?: EmotionType;
  choices?: ChoiceOption[];
  effects?: {
    money?: number;
    reputation?: number;
    flag?: {
      key: string;
      value: boolean | string | number;
    };
    flag2?: {
      key: string;
      value: boolean | string | number;
    };
    flag3?: {
      key: string;
      value: boolean | string | number;
    };
  };
  background?: string;
  nextEventId?: string | null;
}

// シナリオチャプター
export interface ScenarioChapter {
  id: string;
  title: string;
  description: string;
  triggerCondition: {
    day?: number;
    dayRange?: [number, number];
    reputation?: number;
    money?: number;
    flag?: {
      key: string;
      value: boolean | string | number;
    };
  };
  events: ScenarioEvent[];
  isCompleted?: boolean;
}

// ===== エンディング =====

export type EndingType =
  | 'true_end'
  | 'marriage_end'
  | 'unrequited_end'
  | 'success_end'
  | 'normal_end'
  | 'bad_end_debt'
  | 'bad_end_bankrupt';

export interface EndingResult {
  category: EndingType;
  title: string;
  subtitle: string;
  description: string;
  partnerId?: IkemenId;
  partnerName?: string;
  achievements: string[];
  unlocks: string[];
  score: number;
}

// ===== チュートリアル =====

export interface TutorialStep {
  id: string;
  title: string;
  description: string;
  targetElement?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  action?: 'click' | 'input' | 'wait';
}

// ===== ゲーム全体の状態 =====

export interface GameState {
  currentScreen: ScreenType;
  day: number;
  money: number;
  shopRank: ShopRank;
  gameMode: 'management' | 'romance' | 'menu';
  reputation: number;
  
  // 幻装
  glamor: {
    level: number;
    points: number;
  };
  
  // 主人公の見た目
  protagonistVisual: {
    setId: string;
    parts: {
      full: string;
    };
  };
  
  // 好感度
  affection: Record<IkemenId, number>;
  
  // シナリオ関連
  completedScenarios: string[];
  currentScenario: ScenarioChapter | null;
  currentEventIndex: number;
  scenarioFlags: Record<string, boolean | string | number>;
  
  // チュートリアル
  tutorialStep: number;
  tutorialCompleted: boolean;
  isFirstPlaythrough: boolean;
  
  // 借金関連
  debt: number;
  debtInterestRate: number;
  gracePeriodDays: number;
  
  // メタパラメータ
  metaParameters: MetaParameters;
  
  // 連続日数
  consecutiveProfitDays: number;
  consecutiveLossDays: number;
  
  // 日のフェーズ
  dayPhase: 'PREP' | 'OPEN' | 'RESULT' | 'ADVICE';
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
  | 'settings'
  | 'scenario'
  | 'tutorial'
  | 'ending';

// 店舗ランク
export type ShopRank = 'F' | 'E' | 'D' | 'C' | 'B' | 'A' | 'S';

// ===== 主人公 =====

export interface Protagonist {
  name: string;
  level: number;
  stats: {
    charm: number;
    talk: number;
    sense: number;
  };
  appearance: {
    hair: string;
    outfit: string;
    makeup: string;
    accessory: string;
    aura: string;
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
  | 'prince'
  | 'cool'
  | 'childhood'
  | 'tsundere'
  | 'healing'
  | 'oraora'
  | 'yandere'
  | 'sporty'
  | 'mysterious'
  | 'intellectual';

// 妖精属性
export type ElementType =
  | 'light'
  | 'dark'
  | 'wind'
  | 'fire'
  | 'water'
  | 'thunder'
  | 'ice'
  | 'earth'
  | 'star'
  | 'forest';

// ===== メニュー =====

export interface MenuItem {
  id: string;
  name: string;
  category: 'drink' | 'food' | 'sweet' | 'coffee' | 'tea' | 'sweets' | 'special' | 'seasonal';
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
  menuItemId: string;
  quantity: number;
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
  currentTime: number;
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
  completedScenarios: string[];
  scenarioFlags: Record<string, boolean | string | number>;
  readScenarioEvents: string[];
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

// ===== 経営状態 =====

export interface ManagementState {
  day: number;
  phase: 'PREP' | 'OPEN' | 'RESULT' | 'ADVICE';
  money: number;
  reputation: number;
}

// 週次結果
export interface WeeklyResult {
  weekNumber: number;
  totalSales: number;
  totalCost: number;
  totalProfit: number;
  avgCustomers: number;
  avgSatisfaction: number;
  bestDay: number;
  worstDay: number;
}

// 経営判断
export interface ManagementDecision {
  type: 'purchase' | 'price' | 'menu' | 'interior';
  description: string;
  cost?: number;
  expectedEffect: string;
}
