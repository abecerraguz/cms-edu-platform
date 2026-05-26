import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel CMS — React + TypeScript",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Navbar admin */}
      <nav className="h-14 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-6 sticky top-0 z-10">
        <Link href="/admin/semanas" className="text-base font-bold text-blue-600 dark:text-blue-400">
          Panel CMS <span className="text-zinc-500 dark:text-zinc-400 font-normal text-sm">React + TypeScript</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
            ← Ver sitio
          </Link>
          <Link href="/admin/login" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
            Salir
          </Link>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
