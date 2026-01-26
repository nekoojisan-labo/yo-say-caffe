import { useGameStore } from '@/store';
import { ASSETS } from '@/utils/assets';

export function TitleScreen() {
    const setScreen = useGameStore((state) => state.setScreen);

    return (
        <div className="w-full h-full relative overflow-hidden bg-black flex items-center justify-center">
            {/* バックグラウンド背景 */}
            <div
                className="absolute inset-0 bg-cover bg-center scale-110 animate-slow-zoom"
                style={{ backgroundImage: `url(${ASSETS.opening})` }}
            />

            {/* ダークオーバーレイ */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0d0517]/20 via-transparent to-[#0d0517]" />

            {/* まばゆい光の演出 */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse-soft" />
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 flex flex-col items-center">
                {/* ロゴセクション */}
                <div className="mb-16 flex flex-col items-center animate-title-float">
                    <div className="relative group px-4">
                        <img
                            src={ASSETS.logoJa}
                            alt="妖精カフェ物語"
                            className="w-full max-w-[650px] drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                        />
                        <div className="absolute -inset-4 bg-white/5 blur-3xl rounded-full -z-10 group-hover:bg-white/10 transition-colors" />
                    </div>

                    <div className="mt-2 text-center">
                        <img
                            src={ASSETS.logoEn}
                            alt="Fairy Cafe Story"
                            className="h-10 opacity-60 drop-shadow-lg"
                        />
                    </div>
                </div>

                {/* スタートボタンエリア */}
                <div className="mt-8 flex flex-col items-center gap-6 animate-fade-in delay-700">
                    <button
                        onClick={() => setScreen('home')}
                        className="group relative px-20 py-6 transition-all active:scale-95"
                    >
                        {/* ボタン発光 */}
                        <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* メインボタン */}
                        <div className="relative bg-white/95 text-[#0d0517] rounded-full px-16 py-4 font-black text-2xl italic tracking-[0.2em] shadow-2xl group-hover:bg-cyan-50 group-hover:shadow-cyan-500/20 transition-all border-b-4 border-gray-300">
                            TAP TO START
                        </div>

                        {/* インジケーター */}
                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 ">
                            <div className="flex flex-col items-center gap-1 animate-bounce">
                                <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Welcome back</span>
                                <span className="text-white/40 text-sm">▼</span>
                            </div>
                        </div>
                    </button>

                    {/* フッターテキスト */}
                    <div className="mt-20 text-[10px] font-black text-white/30 uppercase tracking-[0.5em] flex items-center gap-4">
                        <div className="h-[1px] w-20 bg-white/10" />
                        <span>© 2024 NEKOOJISAN LABO</span>
                        <div className="h-[1px] w-20 bg-white/10" />
                    </div>
                </div>
            </div>

            {/* パーティクル的なキラキラ */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full animate-twinkle opacity-0"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
