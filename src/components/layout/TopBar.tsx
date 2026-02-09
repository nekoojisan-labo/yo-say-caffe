import { useGameStore } from '@/store';

export function TopBar() {
    const { money, shopRank, setScreen } = useGameStore();

    // ランク表示用
    const rankStars = '⭐'.repeat(Math.min(shopRank, 5));

    return (
        <header className="relative z-30 p-4">
            <div className="flex items-center justify-between gap-4 max-w-[1400px] mx-auto">
                {/* 左側：お店情報 */}
                <div className="flex items-center gap-4">
                    {/* お店のランク */}
                    <div className="bg-gradient-to-r from-purple-600/90 to-purple-500/90 px-5 py-2 rounded-xl border-b-4 border-purple-900 shadow-lg">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold tracking-wider opacity-80 leading-none">SHOP RANK</span>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xl font-black leading-none">{shopRank}</span>
                                <span className="text-sm">{rankStars}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 中央：タイトル */}
                <div className="absolute left-1/2 -translate-x-1/2">
                    <h1 
                        className="text-2xl font-black italic tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => setScreen('home')}
                    >
                        妖精カフェ物語
                    </h1>
                </div>

                {/* 右側：所持金 & 設定 */}
                <div className="flex items-center gap-4">
                    {/* 所持金 */}
                    <div className="flex items-center gap-3 bg-black/30 backdrop-blur-md px-5 py-2 rounded-full border border-yellow-400/30 shadow-xl">
                        <div className="bg-yellow-500 rounded-full w-7 h-7 flex items-center justify-center shadow-[0_0_10px_rgba(234,179,8,0.5)]">
                            <span className="text-xs font-black">G</span>
                        </div>
                        <span className="font-black text-xl text-yellow-100">{money.toLocaleString()}</span>
                    </div>

                    {/* 設定ボタン */}
                    <button 
                        onClick={() => setScreen('settings')}
                        className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
                    >
                        <span className="text-xl">⚙️</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
