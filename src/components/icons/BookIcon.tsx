import { IconBase, IconProps } from './IconBase';

export function BookIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5.5 6.5C5.5 5.4 6.4 4.5 7.5 4.5H18.5V18.5H7.5C6.4 18.5 5.5 19.4 5.5 20.5V6.5Z" />
      <path d="M7.5 4.5C6.4 4.5 5.5 5.4 5.5 6.5V18.5" />
      <path d="M9 8H15" />
      <path d="M9 11H14" />
    </IconBase>
  );
}
