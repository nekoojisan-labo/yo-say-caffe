import { useState, useMemo } from 'react';
import { useGameStore, useNotificationStore } from '@/store';
import { Header, Button, Card, Tab, Modal } from '@/components/common';
import { INTERIOR_DATA, InteriorCategory } from '@/data/interiorData';
import { useAudio } from '@/hooks';
import type { InteriorItem } from '@/types';

type TabType = 'shop' | 'owned';

export function InteriorScreen() {
  const { setScreen, money, deductMoney, ownedInteriors, equippedInteriors, buyInterior, equipInterior } = useGameStore();
  const { addNotification } = useNotificationStore();
  const { playSE } = useAudio();
  const [activeTab, setActiveTab] = useState<TabType>('shop');
  const [selectedItem, setSelectedItem] = useState<InteriorItem | null>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showEquipModal, setShowEquipModal] = useState(false);

  // カテゴリでグループ化
  const interiorsByCategory = useMemo(() => {
    const groups: Record<InteriorCategory, InteriorItem[]> = {
      wall: [],
      floor: [],
      furniture: [],
      decoration: [],
      lighting: [],
    };

    INTERIOR_DATA.forEach((item) => {
      groups[item.category].push(item);
    });

    return groups;
  }, []);

  const categoryNames: Record<InteriorCategory, string> = {
    wall: '🧱 壁紙',
    floor: '🪵 床材',
    furniture: '🪑 家具',
    decoration: '🎀 装飾',
    lighting: '💡 照明',
  };

  // 購入処理
  const handlePurchase = (item: InteriorItem) => {
    setSelectedItem(item);
    setShowPurchaseModal(true);
  };

  const confirmPurchase = () => {
    if (!selectedItem) return;

    if (money < selectedItem.price) {
      addNotification('error', '所持金が不足しています');
      playSE('error');
      setShowPurchaseModal(false);
      return;
    }

    deductMoney(selectedItem.price);
    buyInterior(selectedItem.id);
    playSE('coin');
    addNotification('success', `「${selectedItem.name}」を購入しました！`);
    setShowPurchaseModal(false);
    setSelectedItem(null);
  };

  // 装備処理
  const handleEquip = (item: InteriorItem) => {
    setSelectedItem(item);
    setShowEquipModal(true);
  };

  const confirmEquip = () => {
    if (!selectedItem) return;

    equipInterior(selectedItem.id, selectedItem.category);
    playSE('click');
    addNotification('success', `「${selectedItem.name}」を設置しました！`);
    setShowEquipModal(false);
    setSelectedItem(null);
  };

  // 効果の説明文を生成
  const getEffectDescription = (item: InteriorItem): string => {
    const effects: string[] = [];

    if (item.effects.satisfactionBonus) {
      effects.push(`満足度+${item.effects.satisfactionBonus}%`);
    }
    if (item.effects.salesBonus) {
      effects.push(`売上+${item.effects.salesBonus}%`);
    }
    if (item.effects.ikemenChanceBonus) {
      effects.push(`イケメン出現率+${item.effects.ikemenChanceBonus}%`);
    }
    if (item.effects.seatCapacityBonus) {
      effects.push(`席数+${item.effects.seatCapacityBonus}`);
    }

    return effects.length > 0 ? effects.join(', ') : 'なし';
  };

  const tabs = [
    { id: 'shop', label: 'ショップ' },
    { id: 'owned', label: '所持品' },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-fairy-pink-50 to-fairy-lavender-100">
      <Header />

      <div className="flex-1 flex flex-col p-4 gap-4 overflow-y-auto">
        {/* タイトル */}
        <h1 className="text-2xl font-bold text-gray-800">🏠 内装カスタマイズ</h1>

        {/* 現在の効果サマリー */}
        <CurrentEffectsSummary equippedInteriors={equippedInteriors} />

        {/* タブ */}
        <Tab
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={(id) => setActiveTab(id as TabType)}
          variant="pills"
          size="sm"
        />

        {activeTab === 'shop' ? (
          <>
            {/* ショップ */}
            {Object.entries(interiorsByCategory).map(([category, items]) => {
              const availableItems = items.filter(
                (item) => !ownedInteriors.includes(item.id)
              );

              if (availableItems.length === 0) return null;

              return (
                <Card key={category} title={categoryNames[category as InteriorCategory]} titleIcon="">
                  <div className="space-y-3">
                    {availableItems.map((item) => (
                      <InteriorShopItem
                        key={item.id}
                        item={item}
                        effectDescription={getEffectDescription(item)}
                        canAfford={money >= item.price}
                        onPurchase={() => handlePurchase(item)}
                      />
                    ))}
                  </div>
                </Card>
              );
            })}
          </>
        ) : (
          <>
            {/* 所持品 */}
            {Object.entries(interiorsByCategory).map(([category, items]) => {
              const ownedItems = items.filter((item) =>
                ownedInteriors.includes(item.id)
              );

              if (ownedItems.length === 0) return null;

              const equippedId = equippedInteriors[category as InteriorCategory];

              return (
                <Card key={category} title={categoryNames[category as InteriorCategory]} titleIcon="">
                  <div className="space-y-3">
                    {ownedItems.map((item) => (
                      <InteriorOwnedItem
                        key={item.id}
                        item={item}
                        effectDescription={getEffectDescription(item)}
                        isEquipped={item.id === equippedId}
                        onEquip={() => handleEquip(item)}
                      />
                    ))}
                  </div>
                </Card>
              );
            })}

            {ownedInteriors.length === 0 && (
              <Card>
                <div className="text-center py-8 text-gray-500">
                  <p className="text-xl mb-2">📦</p>
                  <p>まだ内装アイテムを持っていません</p>
                  <p className="text-sm mt-2">ショップで購入しましょう</p>
                </div>
              </Card>
            )}
          </>
        )}

        {/* 戻るボタン */}
        <Button variant="ghost" onClick={() => setScreen('cafe')} fullWidth>
          戻る
        </Button>
      </div>

      {/* 購入確認モーダル */}
      {showPurchaseModal && selectedItem && (
        <Modal
          isOpen={showPurchaseModal}
          onClose={() => setShowPurchaseModal(false)}
          title="購入確認"
        >
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-4xl">{selectedItem.icon}</span>
              <h3 className="text-xl font-bold mt-2">{selectedItem.name}</h3>
              <p className="text-gray-500 text-sm mt-1">{selectedItem.description}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">効果</span>
                <span className="font-medium text-green-600">
                  {getEffectDescription(selectedItem)}
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between">
                <span className="font-bold text-gray-800">価格</span>
                <span className="font-bold text-fairy-pink-500">
                  {selectedItem.price.toLocaleString()}G
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="ghost"
                onClick={() => setShowPurchaseModal(false)}
                className="flex-1"
              >
                キャンセル
              </Button>
              <Button
                variant="primary"
                onClick={confirmPurchase}
                className="flex-1"
                disabled={money < selectedItem.price}
              >
                購入する
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* 装備確認モーダル */}
      {showEquipModal && selectedItem && (
        <Modal
          isOpen={showEquipModal}
          onClose={() => setShowEquipModal(false)}
          title="設置確認"
        >
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-4xl">{selectedItem.icon}</span>
              <h3 className="text-xl font-bold mt-2">{selectedItem.name}</h3>
            </div>

            <p className="text-center text-gray-600">
              この{categoryNames[selectedItem.category]}を設置しますか？
            </p>

            <div className="flex gap-3">
              <Button
                variant="ghost"
                onClick={() => setShowEquipModal(false)}
                className="flex-1"
              >
                キャンセル
              </Button>
              <Button
                variant="primary"
                onClick={confirmEquip}
                className="flex-1"
              >
                設置する
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// 現在の効果サマリー
function CurrentEffectsSummary({
  equippedInteriors,
}: {
  equippedInteriors: Record<InteriorCategory, string | null>;
}) {
  const totalEffects = useMemo(() => {
    let satisfactionBonus = 0;
    let salesBonus = 0;
    let ikemenChanceBonus = 0;
    let seatCapacityBonus = 0;

    Object.values(equippedInteriors).forEach((itemId) => {
      if (!itemId) return;
      const item = INTERIOR_DATA.find((i) => i.id === itemId);
      if (!item) return;

      satisfactionBonus += item.effects.satisfactionBonus || 0;
      salesBonus += item.effects.salesBonus || 0;
      ikemenChanceBonus += item.effects.ikemenChanceBonus || 0;
      seatCapacityBonus += item.effects.seatCapacityBonus || 0;
    });

    return { satisfactionBonus, salesBonus, ikemenChanceBonus, seatCapacityBonus };
  }, [equippedInteriors]);

  return (
    <Card className="bg-gradient-to-r from-fairy-pink-100 to-fairy-lavender-100">
      <div className="text-center mb-2">
        <span className="text-sm text-gray-600">現在の内装効果</span>
      </div>
      <div className="flex justify-around text-center">
        {totalEffects.satisfactionBonus > 0 && (
          <div>
            <p className="text-sm text-gray-500">満足度</p>
            <p className="font-bold text-green-600">+{totalEffects.satisfactionBonus}%</p>
          </div>
        )}
        {totalEffects.salesBonus > 0 && (
          <div>
            <p className="text-sm text-gray-500">売上</p>
            <p className="font-bold text-green-600">+{totalEffects.salesBonus}%</p>
          </div>
        )}
        {totalEffects.ikemenChanceBonus > 0 && (
          <div>
            <p className="text-sm text-gray-500">イケメン率</p>
            <p className="font-bold text-green-600">+{totalEffects.ikemenChanceBonus}%</p>
          </div>
        )}
        {totalEffects.seatCapacityBonus > 0 && (
          <div>
            <p className="text-sm text-gray-500">席数</p>
            <p className="font-bold text-green-600">+{totalEffects.seatCapacityBonus}</p>
          </div>
        )}
        {Object.values(totalEffects).every((v) => v === 0) && (
          <p className="text-gray-500">効果なし</p>
        )}
      </div>
    </Card>
  );
}

// ショップアイテム
interface InteriorShopItemProps {
  item: InteriorItem;
  effectDescription: string;
  canAfford: boolean;
  onPurchase: () => void;
}

function InteriorShopItem({
  item,
  effectDescription,
  canAfford,
  onPurchase,
}: InteriorShopItemProps) {
  return (
    <div className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
      <span className="text-3xl">{item.icon}</span>
      <div className="flex-1">
        <p className="font-medium text-gray-800">{item.name}</p>
        <p className="text-xs text-gray-500">{item.description}</p>
        <p className="text-xs text-green-600">{effectDescription}</p>
      </div>
      <div className="text-right">
        <p className={`font-bold ${canAfford ? 'text-fairy-pink-500' : 'text-red-500'}`}>
          {item.price.toLocaleString()}G
        </p>
        <Button
          variant={canAfford ? 'primary' : 'ghost'}
          size="sm"
          onClick={onPurchase}
          disabled={!canAfford}
        >
          購入
        </Button>
      </div>
    </div>
  );
}

// 所持アイテム
interface InteriorOwnedItemProps {
  item: InteriorItem;
  effectDescription: string;
  isEquipped: boolean;
  onEquip: () => void;
}

function InteriorOwnedItem({
  item,
  effectDescription,
  isEquipped,
  onEquip,
}: InteriorOwnedItemProps) {
  return (
    <div
      className={`flex items-center gap-3 py-2 border-b border-gray-100 last:border-0 ${
        isEquipped ? 'bg-fairy-pink-50 -mx-4 px-4 rounded-lg' : ''
      }`}
    >
      <span className="text-3xl">{item.icon}</span>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-medium text-gray-800">{item.name}</p>
          {isEquipped && (
            <span className="text-xs bg-fairy-pink-200 text-white px-2 py-0.5 rounded-full">
              設置中
            </span>
          )}
        </div>
        <p className="text-xs text-green-600">{effectDescription}</p>
      </div>
      {!isEquipped && (
        <Button variant="ghost" size="sm" onClick={onEquip}>
          設置
        </Button>
      )}
    </div>
  );
}
