import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { MDXFrontmatter } from "@/types";
import { mdxComponents } from "@/components/content/MDXContent";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface Heading {
  level: number;
  text: string;
  id: string;
}

/** Convierte texto de un heading en un id válido para ancla */
export function toHeadingId(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")      // quitar tildes
    .replace(/`([^`]*)`/g, "$1")           // strips backtick markers but keeps inner text
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function extractHeadings(content: string): Heading[] {
  return content
    .split("\n")
    .filter((line) => /^#{2,3} /.test(line))
    .map((line) => {
      const level = line.startsWith("### ") ? 3 : 2;
      const text = line.replace(/^#{2,3} /, "").trim();
      const id = toHeadingId(text);
      return { level, text, id };
    });
}

function readMdxFile(filePath: string): { content: string; data: Record<string, unknown> } {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(raw);
  return { content, data };
}

export async function getSemanaContent(semanaSlug: string) {
  const filePath = path.join(CONTENT_DIR, semanaSlug, "index.mdx");
  const { content, data } = readMdxFile(filePath);

  const headings = extractHeadings(content);

  const { content: jsx } = await compileMDX<MDXFrontmatter>({
    source: content,
    options: { parseFrontmatter: false, mdxOptions: { remarkPlugins: [remarkGfm] } },
    components: mdxComponents,
  });

  return { jsx, frontmatter: data as MDXFrontmatter, headings };
}
