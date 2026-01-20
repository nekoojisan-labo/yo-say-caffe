import { useCallback, useEffect, useRef } from 'react';
import { useAudioStore } from '@/store';
import { BGM_TRACKS, SE_SOUNDS, getBGMPath, getSEPath } from '@/data/audioData';
import type { BGMTrackId, SESoundId } from '@/data/audioData';

// オーディオマネージャー（シングルトン）
class AudioManager {
  private static instance: AudioManager;
  private bgmAudio: HTMLAudioElement | null = null;
  private currentBGM: BGMTrackId | null = null;
  private seCache: Map<string, HTMLAudioElement> = new Map();

  private constructor() {}

  static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  // BGM再生
  playBGM(
    trackId: BGMTrackId,
    options: { fadeIn?: number; loop?: boolean; volume?: number } = {}
  ): void {
    const { fadeIn = 0, loop = true, volume = 0.7 } = options;

    // 同じBGMが再生中なら何もしない
    if (this.currentBGM === trackId && this.bgmAudio && !this.bgmAudio.paused) {
      return;
    }

    // 既存のBGMを停止
    this.stopBGM();

    const path = getBGMPath(trackId);
    this.bgmAudio = new Audio(path);
    this.bgmAudio.loop = loop;
    this.currentBGM = trackId;

    // フェードイン
    if (fadeIn > 0) {
      this.bgmAudio.volume = 0;
      this.bgmAudio.play().catch(() => {
        console.log(`BGM not found: ${path}`);
      });

      const startTime = Date.now();
      const fadeInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / fadeIn, 1);
        if (this.bgmAudio) {
          this.bgmAudio.volume = progress * volume;
        }
        if (progress >= 1) {
          clearInterval(fadeInterval);
        }
      }, 16);
    } else {
      this.bgmAudio.volume = volume;
      this.bgmAudio.play().catch(() => {
        console.log(`BGM not found: ${path}`);
      });
    }
  }

  // BGM停止
  stopBGM(fadeOut: number = 0): void {
    if (!this.bgmAudio) return;

    if (fadeOut > 0) {
      const audio = this.bgmAudio;
      const startVolume = audio.volume;
      const startTime = Date.now();

      const fadeInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / fadeOut, 1);
        audio.volume = startVolume * (1 - progress);

        if (progress >= 1) {
          clearInterval(fadeInterval);
          audio.pause();
          audio.currentTime = 0;
        }
      }, 16);
    } else {
      this.bgmAudio.pause();
      this.bgmAudio.currentTime = 0;
    }

    this.currentBGM = null;
  }

  // BGM一時停止
  pauseBGM(): void {
    if (this.bgmAudio) {
      this.bgmAudio.pause();
    }
  }

  // BGM再開
  resumeBGM(): void {
    if (this.bgmAudio) {
      this.bgmAudio.play().catch(() => {});
    }
  }

  // BGM音量設定
  setBGMVolume(volume: number): void {
    if (this.bgmAudio) {
      this.bgmAudio.volume = Math.max(0, Math.min(1, volume));
    }
  }

  // SE再生
  playSE(soundId: SESoundId, volume: number = 0.9): void {
    const path = getSEPath(soundId);

    // キャッシュから取得または新規作成
    let audio = this.seCache.get(path);
    if (!audio) {
      audio = new Audio(path);
      this.seCache.set(path, audio);
    }

    // 再生中なら巻き戻す
    audio.currentTime = 0;
    audio.volume = volume;
    audio.play().catch(() => {
      console.log(`SE not found: ${path}`);
    });
  }

  // SE音量設定（全体）
  setSEVolume(volume: number): void {
    this.seCache.forEach((audio) => {
      audio.volume = Math.max(0, Math.min(1, volume));
    });
  }

  // 現在のBGMを取得
  getCurrentBGM(): BGMTrackId | null {
    return this.currentBGM;
  }
}

// オーディオフック
export function useAudio() {
  const audioManager = useRef(AudioManager.getInstance());
  const { bgmVolume, seVolume, bgmMuted, seMuted } = useAudioStore();

  // BGM再生
  const playBGM = useCallback(
    (trackId: BGMTrackId, options?: { fadeIn?: number; loop?: boolean }) => {
      if (bgmMuted) return;
      audioManager.current.playBGM(trackId, { ...options, volume: bgmVolume });
    },
    [bgmMuted, bgmVolume]
  );

  // BGM停止
  const stopBGM = useCallback((fadeOut?: number) => {
    audioManager.current.stopBGM(fadeOut);
  }, []);

  // BGM一時停止
  const pauseBGM = useCallback(() => {
    audioManager.current.pauseBGM();
  }, []);

  // BGM再開
  const resumeBGM = useCallback(() => {
    if (!bgmMuted) {
      audioManager.current.resumeBGM();
    }
  }, [bgmMuted]);

  // SE再生
  const playSE = useCallback(
    (soundId: SESoundId) => {
      if (seMuted) return;
      audioManager.current.playSE(soundId, seVolume);
    },
    [seMuted, seVolume]
  );

  // 音量変更の反映
  useEffect(() => {
    audioManager.current.setBGMVolume(bgmMuted ? 0 : bgmVolume);
  }, [bgmVolume, bgmMuted]);

  useEffect(() => {
    audioManager.current.setSEVolume(seMuted ? 0 : seVolume);
  }, [seVolume, seMuted]);

  return {
    playBGM,
    stopBGM,
    pauseBGM,
    resumeBGM,
    playSE,
    getCurrentBGM: () => audioManager.current.getCurrentBGM(),
  };
}

// ボタンクリック時にSE再生するラッパー
export function useButtonSE() {
  const { playSE } = useAudio();

  const playClickSE = useCallback(() => {
    playSE('click');
  }, [playSE]);

  const playCancelSE = useCallback(() => {
    playSE('cancel');
  }, [playSE]);

  return { playClickSE, playCancelSE };
}

// 画面遷移時のBGM管理
export function useScreenBGM(trackId: BGMTrackId | null) {
  const { playBGM, stopBGM } = useAudio();

  useEffect(() => {
    if (trackId) {
      playBGM(trackId, { fadeIn: 500 });
    }

    return () => {
      // コンポーネントがアンマウントされたときは停止しない
      // 別の画面で新しいBGMが再生される
    };
  }, [trackId, playBGM]);
}
