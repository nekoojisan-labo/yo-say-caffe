import { useGameStore } from '@/store';
import { Header, Button, Card } from '@/components/common';
import { INTERIOR_DATA } from '@/data/interiorData';

export function InteriorScreen() {
  const { setScreen, money, ownedInteriors, buyInterior, deductMoney } = useGameStore();

  // 購入可能なアイテム
  const availableItems = INTERIOR_DATA.filter(
    (item) => !ownedInteriors.includes(item.id) && item.price > 0 && item.unlocked
  );

  // 所有アイテム
  const ownedItems = INTERIOR_DATA.filter((item) =>
    ownedInteriors.includes(item.id)
  );

  // 効果の説明
  const getEffectText = (item: typeof INTERIOR_DATA[0]): string => {
    switch (item.effect.type) {
      case 'capacity':
        return `席数: ${item.effect.value}`;
      case 'satisfaction':
        return `満足度+${item.effect.value}`;
      case 'attractIkemen':
        return `イケメン引き寄せ+${item.effect.value}%`;
      case 'menuUnlock':
        return `メニュー解放: ${(item.effect.value as string[]).join(', ')}`;
      default:
        return '';
    }
  };

  const handlePurchase = (item: typeof INTERIOR_DATA[0]) => {
    if (money >= item.price) {
      deductMoney(item.price);
      buyInterior(item.id);
      alert(`「${item.name}」を購入しました！`);
    } else {
      alert('所持金が不足しています');
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-fairy-pink-50 to-fairy-lavender-100">
      <Header />

      <div className="flex-1 flex flex-col p-4 gap-4 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800">🏠 内装カスタマイズ</h1>

        {/* ショップ */}
        <Card title="🛒 ショップ" titleIcon="">
          {availableItems.length > 0 ? (
            <div className="space-y-3">
              {availableItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                >
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-xs text-green-600">{getEffectText(item)}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${money >= item.price ? 'text-fairy-pink-500' : 'text-red-500'}`}>
                      {item.price.toLocaleString()}G
                    </p>
                    <Button
                      variant={money >= item.price ? 'primary' : 'ghost'}
                      size="sm"
                      onClick={() => handlePurchase(item)}
                      disabled={money < item.price}
                    >
                      購入
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">購入可能なアイテムはありません</p>
          )}
        </Card>

        {/* 所持品 */}
        <Card title="📦 所持品" titleIcon="">
          {ownedItems.length > 0 ? (
            <div className="space-y-2">
              {ownedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-fairy-pink-50 rounded-xl"
                >
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-xs text-green-600">{getEffectText(item)}</p>
                  </div>
                  <span className="text-xs bg-fairy-pink-200 text-white px-2 py-1 rounded-full">
                    所有中
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">まだアイテムを持っていません</p>
          )}
        </Card>

        <Button variant="ghost" onClick={() => setScreen('home')} fullWidth>
          ホームへ戻る
        </Button>
      </div>
    </div>
  );
}
