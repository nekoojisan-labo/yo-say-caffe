import { useState, useEffect, useCallback, useRef } from 'react';
import { useGameStore } from '@/store';
import { ASSETS } from '@/utils/assets';
import { CHARACTERS, CharacterId } from '@/game/characters';
import type { ScenarioEvent, ChoiceOption, ScenarioEventEffects, ChoiceEffects } from '@/types';

// テキスト表示速度（ミリ秒/文字）
const TEXT_SPEEDS = {
  slow: 50,
  normal: 30,
  fast: 15,
  instant: 0,
};

// オート再生の待機時間（ミリ秒）
const AUTO_WAIT_TIME = 2000;

export function ScenarioScreen() {
  const {
    currentScenario,
    currentEventIndex,
    scenarioFlags,
    glamor,
    money,
    reputation,
    affection,
    setCurrentEventIndex,
    completeScenario,
    updateScenarioFlags,
    addMoney,
    updateReputation,
    addAffection,
    updateGlamor,
    setScreen,
  } = useGameStore();

  // 表示状態
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [isFastForward, setIsFastForward] = useState(false);
  const [textSpeed, setTextSpeed] = useState<'slow' | 'normal' | 'fast' | 'instant'>('normal');
  const [showStatus, setShowStatus] = useState(false);

  // タイマー参照
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const autoTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 現在のイベント
  const currentEvent: ScenarioEvent | null = currentScenario?.events[currentEventIndex] ?? null;

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    };
  }, []);

  // テキストのタイプライター表示
  useEffect(() => {
    if (!currentEvent?.text) {
      setDisplayedText('');
      setIsTyping(false);
      return;
    }

    const text = currentEvent.text;
    const speed = isFastForward ? 5 : TEXT_SPEEDS[textSpeed];

    // 即時表示
    if (speed === 0) {
      setDisplayedText(text);
      setIsTyping(false);
      return;
    }

    // タイプライター表示
    setIsTyping(true);
    setDisplayedText('');
    let index = 0;

    const typeNextChar = () => {
      if (index < text.length) {
        setDisplayedText(text.substring(0, index + 1));
        index++;
        typingTimerRef.current = setTimeout(typeNextChar, speed);
      } else {
        setIsTyping(false);
      }
    };

    typeNextChar();

    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    };
  }, [currentEvent, textSpeed, isFastForward]);

  // オートモード処理
  useEffect(() => {
    if (!isAutoMode || isTyping || !currentEvent) return;
    if (currentEvent.type === 'choice') return; // 選択肢では停止

    autoTimerRef.current = setTimeout(() => {
      handleNext();
    }, AUTO_WAIT_TIME);

    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    };
  }, [isAutoMode, isTyping, currentEvent]);

  // イベントIDからインデックスを取得
  const findEventIndex = useCallback((eventId: string): number => {
    if (!currentScenario) return -1;
    return currentScenario.events.findIndex(e => e.id === eventId);
  }, [currentScenario]);

  // 効果を適用
  const applyEffects = useCallback((effects?: ScenarioEventEffects) => {
    if (!effects) return;

    if (effects.money) {
      addMoney(effects.money);
    }
    if (effects.reputation) {
      updateReputation(effects.reputation);
    }
    if (effects.glamor) {
      updateGlamor({ points: glamor.points + effects.glamor });
    }
    if (effects.flag) {
      updateScenarioFlags({ [effects.flag.key]: effects.flag.value });
    }
    if (effects.flag2) {
      updateScenarioFlags({ [effects.flag2.key]: effects.flag2.value });
    }
    if (effects.flag3) {
      updateScenarioFlags({ [effects.flag3.key]: effects.flag3.value });
    }
  }, [addMoney, updateReputation, updateGlamor, updateScenarioFlags, glamor.points]);

  // 選択肢の効果を適用
  const applyChoiceEffects = useCallback((effects?: ChoiceEffects) => {
    if (!effects) return;

    if (effects.money) {
      addMoney(effects.money);
    }
    if (effects.reputation) {
      updateReputation(effects.reputation);
    }
    if (effects.glamor) {
      updateGlamor({ points: glamor.points + effects.glamor });
    }
    if (effects.affection) {
      addAffection(effects.affection.characterId, effects.affection.amount);
    }
    if (effects.flag) {
      updateScenarioFlags({ [effects.flag.key]: effects.flag.value });
    }
  }, [addMoney, updateReputation, updateGlamor, addAffection, updateScenarioFlags, glamor.points]);

  // 次のイベントへ進む
  const handleNext = useCallback(() => {
    if (!currentEvent || !currentScenario) return;

    // タイピング中ならスキップ
    if (isTyping) {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      setDisplayedText(currentEvent.text || '');
      setIsTyping(false);
      return;
    }

    // 選択肢イベントは選択を待つ
    if (currentEvent.type === 'choice') return;

    // 効果を適用
    applyEffects(currentEvent.effects);

    // 次のイベントへ
    if (currentEvent.nextEventId === null) {
      // シナリオ終了
      completeScenario(currentScenario.id);
    } else if (currentEvent.nextEventId) {
      const nextIndex = findEventIndex(currentEvent.nextEventId);
      if (nextIndex !== -1) {
        setCurrentEventIndex(nextIndex);
      } else {
        completeScenario(currentScenario.id);
      }
    } else {
      // nextEventId未設定なら次の配列要素へ
      if (currentEventIndex < currentScenario.events.length - 1) {
        setCurrentEventIndex(currentEventIndex + 1);
      } else {
        completeScenario(currentScenario.id);
      }
    }
  }, [currentEvent, currentScenario, currentEventIndex, isTyping, applyEffects, findEventIndex, setCurrentEventIndex, completeScenario]);

  // 選択肢を選んだ時
  const handleChoice = useCallback((choice: ChoiceOption) => {
    if (!currentScenario) return;

    // 効果を適用
    applyChoiceEffects(choice.effects);

    // 次のイベントへ
    const nextIndex = findEventIndex(choice.nextEventId);
    if (nextIndex !== -1) {
      setCurrentEventIndex(nextIndex);
    } else {
      completeScenario(currentScenario.id);
    }
  }, [currentScenario, applyChoiceEffects, findEventIndex, setCurrentEventIndex, completeScenario]);

  // 選択肢までスキップ
  const handleSkipToChoice = useCallback(() => {
    if (!currentScenario) return;

    for (let i = currentEventIndex; i < currentScenario.events.length; i++) {
      const event = currentScenario.events[i];

      // 効果を適用（スキップ中も）
      if (event.effects) {
        applyEffects(event.effects);
      }

      // 選択肢または終端に到達
      if (event.type === 'choice' || event.nextEventId === null) {
        setCurrentEventIndex(i);
        setIsFastForward(false);
        return;
      }
    }

    // 選択肢がなければシナリオ終了
    completeScenario(currentScenario.id);
  }, [currentScenario, currentEventIndex, applyEffects, setCurrentEventIndex, completeScenario]);

  // シナリオ背景を取得
  const getScenarioBackground = (): string => {
    const bgAssets = ASSETS.backgrounds as Record<string, string> | undefined;

    // シナリオに背景指定がある場合
    if (currentScenario?.background && bgAssets?.[currentScenario.background]) {
      return `url(${bgAssets[currentScenario.background]})`;
    }
    // イベントに背景指定がある場合
    if (currentEvent?.background && bgAssets?.[currentEvent.background]) {
      return `url(${bgAssets[currentEvent.background]})`;
    }
    // デフォルト背景
    return 'linear-gradient(to bottom, #1a1a2e, #16213e)';
  };

  // キャラクター画像を取得
  const getCharacterImage = (speaker?: string): string | null => {
    if (!speaker || speaker === 'protagonist' || speaker === 'narration') return null;

    const charAssets = ASSETS.characters as Record<string, string> | undefined;
    if (charAssets && charAssets[speaker]) {
      return charAssets[speaker];
    }
    return null;
  };

  // スピーカー名を取得
  const getSpeakerName = (): string => {
    if (!currentEvent) return '';
    if (currentEvent.speakerName) return currentEvent.speakerName;
    if (currentEvent.speaker === 'protagonist') return '主人公';
    if (currentEvent.speaker === 'narration') return '';
    if (currentEvent.speaker) {
      const char = CHARACTERS[currentEvent.speaker as CharacterId];
      return char?.name || String(currentEvent.speaker);
    }
    return '';
  };

  // フラグ条件をチェック（将来の条件分岐用）
  const checkFlagCondition = (flagKey: string, expectedValue: boolean | string | number): boolean => {
    return scenarioFlags[flagKey] === expectedValue;
  };

  // 総好感度を計算
  const getTotalAffection = (): number => {
    return Object.values(affection).reduce((sum, val) => sum + val, 0);
  };

  // シナリオがない場合
  if (!currentScenario || !currentEvent) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
        <div className="text-white mb-4">シナリオデータがありません</div>
        <button
          onClick={() => setScreen('home')}
          className="px-6 py-3 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-colors"
        >
          ホームへ戻る
        </button>
      </div>
    );
  }

  const characterImage = getCharacterImage(currentEvent.speaker);
  const speakerName = getSpeakerName();
  const isNarration = currentEvent.type === 'narration' || currentEvent.speaker === 'narration';
  const isChoice = currentEvent.type === 'choice';
  const isEffect = currentEvent.type === 'effect';
  const backgroundStyle = getScenarioBackground();

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{
        background: backgroundStyle.startsWith('url') ? undefined : backgroundStyle,
        backgroundImage: backgroundStyle.startsWith('url') ? backgroundStyle : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* 背景オーバーレイ */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5))',
        }}
      />

      {/* 背景エフェクト */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-200 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `sparkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* ヘッダー：チャプタータイトル＆コントロール */}
      <div className="relative flex justify-between items-center px-4 py-2 bg-black/30">
        <div className="text-white/60 text-sm">
          {currentScenario.title}
        </div>
        <div className="flex gap-2">
          {/* ステータス表示ボタン */}
          <button
            onClick={() => setShowStatus(!showStatus)}
            className={`px-3 py-1 text-xs rounded transition-colors ${
              showStatus
                ? 'bg-blue-600 text-white'
                : 'bg-white/20 text-white/80 hover:bg-white/30'
            }`}
          >
            STATUS
          </button>
          {/* オートボタン */}
          <button
            onClick={() => setIsAutoMode(!isAutoMode)}
            className={`px-3 py-1 text-xs rounded transition-colors ${
              isAutoMode
                ? 'bg-green-600 text-white'
                : 'bg-white/20 text-white/80 hover:bg-white/30'
            }`}
          >
            AUTO
          </button>
          {/* スキップボタン */}
          <button
            onClick={handleSkipToChoice}
            className="px-3 py-1 text-xs rounded bg-white/20 text-white/80 hover:bg-white/30 transition-colors"
          >
            SKIP
          </button>
          {/* 速度切替 */}
          <button
            onClick={() => {
              const speeds: Array<'slow' | 'normal' | 'fast' | 'instant'> = ['slow', 'normal', 'fast', 'instant'];
              const currentIndex = speeds.indexOf(textSpeed);
              setTextSpeed(speeds[(currentIndex + 1) % speeds.length]);
            }}
            className="px-3 py-1 text-xs rounded bg-white/20 text-white/80 hover:bg-white/30 transition-colors"
          >
            {textSpeed.toUpperCase()}
          </button>
        </div>
      </div>

      {/* ステータスパネル */}
      {showStatus && (
        <div
          className="relative mx-4 mt-2 p-3 rounded-lg animate-fade-in"
          style={{
            background: 'rgba(0,0,0,0.8)',
            border: '1px solid rgba(255,215,0,0.3)',
          }}
        >
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-yellow-300">資金:</span>
              <span className="text-white">{money.toLocaleString()}G</span>
            </div>
            <div className="flex justify-between">
              <span className="text-yellow-300">評判:</span>
              <span className="text-white">{reputation}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-yellow-300">幻装Lv:</span>
              <span className="text-white">{glamor.level}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-yellow-300">総好感度:</span>
              <span className="text-white">{getTotalAffection()}</span>
            </div>
          </div>
          {/* 主要フラグ表示（デバッグ用） */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-2 pt-2 border-t border-white/20 text-xs text-white/50">
              <div>フラグ: {Object.entries(scenarioFlags).filter(([, v]) => v === true).map(([k]) => k).join(', ') || 'なし'}</div>
            </div>
          )}
        </div>
      )}

        {/* キャラクター表示エリア */}
      <div className="relative flex-1 flex items-end justify-between px-8 pb-4">
        {/* 左側: 話しているイケメン/特殊キャラ */}
        <div className="flex-1 flex justify-start items-end">
          {characterImage && currentEvent.speaker !== 'protagonist' && (
            <div className="relative animate-fade-in">
              <img
                src={characterImage}
                alt={speakerName}
                className="h-80 object-contain drop-shadow-2xl"
                style={{
                  filter: currentEvent.speaker === (currentEvent.speaker)
                    ? 'drop-shadow(0 0 20px rgba(255,255,255,0.3)) brightness(1.05)'
                    : 'drop-shadow(0 0 10px rgba(0,0,0,0.3)) brightness(0.7)',
                }}
              />
              {/* キャラ名タグ */}
              <div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap"
                style={{
                  background: 'rgba(0,0,0,0.6)',
                  border: '1px solid rgba(255,215,0,0.4)',
                  color: 'rgba(255,215,0,0.9)',
                }}
              >
                {speakerName}
              </div>
            </div>
          )}
        </div>

        {/* 中央: エフェクト表示 */}
        {isEffect && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="text-center p-8 rounded-xl animate-pulse"
              style={{
                background: 'linear-gradient(135deg, rgba(255,215,0,0.3), rgba(255,165,0,0.3))',
                border: '2px solid rgba(255,215,0,0.5)',
                boxShadow: '0 0 40px rgba(255,215,0,0.3)',
              }}
            >
              <p className="text-2xl text-yellow-300 font-bold whitespace-pre-wrap">
                {displayedText}
              </p>
            </div>
          </div>
        )}

        {/* 右側: 主人公 */}
        <div className="flex-1 flex justify-end items-end">
          {currentEvent.speaker && currentEvent.speaker !== 'narration' && currentEvent.type !== 'effect' && (
            <div className="relative animate-fade-in">
              <img
                src={ASSETS.mainChara[`lv${glamor.level}`] || ASSETS.mainChara.default}
                alt="主人公"
                className="h-72 object-contain drop-shadow-2xl"
                style={{
                  filter: currentEvent.speaker === 'protagonist'
                    ? 'drop-shadow(0 0 20px rgba(255,255,255,0.3)) brightness(1.05)'
                    : 'drop-shadow(0 0 10px rgba(0,0,0,0.3)) brightness(0.7)',
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* テキストボックス */}
      {!isEffect && (
        <div
          className="relative mx-4 mb-4 rounded-xl overflow-hidden"
          style={{
            background: isNarration
              ? 'linear-gradient(135deg, rgba(0,0,0,0.9), rgba(20,20,40,0.9))'
              : 'linear-gradient(135deg, rgba(30,30,60,0.95), rgba(50,50,80,0.95))',
            border: '2px solid rgba(255,215,0,0.3)',
            boxShadow: '0 0 30px rgba(255,215,0,0.1)',
          }}
          onClick={!isChoice ? handleNext : undefined}
        >
          {/* スピーカー名 */}
          {speakerName && (
            <div
              className="px-4 py-2 text-yellow-300 font-bold"
              style={{
                background: 'linear-gradient(90deg, rgba(255,215,0,0.2), transparent)',
                borderBottom: '1px solid rgba(255,215,0,0.2)',
              }}
            >
              {speakerName}
            </div>
          )}

          {/* テキスト本文 */}
          <div className="p-4 min-h-[120px]">
            <p
              className={`text-lg leading-relaxed whitespace-pre-wrap ${
                isNarration ? 'text-gray-300 italic' : 'text-white'
              }`}
            >
              {displayedText}
              {isTyping && <span className="animate-pulse">▌</span>}
            </p>
          </div>

          {/* 選択肢 */}
          {isChoice && currentEvent.choices && !isTyping && (
            <div className="p-4 space-y-2 border-t border-white/10">
              {currentEvent.choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => handleChoice(choice)}
                  className="w-full p-3 text-left rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(90deg, rgba(100,100,150,0.5), rgba(80,80,120,0.5))',
                    border: '1px solid rgba(255,215,0,0.3)',
                  }}
                >
                  <span className="text-yellow-300 mr-2">▶</span>
                  <span className="text-white">{choice.text}</span>
                </button>
              ))}
            </div>
          )}

          {/* 進行インジケーター */}
          {!isChoice && !isTyping && (
            <div className="text-center pb-2 text-yellow-300/60 text-sm animate-pulse">
              ▼ タップして続ける
            </div>
          )}
        </div>
      )}

      {/* エフェクトタイプの場合の進行ボタン */}
      {isEffect && !isTyping && (
        <div className="relative mx-4 mb-4 text-center">
          <button
            onClick={handleNext}
            className="px-8 py-3 rounded-xl text-yellow-300 transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, rgba(50,50,80,0.9), rgba(30,30,60,0.9))',
              border: '2px solid rgba(255,215,0,0.5)',
            }}
          >
            続ける
          </button>
        </div>
      )}

      {/* デバッグ情報（開発時のみ） */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute bottom-20 left-4 text-xs text-white/30">
          Event: {currentEventIndex + 1}/{currentScenario.events.length} | ID: {currentEvent.id}
          {checkFlagCondition('debug', true) && ' | DEBUG MODE'}
        </div>
      )}
    </div>
  );
}
