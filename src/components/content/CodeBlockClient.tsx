"use client";

import { useState } from "react";

interface Props {
  html: string;
  language: string;
  rawCode: string;
}

export default function CodeBlockClient({ html, language, rawCode }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(rawCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback para entornos sin clipboard API
      const ta = document.createElement("textarea");
      ta.value = rawCode;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="code-block-wrapper" data-language={language}>
      {/* Barra superior: lenguaje + botón copiar */}
      <div className="code-block-header">
        <span className="code-block-lang-label">
          {language && language !== "text" ? language : "code"}
        </span>
        <button
          onClick={copy}
          aria-label={copied ? "Copiado" : "Copiar código"}
          className="code-block-copy-btn"
        >
          {copied ? (
            <>
              <svg
                className="w-3.5 h-3.5 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-emerald-400">Copiado</span>
            </>
          ) : (
            <>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>Copiar</span>
            </>
          )}
        </button>
      </div>

      {/* Código con highlighting */}
      <div
        className="code-block-inner"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
