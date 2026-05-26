"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Semana, CategoriaSemana } from "@/types";

const CATEGORIAS: CategoriaSemana[] = [
  "fundamentos",
  "hooks",
  "componentes",
  "estado",
  "routing",
  "apis",
  "testing",
  "examen",
];

export default function EditarSemanaForm({ semana }: { semana: Semana }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload: Partial<Semana> & { slug: string } = {
      slug: semana.slug,
      titulo: data.get("titulo") as string,
      descripcion: data.get("descripcion") as string,
      categoria: data.get("categoria") as CategoriaSemana,
      duracion: data.get("duracion") as string,
      tecnologias: (data.get("tecnologias") as string)
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      disponible: data.get("disponible") === "on",
      esExamen: data.get("esExamen") === "on",
    };

    const res = await fetch("/api/semanas", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      setError((json as { error?: string }).error ?? "Error al actualizar la semana");
      setSubmitting(false);
      return;
    }

    router.push("/admin/semanas");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-5">
      {error && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="titulo" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
          Título <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="titulo"
          name="titulo"
          required
          defaultValue={semana.titulo}
          className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="descripcion" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
          Descripción <span className="text-red-500">*</span>
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          required
          rows={3}
          defaultValue={semana.descripcion}
          className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="categoria" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
            Categoría <span className="text-red-500">*</span>
          </label>
          <select
            id="categoria"
            name="categoria"
            required
            defaultValue={semana.categoria}
            className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {CATEGORIAS.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="duracion" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
            Duración
          </label>
          <input
            type="text"
            id="duracion"
            name="duracion"
            defaultValue={semana.duracion}
            className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="tecnologias" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
          Tecnologías <span className="text-xs text-zinc-400">(separadas por coma)</span>
        </label>
        <input
          type="text"
          id="tecnologias"
          name="tecnologias"
          defaultValue={semana.tecnologias.join(", ")}
          className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer">
          <input type="checkbox" name="disponible" defaultChecked={semana.disponible} className="rounded" />
          Publicada
        </label>
        <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer">
          <input type="checkbox" name="esExamen" defaultChecked={semana.esExamen} className="rounded" />
          Es examen transversal
        </label>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800">
        <Link
          href={`/semanas/${semana.slug}`}
          target="_blank"
          className="text-sm text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
        >
          Ver semana →
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/admin/semanas" className="px-4 py-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {submitting ? "Guardando…" : "Guardar cambios"}
          </button>
        </div>
      </div>
    </form>
  );
}
