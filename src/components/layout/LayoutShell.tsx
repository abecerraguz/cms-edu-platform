'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Header from './Header';
import ScrollToTop from './ScrollToTop';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Cerrar el sidebar al navegar
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="h-full flex relative">
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-[2px] lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-col flex-1 min-w-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main id="main-scroll" className="flex-1 overflow-y-auto">
          {children}
        </main>
        <ScrollToTop />
      </div>
    </div>
  );
}
