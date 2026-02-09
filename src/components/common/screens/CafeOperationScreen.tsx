import { useState } from 'react';
import { useGameStore } from '@/store';
import { ASSETS } from '@/utils/assets';
import { GameLayout } from '../../layout/GameLayout';
import { runDaySimulation, CafePolicy } from '@/utils/simulation';
import { getDailyEvent } from '@/utils/eventEngine';
import { useNotification } from '@/components/common';
import { EventPayload } from '@/types';

export function CafeOperationScreen() {
    const gameStore = useGameStore();
    const notification = useNotification();
    const {
        day,
        reputation,
        shopRank,
        dayPhase,
        history,
        setDayPhase,
        setScreen,
        advanceDay,
        updateHistory,
        updateReputation,
        addMoney,
        romanceTickets,
        useRomanceTicket,
        addRomanceTicket
    } = gameStore;

    const { id: focusId, heat } = gameStore.romanceFocus;

    const [currentEvent, setCurrentEvent] = useState<EventPayload | null>(null);
    const [selectedPolicy, setSelectedPolicy] = useState<CafePolicy>('STANDARD');

    const executeSimulation = () => {
        const result = runDaySimulation(gameStore, selectedPolicy);
        updateHistory(result);
        addMoney(result.profit);
        updateReputation(result.reputationDelta);

        // --- Ticket Reward Logic (体験優先/高品質仕入れ) ---
        if (selectedPolicy === 'QUALITY_PROCUREMENT' && Math.random() < 0.4) {
            if (focusId) {
                addRomanceTicket(focusId);
                notification.info(`営業の成果で ${focusId.toUpperCase()} のデート券を獲得しました！`);
            }
        }

        setDayPhase('RESULT');
    };

    const handleUseTicket = (charId: any) => {
        useRomanceTicket(charId);
        notification.success(`${charId.toUpperCase()} を特別に招待しました！`);
        const event = getDailyEvent(gameStore, charId);
        if (event) {
            setCurrentEvent(event);
            setDayPhase('EVENT');
        } else {
            executeSimulation();
        }
    };

    const handleToDone = () => {
        setDayPhase('DONE');
    };

    const handleFinish = () => {
        advanceDay();
        setDayPhase('PREP');
        setScreen('home');
    };

    const lastResult = history.lastDaySummary;

    return (
        <GameLayout showCharacter={dayPhase !== 'EVENT'}>
            <div className="w-full max-w-4xl h-full flex flex-col justify-center animate-fade-in relative z-20 overflow-y-auto no-scrollbar py-12">
                {dayPhase === 'PREP' && (
                    <div className="flex flex-col items-center gap-8">
                        <div className="text-center">
                            <h2 className="text-4xl font-black italic tracking-tighter text-white drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                                DAY {day} OPERATION
                            </h2>
                            <p className="text-cyan-400 font-bold text-sm uppercase tracking-widest mt-1">開店準備</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
                            <div className="bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/10 social-glow-pink">
                                <h3 className="text-pink-400 font-black italic text-lg mb-4 text-center">SHOP STATUS</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                                        <span className="text-xs font-bold text-gray-400 uppercase">Rank</span>
                                        <span className="text-xl font-black italic text-white">{shopRank}</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                                        <span className="text-xs font-bold text-gray-400 uppercase">Reputation</span>
                                        <span className="text-xl font-black italic text-white">{reputation}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/10 social-glow h-full">
                                <h3 className="text-cyan-400 font-black italic text-lg mb-4 text-center">DAILY POLICY</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {[
                                        { id: 'STANDARD', label: '標準営業', icon: '☕' },
                                        { id: 'QUALITY_PROCUREMENT', label: '高級仕入れ', icon: '✨' },
                                        { id: 'ADVERTISING', label: '広告強化', icon: '📣' },
                                        { id: 'CLEANING', label: '清掃注力', icon: '🧹' }
                                    ].map(p => (
                                        <button
                                            key={p.id}
                                            onClick={() => {
                                                const policy = p.id as CafePolicy;
                                                setSelectedPolicy(policy);
                                                // 選択肢を選んだ瞬間、一日のイベントを発生させる
                                                const event = getDailyEvent(gameStore);
                                                if (event) {
                                                    setCurrentEvent(event);
                                                    setDayPhase('EVENT');
                                                } else {
                                                    // イベントがない場合は直接シミュレーションへ
                                                    // 注意: ここでは state 更新の非同期を考慮し、引数で渡すか runDaySimulation の設計を確認
                                                    const result = runDaySimulation(gameStore, policy);
                                                    updateHistory(result);
                                                    addMoney(result.profit);
                                                    updateReputation(result.reputationDelta);
                                                    setDayPhase('RESULT');
                                                }
                                            }}
                                            className="py-6 px-4 rounded-xl text-[12px] font-black italic border transition-all flex flex-col items-center gap-2 bg-black/40 border-white/10 text-gray-400 hover:border-cyan-400 hover:text-white social-glow hover:bg-cyan-500/20"
                                        >
                                            <span className="text-3xl">{p.icon}</span>
                                            <span>{p.label} を選んで開店</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Date Tickets Area */}
                        {Object.values(romanceTickets).some(v => v > 0) && (
                            <div className="w-full max-w-3xl bg-white/5 backdrop-blur-sm rounded-[30px] p-6 border border-white/5 animate-slide-up">
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 text-center">DATE TICKETS (確定遭遇券)</h4>
                                <div className="flex flex-wrap justify-center gap-3">
                                    {(Object.entries(romanceTickets) as [any, number][]).map(([cid, count]) => {
                                        if (count <= 0) return null;
                                        return (
                                            <button
                                                key={cid}
                                                onClick={() => handleUseTicket(cid)}
                                                className="bg-gradient-to-br from-pink-600 to-purple-700 hover:from-pink-500 hover:to-purple-600 text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-lg hover:scale-105 transition-all group"
                                            >
                                                <span className="text-xl">💌</span>
                                                <div className="flex flex-col items-start leading-none">
                                                    <span className="text-[10px] font-black uppercase opacity-60 mb-1">{cid}</span>
                                                    <span className="font-bold text-xs">呼ぶ ({count})</span>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Oshi Status (Heat) */}
                        {focusId && (
                            <div className="flex items-center gap-3 bg-black/40 px-6 py-2 rounded-full border border-pink-500/30">
                                <span className="text-pink-400 text-xs font-black italic">OSHI HEAT:</span>
                                <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-pink-500" style={{ width: `${heat}%` }} />
                                </div>
                                <span className="text-white text-[10px] font-bold italic">{focusId.toUpperCase()} 🔥 {heat}</span>
                            </div>
                        )}

                        <div className="flex flex-col items-center gap-4 w-full max-w-md">
                            <p className="text-[10px] text-gray-400 text-center font-bold italic tracking-widest animate-pulse">
                                今日の営業方針を選択してカフェをOPENしてください &raquo;
                            </p>
                        </div>
                    </div>
                )}

                {dayPhase === 'EVENT' && currentEvent && (
                    <div className="animate-slide-up space-y-6 w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
                        {/* キャラクター立ち絵 */}
                        {!currentEvent.isGameOver && currentEvent.portraitKey && (
                            <div className="w-full md:w-1/2 h-[500px] md:h-[750px] relative order-2 md:order-1 flex items-end justify-center">
                                <img
                                    src={ASSETS.characters[currentEvent.portraitKey]}
                                    alt="Character"
                                    className="h-full object-contain filter drop-shadow-[0_10px_40px_rgba(0,0,0,0.5)] animate-float"
                                />
                                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0d0517] via-transparent to-transparent opacity-60 pointer-events-none" />
                            </div>
                        )}

                        {/* イベントカード */}
                        <div className="flex-1 w-full order-1 md:order-2">
                            <div className={`p-8 rounded-[40px] backdrop-blur-xl border-2 ${currentEvent.isGameOver ? 'bg-red-950/80 border-red-500 shadow-red-500/20' : 'bg-black/60 border-purple-500/50 shadow-purple-500/20'} text-white shadow-2xl relative overflow-hidden`}>
                                <div className="text-center mb-8 relative z-10">
                                    <div className="flex items-center justify-center gap-2 mb-3">
                                        <span className={`px-4 py-1 ${currentEvent.isGameOver ? 'bg-red-600' : 'bg-purple-600'} text-[10px] rounded-full font-black uppercase tracking-widest shadow-lg`}>
                                            {currentEvent.isGameOver ? 'Game Over' : currentEvent.type}
                                        </span>
                                        {currentEvent.characterId && (
                                            <span className="bg-pink-600 px-4 py-1 text-[10px] rounded-full font-black uppercase tracking-widest shadow-lg">
                                                {currentEvent.characterId.toUpperCase()}
                                            </span>
                                        )}
                                    </div>
                                    <h2 className="text-3xl font-black italic tracking-tighter drop-shadow-md">{currentEvent.title}</h2>
                                </div>

                                <div className="bg-black/40 p-10 rounded-3xl mb-10 relative z-10 min-h-[160px] flex items-center border border-white/5 shadow-inner">
                                    <p className="text-2xl leading-relaxed text-white font-medium italic drop-shadow-sm">
                                        「{currentEvent.body}」
                                    </p>
                                </div>

                                {currentEvent.isGameOver ? (
                                    <button
                                        onClick={() => window.location.reload()}
                                        className="w-full bg-red-600 hover:bg-red-500 py-5 rounded-2xl font-black text-xl italic tracking-tighter transition-all shadow-lg"
                                    >
                                        BACK TO TITLE
                                    </button>
                                ) : (
                                    <div className="space-y-4 relative z-10">
                                        {currentEvent.choices.map((choice: any, i: number) => (
                                            <button
                                                key={i}
                                                onClick={() => {
                                                    gameStore.applyEventChoice(currentEvent.id, i, currentEvent);
                                                    const introBonus = currentEvent.type === 'intro' ? 30 : 0;
                                                    const totalHeart = (choice.heartDelta || 0) + introBonus;
                                                    let msg = "選択しました";
                                                    if (totalHeart !== 0) msg = `♡ 好感度 ${totalHeart > 0 ? '+' : ''}${totalHeart}`;
                                                    if (choice.repDelta) msg += ` / 評判 +${choice.repDelta}`;
                                                    notification.success(msg);
                                                    executeSimulation();
                                                }}
                                                className="w-full p-6 text-left bg-white/5 hover:bg-white/10 border-2 border-white/10 hover:border-pink-500/50 rounded-3xl transition-all duration-300 group flex items-center justify-between shadow-xl"
                                            >
                                                <span className="font-black text-white text-lg tracking-tight group-hover:text-pink-300 transition-colors">{choice.label}</span>
                                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                                    <span className="text-xs font-black italic text-pink-400">SELECT</span>
                                                    <span className="text-xl text-pink-400">&raquo;</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {dayPhase === 'RESULT' && lastResult && (
                    <div className="bg-black/40 backdrop-blur-xl rounded-[40px] border-2 border-white/10 p-8 md:p-12 social-glow relative overflow-hidden max-w-3xl mx-auto shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-[100px] -mr-32 -mt-32" />

                        <div className="text-center mb-10 relative z-10">
                            <h2 className="text-3xl font-black italic tracking-tighter text-white">REVENUE REPORT</h2>
                            <p className="text-pink-400 font-bold text-sm uppercase tracking-widest">本日のお客様: {lastResult.customers}名</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 relative z-10">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b border-white/10 pb-2 text-white">
                                    <span className="text-gray-400 font-bold">売上高</span>
                                    <span className="text-2xl font-black italic text-green-400">+{lastResult.sales} G</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-white/10 pb-2 text-white">
                                    <span className="text-gray-400 font-bold">評判変化</span>
                                    <span className="text-xl font-black italic text-cyan-400">+{lastResult.reputationDelta}</span>
                                </div>
                            </div>

                            <div className="bg-white/5 p-6 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-white">
                                <span className="text-[10px] font-black text-pink-400 uppercase mb-2">Shop Experience</span>
                                <div className="w-full h-4 bg-black/60 rounded-full overflow-hidden border border-white/10">
                                    <div className="h-full bg-gradient-to-r from-pink-500 to-purple-500 w-[65%]" />
                                </div>
                                <span className="text-[10px] font-bold text-gray-400 mt-2 italic uppercase">Next Rank: 140 / 200 pts</span>
                            </div>
                        </div>

                        <button
                            onClick={handleToDone}
                            className="w-full bg-white text-[#0d0517] rounded-2xl py-4 font-black text-lg italic tracking-tighter hover:bg-pink-100 transition-colors shadow-xl"
                        >
                            FINISH DAY &rarr;
                        </button>
                    </div>
                )}

                {dayPhase === 'DONE' && (
                    <div className="flex flex-col items-center gap-10">
                        <div className="text-center animate-bounce-soft">
                            <span className="text-7xl mb-4 block">✨</span>
                            <h2 className="text-5xl font-black italic tracking-tighter text-white drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]">
                                DAY CLEAR!
                            </h2>
                        </div>

                        <div className="bg-black/40 backdrop-blur-md p-8 rounded-[40px] border border-white/10 flex flex-col items-center gap-6 social-glow text-white">
                            <p className="text-gray-300 font-bold max-w-sm text-center italic">
                                今日一日の営業が無事に終わりました。<br />
                                妖精たちとの絆が、また一歩深まったようです。
                            </p>
                            <button
                                onClick={handleFinish}
                                className="px-16 py-5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl font-black text-2xl italic tracking-tighter shadow-2xl hover:scale-105 transition-all text-white border-b-4 border-purple-800"
                            >
                                TO NEXT DAY &rarr;
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </GameLayout>
    );
}
