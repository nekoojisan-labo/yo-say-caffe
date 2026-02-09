import { useGameStore } from '@/store';
import { GameLayout } from '../../layout/GameLayout';
import { DayResult } from '@/types';

export function ManagementScreen() {
    const gameStore = useGameStore();
    const { history, shopRank } = gameStore;
    const { dailyResults } = history;

    const recentResults = dailyResults.slice(-7);

    return (
        <GameLayout showCharacter={false}>
            <div className="w-full max-w-6xl h-full flex flex-col p-6 animate-fade-in overflow-hidden relative z-20">
                <div className="mb-8 text-center">
                    <h2 className="text-4xl font-black italic tracking-tighter text-white drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                        MANAGEMENT HUB
                    </h2>
                    <p className="text-cyan-400 font-bold text-sm uppercase tracking-widest mt-1">経営管理</p>
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar pb-12 space-y-6">
                    {/* 主要メトリクス */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <MetricBox label="Sales Average" value="12,400 G" icon="📊" color="text-pink-400" />
                        <MetricBox label="Shop Rank" value={shopRank} icon="🏆" color="text-yellow-400" isRank />
                        <MetricBox label="Active Fairies" value="3" icon="✨" color="text-cyan-400" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* 売上推移チャート */}
                        <div className="lg:col-span-2 bg-black/40 backdrop-blur-md rounded-[40px] p-8 border border-white/10 social-glow h-[400px] flex flex-col">
                            <h3 className="font-black italic text-lg text-white mb-6 flex items-center gap-2">
                                <span className="text-pink-500">■</span> REVENUE TREND <span className="text-[10px] text-gray-500 uppercase ml-2">Last 7 Days</span>
                            </h3>

                            <div className="flex-1 flex items-end justify-between gap-4 px-4 pt-10">
                                {recentResults.length > 0 ? (
                                    recentResults.map((res: DayResult, i: number) => (
                                        <ChartBar key={i} value={res.sales} maxValue={Math.max(...recentResults.map(r => r.sales), 10000)} day={res.day} />
                                    ))
                                ) : (
                                    Array.from({ length: 7 }).map((_, i) => (
                                        <ChartBar key={i} value={0} maxValue={1} day={0} placeholder />
                                    ))
                                )}
                            </div>
                        </div>

                        {/* アドバイザー */}
                        <div className="bg-gradient-to-br from-purple-900/40 to-black/40 backdrop-blur-md rounded-[40px] p-8 border border-white/10 social-glow flex flex-col">
                            <h3 className="font-black italic text-lg text-white mb-6">ADVISORY</h3>
                            <div className="space-y-4 flex-1">
                                <AdviceNote type="info" text="新規メニューの開発が店舗ランク向上の鍵となります。開発メニューを確認しましょう。" />
                                <AdviceNote type="warning" text="妖精たちの好感度が停滞しています。営業中のイベント選択に注意してください。" />
                                {shopRank === 'F' && <AdviceNote type="success" text="まずはRank Eを目指して営業を積み重ねましょう！" />}
                            </div>
                            <div className="mt-6 pt-4 border-t border-white/5 opacity-50 text-center">
                                <span className="text-[8px] font-black tracking-[0.4em] uppercase">System Optimized</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GameLayout>
    );
}

function MetricBox({ label, value, icon, color, isRank = false }: { label: string, value: string, icon: string, color: string, isRank?: boolean }) {
    return (
        <div className="bg-black/60 backdrop-blur-md rounded-[32px] p-6 border border-white/10 flex flex-col items-center justify-center social-glow-pink group hover:bg-white/5 transition-all">
            <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">{icon}</span>
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{label}</span>
            <span className={`text-3xl font-black italic ${color} ${isRank ? 'text-4xl' : ''}`}>{value}</span>
        </div>
    );
}

function ChartBar({ value, maxValue, day, placeholder = false }: { value: number, maxValue: number, day: number, placeholder?: boolean }) {
    const height = placeholder ? 10 : Math.max(5, (value / maxValue) * 100);
    return (
        <div className="flex-1 flex flex-col items-center gap-3 group h-full">
            <div className="flex-1 w-full relative flex flex-col justify-end">
                <div
                    className={`w-full rounded-2xl transition-all duration-1000 ease-out relative group-hover:brightness-125 ${placeholder ? 'bg-white/5' : 'bg-gradient-to-t from-pink-600 to-purple-400 social-glow-pink'}`}
                    style={{ height: `${height}%` }}
                >
                    {!placeholder && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
                            {value.toLocaleString()} G
                        </div>
                    )}
                </div>
            </div>
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">{placeholder ? '--' : `Day ${day}`}</span>
        </div>
    );
}

function AdviceNote({ type, text }: { type: 'success' | 'warning' | 'info', text: string }) {
    const colors = {
        success: 'border-pink-500/50 bg-pink-500/5 text-pink-200',
        warning: 'border-yellow-500/50 bg-yellow-500/5 text-yellow-200',
        info: 'border-cyan-500/50 bg-cyan-500/5 text-cyan-200'
    };
    return (
        <div className={`p-4 rounded-2xl border ${colors[type]} text-[11px] font-bold leading-relaxed`}>
            {text}
        </div>
    );
}
