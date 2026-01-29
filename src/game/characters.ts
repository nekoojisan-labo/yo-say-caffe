// 恋愛対象イケメンのID
export type IkemenId =
    | 'lucia'
    | 'kagerou'
    | 'haruto'
    | 'ren'
    | 'mizuki'
    | 'souma'
    | 'yukito'
    | 'riku'
    | 'aoi'
    | 'shion';

// 特殊キャラ（恋愛対象外）のID
export type SpecialCharacterId = 'zephyros' | 'rosa';

// 全キャラクターID
export type CharacterId = IkemenId | SpecialCharacterId;

export interface CharacterBase {
    id: CharacterId;
    name: string;
    attribute: string;
    icon: string;
    role: string;
    description: string;
    isRomanceable: boolean; // 恋愛対象かどうか
}

// イケメンキャラクター（恋愛対象）
export const IKEMEN_CHARACTERS: Record<IkemenId, CharacterBase> = {
    lucia: {
        id: 'lucia',
        name: 'ルシア',
        attribute: '光',
        icon: '✨',
        role: 'Holy Prince',
        description: '眩い光を纏う王立騎士団の若きリーダー。誠実で優雅な振る舞いは、多くの女性客を虜にする。',
        isRomanceable: true,
    },
    kagerou: {
        id: 'kagerou',
        name: 'カゲロウ',
        attribute: '闘',
        icon: '🌑',
        role: 'Silent Shadow',
        description: '影に潜む謎多き忍び。無口だが、時折見せる鋭い眼差しと優しさに中毒者が続出している。',
        isRomanceable: true,
    },
    haruto: {
        id: 'haruto',
        name: 'ハルト',
        attribute: '風',
        icon: '🍃',
        role: 'Freedom Wings',
        description: '風のように自由奔放な吟遊詩人。彼の奏でる調べは疲れた心を癒し、店内に爽やかな風を運ぶ。',
        isRomanceable: true,
    },
    ren: {
        id: 'ren',
        name: 'レン',
        attribute: '炎',
        icon: '🔥',
        role: 'Burning Passion',
        description: '情熱的な若き料理人。熱血漢で真っ直ぐな性格は、周囲を熱く活気づかせる。',
        isRomanceable: true,
    },
    mizuki: {
        id: 'mizuki',
        name: 'ミズキ',
        attribute: '水',
        icon: '💧',
        role: 'Calm Stream',
        description: '冷静沈着で知的な魔導士。静かな佇まいと透き通るような美しさがカフェの品格を高めている。',
        isRomanceable: true,
    },
    souma: {
        id: 'souma',
        name: 'ソウマ',
        attribute: '雷',
        icon: '⚡',
        role: 'Flash Beast',
        description: '野性味溢れる雷の戦士。粗野に見えるが、動物や子供には優しい一面を持つ。',
        isRomanceable: true,
    },
    yukito: {
        id: 'yukito',
        name: 'ユキト',
        attribute: '氷',
        icon: '❄️',
        role: 'Ice Duke',
        description: '孤高の冷徹公爵。氷のように冷たい態度の裏に、深い孤独を抱えている。',
        isRomanceable: true,
    },
    riku: {
        id: 'riku',
        name: 'リク',
        attribute: '土',
        icon: '⛰️',
        role: 'Solid Guardian',
        description: '包容力のある巨漢の鍛冶師。誰よりも頼りになる、街の守り手。',
        isRomanceable: true,
    },
    aoi: {
        id: 'aoi',
        name: 'アオイ',
        attribute: '星',
        icon: '⭐',
        role: 'Starlight Seer',
        description: '未来を見通す謎の少年。幼い外見に反して、深遠な知識を持つ。',
        isRomanceable: true,
    },
    shion: {
        id: 'shion',
        name: 'シオン',
        attribute: '森',
        icon: '🌳',
        role: 'Forest Sage',
        description: '自然を愛する森の賢者。主人公のカフェ経営を導く、頼れるアドバイザー。',
        isRomanceable: true,
    },
};

// 特殊キャラクター（恋愛対象外）
export const SPECIAL_CHARACTERS: Record<SpecialCharacterId, CharacterBase> = {
    zephyros: {
        id: 'zephyros',
        name: 'ゼフィロス',
        attribute: '金',
        icon: '💰',
        role: 'Golden Tyrant',
        description: '街で幅を利かせる成金妖精。紳士的な仮面の下に冷酷な本性を隠す。高利貸しと不正契約で富を築いた悪徳商人。',
        isRomanceable: false,
    },
    rosa: {
        id: 'rosa',
        name: 'マッスル・ローザ',
        attribute: '花',
        icon: '🌹',
        role: 'Flower Guardian',
        description: '元冒険者の花屋店主。筋肉と優しさで主人公を守る姐御肌。ゼフィロスの悪事を知る数少ない人物。',
        isRomanceable: false,
    },
};

// 全キャラクター統合
export const CHARACTERS: Record<CharacterId, CharacterBase> = {
    ...IKEMEN_CHARACTERS,
    ...SPECIAL_CHARACTERS,
};

// イケメンリスト（恋愛・来店対象）
export const IKEMEN_LIST = Object.values(IKEMEN_CHARACTERS);

// 特殊キャラリスト
export const SPECIAL_CHARACTER_LIST = Object.values(SPECIAL_CHARACTERS);

// 全キャラリスト
export const CHARACTER_LIST = Object.values(CHARACTERS);
