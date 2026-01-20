import { getAffectionLevel } from '@/store';

interface AffectionDisplayProps {
  affection: number;
  maxAffection?: number;
  showLevel?: boolean;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

const sizeStyles = {
  sm: { hearts: 'text-sm gap-0.5', text: 'text-xs' },
  md: { hearts: 'text-lg gap-1', text: 'text-sm' },
  lg: { hearts: 'text-2xl gap-1.5', text: 'text-base' },
};

export function AffectionDisplay({
  affection,
  maxAffection = 100,
  showLevel = true,
  showValue = false,
  size = 'md',
  animated = true,
  className = '',
}: AffectionDisplayProps) {
  const level = getAffectionLevel(affection);
  const styles = sizeStyles[size];
  const isMax = affection >= maxAffection;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* ハート表示 */}
      <div className={`flex items-center ${styles.hearts}`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`
              transition-all duration-300
              ${i < level ? 'text-fairy-heart' : 'text-gray-300'}
              ${animated && i < level ? 'animate-heart-beat' : ''}
              ${isMax && i < level ? 'animate-sparkle' : ''}
            `}
            style={{
              animationDelay: animated ? `${i * 100}ms` : undefined,
            }}
          >
            {i < level ? '♥' : '♡'}
          </span>
        ))}
      </div>

      {/* レベル表示 */}
      {showLevel && (
        <span className={`font-medium text-gray-600 ${styles.text}`}>
          Lv.{level}
          {isMax && (
            <span className="ml-1 text-fairy-gold">MAX!</span>
          )}
        </span>
      )}

      {/* 数値表示 */}
      {showValue && (
        <span className={`text-gray-400 ${styles.text}`}>
          ({affection}/{maxAffection})
        </span>
      )}
    </div>
  );
}

// 好感度変化表示（イベント後など）
interface AffectionChangeDisplayProps {
  beforeAffection: number;
  afterAffection: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function AffectionChangeDisplay({
  beforeAffection,
  afterAffection,
  size = 'md',
  className = '',
}: AffectionChangeDisplayProps) {
  const beforeLevel = getAffectionLevel(beforeAffection);
  const afterLevel = getAffectionLevel(afterAffection);
  const change = afterAffection - beforeAffection;
  const levelUp = afterLevel > beforeLevel;
  const styles = sizeStyles[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* 変化前 */}
      <div className={`flex items-center ${styles.hearts}`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={i < beforeLevel ? 'text-gray-400' : 'text-gray-200'}
          >
            {i < beforeLevel ? '♥' : '♡'}
          </span>
        ))}
      </div>

      {/* 矢印 */}
      <span className="text-gray-400">→</span>

      {/* 変化後 */}
      <div className={`flex items-center ${styles.hearts}`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`
              transition-all duration-300
              ${i < afterLevel ? 'text-fairy-heart' : 'text-gray-300'}
              ${levelUp && i >= beforeLevel && i < afterLevel ? 'animate-sparkle' : ''}
            `}
          >
            {i < afterLevel ? '♥' : '♡'}
          </span>
        ))}
      </div>

      {/* レベル表示 */}
      <span className={`font-medium ${styles.text}`}>
        <span className="text-gray-400">Lv.{beforeLevel}</span>
        <span className="mx-1">→</span>
        <span className={levelUp ? 'text-fairy-heart' : 'text-gray-600'}>
          Lv.{afterLevel}
        </span>
      </span>

      {/* 変化値 */}
      {change !== 0 && (
        <span
          className={`
            ${styles.text} font-medium
            ${change > 0 ? 'text-fairy-heart' : 'text-gray-400'}
          `}
        >
          {change > 0 ? `♥+${change}` : `${change}`}
        </span>
      )}

      {/* レベルアップ表示 */}
      {levelUp && (
        <span className="text-fairy-gold animate-bounce-soft">🎉</span>
      )}
    </div>
  );
}

// コンパクト版（リスト表示用）
interface CompactAffectionProps {
  affection: number;
  ikemenName?: string;
  className?: string;
}

export function CompactAffection({
  affection,
  ikemenName,
  className = '',
}: CompactAffectionProps) {
  const level = getAffectionLevel(affection);
  const isMax = affection >= 100;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {ikemenName && (
        <span className="text-sm text-gray-600 mr-2">{ikemenName}</span>
      )}
      <span className={`text-sm ${isMax ? 'text-fairy-gold font-bold' : 'text-fairy-heart'}`}>
        {'♥'.repeat(level)}{'♡'.repeat(5 - level)}
      </span>
      {isMax && <span className="text-xs text-fairy-gold">MAX</span>}
    </div>
  );
}
