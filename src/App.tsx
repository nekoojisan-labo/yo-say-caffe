import React from 'react';
import { useGameStore, useIkemenStore, useAudioStore } from '@/store';
import { NotificationContainer, ProgressBar } from '@/components/common';
import { IKEMEN_MASTER_DATA } from '@/data/ikemenData';
import { getAffectionLevel } from '@/store/ikemenStore';
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
  const { setScreen, day, money, shopRank } = useGameStore();

  const menuItems = [
    { screen: 'cafe' as ScreenType, label: 'カフェ営業', icon: '☕', desc: '営業を開始する', primary: true },
    { screen: 'order' as ScreenType, label: '発注・在庫', icon: '📦', desc: '食材を発注する' },
    { screen: 'management' as ScreenType, label: '経営管理', icon: '📊', desc: '売上を確認する' },
    { screen: 'menu-dev' as ScreenType, label: 'メニュー開発', icon: '🍰', desc: '新メニューを開発' },
    { screen: 'interior' as ScreenType, label: '内装', icon: '🪑', desc: 'お店をカスタマイズ' },
    { screen: 'ikemen-list' as ScreenType, label: 'イケメン', icon: '🧚‍♂️', desc: '妖精たちを確認' },
  ];

  const subMenuItems = [
    { screen: 'save' as ScreenType, label: 'セーブ/ロード', icon: '💾' },
    { screen: 'settings' as ScreenType, label: '設定', icon: '⚙️' },
    { screen: 'title' as ScreenType, label: 'タイトルへ', icon: '🏠' },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-fairy-pink-50 to-fairy-lavender-100">
      {/* ステータスヘッダー */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-fairy-pink-100 p-4">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-xs text-gray-500">日数</div>
            <div className="text-lg font-bold text-gray-800">Day {day}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500">所持金</div>
            <div className="text-lg font-bold text-fairy-gold">{money.toLocaleString()}G</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500">ランク</div>
            <div className="text-lg font-bold text-fairy-pink-500">{shopRank}</div>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 gap-6">
        <h1 className="text-2xl font-bold text-gray-800">妖精カフェ物語</h1>

        {/* メインメニュー */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl w-full">
          {menuItems.map((item) => (
            <button
              key={item.screen}
              onClick={() => setScreen(item.screen)}
              className={`p-4 rounded-2xl shadow-card hover:shadow-lg hover:scale-105 transition-all duration-200 text-left ${
                item.primary
                  ? 'bg-gradient-to-br from-fairy-pink-400 to-fairy-pink-500 text-white col-span-2 md:col-span-1'
                  : 'bg-white/90'
              }`}
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className={`font-bold ${item.primary ? 'text-white' : 'text-gray-800'}`}>
                {item.label}
              </div>
              <div className={`text-xs mt-1 ${item.primary ? 'text-white/80' : 'text-gray-500'}`}>
                {item.desc}
              </div>
            </button>
          ))}
        </div>

        {/* サブメニュー */}
        <div className="flex gap-3 mt-4">
          {subMenuItems.map((item) => (
            <button
              key={item.screen}
              onClick={() => setScreen(item.screen)}
              className="px-4 py-2 bg-white/60 rounded-xl hover:bg-white/90 transition-all duration-200 text-gray-600 text-sm flex items-center gap-2"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
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
  const setScreen = useGameStore((state) => state.setScreen);
  const { ikemenList } = useIkemenStore();

  // 属性アイコン
  const elementIcons: Record<string, string> = {
    light: '☀️', dark: '🌙', wind: '🌬️', fire: '🔥', water: '💧',
    thunder: '⚡', ice: '❄️', earth: '🌍', star: '⭐', forest: '🌲',
  };

  // 性格タイプ名
  const personalityNames: Record<string, string> = {
    prince: '王子様系', cool: 'クール系', childhood: '幼なじみ系',
    tsundere: 'ツンデレ系', healing: '癒し系', oraora: 'オラオラ系',
    yandere: 'ヤンデレ系', sporty: '体育会系', mysterious: 'ミステリアス系',
    intellectual: '眼鏡インテリ系',
  };

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-fairy-pink-50 to-fairy-lavender-100">
      {/* ヘッダー */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-fairy-pink-100 p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <button
            onClick={() => setScreen('home')}
            className="px-4 py-2 bg-white/60 rounded-xl hover:bg-white/90 transition-all text-gray-600"
          >
            ← 戻る
          </button>
          <h1 className="text-xl font-bold text-gray-800">🧚‍♂️ イケメン妖精</h1>
          <div className="w-20" />
        </div>
      </div>

      {/* イケメン一覧 */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {ikemenList.map((ikemen) => {
            const master = IKEMEN_MASTER_DATA.find((m) => m.id === ikemen.id);
            if (!master) return null;

            const level = getAffectionLevel(ikemen.affection);
            const isLocked = !ikemen.unlocked;

            return (
              <div
                key={ikemen.id}
                className={`p-4 rounded-2xl shadow-card transition-all ${
                  isLocked ? 'bg-gray-200/80 opacity-60' : 'bg-white/90 hover:shadow-lg'
                }`}
              >
                <div className="flex gap-4">
                  {/* アイコン */}
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${
                    isLocked ? 'bg-gray-300' : 'bg-gradient-to-br from-fairy-pink-100 to-fairy-lavender-100'
                  }`}>
                    {isLocked ? '🔒' : elementIcons[ikemen.element]}
                  </div>

                  {/* 情報 */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg text-gray-800">
                        {isLocked ? '???' : ikemen.name}
                      </span>
                      {!isLocked && (
                        <span className="text-xs px-2 py-0.5 bg-fairy-pink-100 text-fairy-pink-600 rounded-full">
                          {personalityNames[ikemen.personality]}
                        </span>
                      )}
                    </div>

                    {isLocked ? (
                      <p className="text-sm text-gray-500 mt-1">
                        ランク{master.unlockCondition.rank || '?'}で解放
                      </p>
                    ) : (
                      <>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {master.description}
                        </p>
                        <div className="mt-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">好感度 Lv.{level}</span>
                            <span className="text-xs text-gray-400">来店{ikemen.visitCount}回</span>
                          </div>
                          <ProgressBar
                            value={ikemen.affection}
                            max={100}
                            color="pink"
                            size="sm"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
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

interface SaveSlotInfo {
  slotId: number;
  exists: boolean;
  day?: number;
  money?: number;
  rank?: string;
  savedAt?: string;
}

function SaveScreen() {
  const setScreen = useGameStore((state) => state.setScreen);
  const gameState = useGameStore();
  const { ikemenList, setIkemenList } = useIkemenStore();
  const audioSettings = useAudioStore();
  const [slots, setSlots] = React.useState<SaveSlotInfo[]>([]);
  const [mode, setMode] = React.useState<'save' | 'load'>('save');
  const [loading, setLoading] = React.useState(true);

  // Electron APIが利用可能かチェック
  const isElectron = typeof window !== 'undefined' && 'electronAPI' in window;

  // スロット情報を取得
  React.useEffect(() => {
    loadSlots();
  }, []);

  const loadSlots = async () => {
    setLoading(true);
    if (isElectron && window.electronAPI) {
      const result = await window.electronAPI.getSaveSlots();
      setSlots(result);
    } else {
      // LocalStorage fallback
      const localSlots: SaveSlotInfo[] = [];
      for (let i = 0; i <= 5; i++) {
        const saved = localStorage.getItem(`fairy_cafe_save_${i}`);
        if (saved) {
          try {
            const data = JSON.parse(saved);
            localSlots.push({
              slotId: i,
              exists: true,
              day: data.gameState?.day,
              money: data.gameState?.money,
              rank: data.gameState?.shopRank,
              savedAt: data.savedAt,
            });
          } catch {
            localSlots.push({ slotId: i, exists: false });
          }
        } else {
          localSlots.push({ slotId: i, exists: false });
        }
      }
      setSlots(localSlots);
    }
    setLoading(false);
  };

  const handleSave = async (slotId: number) => {
    const saveData = {
      version: '0.1.0',
      savedAt: new Date().toISOString(),
      gameState: {
        currentScreen: gameState.currentScreen,
        day: gameState.day,
        money: gameState.money,
        shopRank: gameState.shopRank,
        gameMode: gameState.gameMode,
      },
      ikemenList,
      audioSettings: {
        bgmVolume: audioSettings.bgmVolume,
        seVolume: audioSettings.seVolume,
        bgmMuted: audioSettings.bgmMuted,
        seMuted: audioSettings.seMuted,
      },
    };

    if (isElectron && window.electronAPI) {
      const result = await window.electronAPI.saveGame(slotId, saveData as never);
      if (result.success) {
        alert('セーブしました！');
        loadSlots();
      }
    } else {
      localStorage.setItem(`fairy_cafe_save_${slotId}`, JSON.stringify(saveData));
      alert('セーブしました！');
      loadSlots();
    }
  };

  const handleLoad = async (slotId: number) => {
    let data = null;

    if (isElectron && window.electronAPI) {
      const result = await window.electronAPI.loadGame(slotId);
      if (result.success && result.data) {
        data = result.data;
      }
    } else {
      const saved = localStorage.getItem(`fairy_cafe_save_${slotId}`);
      if (saved) {
        data = JSON.parse(saved);
      }
    }

    if (data) {
      // ゲーム状態を復元
      gameState.setGameState(data.gameState);
      if (data.ikemenList) {
        setIkemenList(data.ikemenList);
      }
      if (data.audioSettings) {
        audioSettings.setAudioSettings(data.audioSettings);
      }
      alert('ロードしました！');
      setScreen('home');
    }
  };

  const handleDelete = async (slotId: number) => {
    if (!confirm('このセーブデータを削除しますか？')) return;

    if (isElectron && window.electronAPI) {
      await window.electronAPI.deleteSave(slotId);
    } else {
      localStorage.removeItem(`fairy_cafe_save_${slotId}`);
    }
    loadSlots();
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleString('ja-JP', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-fairy-pink-50 to-fairy-lavender-100">
      {/* ヘッダー */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-fairy-pink-100 p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <button
            onClick={() => setScreen('home')}
            className="px-4 py-2 bg-white/60 rounded-xl hover:bg-white/90 transition-all text-gray-600"
          >
            ← 戻る
          </button>
          <h1 className="text-xl font-bold text-gray-800">💾 セーブ/ロード</h1>
          <div className="w-20" />
        </div>
      </div>

      {/* モード切り替え */}
      <div className="flex justify-center gap-2 p-4">
        <button
          onClick={() => setMode('save')}
          className={`px-6 py-2 rounded-xl font-medium transition-all ${
            mode === 'save'
              ? 'bg-fairy-pink-500 text-white'
              : 'bg-white/60 text-gray-600 hover:bg-white/90'
          }`}
        >
          セーブ
        </button>
        <button
          onClick={() => setMode('load')}
          className={`px-6 py-2 rounded-xl font-medium transition-all ${
            mode === 'load'
              ? 'bg-fairy-pink-500 text-white'
              : 'bg-white/60 text-gray-600 hover:bg-white/90'
          }`}
        >
          ロード
        </button>
      </div>

      {/* スロット一覧 */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-md mx-auto space-y-3">
          {loading ? (
            <div className="text-center text-gray-500 py-8">読み込み中...</div>
          ) : (
            slots.map((slot) => (
              <div
                key={slot.slotId}
                className="bg-white/90 rounded-2xl shadow-card p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-800">
                      スロット {slot.slotId + 1}
                    </div>
                    {slot.exists ? (
                      <div className="text-sm text-gray-500 mt-1">
                        <div>Day {slot.day} / {slot.money?.toLocaleString()}G / ランク{slot.rank}</div>
                        <div className="text-xs">{formatDate(slot.savedAt)}</div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-400 mt-1">空きスロット</div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {mode === 'save' ? (
                      <button
                        onClick={() => handleSave(slot.slotId)}
                        className="px-4 py-2 bg-fairy-pink-500 text-white rounded-xl hover:bg-fairy-pink-600 transition-all text-sm"
                      >
                        保存
                      </button>
                    ) : (
                      <button
                        onClick={() => handleLoad(slot.slotId)}
                        disabled={!slot.exists}
                        className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        読込
                      </button>
                    )}
                    {slot.exists && (
                      <button
                        onClick={() => handleDelete(slot.slotId)}
                        className="px-3 py-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-all text-sm"
                      >
                        削除
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function SettingsScreen() {
  const setScreen = useGameStore((state) => state.setScreen);
  const { resetGame } = useGameStore();
  const {
    bgmVolume, seVolume, bgmMuted, seMuted,
    setBGMVolume, setSEVolume, toggleBGMMute, toggleSEMute,
  } = useAudioStore();

  const handleResetGame = () => {
    if (window.confirm('ゲームをリセットしますか？\nすべてのデータが失われます。')) {
      resetGame();
      setScreen('title');
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-fairy-pink-50 to-fairy-lavender-100">
      {/* ヘッダー */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-fairy-pink-100 p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <button
            onClick={() => setScreen('home')}
            className="px-4 py-2 bg-white/60 rounded-xl hover:bg-white/90 transition-all text-gray-600"
          >
            ← 戻る
          </button>
          <h1 className="text-xl font-bold text-gray-800">⚙️ 設定</h1>
          <div className="w-20" />
        </div>
      </div>

      {/* 設定項目 */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-md mx-auto space-y-6">
          {/* サウンド設定 */}
          <div className="bg-white/90 rounded-2xl shadow-card p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">🔊 サウンド設定</h2>

            {/* BGM */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">BGM音量</span>
                <button
                  onClick={toggleBGMMute}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    bgmMuted ? 'bg-gray-200 text-gray-500' : 'bg-fairy-pink-100 text-fairy-pink-600'
                  }`}
                >
                  {bgmMuted ? 'OFF' : 'ON'}
                </button>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={bgmVolume * 100}
                onChange={(e) => setBGMVolume(Number(e.target.value) / 100)}
                disabled={bgmMuted}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-fairy-pink-500 disabled:opacity-50"
              />
              <div className="text-right text-xs text-gray-500 mt-1">{Math.round(bgmVolume * 100)}%</div>
            </div>

            {/* SE */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">SE音量</span>
                <button
                  onClick={toggleSEMute}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    seMuted ? 'bg-gray-200 text-gray-500' : 'bg-fairy-pink-100 text-fairy-pink-600'
                  }`}
                >
                  {seMuted ? 'OFF' : 'ON'}
                </button>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={seVolume * 100}
                onChange={(e) => setSEVolume(Number(e.target.value) / 100)}
                disabled={seMuted}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-fairy-pink-500 disabled:opacity-50"
              />
              <div className="text-right text-xs text-gray-500 mt-1">{Math.round(seVolume * 100)}%</div>
            </div>
          </div>

          {/* データ管理 */}
          <div className="bg-white/90 rounded-2xl shadow-card p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">📁 データ管理</h2>
            <button
              onClick={handleResetGame}
              className="w-full px-4 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-all"
            >
              ゲームデータをリセット
            </button>
          </div>

          {/* クレジット */}
          <div className="bg-white/90 rounded-2xl shadow-card p-6 text-center">
            <h2 className="text-lg font-bold text-gray-800 mb-2">妖精カフェ物語</h2>
            <p className="text-sm text-gray-500">Fairy Cafe Story</p>
            <p className="text-xs text-gray-400 mt-2">Version 0.1.0</p>
          </div>
        </div>
      </div>
    </div>
  );
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
