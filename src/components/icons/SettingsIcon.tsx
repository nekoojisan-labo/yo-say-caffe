import { IconBase, IconProps } from './IconBase';

export function SettingsIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3.5V5.5" />
      <path d="M12 18.5V20.5" />
      <path d="M20.5 12H18.5" />
      <path d="M5.5 12H3.5" />
      <path d="M18 6L16.6 7.4" />
      <path d="M7.4 16.6L6 18" />
      <path d="M18 18L16.6 16.6" />
      <path d="M7.4 7.4L6 6" />
      <path d="M15.5 4.5L16.3 6.4L18.2 7.2L16.3 8L15.5 9.9L14.7 8L12.8 7.2L14.7 6.4L15.5 4.5Z" />
    </IconBase>
  );
}
