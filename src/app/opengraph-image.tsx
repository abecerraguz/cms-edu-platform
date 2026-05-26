import { ImageResponse } from "next/og";

export const alt = "Full Stack JavaScript Trainee · FullStackJS Camp";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const stack = ["HTML5", "CSS3", "JavaScript", "React", "Node.js", "PostgreSQL", "Docker"];

  return new ImageResponse(
    (
      <div
        style={{
          background: "#080808",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          fontFamily: "ui-monospace, monospace",
          position: "relative",
        }}
      >
        {/* Franja decorativa izquierda */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 6,
            height: "100%",
            background: "#c5ff00",
          }}
        />

        {/* Etiqueta superior */}
        <div
          style={{
            color: "#c5ff00",
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: 5,
            textTransform: "uppercase",
            marginBottom: 28,
            display: "flex",
          }}
        >
          FullStackJS Camp · 2026
        </div>

        {/* Título principal */}
        <div
          style={{
            color: "#ffffff",
            fontSize: 68,
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 28,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Desarrollo Full Stack</span>
          <span style={{ color: "#c5ff00" }}>JavaScript</span>
        </div>

        {/* Descripción */}
        <div
          style={{
            color: "#888",
            fontSize: 22,
            lineHeight: 1.5,
            maxWidth: 680,
            marginBottom: 48,
            display: "flex",
          }}
        >
          Programa formativo Trainee — 9 módulos desde fundamentos hasta despliegue en nube.
        </div>

        {/* Stack tecnológico */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {stack.map((tech) => (
            <div
              key={tech}
              style={{
                background: "#141414",
                color: "#c5ff00",
                padding: "8px 18px",
                borderRadius: 6,
                fontSize: 15,
                fontWeight: 600,
                border: "1px solid #2a2a2a",
                display: "flex",
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
