import type { CustomHook } from "./types"

export const useWindowSize: CustomHook = {
  id: "useWindowSize",
  label: "useWindowSize",
  description:
    "Rastrea las dimensiones del viewport y se actualiza reactivamente cada vez que el usuario redimensiona la ventana.",
  category: "dom",
  code: `import { useState, useEffect } from "react"

interface WindowSize {
  width: number
  height: number
}

export function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })

  useEffect(() => {
    function handleResize() {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return size
}`,
  playground: {
    files: {
      "/App.js": `import { useState, useEffect } from "react"

function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    function handleResize() {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return size
}

function Barra({ valor, maximo, color, etiqueta }) {
  const pct = Math.min((valor / maximo) * 100, 100)
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
        <span style={{ color: "var(--fg-muted)" }}>{etiqueta}</span>
        <span style={{ fontFamily: "monospace" }}>{valor}px</span>
      </div>
      <div style={{ height: 6, borderRadius: 4, background: "var(--surface-2)", overflow: "hidden" }}>
        <div style={{ height: "100%", width: pct + "%", background: color, borderRadius: 4, transition: "width 100ms" }} />
      </div>
    </div>
  )
}

export default function App() {
  const { width, height } = useWindowSize()
  const breakpoint = width < 480 ? "xs" : width < 768 ? "sm" : width < 1024 ? "md" : "lg"

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif", maxWidth: 380 }}>
      <h2 style={{ marginBottom: 4 }}>useWindowSize</h2>
      <p style={{ color: "var(--fg-muted)", fontSize: 13, marginBottom: 24 }}>
        Redimensiona el panel del preview para ver los cambios en tiempo real.
      </p>

      <Barra valor={width} maximo={1920} color="#60a5fa" etiqueta="Ancho" />
      <Barra valor={height} maximo={1080} color="#34d399" etiqueta="Alto" />

      <div style={{
        marginTop: 8, padding: "10px 14px", borderRadius: 6,
        border: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <span style={{ fontSize: 12, color: "var(--fg-muted)" }}>Breakpoint actual</span>
        <span style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 600 }}>{breakpoint}</span>
      </div>
    </div>
  )
}`,
    },
  },
}
