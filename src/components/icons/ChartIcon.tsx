import { IconBase, IconProps } from './IconBase';

export function ChartIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 19.5H19" />
      <path d="M7.5 17V11" />
      <path d="M12 17V7" />
      <path d="M16.5 17V9.5" />
      <path d="M6.5 9.5L10 6.5L13 9L17.5 5.5" />
    </IconBase>
  );
}
