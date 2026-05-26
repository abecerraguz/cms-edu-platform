import { notFound } from "next/navigation";
import Link from "next/link";
import { getSemana } from "@/lib/semanas";
import EditarSemanaForm from "./EditarSemanaForm";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const semana = getSemana(id);
  return {
    title: semana ? `Editar: ${semana.titulo} — CMS` : "Semana no encontrada",
  };
}

export default async function EditarSemanaPage({ params }: Props) {
  const { id } = await params;
  const semana = getSemana(id);

  if (!semana) notFound();

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/semanas" className="text-sm text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors">
          ← Panel
        </Link>
        <span className="text-zinc-300 dark:text-zinc-700">/</span>
        <h1 className="text-xl font-bold text-zinc-900 dark:text-white">
          Editar semana {semana.numero}
        </h1>
      </div>

      <EditarSemanaForm semana={semana} />
    </div>
  );
}
