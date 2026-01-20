import { useEffect, useState, useRef } from 'react';
import { ProgressBar } from './ProgressBar';

interface StatDisplayProps {
  label: string;
  value: number;
  maxValue?: number;
  icon?: string;
  showBar?: boolean;
  showChange?: boolean;
  previousValue?: number;
  color?: 'pink' | 'lavender' | 'mint' | 'gold';
  className?: string;
}

export function StatDisplay({
  label,
  value,
  maxValue,
  icon,
  showBar = false,
  showChange = false,
  previousValue,
  color = 'pink',
  className = '',
}: StatDisplayProps) {
  const [displayChange, setDisplayChange] = useState<number | null>(null);
  const prevValueRef = useRef(value);

  // 値が変化したときにアニメーション表示
  useEffect(() => {
    if (showChange && prevValueRef.current !== value) {
      const change = value - prevValueRef.current;
      setDisplayChange(change);

      const timer = setTimeout(() => {
        setDisplayChange(null);
      }, 2000);

      prevValueRef.current = value;
      return () => clearTimeout(timer);
    }
  }, [value, showChange]);

  // previousValueが渡された場合はそれを使用
  const change = previousValue !== undefined ? value - previousValue : displayChange;

  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          {icon && <span className="text-lg">{icon}</span>}
          <span className="text-sm text-gray-600">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-800">
            {value}
            {maxValue !== undefined && (
              <span className="text-gray-400 font-normal"> / {maxValue}</span>
            )}
          </span>

          {/* 変化表示 */}
          {change !== null && change !== 0 && (
            <span
              className={`
                text-sm font-medium animate-slide-up
                ${change > 0 ? 'text-green-500' : 'text-red-500'}
              `}
            >
              {change > 0 ? `+${change}` : change}
            </span>
          )}
        </div>
      </div>

      {/* プログレスバー */}
      {showBar && maxValue && (
        <ProgressBar value={value} max={maxValue} color={color} size="sm" />
      )}
    </div>
  );
}

// 主人公ステータス表示用のグループ
interface StatsGroupProps {
  stats: {
    charm: number;
    talk: number;
    sense: number;
  };
  previousStats?: {
    charm: number;
    talk: number;
    sense: number;
  };
  showChanges?: boolean;
  maxValue?: number;
}

export function StatsGroup({
  stats,
  previousStats,
  showChanges = false,
  maxValue = 100,
}: StatsGroupProps) {
  return (
    <div className="space-y-3">
      <StatDisplay
        label="魅力"
        value={stats.charm}
        maxValue={maxValue}
        icon="✨"
        showBar
        showChange={showChanges}
        previousValue={previousStats?.charm}
        color="pink"
      />
      <StatDisplay
        label="話術"
        value={stats.talk}
        maxValue={maxValue}
        icon="💬"
        showBar
        showChange={showChanges}
        previousValue={previousStats?.talk}
        color="lavender"
      />
      <StatDisplay
        label="センス"
        value={stats.sense}
        maxValue={maxValue}
        icon="🎨"
        showBar
        showChange={showChanges}
        previousValue={previousStats?.sense}
        color="mint"
      />
    </div>
  );
}
