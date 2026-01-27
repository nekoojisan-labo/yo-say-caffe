import { useState } from 'react';
import { useGameStore, useNotificationStore } from '@/store';
import { Header, Button, Card, Tab, Modal } from '@/components/common';
import { MENU_DATA } from '@/data/menuData';
import { useAudio } from '@/hooks';
import type { MenuItem } from '@/types';

type TabType = 'develop' | 'unlocked';
type MenuCategoryType = 'drink' | 'food' | 'sweet';

export function MenuDevScreen() {
  const { setScreen, money, deductMoney, unlockedMenus, unlockMenu, shopRank } = useGameStore();
  const { addNotification } = useNotificationStore();
  const { playSE } = useAudio();
  const [activeTab, setActiveTab] = useState<TabType>('develop');
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // 開発可能なメニュー（未解放で、ランク条件を満たすもの）
  const developableMenus = MENU_DATA.filter((menu) => {
    if (unlockedMenus.includes(menu.id)) return false;
    if (menu.developCost <= 0) return false;

    // ランク条件チェック
    if (menu.unlockCondition?.type === 'rank' && menu.unlockCondition.rank) {
      const rankOrder = ['F', 'E', 'D', 'C', 'B', 'A', 'S'];
      const currentRankIdx = rankOrder.indexOf(shopRank);
      const requiredRankIdx = rankOrder.indexOf(menu.unlockCondition.rank);
      if (currentRankIdx < requiredRankIdx) return false;
    }

    return true;
  });

  // 解放済みメニュー
  const unlockedMenusList = MENU_DATA.filter((menu) =>
    unlockedMenus.includes(menu.id)
  );

  // メニュー開発
  const handleDevelop = (menu: MenuItem) => {
    setSelectedMenu(menu);
    setShowConfirmModal(true);
  };

  const confirmDevelop = () => {
    if (!selectedMenu) return;

    const cost = selectedMenu.developCost;

    if (money < cost) {
      addNotification('error', '所持金が不足しています');
      playSE('error');
      setShowConfirmModal(false);
      return;
    }

    deductMoney(cost);
    unlockMenu(selectedMenu.id);
    playSE('unlock');
    addNotification('success', `「${selectedMenu.name}」を開発しました！`);
    setShowConfirmModal(false);
    setSelectedMenu(null);
  };

  const tabs = [
    { id: 'develop', label: '開発' },
    { id: 'unlocked', label: '解放済み' },
  ];

  const categoryNames: Record<MenuCategoryType, string> = {
    drink: '🍹 ドリンク',
    food: '🍴 フード',
    sweet: '🍰 スイーツ',
  };

  const getCategoryIcon = (category: string): string => {
    switch (category) {
      case 'drink': return '☕';
      case 'food': return '🍞';
      case 'sweet': return '🍰';
      default: return '🍽️';
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-fairy-pink-50 to-fairy-lavender-100">
      <Header />

      <div className="flex-1 flex flex-col p-4 gap-4 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800">🔬 メニュー開発</h1>

        <Tab
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={(id) => setActiveTab(id as TabType)}
          variant="pills"
          size="sm"
        />

        {activeTab === 'develop' ? (
          <>
            {developableMenus.length === 0 ? (
              <Card>
                <div className="text-center py-8 text-gray-500">
                  <p className="text-xl mb-2">🔒</p>
                  <p>開発可能なメニューがありません</p>
                  <p className="text-sm mt-2">ランクを上げると新しいメニューが開発可能になります</p>
                </div>
              </Card>
            ) : (
              <div className="space-y-3">
                {developableMenus.map((menu) => (
                  <Card key={menu.id} className="border-2 border-fairy-lavender-200">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{getCategoryIcon(menu.category)}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800">{menu.name}</h3>
                        <p className="text-sm text-gray-500">{menu.description || `${categoryNames[menu.category as MenuCategoryType]}メニュー`}</p>
                        <div className="flex gap-4 text-sm mt-1">
                          <span className="text-gray-600">売価: {menu.price}G</span>
                          <span className="text-gray-600">原価: {menu.cost}G</span>
                          <span className="text-green-600">利益: {menu.price - menu.cost}G</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">開発費用</p>
                        <p className={`font-bold ${money >= menu.developCost ? 'text-fairy-pink-500' : 'text-red-500'}`}>
                          {menu.developCost.toLocaleString()}G
                        </p>
                        <Button
                          variant={money >= menu.developCost ? 'primary' : 'ghost'}
                          size="sm"
                          onClick={() => handleDevelop(menu)}
                          disabled={money < menu.developCost}
                          className="mt-2"
                        >
                          開発
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            {(['drink', 'food', 'sweet'] as MenuCategoryType[]).map((category) => {
              const itemsInCategory = unlockedMenusList.filter((m) => m.category === category);
              if (itemsInCategory.length === 0) return null;

              return (
                <Card key={category} title={categoryNames[category]} titleIcon="">
                  <div className="space-y-2">
                    {itemsInCategory.map((menu) => (
                      <div key={menu.id} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                        <span className="text-2xl">{getCategoryIcon(menu.category)}</span>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{menu.name}</p>
                          <p className="text-xs text-gray-500">売価 {menu.price}G / 原価 {menu.cost}G</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-green-600">+{menu.price - menu.cost}G</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </>
        )}

        <Button variant="ghost" onClick={() => setScreen('home')} fullWidth>
          ホームへ戻る
        </Button>
      </div>

      {showConfirmModal && selectedMenu && (
        <Modal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          title="メニュー開発"
        >
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-4xl">{getCategoryIcon(selectedMenu.category)}</span>
              <h3 className="text-xl font-bold mt-2">{selectedMenu.name}</h3>
              <p className="text-gray-500 text-sm mt-1">{selectedMenu.description || ''}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">売価</span>
                <span className="font-medium">{selectedMenu.price}G</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">原価</span>
                <span className="font-medium">{selectedMenu.cost}G</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">利益</span>
                <span className="font-medium text-green-600">
                  {selectedMenu.price - selectedMenu.cost}G
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between">
                <span className="font-bold text-gray-800">開発費用</span>
                <span className="font-bold text-fairy-pink-500">
                  {selectedMenu.developCost.toLocaleString()}G
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="ghost"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1"
              >
                キャンセル
              </Button>
              <Button
                variant="primary"
                onClick={confirmDevelop}
                className="flex-1"
                disabled={money < selectedMenu.developCost}
              >
                開発する
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
