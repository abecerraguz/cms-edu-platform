import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import type { Semana, CategoriaSemana } from "@/types";

const SEMANAS_PATH = join(process.cwd(), "content", "semanas.json");

function loadSemanas(): Semana[] {
  const raw = readFileSync(SEMANAS_PATH, "utf-8");
  return JSON.parse(raw) as Semana[];
}

function saveSemanas(semanas: Semana[]): void {
  writeFileSync(SEMANAS_PATH, JSON.stringify(semanas, null, 2), "utf-8");
}

export async function GET() {
  const semanas = loadSemanas();
  return NextResponse.json(semanas);
}

interface SemanaPayload {
  titulo: string;
  descripcion: string;
  categoria: CategoriaSemana;
  duracion: string;
  tecnologias: string[];
  disponible: boolean;
  esExamen: boolean;
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Partial<SemanaPayload>;

  if (!body.titulo?.trim() || !body.descripcion?.trim() || !body.categoria) {
    return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
  }

  const semanas = loadSemanas();
  const nextNumero = semanas.length + 1;
  const slug = `semana-${String(nextNumero).padStart(2, "0")}`;

  if (semanas.some((s) => s.slug === slug)) {
    return NextResponse.json({ error: "Ya existe una semana con ese slug" }, { status: 409 });
  }

  const nueva: Semana = {
    slug,
    numero: nextNumero,
    titulo: body.titulo.trim(),
    descripcion: body.descripcion.trim(),
    categoria: body.categoria,
    tecnologias: Array.isArray(body.tecnologias) ? body.tecnologias : [],
    duracion: body.duracion ?? "8h",
    disponible: body.disponible ?? false,
    esExamen: body.esExamen ?? false,
  };

  semanas.push(nueva);
  saveSemanas(semanas);

  return NextResponse.json(nueva, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const body = (await req.json()) as Partial<Semana> & { slug: string };

  if (!body.slug) {
    return NextResponse.json({ error: "slug requerido" }, { status: 400 });
  }

  const semanas = loadSemanas();
  const idx = semanas.findIndex((s) => s.slug === body.slug);

  if (idx === -1) {
    return NextResponse.json({ error: "Semana no encontrada" }, { status: 404 });
  }

  semanas[idx] = { ...semanas[idx], ...body };
  saveSemanas(semanas);

  return NextResponse.json(semanas[idx]);
}
