import { CharacterId } from '@/game/characters';

// ===== シナリオ関連の型 =====

export type ScenarioEventType = 
  | 'dialogue'
  | 'choice'
  | 'narration'
  | 'effect'
  | 'image'
  | 'background';

export interface ChoiceOption {
  text: string;
  nextEventId: string;
  effects?: {
    money?: number;
    reputation?: number;
    affection?: { characterId: CharacterId; amount: number };
    flag?: { key: string; value: boolean | string | number };
  };
}

export interface ScenarioEvent {
  id: string;
  type: ScenarioEventType;
  speaker?: CharacterId | 'protagonist' | 'narration';
  speakerName?: string;
  text?: string;
  emotion?: 'normal' | 'happy' | 'sad' | 'angry' | 'surprised' | 'smirk';
  choices?: ChoiceOption[];
  effects?: {
    money?: number;
    reputation?: number;
    flag?: { key: string; value: boolean | string | number };
  };
  background?: string;
  nextEventId?: string | null;
}

export interface ScenarioChapter {
  id: string;
  title: string;
  description: string;
  triggerCondition: {
    day?: number;
    dayRange?: [number, number];
    reputation?: number;
    money?: number;
    flag?: { key: string; value: boolean | string | number };
  };
  events: ScenarioEvent[];
  isCompleted?: boolean;
}

// ===== ゲーム状態 =====

export interface GameState {
  currentScreen: ScreenType;
  day: number;
  money: number;
  reputation: number;
  glamor: {
    level: number;
    stability: number;
    points: number;
  };
  protagonistVisual: {
    setId: string;
    parts: Record<string, string>;
  };
  // キャラクター関連
  affection: Record<CharacterId, number>;
  encyclopediaUnlocked: Record<CharacterId, boolean>;
  lastAppearedDay: Record<CharacterId, number>;

  shopRank: ShopRank;
  gameMode: 'management' | 'romance' | 'menu';
  dayPhase: DayPhase;
  flags: GameFlags;
  kpi: FinancialStats;
  history: {
    lastDaySummary?: DayResult;
    dailyResults: DayResult[];
    lastEventId?: string;
  };
  lockedRouteId: string | null;
  management: ManagementState;
  romanceFocus: RomanceFocus;
  romanceTickets: Record<CharacterId, number>;

  // シナリオ関連
  completedScenarios: string[];
  currentScenario: ScenarioChapter | null;
  scenarioFlags: Record<string, boolean | string | number>;
}

export interface RomanceFocus {
  id: CharacterId | null;
  heat: number;
}

export type DayPhase = 'PREP' | 'OPEN' | 'CLOSE' | 'RESULT' | 'EVENT' | 'DONE';

export interface GameFlags {
  joinedGuild: boolean;
  routeLock: string | null;
  gameOver: boolean;
  gameOverReason?: string;
  patronStage: number;
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
  | 'scenario';  // シナリオ画面を追加

// 店舗ランク
export type ShopRank = 'F' | 'E' | 'D' | 'C' | 'B' | 'A' | 'S';

// ===== 主人公 =====

export interface Protagonist {
  name: string;
  level: number;
  fantasyLevel: number;
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
}

export interface Inventory {
  [itemId: string]: InventoryItem;
}

// ===== 営業結果 =====

export interface DayResult {
  day: number;
  sales: number;
  cogs: number;
  fixedCost: number;
  variableCost: number;
  breakdown: {
    rent: number;
    labor: number;
    utilities: number;
    maintenance: number;
    other: number;
  };
  profit: number;
  cashAfter: number;
  customers: number;
  reputationDelta: number;
  glamorDelta: { level?: number; stability?: number };
  breakEven: number;
  warnings: string[];
  ikemenVisits: { ikemenId: string; affectionGain: number }[];
  protagonistChanges: Partial<Protagonist['stats']>;
}

export interface EventPayload {
  id: string;
  title: string;
  body: string;
  characterId?: string;
  choices: {
    label: string;
    heartDelta?: number;
    repDelta?: number;
    cashDelta?: number;
    glamorPointsDelta?: number;
    effects?: Partial<GameState>;
    nextScreen?: ScreenType;
  }[];
  type: "system" | "romance" | "weekly" | "danger" | "daily" | "ending" | "intro";
  bgKey?: string;
  portraitKey?: string;
  isGameOver?: boolean;
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
  // シナリオ関連のセーブデータ
  completedScenarios: string[];
  scenarioFlags: Record<string, boolean | string | number>;
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
  cogs: number;
  profit: number;
  fixedCost: number;
  variableCost: number;
  breakEven: number;
  waste?: number;
  costRate?: number;
  profitRate?: number;
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

// ===== 経営シミュレーション =====

export interface ManagementState {
  capital: number;
  popularity: number;
  staffSkill: number;
  inventoryLoss: number;
  currentTrend: string;
  potential: number;
  weeklyHistory: WeeklyResult[];
}

export interface WeeklyResult {
  week: number;
  sales: number;
  cogs: number;
  labor: number;
  rent: number;
  ads: number;
  loss: number;
  profit: number;
  customers: number;
  satisfaction: number;
  popularityDelta: number;
  staffSkillDelta: number;
  topics: string[];
  externalFactors: {
    weather: string;
    trend: string;
    neighborhood: string;
  };
}

export interface ManagementDecision {
  menuDev: string;
  procurement: number;
  shifts: number;
  investment: number;
}
