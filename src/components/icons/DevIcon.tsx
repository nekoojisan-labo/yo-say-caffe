import { IconBase, IconProps } from './IconBase';

export function DevIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="6" y="4.5" width="12" height="15" rx="2" />
      <path d="M9 8H15" />
      <path d="M9 11H15" />
      <path d="M9 14H13" />
      <path d="M8 4.5H16V7C16 7.55 15.55 8 15 8H9C8.45 8 8 7.55 8 7V4.5Z" />
    </IconBase>
  );
}
