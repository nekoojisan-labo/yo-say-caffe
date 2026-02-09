import { GameLayout } from '../../layout/GameLayout';

export function MenuDevScreen() {
    return (
        <GameLayout showCharacter={true}>
            <div className="w-full max-w-4xl h-full flex flex-col items-center justify-center p-6 animate-fade-in relative z-20">
                <div className="text-center">
                    <h2 className="text-5xl font-black italic tracking-tighter text-white drop-shadow-[0_0_20px_rgba(168,85,247,0.6)] animate-pulse-soft">
                        UNDER DEVELOPMENT
                    </h2>
                    <p className="text-purple-400 font-bold text-lg uppercase tracking-[0.5em] mt-2">メニュー開発準備中...</p>
                </div>

                <div className="mt-12 bg-black/40 backdrop-blur-md p-10 rounded-[50px] border-2 border-white/10 social-glow-pink max-w-lg text-center space-y-4">
                    <span className="text-6xl block mb-4">🧪</span>
                    <p className="text-gray-300 font-bold leading-relaxed italic">
                        「新しい魔法のレシピを研究しているところよ。もう少し待っててね！」
                    </p>
                </div>
            </div>
        </GameLayout>
    );
}
