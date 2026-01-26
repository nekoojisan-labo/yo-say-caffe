import { useGameStore } from '@/store';
import { GameLayout } from '../../layout/GameLayout';
import { ASSETS } from '@/utils/assets';
import { CHARACTER_LIST } from '@/game/characters';

export function IkemenListScreen() {
    const { affection, encyclopediaUnlocked } = useGameStore();

    return (
        <GameLayout showCharacter={false}>
            <div className="w-full max-w-6xl h-full flex flex-col p-6 animate-fade-in overflow-hidden relative z-20">
                <div className="mb-8 text-center">
                    <h2 className="text-4xl font-black italic tracking-tighter text-white drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]">
                        FAIRY DICTIONARY
                    </h2>
                    <p className="text-pink-300 font-bold text-sm uppercase tracking-widest mt-1">妖精図鑑</p>
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar pb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {CHARACTER_LIST.map((char) => {
                            const isUnlocked = encyclopediaUnlocked[char.id];
                            const heart = affection[char.id] || 0;

                            if (!isUnlocked) {
                                return (
                                    <div
                                        key={char.id}
                                        className="relative overflow-hidden rounded-[32px] bg-black/60 backdrop-blur-md border border-white/5 h-48 flex items-center justify-center opacity-40 grayscale"
                                    >
                                        <div className="text-center">
                                            <span className="text-4xl block mb-2">❓</span>
                                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Locked</span>
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <div
                                    key={char.id}
                                    className="group relative overflow-hidden rounded-[32px] bg-black/40 backdrop-blur-md border border-white/10 hover:border-pink-500/50 transition-all duration-300 social-glow-pink h-48 flex shadow-xl"
                                >
                                    {/* キャラクター画像 */}
                                    <div className="w-1/3 h-full relative overflow-hidden bg-gradient-to-b from-purple-900/40 to-black/20">
                                        <img
                                            src={ASSETS.characters[char.id]}
                                            alt={char.name}
                                            className="h-full w-full object-cover object-top scale-110 group-hover:scale-125 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
                                    </div>

                                    {/* ステータス情報 */}
                                    <div className="flex-1 p-5 flex flex-col justify-between">
                                        <div className="relative">
                                            <div className="flex items-center justify-between mb-1 text-white">
                                                <span className="text-[10px] font-black text-pink-400 italic uppercase tracking-widest">{char.role}</span>
                                                <span className="bg-pink-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black shadow-lg">LV.1</span>
                                            </div>
                                            <h3 className="text-xl font-black text-white drop-shadow-md">{char.name}</h3>
                                            <p className="text-[10px] text-gray-400 line-clamp-2 mt-1 leading-tight font-medium">{char.description}</p>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-white">
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Affection</span>
                                                <span className="text-sm font-black italic text-pink-400 drop-shadow-[0_0_5px_rgba(236,72,153,0.5)]">♥ {heart}</span>
                                            </div>
                                            <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
                                                <div
                                                    className="h-full bg-gradient-to-r from-pink-500 to-purple-400 shadow-[0_0_8px_rgba(236,72,153,0.6)]"
                                                    style={{ width: `${Math.min(100, (heart / 1000) * 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </GameLayout>
    );
}
