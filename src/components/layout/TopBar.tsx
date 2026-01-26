import { useGameStore } from '@/store';

export function TopBar() {
    const { money, shopRank } = useGameStore();

    return (
        <header className="relative z-30 p-4">
            <div className="flex items-start justify-between gap-4 max-w-[1400px] mx-auto">
                {/* Level / Action Pts */}
                <div className="flex gap-1">
                    <div className="bg-blue-600/90 social-top-bar-clip px-6 py-2 border-b-4 border-blue-900 shadow-lg">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black italic tracking-tighter opacity-80 leading-none">OWNER LEVEL</span>
                            <span className="text-2xl font-black italic -mt-1 leading-none">{shopRank} <span className="text-xs">RANK</span></span>
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-500/80 to-blue-400/80 px-8 py-2 relative flex flex-col justify-center min-w-[200px] border-b-4 border-blue-800 shadow-lg social-currency-clip -ml-4">
                        <span className="text-xs font-bold leading-none mb-1">行動力</span>
                        <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden border border-white/20">
                            <div className="h-full bg-gradient-to-r from-orange-400 to-yellow-300 w-full shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                        </div>
                        <span className="absolute right-4 bottom-1 text-xs font-black italic">10 / 10</span>
                    </div>
                </div>

                {/* Currencies */}
                <div className="flex items-center gap-4 bg-black/30 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 shadow-xl">
                    <div className="flex items-center gap-3">
                        <div className="bg-yellow-500 rounded-full w-6 h-6 flex items-center justify-center shadow-[0_0_10px_rgba(234,179,8,0.5)]">
                            <span className="text-[10px] font-bold">G</span>
                        </div>
                        <span className="font-black italic text-lg">{money.toLocaleString()}</span>
                    </div>
                    <div className="w-px h-6 bg-white/20" />
                    <div className="flex items-center gap-2">
                        <span className="text-xl">❤️</span>
                        <span className="font-black italic text-lg">4,400</span>
                    </div>
                    <button className="bg-yellow-500 text-black w-6 h-6 rounded-md flex items-center justify-center font-black hover:scale-110 transition-transform">+</button>
                </div>

                {/* Icons (Top Right) */}
                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center group cursor-pointer">
                        <div className="w-12 h-12 bg-cyan-500/20 backdrop-blur-sm rounded-xl border border-cyan-400/50 flex items-center justify-center group-hover:bg-cyan-500/30 transition-all">
                            <span className="text-cyan-400 text-2xl">👥</span>
                        </div>
                        <span className="text-[10px] font-bold mt-1 text-cyan-400">キャラチェンジ</span>
                    </div>
                    <div className="flex flex-col items-center group cursor-pointer">
                        <div className="w-12 h-12 bg-cyan-500/20 backdrop-blur-sm rounded-xl border border-cyan-400/50 flex items-center justify-center group-hover:bg-cyan-500/30 transition-all">
                            <span className="text-cyan-400 text-sm font-bold">OFF</span>
                        </div>
                        <span className="text-[10px] font-bold mt-1 text-cyan-400 tracking-tighter">ウィンドウ</span>
                    </div>
                    <div className="flex flex-col items-center group cursor-pointer relative">
                        <div className="w-14 h-14 bg-red-600/90 rounded-xl border border-red-400 flex items-center justify-center shadow-lg group-hover:scale-105 transition-all">
                            <span className="text-white text-3xl">📰</span>
                        </div>
                        <div className="absolute -top-2 -right-2 bg-white text-red-600 text-[10px] font-black px-1.5 py-0.5 rounded-md shadow-md border border-red-200">744</div>
                        <span className="text-[10px] font-bold mt-1 text-white">お知らせ</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
