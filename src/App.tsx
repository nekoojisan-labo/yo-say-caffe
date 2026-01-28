import { useGameStore } from '@/store';
import { NotificationContainer } from '@/components/common';
import type { ScreenType } from '@/types';
import { EventScreen } from '@/components/common/screens/EventScreen';
import { HomeScreen } from '@/components/common/screens/HomeScreen';
import { SettingsScreen } from '@/components/common/screens/SettingsScreen';
import { ProtagonistScreen } from '@/components/common/screens/ProtagonistScreen';
import { IkemenListScreen } from '@/components/common/screens/IkemenListScreen';
import { TitleScreen } from '@/components/common/screens/TitleScreen';
import { SaveScreen } from '@/components/common/screens/SaveScreen';
import { ManagementSimScreen } from '@/components/common/screens/ManagementSimScreen';
import { MenuDevScreen } from '@/components/common/screens/MenuDevScreen';
import { InteriorScreen } from '@/components/common/screens/InteriorScreen';
import { DailyBusinessScreen } from '@/components/common/screens/DailyBusinessScreen';

// 画面プレースホルダーコンポーネント
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
          この画面は現在開発中です。
        </p>
        <button
          onClick={() => setScreen('home')}
          className="px-8 py-3 bg-pink-500 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 active:scale-95"
        >
          ホームへ戻る
        </button>
      </div>
    </div>
  );
}

// 画面コンポーネントのマッピング
const SCREEN_COMPONENTS: Record<ScreenType, React.FC> = {
  title: TitleScreen,
  home: HomeScreen,
  cafe: DailyBusinessScreen, // ← 変更
  order: () => <PlaceholderScreen name="発注管理" color="#0d0517" />,
  management: ManagementSimScreen,
  'menu-dev': MenuDevScreen,
  interior: InteriorScreen,
  result: () => <PlaceholderScreen name="営業結果" color="#0d0517" />,
  protagonist: ProtagonistScreen,
  'ikemen-list': IkemenListScreen,
  'ikemen-detail': () => <PlaceholderScreen name="イケメン詳細" color="#0d0517" />,
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
