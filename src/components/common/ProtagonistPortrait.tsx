import React, { useState, useEffect } from 'react';

interface ProtagonistPortraitProps {
    setId: string;
    imagePath: string;
    className?: string;
    animation?: 'level-up' | 'level-down' | 'none';
}

export const ProtagonistPortrait: React.FC<ProtagonistPortraitProps> = ({
    setId,
    imagePath,
    className = "",
    animation = 'none'
}) => {
    const [hasError, setHasError] = useState(false);

    // セットが変わったらエラーをリセット
    useEffect(() => {
        setHasError(false);
    }, [setId, imagePath]);

    if (hasError) {
        return (
            <div className={`flex flex-col items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-3xl ${className}`}>
                <span className="text-4xl">👤</span>
                <span className="text-[10px] font-bold text-gray-400 mt-2">{setId} Not Found</span>
            </div>
        );
    }

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* レベルアップ演出 */}
            {animation === 'level-up' && (
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-pink-500/30 to-purple-500/30 animate-pulse pointer-events-none" />
            )}

            {/* レベルダウン演出 */}
            {animation === 'level-down' && (
                <div className="absolute inset-0 z-10 bg-gray-900/10 backdrop-blur-[1px] animate-pulse pointer-events-none" />
            )}

            <img
                src={imagePath}
                alt="Protagonist"
                className={`w-full h-full object-contain transition-all duration-700
          ${animation === 'level-up' ? 'scale-105 brightness-110' : ''}
          ${animation === 'level-down' ? 'grayscale-[0.3] contrast-[0.9]' : ''}
        `}
                onError={() => setHasError(true)}
            />
        </div>
    );
};
