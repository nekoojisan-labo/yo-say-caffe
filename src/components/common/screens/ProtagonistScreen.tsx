import { useState, useEffect } from 'react';
import { useGameStore, useProtagonistStore } from '@/store';
import { GameLayout } from '../../layout/GameLayout';
import { resolveProtagonistVisual } from '@/utils/visualSystem';
import { ASSETS } from '@/utils/assets';

export function ProtagonistScreen() {
  const { glamor, shopRank, updateGlamor, updateProtagonistVisual } = useGameStore();
  const { protagonist } = useProtagonistStore();
  const { name, stats } = protagonist;
  
  const [showMagic, setShowMagic] = useState(false);
  const [magicPhase, setMagicPhase] = useState<'idle' | 'casting' | 'reveal'>('idle');

  // 画面表示時に魔法エフェクトを発動
  useEffect(() => {
    const timer = setTimeout(() => {
      setMagicPhase('casting');
      setTimeout(() => {
        setShowMagic(true);
        setMagicPhase('reveal');
      }, 1500);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleTestLevel = (lv: number) => {
    const nextVisual = resolveProtagonistVisual(lv);
    updateGlamor({ level: lv, points: lv * 100 });
    updateProtagonistVisual(nextVisual);
  };

  // 現在のレベルに応じた画像を取得
  const currentImage = ASSETS.mainChara[`lv${glamor.level}`] || ASSETS.mainChara.default;

  return (
    <GameLayout showCharacter={false} overlayGradient={true}>
      <div className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 p-4 relative overflow-hidden">
        
        {/* 魔法パーティクル背景 */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-purple-400 rounded-full animate-float opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* 左側: 主人公立ち絵 */}
        <div className="flex-1 flex items-center justify-center relative">
          {/* 魔法陣エフェクト */}
          <div className={`absolute w-80 h-80 md:w-96 md:h-96 transition-all duration-1000 ${
            magicPhase === 'casting' ? 'opacity-100 scale-100 animate-spin-slow' : 
            magicPhase === 'reveal' ? 'opacity-30 scale-110' : 'opacity-0 scale-50'
          }`}>
            <div className="w-full h-full rounded-full border-2 border-purple-500/50 animate-pulse" />
            <div className="absolute inset-4 rounded-full border border-pink-400/30 animate-spin-reverse" />
            <div className="absolute inset-8 rounded-full border border-cyan-400/20" />
          </div>

          {/* 主人公画像 */}
          <div className={`relative z-10 transition-all duration-1000 ${
            showMagic ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            {/* グロー効果 */}
            <div className="absolute inset-0 blur-2xl bg-gradient-to-t from-purple-500/40 via-pink-500/30 to-transparent animate-pulse" />
            
            <img
              src={currentImage}
              alt={name}
              className="h-[60vh] md:h-[75vh] object-contain drop-shadow-[0_0_30px_rgba(168,85,247,0.5)] relative z-10"
            />

            {/* 光の粒子エフェクト */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full animate-sparkle"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${10 + Math.random() * 80}%`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 右側: ステータスパネル */}
        <div className={`w-full md:w-[400px] transition-all duration-1000 delay-500 ${
          showMagic ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
        }`}>
          {/* 照覧の魔法タイトル */}
          <div className="text-center mb-4">
            <p className="text-xs text-purple-300 tracking-[0.3em] animate-pulse">✧ 照覧の魔法 ✧</p>
            <p className="text-[10px] text-gray-500 mt-1">Revelation Magic</p>
          </div>

          {/* メインステータスカード */}
          <div className="relative">
            {/* 魔法の光枠 */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 rounded-3xl blur opacity-50 animate-glow" />
            
            <div className="relative bg-black/80 backdrop-blur-xl border border-purple-500/50 rounded-3xl p-6 space-y-6">
              {/* 名前とランク */}
              <div className="flex justify-between items-end border-b border-purple-500/30 pb-4">
                <div>
                  <p className="text-[10px] text-purple-400 tracking-widest">OWNER IDENTITY</p>
                  <h2 className="text-2xl font-bold text-white mt-1">{name}</h2>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-500">SHOP RANK</p>
                  <p className="text-2xl font-bold text-pink-400">{shopRank}</p>
                </div>
              </div>

              {/* 幻装レベル */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-purple-300">✦ 幻装レベル</span>
                  <span className="text-sm font-bold text-white">Lv.{glamor.level} / 6</span>
                </div>
                <div className="h-3 bg-black/60 rounded-full overflow-hidden border border-purple-500/30">
                  <div
                    className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-purple-400 transition-all duration-500 shadow-[0_0_15px_rgba(168,85,247,0.6)]"
                    style={{ width: `${(glamor.level / 6) * 100}%` }}
                  />
                </div>
              </div>

              {/* 安定度 */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-cyan-300">◈ 安定度</span>
                  <span className="text-sm font-bold text-white">{glamor.stability}%</span>
                </div>
                <div className="h-2 bg-black/60 rounded-full overflow-hidden border border-cyan-500/30">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                    style={{ width: `${glamor.stability}%` }}
                  />
                </div>
              </div>

              {/* 三大ステータス */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <MagicStatBox icon="🌹" label="魅力" value={stats.charm} color="pink" />
                <MagicStatBox icon="🗣️" label="話術" value={stats.talk} color="cyan" />
                <MagicStatBox icon="✨" label="センス" value={stats.sense} color="yellow" />
              </div>

              {/* デバッグ用レベル切り替え */}
              <div className="pt-4 border-t border-purple-500/20">
                <p className="text-[8px] text-gray-600 text-center mb-2">DEBUG: 幻装レベル変更</p>
                <div className="flex gap-1 justify-center">
                  {[0, 1, 2, 3, 4, 5, 6].map(lv => (
                    <button
                      key={lv}
                      onClick={() => handleTestLevel(lv)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                        glamor.level === lv
                          ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50 scale-110'
                          : 'bg-black/40 text-gray-500 hover:bg-purple-900/50 border border-purple-500/20'
                      }`}
                    >
                      {lv}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GameLayout>
  );
}

function MagicStatBox({ icon, label, value, color }: { icon: string; label: string; value: number; color: string }) {
  const colorClasses = {
    pink: 'border-pink-500/30 text-pink-400',
    cyan: 'border-cyan-500/30 text-cyan-400',
    yellow: 'border-yellow-500/30 text-yellow-400',
  };
  
  return (
    <div className={`bg-black/40 rounded-xl p-3 border ${colorClasses[color as keyof typeof colorClasses]} text-center group hover:scale-105 transition-transform`}>
      <span className="text-xl block mb-1 group-hover:animate-bounce">{icon}</span>
      <p className="text-[10px] text-gray-500">{label}</p>
      <p className={`text-lg font-bold ${colorClasses[color as keyof typeof colorClasses].split(' ')[1]}`}>{value}</p>
    </div>
  );
}
