import { renderHook } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { usePrevious } from "../use-previous.fn"

describe("usePrevious", () => {
  it("returns undefined on the first render", () => {
    const { result } = renderHook(() => usePrevious(0))
    expect(result.current).toBeUndefined()
  })

  it("returns the previous value after a change", () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 1 },
    })
    rerender({ value: 2 })
    expect(result.current).toBe(1)
  })

  it("tracks correctly across multiple changes", () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 10 },
    })
    rerender({ value: 20 })
    expect(result.current).toBe(10)
    rerender({ value: 30 })
    expect(result.current).toBe(20)
  })

  it("works with string values", () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: "hello" },
    })
    rerender({ value: "world" })
    expect(result.current).toBe("hello")
  })

  it("works with object references", () => {
    const first = { id: 1 }
    const second = { id: 2 }
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: first },
    })
    rerender({ value: second })
    expect(result.current).toBe(first)
  })
})
