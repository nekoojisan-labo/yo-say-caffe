import { ReactNode } from 'react';
import { useGameStore } from '@/store';
import { ASSETS } from '@/utils/assets';
import { TopBar } from './TopBar';
import { BottomNav } from './BottomNav';

interface GameLayoutProps {
    children: ReactNode;
    showCharacter?: boolean;
    background?: string;
    overlayGradient?: boolean;
}

export function GameLayout({
    children,
    showCharacter = true,
    background = ASSETS.opening,
    overlayGradient = true
}: GameLayoutProps) {
    const { protagonistVisual } = useGameStore();

    return (
        <div className="w-full h-full flex flex-col bg-[#0d0517] overflow-hidden relative font-sans text-white">
            {/* 1. 背景レイヤー */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${background})`,
                    filter: 'brightness(0.5) contrast(1.1) saturate(1.2)'
                }}
            />
            {overlayGradient && (
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0d0517]/90" />
            )}

            {/* 2. キャラクターレイヤー */}
            {showCharacter && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="h-full w-full max-w-4xl relative animate-fade-in">
                        {protagonistVisual.parts.full && (
                            <img
                                src={protagonistVisual.parts.full}
                                alt="Main Character"
                                className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 h-[110%] object-contain animate-float opacity-40"
                            />
                        )}
                    </div>
                </div>
            )}

            {/* 3. Top UI */}
            <TopBar />

            {/* 4. メインコンテンツ */}
            <main className="flex-1 relative z-20 flex flex-col items-center justify-center p-4 overflow-hidden">
                {children}
            </main>

            {/* 5. Bottom UI */}
            <BottomNav />
        </div>
    );
}
