import { notFound } from "next/navigation";
import { getSemanas, getSemana } from "@/lib/semanas";
import { getSemanaContent } from "@/lib/mdx";
import { CATEGORIA_COLOR, CATEGORIA_LABEL } from "@/components/semana/SemanaCard";
import { Check, ListChecks, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getSemanas().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const semana = getSemana(slug);
  if (!semana) return {};
  const description = `Semana ${semana.numero}: ${semana.titulo}. ${semana.descripcion}`;
  return {
    title: semana.titulo,
    description,
    keywords: semana.tecnologias,
    openGraph: {
      title: `${semana.titulo} · React + TypeScript`,
      description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${semana.titulo} · React + TypeScript`,
      description,
    },
  };
}

export default async function SemanaPage({ params }: Props) {
  const { slug } = await params;
  const semana = getSemana(slug);
  if (!semana) notFound();

  const { jsx, frontmatter } = await getSemanaContent(slug);

  const todasLasSemanas = getSemanas();
  const currentIndex = todasLasSemanas.findIndex((s) => s.slug === slug);
  const prevSemana = currentIndex > 0 ? todasLasSemanas[currentIndex - 1] : null;
  const nextSemana =
    currentIndex < todasLasSemanas.length - 1
      ? todasLasSemanas[currentIndex + 1]
      : null;

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://react-ts.abecerraguz.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: semana.titulo,
    description: semana.descripcion,
    url: `${baseUrl}/semanas/${semana.slug}`,
    provider: {
      "@type": "Organization",
      name: "React + TypeScript",
      url: baseUrl,
    },
    timeRequired: `PT${semana.duracion.replace("h", "H")}`,
    inLanguage: "es",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="flex-1 min-w-0 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-zinc-400 mb-6" aria-label="Ruta de navegación">
            <Link href="/" className="hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <span
              className={`px-2 py-0.5 rounded text-white text-[10px] font-semibold ${CATEGORIA_COLOR[semana.categoria]}`}
            >
              {CATEGORIA_LABEL[semana.categoria]}
            </span>
            <span>/</span>
            <span className="text-zinc-600 dark:text-zinc-300">Semana {semana.numero}</span>
          </nav>

          {/* Header de semana */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs text-zinc-400 mb-3">
              <span>Semana {semana.numero} de 9</span>
              <span>·</span>
              <span>{semana.duracion}</span>
            </div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
              {semana.titulo}
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400">{semana.descripcion}</p>

            {/* Tecnologías */}
            <div className="flex flex-wrap gap-1.5 mt-4">
              {semana.tecnologias.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] font-medium bg-zinc-100 dark:bg-white/6 text-zinc-600 dark:text-zinc-300 rounded px-2 py-0.5"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Objetivos */}
            {frontmatter.objetivos && frontmatter.objetivos.length > 0 && (
              <details className="not-prose mt-6 rounded-lg border border-blue-200 dark:border-blue-900/40 overflow-hidden">
                <summary className="px-4 py-3 bg-blue-50 dark:bg-blue-950/30 text-sm font-medium text-blue-800 dark:text-blue-300 cursor-pointer select-none flex items-center gap-2">
                  <ListChecks size={15} aria-hidden="true" />
                  Objetivos de aprendizaje
                </summary>
                <ul className="px-4 py-3 text-sm text-zinc-700 dark:text-zinc-300 space-y-1.5">
                  {frontmatter.objetivos.map((obj, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <Check
                        size={14}
                        className="text-blue-500 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      {obj}
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </div>

          {/* Contenido MDX */}
          <div className="prose prose-zinc dark:prose-invert max-w-none">{jsx}</div>

          {/* Recursos */}
          {frontmatter.recursos && frontmatter.recursos.length > 0 && (
            <div className="mt-12 not-prose">
              <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-3">
                Recursos
              </h2>
              <ul className="space-y-2">
                {frontmatter.recursos.map((r) => (
                  <li key={r.url}>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <span>↗</span>
                      {r.nombre}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Navegación anterior / siguiente */}
          <div className="mt-12 not-prose flex items-center justify-between gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-6">
            {prevSemana ? (
              <Link
                href={`/semanas/${prevSemana.slug}`}
                className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <ChevronLeft size={16} />
                <span>
                  <span className="text-xs text-zinc-400 block">Anterior</span>
                  {prevSemana.titulo}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextSemana ? (
              <Link
                href={`/semanas/${nextSemana.slug}`}
                className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors text-right"
              >
                <span>
                  <span className="text-xs text-zinc-400 block">Siguiente</span>
                  {nextSemana.titulo}
                </span>
                <ChevronRight size={16} />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </article>
    </>
  );
}
