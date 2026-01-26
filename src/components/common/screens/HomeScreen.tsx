import { useGameStore } from '@/store';
import { GameLayout } from '../../layout/GameLayout';

export function HomeScreen() {
    const { setScreen } = useGameStore();

    return (
        <GameLayout showCharacter={true}>
            {/* サイドコンテンツ (Banners/Events) - ホーム画面固有 */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 space-y-4">
                <div className="relative group cursor-pointer social-glow-pink">
                    <div className="w-64 h-24 bg-gradient-to-r from-purple-700 to-pink-500 rounded-lg p-3 border-2 border-white/30 shadow-2xl relative overflow-hidden group-hover:scale-105 transition-all">
                        <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors" />
                        <div className="relative z-10 flex flex-col justify-center h-full">
                            <span className="text-xs font-black italic tracking-widest text-pink-200">CAMPAIGN</span>
                            <h3 className="text-xl font-black italic tracking-tighter text-white">LINEスタンプ登場！</h3>
                        </div>
                        <div className="absolute top-2 right-2 flex gap-1">
                            {[1, 2, 3].map(i => <div key={i} className="w-2 h-2 bg-white/40 rounded-full" />)}
                        </div>
                    </div>
                </div>

                <div className="relative group cursor-pointer overflow-hidden rounded-lg border-2 border-cyan-400/50 social-glow">
                    <div className="w-64 h-20 bg-[#0d0517] p-2 flex items-center gap-3">
                        <div className="w-14 h-14 bg-gray-800 rounded-md overflow-hidden animate-pulse" />
                        <div>
                            <span className="text-[10px] font-black text-cyan-400 italic">NEWS</span>
                            <p className="text-xs font-bold leading-none">新メニュー「魅惑のベリーティー」追加！</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute right-6 top-[20%] z-20 flex flex-col gap-4">
                <div className="w-16 h-16 bg-black/40 backdrop-blur-md rounded-full border border-pink-400/50 flex flex-col items-center justify-center cursor-pointer hover:bg-pink-500/20 transition-all social-btn-hover">
                    <span className="text-2xl">🎁</span>
                    <span className="text-[8px] font-bold">10</span>
                </div>
            </div>

            {/* ホーム中央のボタン (営業開始) */}
            <div className="flex flex-col items-center justify-center gap-8 mb-20">
                <div className="relative group overflow-hidden rounded-full p-[2px]">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 animate-spin-slow opacity-75 group-hover:opacity-100 transition-opacity" />
                    <button
                        onClick={() => setScreen('cafe')}
                        className="relative bg-[#0d0517] rounded-full px-12 py-5 font-black text-2xl italic tracking-tighter flex items-center gap-4 hover:bg-transparent transition-colors"
                    >
                        <span className="animate-pulse">☕</span>
                        <span>CAFE OPEN <span className="text-cyan-400">&rarr;</span></span>
                    </button>
                </div>

                <div className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 text-center animate-slide-up">
                    <p className="text-pink-300 font-bold text-sm">Now Event: <span className="text-white">妖精たちのティーパーティー</span></p>
                </div>
            </div>
        </GameLayout>
    );
}
