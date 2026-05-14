import { CSSProperties, ReactNode } from 'react';

interface FairyButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

const variantClasses: Record<NonNullable<FairyButtonProps['variant']>, string> = {
  primary:
    'text-white shadow-[0_0_20px_rgba(255,255,255,0.16)] animate-glow',
  secondary:
    'text-[var(--theme-text)] bg-white/10 border border-[var(--theme-card-border)] backdrop-blur-sm',
  danger:
    'text-white bg-gradient-to-r from-[#ef4444] to-[#dc2626] shadow-[0_0_16px_rgba(239,68,68,0.3)]',
};

const variantStyles: Record<NonNullable<FairyButtonProps['variant']>, CSSProperties> = {
  primary: {
    backgroundImage:
      'linear-gradient(to right, var(--theme-btn-primary-from), var(--theme-btn-primary-to))',
  },
  secondary: {},
  danger: {},
};

export function FairyButton({
  variant = 'primary',
  onClick,
  children,
  className = '',
  disabled = false,
}: FairyButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={variantStyles[variant]}
      className={[
        'inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold transition-all duration-200',
        'hover:scale-105 hover:brightness-125 active:scale-95',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:brightness-100',
        variantClasses[variant],
        className,
      ].join(' ')}
    >
      {children}
    </button>
  );
}
