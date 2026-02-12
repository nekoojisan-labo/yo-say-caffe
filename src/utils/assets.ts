// 背景画像
import opening from '@/assets/images/characters/opening.webp';
import titleBg from '@/assets/images/title_bg.webp';
import cafeMorning from '@/assets/images/cafemorning.webp';
import cafeEvening from '@/assets/images/cafeevning.webp';
import cafeNight from '@/assets/images/cafenight.webp';
import shiire from '@/assets/images/shiire.webp';
import kekka from '@/assets/images/kekka.webp';
import dotCustomers from '@/assets/images/dot_customers.webp';
import forestPath from '@/assets/images/forest_path.webp';
import cafeMystic from '@/assets/images/cafe_mystic.webp';

// ロゴ
import logoJa from '@/assets/images/logo_ja.webp';
import logoEn from '@/assets/images/logo_en.webp';
import subtitle from '@/assets/images/subtitle.webp';

// エンディング
import endingTrue from '@/assets/images/ending_true.webp';
import endingMarriage from '@/assets/images/ending_marriage.webp';
import endingUnrequited from '@/assets/images/ending_unrequited.webp';
import endingSuccess from '@/assets/images/ending_success.webp';
import endingNormal from '@/assets/images/ending_normal.webp';
import endingBad from '@/assets/images/ending_bad.webp';

// キャラクター
import aoi from '@/assets/images/characters/aoi.webp';
import kagerou from '@/assets/images/characters/kagerou.webp';
import shion from '@/assets/images/characters/shion.webp';
import soma from '@/assets/images/characters/souma.webp';
import haruto from '@/assets/images/characters/haruto.webp';
import mizuki from '@/assets/images/characters/mizuki.webp';
import yukito from '@/assets/images/characters/yukito.webp';
import riku from '@/assets/images/characters/riku.webp';
import lucia from '@/assets/images/characters/lucia.webp';
import ren from '@/assets/images/characters/ren.webp';
import zephyros from '@/assets/images/characters/zephyros.webp';
import rosa from '@/assets/images/characters/rosa.webp';

// 主人公（幻装レベル別）
import mcL0 from '@/assets/images/characters/mainchara/mc_L0.webp';
import mcL1 from '@/assets/images/characters/mainchara/mc_L1.webp';
import mcL2 from '@/assets/images/characters/mainchara/mc_L2.webp';
import mcL3 from '@/assets/images/characters/mainchara/mc_L3.webp';
import mcL4 from '@/assets/images/characters/mainchara/mc_L4.webp';
import mcL5 from '@/assets/images/characters/mainchara/mc_L5.webp';
import mcL6 from '@/assets/images/characters/mainchara/mc_L6.webp';

export const ASSETS = {
  // 背景
  opening,
  titleBg,
  backgrounds: {
    cafeMorning,
    cafeEvening,
    cafeNight,
    shiire,
    kekka,
    forestPath,
    cafeMystic,
  },

  // ロゴ
  logoJa,
  logoEn,
  subtitle,

  // エンディング
  endings: {
    true_end: endingTrue,
    marriage_end: endingMarriage,
    unrequited_end: endingUnrequited,
    success_end: endingSuccess,
    normal_end: endingNormal,
    bad_end_debt: endingBad,
    bad_end_bankrupt: endingBad,
  } as Record<string, string>,

  // キャラクター
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
    zephyros,
    rosa,
  } as Record<string, string>,

  // 主人公
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

  // ドットキャラ
  dotCustomers,
};