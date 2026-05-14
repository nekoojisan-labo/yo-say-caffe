import { IconBase, IconProps } from './IconBase';

export function CoffeeIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M6 9.5H15.5V13.5C15.5 16.26 13.26 18.5 10.5 18.5C7.74 18.5 5.5 16.26 5.5 13.5V10C5.5 9.72 5.72 9.5 6 9.5Z" />
      <path d="M15.5 10.5H17C18.38 10.5 19.5 11.62 19.5 13C19.5 14.38 18.38 15.5 17 15.5H15.5" />
      <path d="M8.5 4.5V7" />
      <path d="M11.5 4V7" />
      <path d="M14.5 4.5V7" />
      <path d="M4.5 20H17.5" />
    </IconBase>
  );
}
