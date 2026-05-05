'use client';

import { Button } from '@/components/ui/Button';
import SVGIcon from '@/components/ui/SVGIcon';
import { IconMapTypes } from '@/components/ui/SVGIcon/icons';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';

import { useSidebarStore } from './sidebarStore';

type Props = {
  href: string;
  icon: IconMapTypes;
  label: string;
  isOpen: boolean;
};

export default function MenuButton({ href, icon, label, isOpen }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { setOpen } = useSidebarStore();

  const isActive = pathname === href;

  return (
    <Button
      variant="ghost"
      size="lg"
      className="hover:bg-green200 justify-start"
      onClick={() => {
        router.push(href);
        setOpen(false);
      }}
    >
      <SVGIcon icon={icon} size="lg" className={isActive ? 'text-green-500' : ''} />

      <p className={cn(isOpen ? 'flex' : 'hidden', isActive ? 'font-semibold text-green-500' : '')}>
        {label}
      </p>
    </Button>
  );
}
