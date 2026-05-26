# CMS Edu Platform

Plataforma educativa construida con **Next.js 15 + TypeScript + MDX** que enseña a los estudiantes a construir un CMS de blog full-stack desde cero, semana a semana.

El proyecto que los alumnos construyen es [react-cms](./react-cms): una aplicación React + Express + PostgreSQL con panel de administración CRUD completo.

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 15 (App Router) |
| Lenguaje | TypeScript (strict) |
| Contenido | MDX + gray-matter |
| Estilos | Tailwind CSS |
| Deploy | Vercel |

---

## Estructura del proyecto

```
cms-edu-platform/
├── src/
│   ├── app/                  ← rutas Next.js (App Router)
│   │   ├── page.tsx          ← página principal: listado de semanas
│   │   ├── semanas/[slug]/   ← página de cada semana (MDX renderizado)
│   │   └── admin/            ← panel de gestión de contenido
│   ├── components/
│   │   ├── layout/           ← Header, Sidebar, ThemeToggle, ScrollToTop
│   │   ├── content/          ← MDXContent, CodeBlock, TableOfContents, Callout
│   │   └── semana/           ← SemanaCard
│   └── lib/
│       ├── mdx.ts            ← parser de archivos MDX con frontmatter
│       └── semanas.ts        ← helpers para leer semanas.json
├── content/
│   ├── semanas.json          ← índice de todas las semanas (metadata)
│   ├── semana-01/index.mdx
│   ├── semana-02/index.mdx
│   └── ...
└── public/
```

---

## Programa del curso (11 semanas)

El contenido se encuentra en `content/` como archivos MDX. Cada semana incluye teoría, ejemplos de código, actividades prácticas y un entregable.

| # | Semana | Duración | Tema principal |
|---|---|---|---|
| 1 | [semana-01](./content/semana-01/index.mdx) | 8h | Fundamentos de TypeScript |
| 2 | [semana-02](./content/semana-02/index.mdx) | 8h | React + TypeScript: Primeros pasos |
| 3 | [semana-03](./content/semana-03/index.mdx) | 8h | Hooks con TypeScript |
| 4 | [semana-04](./content/semana-04/index.mdx) | 8h | Componentes avanzados y Context API |
| 5 | [semana-05](./content/semana-05/index.mdx) | 8h | Gestión de estado global |
| 6 | [semana-06](./content/semana-06/index.mdx) | 8h | React Router con TypeScript |
| 7 | [semana-07](./content/semana-07/index.mdx) | 8h | Consumo de APIs y datos asíncronos |
| 8 | [semana-08](./content/semana-08/index.mdx) | 8h | Backend CRUD completo con Express y multer |
| 9 | [semana-09](./content/semana-09/index.mdx) | 8h | Panel admin CRUD conectado a la API |
| 10 | [semana-10](./content/semana-10/index.mdx) | 8h | Testing y buenas prácticas |
| 11 | [semana-11](./content/semana-11/index.mdx) | Entrega final | Examen Transversal: Proyecto Integrador |

---

## Proyecto que construyen los alumnos

El resultado final es **react-cms**: un CMS de blog full-stack con las siguientes características.

**Frontend** (`react-cms/frontend/`) — Vite + React 18 + TypeScript:
- Página pública del blog con lista de artículos y detalle por slug
- Panel admin con autenticación, listado, creación, edición y eliminación de artículos
- Subida de imágenes con preview antes de guardar
- Estado global con Zustand + TanStack Query para datos del servidor
- React Router v6 con rutas protegidas y code splitting

**Backend** (`react-cms/backend/`) — Express + TypeScript + PostgreSQL:
- API REST: `GET`, `POST`, `PUT`, `DELETE /api/articulos`
- Subida de archivos: `POST /api/upload` (multer)
- Arquitectura MVC: controllers / models / routes / middleware
- Error handler global con códigos PostgreSQL tipados

---

## Instalación y desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

El contenido de las semanas se edita directamente en los archivos MDX de `content/`. Los cambios se reflejan de inmediato gracias al hot reload de Next.js.

---

## Agregar o editar una semana

1. **Editar metadata**: actualiza `content/semanas.json` con los campos `slug`, `numero`, `titulo`, `descripcion`, `tecnologias`, `duracion`, `disponible`, `esExamen`.
2. **Editar contenido**: modifica el archivo `content/semana-XX/index.mdx` correspondiente.
3. **Nueva semana**: crea la carpeta `content/semana-XX/` con su `index.mdx` y añade la entrada en `semanas.json`.

El frontmatter de cada MDX define los metadatos que aparecen en la UI:

```yaml
---
titulo: "Título de la semana"
descripcion: "Descripción breve"
duracion: "8h"
semana: 1
objetivos:
  - "Objetivo 1"
  - "Objetivo 2"
recursos:
  - nombre: "Nombre del recurso"
    url: "https://..."
---
```
