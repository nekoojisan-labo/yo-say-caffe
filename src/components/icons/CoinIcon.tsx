import { IconBase, IconProps } from './IconBase';

export function CoinIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <ellipse cx="12" cy="12" rx="7" ry="9" />
      <path d="M9.5 9.5C10.1 8.7 11 8.25 12 8.25C13.7 8.25 15 9.4 15 10.8C15 12.3 13.75 13.1 12 13.1C10.8 13.1 9.85 13.65 9.25 14.5" />
      <path d="M10 15.9C10.55 16.55 11.25 16.9 12 16.9C13.35 16.9 14.5 15.95 14.5 14.8C14.5 13.55 13.45 12.9 12 12.9" />
    </IconBase>
  );
}
