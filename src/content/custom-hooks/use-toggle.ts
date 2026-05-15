import { useState, useCallback } from "react"
import type { CustomHook } from "./types"

// Real implementation — importable in tests
export function useToggle(initialValue = false) {
  const [value, setValue] = useState<boolean>(initialValue)

  const toggle = useCallback(() => setValue((v) => !v), [])
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])

  return { value, toggle, setTrue, setFalse }
}

// Metadata — used by the app UI and Sandpack playground
export const useToggleContent: CustomHook = {
  id: "useToggle",
  label: "useToggle",
  description:
    "Gestiona un estado booleano con helpers toggle, setTrue y setFalse. Reduce boilerplate en patrones de UI encendido/apagado.",
  category: "state",
  code: `import { useState, useCallback } from "react"

interface UseToggleReturn {
  value: boolean
  toggle: () => void
  setTrue: () => void
  setFalse: () => void
}

export function useToggle(initialValue = false): UseToggleReturn {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => setValue((v) => !v), [])
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])

  return { value, toggle, setTrue, setFalse }
}`,
  playground: {
    files: {
      "/App.js": `import { useState, useCallback } from "react"

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)
  const toggle = useCallback(() => setValue((v) => !v), [])
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])
  return { value, toggle, setTrue, setFalse }
}

export default function App() {
  const modal = useToggle(false)
  const oscuro = useToggle(false)
  const silenciado = useToggle(true)

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif", maxWidth: 380 }}>
      <h2 style={{ marginBottom: 4 }}>useToggle</h2>
      <p style={{ color: "var(--fg-muted)", fontSize: 13, marginBottom: 20 }}>
        Tres instancias independientes del mismo hook.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13 }}>Modal</span>
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={modal.setTrue} disabled={modal.value}>Abrir</button>
            <button onClick={modal.setFalse} disabled={!modal.value}>Cerrar</button>
            <button onClick={modal.toggle}>Toggle</button>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13 }}>Tema oscuro</span>
          <button onClick={oscuro.toggle}>{oscuro.value ? "🌙 Oscuro" : "☀️ Claro"}</button>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13 }}>Sonido</span>
          <button onClick={silenciado.toggle}>{silenciado.value ? "🔇 Silenciado" : "🔊 Activo"}</button>
        </div>
      </div>

      {modal.value && (
        <div style={{
          marginTop: 20, padding: "16px", borderRadius: 8,
          border: "1px solid var(--line-strong)", background: "var(--surface-1)"
        }}>
          <strong style={{ fontSize: 14 }}>Modal abierto</strong>
          <p style={{ fontSize: 13, color: "var(--fg-muted)", margin: "8px 0" }}>
            Cerrado con setFalse(), no con toggle() — más semántico.
          </p>
          <button onClick={modal.setFalse}>Cerrar</button>
        </div>
      )}
    </div>
  )
}`,
    },
  },
}
