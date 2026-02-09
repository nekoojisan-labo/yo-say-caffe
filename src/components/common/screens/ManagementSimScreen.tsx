import { useState } from 'react';
import { useGameStore } from '@/store';
import { GameLayout } from '../../layout/GameLayout';
import { ManagementDecision, WeeklyResult } from '@/types';

export function ManagementSimScreen() {
    const { management, runManagementTurn } = useGameStore();
    const { capital, popularity, staffSkill, currentTrend, weeklyHistory } = management;

    // 現在の週（履歴の数 + 1）
    const currentWeek = weeklyHistory.length + 1;
    const lastResult: WeeklyResult | undefined = weeklyHistory[weeklyHistory.length - 1];

    // 意思決定の状態
    const [decision, setDecision] = useState<ManagementDecision>({
        menuDev: 'STANDARD',
        procurement: 1.0,
        shifts: 2,
        investment: 50000,
    });

    const handleExecute = () => {
        if (capital < decision.investment + (decision.shifts * 50000)) {
            alert('資金が不足しています！投資額またはシフト数を調整してください。');
            return;
        }
        runManagementTurn(decision);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <GameLayout showCharacter={false}>
            <div className="w-full max-w-6xl h-full flex flex-col p-6 animate-fade-in overflow-hidden relative z-20">
                <div className="mb-8 flex justify-between items-end">
                    <div>
                        <h2 className="text-4xl font-black italic tracking-tighter text-white drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]">
                            WEEK {currentWeek} STRATEGY
                        </h2>
                        <p className="text-yellow-400 font-bold text-sm uppercase tracking-widest mt-1 italic">経営戦略会議</p>
                    </div>
                    <div className="bg-black/60 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/10 flex flex-col items-end social-glow">
                        <span className="text-[10px] font-black text-gray-500 uppercase">Available Capital</span>
                        <span className="text-2xl font-black italic text-green-400">{capital.toLocaleString()} <span className="text-sm">YEN</span></span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar pb-24 space-y-8">
                    {/* 1. 前回報告 (週報) */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-black/40 backdrop-blur-md rounded-[40px] p-8 border border-white/10 social-glow">
                                <h3 className="font-black italic text-lg text-white mb-6 flex items-center gap-2">
                                    <span className="text-yellow-500">■</span> WEEKLY P/L REPORT
                                    {lastResult && <span className="text-xs text-gray-500 ml-2">Week {lastResult.week} Results</span>}
                                </h3>

                                {lastResult ? (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <ReportItem label="売上高 (Sales)" value={lastResult.sales} unit="YEN" color="text-white" />
                                            <ReportItem label="営業利益 (Profit)" value={lastResult.profit} unit="YEN" color={lastResult.profit >= 0 ? "text-green-400" : "text-red-400"} />
                                        </div>
                                        <div className="h-[1px] bg-white/5 w-full my-4" />
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <ReportItem label="材料費 (COGS)" value={lastResult.cogs} unit="YEN" small />
                                            <ReportItem label="人件費 (Labor)" value={lastResult.labor} unit="YEN" small />
                                            <ReportItem label="家賃/固定費" value={lastResult.rent} unit="YEN" small />
                                            <ReportItem label="廃棄ロス (Loss)" value={lastResult.loss} unit="YEN" small color="text-red-300" />
                                        </div>

                                        <div className="mt-8 bg-white/5 rounded-3xl p-6 border border-white/5">
                                            <h4 className="text-[10px] font-black text-gray-500 uppercase mb-3">Feedback & Topics</h4>
                                            <ul className="space-y-2">
                                                {lastResult.topics.map((topic, i) => (
                                                    <li key={i} className="text-xs font-bold text-gray-300 leading-relaxed flex gap-2">
                                                        <span className="text-yellow-500">›</span> {topic}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-3xl bg-black/20">
                                        <span className="text-4xl mb-4 opacity-20">📊</span>
                                        <p className="text-gray-500 font-bold italic tracking-widest text-sm text-center">NO HISTORICAL DATA<br /><span className="text-[10px]">Execute your first week to see the report</span></p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 外部環境 */}
                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-blue-900/40 to-black/40 backdrop-blur-md rounded-[40px] p-8 border border-white/10 social-glow h-full">
                                <h3 className="font-black italic text-lg text-white mb-6">EXTERNAL ENV.</h3>
                                <div className="space-y-6">
                                    <EnvItem icon="☁️" label="Weather" value={lastResult?.externalFactors.weather || '予測中...'} />
                                    <EnvItem icon="🔥" label="Market Trend" value={currentTrend} />
                                    <EnvItem icon="📍" label="Neighborhood" value={lastResult?.externalFactors.neighborhood || '調査中...'} />

                                    <div className="pt-6 border-t border-white/5 space-y-4">
                                        <StatusCircle label="认知度" value={popularity} color="border-pink-500 text-pink-400" />
                                        <StatusCircle label="スタッフ習熟度" value={staffSkill} color="border-cyan-500 text-cyan-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. 意思決定セクション */}
                    <div className="bg-black/60 backdrop-blur-xl border-2 border-yellow-500/20 rounded-[50px] p-10 social-glow-pink">
                        <h3 className="text-2xl font-black italic tracking-tighter text-white mb-8 border-b border-white/10 pb-4">
                            MANAGEMENT DECISIONS <span className="text-sm font-bold text-yellow-500 ml-4 italic underline decoration-yellow-500/50 underline-offset-4">今週の実行計画</span>
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {/* メニュー開発 */}
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block px-2">Menu Development Policy</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['STANDARD', 'SNS映えスイーツ', '浅煎りスペシャリティ', '健康志向'].map(m => (
                                        <button
                                            key={m}
                                            onClick={() => setDecision({ ...decision, menuDev: m })}
                                            className={`py-3 px-4 rounded-2xl text-[10px] font-black italic border transition-all ${decision.menuDev === m ? 'bg-yellow-500 border-yellow-400 text-black shadow-lg shadow-yellow-500/20 scale-105' : 'bg-black/40 border-white/10 text-gray-500'}`}
                                        >
                                            {m}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* 仕入れ量 */}
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block px-2">Procurement Quantity: <span className="text-white italic">{decision.procurement.toFixed(1)}x</span></label>
                                <input
                                    type="range" min="0.5" max="2.0" step="0.1"
                                    value={decision.procurement}
                                    onChange={(e) => setDecision({ ...decision, procurement: parseFloat(e.target.value) })}
                                    className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                                />
                                <div className="flex justify-between text-[8px] font-black text-gray-600 px-1">
                                    <span>LIMITED</span>
                                    <span>BALANCED</span>
                                    <span>EXCESSIVE</span>
                                </div>
                            </div>

                            {/* 人員配置 */}
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block px-2">Staffing (Shifts): <span className="text-white italic">{decision.shifts} Person-Weeks</span></label>
                                <div className="flex items-center gap-4">
                                    {[1, 2, 3, 4, 5].map(v => (
                                        <button
                                            key={v}
                                            onClick={() => setDecision({ ...decision, shifts: v })}
                                            className={`flex-1 h-12 rounded-2xl font-black italic transition-all border ${decision.shifts === v ? 'bg-cyan-500 border-cyan-400 text-white shadow-lg shadow-cyan-500/20 scale-110' : 'bg-black/40 border-white/10 text-gray-500'}`}
                                        >
                                            {v}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* 広告投資 */}
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block px-2">Investment & Ads: <span className="text-white italic">{decision.investment.toLocaleString()} YEN</span></label>
                                <div className="grid grid-cols-3 gap-2">
                                    {[0, 100000, 300000].map(v => (
                                        <button
                                            key={v}
                                            onClick={() => setDecision({ ...decision, investment: v })}
                                            className={`py-3 rounded-2xl text-[10px] font-black italic border transition-all ${decision.investment === v ? 'bg-green-600 border-green-500 text-white shadow-lg' : 'bg-black/40 border-white/10 text-gray-500'}`}
                                        >
                                            {v === 0 ? 'NONE' : `${(v / 10000).toLocaleString()}万円`}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 flex flex-col items-center gap-4">
                            <button
                                onClick={handleExecute}
                                className="group relative px-24 py-6 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-[30px] font-black text-2xl italic tracking-tighter shadow-2xl hover:scale-105 active:scale-95 transition-all text-white border-b-4 border-orange-800 social-glow"
                            >
                                EXECUTE STRATEGY &raquo;
                            </button>
                            <p className="text-[10px] text-gray-500 font-bold italic">※実行すると1週間が経過し、収支が確定します。</p>
                        </div>
                    </div>
                </div>
            </div>
        </GameLayout>
    );
}

function ReportItem({ label, value, unit, color = "text-gray-300", small = false }: { label: string, value: number, unit: string, color?: string, small?: boolean }) {
    return (
        <div className="space-y-1">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-tighter block">{label}</span>
            <span className={`${small ? 'text-lg' : 'text-3xl'} font-black italic ${color}`}>
                {value >= 0 ? '' : '-'}{Math.abs(value).toLocaleString()} <span className="text-[10px] ml-1">{unit}</span>
            </span>
        </div>
    );
}

function EnvItem({ icon, label, value }: { icon: string, label: string, value: string }) {
    return (
        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/5">
            <span className="text-2xl">{icon}</span>
            <div className="flex flex-col">
                <span className="text-[8px] font-black text-gray-500 uppercase">{label}</span>
                <span className="text-sm font-black text-white italic">{value}</span>
            </div>
        </div>
    );
}

function StatusCircle({ label, value, color }: { label: string, value: number, color: string }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest px-1">
                <span className="text-gray-500">{label}</span>
                <span className={color.split(' ')[1]}>{value}%</span>
            </div>
            <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
                <div
                    className={`h-full border-r-2 ${color} transition-all duration-1000`}
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
}
