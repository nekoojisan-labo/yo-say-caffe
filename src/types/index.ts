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
  royal: 6,
  noble: 5,
  knight: 4,
  commoner: 0
};

// ===== メタパラメータ =====

export interface MetaParameters {
  luxury: number;
  volume: number;
  healing: number;
  stability: number;
  mystery: number;
  reputation: number;
}

// ===== シナリオ関連 =====

export type ScenarioEventType = 
  | 'dialogue' 
  | 'choice' 
  | 'narration' 
  | 'effect' 
  | 'image' 
  | 'background';

export type EmotionType = 
  | 'normal' 
  | 'happy' 
  | 'sad' 
  | 'angry' 
  | 'surprised' 
  | 'smirk';

// シナリオイベントの効果
export interface ScenarioEventEffects {
  money?: number;
  reputation?: number;
  glamor?: number;
  flag?: { key: string; value: boolean | string | number };
  flag2?: { key: string; value: boolean | string | number };
  flag3?: { key: string; value: boolean | string | number };
}

// 選択肢の効果
export interface ChoiceEffects {
  money?: number;
  reputation?: number;
  glamor?: number;
  affection?: {
    characterId: CharacterId;
    amount: number;
  };
  flag?: { key: string; value: boolean | string | number };
}

// 選択肢
export interface ChoiceOption {
  text: string;
  nextEventId: string;
  effects?: ChoiceEffects;
}

// シナリオイベント
export interface ScenarioEvent {
  id: string;
  type: ScenarioEventType;
  speaker?: CharacterId | 'protagonist' | 'narration' | string;
  speakerName?: string;
  text?: string;
  emotion?: EmotionType;
  background?: string;
  choices?: ChoiceOption[];
  nextEventId?: string | null;
  effects?: ScenarioEventEffects;
}

// シナリオチャプター
export interface ScenarioChapter {
  id: string;
  title: string;
  description?: string;
  background?: string;
  triggerCondition?: {
    day?: number;
    dayRange?: { min?: number; max?: number } | [number, number];
    flag?: string | { key: string; value: boolean | string | number };
    flagValue?: boolean | string | number;
    reputation?: number;
    money?: number;
  };
  events: ScenarioEvent[];
  onComplete?: {
    flag?: string;
    flagValue?: boolean | string | number;
    nextScenarioId?: string;
  };
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

export type DayPhase = 'PREP' | 'OPEN' | 'RESULT' | 'ADVICE';

export interface GameState {
  currentScreen: ScreenType;
  day: number;
  money: number;
  shopRank: ShopRank;
  gameMode: 'management' | 'romance' | 'menu';
  reputation: number;
  
  glamor: {
    level: number;
    points: number;
  };
  
  protagonistVisual: {
    setId: string;
    parts: {
      full: string;
    };
  };
  
  affection: Record<IkemenId, number>;
  
  completedScenarios: string[];
  currentScenario: ScenarioChapter | null;
  currentEventIndex: number;
  scenarioFlags: Record<string, boolean | string | number>;
  
  tutorialStep: number;
  tutorialCompleted: boolean;
  isFirstPlaythrough: boolean;
  
  debt: number;
  debtInterestRate: number;
  gracePeriodDays: number;
  
  metaParameters: MetaParameters;
  
  consecutiveProfitDays: number;
  consecutiveLossDays: number;
  
  dayPhase: DayPhase;
}

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

export interface EventChoice {
  text: string;
  affectionChange: number;
  nextSceneId: string;
}

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

export interface SeatState {
  id: string;
  occupied: boolean;
  customerId?: string;
}

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
  cogs: number;
  fixedCost: number;
  variableCost: number;
  waste: number;
  profit: number;
  costRate: number;
  profitRate: number;
  breakEvenPoint: number;
  breakEven: number;
  breakEvenAchievement: number;
  wasteRate: number;
}

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
  phase: DayPhase;
  money: number;
  reputation: number;
}

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

export interface ManagementDecision {
  type: 'purchase' | 'price' | 'menu' | 'interior';
  description: string;
  cost?: number;
  expectedEffect: string;
}

// ===== ゲームフラグ =====

export interface GameFlags {
  joinedGuild: boolean;
  routeLock: string | null;
  gameOver: boolean;
  patronStage: number;
  [key: string]: boolean | string | number | null;
}

// ===== イベントペイロード =====

export interface EventPayload {
  type: string;
  characterId?: string;
  choices: {
    heartDelta?: number;
    repDelta?: number;
    cashDelta?: number;
    glamorPointsDelta?: number;
    effects?: Record<string, unknown>;
  }[];
  [key: string]: unknown;
}

// ===== ロマンスフォーカス =====

export interface RomanceFocus {
  id: IkemenId | null;
  heat: number;
}
