// BGMトラック定義
export const BGM_TRACKS = {
  title: 'title.mp3',
  home: 'home.mp3',
  cafe_morning: 'cafe_morning.mp3',
  cafe_busy: 'cafe_busy.mp3',
  cafe_evening: 'cafe_evening.mp3',
  result_good: 'result_good.mp3',
  result_bad: 'result_bad.mp3',
  romance: 'romance.mp3',
  romance_climax: 'romance_climax.mp3',
  gallery: 'gallery.mp3',
} as const;

// SEサウンド定義
export const SE_SOUNDS = {
  click: 'click.mp3',
  cancel: 'cancel.mp3',
  coin: 'coin.mp3',
  register: 'register.mp3',
  door_bell: 'door_bell.mp3',
  level_up: 'level_up.mp3',
  affection_up: 'affection_up.mp3',
  event_start: 'event_start.mp3',
  unlock: 'unlock.mp3',
  notification: 'notification.mp3',
  success: 'success.mp3',
  error: 'error.mp3',
  typing: 'typing.mp3',
} as const;

// 型定義
export type BGMTrackId = keyof typeof BGM_TRACKS;
export type SESoundId = keyof typeof SE_SOUNDS;

// オーディオパスを取得
export function getBGMPath(trackId: BGMTrackId): string {
  return `assets/audio/bgm/${BGM_TRACKS[trackId]}`;
}

export function getSEPath(soundId: SESoundId): string {
  return `assets/audio/se/${SE_SOUNDS[soundId]}`;
}

// 時間帯に応じたBGMを取得
export function getCafeBGMForTime(currentTime: number): BGMTrackId {
  // currentTime は分単位（9:00 = 540）
  const hour = Math.floor(currentTime / 60);

  if (hour < 12) {
    return 'cafe_morning';
  } else if (hour < 14) {
    return 'cafe_busy'; // ランチタイム
  } else if (hour < 18) {
    return 'cafe_morning'; // 午後は朝と同じ
  } else {
    return 'cafe_evening';
  }
}
