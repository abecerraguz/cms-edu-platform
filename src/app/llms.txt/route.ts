import { getSemanas } from "@/lib/semanas";

export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://react-ts.abecerraguz.com";

  const semanas = getSemanas();
  const semanaDisponibles = semanas.filter((s) => s.disponible);
  const totalHoras = semanas
    .filter((s) => !s.esExamen)
    .reduce((acc, s) => acc + (parseInt(s.duracion) || 0), 0);

  const lines: string[] = [
    `# React + TypeScript`,
    ``,
    `> Programa formativo de desarrollo frontend con React y TypeScript.`,
    `> ${semanas.length} semanas, ${totalHoras}h de contenido. Desde fundamentos de TypeScript hasta testing y arquitectura avanzada.`,
    ``,
    `## Semanas`,
    ...semanas.map(
      (s) =>
        `- [${s.titulo}](${baseUrl}/semanas/${s.slug}): ${s.descripcion} Tecnologías: ${s.tecnologias.join(", ")}. Duración: ${s.duracion}.`
    ),
  ];

  if (semanaDisponibles.length > 0) {
    lines.push(``);
    lines.push(`## Semanas disponibles`);
    for (const semana of semanaDisponibles) {
      lines.push(`- [${semana.titulo}](${baseUrl}/semanas/${semana.slug})`);
    }
  }

  lines.push(``);
  lines.push(`## Información general`);
  lines.push(`- Idioma: Español`);
  lines.push(`- Nivel: Intermedio`);
  lines.push(`- Modalidad: Online`);
  lines.push(
    `- Tecnologías principales: React, TypeScript, Vite, React Router, TanStack Query, Vitest, React Testing Library`
  );

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}

