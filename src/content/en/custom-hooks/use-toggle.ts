import type { CustomHook } from "@/content/custom-hooks/types"

export const useToggleContent: CustomHook = {
  id: "useToggle",
  label: "useToggle",
  description:
    "Manages a boolean state with toggle, setTrue, and setFalse helpers. Reduces boilerplate for common on/off UI patterns.",
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
  const dark = useToggle(false)
  const muted = useToggle(true)

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif", maxWidth: 380 }}>
      <h2 style={{ marginBottom: 4 }}>useToggle</h2>
      <p style={{ color: "var(--fg-muted)", fontSize: 13, marginBottom: 20 }}>
        Three independent instances of the same hook.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13 }}>Modal</span>
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={modal.setTrue} disabled={modal.value}>Open</button>
            <button onClick={modal.setFalse} disabled={!modal.value}>Close</button>
            <button onClick={modal.toggle}>Toggle</button>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13 }}>Dark theme</span>
          <button onClick={dark.toggle}>{dark.value ? "🌙 Dark" : "☀️ Light"}</button>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13 }}>Sound</span>
          <button onClick={muted.toggle}>{muted.value ? "🔇 Muted" : "🔊 Active"}</button>
        </div>
      </div>

      {modal.value && (
        <div style={{
          marginTop: 20, padding: "16px", borderRadius: 8,
          border: "1px solid var(--line-strong)", background: "var(--surface-1)"
        }}>
          <strong style={{ fontSize: 14 }}>Modal is open</strong>
          <p style={{ fontSize: 13, color: "var(--fg-muted)", margin: "8px 0" }}>
            Closed with setFalse(), not toggle() — more semantic.
          </p>
          <button onClick={modal.setFalse}>Close</button>
        </div>
      )}
    </div>
  )
}`,
    },
  },
}
