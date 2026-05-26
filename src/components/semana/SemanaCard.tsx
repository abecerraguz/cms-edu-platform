import Link from "next/link";
import type { Semana, CategoriaSemana } from "@/types";

export const CATEGORIA_COLOR: Record<CategoriaSemana, string> = {
  fundamentos: "bg-[#1e3a5f]",
  hooks:       "bg-[#8e44ad]",
  componentes: "bg-[#16a085]",
  estado:      "bg-[#d35400]",
  routing:     "bg-[#2980b9]",
  apis:        "bg-[#27ae60]",
  testing:     "bg-[#c0392b]",
  examen:      "bg-[#e74c3c]",
};

export const CATEGORIA_LABEL: Record<CategoriaSemana, string> = {
  fundamentos: "Fundamentos",
  hooks:       "Hooks",
  componentes: "Componentes",
  estado:      "Estado",
  routing:     "Routing",
  apis:        "APIs",
  testing:     "Testing",
  examen:      "Examen Transversal",
};

interface Props {
  semana: Semana;
}

export default function SemanaCard({ semana }: Props) {
  return (
    <Link
      href={semana.disponible ? `/semanas/${semana.slug}` : "#"}
      className={`group flex flex-col rounded-xl border p-5 transition-all ${
        semana.esExamen
          ? "border-red-300 dark:border-red-800/60 hover:border-red-400 hover:shadow-md bg-white dark:bg-red-950/10"
          : semana.disponible
          ? "border-zinc-200 dark:border-white/8 hover:border-blue-400 dark:hover:border-blue-500/40 hover:shadow-md bg-white dark:bg-white/[0.03]"
          : "border-zinc-100 dark:border-white/5 bg-zinc-50 dark:bg-white/[0.015] cursor-not-allowed opacity-50"
      }`}
      aria-disabled={!semana.disponible}
    >
      {/* Número y categoría */}
      <div className="flex items-center justify-between mb-3">
        <span
          className={`w-9 h-9 rounded-lg text-white text-sm font-bold flex items-center justify-center ${CATEGORIA_COLOR[semana.categoria]}`}
        >
          {semana.numero}
        </span>
        <div className="flex items-center gap-2">
          {!semana.disponible && (
            <span className="text-[11px] bg-zinc-200 dark:bg-white/8 text-zinc-500 rounded px-2 py-0.5">
              Próximamente
            </span>
          )}
          <span
            className={`text-[10px] font-semibold uppercase tracking-wide text-white px-2 py-0.5 rounded ${CATEGORIA_COLOR[semana.categoria]}`}
          >
            {CATEGORIA_LABEL[semana.categoria]}
          </span>
          <span className="text-xs text-zinc-400">{semana.duracion}</span>
        </div>
      </div>

      {/* Título y descripción */}
      <h3 className="font-semibold text-zinc-900 dark:text-white text-base mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {semana.titulo}
      </h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4 flex-1">
        {semana.descripcion}
      </p>

      {/* Tecnologías */}
      <div className="flex flex-wrap gap-1.5">
        {semana.tecnologias.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="text-[11px] font-medium bg-zinc-100 dark:bg-white/6 text-zinc-600 dark:text-zinc-300 rounded px-2 py-0.5"
          >
            {tech}
          </span>
        ))}
        {semana.tecnologias.length > 3 && (
          <span className="text-[11px] text-zinc-400">
            +{semana.tecnologias.length - 3}
          </span>
        )}
      </div>
    </Link>
  );
}
