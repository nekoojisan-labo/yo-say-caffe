import { useState } from 'react';
import { useGameStore, useProtagonistStore, useIkemenStore, useAudioStore } from '@/store';
import { GameLayout } from '../../layout/GameLayout';
import { SaveManager } from '@/utils/saveManager';
import { SaveData } from '@/types';

export function SaveScreen() {
    const gameStore = useGameStore();
    const protagonistStore = useProtagonistStore();
    const ikemenStore = useIkemenStore();
    const audioStore = useAudioStore();

    const [message, setMessage] = useState('');

    const getFullData = (): Omit<SaveData, 'version' | 'savedAt'> => ({
        gameState: gameStore,
        protagonist: protagonistStore.protagonist,
        ikemenList: ikemenStore.ikemenList,
        inventory: {},
        unlockedMenus: [],
        unlockedInteriors: [],
        ownedInteriors: [],
        unlockedCGs: [],
        eventFlags: {},
        salesHistory: {},
        settings: {
            audio: audioStore,
            textSpeed: 'normal',
            autoSpeed: 'normal',
            defaultCafeMode: 'auto',
            showConfirmDialog: true
        }
    });

    const handleSave = () => {
        SaveManager.saveGame(getFullData());
        setMessage('SUCCESS: データを魔法瓶に保存しました');
        setTimeout(() => setMessage(''), 3000);
    };

    const handleLoad = () => {
        const data = SaveManager.loadGame();
        if (data) {
            applyData(data);
            setMessage('SUCCESS: 記憶を呼び起こしました');
        } else {
            setMessage('ERROR: 記憶が見つかりません');
        }
        setTimeout(() => setMessage(''), 3000);
    };

    const applyData = (data: SaveData) => {
        gameStore.setGameState(data.gameState);
        protagonistStore.setProtagonist(data.protagonist);
        ikemenStore.setIkemenList(data.ikemenList);
    };

    return (
        <GameLayout showCharacter={false}>
            <div className="w-full max-w-4xl h-full flex flex-col items-center justify-center p-6 animate-fade-in relative z-20">
                <div className="mb-10 text-center">
                    <h2 className="text-4xl font-black italic tracking-tighter text-white drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                        SAVE DATA ARCHIVE
                    </h2>
                    <p className="text-cyan-400 font-bold text-sm uppercase tracking-widest mt-1">セーブ & ロード</p>
                </div>

                {message && (
                    <div className={`mb-6 px-8 py-3 rounded-full border-2 font-black italic text-sm animate-slide-down ${message.startsWith('ERROR') ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-green-500/20 border-green-500 text-green-400'}`}>
                        {message}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
                    <button
                        onClick={handleSave}
                        className="group relative bg-black/40 backdrop-blur-md rounded-[40px] p-10 border-2 border-white/10 hover:border-pink-500/50 transition-all social-glow-pink flex flex-col items-center gap-4"
                    >
                        <span className="text-6xl filter drop-shadow-[0_0_10px_white] group-hover:scale-110 transition-transform">💾</span>
                        <div className="text-center">
                            <h3 className="text-xl font-black italic text-white">SAVE</h3>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">クイックセーブ</p>
                        </div>
                    </button>

                    <button
                        onClick={handleLoad}
                        className="group relative bg-black/40 backdrop-blur-md rounded-[40px] p-10 border-2 border-white/10 hover:border-cyan-500/50 transition-all social-glow flex flex-col items-center gap-4"
                    >
                        <span className="text-6xl filter drop-shadow-[0_0_10px_white] group-hover:scale-110 transition-transform">📁</span>
                        <div className="text-center">
                            <h3 className="text-xl font-black italic text-white">LOAD</h3>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">ロード</p>
                        </div>
                    </button>
                </div>

                <div className="mt-12 w-full max-w-2xl bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <p className="text-xs font-bold text-gray-400 leading-relaxed max-w-xs">
                            ブラウザのデータが消えても安心。JSONファイルとして書き出すことで、別の端末でも続きから遊べます。
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <button className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl border border-white/10 text-xs font-black italic transition-all">EXPORT DATA</button>
                        <button className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl border border-white/10 text-xs font-black italic transition-all">IMPORT DATA</button>
                    </div>
                </div>
            </div>
        </GameLayout>
    );
}
