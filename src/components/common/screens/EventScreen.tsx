import React, { useEffect } from 'react';
import { useGameStore, useEventStore, useIkemenStore } from '@/store';
import { ASSETS } from '@/utils/assets';
import type { EventChoice } from '@/types';

// 背景やキャラのプレースホルダー（アセット読み込み失敗時用）
const PlaceholderImage = ({ label, color, className }: { label: string, color: string, className?: string }) => (
    <div className={`flex items-center justify-center bg-opacity-80 border-2 border-dashed border-white ${className}`} style={{ backgroundColor: color }}>
        <span className="text-white font-bold drop-shadow-md text-center px-2">{label}</span>
    </div>
);

export const EventScreen: React.FC = () => {
    // Store Hook usage (adjusting to store pattern)
    // Assuming useEventStore returns the state directly based on typical zustand usage seen in App.tsx
    const setScreen = useGameStore((state) => state.setScreen);
    const currentEvent = useEventStore((state) => state.currentEvent);
    const currentSceneIndex = useEventStore((state) => state.currentSceneIndex);
    const nextScene = useEventStore((state) => state.nextScene);
    const goToScene = useEventStore((state) => state.goToScene);
    const showChoices = useEventStore((state) => state.showChoices);
    const isAutoMode = useEventStore((state) => state.isAutoMode);
    const isSkipMode = useEventStore((state) => state.isSkipMode);
    const setTextProgress = useEventStore((state) => state.setTextProgress);

    const changeAffection = useIkemenStore((state) => state.changeAffection);
    const addRouteScore = useIkemenStore((state) => state.addRouteScore);

    // イベントがない場合はホームへリダイレクト
    useEffect(() => {
        if (!currentEvent) {
            setScreen('home');
        }
    }, [currentEvent, setScreen]);

    // 文言表示用（簡易）
    useEffect(() => {
        if (currentEvent && !showChoices) {
            setTextProgress(1); // 常に全表示
        }
    }, [currentSceneIndex, showChoices, currentEvent, setTextProgress]);

    // オート/スキップモードの制御
    useEffect(() => {
        if (!currentEvent || showChoices) return;

        let timer: NodeJS.Timeout;
        if (isSkipMode) {
            timer = setTimeout(() => nextScene(), 100);
        } else if (isAutoMode) {
            timer = setTimeout(() => nextScene(), 2000);
        }
        return () => clearTimeout(timer);
    }, [isAutoMode, isSkipMode, showChoices, nextScene, currentEvent, currentSceneIndex]);

    if (!currentEvent) return null;

    const currentScene = currentEvent.scenes[currentSceneIndex];
    // シーン外参照のエラーハンドリング
    if (!currentScene) return null;

    const handleChoice = (choice: EventChoice) => {
        // 1. 好感度更新
        if (choice.affectionChange !== 0) {
            changeAffection(currentEvent.ikemenId, choice.affectionChange);

            // ルートスコアを加算
            if (choice.affectionChange > 0) {
                if (addRouteScore) {
                    addRouteScore(currentEvent.ikemenId, choice.affectionChange);
                }
            }
        }

        // 2. シーン遷移
        goToScene(choice.nextSceneId);
    };

    // 背景色の簡易マッピング (将来的にASSETS.backgrounds等に移行)
    const bgColors: Record<string, string> = {
        'cafe_interior': '#4A3B32',
        'garden': '#4CAF50',
        'sunset': '#FF9800',
        'night': '#1A237E'
    };

    return (
        <div
            className="w-full h-full relative overflow-hidden select-none cursor-pointer"
            onClick={() => !showChoices && nextScene()}
        >
            {/* 1. 背景レイヤー */}
            <div
                className="absolute inset-0 transition-colors duration-500"
                style={{ backgroundColor: bgColors[currentScene.background] || '#333' }}
            >
                <div className="absolute top-4 left-4 text-white opacity-50 text-sm">
                    Background: {currentScene.background}
                </div>
            </div>

            {/* 2. キャラクターレイヤー */}
            {currentScene.character && (
                <div className={`absolute bottom-0 h-4/5 w-1/3 transition-all duration-300
          ${currentScene.character.position === 'left' ? 'left-10' :
                        currentScene.character.position === 'right' ? 'right-10' :
                            'left-1/2 -translate-x-1/2'}`}
                >
                    {ASSETS.characters[currentScene.character.id] ? (
                        <img
                            src={ASSETS.characters[currentScene.character.id]}
                            alt={currentScene.character.id}
                            className="w-full h-full object-contain filter drop-shadow-xl"
                        />
                    ) : (
                        <PlaceholderImage
                            label={`${currentScene.character.id}\n(${currentScene.character.expression})`}
                            color="#FFB6C1"
                            className="w-full h-full rounded-t-xl"
                        />
                    )}
                </div>
            )}

            {/* 3. テキストボックス (ADVスタイル) */}
            <div className="absolute bottom-4 left-4 right-4 h-48 bg-black/80 rounded-xl border border-white/20 p-6 flex flex-col shadow-2xl backdrop-blur-sm pointer-events-none">
                {/* 名前欄 */}
                <div className="text-xl text-yellow-300 font-bold mb-3 tracking-wider">
                    {currentScene.dialogue.speaker}
                </div>
                {/* テキスト本文 */}
                <div className="text-white text-lg leading-relaxed whitespace-pre-wrap">
                    {currentScene.dialogue.text}
                </div>

                {/* ガイド */}
                <div className="absolute bottom-4 right-6 text-gray-400 text-sm animate-pulse">
                    {isSkipMode ? 'Skipping...' : isAutoMode ? 'Auto Mode' : 'Click to continue'}
                </div>
            </div>

            {/* 4. 選択肢オーバーレイ */}
            {showChoices && currentScene.choices && (
                <div className="absolute inset-0 bg-black/50 z-50 flex flex-col items-center justify-center space-y-4 backdrop-blur-sm">
                    {currentScene.choices.map((choice, idx) => (
                        <button
                            key={idx}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleChoice(choice);
                            }}
                            className="w-full max-w-2xl bg-white/95 hover:bg-fairy-pink-100 text-gray-800 font-bold py-4 px-8 rounded-xl shadow-lg border-2 border-fairy-pink-300 transform transition hover:scale-105 active:scale-95"
                        >
                            {choice.text}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
