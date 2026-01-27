import { useInventoryStore } from '@/store';
import { MENU_DATA } from '@/data/menuData';

interface ShowcaseProps {
  onItemClick?: (itemId: string) => void;
}

export function Showcase({ onItemClick }: ShowcaseProps) {
  const { inventory, unlockedMenus } = useInventoryStore();

  // 解放済みメニューのみ表示（最大6個）
  const displayMenus = MENU_DATA.filter((menu) =>
    unlockedMenus.includes(menu.id)
  ).slice(0, 6);

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-xs text-gray-400">ショーケース</span>

      <div className="flex gap-2 bg-white/80 backdrop-blur-sm rounded-xl p-2 border border-fairy-pink-100 shadow-soft">
        {displayMenus.map((menu) => {
          const stock = inventory[menu.id]?.stock ?? 0;
          const isLowStock = stock <= 2;
          const isOutOfStock = stock === 0;

          return (
            <div
              key={menu.id}
              className={`
                relative w-14 h-16 rounded-lg flex flex-col items-center justify-center
                transition-all duration-200
                ${
                  isOutOfStock
                    ? 'bg-red-50 border border-red-200'
                    : isLowStock
                    ? 'bg-yellow-50 border border-yellow-200'
                    : 'bg-fairy-lavender-100 border border-fairy-lavender-200'
                }
                ${onItemClick ? 'cursor-pointer hover:scale-105' : ''}
              `}
              onClick={() => onItemClick?.(menu.id)}
            >
              {/* 商品アイコン */}
              <span className="text-xl">
                {getMenuIcon(menu.category)}
              </span>

              {/* 在庫数 */}
              <span
                className={`
                  text-xs font-bold
                  ${
                    isOutOfStock
                      ? 'text-red-500'
                      : isLowStock
                      ? 'text-yellow-600'
                      : 'text-gray-600'
                  }
                `}
              >
                x{stock}
              </span>

              {/* 品切れ警告 */}
              {isOutOfStock && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-[8px] text-white">!</span>
                </div>
              )}

              {/* 商品名ツールチップ */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] text-gray-500 bg-white px-1 rounded">
                  {menu.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getMenuIcon(category: 'drink' | 'food' | 'sweet'): string {
  switch (category) {
    case 'drink':
      return '☕';
    case 'food':
      return '🥪';
    case 'sweet':
      return '🍰';
    default:
      return '📦';
  }
}
