import { useState, useCallback } from "react"

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

export function useCounter(initialValue = 0, options: UseCounterOptions = {}): UseCounterReturn {
  const { min, max } = options

  const clamp = useCallback(
    (value: number) => {
      if (min !== undefined && value < min) return min
      if (max !== undefined && value > max) return max
      return value
    },
    [min, max]
  )

  const [count, setCount] = useState<number>(() => clamp(initialValue))

  const increment = useCallback(() => setCount((c) => clamp(c + 1)), [clamp])
  const decrement = useCallback(() => setCount((c) => clamp(c - 1)), [clamp])
  const reset = useCallback(() => setCount(clamp(initialValue)), [clamp, initialValue])
  const set = useCallback((value: number) => setCount(clamp(value)), [clamp])

  return { count, increment, decrement, reset, set }
}
