import { IconBase, IconProps } from './IconBase';

export function MusicIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M14.5 5V15.5" />
      <path d="M14.5 6.5L19 5V14" />
      <circle cx="10" cy="17" r="2.5" />
      <circle cx="17" cy="15.5" r="2.5" />
    </IconBase>
  );
}
