export type CategoriaSemana =
  | "fundamentos"
  | "hooks"
  | "componentes"
  | "estado"
  | "routing"
  | "apis"
  | "testing"
  | "examen";

export interface Semana {
  slug: string;
  numero: number;
  titulo: string;
  descripcion: string;
  categoria: CategoriaSemana;
  tecnologias: string[];
  duracion: string;
  disponible: boolean;
  esExamen: boolean;
}

export interface MDXFrontmatter {
  titulo?: string;
  descripcion?: string;
  objetivos?: string[];
  recursos?: { nombre: string; url: string }[];
  duracion?: string;
  semana?: number;
}
