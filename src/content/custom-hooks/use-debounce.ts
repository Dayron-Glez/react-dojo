import type { CustomHook } from "./types"

export const useDebounce: CustomHook = {
  id: "useDebounce",
  label: "useDebounce",
  description:
    "Retrasa la actualización de un valor hasta que haya pasado cierto tiempo sin cambios. Ideal para inputs de búsqueda y filtros en vivo.",
  category: "utility",
  code: `import { useState, useEffect } from "react"

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}`,
  playground: {
    files: {
      "/App.js": `import { useState, useEffect } from "react"

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

const FRUTAS = [
  "Manzana", "Albaricoque", "Aguacate", "Plátano", "Arándano",
  "Cereza", "Coco", "Uva", "Kiwi", "Limón",
  "Mango", "Naranja", "Papaya", "Melocotón", "Piña",
  "Ciruela", "Frambuesa", "Fresa", "Sandía",
]

export default function App() {
  const [query, setQuery] = useState("")
  const [contadorLlamadas, setContadorLlamadas] = useState(0)
  const queryDebounced = useDebounce(query, 400)

  useEffect(() => {
    if (queryDebounced) setContadorLlamadas((c) => c + 1)
  }, [queryDebounced])

  const resultados = FRUTAS.filter((f) =>
    f.toLowerCase().includes(queryDebounced.toLowerCase())
  )

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif", maxWidth: 380 }}>
      <h2 style={{ marginBottom: 4 }}>useDebounce</h2>
      <p style={{ color: "var(--fg-muted)", fontSize: 13, marginBottom: 16 }}>
        La búsqueda solo se ejecuta 400 ms después de que dejes de escribir.
      </p>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar frutas..."
        style={{ width: "100%", marginBottom: 8 }}
      />
      <p style={{ fontSize: 11, color: "var(--fg-muted)", marginBottom: 12 }}>
        Búsquedas ejecutadas: <strong>{contadorLlamadas}</strong> · Query activo: <code>"{queryDebounced}"</code>
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {resultados.map((fruta) => (
          <li key={fruta} style={{ padding: "6px 0", borderBottom: "1px solid var(--line)", fontSize: 14 }}>
            {fruta}
          </li>
        ))}
        {resultados.length === 0 && queryDebounced && (
          <li style={{ color: "var(--fg-muted)", fontSize: 13 }}>Sin resultados para "{queryDebounced}"</li>
        )}
      </ul>
    </div>
  )
}`,
    },
  },
}
