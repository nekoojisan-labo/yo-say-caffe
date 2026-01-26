import opening from '@/assets/images/characters/オープニング画面.jpg';
import logoJa from '@/assets/images/logo_ja.png';
import logoEn from '@/assets/images/logo_en.png';
import subtitle from '@/assets/images/subtitle.png';
import aoi from '@/assets/images/characters/aoi.jpg';
import kagerou from '@/assets/images/characters/kagerou.jpg';
import shion from '@/assets/images/characters/shion.jpg';
import soma from '@/assets/images/characters/souma.jpg';
import haruto from '@/assets/images/characters/haruto.jpg';
import mizuki from '@/assets/images/characters/mizuki.jpg';
import yukito from '@/assets/images/characters/yukito.jpg';
import riku from '@/assets/images/characters/riku.jpg';
import lucia from '@/assets/images/characters/lucia.jpg';
import ren from '@/assets/images/characters/ren.jpg';

// Main Character
import mcL0 from '@/assets/images/characters/mainchara/mc_L0.png';
import mcL1 from '@/assets/images/characters/mainchara/mc_L1.png';
import mcL2 from '@/assets/images/characters/mainchara/mc_L2.png';
import mcL3 from '@/assets/images/characters/mainchara/mc_L3.png';
import mcL4 from '@/assets/images/characters/mainchara/mc_L4.png';
import mcL5 from '@/assets/images/characters/mainchara/mc_L5.png';
import mcL6 from '@/assets/images/characters/mainchara/mc_L6.png';

export const ASSETS = {
    opening,
    logoJa,
    logoEn,
    subtitle,
    characters: {
        aoi,
        kagerou,
        shion,
        souma: soma,
        haruto,
        mizuki,
        yukito,
        riku,
        lucia,
        ren,
    } as Record<string, string>,
    mainChara: {
        default: mcL3,
        lv0: mcL0,
        lv1: mcL1,
        lv2: mcL2,
        lv3: mcL3,
        lv4: mcL4,
        lv5: mcL5,
        lv6: mcL6,
    } as Record<string, string>,
};
