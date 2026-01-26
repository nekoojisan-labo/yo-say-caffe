import { ASSETS } from './assets';

export interface VisualSet {
    setId: string;
    parts: Record<string, string>;
}

/**
 * 幻装レベルから主人公のビジュアルセットを解決する
 */
export function resolveProtagonistVisual(level: number): VisualSet {
    const setId = `mc_L${level}`;

    // 各レベルに対応する画像をASSETSから取得
    let fullImagePath = ASSETS.mainChara.default;

    switch (level) {
        case 0:
            fullImagePath = ASSETS.mainChara.lv0;
            break;
        case 1:
            fullImagePath = ASSETS.mainChara.lv1;
            break;
        case 2:
            fullImagePath = ASSETS.mainChara.lv2;
            break;
        case 4:
            fullImagePath = ASSETS.mainChara.lv4;
            break;
        case 5:
            fullImagePath = ASSETS.mainChara.lv5;
            break;
        case 6:
            fullImagePath = ASSETS.mainChara.lv6;
            break;
        case 3:
        default:
            fullImagePath = ASSETS.mainChara.default;
            break;
    }

    return {
        setId,
        parts: {
            full: fullImagePath,
            // パーツ分けされているわけではないので、全て同じ画像か空文字を返す
            hair: "",
            outfit: "",
            makeup: "",
            accessory: "",
            aura: "",
        }
    };
}

/**
 * フォールバック用ビジュアル
 */
export function getFallbackVisual(): VisualSet {
    return resolveProtagonistVisual(3); // 標準のL03をフォールバックに
}
