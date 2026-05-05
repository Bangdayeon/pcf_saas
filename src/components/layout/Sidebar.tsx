'use client';
import Logo from '@/assets/images/logo.png';
import SVGIcon from '@/components/ui/SVGIcon';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { Button } from '../ui/Button';
import { useSidebarStore } from './sidebarStore';

export default function Sidebar() {
  const router = useRouter();
  const pathName = usePathname();

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
      {/* 배경 (사이드바 열렸을 때만 표시) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/30"
            // 배경 클릭 시 사이드바 닫기
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* 사이드바 */}
      <motion.nav
        ref={navRef}
        animate={{ width: isOpen ? 240 : 80 }}
        transition={{ type: 'spring', stiffness: 200, damping: 24 }}
        className="bg-gray50 fixed top-0 left-0 z-50 flex h-screen flex-col gap-3 overflow-hidden p-5 shadow-md"
      >
        {/* 토글 버튼 */}
        <Button onClick={toggle} variant="ghost" size="icon-lg" className="p-1">
          <Image src={Logo} alt="사이드바 버튼" width={40} height={40} />
        </Button>
        <Button
          variant="ghost"
          size="lg"
          className="justify-start"
          onClick={() => router.push('/home')}
        >
          <SVGIcon
            icon="IC_Home"
            size="lg"
            className={pathName === '/home' ? 'text-green500' : ''}
          />
          <p
            className={cn(
              isOpen ? 'flex' : 'hidden',
              pathName === '/home' ? 'text-green500 font-semibold' : ''
            )}
          >
            대시보드
          </p>
        </Button>
      </motion.nav>
    </>
  );
}
