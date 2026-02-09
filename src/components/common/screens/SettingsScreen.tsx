import { useGameStore, useAudioStore } from '@/store';
import { Header, Card, Button } from '@/components/common';

export function SettingsScreen() {
    const setScreen = useGameStore((state) => state.setScreen);
    const resetGame = useGameStore((state) => state.resetGame);

    const {
        bgmVolume, setBGMVolume,
        seVolume, setSEVolume,
        bgmMuted, toggleBGMMute,
        seMuted, toggleSEMute
    } = useAudioStore();

    const handleReset = () => {
        if (window.confirm('ゲームデータを初期化しますか？この操作は取り消せません。')) {
            resetGame();
            setScreen('title');
        }
    };

    return (
        <div className="w-full h-full flex flex-col bg-game-bg">
            <Header showSettings={false} />

            <main className="flex-1 overflow-y-auto p-6 flex flex-col items-center">
                <div className="w-full max-w-xl space-y-8 animate-fade-in">
                    <div className="text-center">
                        <h1 className="text-2xl font-black text-gray-800 tracking-tight">Settings</h1>
                        <p className="text-fairy-pink-500 font-medium text-sm">各種設定・データ管理</p>
                    </div>

                    {/* 音量設定 */}
                    <section className="space-y-4">
                        <h2 className="text-lg font-bold text-gray-700 flex items-center gap-2">
                            <span className="text-xl">🔊</span> サウンド設定
                        </h2>

                        <Card className="p-6 space-y-6">
                            {/* BGM */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <label className="font-bold text-gray-600 flex items-center gap-2">
                                        BGM
                                        {bgmMuted && <span className="text-xs bg-red-100 text-red-500 px-2 py-0.5 rounded-full">MUTED</span>}
                                    </label>
                                    <span className="text-sm font-mono text-gray-500">{Math.round(bgmVolume * 100)}%</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={toggleBGMMute}
                                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${bgmMuted ? 'bg-red-100 text-red-500' : 'bg-fairy-pink-50 text-fairy-pink-500'}`}
                                    >
                                        {bgmMuted ? '🔇' : '🎵'}
                                    </button>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={bgmVolume}
                                        onChange={(e) => setBGMVolume(parseFloat(e.target.value))}
                                        className="flex-1 accent-fairy-pink-500 h-2 bg-pink-100 rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>
                            </div>

                            {/* SE */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <label className="font-bold text-gray-600 flex items-center gap-2">
                                        SE
                                        {seMuted && <span className="text-xs bg-red-100 text-red-500 px-2 py-0.5 rounded-full">MUTED</span>}
                                    </label>
                                    <span className="text-sm font-mono text-gray-500">{Math.round(seVolume * 100)}%</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={toggleSEMute}
                                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${seMuted ? 'bg-red-100 text-red-500' : 'bg-fairy-lavender-50 text-fairy-lavender-500'}`}
                                    >
                                        {seMuted ? '🔇' : '✨'}
                                    </button>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={seVolume}
                                        onChange={(e) => setSEVolume(parseFloat(e.target.value))}
                                        className="flex-1 accent-fairy-lavender-500 h-2 bg-purple-100 rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>
                            </div>
                        </Card>
                    </section>

                    {/* データ管理 */}
                    <section className="space-y-4">
                        <h2 className="text-lg font-bold text-gray-700 flex items-center gap-2">
                            <span className="text-xl">⚙️</span> 管理・その他
                        </h2>

                        <Card className="p-6 flex flex-col gap-4">
                            <Button
                                variant="secondary"
                                fullWidth
                                onClick={() => setScreen('title')}
                                className="justify-between"
                            >
                                <span>タイトルへ戻る</span>
                                <span>🏠</span>
                            </Button>

                            <Button
                                variant="danger"
                                fullWidth
                                onClick={handleReset}
                                className="justify-between"
                            >
                                <span>ゲームデータの初期化</span>
                                <span>⚠️</span>
                            </Button>
                        </Card>
                    </section>

                    <div className="pt-4 pb-12">
                        <Button
                            variant="primary"
                            fullWidth
                            onClick={() => setScreen('home')}
                            className="py-4 text-lg"
                        >
                            設定を閉じる
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
