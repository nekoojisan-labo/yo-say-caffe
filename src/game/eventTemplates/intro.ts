import { EventPayload } from '@/types';

export const INTRO_EVENTS: Record<number, EventPayload> = {
    2: {
        id: 'intro_haruto',
        characterId: 'haruto',
        portraitKey: 'haruto',
        title: '幼なじみの手際',
        body: '「相変わらず無理してるだろ」開店準備中、ハルトが棚を直しながら笑う。あなたの“いつもの癖”を見抜く目が、少しだけ胸に刺さる。',
        type: 'intro',
        choices: [
            { label: 'A「手伝って。助かる」', heartDelta: 10, repDelta: 1 },
            { label: 'B「大丈夫、ありがとう」', heartDelta: 0 }
        ]
    },
    3: {
        id: 'intro_mizuki',
        characterId: 'mizuki',
        portraitKey: 'mizuki',
        title: '香りの差し入れ',
        body: 'ミズキが小瓶を置く。「今日はこれ。呼吸が浅い日ほど、香りは効くよ」店の空気がふっと軽くなる。',
        type: 'intro',
        choices: [
            { label: 'A「おすすめの淹れ方、教えて」', heartDelta: 10, repDelta: 1 },
            { label: 'B「受け取るだけにする」', heartDelta: 0 }
        ]
    },
    4: {
        id: 'intro_lucia',
        characterId: 'lucia',
        portraitKey: 'lucia',
        title: '紅茶の注文は流れるように',
        body: '扉の鈴が鳴る. ルシアは紅茶棚を一瞥し、迷いなくスコーンも添える。「ここは、香りが正しい」その一言で店が格上げされた気がした。',
        type: 'intro',
        choices: [
            { label: 'A「好みを聞いておすすめを出す」', heartDelta: 10, repDelta: 2 },
            { label: 'B「定番だけを出す」', heartDelta: 0 }
        ]
    },
    5: {
        id: 'intro_ren',
        characterId: 'ren',
        portraitKey: 'ren',
        title: '辛口の評価',
        body: 'レンがカウンターを指で叩く。「甘いだけじゃ客は戻らねぇ」口は悪いのに、視線は真剣で、逃げ道を塞いでくる。',
        type: 'intro',
        choices: [
            { label: 'A「じゃあ、案を出してよ」', heartDelta: 10 },
            { label: 'B「今日はやめておく」', heartDelta: 0 }
        ]
    },
    6: {
        id: 'intro_souma',
        characterId: 'souma',
        portraitKey: 'souma',
        title: '勢いの来客',
        body: 'ソウマがドン、とテーブルに肘をつく。「この店、ノリは悪くねぇな」店内がざわつく。扱いを間違えると、評判も跳ねる。',
        type: 'intro',
        choices: [
            { label: 'A「明るくいなして場を整える」', heartDelta: 10, repDelta: 1 },
            { label: 'B「注意して静かにさせる」', heartDelta: -5 }
        ]
    },
    7: {
        id: 'intro_kagerou',
        characterId: 'kagerou',
        portraitKey: 'kagerou',
        title: '境界の匂い',
        body: '夜、市の端で影が揺れる。カゲロウはあなたを見て「…境界が荒れてる」だけ言った。助けになるのか、災いなのか、判別できない。',
        type: 'intro',
        choices: [
            { label: 'A「助けて。方法を教えて」', heartDelta: 10, glamorPointsDelta: 5 },
            { label: 'B「距離を取る」', heartDelta: 0 }
        ]
    },
    8: {
        id: 'intro_yukito',
        characterId: 'yukito',
        portraitKey: 'yukito',
        title: '甘さの視線',
        body: 'ユキトはショーケースの前で静かに微笑む。「甘いもの、好きなんです。…あなたが選ぶ甘さも」言葉は丁寧なのに、視線だけが離れない。',
        type: 'intro',
        choices: [
            { label: 'A「距離感を守って丁寧に接客」', heartDelta: 10 },
            { label: 'B「親しげに距離を詰める」', heartDelta: 15 }
        ]
    },
    9: {
        id: 'intro_riku',
        characterId: 'riku',
        portraitKey: 'riku',
        title: '配置替えの提案',
        body: 'リクが椅子の位置を見て言う。「動線、ここ詰まる」一言で、店の“回り”が変わる気がした。',
        type: 'intro',
        choices: [
            { label: 'A「一緒に配置替えする」', heartDelta: 10, repDelta: 1 },
            { label: 'B「今日はそのままで」', heartDelta: 0 }
        ]
    },
    10: {
        id: 'intro_aoi',
        characterId: 'aoi',
        portraitKey: 'aoi',
        title: '季節限定の予感',
        body: 'アオイは窓辺で光粒を指先に集める。「今日の空気は、限定が売れる日」根拠は不明なのに、不思議と信じたくなる。',
        type: 'intro',
        choices: [
            { label: 'A「限定メニュー案を聞く」', heartDelta: 10, repDelta: 1 },
            { label: 'B「笑って流す」', heartDelta: 0 }
        ]
    },
    11: {
        id: 'intro_shion',
        characterId: 'shion',
        portraitKey: 'shion',
        title: '鑑定の文字',
        body: 'シオンが帳簿を開く。羽ペンが淡く光り、「数字が乱れている」ではなく「順序が崩れている」と言った。責めないのに、逃がさない声。',
        type: 'intro',
        choices: [
            { label: 'A「正直に現状を話す」', heartDelta: 10, glamorPointsDelta: 5, repDelta: 1 },
            { label: 'B「強がって誤魔化す」', heartDelta: 0, repDelta: -1 }
        ]
    }
};
