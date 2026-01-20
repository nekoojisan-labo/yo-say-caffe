import type { CustomerState } from '@/types';
import { useIkemenStore } from '@/store';
import { IKEMEN_MASTER_DATA } from '@/data/ikemenData';

interface CustomerProps {
  customer: CustomerState;
  floating?: boolean;
  onClick?: () => void;
}

export function Customer({ customer, floating = false, onClick }: CustomerProps) {
  const { isIkemen, ikemenId, status, satisfaction, orderedItem } = customer;

  // イケメン情報を取得
  const ikemenData = isIkemen && ikemenId
    ? IKEMEN_MASTER_DATA.find((ik) => ik.id === ikemenId)
    : null;

  // 属性に応じたエフェクト色
  const elementColor = ikemenData
    ? getElementColor(ikemenData.element)
    : undefined;

  return (
    <div
      className={`
        relative flex flex-col items-center
        ${floating ? 'absolute animate-float' : ''}
        ${onClick ? 'cursor-pointer' : ''}
      `}
      onClick={onClick}
    >
      {/* キャラクターアイコン */}
      <div
        className={`
          relative w-10 h-10 rounded-full flex items-center justify-center
          ${
            isIkemen
              ? 'bg-gradient-to-br from-fairy-pink-100 to-fairy-lavender-100 border-2 border-fairy-gold shadow-lg'
              : 'bg-gray-100 border border-gray-200'
          }
        `}
      >
        {isIkemen ? (
          <>
            <span className="text-xl">🧚‍♂️</span>
            {/* イケメンエフェクト */}
            <div
              className="absolute inset-0 rounded-full animate-pulse-soft opacity-50"
              style={{
                boxShadow: `0 0 10px ${elementColor || '#FFD700'}`,
              }}
            />
          </>
        ) : (
          <span className="text-xl">👤</span>
        )}

        {/* 満足度インジケーター */}
        {status === 'eating' && (
          <div className="absolute -top-1 -right-1">
            <SatisfactionIndicator satisfaction={satisfaction} />
          </div>
        )}
      </div>

      {/* 注文吹き出し */}
      {status === 'ordering' && orderedItem && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white rounded-lg px-2 py-1 shadow-soft border border-gray-100 whitespace-nowrap">
          <span className="text-xs">🗣️ 注文中...</span>
        </div>
      )}

      {/* イケメン名 */}
      {isIkemen && ikemenData && (
        <span className="text-[10px] text-fairy-pink-500 font-medium mt-1">
          {ikemenData.name}
        </span>
      )}
    </div>
  );
}

function SatisfactionIndicator({ satisfaction }: { satisfaction: number }) {
  let icon = '😊';
  let color = 'text-green-500';

  if (satisfaction < 50) {
    icon = '😠';
    color = 'text-red-500';
  } else if (satisfaction < 80) {
    icon = '😐';
    color = 'text-yellow-500';
  }

  return <span className={`text-sm ${color}`}>{icon}</span>;
}

function getElementColor(element: string): string {
  const colors: Record<string, string> = {
    light: '#FFD700',
    dark: '#6B21A8',
    wind: '#22C55E',
    fire: '#EF4444',
    water: '#3B82F6',
    thunder: '#FACC15',
    ice: '#67E8F9',
    earth: '#92400E',
    star: '#A855F7',
    forest: '#166534',
  };
  return colors[element] || '#FFD700';
}

// 客の注文ポップアップ（手動モード用）
interface OrderPopupProps {
  customer: CustomerState;
  onServe: (itemId: string) => void;
  onCancel: () => void;
}

export function OrderPopup({ customer, onServe, onCancel }: OrderPopupProps) {
  const ikemenData = customer.isIkemen && customer.ikemenId
    ? IKEMEN_MASTER_DATA.find((ik) => ik.id === customer.ikemenId)
    : null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 shadow-card max-w-sm w-full mx-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-fairy-pink-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">
              {customer.isIkemen ? '🧚‍♂️' : '👤'}
            </span>
          </div>
          <div>
            <h3 className="font-bold text-gray-800">
              {ikemenData?.name || 'お客様'}
            </h3>
            <p className="text-sm text-gray-500">注文を受けてください</p>
          </div>
        </div>

        {/* 注文内容 */}
        <div className="bg-fairy-lavender-100 rounded-xl p-4 mb-4">
          <p className="text-gray-700">
            「{customer.orderedItem || 'コーヒー'}をお願いします」
          </p>
        </div>

        {/* ボタン */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          >
            キャンセル
          </button>
          <button
            onClick={() => customer.orderedItem && onServe(customer.orderedItem)}
            className="flex-1 py-2 rounded-xl bg-fairy-pink-200 text-white hover:bg-fairy-pink-300 transition-colors"
          >
            提供する
          </button>
        </div>
      </div>
    </div>
  );
}
