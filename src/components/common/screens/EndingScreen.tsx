import { useState, useEffect } from 'react';
import { useGameStore } from '@/store';
import { ASSETS } from '@/utils/assets';
import { CHARACTERS } from '@/game/characters';
import type { EndingResult, EndingType } from '@/types';

// エンディングタイトル定義
const ENDING_DATA: Record<EndingType, {
  title: string;
  subtitle: string;
  bgColor: string;
  textColor: string;
  particleColor: string;
}> = {
  true_end: {
    title: 'True End',
    subtitle: '永遠の絆',
    bgColor: 'from-yellow-900/80 via-amber-800/60 to-yellow-900/80',
    textColor: 'text-yellow-200',
    particleColor: 'bg-yellow-300',
  },
  marriage_end: {
    title: 'Marriage End',
    subtitle: '幸せの誓い',
    bgColor: 'from-pink-900/80 via-purple-800/60 to-pink-900/80',
    textColor: 'text-pink-200',
    particleColor: 'bg-pink-300',
  },
  unrequited_end: {
    title: 'Unrequited End',
    subtitle: '届かなかった想い',
    bgColor: 'from-blue-900/80 via-indigo-800/60 to-blue-900/80',
    textColor: 'text-blue-200',
    particleColor: 'bg-blue-300',
  },
  success_end: {
    title: 'Success End',
    subtitle: '繁盛カフェの伝説',
    bgColor: 'from-amber-900/80 via-orange-800/60 to-amber-900/80',
    textColor: 'text-amber-200',
    particleColor: 'bg-amber-300',
  },
  normal_end: {
    title: 'Normal End',
    subtitle: '穏やかな日々',
    bgColor: 'from-green-900/80 via-emerald-800/60 to-green-900/80',
    textColor: 'text-green-200',
    particleColor: 'bg-green-300',
  },
  bad_end_debt: {
    title: 'Bad End',
    subtitle: '借金の闇',
    bgColor: 'from-gray-900/90 via-slate-800/80 to-gray-900/90',
    textColor: 'text-gray-400',
    particleColor: 'bg-gray-500',
  },
  bad_end_bankrupt: {
    title: 'Bad End',
    subtitle: '閉店の雨',
    bgColor: 'from-gray-900/90 via-slate-800/80 to-gray-900/90',
    textColor: 'text-gray-400',
    particleColor: 'bg-gray-500',
  },
};

export function EndingScreen() {
  const { setScreen, money, glamor, affection, scenarioFlags } = useGameStore();
  const [phase, setPhase] = useState<'fadeIn' | 'showImage' | 'showTitle' | 'showDetails' | 'showButtons'>('fadeIn');
  const [endingResult, setEndingResult] = useState<EndingResult | null>(null);

  // エンディング判定
  useEffect(() => {
    const result = calculateEnding();
    setEndingResult(result);

    // フェーズの進行
    const timers = [
      setTimeout(() => setPhase('showImage'), 1000),
      setTimeout(() => setPhase('showTitle'), 2500),
      setTimeout(() => setPhase('showDetails'), 4500),
      setTimeout(() => setPhase('showButtons'), 6500),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  // エンディング計算
  const calculateEnding = (): EndingResult => {
    // トゥルーエンド判定
    const shionRouteComplete = scenarioFlags['shion_route_complete'] === true;
    const sealRestored = scenarioFlags['seal_restored'] === true;
    if (shionRouteComplete && sealRestored && money >= 500000 && glamor.level >= 6) {
      return {
        category: 'true_end',
        title: 'True End — 永遠の絆',
        subtitle: 'すべてを手に入れたあなたに、最高の祝福を',
        description: 'シオンとの絆、カフェの繁栄、そして封印の復活。すべてを成し遂げたあなたは、森の守護者シオンと共に永遠の時を歩むことになった。',
        achievements: ['シオンルート完了', '封印復活', '資金50万G超', '幻装Lv6'],
        unlocks: ['トゥルーエンドCG', 'スペシャルBGM'],
        score: 10000,
      };
    }

    // 結婚エンド判定
    const ikemenIds = ['lucia', 'kagerou', 'haruto', 'ren', 'mizuki', 'souma', 'yukito', 'riku', 'aoi', 'shion'] as const;
    const glamorRequirements: Record<string, number> = {
      lucia: 6, kagerou: 5, haruto: 0, ren: 4, mizuki: 5,
      souma: 0, yukito: 4, riku: 0, aoi: 5, shion: 6,
    };

    for (const id of ikemenIds) {
      const aff = affection[id] || 0;
      const requiredGlamor = glamorRequirements[id] || 0;
      if (aff >= 800 && glamor.level >= requiredGlamor) {
        const charData = CHARACTERS[id];
        return {
          category: 'marriage_end',
          title: `Marriage End — ${charData?.name || id}`,
          subtitle: `${charData?.name || id}との幸せな結末`,
          description: `あなたと${charData?.name || id}は、森の祝福のもとで永遠の愛を誓った。喫茶フェアリーテイルは二人の愛の象徴として、いつまでも輝き続ける。`,
          partnerId: id,
          partnerName: charData?.name || id,
          achievements: [`${charData?.name || id}好感度MAX`, `幻装Lv${glamor.level}`],
          unlocks: [`${charData?.name || id}結婚CG`],
          score: 8000 + aff,
        };
      }
    }

    // 片思いエンド判定
    for (const id of ikemenIds) {
      const aff = affection[id] || 0;
      const requiredGlamor = glamorRequirements[id] || 0;
      if (aff >= 800 && glamor.level < requiredGlamor) {
        const charData = CHARACTERS[id];
        return {
          category: 'unrequited_end',
          title: `Unrequited End — ${charData?.name || id}`,
          subtitle: '届かなかった想い',
          description: `${charData?.name || id}への想いは本物だった。けれど、身分の壁は越えられなかった。幻装レベルが足りず、二人の関係はそれ以上進むことができなかった。`,
          partnerId: id,
          partnerName: charData?.name || id,
          achievements: [`${charData?.name || id}好感度MAX`],
          unlocks: [`${charData?.name || id}片思いCG`],
          score: 5000 + aff,
        };
      }
    }

    // 経営成功エンド判定
    if (money >= 500000) {
      return {
        category: 'success_end',
        title: 'Success End — 繁盛カフェの伝説',
        subtitle: '伝説のカフェオーナー',
        description: '喫茶フェアリーテイルは森で最も有名なカフェとなった。祖母の遺志を継ぎ、あなたは立派な経営者として認められた。',
        achievements: ['資金50万G超達成'],
        unlocks: ['経営成功CG'],
        score: 6000,
      };
    }

    // Bad End（借金）判定
    if (scenarioFlags['zephyros_bad_end'] === true) {
      return {
        category: 'bad_end_debt',
        title: 'Bad End — 借金の闇',
        subtitle: '闇に飲まれたカフェ',
        description: 'ゼフィロスの甘い言葉に乗せられ、莫大な借金を背負うことになった。喫茶フェアリーテイルは闇の手に落ちてしまった。',
        achievements: [],
        unlocks: [],
        score: 0,
      };
    }

    // Bad End（破産）判定
    if (money <= 0) {
      return {
        category: 'bad_end_bankrupt',
        title: 'Bad End — 閉店の雨',
        subtitle: '雨に消えたカフェ',
        description: '経営は破綻し、喫茶フェアリーテイルは閉店を余儀なくされた。祖母の遺したカフェは、雨の中で静かにその灯を消した。',
        achievements: [],
        unlocks: [],
        score: 0,
      };
    }

    // ノーマルエンド
    return {
      category: 'normal_end',
      title: 'Normal End — 穏やかな日々',
      subtitle: '小さな幸せ',
      description: '劇的な展開はなかったけれど、喫茶フェアリーテイルは今日も穏やかに営業している。祖母の温もりを感じながら、あなたは小さな幸せを噛み締めていた。',
      achievements: ['100日間経営達成'],
      unlocks: [],
      score: 3000,
    };
  };

  if (!endingResult) return null;

  const endingStyle = ENDING_DATA[endingResult.category];
  const bgImage = (ASSETS.endings as Record<string, string>)?.[endingResult.category] || '';

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* 背景画像 */}
      <div
        className={`absolute inset-0 transition-opacity duration-[3000ms] ${
          phase !== 'fadeIn' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {bgImage && (
          <img
            src={bgImage}
            alt=""
            className="w-full h-full object-cover"
          />
        )}
        {/* オーバーレイ */}
        <div className={`absolute inset-0 bg-gradient-to-b ${endingStyle.bgColor}`} />
      </div>

      {/* パーティクル */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1.5 h-1.5 ${endingStyle.particleColor} rounded-full opacity-0`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `sparkle ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* コンテンツ */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
        {/* エンディングタイトル */}
        <div
          className={`text-center transition-all duration-[2000ms] ${
            phase === 'showTitle' || phase === 'showDetails' || phase === 'showButtons'
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h1
            className={`text-5xl font-black tracking-wider mb-4 ${endingStyle.textColor}`}
            style={{ textShadow: '0 0 30px rgba(0,0,0,0.8)' }}
          >
            {endingStyle.title}
          </h1>
          <p
            className="text-2xl text-white/80 tracking-widest mb-2"
            style={{ textShadow: '0 0 20px rgba(0,0,0,0.8)' }}
          >
            {endingStyle.subtitle}
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-24 bg-white/30" />
            <span className="text-white/40 text-sm tracking-[0.3em]">
              {endingResult.title}
            </span>
            <div className="h-px w-24 bg-white/30" />
          </div>
        </div>

        {/* パートナー画像（結婚・片思いエンド） */}
        {endingResult.partnerId && (
          <div
            className={`mt-8 transition-all duration-[2000ms] ${
              phase === 'showDetails' || phase === 'showButtons'
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            {(ASSETS.characters as Record<string, string>)?.[endingResult.partnerId] && (
              <img
                src={(ASSETS.characters as Record<string, string>)[endingResult.partnerId]}
                alt={endingResult.partnerName}
                className="h-64 object-contain drop-shadow-2xl"
                style={{ filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.4))' }}
              />
            )}
          </div>
        )}

        {/* ストーリーテキスト */}
        <div
          className={`mt-8 max-w-2xl text-center transition-all duration-[2000ms] ${
            phase === 'showDetails' || phase === 'showButtons'
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <p
            className="text-lg text-white/90 leading-relaxed"
            style={{ textShadow: '0 0 10px rgba(0,0,0,0.8)' }}
          >
            {endingResult.description}
          </p>

          {/* 実績 */}
          {endingResult.achievements.length > 0 && (
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {endingResult.achievements.map((achievement, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-sm bg-white/10 text-white/70 border border-white/20"
                >
                  {achievement}
                </span>
              ))}
            </div>
          )}

          {/* スコア */}
          <div className="mt-6">
            <span className="text-3xl font-bold text-yellow-300" style={{ textShadow: '0 0 15px rgba(255,215,0,0.5)' }}>
              SCORE: {endingResult.score.toLocaleString()}
            </span>
          </div>
        </div>

        {/* ボタン */}
        <div
          className={`mt-12 flex gap-6 transition-all duration-[2000ms] ${
            phase === 'showButtons'
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <button
            onClick={() => setScreen('title')}
            className="px-10 py-4 rounded-xl text-white font-bold text-lg
                       bg-white/10 hover:bg-white/20 border border-white/30 
                       hover:border-white/50 transition-all active:scale-95"
          >
            タイトルへ
          </button>
        </div>
      </div>
    </div>
  );
}
