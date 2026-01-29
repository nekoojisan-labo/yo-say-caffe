import { useState, useEffect, useCallback, useRef } from 'react';
import { useGameStore, useInventoryStore } from '@/store';
import { MENU_DATA } from '@/data/menuData';
import { CHARACTERS, CharacterId } from '@/game/characters';
import { ASSETS } from '@/utils/assets';

type BusinessPhase = 'procurement' | 'operation' | 'running' | 'result' | 'advice';

interface DayResultData {
  customers: number;
  sales: number;
  cost: number;
  profit: number;
  ikemenVisits: CharacterId[];
}

interface Customer {
  id: number;
  type: 'normal' | 'ikemen';
  ikemenId?: CharacterId;
  status: 'entering' | 'seated' | 'eating' | 'leaving' | 'gone';
  seatIndex: number;
  x: number;
  targetX: number;
  menuId?: string;
  timer: number;
  color: string;
}

const SEAT_POSITIONS = [
  { x: 15, y: 60 },
  { x: 30, y: 60 },
  { x: 45, y: 60 },
  { x: 60, y: 60 },
  { x: 15, y: 80 },
  { x: 30, y: 80 },
  { x: 45, y: 80 },
  { x: 60, y: 80 },
];

const CUSTOMER_COLORS = [
  'bg-pink-400', 'bg-purple-400', 'bg-blue-400', 'bg-green-400',
  'bg-yellow-400', 'bg-orange-400', 'bg-red-400', 'bg-cyan-400',
];

export function DailyBusinessScreen() {
  const { 
    day, money, addMoney, advanceDay, setScreen, affection
  } = useGameStore();
  const { getStock, consumeStock, confirmOrders, processDayChange } = useInventoryStore();

  const [phase, setPhase] = useState<BusinessPhase>('procurement');
  const [orders, setOrders] = useState<Record<string, number>>({});
  const [dayResult, setDayResult] = useState<DayResultData | null>(null);

  // 営業シミュレーション用
  const [currentTime, setCurrentTime] = useState(9 * 60); // 9:00 開始（分単位）
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [seats, setSeats] = useState<(number | null)[]>(Array(8).fill(null));
  const [todaySales, setTodaySales] = useState(0);
  const [todayCost, setTodayCost] = useState(0);
  const [todayCustomers, setTodayCustomers] = useState(0);
  const [ikemenVisits, setIkemenVisits] = useState<CharacterId[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(1);

  const customerIdRef = useRef(0);
  const unlockedMenus = MENU_DATA.filter((m) => m.unlocked);

  const calculateProcurementCost = () => {
    return Object.entries(orders).reduce((total, [itemId, qty]) => {
      const menu = MENU_DATA.find((m) => m.id === itemId);
      return total + (menu ? menu.cost * qty : 0);
    }, 0);
  };

  const totalOrderCount = Object.values(orders).reduce((sum, qty) => sum + qty, 0);

  const handleConfirmProcurement = () => {
    const procurementCost = calculateProcurementCost();
    if (procurementCost > money) {
      alert('資金が不足しています！');
      return;
    }
    addMoney(-procurementCost);
    confirmOrders(orders);
    processDayChange();
    setPhase('operation');
  };

  const startOperation = () => {
    setCurrentTime(9 * 60);
    setCustomers([]);
    setSeats(Array(8).fill(null));
    setTodaySales(0);
    setTodayCost(0);
    setTodayCustomers(0);
    setIkemenVisits([]);
    setPhase('running');
  };

  // 時間をフォーマット
  const formatTime = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  // 時間帯を取得
  const getTimeOfDay = (minutes: number) => {
    const hour = Math.floor(minutes / 60);
    if (hour < 11) return 'morning';
    if (hour < 14) return 'lunch';
    if (hour < 17) return 'afternoon';
    return 'evening';
  };

  // 新規客を生成
  const spawnCustomer = useCallback(() => {
    const emptySeatIndex = seats.findIndex(s => s === null);
    if (emptySeatIndex === -1) return null;

    const isIkemen = Math.random() < 0.1;
    const characterIds = Object.keys(CHARACTERS) as CharacterId[];
    const ikemenId = isIkemen ? characterIds[Math.floor(Math.random() * characterIds.length)] : undefined;

    const newCustomer: Customer = {
      id: ++customerIdRef.current,
      type: isIkemen ? 'ikemen' : 'normal',
      ikemenId,
      status: 'entering',
      seatIndex: emptySeatIndex,
      x: -10,
      targetX: SEAT_POSITIONS[emptySeatIndex].x,
      timer: 0,
      color: CUSTOMER_COLORS[Math.floor(Math.random() * CUSTOMER_COLORS.length)],
    };

    return newCustomer;
  }, [seats]);

  // 営業ループ
  useEffect(() => {
    if (phase !== 'running' || isPaused) return;

    const interval = setInterval(() => {
      setCurrentTime(prev => {
        const next = prev + speed;
        if (next >= 21 * 60) {
          // 営業終了
          setTimeout(() => finishDay(), 100);
          return 21 * 60;
        }
        return next;
      });

      // 客の来店判定
      const timeOfDay = getTimeOfDay(currentTime);
      let spawnChance = 0.03;
      if (timeOfDay === 'lunch') spawnChance = 0.08;
      else if (timeOfDay === 'evening') spawnChance = 0.06;

      if (Math.random() < spawnChance * speed) {
        const newCustomer = spawnCustomer();
        if (newCustomer) {
          setCustomers(prev => [...prev, newCustomer]);
          setSeats(prev => {
            const next = [...prev];
            next[newCustomer.seatIndex] = newCustomer.id;
            return next;
          });
        }
      }

      // 客の状態更新
      setCustomers(prev => prev.map(customer => {
        if (customer.status === 'gone') return customer;

        let updated = { ...customer };

        // 入店中 → 着席
        if (customer.status === 'entering') {
          updated.x = Math.min(customer.x + 2 * speed, customer.targetX);
          if (updated.x >= customer.targetX) {
            updated.status = 'seated';
            updated.timer = 0;
          }
        }

        // 着席 → 食事開始
        if (customer.status === 'seated') {
          updated.timer += speed;
          if (updated.timer > 30) {
            // メニューを注文
            const availableMenus = unlockedMenus.filter(m => getStock(m.id) > 0);
            if (availableMenus.length > 0) {
              const menu = availableMenus[Math.floor(Math.random() * availableMenus.length)];
              if (consumeStock(menu.id, 1)) {
                updated.menuId = menu.id;
                updated.status = 'eating';
                updated.timer = 0;
                setTodaySales(s => s + menu.price);
                setTodayCost(c => c + menu.cost);
                setTodayCustomers(c => c + 1);

                if (customer.type === 'ikemen' && customer.ikemenId) {
                  setIkemenVisits(prev => {
                    if (!prev.includes(customer.ikemenId!)) {
                      return [...prev, customer.ikemenId!];
                    }
                    return prev;
                  });
                }
              }
            } else {
              // 在庫なしで帰る
              updated.status = 'leaving';
              updated.timer = 0;
            }
          }
        }

        // 食事中 → 退店開始
        if (customer.status === 'eating') {
          updated.timer += speed;
          if (updated.timer > 60 + Math.random() * 30) {
            updated.status = 'leaving';
            updated.timer = 0;
          }
        }

        // 退店中
        if (customer.status === 'leaving') {
          updated.x += 3 * speed;
          if (updated.x > 110) {
            updated.status = 'gone';
            setSeats(prev => {
              const next = [...prev];
              const idx = next.indexOf(customer.id);
              if (idx !== -1) next[idx] = null;
              return next;
            });
          }
        }

        return updated;
      }));

    }, 50);

    return () => clearInterval(interval);
  }, [phase, isPaused, speed, currentTime, spawnCustomer, unlockedMenus, getStock, consumeStock]);

  const finishDay = () => {
    // イケメンと出会ったら図鑑を解放＆好感度UP
    ikemenVisits.forEach((ikemenId) => {
      useGameStore.getState().unlockEncyclopedia(ikemenId);
      useGameStore.getState().addAffection(ikemenId, 10);
    });

    addMoney(todaySales);

    setDayResult({
      customers: todayCustomers,
      sales: todaySales,
      cost: todayCost,
      profit: todaySales - todayCost,
      ikemenVisits: ikemenVisits,
    });

    setPhase('result');
  };

  const handleToAdvice = () => {
    setPhase('advice');
  };

  const handleFinish = () => {
    advanceDay();
    setScreen('home');
  };

  const getShionAdvice = (): { message: string; mood: 'happy' | 'concerned' | 'neutral' | 'excited' } => {
    if (!dayResult) return { message: '', mood: 'neutral' };

    const { customers, sales, profit, ikemenVisits } = dayResult;
    const profitMargin = sales > 0 ? (profit / sales) * 100 : 0;
    const currentMoney = money;
    
    if (currentMoney < 5000) {
      return {
        message: '資金がかなり厳しい状態だね...。まずは確実に売れるメニューに絞って、少量仕入れで利益を積み重ねよう。',
        mood: 'concerned'
      };
    }

    if (profit < -1000) {
      return {
        message: '今日は大きな赤字だった...。仕入れが多すぎたか、お客さんが予想より少なかったね。',
        mood: 'concerned'
      };
    }

    if (customers < 5) {
      return {
        message: 'お客さんがほとんど来なかったね...。評判を上げるために、イケメンたちとの交流を増やしてみては？',
        mood: 'concerned'
      };
    }

    if (ikemenVisits.length >= 3) {
      const names = ikemenVisits.map(id => CHARACTERS[id].name).join('、');
      return {
        message: `今日は${names}と、なんと${ikemenVisits.length}人も来てくれたね！すごい人気だ！`,
        mood: 'excited'
      };
    }

    if (ikemenVisits.length > 0) {
      const visitedChar = CHARACTERS[ikemenVisits[0]];
      const currentAffection = affection[ikemenVisits[0]] || 0;
      
      if (currentAffection >= 50) {
        return {
          message: `${visitedChar.name}との絆が深まってきているね。彼の好みをもっと研究してみよう。`,
          mood: 'happy'
        };
      }
      return {
        message: `${visitedChar.name}が来てくれたね！${visitedChar.attribute}の妖精は${visitedChar.role}として知られているんだ。`,
        mood: 'happy'
      };
    }

    if (profitMargin > 40) {
      return {
        message: `素晴らしい！利益率が${Math.round(profitMargin)}%もある。効率的な経営ができているね。`,
        mood: 'excited'
      };
    }

    if (customers >= 25) {
      return {
        message: `今日は${customers}人も来店してくれた！大盛況だね。`,
        mood: 'happy'
      };
    }

    if (profit > 500) {
      return {
        message: `安定した利益が出ているね。${profit.toLocaleString()}Gの黒字は立派だよ。`,
        mood: 'happy'
      };
    }

    if (profit < 0) {
      return {
        message: '今日は少し赤字だったけど、大きな問題じゃないよ。焦らずいこう。',
        mood: 'neutral'
      };
    }

    const defaultMessages = [
      '今日も一日お疲れ様。コツコツ続けることが大切だよ。',
      '順調な営業だったね。この調子で少しずつ成長していこう。',
      '安定した一日だったね。新しいメニューで変化をつけてみるのもいいかも。',
    ];
    
    return {
      message: defaultMessages[day % defaultMessages.length],
      mood: 'neutral'
    };
  };

  // ドットキャラコンポーネント
  const DotCharacter = ({ customer }: { customer: Customer }) => {
    const isIkemen = customer.type === 'ikemen';
    const char = isIkemen && customer.ikemenId ? CHARACTERS[customer.ikemenId] : null;
    
    return (
      <div
        className={`absolute transition-all duration-100 ${customer.status === 'gone' ? 'opacity-0' : 'opacity-100'}`}
        style={{
          left: `${customer.x}%`,
          top: `${SEAT_POSITIONS[customer.seatIndex]?.y || 70}%`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* キャラ本体 */}
        <div className={`relative ${customer.status === 'eating' ? 'animate-pulse' : ''}`}>
          {/* 頭 */}
          <div
            className={`w-6 h-6 rounded-full ${isIkemen ? 'bg-gradient-to-br from-yellow-300 to-yellow-500 ring-2 ring-yellow-300' : customer.color} shadow-lg`}
          />
          {/* 体 */}
          <div
            className={`w-4 h-5 ${isIkemen ? 'bg-gradient-to-br from-purple-400 to-purple-600' : customer.color} rounded-t-sm mx-auto -mt-1`}
            style={{ filter: 'brightness(0.8)' }}
          />
          {/* イケメンの場合はアイコン表示 */}
          {isIkemen && char && (
            <div className="absolute -top-2 -right-2 text-sm animate-bounce">
              {char.icon}
            </div>
          )}
          {/* 食事中エフェクト */}
          {customer.status === 'eating' && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs animate-bounce">
              ☕
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#0d0517] text-white overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      {/* ヘッダー */}
      <header className="relative z-10 p-4 border-b border-white/10 bg-black/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl px-4 py-2">
              <p className="text-xs text-white/70">DAY</p>
              <p className="text-2xl font-black leading-none">{day}</p>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                妖精カフェ物語
              </h1>
              <p className="text-xs text-gray-400">
                {phase === 'procurement' && '☀️ 開店準備'}
                {phase === 'operation' && '☕ 営業開始'}
                {phase === 'running' && `🕐 営業中 ${formatTime(currentTime)}`}
                {phase === 'result' && '📊 営業結果'}
                {phase === 'advice' && '💡 アドバイス'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">所持金</p>
            <p className="text-2xl font-black text-yellow-400 flex items-center gap-1">
              <span className="text-lg">💰</span>
              {money.toLocaleString()}
              <span className="text-sm font-normal text-yellow-400/70">G</span>
            </p>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="relative z-10 flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto">
          
          {/* 仕入れパート */}
          {phase === 'procurement' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl p-6 border border-amber-500/30">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">📦</span>
                  <div>
                    <h2 className="text-xl font-bold">本日の仕入れ</h2>
                    <p className="text-sm text-gray-400">販売するメニューの材料を仕入れましょう</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {unlockedMenus.map((menu) => {
                  const orderQty = orders[menu.id] || 0;
                  const stock = getStock(menu.id);
                  const menuProfit = menu.price - menu.cost;
                  
                  return (
                    <div
                      key={menu.id}
                      className={`bg-white/5 backdrop-blur-sm rounded-xl p-4 border transition-all ${
                        orderQty > 0 
                          ? 'border-cyan-400/50 bg-cyan-500/10' 
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-lg">{menu.name}</h3>
                          <div className="flex gap-3 text-sm mt-1">
                            <span className="text-gray-400">
                              原価 <span className="text-red-400">{menu.cost}G</span>
                            </span>
                            <span className="text-gray-400">
                              売価 <span className="text-green-400">{menu.price}G</span>
                            </span>
                            <span className="text-cyan-400">+{menuProfit}G</span>
                          </div>
                        </div>
                        <div className="bg-purple-500/30 px-2 py-1 rounded-lg text-sm">
                          在庫 {stock}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setOrders((p) => ({ ...p, [menu.id]: Math.max(0, (p[menu.id] || 0) - 5) }))}
                            className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold"
                          >
                            -5
                          </button>
                          <button
                            onClick={() => setOrders((p) => ({ ...p, [menu.id]: Math.max(0, (p[menu.id] || 0) - 1) }))}
                            className="w-10 h-10 bg-white/10 hover:bg-red-500/50 rounded-lg text-lg font-bold"
                          >
                            -
                          </button>
                          <div className="w-16 h-10 bg-black/30 rounded-lg flex items-center justify-center">
                            <span className="text-xl font-bold text-cyan-400">{orderQty}</span>
                          </div>
                          <button
                            onClick={() => setOrders((p) => ({ ...p, [menu.id]: (p[menu.id] || 0) + 1 }))}
                            className="w-10 h-10 bg-white/10 hover:bg-green-500/50 rounded-lg text-lg font-bold"
                          >
                            +
                          </button>
                          <button
                            onClick={() => setOrders((p) => ({ ...p, [menu.id]: (p[menu.id] || 0) + 5 }))}
                            className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold"
                          >
                            +5
                          </button>
                        </div>
                        {orderQty > 0 && (
                          <p className="text-sm text-red-400">-{(menu.cost * orderQty).toLocaleString()}G</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="sticky bottom-0 bg-[#0d0517]/95 backdrop-blur-md rounded-2xl p-5 border border-white/10 shadow-2xl">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-400 mb-1">仕入れ数: {totalOrderCount}個</p>
                    <p className="text-3xl font-black text-red-400">-{calculateProcurementCost().toLocaleString()} G</p>
                  </div>
                  <button
                    onClick={handleConfirmProcurement}
                    disabled={calculateProcurementCost() > money}
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl font-bold text-lg shadow-lg transition-all hover:scale-105 disabled:hover:scale-100"
                  >
                    仕入れ確定 →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 営業開始前 */}
          {phase === 'operation' && (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="text-center space-y-8">
                <div className="text-8xl mb-4 animate-bounce">☕</div>
                <div>
                  <h2 className="text-3xl font-black mb-2">準備完了！</h2>
                  <p className="text-gray-400">お客様をお迎えしましょう</p>
                </div>
                <button
                  onClick={startOperation}
                  className="px-12 py-5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl font-bold text-xl shadow-2xl hover:scale-105 transition-all"
                >
                  <span className="flex items-center gap-3">
                    <span>🚪</span>
                    <span>開店する</span>
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* 営業中（アニメーション） */}
          {phase === 'running' && (
            <div className="space-y-4">
              {/* 時間・売上表示 */}
              <div className="grid grid-cols-4 gap-3">
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-400">時刻</p>
                  <p className="text-2xl font-black">{formatTime(currentTime)}</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-400">来客数</p>
                  <p className="text-2xl font-black text-cyan-400">{todayCustomers}</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-400">売上</p>
                  <p className="text-2xl font-black text-green-400">{todaySales.toLocaleString()}</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-400">イケメン</p>
                  <p className="text-2xl font-black text-pink-400">{ikemenVisits.length}</p>
                </div>
              </div>

              {/* 営業時間バー */}
              <div className="bg-black/30 rounded-full h-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-500 via-orange-500 to-purple-600 transition-all duration-100"
                  style={{ width: `${((currentTime - 9 * 60) / (12 * 60)) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>9:00</span>
                <span>12:00</span>
                <span>15:00</span>
                <span>18:00</span>
                <span>21:00</span>
              </div>

              {/* カフェビュー */}
              <div 
                className="relative bg-gradient-to-b from-amber-900/30 to-amber-950/50 rounded-2xl border border-amber-500/20 overflow-hidden"
                style={{ height: '350px' }}
              >
                {/* 背景画像 */}
                {ASSETS.backgrounds?.cafeMorning && (
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-30"
                    style={{ 
                      backgroundImage: `url(${
                        getTimeOfDay(currentTime) === 'morning' ? ASSETS.backgrounds.cafeMorning :
                        getTimeOfDay(currentTime) === 'evening' ? ASSETS.backgrounds.cafeEvening :
                        ASSETS.backgrounds.cafeNight
                      })` 
                    }}
                  />
                )}

                {/* 床 */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-amber-900/50 to-transparent" />

                {/* 席（テーブル） */}
                {SEAT_POSITIONS.map((pos, idx) => (
                  <div
                    key={idx}
                    className={`absolute w-8 h-4 rounded ${seats[idx] ? 'bg-amber-700' : 'bg-amber-800/50'} border border-amber-600/50`}
                    style={{
                      left: `${pos.x}%`,
                      top: `${pos.y + 8}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                ))}

                {/* お客さん */}
                {customers.filter(c => c.status !== 'gone').map(customer => (
                  <DotCharacter key={customer.id} customer={customer} />
                ))}

                {/* カウンター */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 rounded-t-lg border-t-2 border-amber-500/50" />

                {/* 時間帯表示 */}
                <div className="absolute top-3 right-3 px-3 py-1 bg-black/50 rounded-full text-xs">
                  {getTimeOfDay(currentTime) === 'morning' && '🌅 朝の時間帯'}
                  {getTimeOfDay(currentTime) === 'lunch' && '🍽️ ランチタイム'}
                  {getTimeOfDay(currentTime) === 'afternoon' && '☀️ 午後の時間帯'}
                  {getTimeOfDay(currentTime) === 'evening' && '🌙 夕方〜夜'}
                </div>
              </div>

              {/* コントロール */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className={`px-6 py-3 rounded-xl font-bold ${isPaused ? 'bg-green-600' : 'bg-yellow-600'}`}
                >
                  {isPaused ? '▶ 再開' : '⏸ 一時停止'}
                </button>
                <button
                  onClick={() => setSpeed(speed === 1 ? 3 : speed === 3 ? 5 : 1)}
                  className="px-6 py-3 bg-blue-600 rounded-xl font-bold"
                >
                  速度 x{speed}
                </button>
                <button
                  onClick={finishDay}
                  className="px-6 py-3 bg-purple-600 rounded-xl font-bold"
                >
                  営業終了 →
                </button>
              </div>
            </div>
          )}

          {/* 結果パート */}
          {phase === 'result' && dayResult && (
            <div className="space-y-6">
              <div className="text-center py-4">
                <h2 className="text-3xl font-black mb-2">📊 本日の営業結果</h2>
                <p className="text-gray-400">Day {day} 終了</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <ResultCard icon="👥" label="来客数" value={`${dayResult.customers}名`} />
                <ResultCard icon="💰" label="売上" value={`${dayResult.sales.toLocaleString()}G`} color="text-green-400" />
                <ResultCard icon="📦" label="原価" value={`${dayResult.cost.toLocaleString()}G`} color="text-red-400" />
                <ResultCard
                  icon={dayResult.profit >= 0 ? "📈" : "📉"}
                  label="利益"
                  value={`${dayResult.profit >= 0 ? '+' : ''}${dayResult.profit.toLocaleString()}G`}
                  color={dayResult.profit >= 0 ? "text-green-400" : "text-red-400"}
                  highlight
                />
              </div>

              {dayResult.ikemenVisits.length > 0 && (
                <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl p-5 border border-pink-500/30">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">💕</span>
                    <h3 className="font-bold text-pink-300">本日来店のイケメン</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {dayResult.ikemenVisits.map((id) => {
                      const char = CHARACTERS[id];
                      const charImage = ASSETS.characters[id];
                      
                      return (
                        <div key={id} className="bg-black/30 rounded-xl overflow-hidden border border-pink-400/30">
                          <div className="h-32 bg-gradient-to-b from-purple-900/50 to-black/50 relative overflow-hidden">
                            {charImage ? (
                              <img src={charImage} alt={char.name} className="w-full h-full object-cover object-top" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-5xl">{char.icon}</div>
                            )}
                          </div>
                          <div className="p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-lg">{char.icon}</span>
                              <span className="font-bold">{char.name}</span>
                            </div>
                            <p className="text-xs text-pink-400">♥ +10</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex justify-center pt-4">
                <button
                  onClick={handleToAdvice}
                  className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-bold text-lg shadow-lg hover:scale-105 transition-transform"
                >
                  シオンのアドバイスを聞く →
                </button>
              </div>
            </div>
          )}

          {/* アドバイスパート */}
          {phase === 'advice' && (() => {
            const advice = getShionAdvice();
            const moodStyles = {
              happy: { bg: 'from-green-900/40 to-emerald-900/40', border: 'border-green-500/30', nameColor: 'text-green-300', icon: '😊' },
              excited: { bg: 'from-yellow-900/40 to-orange-900/40', border: 'border-yellow-500/30', nameColor: 'text-yellow-300', icon: '✨' },
              concerned: { bg: 'from-blue-900/40 to-indigo-900/40', border: 'border-blue-500/30', nameColor: 'text-blue-300', icon: '🤔' },
              neutral: { bg: 'from-purple-900/40 to-violet-900/40', border: 'border-purple-500/30', nameColor: 'text-purple-300', icon: '🌿' }
            };
            const style = moodStyles[advice.mood];

            return (
              <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <div className="max-w-3xl w-full">
                  <div className={`bg-gradient-to-br ${style.bg} rounded-3xl p-6 border ${style.border} shadow-2xl`}>
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0 flex flex-col items-center">
                        <div className={`w-32 h-40 rounded-2xl overflow-hidden border-2 ${style.border} shadow-lg`}>
                          {ASSETS.characters.shion ? (
                            <img src={ASSETS.characters.shion} alt="シオン" className="w-full h-full object-cover object-top" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-5xl">🌳</div>
                          )}
                        </div>
                        <div className="text-center mt-2">
                          <p className={`font-bold ${style.nameColor} flex items-center gap-1 justify-center`}>
                            <span>{style.icon}</span><span>シオン</span>
                          </p>
                          <p className="text-xs text-gray-400">Forest Sage</p>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                          <p className="text-lg leading-relaxed">{advice.message}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center mt-8">
                    <button onClick={handleFinish} className="px-12 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-bold text-xl shadow-2xl hover:scale-105 transition-all">
                      <span className="flex items-center gap-3"><span>🌅</span><span>翌日へ</span></span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </main>

      {/* フッター */}
      <footer className="relative z-10 p-4 border-t border-white/10 bg-black/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setScreen('home')}
            className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <span>←</span><span>ホームに戻る</span>
          </button>
        </div>
      </footer>
    </div>
  );
}

function ResultCard({ icon, label, value, color = 'text-white', highlight = false }: { icon: string; label: string; value: string; color?: string; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl p-5 border ${highlight ? 'bg-gradient-to-br from-white/10 to-white/5 border-white/20 shadow-lg' : 'bg-white/5 border-white/10'}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{icon}</span>
        <span className="text-sm text-gray-400">{label}</span>
      </div>
      <p className={`text-3xl font-black ${color}`}>{value}</p>
    </div>
  );
}
