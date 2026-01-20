import { ReactNode } from 'react';

interface CardProps {
  title?: string;
  titleIcon?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  onClick?: () => void;
  hoverable?: boolean;
  selected?: boolean;
  className?: string;
}

export function Card({
  title,
  titleIcon,
  children,
  footer,
  onClick,
  hoverable = false,
  selected = false,
  className = '',
}: CardProps) {
  const isClickable = !!onClick || hoverable;

  return (
    <div
      className={`
        bg-white rounded-2xl shadow-card border border-fairy-pink-100
        ${isClickable ? 'cursor-pointer transition-all duration-200' : ''}
        ${hoverable ? 'hover:shadow-lg hover:scale-[1.02] hover:border-fairy-pink-200' : ''}
        ${selected ? 'ring-2 ring-fairy-pink-300 border-fairy-pink-300' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {/* ヘッダー */}
      {title && (
        <div className="flex items-center gap-2 px-4 py-3 border-b border-fairy-pink-50">
          {titleIcon && <span className="text-lg">{titleIcon}</span>}
          <h3 className="font-bold text-gray-800">{title}</h3>
        </div>
      )}

      {/* コンテンツ */}
      <div className="p-4">{children}</div>

      {/* フッター */}
      {footer && (
        <div className="px-4 py-3 border-t border-fairy-pink-50 bg-fairy-pink-50/30 rounded-b-2xl">
          {footer}
        </div>
      )}
    </div>
  );
}

// コンパクトカードのバリアント
interface CompactCardProps {
  icon?: ReactNode;
  label: string;
  value: string | number;
  subValue?: string;
  onClick?: () => void;
  className?: string;
}

export function CompactCard({
  icon,
  label,
  value,
  subValue,
  onClick,
  className = '',
}: CompactCardProps) {
  return (
    <div
      className={`
        bg-white rounded-xl shadow-soft border border-fairy-pink-100 p-3
        ${onClick ? 'cursor-pointer hover:shadow-md hover:border-fairy-pink-200 transition-all' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {icon && <span className="text-2xl">{icon}</span>}
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500">{label}</p>
          <p className="font-bold text-gray-800 truncate">{value}</p>
          {subValue && <p className="text-xs text-gray-400">{subValue}</p>}
        </div>
      </div>
    </div>
  );
}
