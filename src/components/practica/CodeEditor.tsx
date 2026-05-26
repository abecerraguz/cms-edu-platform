"use client";

import { useState, useRef, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

interface Props {
  initialCode: string;
  expected?: string;
}

type LogKind = "log" | "warn" | "error" | "info";

interface LogLine {
  kind: LogKind;
  args: string[];
}

// Script inyectado en el iframe para interceptar console.*
const CONSOLE_SHIM = `
<script>
(function() {
  function serialize(v) {
    if (v === null) return 'null';
    if (v === undefined) return 'undefined';
    if (typeof v === 'function') return v.toString();
    if (typeof v === 'object') {
      try { return JSON.stringify(v, null, 2); } catch(e) { return String(v); }
    }
    return String(v);
  }
  function send(kind, args) {
    parent.postMessage({ source: 'xjs-sandbox', kind: kind, args: Array.from(args).map(serialize) }, '*');
  }
  ['log','warn','error','info'].forEach(function(m) {
    var orig = console[m].bind(console);
    console[m] = function() { send(m, arguments); orig.apply(console, arguments); };
  });
  window.addEventListener('error', function(e) {
    send('error', [e.message + (e.lineno ? ' (línea ' + e.lineno + ')' : '')]);
  });
  window.addEventListener('unhandledrejection', function(e) {
    send('error', ['Promise rechazada: ' + String(e.reason)]);
  });
})();
<\/script>`;

function buildSrcdoc(code: string) {
  const escaped = code.replace(/<\/script>/gi, "<\\/script>");
  return `<!DOCTYPE html><html><head><meta charset="utf-8">${CONSOLE_SHIM}</head>
<body><script>"use strict";\n${escaped}<\/script></body></html>`;
}

const KIND_STYLE: Record<LogKind, string> = {
  log:   "text-zinc-200",
  info:  "text-blue-400",
  warn:  "text-amber-400",
  error: "text-red-400",
};

const KIND_BADGE: Record<LogKind, string> = {
  log:   "",
  info:  "INFO",
  warn:  "WARN",
  error: "ERR ",
};

export default function CodeEditor({ initialCode, expected }: Props) {
  const [code, setCode]       = useState(initialCode);
  const [logs, setLogs]       = useState<LogLine[]>([]);
  const [ran, setRan]         = useState(false);
  const [running, setRunning] = useState(false);
  const iframeRef    = useRef<HTMLIFrameElement>(null);
  const listenerRef  = useRef<((e: MessageEvent) => void) | null>(null);
  const collectedRef = useRef<LogLine[]>([]);

  const run = useCallback(() => {
    // Limpiar listener anterior
    if (listenerRef.current) {
      window.removeEventListener("message", listenerRef.current);
    }
    collectedRef.current = [];
    setLogs([]);
    setRan(true);
    setRunning(true);

    const handler = (e: MessageEvent) => {
      if (e.data?.source !== "xjs-sandbox") return;
      const line: LogLine = { kind: e.data.kind as LogKind, args: e.data.args };
      collectedRef.current = [...collectedRef.current, line];
      setLogs([...collectedRef.current]);
    };

    listenerRef.current = handler;
    window.addEventListener("message", handler);

    // Dar 4s para ejecutar y luego marcar como terminado
    setTimeout(() => setRunning(false), 4000);

    if (iframeRef.current) {
      iframeRef.current.srcdoc = buildSrcdoc(code);
    }
  }, [code]);

  const reset = () => {
    if (listenerRef.current) window.removeEventListener("message", listenerRef.current);
    setCode(initialCode);
    setLogs([]);
    setRan(false);
    setRunning(false);
    collectedRef.current = [];
  };

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-zinc-700 not-prose shadow-lg">

      {/* Barra superior */}
      <div className="bg-[#1e1e2e] px-4 py-2.5 flex items-center justify-between gap-2 border-b border-zinc-700">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-xs text-zinc-400 font-mono tracking-wide">
          Práctica interactiva · JavaScript
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={reset}
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors px-2 py-1 rounded"
          >
            Resetear
          </button>
          <button
            onClick={run}
            disabled={running}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 active:scale-95 text-white text-xs font-semibold px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5"
          >
            {running ? (
              <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
            {running ? "Ejecutando…" : "Ejecutar"}
          </button>
        </div>
      </div>

      {/* Editor */}
      <CodeMirror
        value={code}
        height="220px"
        theme={oneDark}
        extensions={[javascript({ jsx: false, typescript: false })]}
        onChange={setCode}
        basicSetup={{
          lineNumbers: true,
          foldGutter: false,
          dropCursor: false,
          allowMultipleSelections: false,
          indentOnInput: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
        }}
      />

      {/* iframe oculto — sandbox real */}
      <iframe
        ref={iframeRef}
        sandbox="allow-scripts"
        className="hidden"
        title="js-sandbox"
      />

      {/* Panel Console */}
      {ran && (
        <div className="border-t border-zinc-700 bg-[#0d1117]" role="status" aria-live="polite">
          <div className="flex items-center justify-between px-4 py-1.5 border-b border-zinc-800">
            <span className="text-[11px] text-zinc-500 uppercase tracking-widest select-none font-sans">
              Console
            </span>
            {logs.length > 0 && (
              <button
                onClick={() => setLogs([])}
                className="text-[11px] text-zinc-600 hover:text-zinc-400 transition-colors"
              >
                Limpiar
              </button>
            )}
          </div>

          <div className="min-h-[3.5rem] max-h-64 overflow-y-auto px-2 py-2 space-y-0.5 font-mono text-sm">
            {logs.length === 0 && !running && (
              <p className="text-zinc-600 text-xs italic px-2">
                (sin salida — usa console.log() para ver resultados)
              </p>
            )}
            {logs.map((l, i) => (
              <div
                key={i}
                className={`flex gap-2 items-start px-2 py-0.5 rounded hover:bg-white/5 transition-colors ${KIND_STYLE[l.kind]}`}
              >
                <span className="shrink-0 text-zinc-600 text-xs w-5 text-right mt-0.5 select-none tabular-nums">
                  {i + 1}
                </span>
                {KIND_BADGE[l.kind] && (
                  <span className={`shrink-0 text-[10px] font-bold mt-0.5 ${KIND_STYLE[l.kind]} opacity-70`}>
                    {KIND_BADGE[l.kind]}
                  </span>
                )}
                <span className="whitespace-pre-wrap break-all leading-relaxed">
                  {l.args.join(" ")}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resultado esperado (opcional) */}
      {expected && (
        <div className="px-4 py-2 bg-zinc-900 border-t border-zinc-800 text-xs text-zinc-500 font-mono">
          Esperado: <span className="text-zinc-300">{expected}</span>
        </div>
      )}
    </div>
  );
}
