import type { JSX, ReactNode } from "react";
import CodeBlock from "./CodeBlock";
import Callout from "./Callout";
import CodeEditor from "@/components/practica/CodeEditor";
import { toHeadingId } from "@/lib/mdx";

/** Extrae el contenido de texto plano de cualquier nodo React (para generar IDs de heading) */
function textContent(node: unknown): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textContent).join("");
  if (node !== null && typeof node === "object" && "props" in node) {
    return textContent((node as { props?: { children?: unknown } }).props?.children);
  }
  return "";
}

// Componentes MDX custom inyectados en cada archivo .mdx
export const mdxComponents: Record<string, (props: Record<string, unknown>) => JSX.Element> = {
  // Headings con ID para anclas (usados por el TOC)
  h2: ({ children, ...rest }: Record<string, unknown>) => {
    const id = toHeadingId(textContent(children));
    return <h2 id={id} {...(rest as React.HTMLAttributes<HTMLHeadingElement>)}>{children as ReactNode}</h2>;
  },
  h3: ({ children, ...rest }: Record<string, unknown>) => {
    const id = toHeadingId(textContent(children));
    return <h3 id={id} {...(rest as React.HTMLAttributes<HTMLHeadingElement>)}>{children as ReactNode}</h3>;
  },
  // Bloques de código con syntax highlighting
  pre: (props) => {
    const codeEl = (props.children as { props?: { className?: string; children?: string } } | undefined);
    const language = codeEl?.props?.className?.replace("language-", "") ?? "text";
    const code = (codeEl?.props?.children as string) ?? "";
    return <CodeBlock code={code.trim()} language={language} />;
  },

  // Tablas GFM con scroll horizontal en móvil
  table: (props) => (
    <div className="overflow-x-auto my-6 rounded-lg border border-zinc-200 dark:border-zinc-700 not-prose">
      <table style={{ display: "table", width: "100%", whiteSpace: "normal" }} className="text-sm text-left border-collapse">{props.children as ReactNode}</table>
    </div>
  ),
  thead: (props) => (
    <thead className="bg-zinc-50 dark:bg-zinc-800 text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
      {props.children as ReactNode}
    </thead>
  ),
  tbody: (props) => (
    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">{props.children as ReactNode}</tbody>
  ),
  tr: (props) => (
    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">{props.children as ReactNode}</tr>
  ),
  th: (props) => (
    <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
      {props.children as ReactNode}
    </th>
  ),
  td: (props) => (
    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300 align-top">{props.children as ReactNode}</td>
  ),

  // Cajas de aviso / nota / tip
  Callout: (props) => (
    <Callout type={(props.type as "tip" | "warning" | "info") ?? "info"}>
      {props.children as ReactNode}
    </Callout>
  ),

  // Editor de código interactivo
  CodeEditor: (props) => (
    <CodeEditor
      initialCode={(props.initialCode as string) ?? ""}
      expected={props.expected as string | undefined}
    />
  ),
};
