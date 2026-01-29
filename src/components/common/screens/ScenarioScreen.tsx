import { useState, useEffect } from 'react';
import { useGameStore } from '@/store';
import { ScenarioChapter, ScenarioEvent, ChoiceOption } from '@/game/scenario';
import { ASSETS } from '@/utils/assets';
import { CHARACTERS, CharacterId } from '@/game/characters';

interface ScenarioScreenProps {
  chapter: ScenarioChapter;
  onComplete: () => void;
}

export function ScenarioScreen({ chapter, onComplete }: ScenarioScreenProps) {
  const { addMoney, updateReputation, updateFlags } = useGameStore();
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const events = chapter.events;
  const currentEvent = events[currentEventIndex];
  
  // テキストのタイプライター効果
  useEffect(() => {
    if (!currentEvent?.text) return;
    
    setIsTyping(true);
    setDisplayedText('');
    let index = 0;
    const text = currentEvent.text;
    
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(prev => prev + text[index]);
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 30);
    
    return () => clearInterval(timer);
  }, [currentEvent]);
  
  // イベントIDからインデックスを取得
  const findEventIndex = (eventId: string): number => {
    return events.findIndex(e => e.id === eventId);
  };
  
  // 次のイベントへ進む
  const handleNext = () => {
    if (isTyping) {
      // タイピング中ならスキップ
      setDisplayedText(currentEvent.text || '');
      setIsTyping(false);
      return;
    }
    
    // 効果を適用
    if (currentEvent.effects) {
      if (currentEvent.effects.money) addMoney(currentEvent.effects.money);
      if (currentEvent.effects.reputation) updateReputation(currentEvent.effects.reputation);
      if (currentEvent.effects.flag) {
        updateFlags({ [currentEvent.effects.flag.key]: currentEvent.effects.flag.value });
      }
    }
    
    // 次のイベントへ
    if (currentEvent.nextEventId === null) {
      onComplete();
    } else if (currentEvent.nextEventId) {
      const nextIndex = findEventIndex(currentEvent.nextEventId);
      if (nextIndex !== -1) {
        setCurrentEventIndex(nextIndex);
      } else {
        onComplete();
      }
    } else {
      // nextEventId未設定なら次の配列要素へ
      if (currentEventIndex < events.length - 1) {
        setCurrentEventIndex(currentEventIndex + 1);
      } else {
        onComplete();
      }
    }
  };
  
  // 選択肢を選んだとき
  const handleChoice = (choice: ChoiceOption) => {
    // 効果を適用
    if (choice.effects) {
      if (choice.effects.money) addMoney(choice.effects.money);
      if (choice.effects.reputation) updateReputation(choice.effects.reputation);
      if (choice.effects.flag) {
        updateFlags({ [choice.effects.flag.key]: choice.effects.flag.value });
      }
    }
    
    // 次のイベントへ
    const nextIndex = findEventIndex(choice.nextEventId);
    if (nextIndex !== -1) {
      setCurrentEventIndex(nextIndex);
    } else {
      onComplete();
    }
  };
  
  // キャラクター画像を取得
  const getCharacterImage = (speaker?: string): string | null => {
    if (!speaker || speaker === 'protagonist' || speaker === 'narration') return null;
    const charAssets = ASSETS.characters as Record<string, string>;
    return charAssets[speaker] || null;
  };
  
  // スピーカー名を取得
  const getSpeakerName = (): string => {
    if (currentEvent.speakerName) return currentEvent.speakerName;
    if (currentEvent.speaker === 'protagonist') return '主人公';
    if (currentEvent.speaker === 'narration') return '';
    if (currentEvent.speaker) {
      const char = CHARACTERS[currentEvent.speaker as CharacterId];
      return char?.name || currentEvent.speaker;
    }
    return '';
  };
  
  const characterImage = getCharacterImage(currentEvent.speaker);
  const speakerName = getSpeakerName();
  const isNarration = currentEvent.type === 'narration' || currentEvent.speaker === 'narration';
  
  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col"
      style={{
        background: 'linear-gradient(to bottom, #1a1a2e, #16213e)',
      }}
    >
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
      
      {/* チャプタータイトル */}
      <div className="absolute top-4 left-4 text-white/60 text-sm">
        {chapter.title}
      </div>
      
      {/* キャラクター表示エリア */}
      <div className="flex-1 flex items-end justify-center pb-4 relative">
        {characterImage && (
          <div className="relative">
            <img 
              src={characterImage}
              alt={speakerName}
              className="h-80 object-contain drop-shadow-2xl"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.3))',
              }}
            />
          </div>
        )}
      </div>
      
      {/* テキストボックス */}
      <div 
        className="mx-4 mb-4 rounded-xl overflow-hidden"
        style={{
          background: isNarration 
            ? 'linear-gradient(135deg, rgba(0,0,0,0.9), rgba(20,20,40,0.9))'
            : 'linear-gradient(135deg, rgba(30,30,60,0.95), rgba(50,50,80,0.95))',
          border: '2px solid rgba(255,215,0,0.3)',
          boxShadow: '0 0 30px rgba(255,215,0,0.1)',
        }}
        onClick={currentEvent.type !== 'choice' ? handleNext : undefined}
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
          <p className={`text-lg leading-relaxed whitespace-pre-wrap ${isNarration ? 'text-gray-300 italic' : 'text-white'}`}>
            {displayedText}
            {isTyping && <span className="animate-pulse">▌</span>}
          </p>
        </div>
        
        {/* 選択肢 */}
        {currentEvent.type === 'choice' && currentEvent.choices && !isTyping && (
          <div className="p-4 space-y-2 border-t border-white/10">
            {currentEvent.choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleChoice(choice)}
                className="w-full p-3 text-left rounded-lg transition-all duration-200 hover:scale-[1.02]"
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
        {currentEvent.type !== 'choice' && !isTyping && (
          <div className="text-center pb-2 text-yellow-300/60 text-sm animate-pulse">
            ▼ タップして続ける
          </div>
        )}
      </div>
    </div>
  );
}
