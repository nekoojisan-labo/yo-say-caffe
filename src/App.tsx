import { useGameStore } from '@/store';
import { NotificationContainer } from '@/components/common';
import {
  CafeScreen as CafeScreenComponent,
  OrderScreen as OrderScreenComponent,
  ManagementScreen as ManagementScreenComponent,
  ResultScreen as ResultScreenComponent,
  MenuDevScreen as MenuDevScreenComponent,
  InteriorScreen as InteriorScreenComponent,
} from '@/components/management';
import type { ScreenType } from '@/types';

// 画面プレースホルダーコンポーネント
function PlaceholderScreen({ name, color }: { name: string; color: string }) {
  const setScreen = useGameStore((state) => state.setScreen);

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center"
      style={{ backgroundColor: color }}
    >
      <h1 className="text-3xl font-bold text-white mb-8">{name}</h1>
      <div className="flex flex-wrap gap-4 justify-center max-w-2xl">
        <NavButton screen="title" label="タイトル" onClick={setScreen} />
        <NavButton screen="home" label="ホーム" onClick={setScreen} />
        <NavButton screen="cafe" label="カフェ営業" onClick={setScreen} />
        <NavButton screen="order" label="発注" onClick={setScreen} />
        <NavButton screen="management" label="経営管理" onClick={setScreen} />
        <NavButton screen="menu-dev" label="メニュー開発" onClick={setScreen} />
        <NavButton screen="interior" label="内装" onClick={setScreen} />
        <NavButton screen="result" label="営業結果" onClick={setScreen} />
        <NavButton screen="protagonist" label="主人公" onClick={setScreen} />
        <NavButton screen="ikemen-list" label="イケメン一覧" onClick={setScreen} />
        <NavButton screen="event" label="イベント" onClick={setScreen} />
        <NavButton screen="gallery" label="ギャラリー" onClick={setScreen} />
        <NavButton screen="save" label="セーブ/ロード" onClick={setScreen} />
        <NavButton screen="settings" label="設定" onClick={setScreen} />
      </div>
    </div>
  );
}

function NavButton({
  screen,
  label,
  onClick,
}: {
  screen: ScreenType;
  label: string;
  onClick: (screen: ScreenType) => void;
}) {
  return (
    <button
      onClick={() => onClick(screen)}
      className="px-4 py-2 bg-white/90 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 text-gray-700 font-medium"
    >
      {label}
    </button>
  );
}

// 各画面のプレースホルダー
function TitleScreen() {
  const setScreen = useGameStore((state) => state.setScreen);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-fairy-pink-200 to-fairy-lavender-100">
      <div className="text-center animate-fade-in">
        <h1 className="text-5xl font-bold text-fairy-pink-500 mb-4 drop-shadow-lg">
          妖精カフェ物語
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Fairy Cafe Story
        </p>
        <button
          onClick={() => setScreen('home')}
          className="px-12 py-4 bg-white rounded-2xl shadow-card hover:shadow-lg hover:scale-105 transition-all duration-300 text-fairy-pink-500 font-bold text-xl animate-pulse-soft"
        >
          はじめる
        </button>
      </div>
    </div>
  );
}

function HomeScreen() {
  return <PlaceholderScreen name="ホーム画面" color="#E6E6FA" />;
}

function CafeScreen() {
  return <CafeScreenComponent />;
}

function OrderScreen() {
  return <OrderScreenComponent />;
}

function ManagementScreen() {
  return <ManagementScreenComponent />;
}

function MenuDevScreen() {
  return <MenuDevScreenComponent />;
}

function InteriorScreen() {
  return <InteriorScreenComponent />;
}

function ResultScreen() {
  return <ResultScreenComponent />;
}

function ProtagonistScreen() {
  return <PlaceholderScreen name="主人公画面" color="#FFA07A" />;
}

function IkemenListScreen() {
  return <PlaceholderScreen name="イケメン一覧画面" color="#FF6B6B" />;
}

function IkemenDetailScreen() {
  return <PlaceholderScreen name="イケメン詳細画面" color="#FF8C69" />;
}

function EventScreen() {
  return <PlaceholderScreen name="イベント画面" color="#DA70D6" />;
}

function GalleryScreen() {
  return <PlaceholderScreen name="CGギャラリー画面" color="#BA55D3" />;
}

function SaveScreen() {
  return <PlaceholderScreen name="セーブ/ロード画面" color="#778899" />;
}

function SettingsScreen() {
  return <PlaceholderScreen name="設定画面" color="#A9A9A9" />;
}

// 画面コンポーネントのマッピング
const SCREEN_COMPONENTS: Record<ScreenType, React.FC> = {
  title: TitleScreen,
  home: HomeScreen,
  cafe: CafeScreen,
  order: OrderScreen,
  management: ManagementScreen,
  'menu-dev': MenuDevScreen,
  interior: InteriorScreen,
  result: ResultScreen,
  protagonist: ProtagonistScreen,
  'ikemen-list': IkemenListScreen,
  'ikemen-detail': IkemenDetailScreen,
  event: EventScreen,
  gallery: GalleryScreen,
  save: SaveScreen,
  settings: SettingsScreen,
};

function App() {
  const currentScreen = useGameStore((state) => state.currentScreen);
  const ScreenComponent = SCREEN_COMPONENTS[currentScreen] || TitleScreen;

  return (
    <div className="w-screen h-screen overflow-hidden bg-game-bg">
      <ScreenComponent />
      <NotificationContainer />
    </div>
  );
}

export default App;
