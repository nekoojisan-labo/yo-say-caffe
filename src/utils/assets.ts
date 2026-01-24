// Assets mapping to handle Japanese filenames
import opening from '@/assets/images/characters/オープニング画面.jpg';
import logoJa from '@/assets/images/logo_ja.png';
import logoEn from '@/assets/images/logo_en.png';
import subtitle from '@/assets/images/subtitle.png';
import aoi from '@/assets/images/characters/アオイ（Aoi）星（Star）.jpg';
import kagerou from '@/assets/images/characters/カゲロウ（Kagerou）闇（Dark）.jpg';
import shion from '@/assets/images/characters/シオン（Shion）森（Forest）.jpg';
import soma from '@/assets/images/characters/ソウマ（Souma）雷（Thunder）.jpg';
import haruto from '@/assets/images/characters/ハルト（Haruto）風（Wind）.jpg';
import mizuki from '@/assets/images/characters/ミズキ（Mizuki）水（Water）.jpg';
import yukito from '@/assets/images/characters/ユキト（Yukito）氷（Ice）.jpg';
import riku from '@/assets/images/characters/リク（Riku）土（Earth）.jpg';
import lucia from '@/assets/images/characters/ルシア（Lucia）光（Light）.jpg';
import ren from '@/assets/images/characters/レン（Ren）炎（Fire）.jpg';

export const ASSETS = {
    opening,
    logoJa,
    logoEn,
    subtitle,
    characters: {
        aoi,
        kagerou,
        shion,
        soma,
        haruto,
        mizuki,
        yukito,
        riku,
        lucia,
        ren,
    } as Record<string, string>,
};
