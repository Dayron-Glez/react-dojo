import type { CustomHook } from "@/content/custom-hooks/types"

export const usePreviousContent: CustomHook = {
  id: "usePrevious",
  label: "usePrevious",
  description:
    "Returns the value from the previous render. Useful for comparing old and new state or detecting direction of change.",
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
  const [count, setCount] = useState(0)
  const prevCount = usePrevious(count)
  const direction = prevCount === undefined
    ? "—"
    : count > prevCount
    ? "↑ went up"
    : count < prevCount
    ? "↓ went down"
    : "= same"

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif", maxWidth: 340 }}>
      <h2 style={{ marginBottom: 4 }}>usePrevious</h2>
      <p style={{ color: "var(--fg-muted)", fontSize: 13, marginBottom: 24 }}>
        Access the value from the previous render to compare changes.
      </p>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 20 }}>
        <button onClick={() => setCount((c) => c - 1)}>−</button>
        <span style={{ fontFamily: "monospace", fontSize: 28, minWidth: 40, textAlign: "center" }}>{count}</span>
        <button onClick={() => setCount((c) => c + 1)}>+</button>
      </div>
      <table style={{ fontSize: 13, borderCollapse: "collapse", width: "100%" }}>
        <tbody>
          <tr>
            <td style={{ padding: "4px 0", color: "var(--fg-muted)" }}>Current value</td>
            <td style={{ fontFamily: "monospace", textAlign: "right" }}>{count}</td>
          </tr>
          <tr>
            <td style={{ padding: "4px 0", color: "var(--fg-muted)" }}>Previous value</td>
            <td style={{ fontFamily: "monospace", textAlign: "right" }}>{prevCount ?? "—"}</td>
          </tr>
          <tr>
            <td style={{ padding: "4px 0", color: "var(--fg-muted)" }}>Direction</td>
            <td style={{ textAlign: "right" }}>{direction}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}`,
    },
  },
}
