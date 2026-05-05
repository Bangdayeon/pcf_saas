import IC_Add from '@/assets/icons/ic_add.svg';
import IC_Add_File from '@/assets/icons/ic_add_file.svg';
import IC_Arrow_Drop_Down from '@/assets/icons/ic_arrow_drop_down.svg';
import IC_Arrow_Drop_Up from '@/assets/icons/ic_arrow_drop_down.svg';
import IC_Diamond from '@/assets/icons/ic_diamond.svg';
import IC_Edit from '@/assets/icons/ic_edit.svg';
import IC_Home from '@/assets/icons/ic_home.svg';
import IC_Search from '@/assets/icons/ic_search.svg';

export const IconMap = {
  IC_Add,
  IC_Add_File,
  IC_Arrow_Drop_Down,
  IC_Arrow_Drop_Up,
  IC_Diamond,
  IC_Edit,
  IC_Home,
  IC_Search,
} as const;

export type IconMapTypes = keyof typeof IconMap;

export const IconSizeTypes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export type IconSizeTypes = (typeof IconSizeTypes)[number];
