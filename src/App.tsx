import { useGameStore } from '@/store';
import { NotificationContainer } from '@/components/common';
import type { ScreenType } from '@/types';
import { EventScreen } from '@/components/common/screens/EventScreen';
import { HomeScreen } from '@/components/common/screens/HomeScreen';
import { SettingsScreen } from '@/components/common/screens/SettingsScreen';
import { ProtagonistScreen } from '@/components/common/screens/ProtagonistScreen';
import { IkemenListScreen } from '@/components/common/screens/IkemenListScreen';
import { CafeOperationScreen } from '@/components/common/screens/CafeOperationScreen';
import { TitleScreen } from '@/components/common/screens/TitleScreen';
import { SaveScreen } from '@/components/common/screens/SaveScreen';
import { ManagementSimScreen } from '@/components/common/screens/ManagementSimScreen';
import { MenuDevScreen } from '@/components/common/screens/MenuDevScreen';
import { InteriorScreen } from '@/components/common/screens/InteriorScreen';

// 画面プレースホルダーコンポーネント (実装待ち画面用 - 汎用)
function PlaceholderScreen({ name, color }: { name: string; color: string }) {
  const setScreen = useGameStore((state) => state.setScreen);

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center p-8 text-center"
      style={{ backgroundColor: color }}
    >
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-12 shadow-card max-w-lg border-2 border-white/50">
        <h1 className="text-3xl font-black text-gray-800 mb-4">{name}</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          この画面は現在開発中（プレースホルダー）です。<br />
          妖精たちの魔法で、近いうちに完成する予定よ。
        </p>
        <button
          onClick={() => setScreen('home')}
          className="px-8 py-3 bg-fairy-pink-500 text-white rounded-full font-bold shadow-soft hover:shadow-lg transition-all hover:-translate-y-1 active:scale-95"
        >
          ホームへ戻る
        </button>
      </div>
    </div>
  );
}
// 各画面のプレースホルダー

// 各画面のプレースホルダー

function ResultScreen() {
  return <PlaceholderScreen name="営業結果画面" color="#FFD700" />;
}

function IkemenDetailScreen() {
  return <PlaceholderScreen name="イケメン詳細画面" color="#FF8C69" />;
}


// 画面コンポーネントのマッピング
const SCREEN_COMPONENTS: Record<ScreenType, React.FC> = {
  title: TitleScreen,
  home: HomeScreen,
  cafe: CafeOperationScreen,
  order: () => <PlaceholderScreen name="発注管理" color="#0d0517" />,
  management: ManagementSimScreen,
  'menu-dev': MenuDevScreen,
  interior: InteriorScreen,
  result: ResultScreen,
  protagonist: ProtagonistScreen,
  'ikemen-list': IkemenListScreen,
  'ikemen-detail': IkemenDetailScreen,
  event: EventScreen,
  gallery: () => <PlaceholderScreen name="ギャラリー" color="#0d0517" />,
  save: SaveScreen,
  settings: SettingsScreen,
};

function App() {
  const currentScreen = useGameStore((state) => state.currentScreen);
  const ScreenComponent = SCREEN_COMPONENTS[currentScreen] || TitleScreen;

  return (
    <div className="w-screen h-screen overflow-hidden bg-game-bg text-gray-800 font-sans">
      <ScreenComponent />
      <NotificationContainer />
    </div>
  );
}

export default App;

