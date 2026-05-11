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
    const prologueComplete = scenarioFlags.prologue_complete === true;
    const prologuePlayed = completedScenarios.includes('prologue_chapter1');

    if (!prologueComplete && !prologuePlayed) {
      setScenarioFlag('game_started', true);
      setCurrentScenario(PROLOGUE[0]);
      return;
    }

    setScreen('home');
  };

  return (
    <div
      className="w-full h-full relative overflow-hidden bg-black flex items-center justify-center"
      style={{
        backgroundImage: `url(${ASSETS.titleBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        <img
          src={ASSETS.logoJa}
          alt="妖精カフェ物語"
          className="w-full max-w-[460px] drop-shadow-2xl"
        />
        <img
          src={ASSETS.subtitle}
          alt="恋と経営のファンタジー"
          className="w-full max-w-[360px] opacity-95 drop-shadow-lg"
        />

        <button
          onClick={handleStartGame}
          className="group relative mt-4 rounded-full border border-white/40 bg-white/15 px-14 py-4 text-xl font-bold text-white backdrop-blur-sm transition-all hover:bg-white/25 hover:scale-[1.02] active:scale-95"
        >
          <span className="tracking-[0.15em]">はじめる</span>
        </button>
      </div>
    </div>
  );
}
