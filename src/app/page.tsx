import SemanaCard from "@/components/semana/SemanaCard";
import { getSemanas } from "@/lib/semanas";

export default function HomePage() {
  const semanas = getSemanas();
  const totalHoras = semanas.filter((s) => !s.esExamen).reduce((acc, s) => {
    const h = parseInt(s.duracion);
    return acc + (isNaN(h) ? 0 : h);
  }, 0);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Hero */}
      <div className="mb-10">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">
          Programa · 2026
        </span>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-3">
          React + TypeScript<br />9 semanas
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-base max-w-2xl leading-relaxed">
          Programa intensivo desde los fundamentos de TypeScript hasta el examen transversal.
          Nivel intermedio con enfoque en patrones modernos de React y ecosistema actual.
        </p>
        <div className="mt-6 flex flex-wrap gap-6 text-sm">
          <div>
            <span className="font-semibold text-zinc-900 dark:text-white text-lg">9</span>
            <span className="text-zinc-400 ml-1">semanas</span>
          </div>
          <div>
            <span className="font-semibold text-zinc-900 dark:text-white text-lg">{totalHoras}h</span>
            <span className="text-zinc-400 ml-1">de contenido</span>
          </div>
          <div>
            <span className="font-semibold text-zinc-900 dark:text-white text-lg">
              {semanas.filter((s) => s.disponible).length}
            </span>
            <span className="text-zinc-400 ml-1">semanas disponibles</span>
          </div>
        </div>
      </div>

      {/* Grid de semanas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {semanas.map((semana) => (
          <SemanaCard key={semana.slug} semana={semana} />
        ))}
      </div>
    </div>
  );
}
