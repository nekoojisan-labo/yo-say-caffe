import { ReactNode } from 'react';

interface FairyCardProps {
  children: ReactNode;
  className?: string;
}

export function FairyCard({ children, className = '' }: FairyCardProps) {
  return (
    <div
      className={`rounded-2xl border p-5 backdrop-blur-md shadow-[0_0_10px_rgba(139,92,246,0.2)] [&_svg]:drop-shadow-[0_0_6px_rgba(139,92,246,0.8)] ${className}`}
      style={{
        background: 'var(--theme-card-bg)',
        borderColor: 'rgba(139,92,246,0.5)',
      }}
    >
      {children}
    </div>
  );
}
