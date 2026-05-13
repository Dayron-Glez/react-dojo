import type { CustomHook } from "@/content/custom-hooks/types"

export const useCounter: CustomHook = {
  id: "useCounter",
  label: "useCounter",
  description:
    "Manages a numeric counter with increment, decrement, reset, and set helpers. Supports optional min and max boundaries.",
  category: "state",
  code: `import { useState, useCallback } from "react"

interface UseCounterOptions {
  min?: number
  max?: number
}

interface UseCounterReturn {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
  set: (value: number) => void
}

export function useCounter(
  initialValue = 0,
  options: UseCounterOptions = {}
): UseCounterReturn {
  const { min, max } = options

  const clamp = useCallback(
    (value: number) => {
      if (min !== undefined && value < min) return min
      if (max !== undefined && value > max) return max
      return value
    },
    [min, max]
  )

  const [count, setCount] = useState(() => clamp(initialValue))

  const increment = useCallback(() => setCount((c) => clamp(c + 1)), [clamp])
  const decrement = useCallback(() => setCount((c) => clamp(c - 1)), [clamp])
  const reset = useCallback(() => setCount(clamp(initialValue)), [clamp, initialValue])
  const set = useCallback((value: number) => setCount(clamp(value)), [clamp])

  return { count, increment, decrement, reset, set }
}`,
  playground: {
    files: {
      "/App.js": `import { useState, useCallback } from "react"

function useCounter(initialValue = 0, options = {}) {
  const { min, max } = options

  const clamp = useCallback(
    (value) => {
      if (min !== undefined && value < min) return min
      if (max !== undefined && value > max) return max
      return value
    },
    [min, max]
  )

  const [count, setCount] = useState(() => clamp(initialValue))

  const increment = useCallback(() => setCount((c) => clamp(c + 1)), [clamp])
  const decrement = useCallback(() => setCount((c) => clamp(c - 1)), [clamp])
  const reset = useCallback(() => setCount(clamp(initialValue)), [clamp, initialValue])
  const set = useCallback((value) => setCount(clamp(value)), [clamp])

  return { count, increment, decrement, reset, set }
}

export default function App() {
  const basic = useCounter(0)
  const bounded = useCounter(5, { min: 0, max: 10 })
  const quantity = useCounter(1, { min: 1, max: 99 })

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif", maxWidth: 400 }}>
      <h2 style={{ marginBottom: 4 }}>useCounter</h2>
      <p style={{ color: "var(--fg-muted)", fontSize: 13, marginBottom: 20 }}>
        Three instances showing different configurations.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <p style={{ fontSize: 12, color: "var(--fg-muted)", marginBottom: 8 }}>
            Basic — no limits
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={basic.decrement}>−</button>
            <span style={{ fontSize: 20, fontWeight: 600, minWidth: 40, textAlign: "center" }}>
              {basic.count}
            </span>
            <button onClick={basic.increment}>+</button>
            <button onClick={basic.reset} style={{ marginLeft: 8, fontSize: 12 }}>Reset</button>
          </div>
        </div>

        <div>
          <p style={{ fontSize: 12, color: "var(--fg-muted)", marginBottom: 8 }}>
            Bounded — min: 0, max: 10
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={bounded.decrement} disabled={bounded.count <= 0}>−</button>
            <span style={{ fontSize: 20, fontWeight: 600, minWidth: 40, textAlign: "center" }}>
              {bounded.count}
            </span>
            <button onClick={bounded.increment} disabled={bounded.count >= 10}>+</button>
            <span style={{ fontSize: 11, color: "var(--fg-muted)", marginLeft: 8 }}>
              {bounded.count} / 10
            </span>
          </div>
        </div>

        <div>
          <p style={{ fontSize: 12, color: "var(--fg-muted)", marginBottom: 8 }}>
            Quantity picker — min: 1, max: 99
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={quantity.decrement} disabled={quantity.count <= 1}>−</button>
            <span style={{ fontSize: 20, fontWeight: 600, minWidth: 40, textAlign: "center" }}>
              {quantity.count}
            </span>
            <button onClick={quantity.increment} disabled={quantity.count >= 99}>+</button>
            <button
              onClick={() => quantity.set(99)}
              style={{ marginLeft: 8, fontSize: 12 }}
            >
              Max
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}`,
    },
  },
}
