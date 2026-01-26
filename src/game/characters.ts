export type CharacterId =
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

export interface CharacterBase {
    id: CharacterId;
    name: string;
    attribute: string;
    icon: string;
    role: string;
    description: string;
}

export const CHARACTERS: Record<CharacterId, CharacterBase> = {
    lucia: {
        id: 'lucia',
        name: 'ルシア',
        attribute: '光',
        icon: '✨',
        role: 'Holy Prince',
        description: '眩い光を纏う王立騎士団の若きリーダー。誠実で優雅な振る舞いは、多くの女性客を虜にする。'
    },
    kagerou: {
        id: 'kagerou',
        name: 'カゲロウ',
        attribute: '闇',
        icon: '🌑',
        role: 'Silent Shadow',
        description: '影に潜む謎多き忍び。無口だが、時折見せる鋭い眼差しと優しさに中毒者が続出している。'
    },
    haruto: {
        id: 'haruto',
        name: 'ハルト',
        attribute: '風',
        icon: '🍃',
        role: 'Freedom Wings',
        description: '風のように自由奔放な吟遊詩人。彼の奏でる調べは疲れた心を癒し、店内に爽やかな風を運ぶ。'
    },
    ren: {
        id: 'ren',
        name: 'レン',
        attribute: '炎',
        icon: '🔥',
        role: 'Burning Passion',
        description: '情熱的な若き料理人。熱血漢で真っ直ぐな性格は、周囲を熱く活気づかせる。'
    },
    mizuki: {
        id: 'mizuki',
        name: 'ミズキ',
        attribute: '水',
        icon: '💧',
        role: 'Calm Stream',
        description: '冷静沈着で知的な魔導士。静かな佇まいと透き通るような美しさがカフェの品格を高めている。'
    },
    souma: { id: 'souma', name: 'ソウマ', attribute: '雷', icon: '⚡', role: 'Flash Beast', description: '野性味溢れる雷の戦士。' },
    yukito: { id: 'yukito', name: 'ユキト', attribute: '氷', icon: '❄️', role: 'Ice Duke', description: '孤高の冷徹公爵。' },
    riku: { id: 'riku', name: 'リク', attribute: '土', icon: '⛰️', role: 'Solid Guardian', description: '包容力のある巨漢。' },
    aoi: { id: 'aoi', name: 'アオイ', attribute: '星', icon: '⭐', role: 'Starlight Seer', description: '未来を見通す謎の少年。' },
    shion: { id: 'shion', name: 'シオン', attribute: '森', icon: '🌳', role: 'Forest Sage', description: '自然を愛する賢者。' },
};

export const CHARACTER_LIST = Object.values(CHARACTERS);
