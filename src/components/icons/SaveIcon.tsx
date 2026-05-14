import { IconBase, IconProps } from './IconBase';

export function SaveIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M6 4.5H16.5L19 7V19.5H5V5.5C5 4.95 5.45 4.5 6 4.5Z" />
      <path d="M8 4.5V9H15V4.5" />
      <rect x="8" y="13" width="8" height="6.5" rx="1" />
    </IconBase>
  );
}
