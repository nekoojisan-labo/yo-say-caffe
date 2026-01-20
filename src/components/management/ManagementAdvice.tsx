import type { FinancialStats, Advice } from '@/types';
import { Card } from '@/components/common';
import { generateAdvices } from '@/utils/financial';

interface ManagementAdviceProps {
  stats: FinancialStats;
}

export function ManagementAdvice({ stats }: ManagementAdviceProps) {
  const advices = generateAdvices(stats);

  if (advices.length === 0) {
    return null;
  }

  return (
    <Card title="💡 経営アドバイス" titleIcon="">
      <div className="space-y-2">
        {advices.map((advice, index) => (
          <AdviceItem key={index} advice={advice} />
        ))}
      </div>
    </Card>
  );
}

function AdviceItem({ advice }: { advice: Advice }) {
  const typeStyles = {
    positive: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700',
      icon: '✅',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-700',
      icon: '⚠️',
    },
    danger: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-700',
      icon: '🚨',
    },
  };

  const styles = typeStyles[advice.type];

  return (
    <div
      className={`
        flex items-start gap-2 p-3 rounded-lg border
        ${styles.bg} ${styles.border}
      `}
    >
      <span>{styles.icon}</span>
      <p className={`text-sm ${styles.text}`}>{advice.text}</p>
    </div>
  );
}
