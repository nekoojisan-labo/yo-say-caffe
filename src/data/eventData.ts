import type { GameEvent } from '@/types';

export const EVENT_DATA: GameEvent[] = [
  // ===== ルシア（光の王子） =====
  {
    id: 'lucia_01',
    ikemenId: 'lucia',
    title: '光の王子との出会い',
    requiredAffection: 0,
    hasCG: false,
    scenes: [
      {
        id: 'lucia_01_01',
        background: 'cafe_interior',
        character: {
          id: 'lucia',
          expression: 'normal',
          position: 'center',
        },
        dialogue: {
          speaker: 'ルシア',
          text: 'こんにちは。素敵なカフェだね。',
        },
      },
      {
        id: 'lucia_01_02',
        background: 'cafe_interior',
        character: {
          id: 'lucia',
          expression: 'smile',
          position: 'center',
        },
        dialogue: {
          speaker: 'ルシア',
          text: '僕はルシア。光の国からやってきた妖精さ。',
        },
      },
      {
        id: 'lucia_01_03',
        background: 'cafe_interior',
        character: {
          id: 'lucia',
          expression: 'gentle',
          position: 'center',
        },
        dialogue: {
          speaker: 'ルシア',
          text: 'ここの紅茶は絶品だと聞いてね。期待しているよ。',
        },
      },
    ],
  },
  {
    id: 'lucia_02',
    ikemenId: 'lucia',
    title: '常連さん',
    requiredAffection: 20,
    hasCG: false,
    scenes: [
      {
        id: 'lucia_02_01',
        background: 'cafe_interior',
        character: {
          id: 'lucia',
          expression: 'smile',
          position: 'center',
        },
        dialogue: {
          speaker: 'ルシア',
          text: '今日も美味しい紅茶をありがとう。',
        },
      },
      {
        id: 'lucia_02_02',
        background: 'cafe_interior',
        character: {
          id: 'lucia',
          expression: 'shy',
          position: 'center',
        },
        dialogue: {
          speaker: 'ルシア',
          text: '君といると、なんだか落ち着くんだ...',
        },
      },
      {
        id: 'lucia_02_03',
        background: 'cafe_interior',
        character: {
          id: 'lucia',
          expression: 'shy',
          position: 'center',
        },
        dialogue: {
          speaker: 'ルシア',
          text: 'よかったら...今度、二人で出かけないか？',
        },
        choices: [
          {
            text: 'ぜひ！楽しみにしてます',
            affectionChange: 3,
            nextSceneId: 'lucia_02_04a',
          },
          {
            text: 'え、デート...ですか？',
            affectionChange: 1,
            nextSceneId: 'lucia_02_04b',
          },
          {
            text: 'お店が忙しくて...',
            affectionChange: -1,
            nextSceneId: 'lucia_02_04c',
          },
        ],
      },
      {
        id: 'lucia_02_04a',
        background: 'cafe_interior',
        character: {
          id: 'lucia',
          expression: 'happy',
          position: 'center',
        },
        dialogue: {
          speaker: 'ルシア',
          text: '本当かい！？嬉しいな...じゃあ、今度の休みの日に。',
        },
      },
      {
        id: 'lucia_02_04b',
        background: 'cafe_interior',
        character: {
          id: 'lucia',
          expression: 'shy',
          position: 'center',
        },
        dialogue: {
          speaker: 'ルシア',
          text: 'そ、そうだね...デート、かな。いや、その...友達としてでも！',
        },
      },
      {
        id: 'lucia_02_04c',
        background: 'cafe_interior',
        character: {
          id: 'lucia',
          expression: 'sad',
          position: 'center',
        },
        dialogue: {
          speaker: 'ルシア',
          text: 'そうか...君も大変だよね。また今度にしよう。',
        },
      },
    ],
  },
  {
    id: 'lucia_03',
    ikemenId: 'lucia',
    title: '特別なお茶会',
    requiredAffection: 50,
    hasCG: true,
    cgId: 'lucia_tea_party',
    scenes: [
      {
        id: 'lucia_03_01',
        background: 'garden',
        character: {
          id: 'lucia',
          expression: 'smile',
          position: 'center',
        },
        dialogue: {
          speaker: 'ルシア',
          text: '今日は特別な場所に案内するよ。',
        },
      },
      {
        id: 'lucia_03_02',
        background: 'garden',
        character: {
          id: 'lucia',
          expression: 'gentle',
          position: 'center',
        },
        dialogue: {
          speaker: 'ルシア',
          text: 'ここは僕が見つけた秘密の花園さ。',
        },
      },
      {
        id: 'lucia_03_03',
        background: 'garden',
        dialogue: {
          speaker: '',
          text: '（CG: ルシアと特別なお茶会）',
        },
      },
    ],
  },
  {
    id: 'lucia_04',
    ikemenId: 'lucia',
    title: '光の告白',
    requiredAffection: 100,
    hasCG: true,
    cgId: 'lucia_confession',
    scenes: [
      {
        id: 'lucia_04_01',
        background: 'sunset',
        character: {
          id: 'lucia',
          expression: 'serious',
          position: 'center',
        },
        dialogue: {
          speaker: 'ルシア',
          text: '今日は...君に伝えたいことがあるんだ。',
        },
      },
      {
        id: 'lucia_04_02',
        background: 'sunset',
        character: {
          id: 'lucia',
          expression: 'shy',
          position: 'center',
        },
        dialogue: {
          speaker: 'ルシア',
          text: '僕は...君のことが好きだ。',
        },
      },
    ],
  },

  // ===== カゲロウ（闇のクール） =====
  {
    id: 'kagerou_01',
    ikemenId: 'kagerou',
    title: '闇の妖精',
    requiredAffection: 0,
    hasCG: false,
    scenes: [
      {
        id: 'kagerou_01_01',
        background: 'cafe_interior',
        character: {
          id: 'kagerou',
          expression: 'normal',
          position: 'center',
        },
        dialogue: {
          speaker: 'カゲロウ',
          text: '...ブラックコーヒー。',
        },
      },
      {
        id: 'kagerou_01_02',
        background: 'cafe_interior',
        character: {
          id: 'kagerou',
          expression: 'normal',
          position: 'center',
        },
        dialogue: {
          speaker: 'カゲロウ',
          text: '...静かな店だ。悪くない。',
        },
      },
    ],
  },
  {
    id: 'kagerou_02',
    ikemenId: 'kagerou',
    title: '少しずつ',
    requiredAffection: 20,
    hasCG: false,
    scenes: [
      {
        id: 'kagerou_02_01',
        background: 'cafe_interior',
        character: {
          id: 'kagerou',
          expression: 'normal',
          position: 'center',
        },
        dialogue: {
          speaker: 'カゲロウ',
          text: '...また来た。',
        },
      },
      {
        id: 'kagerou_02_02',
        background: 'cafe_interior',
        character: {
          id: 'kagerou',
          expression: 'slight_smile',
          position: 'center',
        },
        dialogue: {
          speaker: 'カゲロウ',
          text: 'お前の淹れるコーヒーは...悪くない。',
        },
      },
    ],
  },

  // ===== ハルト（幼なじみ系） =====
  {
    id: 'haruto_01',
    ikemenId: 'haruto',
    title: '風の便り',
    requiredAffection: 0,
    hasCG: false,
    scenes: [
      {
        id: 'haruto_01_01',
        background: 'cafe_interior',
        character: {
          id: 'haruto',
          expression: 'happy',
          position: 'center',
        },
        dialogue: {
          speaker: 'ハルト',
          text: 'やっほー！新しいカフェができたって聞いてさ！',
        },
      },
      {
        id: 'haruto_01_02',
        background: 'cafe_interior',
        character: {
          id: 'haruto',
          expression: 'smile',
          position: 'center',
        },
        dialogue: {
          speaker: 'ハルト',
          text: 'オレはハルト！よろしくな！',
        },
      },
    ],
  },

  // 他のイケメンのイベントも同様に定義...
  // （省略していますが、実際には全員分定義）
];

// イケメン別にイベントを取得
export function getEventsForIkemen(ikemenId: string): GameEvent[] {
  return EVENT_DATA.filter(event => event.ikemenId === ikemenId);
}

// 好感度条件を満たしているイベントを取得
export function getAvailableEvents(ikemenId: string, affection: number): GameEvent[] {
  return EVENT_DATA.filter(
    event => event.ikemenId === ikemenId && event.requiredAffection <= affection
  );
}

// 次に発生するイベントを取得
export function getNextEvent(
  ikemenId: string,
  affection: number,
  completedEvents: string[]
): GameEvent | null {
  const events = getEventsForIkemen(ikemenId);
  for (const event of events) {
    if (completedEvents.includes(event.id)) continue;
    if (event.requiredAffection <= affection) {
      return event;
    }
  }
  return null;
}
