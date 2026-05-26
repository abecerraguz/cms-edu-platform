import type { JSX } from "react";
import type { Heading } from "@/lib/mdx";

interface Props {
  headings: Heading[];
}

export default function TableOfContents({ headings }: Props): JSX.Element {
  if (headings.length === 0) return <></>;

  return (
    <nav aria-label="En esta página">
      <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 mb-4 px-1">
        En esta página
      </p>
      <ul className="space-y-0.5">
        {headings.map((h) => (
          <li key={`${h.id}-${h.level}`}>
            <a
              href={`#${h.id}`}
              className={`block py-1.5 text-sm leading-snug transition-colors text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-[#c5ff00] ${
                h.level === 3 ? "pl-3 text-xs text-zinc-400 dark:text-zinc-500" : ""
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
