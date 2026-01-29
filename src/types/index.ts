import { CharacterId } from '@/game/characters';

// ===== イケメン階級 =====
export type IkemenRank = 'royal' | 'noble' | 'knight' | 'commoner';

export const IKEMEN_RANK_LABELS: Record<IkemenRank, string> = {
  royal: '王族',
  noble: '貴族',
  knight: '騎士',
  commoner: '庶民',
};

// 階級ごとの結婚に必要な幻装レベル
export const RANK_GLAMOR_REQUIREMENTS: Record<IkemenRank, number> = {
  royal: 6,    // 王族: Lv6必須
  noble: 5,    // 貴族: Lv5以上
  knight: 4,   // 騎士: Lv4以上
  commoner: 3, // 庶民: Lv3以上（ほぼ制限なし）
};

// ===== シナリオ関連 =====
export type ScenarioEventType =
  | 'dialogue'      // 会話
  | 'choice'        // 選択肢
  | 'narration'     // ナレーション
  | 'effect'        // 効果（お金増減、評判変動など）
  | 'image'         // 立ち絵変更
  | 'background';   // 背景変更

export type EmotionType = 'normal' | 'happy' | 'sad' | 'angry' | 'surprised' | 'smirk';

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
  emotion?: EmotionType;
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
    minDay?: number;
    reputation?: number;
    money?: number;
    moneyBelow?: number;
    glamorLevel?: number;
    affection?: { characterId: CharacterId; amount: number };
    flag?: { key: string; value: boolean | string | number };
  };
  events: ScenarioEvent[];
  priority?: number; // 同時に条件を満たす場合の優先度
}

// ===== メタパラメータ（イケメン来店判定用） =====
export interface MetaParameters {
  luxury: number;      // 豪華度（高級メニュー比率）
  volume: number;      // ボリューム（食事系の量）
  healing: number;     // 癒し度（ドリンク・スイーツ比率）
  stability: number;   // 安定度（連続黒字日数）
  mystery: number;     // 神秘度（特殊条件）
  reputation: number;  // 評判（そのまま）
}

// ===== エンディング =====
export type EndingType =
  | 'true_end'           // シオン True End
  | 'marriage'           // 結婚エンド（イケメン別）
  | 'unrequited'         // 片思いエンド（幻装不足）
  | 'business_success'   // 経営成功エンド（恋愛なし）
  | 'single'             // 独身エンド
  | 'bad_debt'           // Bad End（借金）
  | 'bad_closure';       // Bad End（閉店）

export interface EndingResult {
  type: EndingType;
  characterId?: CharacterId; // 結婚/片思いの場合
  title: string;
  description: string;
}

// ===== チュートリアル =====
export type TutorialStep =
  | 'prologue'           // プロローグ
  | 'procurement_intro'  // 仕入れ説明
  | 'procurement_do'     // 仕入れ実践
  | 'operation_intro'    // 営業説明
  | 'operation_do'       // 営業実践
  | 'result_intro'       // 結果説明
  | 'shouran_intro'      // 照覧の魔法説明
  | 'tutorial_complete'; // チュートリアル完了

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

  // シナリオ関連
  completedScenarios: string[];
  currentScenario: ScenarioChapter | null;
  currentEventIndex: number;
  scenarioFlags: Record<string, boolean | string | number>;
  
  // チュートリアル関連
  tutorialStep: TutorialStep | null;
  tutorialCompleted: boolean;
  isFirstPlaythrough: boolean;

  // 経営関連
  shopRank: ShopRank;
  gameMode: 'management' | 'romance' | 'menu';
  dayPhase: DayPhase;
  consecutiveProfitDays: number;  // 連続黒字日数
  consecutiveLossDays: number;    // 連続赤字日数
  
  // 借金関連
  debt: number;                   // 借金額
  debtInterestRate: number;       // 利率（週利）
  gracePeriodDays: number;        // 猶予期間残り日数

  // メタパラメータ（前日の仕入れから計算）
  metaParameters: MetaParameters;

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
}

export interface RomanceFocus {
  id: CharacterId | null;
  heat: number;
}

export type DayPhase = 'PREP' | 'OPEN' | 'CLOSE' | 'RESULT' | 'EVENT' | 'SCENARIO' | 'DONE';

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
  | 'scenario'      // 追加
  | 'tutorial'      // 追加
  | 'ending';       // 追加

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
  rank: IkemenRank;           // 追加: 階級
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
  // メタパラメータへの寄与
  luxuryValue?: number;   // 豪華度への寄与
  volumeValue?: number;   // ボリュームへの寄与
  healingValue?: number;  // 癒し度への寄与
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
  ikemenVisits: { ikemenId: string; visitorName: string; affectionGain: number }[];
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
  skipReadScenarios: boolean;  // 追加: 既読シナリオスキップ
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
  // シナリオ関連
  completedScenarios: string[];
  scenarioFlags: Record<string, boolean | string | number>;
  readScenarioEvents: string[];  // 追加: 既読イベントID
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
  cogs: number;
  profit: number;
  fixedCost: number;
  variableCost: number;
  breakEven: number;
  waste?: number;
  costRate?: number;
  profitRate?: number;
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
