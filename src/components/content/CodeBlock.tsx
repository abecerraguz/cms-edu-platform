import { codeToHtml } from "shiki";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationFocus,
  transformerNotationErrorLevel,
} from "@shikijs/transformers";
import CodeBlockClient from "./CodeBlockClient";

interface Props {
  code: string;
  language?: string;
}

export default async function CodeBlock({ code, language = "text" }: Props) {
  let html = "";

  try {
    html = await codeToHtml(code, {
      lang: language,
      themes: {
        light: "github-light",
        dark:  "github-dark",
      },
      transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
        transformerNotationFocus(),
        transformerNotationErrorLevel(),
      ],
    });
  } catch {
    const escaped = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    html = `<pre class="shiki"><code>${escaped}</code></pre>`;
  }

  return (
    <CodeBlockClient html={html} language={language} rawCode={code} />
  );
}
