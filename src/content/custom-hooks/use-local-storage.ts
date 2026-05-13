import type { CustomHook } from "./types"

export const useLocalStorage: CustomHook = {
  id: "useLocalStorage",
  label: "useLocalStorage",
  description:
    "Persiste el estado en localStorage y lo mantiene sincronizado entre renders. Maneja la serialización JSON automáticamente.",
  category: "state",
  code: `import { useState, useCallback } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const next = value instanceof Function ? value(storedValue) : value
        setStoredValue(next)
        window.localStorage.setItem(key, JSON.stringify(next))
      } catch (error) {
        console.error(error)
      }
    },
    [key, storedValue]
  )

  const removeValue = useCallback(() => {
    setStoredValue(initialValue)
    window.localStorage.removeItem(key)
  }, [key, initialValue])

  return [storedValue, setValue, removeValue] as const
}`,
  playground: {
    files: {
      "/App.js": `import { useState, useCallback } from "react"

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback(
    (value) => {
      try {
        const next = value instanceof Function ? value(storedValue) : value
        setStoredValue(next)
        window.localStorage.setItem(key, JSON.stringify(next))
      } catch (error) {
        console.error(error)
      }
    },
    [key, storedValue]
  )

  const removeValue = useCallback(() => {
    setStoredValue(initialValue)
    window.localStorage.removeItem(key)
  }, [key, initialValue])

  return [storedValue, setValue, removeValue]
}

export default function App() {
  const [nombre, setNombre, eliminarNombre] = useLocalStorage("demo-nombre", "React Dev")
  const [contador, setContador] = useLocalStorage("demo-contador", 0)

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif", maxWidth: 420 }}>
      <h2 style={{ marginBottom: 4 }}>useLocalStorage</h2>
      <p style={{ color: "var(--fg-muted)", fontSize: 13, marginBottom: 24 }}>
        Los valores persisten entre recargas. Abre DevTools → Application → localStorage para verlo.
      </p>

      <div style={{ marginBottom: 20 }}>
        <label style={{ display: "block", fontSize: 12, marginBottom: 6 }}>Nombre</label>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre..."
            style={{ flex: 1 }}
          />
          <button onClick={eliminarNombre}>Limpiar</button>
        </div>
      </div>

      <div>
        <label style={{ display: "block", fontSize: 12, marginBottom: 6 }}>Contador persistente</label>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={() => setContador((c) => c - 1)}>−</button>
          <span style={{ fontFamily: "monospace", fontSize: 20, minWidth: 32, textAlign: "center" }}>{contador}</span>
          <button onClick={() => setContador((c) => c + 1)}>+</button>
        </div>
      </div>
    </div>
  )
}`,
    },
  },
}
