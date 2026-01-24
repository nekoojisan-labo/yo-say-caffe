import { useGameStore } from '@/store';
import { NotificationContainer } from '@/components/common';
import type { ScreenType } from '@/types';
import { ASSETS } from '@/utils/assets';
import { EventScreen } from '@/components/common/screens/EventScreen';
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
    <div
      className="w-full h-full flex flex-col items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${ASSETS.opening})` }}
    >
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />
      <div className="text-center animate-fade-in relative z-10 flex flex-col items-center">
        {/* 日本語ロゴ */}
        <img
          src={ASSETS.logoJa}
          alt="妖精カフェ物語"
          className="w-[600px] mb-2 filter drop-shadow-[0_4px_4px_rgba(255,255,255,0.8)]"
        />

        {/* 英語ロゴ */}
        <img
          src={ASSETS.logoEn}
          alt="Fairy Cafe Story"
          className="w-[400px] mb-4 opacity-90 drop-shadow-md"
        />

        {/* サブタイトル */}
        <img
          src={ASSETS.subtitle}
          alt="サブタイトル"
          className="w-[500px] mb-12 opacity-80 drop-shadow-sm"
        />

        <button
          onClick={() => setScreen('home')}
          className="px-16 py-5 bg-white/90 rounded-full shadow-card hover:shadow-xl hover:scale-105 transition-all duration-300 text-fairy-pink-500 font-bold text-2xl animate-pulse-soft border-4 border-fairy-pink-100"
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
  return <PlaceholderScreen name="カフェ営業画面" color="#FFB6C1" />;
}

function OrderScreen() {
  return <PlaceholderScreen name="発注・在庫管理画面" color="#87CEEB" />;
}

function ManagementScreen() {
  return <PlaceholderScreen name="経営管理画面" color="#90EE90" />;
}

function MenuDevScreen() {
  return <PlaceholderScreen name="メニュー開発画面" color="#DDA0DD" />;
}

function InteriorScreen() {
  return <PlaceholderScreen name="内装カスタマイズ画面" color="#F0E68C" />;
}

function ResultScreen() {
  return <PlaceholderScreen name="営業結果画面" color="#FFD700" />;
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
