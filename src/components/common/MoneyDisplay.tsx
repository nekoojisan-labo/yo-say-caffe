import { useEffect, useState, useRef } from 'react';

interface MoneyDisplayProps {
  amount: number;
  showIcon?: boolean;
  showChange?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

const sizeStyles = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl',
};

export function MoneyDisplay({
  amount,
  showIcon = false,
  showChange = true,
  size = 'md',
  animated = true,
  className = '',
}: MoneyDisplayProps) {
  const [displayAmount, setDisplayAmount] = useState(amount);
  const [change, setChange] = useState<number | null>(null);
  const prevAmountRef = useRef(amount);

  // 金額変更時のアニメーション
  useEffect(() => {
    if (prevAmountRef.current !== amount) {
      const diff = amount - prevAmountRef.current;

      if (showChange) {
        setChange(diff);
        setTimeout(() => setChange(null), 2000);
      }

      if (animated) {
        // カウントアップ/ダウンアニメーション
        const startAmount = prevAmountRef.current;
        const endAmount = amount;
        const duration = 500;
        const startTime = Date.now();

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = easeOutQuart(progress);
          const current = Math.round(startAmount + (endAmount - startAmount) * eased);
          setDisplayAmount(current);

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setDisplayAmount(endAmount);
          }
        };

        requestAnimationFrame(animate);
      } else {
        setDisplayAmount(amount);
      }

      prevAmountRef.current = amount;
    }
  }, [amount, animated, showChange]);

  const formattedAmount = displayAmount.toLocaleString();

  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      {showIcon && <span className="text-fairy-gold">💰</span>}
      <span className={`font-bold text-fairy-gold ${sizeStyles[size]}`}>
        {formattedAmount}
        <span className="text-gray-500 font-normal">G</span>
      </span>

      {/* 変化表示 */}
      {change !== null && (
        <span
          className={`
            ${sizeStyles[size]} font-medium ml-1
            animate-slide-up
            ${change > 0 ? 'text-green-500' : 'text-red-500'}
          `}
        >
          {change > 0 ? `+${change.toLocaleString()}` : change.toLocaleString()}
        </span>
      )}
    </div>
  );
}

// イージング関数
function easeOutQuart(x: number): number {
  return 1 - Math.pow(1 - x, 4);
}

// 価格表示（コスト、売価など）
interface PriceDisplayProps {
  price: number;
  label?: string;
  type?: 'normal' | 'cost' | 'profit' | 'loss';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const priceTypeStyles = {
  normal: 'text-gray-700',
  cost: 'text-red-500',
  profit: 'text-green-500',
  loss: 'text-red-500',
};

export function PriceDisplay({
  price,
  label,
  type = 'normal',
  size = 'md',
  className = '',
}: PriceDisplayProps) {
  const prefix = type === 'cost' || type === 'loss' ? '-' : type === 'profit' ? '+' : '';
  const formattedPrice = Math.abs(price).toLocaleString();

  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      {label && <span className={`text-gray-500 ${sizeStyles[size]}`}>{label}</span>}
      <span className={`font-medium ${priceTypeStyles[type]} ${sizeStyles[size]}`}>
        {prefix}{formattedPrice}G
      </span>
    </div>
  );
}

// 収支サマリー表示
interface BalanceSummaryProps {
  income: number;
  expense: number;
  showProfit?: boolean;
  className?: string;
}

export function BalanceSummary({
  income,
  expense,
  showProfit = true,
  className = '',
}: BalanceSummaryProps) {
  const profit = income - expense;

  return (
    <div className={`space-y-1 ${className}`}>
      <div className="flex justify-between items-center">
        <span className="text-gray-600">収入</span>
        <PriceDisplay price={income} type="normal" />
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600">支出</span>
        <PriceDisplay price={expense} type="cost" />
      </div>
      {showProfit && (
        <>
          <div className="border-t border-gray-200 my-2" />
          <div className="flex justify-between items-center">
            <span className="text-gray-800 font-medium">損益</span>
            <PriceDisplay
              price={profit}
              type={profit >= 0 ? 'profit' : 'loss'}
              size="md"
            />
          </div>
        </>
      )}
    </div>
  );
}
