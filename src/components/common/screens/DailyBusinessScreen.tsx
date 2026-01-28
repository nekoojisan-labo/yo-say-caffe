import { useState } from 'react';
import { useGameStore, useInventoryStore } from '@/store';
import { MENU_DATA } from '@/data/menuData';
import { CHARACTERS, CharacterId } from '@/game/characters';
import { ASSETS } from '@/utils/assets';

type BusinessPhase = 'procurement' | 'operation' | 'result' | 'advice';

interface DayResultData {
  customers: number;
  sales: number;
  cost: number;
  profit: number;
  ikemenVisits: CharacterId[];
}

export function DailyBusinessScreen() {
  const { 
    day, money, addMoney, advanceDay, setScreen,
    affection
  } = useGameStore();
  const { getStock, consumeStock, confirmOrders, processDayChange } = useInventoryStore();

  const [phase, setPhase] = useState<BusinessPhase>('procurement');
  const [orders, setOrders] = useState<Record<string, number>>({});
  const [dayResult, setDayResult] = useState<DayResultData | null>(null);

  const unlockedMenus = MENU_DATA.filter((m) => m.unlocked);

  const calculateProcurementCost = () => {
    return Object.entries(orders).reduce((total, [itemId, qty]) => {
      const menu = MENU_DATA.find((m) => m.id === itemId);
      return total + (menu ? menu.cost * qty : 0);
    }, 0);
  };

  const totalOrderCount = Object.values(orders).reduce((sum, qty) => sum + qty, 0);

  const handleConfirmProcurement = () => {
    const cost = calculateProcurementCost();
    if (cost > money) {
      alert('資金が不足しています！');
      return;
    }
    addMoney(-cost);
    confirmOrders(orders);
    processDayChange();
    setPhase('operation');
  };

  const simulateDay = () => {
    let sales = 0;
    let costTotal = 0;
    let customers = 0;
    const ikemenVisits: CharacterId[] = [];

    const customerCount = 10 + Math.floor(Math.random() * 20);
    const characterIds = Object.keys(CHARACTERS) as CharacterId[];

    for (let i = 0; i < customerCount; i++) {
      const availableMenus = unlockedMenus.filter((m) => getStock(m.id) > 0);
      if (availableMenus.length === 0) break;

      const menu = availableMenus[Math.floor(Math.random() * availableMenus.length)];
      if (consumeStock(menu.id, 1)) {
        sales += menu.price;
        costTotal += menu.cost;
        customers++;

        if (Math.random() < 0.15) {
          const ikemenId = characterIds[Math.floor(Math.random() * characterIds.length)];
          if (!ikemenVisits.includes(ikemenId)) {
            ikemenVisits.push(ikemenId);
          }
        }
      }
    }

    addMoney(sales);

    // イケメンと出会ったら図鑑を解放＆好感度UP
    ikemenVisits.forEach((ikemenId) => {
      useGameStore.getState().unlockEncyclopedia(ikemenId);
      useGameStore.getState().addAffection(ikemenId, 10);
    });

    setDayResult({
      customers,
      sales,
      cost: costTotal,
      profit: sales - costTotal,
      ikemenVisits,
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
  
  // 優先度順にアドバイスを判定
  
  // 1. 危機的状況
  if (currentMoney < 5000) {
    return {
      message: '資金がかなり厳しい状態だね...。まずは確実に売れるメニューに絞って、少量仕入れで利益を積み重ねよう。僕も全力でサポートするから、諦めないで。',
      mood: 'concerned'
    };
  }

  // 2. 大赤字
  if (profit < -1000) {
    return {
      message: '今日は大きな赤字だった...。仕入れが多すぎたか、お客さんが予想より少なかったね。明日は仕入れ量を半分くらいに抑えて様子を見てみよう。',
      mood: 'concerned'
    };
  }

  // 3. 客が来なかった
  if (customers < 5) {
    return {
      message: 'お客さんがほとんど来なかったね...。在庫が余ってしまうかも。評判を上げるために、まずはイケメンたちとの交流を増やしてみては？口コミで広がるかもしれないよ。',
      mood: 'concerned'
    };
  }

  // 4. イケメン複数来店
  if (ikemenVisits.length >= 3) {
    const names = ikemenVisits.map(id => CHARACTERS[id].name).join('、');
    return {
      message: `今日は${names}と、なんと${ikemenVisits.length}人も来てくれたね！すごい人気だ。この調子で彼らの好みのメニューを揃えておくと、もっと来てくれるかもしれないよ。`,
      mood: 'excited'
    };
  }

  // 5. イケメン来店あり
  if (ikemenVisits.length > 0) {
    const visitedChar = CHARACTERS[ikemenVisits[0]];
    const currentAffection = affection[ikemenVisits[0]] || 0;
    
    if (currentAffection >= 50) {
      return {
        message: `${visitedChar.name}との絆が深まってきているね。彼の好みをもっと研究して、特別なメニューを用意してみたらどうかな？きっと喜んでくれるよ。`,
        mood: 'happy'
      };
    }
    return {
      message: `${visitedChar.name}が来てくれたね！${visitedChar.attribute}の妖精は${visitedChar.role}として知られているんだ。彼の好みを覚えておくと、また来てくれるかもしれないよ。`,
      mood: 'happy'
    };
  }

  // 6. 高利益率
  if (profitMargin > 40) {
    return {
      message: `素晴らしい！利益率が${Math.round(profitMargin)}%もある。効率的な経営ができているね。余裕があるなら新メニューの開発に投資してみては？選択肢が増えればお客さんも喜ぶよ。`,
      mood: 'excited'
    };
  }

  // 7. 大盛況
  if (customers >= 25) {
    return {
      message: `今日は${customers}人も来店してくれた！大盛況だね。このペースなら在庫を少し増やしても大丈夫かも。でも廃棄には気をつけてね。`,
      mood: 'happy'
    };
  }

  // 8. 安定した利益
  if (profit > 500) {
    return {
      message: `安定した利益が出ているね。${profit.toLocaleString()}Gの黒字は立派だよ。この調子を維持しながら、少しずつ規模を拡大していこう。`,
      mood: 'happy'
    };
  }

  // 9. 小さな赤字
  if (profit < 0) {
    return {
      message: '今日は少し赤字だったけど、大きな問題じゃないよ。仕入れと売れ行きのバランスを少し調整すれば、すぐに黒字に戻せるはず。焦らずいこう。',
      mood: 'neutral'
    };
  }

  // 10. 低利益率
  if (profitMargin < 15 && profit > 0) {
    return {
      message: '黒字ではあるけど、利益率が少し低いね。原価の高いメニューに偏っていないかな？バランスよく仕入れると、もう少し利益が出せるかもしれないよ。',
      mood: 'neutral'
    };
  }

  // 11. 日数に応じたアドバイス
  if (day <= 3) {
    return {
      message: 'まだ始まったばかりだね。最初は無理せず、少量の仕入れで感覚をつかんでいこう。お客さんの好みや来店パターンが分かってくれば、自然と利益も上がっていくよ。',
      mood: 'neutral'
    };
  }

  if (day >= 10 && day % 10 === 0) {
    return {
      message: `${day}日目おめでとう！ここまでよく頑張ったね。累計の売上と利益を振り返って、次の目標を立ててみよう。僕はいつでも君の味方だよ。`,
      mood: 'happy'
    };
  }

  // 12. デフォルト
  const defaultMessages = [
    '今日も一日お疲れ様。コツコツ続けることが大切だよ。明日も一緒に頑張ろう。',
    '順調な営業だったね。この調子で少しずつ成長していこう。僕も応援してるから。',
    '安定した一日だったね。新しいメニューや内装で変化をつけてみるのもいいかもしれないよ。',
    '今日の経験が明日に活きるよ。毎日の積み重ねが、きっと大きな成果につながるはずさ。',
  ];
  
  return {
    message: defaultMessages[day % defaultMessages.length],
    mood: 'neutral'
  };
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
                  const profit = menu.price - menu.cost;
                  
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
                            <span className="text-cyan-400">+{profit}G</span>
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

          {/* 営業パート */}
          {phase === 'operation' && (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="text-center space-y-8">
                <div className="relative">
                  <div className="text-8xl mb-4 animate-bounce">☕</div>
                </div>
                <div>
                  <h2 className="text-3xl font-black mb-2">準備完了！</h2>
                  <p className="text-gray-400">お客様をお迎えしましょう</p>
                </div>
                <button
                  onClick={simulateDay}
                  className="group relative px-12 py-5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl font-bold text-xl shadow-2xl hover:scale-105 transition-all"
                >
                  <span className="flex items-center gap-3">
                    <span>🚪</span>
                    <span>開店する</span>
                  </span>
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

              {/* イケメン来店（画像付き） */}
              {dayResult.ikemenVisits.length > 0 && (
                <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl p-5 border border-pink-500/30">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">💕</span>
                    <h3 className="font-bold text-pink-300">本日来店のイケメン</h3>
                    <span className="text-xs bg-pink-500/30 px-2 py-1 rounded-full text-pink-200">
                      NEW! 図鑑に登録されました
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {dayResult.ikemenVisits.map((id) => {
                      const char = CHARACTERS[id];
                      const charImage = ASSETS.characters[id];
                      
                      return (
                        <div
                          key={id}
                          className="bg-black/30 rounded-xl overflow-hidden border border-pink-400/30"
                        >
                          {/* キャラ画像 */}
                          <div className="h-32 bg-gradient-to-b from-purple-900/50 to-black/50 relative overflow-hidden">
                            {charImage ? (
                              <img
                                src={charImage}
                                alt={char.name}
                                className="w-full h-full object-cover object-top"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-5xl">
                                {char.icon}
                              </div>
                            )}
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
                          </div>
                          {/* キャラ情報 */}
                          <div className="p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-lg">{char.icon}</span>
                              <span className="font-bold">{char.name}</span>
                            </div>
                            <p className="text-xs text-gray-400">{char.attribute}の妖精</p>
                            <p className="text-xs text-pink-400 mt-1">♥ +10</p>
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
        </div>
          {/* アドバイスパート（シオンの画像付き） */}
{phase === 'advice' && (() => {
  const advice = getShionAdvice();
  const moodStyles = {
    happy: {
      bg: 'from-green-900/40 to-emerald-900/40',
      border: 'border-green-500/30',
      shadow: 'shadow-green-500/30',
      nameColor: 'text-green-300',
      icon: '😊'
    },
    excited: {
      bg: 'from-yellow-900/40 to-orange-900/40',
      border: 'border-yellow-500/30',
      shadow: 'shadow-yellow-500/30',
      nameColor: 'text-yellow-300',
      icon: '✨'
    },
    concerned: {
      bg: 'from-blue-900/40 to-indigo-900/40',
      border: 'border-blue-500/30',
      shadow: 'shadow-blue-500/30',
      nameColor: 'text-blue-300',
      icon: '🤔'
    },
    neutral: {
      bg: 'from-purple-900/40 to-violet-900/40',
      border: 'border-purple-500/30',
      shadow: 'shadow-purple-500/30',
      nameColor: 'text-purple-300',
      icon: '🌿'
    }
  };
  const style = moodStyles[advice.mood];

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="max-w-3xl w-full">
        <div className={`bg-gradient-to-br ${style.bg} rounded-3xl p-6 border ${style.border} shadow-2xl ${style.shadow}`}>
          <div className="flex flex-col md:flex-row gap-6">
            {/* シオンの画像 */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className={`w-32 h-40 rounded-2xl overflow-hidden border-2 ${style.border} shadow-lg ${style.shadow}`}>
                {ASSETS.characters.shion ? (
                  <img
                    src={ASSETS.characters.shion}
                    alt="シオン"
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-5xl">
                    🌳
                  </div>
                )}
              </div>
              <div className="text-center mt-2">
                <p className={`font-bold ${style.nameColor} flex items-center gap-1`}>
                  <span>{style.icon}</span>
                  <span>シオン</span>
                </p>
                <p className="text-xs text-gray-400">Forest Sage</p>
              </div>
            </div>

            {/* 吹き出し */}
            <div className="flex-1">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10 relative">
                <div className="hidden md:block absolute left-[-12px] top-8 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-12 border-r-white/10" />
                <p className="text-lg leading-relaxed">{advice.message}</p>
              </div>
              
              {/* 簡易サマリー */}
              {dayResult && (
                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
                  <div className="bg-black/20 rounded-lg p-2">
                    <p className="text-gray-400 text-xs">来客</p>
                    <p className="font-bold">{dayResult.customers}人</p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-2">
                    <p className="text-gray-400 text-xs">売上</p>
                    <p className="font-bold text-green-400">{dayResult.sales.toLocaleString()}G</p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-2">
                    <p className="text-gray-400 text-xs">利益</p>
                    <p className={`font-bold ${dayResult.profit >= 0 ? 'text-cyan-400' : 'text-red-400'}`}>
                      {dayResult.profit >= 0 ? '+' : ''}{dayResult.profit.toLocaleString()}G
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={handleFinish}
            className="group relative px-12 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-bold text-xl shadow-2xl hover:scale-105 transition-all"
          >
            <span className="flex items-center gap-3">
              <span>🌅</span>
              <span>翌日へ</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
})()}

      </main>

      {/* フッター */}
      <footer className="relative z-10 p-4 border-t border-white/10 bg-black/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setScreen('home')}
            className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <span>←</span>
            <span>ホームに戻る</span>
          </button>
        </div>
      </footer>
    </div>
  );
}

function ResultCard({
  icon,
  label,
  value,
  color = 'text-white',
  highlight = false,
}: {
  icon: string;
  label: string;
  value: string;
  color?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-5 border transition-all ${
        highlight
          ? 'bg-gradient-to-br from-white/10 to-white/5 border-white/20 shadow-lg'
          : 'bg-white/5 border-white/10'
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{icon}</span>
        <span className="text-sm text-gray-400">{label}</span>
      </div>
      <p className={`text-3xl font-black ${color}`}>{value}</p>
    </div>
  );
}
