import { useRef, useEffect } from "react"

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined)

  useEffect(() => {
    ref.current = value
  })

  // eslint-disable-next-line react-hooks/refs -- intentional: reading ref during render is the mechanism that makes usePrevious work
  return ref.current
}
