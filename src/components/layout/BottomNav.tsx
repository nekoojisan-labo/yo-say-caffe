import { useGameStore } from '@/store';

export function BottomNav() {
    const { currentScreen, setScreen } = useGameStore();

    return (
        <footer className="relative z-30 mt-auto social-nav-clip pt-4 pb-2 px-4 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
            <div className="flex items-end justify-center gap-0 max-w-[1400px] mx-auto overflow-x-auto no-scrollbar">
                <NavTab
                    icon="☕"
                    label="営業"
                    subLabel="CAFE"
                    active={currentScreen === 'cafe' || currentScreen === 'event'}
                    onClick={() => setScreen('cafe')}
                    isSpecial
                />
                <NavTab
                    icon="📊"
                    label="経営"
                    subLabel="MGMT"
                    active={currentScreen === 'management'}
                    onClick={() => setScreen('management')}
                />
                <NavTab
                    icon="📝"
                    label="開発"
                    subLabel="DEV"
                    active={currentScreen === 'menu-dev'}
                    onClick={() => setScreen('menu-dev')}
                />
                <NavTab
                    icon="🏠"
                    label="内装"
                    subLabel="ROOM"
                    active={currentScreen === 'interior'}
                    onClick={() => setScreen('interior')}
                />
                <NavTab
                    icon="👱‍♀️"
                    label="主人公"
                    subLabel="ME"
                    active={currentScreen === 'protagonist'}
                    onClick={() => setScreen('protagonist')}
                />
                <NavTab
                    icon="📖"
                    label="図鑑"
                    subLabel="BOOK"
                    active={currentScreen === 'ikemen-list'}
                    onClick={() => setScreen('ikemen-list')}
                />
                <NavTab
                    icon="💾"
                    label="セーブ"
                    subLabel="SAVE"
                    active={currentScreen === 'save'}
                    onClick={() => setScreen('save')}
                />
            </div>
        </footer>
    );
}

function NavTab({
    icon,
    label,
    subLabel,
    active = false,
    isSpecial = false,
    onClick
}: {
    icon: string;
    label: string;
    subLabel: string;
    active?: boolean;
    isSpecial?: boolean;
    onClick?: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`
                flex flex-col items-center justify-center px-4 py-3 min-w-[110px] transition-all relative group
                ${isSpecial ? 'bg-pink-100/10' : ''}
            `}
        >
            {/* アクティブ装飾 */}
            {active && (
                <div className="absolute inset-0 bg-pink-500/10 border-t-2 border-pink-400 group-hover:bg-pink-500/20 transition-all shadow-[inset_0_4px_10px_rgba(236,72,153,0.3)]" />
            )}

            {/* アイコン背景 (営業ボタン用など) */}
            <div className={`
                w-12 h-12 flex items-center justify-center rounded-2xl mb-1 transition-all
                ${isSpecial ? 'bg-pink-100 social-glow-pink scale-110 shadow-lg' : 'bg-white/5 group-hover:bg-white/10 group-hover:scale-110'}
            `}>
                <span className={`text-2xl ${isSpecial ? 'filter drop-shadow-sm' : ''}`}>{icon}</span>
            </div>

            <span className={`text-[12px] font-black tracking-tighter z-10 ${active ? 'text-pink-300' : 'text-white/80'}`}>
                {label}
            </span>
            <span className={`text-[8px] font-bold tracking-widest uppercase opacity-40 z-10 ${active ? 'text-pink-400' : 'text-white/40'}`}>
                {subLabel}
            </span>
        </button>
    );
}
