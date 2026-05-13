import type { CustomHook } from "./types"

export const useMediaQuery: CustomHook = {
  id: "useMediaQuery",
  label: "useMediaQuery",
  description:
    "Se suscribe a una media query CSS y devuelve si coincide en este momento. Se actualiza reactivamente cuando cambia el viewport.",
  category: "dom",
  code: `import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [query])

  return matches
}`,
  playground: {
    files: {
      "/App.js": `import { useState, useEffect } from "react"

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)
    const listener = (e) => setMatches(e.matches)
    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [query])

  return matches
}

export default function App() {
  const esAncho = useMediaQuery("(min-width: 500px)")
  const prefiereOscuro = useMediaQuery("(prefers-color-scheme: dark)")
  const prefiereReducido = useMediaQuery("(prefers-reduced-motion: reduce)")

  const fila = (etiqueta, valor) => (
    <tr key={etiqueta}>
      <td style={{ padding: "6px 0", color: "var(--fg-muted)", fontSize: 13 }}>{etiqueta}</td>
      <td style={{ textAlign: "right", fontFamily: "monospace", fontSize: 13 }}>
        <span style={{ color: valor ? "#34d399" : "#f87171" }}>{valor ? "true" : "false"}</span>
      </td>
    </tr>
  )

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif", maxWidth: 400 }}>
      <h2 style={{ marginBottom: 4 }}>useMediaQuery</h2>
      <p style={{ color: "var(--fg-muted)", fontSize: 13, marginBottom: 20 }}>
        Redimensiona el preview para ver cómo cambia <code>esAncho</code>.
      </p>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          {fila("(min-width: 500px)", esAncho)}
          {fila("(prefers-color-scheme: dark)", prefiereOscuro)}
          {fila("(prefers-reduced-motion: reduce)", prefiereReducido)}
        </tbody>
      </table>
    </div>
  )
}`,
    },
  },
}
