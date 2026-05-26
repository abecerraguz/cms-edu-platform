"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import semanas from "../../../content/semanas.json";
import type { Semana } from "@/types";
import { CATEGORIA_COLOR } from "@/components/semana/SemanaCard";

const allSemanas = semanas as Semana[];

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: Props) {
  const pathname = usePathname();

  return (
    <nav
      className={[
        "fixed inset-y-0 left-0 z-40 w-64 flex flex-col",
        "border-r border-[var(--sidebar-border)] bg-[var(--sidebar-bg)]",
        "transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "lg:sticky lg:top-0 lg:translate-x-0 lg:z-auto lg:h-screen",
      ].join(" ")}
      aria-label="Navegación de semanas"
    >
      {/* Logo + botón cerrar (mobile) */}
      <div className="px-4 py-5 border-b border-[var(--sidebar-border)] flex items-center justify-between shrink-0">
        <Link
          href="/"
          className="flex items-center gap-2 group"
          onClick={onClose}
        >
          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
            React<span className="text-zinc-900 dark:text-white"> + TypeScript</span>
          </span>
        </Link>
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
          aria-label="Cerrar menú"
        >
          <X size={18} />
        </button>
      </div>

      {/* Semanas */}
      <div className="flex-1 p-3 overflow-y-auto">
        <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-600 px-2 mb-2">
          Programa · 11 semanas
        </p>
        <ul className="space-y-0.5">
          {allSemanas.map((s) => {
            const href = `/semanas/${s.slug}`;
            const active = pathname === href || pathname.startsWith(`${href}/`);

            return (
              <li key={s.slug}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                    !s.disponible
                      ? "text-zinc-400 dark:text-zinc-600 cursor-not-allowed pointer-events-none"
                      : active
                      ? "bg-blue-50 text-blue-800 font-medium dark:bg-blue-500/10 dark:text-blue-400"
                      : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-white/5"
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full text-[11px] flex items-center justify-center font-mono shrink-0 text-white ${
                      active ? CATEGORIA_COLOR[s.categoria] : "bg-zinc-200 dark:bg-zinc-800 !text-zinc-600 dark:!text-zinc-300"
                    }`}
                  >
                    {s.numero}
                  </span>
                  <span className="truncate">{s.titulo}</span>
                  {!s.disponible && (
                    <span className="ml-auto text-[10px] bg-zinc-200 dark:bg-white/5 text-zinc-500 rounded px-1.5 py-0.5 shrink-0">
                      Pronto
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--sidebar-border)] shrink-0">
        <Link
          href="/admin/semanas"
          className="flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
        >
          <span>Panel instructor</span>
        </Link>
      </div>
    </nav>
  );
}
