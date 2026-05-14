import { IconBase, IconProps } from './IconBase';

export function PersonIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="8" r="3" />
      <path d="M6.5 19C6.5 15.96 8.96 13.5 12 13.5C15.04 13.5 17.5 15.96 17.5 19" />
    </IconBase>
  );
}
