import Link from "next/link";
import { getSemanas } from "@/lib/semanas";
import { CATEGORIA_COLOR, CATEGORIA_LABEL } from "@/components/semana/SemanaCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Semanas — Panel CMS",
};

export default function AdminSemanasPage() {
  const semanas = getSemanas();
  const disponibles = semanas.filter((s) => s.disponible).length;
  const examen = semanas.find((s) => s.esExamen);
  const totalHoras = semanas
    .filter((s) => !s.esExamen)
    .reduce((acc, s) => acc + (parseInt(s.duracion) || 0), 0);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Programa React + TypeScript
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Gestiona el contenido del programa de 9 semanas
          </p>
        </div>
        <Link
          href="/admin/semanas/nueva"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          + Nueva semana
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total semanas", value: semanas.length, color: "text-blue-600 dark:text-blue-400" },
          { label: "Disponibles", value: disponibles, color: "text-green-600 dark:text-green-400" },
          { label: "Horas de contenido", value: `${totalHoras}h`, color: "text-purple-600 dark:text-purple-400" },
          { label: "Semanas de examen", value: examen ? 1 : 0, color: "text-red-600 dark:text-red-400" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4"
          >
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tabla */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800">
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  Sem.
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  Título
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-zinc-500 hidden sm:table-cell">
                  Categoría
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-zinc-500 hidden md:table-cell">
                  Duración
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  Estado
                </th>
                <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {semanas.map((semana) => (
                <tr
                  key={semana.slug}
                  className={`border-b border-zinc-100 dark:border-zinc-800 last:border-0 ${
                    semana.esExamen ? "bg-red-50/50 dark:bg-red-950/10" : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <span
                      className={`w-7 h-7 rounded-full text-[11px] flex items-center justify-center font-mono text-white ${CATEGORIA_COLOR[semana.categoria]}`}
                    >
                      {semana.numero}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-zinc-900 dark:text-white">{semana.titulo}</div>
                    <div className="text-xs text-zinc-400 truncate max-w-xs hidden lg:block">
                      {semana.descripcion}
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span
                      className={`text-[10px] font-semibold uppercase text-white px-2 py-0.5 rounded ${CATEGORIA_COLOR[semana.categoria]}`}
                    >
                      {CATEGORIA_LABEL[semana.categoria]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-zinc-500 hidden md:table-cell">
                    {semana.duracion}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-[11px] font-medium px-2 py-0.5 rounded ${
                        semana.disponible
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                      }`}
                    >
                      {semana.disponible ? "Publicada" : "Borrador"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/semanas/${semana.slug}`}
                        target="_blank"
                        className="text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
                      >
                        Ver
                      </Link>
                      <Link
                        href={`/admin/semanas/${semana.slug}/editar`}
                        className="text-xs text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                      >
                        Editar
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
