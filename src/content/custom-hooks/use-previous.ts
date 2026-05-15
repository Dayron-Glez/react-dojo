import type { CustomHook } from "./types"

export const usePrevious: CustomHook = {
  id: "usePrevious",
  label: "usePrevious",
  description:
    "Devuelve el valor del render anterior. Útil para comparar estado antiguo y nuevo, o detectar la dirección de un cambio.",
  category: "state",
  code: `import { useRef, useEffect } from "react"

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined)

  useEffect(() => {
    ref.current = value
  })

  return ref.current
}`,
  playground: {
    files: {
      "/App.js": `import { useState, useRef, useEffect } from "react"

function usePrevious(value) {
  const ref = useRef(undefined)
  useEffect(() => { ref.current = value })
  return ref.current
}

export default function App() {
  const [contador, setContador] = useState(0)
  const anteriorContador = usePrevious(contador)
  const direccion = anteriorContador === undefined
    ? "—"
    : contador > anteriorContador
    ? "↑ subió"
    : contador < anteriorContador
    ? "↓ bajó"
    : "= igual"

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif", maxWidth: 340 }}>
      <h2 style={{ marginBottom: 4 }}>usePrevious</h2>
      <p style={{ color: "var(--fg-muted)", fontSize: 13, marginBottom: 24 }}>
        Accede al valor del render anterior para comparar cambios.
      </p>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 20 }}>
        <button onClick={() => setContador((c) => c - 1)}>−</button>
        <span style={{ fontFamily: "monospace", fontSize: 28, minWidth: 40, textAlign: "center" }}>{contador}</span>
        <button onClick={() => setContador((c) => c + 1)}>+</button>
      </div>
      <table style={{ fontSize: 13, borderCollapse: "collapse", width: "100%" }}>
        <tbody>
          <tr>
            <td style={{ padding: "4px 0", color: "var(--fg-muted)" }}>Valor actual</td>
            <td style={{ fontFamily: "monospace", textAlign: "right" }}>{contador}</td>
          </tr>
          <tr>
            <td style={{ padding: "4px 0", color: "var(--fg-muted)" }}>Valor anterior</td>
            <td style={{ fontFamily: "monospace", textAlign: "right" }}>{anteriorContador ?? "—"}</td>
          </tr>
          <tr>
            <td style={{ padding: "4px 0", color: "var(--fg-muted)" }}>Dirección</td>
            <td style={{ textAlign: "right" }}>{direccion}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}`,
    },
  },
}
