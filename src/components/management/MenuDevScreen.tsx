import { useState, useMemo } from 'react';
import { useGameStore, useInventoryStore, useNotificationStore } from '@/store';
import { Header, Button, Card, Tab, Modal, ProgressBar } from '@/components/common';
import { MENU_DATA, MenuCategory } from '@/data/menuData';
import { useAudio } from '@/hooks';
import type { MenuItem } from '@/types';

type TabType = 'develop' | 'unlocked';

export function MenuDevScreen() {
  const { setScreen, money, deductMoney, unlockedMenus, unlockMenu, reputation } = useGameStore();
  const { addNotification } = useNotificationStore();
  const { playSE } = useAudio();
  const [activeTab, setActiveTab] = useState<TabType>('develop');
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // カテゴリでグループ化
  const menusByCategory = useMemo(() => {
    const groups: Record<MenuCategory, MenuItem[]> = {
      drink: [],
      food: [],
      dessert: [],
      special: [],
    };

    MENU_DATA.forEach((menu) => {
      groups[menu.category].push(menu);
    });

    return groups;
  }, []);

  // 開発可能なメニュー
  const developableMenus = useMemo(() => {
    return MENU_DATA.filter((menu) => {
      if (unlockedMenus.includes(menu.id)) return false;
      if (!menu.unlockCondition) return false;

      const condition = menu.unlockCondition;

      // 条件チェック
      if (condition.day && condition.day > 1) return false; // dayは別途チェック
      if (condition.reputation && reputation < condition.reputation) return false;
      if (condition.requiredMenus) {
        const hasRequired = condition.requiredMenus.every((id) =>
          unlockedMenus.includes(id)
        );
        if (!hasRequired) return false;
      }

      return true;
    });
  }, [unlockedMenus, reputation]);

  // 開発コスト
  const getDevelopCost = (menu: MenuItem) => {
    return menu.price * 5; // 売価の5倍
  };

  // メニュー開発
  const handleDevelop = (menu: MenuItem) => {
    setSelectedMenu(menu);
    setShowConfirmModal(true);
  };

  const confirmDevelop = () => {
    if (!selectedMenu) return;

    const cost = getDevelopCost(selectedMenu);

    if (money < cost) {
      addNotification('error', '所持金が不足しています');
      playSE('error');
      setShowConfirmModal(false);
      return;
    }

    deductMoney(cost);
    unlockMenu(selectedMenu.id);
    playSE('complete');
    addNotification('success', `「${selectedMenu.name}」を開発しました！`);
    setShowConfirmModal(false);
    setSelectedMenu(null);
  };

  const tabs = [
    { id: 'develop', label: '開発' },
    { id: 'unlocked', label: '解放済み' },
  ];

  const categoryNames: Record<MenuCategory, string> = {
    drink: '🍹 ドリンク',
    food: '🍴 フード',
    dessert: '🍰 デザート',
    special: '✨ スペシャル',
  };

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-fairy-pink-50 to-fairy-lavender-100">
      <Header />

      <div className="flex-1 flex flex-col p-4 gap-4 overflow-y-auto">
        {/* タイトル */}
        <h1 className="text-2xl font-bold text-gray-800">🔬 メニュー開発</h1>

        {/* タブ */}
        <Tab
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={(id) => setActiveTab(id as TabType)}
          variant="pills"
          size="sm"
        />

        {activeTab === 'develop' ? (
          <>
            {/* 開発可能メニュー */}
            {developableMenus.length === 0 ? (
              <Card>
                <div className="text-center py-8 text-gray-500">
                  <p className="text-xl mb-2">🔒</p>
                  <p>開発可能なメニューがありません</p>
                  <p className="text-sm mt-2">
                    評判を上げたり、特定のメニューを解放すると新しいメニューが開発可能になります
                  </p>
                </div>
              </Card>
            ) : (
              <div className="space-y-4">
                {developableMenus.map((menu) => (
                  <MenuDevelopCard
                    key={menu.id}
                    menu={menu}
                    cost={getDevelopCost(menu)}
                    canAfford={money >= getDevelopCost(menu)}
                    onDevelop={() => handleDevelop(menu)}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            {/* 解放済みメニュー一覧 */}
            {Object.entries(menusByCategory).map(([category, menus]) => {
              const unlockedInCategory = menus.filter((m) =>
                unlockedMenus.includes(m.id)
              );

              if (unlockedInCategory.length === 0) return null;

              return (
                <Card key={category} title={categoryNames[category as MenuCategory]} titleIcon="">
                  <div className="space-y-2">
                    {unlockedInCategory.map((menu) => (
                      <MenuItemRow key={menu.id} menu={menu} />
                    ))}
                  </div>
                </Card>
              );
            })}
          </>
        )}

        {/* 戻るボタン */}
        <Button variant="ghost" onClick={() => setScreen('cafe')} fullWidth>
          戻る
        </Button>
      </div>

      {/* 開発確認モーダル */}
      {showConfirmModal && selectedMenu && (
        <Modal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          title="メニュー開発"
        >
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-4xl">{selectedMenu.icon}</span>
              <h3 className="text-xl font-bold mt-2">{selectedMenu.name}</h3>
              <p className="text-gray-500 text-sm mt-1">{selectedMenu.description}</p>
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
                  {getDevelopCost(selectedMenu).toLocaleString()}G
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
                disabled={money < getDevelopCost(selectedMenu)}
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

// 開発カード
interface MenuDevelopCardProps {
  menu: MenuItem;
  cost: number;
  canAfford: boolean;
  onDevelop: () => void;
}

function MenuDevelopCard({ menu, cost, canAfford, onDevelop }: MenuDevelopCardProps) {
  return (
    <Card className="border-2 border-fairy-lavender-200">
      <div className="flex items-start gap-4">
        <div className="text-4xl">{menu.icon}</div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-800">{menu.name}</h3>
          <p className="text-sm text-gray-500 mb-2">{menu.description}</p>
          <div className="flex gap-4 text-sm">
            <span className="text-gray-600">
              売価: <span className="font-medium">{menu.price}G</span>
            </span>
            <span className="text-gray-600">
              原価: <span className="font-medium">{menu.cost}G</span>
            </span>
            <span className="text-green-600">
              利益: <span className="font-medium">{menu.price - menu.cost}G</span>
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 mb-1">開発費用</p>
          <p className={`font-bold ${canAfford ? 'text-fairy-pink-500' : 'text-red-500'}`}>
            {cost.toLocaleString()}G
          </p>
          <Button
            variant={canAfford ? 'primary' : 'ghost'}
            size="sm"
            onClick={onDevelop}
            disabled={!canAfford}
            className="mt-2"
          >
            開発
          </Button>
        </div>
      </div>
    </Card>
  );
}

// メニューアイテム行
function MenuItemRow({ menu }: { menu: MenuItem }) {
  const profitRate = ((menu.price - menu.cost) / menu.price) * 100;

  return (
    <div className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
      <span className="text-2xl">{menu.icon}</span>
      <div className="flex-1">
        <p className="font-medium text-gray-800">{menu.name}</p>
        <p className="text-xs text-gray-500">
          売価 {menu.price}G / 原価 {menu.cost}G
        </p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-green-600">+{menu.price - menu.cost}G</p>
        <p className="text-xs text-gray-500">利益率 {profitRate.toFixed(0)}%</p>
      </div>
    </div>
  );
}
