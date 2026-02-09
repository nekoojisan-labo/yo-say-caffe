import { GameState, EventPayload } from '@/types';
import { CharacterId, CHARACTER_LIST } from '../game/characters';
import { INTRO_EVENTS } from '../game/eventTemplates/intro';
import { getRandomDailyEvent } from '../game/eventTemplates/daily';
import { getHeartLevel } from '../game/heartSystem';

export function getDailyEvent(state: GameState, forcedCharId?: CharacterId): EventPayload | null {
    const { day, money, flags, encyclopediaUnlocked } = state;

    // 1. ゲームオーバー判定 (強制終了)
    if (money <= 0) {
        return {
            id: 'gameover_bankrupt',
            title: '経営破綻',
            body: '店舗の資金が底をつきました…。妖精カフェの経営はここで終わりです。',
            type: 'danger',
            choices: [],
            isGameOver: true
        };
    }

    if (state.glamor.stability <= 0) {
        return {
            id: 'gameover_stability',
            title: '幻装崩壊',
            body: '幻装が維持できなくなり、カフェの存在そのものが消えてしまいました…。',
            type: 'danger',
            choices: [],
            isGameOver: true
        };
    }

    // 2. ルートロック判定 (Day 15)
    if (day === 15 && !flags.routeLock) {
        const candidates = getTopCandidates(state); // stateを渡すように変更

        if (candidates.length > 0) {
            // 上位2-3人を提示
            const topCandidates = candidates.slice(0, 3);
            const bestChar = topCandidates[0];

            return {
                id: 'route_lock_day15',
                characterId: bestChar.id,
                title: '運命の選択',
                body: `営業を始めてから半月。今のあなたには、確かな想いを寄せる相手がいるはずです。運命の契約を結ぶ妖精を選んでください。`,
                type: 'system',
                choices: [
                    ...topCandidates.map(char => ({
                        label: `${char.name}と永遠の契約を結ぶ`,
                        effects: { flags: { ...flags, routeLock: char.id } }
                    })),
                    {
                        label: 'まだ一人を選べない',
                        effects: {}
                    }
                ] as any
            };
        }
    }

    // 3. 週間イベント (月影市)
    if (day % 7 === 0) {
        // Day 7 かつ カゲロウ未解放なら、カゲロウ登場を統合
        if (day === 7 && !encyclopediaUnlocked['kagerou']) {
            return {
                id: 'weekly_market_kagerou',
                characterId: 'kagerou',
                title: '月影市と境界の影',
                body: '今日は週に一度の「月影市」の日。賑わう市の端で、一人の男が影に溶けるように立っている。カゲロウはあなたを見て「…境界が荒れてる」だけ言った。',
                type: 'intro', // intro扱いにしてボーナス付与
                choices: [
                    { label: 'A「助けて。方法を教えて」', heartDelta: 10, glamorPointsDelta: 5 },
                    { label: 'B「距離を取る」', heartDelta: 0 }
                ]
            };
        }

        return {
            id: `weekly_market_${day}`,
            title: '月影市のお知らせ',
            body: '今日は週に一度の「月影市」の日です。珍しい食材や内装が手に入るかもしれません。',
            type: 'weekly',
            choices: [
                { label: '市場へ行く準備をする', glamorPointsDelta: 20 },
                { label: '今日は店でゆっくりする', repDelta: 2 }
            ]
        };
    }

    // 4. 前半自由：初登場イベント (Day 2-11)
    if (day >= 2 && day <= 11) {
        const introEvent = INTRO_EVENTS[day];
        if (introEvent && !encyclopediaUnlocked[introEvent.characterId as CharacterId]) {
            return introEvent;
        }
    }

    // 5. 通常の日次イベント (抽選)
    const charId = forcedCharId || selectCharacterForEvent(state);
    if (charId) {
        // チケット使用時は確定。推しの場合はdeepのチャンス。
        const isFocus = state.romanceFocus.id === charId;
        const isDeep = isFocus && state.romanceFocus.heat >= 40 && (forcedCharId || Math.random() < 0.7); // 0.5 -> 0.7

        return getRandomDailyEvent(charId, isDeep ? 'deep' : 'light');
    }

    return null;
}

/**
 * イベントに登場するキャラクターを抽選する
 */
function selectCharacterForEvent(state: GameState): CharacterId | null {
    const { day, lastAppearedDay, romanceFocus, affection, encyclopediaUnlocked } = state;

    // 1. プール制限 (上位3人 + フォーカス1人 + ランダム1人)
    const sorted = CHARACTER_LIST
        .filter(c => encyclopediaUnlocked[c.id])
        .sort((a, b) => (affection[b.id] || 0) - (affection[a.id] || 0));

    const top3 = sorted.slice(0, 3).map(c => c.id);
    const focusId = romanceFocus.id;

    // まだ解放されていないキャラを除外した全リストからランダム
    const unlockedAll = CHARACTER_LIST.filter(c => encyclopediaUnlocked[c.id]).map(c => c.id);
    const randomId = unlockedAll[Math.floor(Math.random() * unlockedAll.length)];

    const pool = Array.from(new Set([...top3, focusId, randomId].filter(id => id !== null))) as CharacterId[];

    // 2. プール内のキャラを重み付け
    const weightedPool = pool.map(id => {
        let weight = 10;

        // フォーカス一致ボーナス (推し強め)
        if (id === romanceFocus.id) {
            weight += Math.floor(romanceFocus.heat * 1.0); // 0.6 -> 1.0
        }

        // 親密度ボーナス (出やすさアップ)
        weight += Math.floor((affection[id] || 0) / 40); // 60 -> 40

        // 連続出現補正
        const daysSinceLast = day - (lastAppearedDay[id] || -999);
        if (daysSinceLast === 1) {
            if (id === romanceFocus.id) {
                // 推し限定で連続出現許可（ペナルティなし）
            } else {
                weight = Math.max(1, weight - 8);
            }
        }

        return { id, weight };
    });

    const totalWeight = weightedPool.reduce((sum, c) => sum + c.weight, 0);
    let rand = Math.random() * totalWeight;

    for (const cand of weightedPool) {
        rand -= cand.weight;
        if (rand <= 0) return cand.id;
    }

    return pool[0] || null;
}

/**
 * ルートロック候補を取得 (♡Lv2以上 かつ heat >= 30)
 */
export function getTopCandidates(state: GameState) {
    const { affection, romanceFocus } = state;
    return CHARACTER_LIST
        .map(char => ({
            ...char,
            level: getHeartLevel(affection[char.id] || 0),
            points: affection[char.id] || 0,
            isFocus: romanceFocus.id === char.id,
            heat: romanceFocus.id === char.id ? romanceFocus.heat : 0
        }))
        .filter(char => char.level >= 2 && char.heat >= 30)
        .sort((a, b) => b.points - a.points);
}
