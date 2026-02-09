import { useGameStore, useInventoryStore } from '@/store';
import { ASSETS } from '@/utils/assets';

export function HomeScreen() {
  const { day, money, reputation, shopRank, glamor, setScreen } = useGameStore();
  const { inventory } = useInventoryStore();

  const totalStock = Object.values(inventory).reduce((sum, item) => sum + item.stock, 0);
  const dayNames = ['月', '火', '水', '木', '金', '土', '日'];
  const dayOfWeek = dayNames[(day - 1) % 7];

  // 幻装レベルに応じた主人公画像
  const mcImage = ASSETS.mainChara[`lv${glamor.level}`] || ASSETS.mainChara.default;

  return (
    <div className="w-full h-full flex flex-col bg-[#0d0517] text-white overflow-hidden relative">
      {/* 背景グラデーション */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-900/30 via-transparent to-[#0d0517]" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      {/* ヘッダー */}
      <header className="relative z-20 p-4 bg-black/40 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
              妖精カフェ物語
            </h1>
            <p className="text-xs text-gray-400">恋愛×経営シミュレーション</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-gray-400">所持金</p>
              <p className="text-xl font-bold text-yellow-400">{money.toLocaleString()} G</p>
            </div>
            <button
              onClick={() => setScreen('settings')}
              className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              ⚙️
            </button>
          </div>
        </div>
      </header>

      {/* メインエリア */}
      <main className="relative z-10 flex-1 flex overflow-hidden">
        {/* 左側：ステータス＆メニュー */}
        <div className="w-full md:w-1/2 lg:w-2/5 p-4 flex flex-col justify-between overflow-y-auto">
          {/* ステータスカード */}
          <div className="space-y-3 mb-6">
            <div className="grid grid-cols-2 gap-3">
              <StatusCard icon="📅" label="日付" value={`${day}日目`} sub={`${dayOfWeek}曜日`} />
              <StatusCard icon="⭐" label="ランク" value={shopRank} sub={`評判 ${reputation}`} />
              <StatusCard icon="✨" label="幻装" value={`Lv.${glamor.level}`} sub={`安定度 ${glamor.stability}%`} />
              <StatusCard icon="📦" label="在庫" value={`${totalStock}個`} color="text-cyan-400" />
            </div>
          </div>

          {/* メインボタン */}
          <div className="flex flex-col items-center gap-4 mb-6">
            <button
              onClick={() => setScreen('cafe')}
              className="group relative w-full max-w-xs"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
              <div className="relative bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 px-8 py-5 rounded-2xl font-black text-xl shadow-2xl transition-all hover:scale-105 flex items-center justify-center gap-3">
                <span className="text-2xl">☕</span>
                <span>営業開始</span>
              </div>
            </button>
            <p className="text-gray-400 text-sm text-center">
              仕入れをして、カフェを営業しよう！
            </p>
          </div>

          {/* クイックメニュー */}
          <div className="grid grid-cols-3 gap-2">
            <QuickButton icon="📝" label="開発" onClick={() => setScreen('menu-dev')} />
            <QuickButton icon="🏠" label="内装" onClick={() => setScreen('interior')} />
            <QuickButton icon="📖" label="図鑑" onClick={() => setScreen('ikemen-list')} />
            <QuickButton icon="👤" label="主人公" onClick={() => setScreen('protagonist')} />
            <QuickButton icon="💾" label="セーブ" onClick={() => setScreen('save')} />
            <QuickButton icon="📊" label="経営" onClick={() => setScreen('management')} />
          </div>
        </div>

        {/* 右側：主人公キャラクター */}
        <div className="hidden md:flex md:w-1/2 lg:w-3/5 items-end justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#0d0517]/80 z-10 pointer-events-none" />
          <img
            src={mcImage}
            alt="主人公"
            className="h-[90%] object-contain object-bottom drop-shadow-2xl"
            style={{ filter: 'drop-shadow(0 0 30px rgba(168, 85, 247, 0.3))' }}
          />
        </div>
      </main>

      {/* フッター */}
      <footer className="relative z-20 p-3 border-t border-white/10 bg-black/40 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm text-gray-400">
            💡 イケメン妖精たちと仲良くなって、カフェを繁盛させよう！
          </p>
        </div>
      </footer>
    </div>
  );
}

function StatusCard({
  icon,
  label,
  value,
  sub,
  color = 'text-white',
}: {
  icon: string;
  label: string;
  value: string;
  sub?: string;
  color?: string;
}) {
  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-xl p-3 border border-white/10">
      <div className="flex items-center gap-2 mb-1">
        <span>{icon}</span>
        <span className="text-xs text-gray-400">{label}</span>
      </div>
      <p className={`text-lg font-bold ${color}`}>{value}</p>
      {sub && <p className="text-xs text-gray-500">{sub}</p>}
    </div>
  );
}

function QuickButton({
  icon,
  label,
  onClick,
}: {
  icon: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-black/40 hover:bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 hover:border-white/20 transition-all flex flex-col items-center gap-1 group"
    >
      <span className="text-xl group-hover:scale-110 transition-transform">{icon}</span>
      <span className="text-xs text-gray-400 group-hover:text-white transition-colors">{label}</span>
    </button>
  );
}
