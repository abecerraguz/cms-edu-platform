"use client";

import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { Menu } from "lucide-react";

interface Props {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: Props) {
  return (
    <header className="h-14 border-b border-[var(--sidebar-border)] flex items-center justify-between px-4 bg-[var(--navbar-bg)] sticky top-0 z-10 shrink-0">
      <div className="flex items-center gap-2">
        {/* Hamburguesa — solo mobile */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-1 rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
          aria-label="Abrir menú de navegación"
        >
          <Menu size={20} />
        </button>

        {/* Logo — solo mobile (en desktop lo muestra el sidebar) */}
        <Link
          href="/"
          className="lg:hidden text-base font-bold text-blue-600 dark:text-blue-400"
        >
          React<span className="text-zinc-900 dark:text-white"> + TypeScript</span>
        </Link>

        {/* Breadcrumb — solo desktop */}
        <div className="hidden lg:flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <Link
            href="/"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Inicio
          </Link>
          <span>/</span>
          <span>Programa React + TypeScript</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <a
          href="https://github.com/abecerraguz/blog-cms-fullstack"
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
          aria-label="Ver repositorio en GitHub"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4 11.5 11.5 0 0 1 3 .4c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.83.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
}
