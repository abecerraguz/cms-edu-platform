'use client';

import { useEffect, useState, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  const handleScroll = useCallback(() => {
    const el = document.getElementById('main-scroll');
    setVisible(el ? el.scrollTop > 400 : false);
  }, []);

  useEffect(() => {
    const el = document.getElementById('main-scroll');
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    document.getElementById('main-scroll')?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Volver al inicio de la página"
      className={[
        'fixed bottom-6 right-6 z-50',
        'flex items-center justify-center w-10 h-10 rounded-full',
        'bg-zinc-900 border border-zinc-700',
        'text-zinc-400',
        'hover:bg-zinc-800 hover:border-[#c5ff00]/60 hover:text-[#c5ff00]',
        'hover:shadow-[0_0_16px_rgba(197,255,0,0.12)]',
        'transition-all duration-300',
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-3 pointer-events-none',
      ].join(' ')}
    >
      <ArrowUp className="w-4 h-4" strokeWidth={2.5} />
    </button>
  );
}
