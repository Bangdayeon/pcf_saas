import IC_Add from '@/assets/icons/ic_add.svg';
import IC_Home from '@/assets/icons/ic_home.svg';

export const IconMap = {
  IC_Add,
  IC_Home,
} as const;

export type IconMapTypes = keyof typeof IconMap;

export const IconSizeTypes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export type IconSizeTypes = (typeof IconSizeTypes)[number];
