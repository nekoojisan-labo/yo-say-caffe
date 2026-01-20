interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  showPercentage?: boolean;
  color?: 'pink' | 'lavender' | 'mint' | 'gold' | 'red' | 'blue';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

const colorStyles = {
  pink: 'bg-gradient-to-r from-fairy-pink-200 to-fairy-pink-300',
  lavender: 'bg-gradient-to-r from-fairy-lavender-100 to-fairy-lavender-200',
  mint: 'bg-gradient-to-r from-fairy-mint-100 to-fairy-mint-200',
  gold: 'bg-gradient-to-r from-yellow-300 to-fairy-gold',
  red: 'bg-gradient-to-r from-red-400 to-red-500',
  blue: 'bg-gradient-to-r from-blue-300 to-blue-400',
};

const sizeStyles = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
};

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = false,
  showPercentage = false,
  color = 'pink',
  size = 'md',
  animated = true,
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`w-full ${className}`}>
      {/* ラベルと値 */}
      {(label || showValue || showPercentage) && (
        <div className="flex items-center justify-between mb-1">
          {label && <span className="text-sm text-gray-600">{label}</span>}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            {showValue && (
              <span>
                {value.toLocaleString()} / {max.toLocaleString()}
              </span>
            )}
            {showPercentage && <span>{Math.round(percentage)}%</span>}
          </div>
        </div>
      )}

      {/* プログレスバー */}
      <div
        className={`
          w-full ${sizeStyles[size]} bg-gray-100 rounded-full overflow-hidden
        `}
      >
        <div
          className={`
            h-full ${colorStyles[color]} rounded-full
            ${animated ? 'transition-all duration-500 ease-out' : ''}
          `}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// セグメント型プログレスバー（ハート型表示など用）
interface SegmentedProgressProps {
  value: number;
  max: number;
  segments?: number;
  filledIcon?: string;
  emptyIcon?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const segmentSizeStyles = {
  sm: 'text-sm gap-0.5',
  md: 'text-lg gap-1',
  lg: 'text-2xl gap-1.5',
};

export function SegmentedProgress({
  value,
  max,
  segments = 5,
  filledIcon = '♥',
  emptyIcon = '♡',
  size = 'md',
  className = '',
}: SegmentedProgressProps) {
  const filledCount = Math.round((value / max) * segments);

  return (
    <div className={`flex items-center ${segmentSizeStyles[size]} ${className}`}>
      {Array.from({ length: segments }).map((_, i) => (
        <span
          key={i}
          className={`
            transition-all duration-200
            ${i < filledCount ? 'text-fairy-heart scale-110' : 'text-gray-300'}
          `}
        >
          {i < filledCount ? filledIcon : emptyIcon}
        </span>
      ))}
    </div>
  );
}
