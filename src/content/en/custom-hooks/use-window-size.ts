import type { CustomHook } from "@/content/custom-hooks/types"

export const useWindowSize: CustomHook = {
  id: "useWindowSize",
  label: "useWindowSize",
  description:
    "Tracks the viewport dimensions and updates reactively whenever the user resizes the window.",
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

function Bar({ value, max, color, label }) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
        <span style={{ color: "var(--fg-muted)" }}>{label}</span>
        <span style={{ fontFamily: "monospace" }}>{value}px</span>
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
        Resize the preview panel to see the values update in real time.
      </p>

      <Bar value={width} max={1920} color="#60a5fa" label="Width" />
      <Bar value={height} max={1080} color="#34d399" label="Height" />

      <div style={{
        marginTop: 8, padding: "10px 14px", borderRadius: 6,
        border: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <span style={{ fontSize: 12, color: "var(--fg-muted)" }}>Current breakpoint</span>
        <span style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 600 }}>{breakpoint}</span>
      </div>
    </div>
  )
}`,
    },
  },
}
