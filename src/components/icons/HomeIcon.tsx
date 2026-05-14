import { IconBase, IconProps } from './IconBase';

export function HomeIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4.5 10.5L12 4L19.5 10.5" />
      <path d="M6.5 9.5V19H17.5V9.5" />
      <path d="M10 19V13H14V19" />
    </IconBase>
  );
}
