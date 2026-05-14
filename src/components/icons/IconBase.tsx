import { ReactNode } from 'react';

export interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

interface IconBaseProps extends IconProps {
  children: ReactNode;
  viewBox?: string;
}

export function IconBase({
  size = 24,
  color = 'currentColor',
  className,
  viewBox = '0 0 24 24',
  children,
}: IconBaseProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}
