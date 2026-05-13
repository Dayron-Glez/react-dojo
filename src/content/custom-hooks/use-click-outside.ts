import type { CustomHook } from "./types"

export const useClickOutside: CustomHook = {
  id: "useClickOutside",
  label: "useClickOutside",
  description:
    "Llama a un callback cuando el usuario hace clic fuera de un elemento referenciado. Ideal para cerrar dropdowns, modales y popovers.",
  category: "dom",
  code: `import { useEffect, useRef } from "react"

export function useClickOutside<T extends HTMLElement>(
  callback: () => void
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [callback])

  return ref
}`,
  playground: {
    files: {
      "/App.js": `import { useState, useEffect, useRef, useCallback } from "react"

function useClickOutside(callback) {
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [callback])

  return ref
}

export default function App() {
  const [abierto, setAbierto] = useState(false)
  const [contadorCierres, setContadorCierres] = useState(0)

  const handleCerrar = useCallback(() => {
    if (abierto) {
      setAbierto(false)
      setContadorCierres((c) => c + 1)
    }
  }, [abierto])

  const ref = useClickOutside(handleCerrar)

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif" }}>
      <h2 style={{ marginBottom: 4 }}>useClickOutside</h2>
      <p style={{ color: "var(--fg-muted)", fontSize: 13, marginBottom: 20 }}>
        Haz clic en el botón para abrir el panel, luego haz clic fuera para cerrarlo.
      </p>

      <button onClick={() => setAbierto(true)} disabled={abierto}>
        Abrir panel
      </button>

      {abierto && (
        <div
          ref={ref}
          style={{
            marginTop: 12, padding: "16px", borderRadius: 8,
            border: "1px solid var(--line-strong)", background: "var(--surface-1)",
            maxWidth: 260
          }}
        >
          <strong style={{ fontSize: 14 }}>Panel abierto</strong>
          <p style={{ fontSize: 13, color: "var(--fg-muted)", margin: "8px 0 0" }}>
            Haz clic fuera de este panel para cerrarlo.
          </p>
        </div>
      )}

      <p style={{ marginTop: 16, fontSize: 12, color: "var(--fg-muted)" }}>
        Veces cerrado por clic externo: <strong>{contadorCierres}</strong>
      </p>
    </div>
  )
}`,
    },
  },
}
