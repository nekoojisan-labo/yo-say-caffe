import { IconBase, IconProps } from './IconBase';

export function SoundIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 10H8.5L13 6.5V17.5L8.5 14H5V10Z" />
      <path d="M16 9C16.9 9.7 17.5 10.8 17.5 12C17.5 13.2 16.9 14.3 16 15" />
      <path d="M18.5 6.5C20 7.95 21 9.9 21 12C21 14.1 20 16.05 18.5 17.5" />
    </IconBase>
  );
}
