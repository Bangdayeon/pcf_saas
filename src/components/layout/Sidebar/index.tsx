'use client';
import Logo from '@/assets/images/logo.png';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { Button } from '../../ui/button';
import MenuButton from './MenuButton';
import { MENU_ITEMS } from './menu';
import { useSidebarStore } from './sidebarStore';

export default function Sidebar() {
  const { isOpen, toggle, setOpen } = useSidebarStore();
  const navRef = useRef<HTMLElement>(null);

  // ESC 키 누르면 닫음
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setOpen]);

  return (
    <>
      {/* 사이드바 */}
      <motion.nav
        ref={navRef}
        animate={{ width: isOpen ? 240 : 80 }}
        transition={{ type: 'spring', stiffness: 200, damping: 24 }}
        className={`bg-green100 sticky top-0 flex h-screen shrink-0 flex-col gap-3 overflow-hidden p-5 shadow-md ${isOpen ? '' : 'items-center'}`}
      >
        {/* 토글 버튼 */}
        <Button onClick={toggle} variant="ghost" size="icon-lg" className="hover:bg-green200 p-1">
          <Image src={Logo} alt="사이드바 버튼" width={40} height={40} />
        </Button>
        {MENU_ITEMS.map(item => (
          <MenuButton
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            isOpen={isOpen}
          />
        ))}
      </motion.nav>
    </>
  );
}
