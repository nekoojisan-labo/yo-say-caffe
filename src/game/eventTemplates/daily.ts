import { EventPayload } from '@/types';
import { CharacterId } from '../characters';

export const DAILY_EVENT_TEMPLATES: Record<CharacterId, EventPayload[]> = {
    lucia: [
        {
            id: 'daily_lucia_1',
            characterId: 'lucia',
            portraitKey: 'lucia',
            title: '光の午餐',
            body: 'ルシア様が庭に咲いた珍しい花を持ってきてくれました。',
            type: 'daily',
            choices: [
                { label: '感謝して店に飾る', heartDelta: 15, repDelta: 2 },
                { label: '美しさを褒める', heartDelta: 10, glamorPointsDelta: 30 }
            ]
        }
    ],
    kagerou: [
        {
            id: 'daily_kagerou_1',
            characterId: 'kagerou',
            portraitKey: 'kagerou',
            title: '夜の囁き',
            body: 'カゲロウが耳元で何やら怪しげな噂話を囁いてきた。',
            type: 'daily',
            choices: [
                { label: '詳しく聞き出す', heartDelta: 15, repDelta: -1 },
                { label: '軽く聞き流す', heartDelta: 5, repDelta: 1 }
            ]
        }
    ],
    haruto: [
        {
            id: 'daily_haruto_1',
            characterId: 'haruto',
            portraitKey: 'haruto',
            title: '風の便り',
            body: 'ハルトが外回りから戻って、街の流行りを教えてくれた。',
            type: 'daily',
            choices: [
                { label: '参考にすると言う', heartDelta: 15, repDelta: 2 },
                { label: 'ハルトのおかげだと感謝する', heartDelta: 20, repDelta: 1 }
            ]
        }
    ],
    ren: [
        {
            id: 'daily_ren_1',
            characterId: 'ren',
            title: '熱風の中の協力',
            body: 'レンが厨房の掃除を驚異的なスピードで手伝ってくれた。',
            type: 'daily',
            choices: [
                { label: '冷たい飲み物を差し出す', heartDelta: 20, cashDelta: -100 },
                { label: 'その腕力を称賛する', heartDelta: 15, repDelta: 1 }
            ]
        }
    ],
    mizuki: [
        {
            id: 'daily_mizuki_1',
            characterId: 'mizuki',
            portraitKey: 'mizuki',
            title: '水辺の読書',
            body: 'ミズキが窓際で静かに本を読んでいる。とても絵になる光景だ。',
            type: 'daily',
            choices: [
                { label: 'そっとしておいてあげる', heartDelta: 15 },
                { label: '読み終わったら感想を聞く', heartDelta: 20, glamorPointsDelta: 20 }
            ]
        }
    ],
    souma: [
        {
            id: 'daily_souma_1',
            characterId: 'souma',
            portraitKey: 'souma',
            title: '電子の調べ',
            body: 'ソウマが店のBGMを少しだけアレンジしてくれた。心なしか店内の雰囲気が良くなった。',
            type: 'daily',
            choices: [
                { label: 'とても素敵だと褒める', heartDelta: 20, repDelta: 2 },
                { label: 'やり方を教えてもらう', heartDelta: 15, glamorPointsDelta: 50 }
            ]
        }
    ],
    yukito: [
        {
            id: 'daily_yukito_1',
            characterId: 'yukito',
            portraitKey: 'yukito',
            title: '冷ややかな優しさ',
            body: 'ユキトが保存用のアイスボックスに魔法をかけて、食材が長持ちするようにしてくれた。',
            type: 'daily',
            choices: [
                { label: '助かると言って微笑む', heartDelta: 20, cashDelta: 500 },
                { label: '冷たすぎて震えるふりをする', heartDelta: 15, repDelta: 1 }
            ]
        }
    ],
    riku: [
        {
            id: 'daily_riku_1',
            characterId: 'riku',
            portraitKey: 'riku',
            title: '土の知恵',
            body: 'リクが店の前の掃除を完璧に終わらせて待っていた。',
            type: 'daily',
            choices: [
                { label: '一緒に休憩しようと誘う', heartDelta: 20, cashDelta: -300 },
                { label: '今度は自分がやると言う', heartDelta: 15, repDelta: 1 }
            ]
        }
    ],
    aoi: [
        {
            id: 'daily_aoi_1',
            characterId: 'aoi',
            portraitKey: 'aoi',
            title: '星の魔法',
            body: 'アオイが掃除道具に魔法をかけて、勝手に掃除が動くようにしてくれた…。が、少し暴走気味だ！',
            type: 'daily',
            choices: [
                { label: '慌てて魔法を解いてもらう', heartDelta: 10, repDelta: 1 },
                { label: '面白いから見てる', heartDelta: 20, glamorPointsDelta: -20 }
            ]
        }
    ],
    shion: [
        {
            id: 'daily_shion_1',
            characterId: 'shion',
            portraitKey: 'shion',
            title: '森の訓示',
            body: 'シオンから経営について少し厳しいが、的確なアドバイスをもらった。',
            type: 'daily',
            choices: [
                { label: '真摯に受け止める', heartDelta: 20, repDelta: 5 },
                { label: '頑張っていることをアピールする', heartDelta: 10, glamorPointsDelta: 50 }
            ]
        }
    ]
};

export function getRandomDailyEvent(charId: CharacterId, tier: 'light' | 'deep' = 'light'): EventPayload {
    const templates = DAILY_EVENT_TEMPLATES[charId];
    const base = templates[Math.floor(Math.random() * templates.length)];

    // ディープイベントの場合は♡の加算を増やす (3.0倍に上位修正)
    if (tier === 'deep') {
        return {
            ...base,
            id: `${base.id}_deep`,
            choices: base.choices.map(c => ({
                ...c,
                heartDelta: Math.floor((c.heartDelta || 10) * 3.0)
            }))
        };
    }

    // ライトイベントの場合は調整 (0.8倍に上位修正)
    return {
        ...base,
        choices: base.choices.map(c => ({
            ...c,
            heartDelta: Math.max(8, Math.floor((c.heartDelta || 10) * 0.8))
        }))
    };
}
