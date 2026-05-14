import { IconBase, IconProps } from './IconBase';

export function CalendarIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="4" y="5.5" width="16" height="14" rx="2.5" />
      <path d="M8 3.5V7.5" />
      <path d="M16 3.5V7.5" />
      <path d="M4 9.5H20" />
      <path d="M8 13H10" />
      <path d="M12 13H14" />
      <path d="M8 16H10" />
      <path d="M12 16H14" />
    </IconBase>
  );
}
