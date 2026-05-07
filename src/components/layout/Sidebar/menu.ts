import type { IconMapTypes } from '@/components/ui/SVGIcon/icons';

type MenuItem = { href: string; icon: IconMapTypes; label: string };

export const MENU_ITEMS: MenuItem[] = [
  { href: '/howto', icon: 'IC_Home', label: '홈' },
  { href: '/dashboard', icon: 'IC_Dashboard', label: '대시보드' },
  { href: '/add', icon: 'IC_Add', label: '데이터 추가' },
];
