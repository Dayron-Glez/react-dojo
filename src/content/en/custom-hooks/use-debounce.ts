import type { CustomHook } from "@/content/custom-hooks/types"

export const useDebounce: CustomHook = {
  id: "useDebounce",
  label: "useDebounce",
  description:
    "Delays updating a value until a given time has passed without changes. Ideal for search inputs and live filters.",
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

const FRUITS = [
  "Apple", "Apricot", "Avocado", "Banana", "Blueberry",
  "Cherry", "Coconut", "Grape", "Kiwi", "Lemon",
  "Mango", "Orange", "Papaya", "Peach", "Pineapple",
  "Plum", "Raspberry", "Strawberry", "Watermelon",
]

export default function App() {
  const [query, setQuery] = useState("")
  const [callCount, setCallCount] = useState(0)
  const debouncedQuery = useDebounce(query, 400)

  useEffect(() => {
    if (debouncedQuery) setCallCount((c) => c + 1)
  }, [debouncedQuery])

  const results = FRUITS.filter((f) =>
    f.toLowerCase().includes(debouncedQuery.toLowerCase())
  )

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif", maxWidth: 380 }}>
      <h2 style={{ marginBottom: 4 }}>useDebounce</h2>
      <p style={{ color: "var(--fg-muted)", fontSize: 13, marginBottom: 16 }}>
        The search only fires 400ms after you stop typing.
      </p>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search fruits..."
        style={{ width: "100%", marginBottom: 8 }}
      />
      <p style={{ fontSize: 11, color: "var(--fg-muted)", marginBottom: 12 }}>
        Searches fired: <strong>{callCount}</strong> · Active query: <code>"{debouncedQuery}"</code>
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {results.map((fruit) => (
          <li key={fruit} style={{ padding: "6px 0", borderBottom: "1px solid var(--line)", fontSize: 14 }}>
            {fruit}
          </li>
        ))}
        {results.length === 0 && debouncedQuery && (
          <li style={{ color: "var(--fg-muted)", fontSize: 13 }}>No results for "{debouncedQuery}"</li>
        )}
      </ul>
    </div>
  )
}`,
    },
  },
}
