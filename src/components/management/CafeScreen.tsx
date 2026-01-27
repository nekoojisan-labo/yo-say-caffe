import { useEffect, useCallback } from 'react';
import { useGameStore, useCafeStore, useInventoryStore, useIkemenStore } from '@/store';
import { Header } from '@/components/common';
import { CafeView } from './CafeView';
import { TimeController } from './TimeController';
import { DailySummaryMini } from './DailySummaryMini';
import { useBusinessDay } from '@/hooks/useBusinessDay';
import { useAudio } from '@/hooks';
import { getCafeBGMForTime } from '@/data/audioData';

export function CafeScreen() {
  const { setScreen, day } = useGameStore();
  const {
    currentTime,
    isOpen,
    isPaused,
    speed,
    mode,
    startDay,
    endDay,
    setSpeed,
    setMode,
    togglePause,
  } = useCafeStore();

  const { playBGM } = useAudio();

  // 営業ロジック
  const { handleEndDay } = useBusinessDay();

  // 席数を取得（所有している席の数）
  const seatCount = 3; // 初期は3席

  // 営業開始
  useEffect(() => {
    if (!isOpen) {
      startDay(seatCount);
    }
  }, []);

  // 時間帯に応じてBGM変更
  useEffect(() => {
    if (isOpen && !isPaused) {
      const bgmTrack = getCafeBGMForTime(currentTime);
      playBGM(bgmTrack);
    }
  }, [currentTime, isOpen, isPaused, playBGM]);

  // 営業終了処理
  const handleEndDayClick = useCallback(() => {
    const result = endDay();
    handleEndDay({ ...result, day });
    setScreen('result');
  }, [endDay, handleEndDay, day, setScreen]);

  // 発注画面へ
  const handleOrderClick = useCallback(() => {
    togglePause(); // 一時停止
    setScreen('order');
  }, [togglePause, setScreen]);

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-fairy-pink-50 to-fairy-lavender-100">
      {/* ヘッダー */}
      <Header />

      {/* メインエリア */}
      <div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">
        {/* カフェビュー */}
        <div className="flex-1 relative">
          <CafeView />
        </div>

        {/* 本日のサマリー */}
        <DailySummaryMini />
      </div>

      {/* コントロールエリア */}
      <div className="bg-white/90 backdrop-blur-sm border-t border-fairy-pink-100 p-4">
        <TimeController
          currentTime={currentTime}
          isOpen={isOpen}
          isPaused={isPaused}
          speed={speed}
          mode={mode}
          onTogglePause={togglePause}
          onSetSpeed={setSpeed}
          onSetMode={setMode}
          onOrder={handleOrderClick}
          onEndDay={handleEndDayClick}
        />
      </div>
    </div>
  );
}
