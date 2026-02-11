import { useGameStore } from '@/store';
import { PROLOGUE } from '@/game/scenarios/prologue';

export function TitleScreen() {
    const setScreen = useGameStore((state) => state.setScreen);
    const setCurrentScenario = useGameStore((state) => state.setCurrentScenario);
    const setScenarioFlag = useGameStore((state) => state.setScenarioFlag);
    const scenarioFlags = useGameStore((state) => state.scenarioFlags);
    const completedScenarios = useGameStore((state) => state.completedScenarios);

    const handleStartGame = () => {
        const prologueComplete = scenarioFlags['prologue_complete'] === true;
        const prologuePlayed = completedScenarios.includes('prologue_chapter1');

        if (!prologueComplete && !prologuePlayed) {
            setScenarioFlag('game_started', true);
            setCurrentScenario(PROLOGUE[0]);
        } else {
            setScreen('home');
        }
    };

    return (
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-b from-indigo-900 via-purple-900 to-black flex flex-col items-center justify-center">
            {/* タイトルロゴ */}
            <div className="mb-16 text-center">
                <h1 className="text-6xl font-bold text-white tracking-wider mb-4"
                    style={{ textShadow: '0 0 20px rgba(167, 139, 250, 0.8)' }}>
                    妖精カフェ
                </h1>
                <p className="text-lg text-purple-300 tracking-widest">
                    ～ Fairy Café ～
                </p>
            </div>

            {/* スタートボタン */}
            <button
                onClick={handleStartGame}
                className="group relative px-20 py-6 transition-all active:scale-95 
                           bg-gradient-to-r from-purple-600 to-indigo-600 
                           hover:from-purple-500 hover:to-indigo-500
                           rounded-lg shadow-lg hover:shadow-purple-500/50"
            >
                <span className="text-2xl text-white font-bold tracking-widest">
                    はじめる
                </span>
            </button>

            {/* コピーライト */}
            <p className="absolute bottom-8 text-sm text-purple-400/60">
                © nekoojisan-labo
            </p>
        </div>
    );
}
