/**
 * 好感度(affection) 0..500+
 * ♡Lv0: 0-49
 * ♡Lv1: 50-149
 * ♡Lv2: 150-279
 * ♡Lv3: 280-369
 * ♡Lv4: 370-449
 * ♡Lv5: 450+
 */
export function getHeartLevel(affection: number): number {
    if (affection >= 450) return 5;
    if (affection >= 370) return 4;
    if (affection >= 280) return 3;
    if (affection >= 150) return 2;
    if (affection >= 50) return 1;
    return 0;
}

export function getHeartIcon(level: number): string {
    const icons = ['🤍', '❤️', '💖', '💝', '✨❤️✨', '🔥❤️🔥'];
    return icons[level] || '🤍';
}

export const HEART_THRESHOLDS = {
    LV1: 50,
    LV2: 150,
    LV3: 280,
    LV4: 370,
    LV5: 450,
};
