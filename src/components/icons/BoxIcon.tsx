import { IconBase, IconProps } from './IconBase';

export function BoxIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 3.5L19 7.5V16.5L12 20.5L5 16.5V7.5L12 3.5Z" />
      <path d="M5 7.5L12 11.5L19 7.5" />
      <path d="M12 11.5V20.5" />
    </IconBase>
  );
}
