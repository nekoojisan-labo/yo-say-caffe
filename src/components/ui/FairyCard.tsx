import { ReactNode } from 'react';

interface FairyCardProps {
  children: ReactNode;
  className?: string;
}

export function FairyCard({ children, className = '' }: FairyCardProps) {
  return (
    <div
      className={`rounded-2xl border p-5 backdrop-blur-md ${className}`}
      style={{
        background: 'var(--theme-card-bg)',
        borderColor: 'var(--theme-card-border)',
      }}
    >
      {children}
    </div>
  );
}
