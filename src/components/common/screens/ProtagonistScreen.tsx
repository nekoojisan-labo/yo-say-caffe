import { useGameStore, useProtagonistStore } from '@/store';
import { GameLayout } from '../../layout/GameLayout';
import { resolveProtagonistVisual } from '@/utils/visualSystem';

export function ProtagonistScreen() {
    const { glamor, protagonistVisual, shopRank, updateGlamor, updateProtagonistVisual } = useGameStore();
    const { protagonist } = useProtagonistStore();
    const { name, stats } = protagonist;

    // テスト用のレベル手動切り替え
    const handleTestLevel = (lv: number) => {
        const nextVisual = resolveProtagonistVisual(lv);
        updateGlamor({ level: lv, points: lv * 100 });
        updateProtagonistVisual(nextVisual);
    };

    return (
        <GameLayout showCharacter={true}>
            <div className="w-full max-w-6xl h-full flex flex-col md:flex-row items-center justify-center p-6 gap-12 animate-fade-in relative z-20">
                {/* 左側: キャラクター表示エリア（GameLayoutが背面で担当しているが、ここでは詳細調整用） */}
                <div className="flex-1 h-full hidden md:flex items-end justify-center pointer-events-none">
                    {/* ここには特に何も配置せず、GameLayoutのキャラクターを見せる */}
                </div>

                {/* 右側: ステータス詳細 */}
                <div className="w-full md:w-[500px] flex flex-col gap-6">
                    <div className="bg-black/60 backdrop-blur-xl border-2 border-purple-500/30 rounded-[40px] p-8 social-glow shadow-2xl space-y-8">
                        <div className="border-b border-white/10 pb-6 flex justify-between items-end">
                            <div>
                                <h3 className="text-[10px] font-black tracking-[0.5em] text-purple-400 uppercase mb-1">Owner Identity</h3>
                                <h2 className="text-4xl font-black text-white italic tracking-tighter drop-shadow-md">{name}</h2>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] font-black text-gray-400">SHOP RANK</span>
                                <span className="text-3xl font-black italic text-pink-400">L{shopRank}</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <StatusItem label="Glamour Level" current={glamor.level} max={6} color="from-purple-500 to-pink-500" />
                            <StatusItem label="Stability" current={glamor.stability} max={100} color="from-cyan-500 to-blue-500" />
                        </div>

                        <div className="grid grid-cols-3 gap-4 pb-4">
                            <StatBox label="魅力" value={stats.charm} icon="🌹" color="text-pink-400" />
                            <StatBox label="話術" value={stats.talk} icon="🗣️" color="text-cyan-400" />
                            <StatBox label="センス" value={stats.sense} icon="✨" color="text-yellow-400" />
                        </div>

                        {/* デバッグ用レベル切り替え */}
                        <div className="pt-6 border-t border-white/10">
                            <p className="text-[8px] font-black text-gray-500 text-center uppercase tracking-widest mb-3">Debug Appearance</p>
                            <div className="flex gap-1.5 justify-center">
                                {[0, 1, 2, 3, 4, 5, 6].map(lv => (
                                    <button
                                        key={lv}
                                        onClick={() => handleTestLevel(lv)}
                                        className={`w-9 h-9 rounded-xl font-black text-[10px] flex items-center justify-center transition-all border ${glamor.level === lv ? 'bg-purple-600 border-purple-400 text-white shadow-lg scale-110' : 'bg-black/40 border-white/10 text-gray-500 hover:bg-white/5'}`}
                                    >
                                        L{lv}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GameLayout>
    );
}

function StatusItem({ label, current, max, color }: { label: string, current: number, max: number, color: string }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
                <span className="text-sm font-black italic">{current} / {max}</span>
            </div>
            <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-white/5 shadow-inner">
                <div
                    className={`h-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(168,85,247,0.4)]`}
                    style={{ width: `${(current / max) * 100}%` }}
                />
            </div>
        </div>
    );
}

function StatBox({ label, value, icon, color }: { label: string, value: number, icon: string, color: string }) {
    return (
        <div className="bg-white/5 p-4 rounded-3xl border border-white/10 flex flex-col items-center group hover:bg-white/10 transition-all cursor-default">
            <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">{icon}</span>
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-tighter mb-1">{label}</span>
            <span className={`text-xl font-black italic ${color}`}>{value}</span>
        </div>
    );
}
