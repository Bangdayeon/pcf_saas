import IC_Home from '@/assets/icons/home.svg';

export const IconMap = {
  IC_Home,
} as const;

export type IconMapTypes = keyof typeof IconMap;

export const IconSizeTypes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export type IconSizeTypes = (typeof IconSizeTypes)[number];
