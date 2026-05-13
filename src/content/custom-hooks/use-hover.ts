import type { CustomHook } from "./types"

export const useHover: CustomHook = {
  id: "useHover",
  label: "useHover",
  description:
    "Detecta si el cursor está sobre un elemento referenciado. Devuelve una ref y un booleano que se actualiza con mouseenter/mouseleave.",
  category: "dom",
  code: `import { useState, useRef, useEffect } from "react"

export function useHover<T extends HTMLElement>() {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const enter = () => setHovered(true)
    const leave = () => setHovered(false)

    el.addEventListener("mouseenter", enter)
    el.addEventListener("mouseleave", leave)
    return () => {
      el.removeEventListener("mouseenter", enter)
      el.removeEventListener("mouseleave", leave)
    }
  }, [])

  return [ref, hovered] as const
}`,
  playground: {
    files: {
      "/App.js": `import { useState, useRef, useEffect } from "react"

function useHover() {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const enter = () => setHovered(true)
    const leave = () => setHovered(false)
    el.addEventListener("mouseenter", enter)
    el.addEventListener("mouseleave", leave)
    return () => {
      el.removeEventListener("mouseenter", enter)
      el.removeEventListener("mouseleave", leave)
    }
  }, [])

  return [ref, hovered]
}

function TarjetaHover({ titulo, descripcion, color }) {
  const [ref, hovered] = useHover()
  return (
    <div
      ref={ref}
      style={{
        padding: "16px", borderRadius: 8, cursor: "default",
        border: \`1px solid \${hovered ? color : "var(--line)"}\`,
        background: hovered ? color + "10" : "var(--surface-1)",
        transition: "all 160ms",
      }}
    >
      <div style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{titulo}</div>
      <div style={{ fontSize: 12, color: hovered ? "var(--fg)" : "var(--fg-muted)", transition: "color 160ms" }}>
        {hovered ? "¡Hovereando! 🎯" : descripcion}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif", maxWidth: 360 }}>
      <h2 style={{ marginBottom: 4 }}>useHover</h2>
      <p style={{ color: "var(--fg-muted)", fontSize: 13, marginBottom: 20 }}>
        Pasa el cursor sobre cada tarjeta — cada una tiene su propia instancia del hook.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <TarjetaHover titulo="useLocalStorage" descripcion="Persiste estado en localStorage" color="#60a5fa" />
        <TarjetaHover titulo="useDebounce" descripcion="Retrasa actualización de valores" color="#34d399" />
        <TarjetaHover titulo="useToggle" descripcion="Alterna un estado booleano" color="#f59e0b" />
      </div>
    </div>
  )
}`,
    },
  },
}
