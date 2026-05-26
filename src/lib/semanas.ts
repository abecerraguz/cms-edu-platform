import semanasData from "../../content/semanas.json";
import type { Semana } from "@/types";

export function getSemanas(): Semana[] {
  return semanasData as Semana[];
}

export function getSemana(slug: string): Semana | undefined {
  return (semanasData as Semana[]).find((s) => s.slug === slug);
}
