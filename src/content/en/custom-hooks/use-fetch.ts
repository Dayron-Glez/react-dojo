import type { CustomHook } from "@/content/custom-hooks/types"

export const useFetch: CustomHook = {
  id: "useFetch",
  label: "useFetch",
  description:
    "Encapsulates fetch logic with loading, data, and error states. Automatically cancels the request if the component unmounts.",
  category: "async",
  code: `import { useState, useEffect } from "react"

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let cancelled = false
    setState({ data: null, loading: true, error: null })

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
        return res.json() as Promise<T>
      })
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null })
      })
      .catch((err: Error) => {
        if (!cancelled) setState({ data: null, loading: false, error: err.message })
      })

    return () => { cancelled = true }
  }, [url])

  return state
}`,
  playground: {
    files: {
      "/App.js": `import { useState, useEffect } from "react"

function useFetch(url) {
  const [state, setState] = useState({ data: null, loading: true, error: null })

  useEffect(() => {
    let cancelled = false
    setState({ data: null, loading: true, error: null })

    fetch(url)
      .then((res) => { if (!res.ok) throw new Error("HTTP " + res.status); return res.json() })
      .then((data) => { if (!cancelled) setState({ data, loading: false, error: null }) })
      .catch((err) => { if (!cancelled) setState({ data: null, loading: false, error: err.message }) })

    return () => { cancelled = true }
  }, [url])

  return state
}

const ENDPOINTS = [
  { label: "Posts", url: "https://jsonplaceholder.typicode.com/posts?_limit=4" },
  { label: "Users", url: "https://jsonplaceholder.typicode.com/users?_limit=4" },
  { label: "Invalid URL (error)", url: "https://jsonplaceholder.typicode.com/invalid-404" },
]

export default function App() {
  const [endpointIdx, setEndpointIdx] = useState(0)
  const { url } = ENDPOINTS[endpointIdx]
  const { data, loading, error } = useFetch(url)

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif", maxWidth: 400 }}>
      <h2 style={{ marginBottom: 4 }}>useFetch</h2>
      <p style={{ color: "var(--fg-muted)", fontSize: 13, marginBottom: 16 }}>
        Switch endpoints to see loading states and error handling.
      </p>

      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {ENDPOINTS.map((e, i) => (
          <button
            key={i}
            onClick={() => setEndpointIdx(i)}
            style={{ fontSize: 12, fontWeight: endpointIdx === i ? 700 : 400 }}
          >
            {e.label}
          </button>
        ))}
      </div>

      <div style={{ fontSize: 11, fontFamily: "monospace", color: "var(--fg-muted)", marginBottom: 12, wordBreak: "break-all" }}>
        {url}
      </div>

      {loading && (
        <div style={{ color: "var(--fg-muted)", fontSize: 13 }}>Loading…</div>
      )}
      {error && (
        <div style={{ color: "#f87171", fontSize: 13, padding: "8px 12px", border: "1px solid #f8717140", borderRadius: 6 }}>
          Error: {error}
        </div>
      )}
      {data && !loading && (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {data.map((item) => (
            <li key={item.id} style={{ padding: "8px 0", borderBottom: "1px solid var(--line)", fontSize: 13 }}>
              <strong style={{ fontFamily: "monospace", fontSize: 11, color: "var(--fg-muted)" }}>#{item.id}</strong>
              {" "}{item.title || item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}`,
    },
  },
}
