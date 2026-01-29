import { useGameStore } from '@/store';
import { ASSETS } from '@/utils/assets';
import { PROLOGUE } from '@/game/scenarios/prologue';

export function TitleScreen() {
    const setScreen = useGameStore((state) => state.setScreen);
    const setCurrentScenario = useGameStore((state) => state.setCurrentScenario);
    const setScenarioFlag = useGameStore((state) => state.setScenarioFlag);
    const scenarioFlags = useGameStore((state) => state.scenarioFlags);
    const completedScenarios = useGameStore((state) => state.completedScenarios);

    const handleStartGame = () => {
        // プロローグが完了していない場合はプロローグを開始
        const prologueComplete = scenarioFlags['prologue_complete'] === true;
        const prologuePlayed = completedScenarios.includes('prologue_chapter1');
        
        if (!prologueComplete && !prologuePlayed) {
            // ゲーム開始フラグを設定
            setScenarioFlag('game_started', true);
            // プロローグシナリオを設定
            setCurrentScenario(PROLOGUE[0]);
            // scenario画面に遷移（setCurrentScenarioが自動で行う場合もある）
        } else {
            // プロローグ完了済みならホームへ
            setScreen('home');
        }
    };

    return (
        <div className="w-full h-full relative overflow-hidden bg-black flex items-center justify-center">
            {/* ... 既存のコード ... */}
            
            <button
                onClick={handleStartGame}  // ← ここを変更
                className="group relative px-20 py-6 transition-all active:scale-95"
            >
                {/* ... 既存のボタン内容 ... */}
            </button>
            
            {/* ... 既存のコード ... */}
        </div>
    );
}
