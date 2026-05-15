import { renderHook, act } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { useCounter } from "../use-counter"

describe("useCounter", () => {
  it("initializes with 0 by default", () => {
    const { result } = renderHook(() => useCounter())
    expect(result.current.count).toBe(0)
  })

  it("initializes with the provided value", () => {
    const { result } = renderHook(() => useCounter(5))
    expect(result.current.count).toBe(5)
  })

  it("increment increases the count by 1", () => {
    const { result } = renderHook(() => useCounter(0))
    act(() => result.current.increment())
    expect(result.current.count).toBe(1)
  })

  it("decrement decreases the count by 1", () => {
    const { result } = renderHook(() => useCounter(5))
    act(() => result.current.decrement())
    expect(result.current.count).toBe(4)
  })

  it("reset returns the count to the initial value", () => {
    const { result } = renderHook(() => useCounter(3))
    act(() => result.current.increment())
    act(() => result.current.increment())
    act(() => result.current.reset())
    expect(result.current.count).toBe(3)
  })

  it("set updates the count to a specific value", () => {
    const { result } = renderHook(() => useCounter(0))
    act(() => result.current.set(42))
    expect(result.current.count).toBe(42)
  })

  it("increment does not exceed max", () => {
    const { result } = renderHook(() => useCounter(9, { max: 10 }))
    act(() => result.current.increment())
    expect(result.current.count).toBe(10)
    act(() => result.current.increment())
    expect(result.current.count).toBe(10)
  })

  it("decrement does not go below min", () => {
    const { result } = renderHook(() => useCounter(1, { min: 0 }))
    act(() => result.current.decrement())
    expect(result.current.count).toBe(0)
    act(() => result.current.decrement())
    expect(result.current.count).toBe(0)
  })

  it("set clamps to max when value exceeds it", () => {
    const { result } = renderHook(() => useCounter(0, { max: 10 }))
    act(() => result.current.set(99))
    expect(result.current.count).toBe(10)
  })

  it("set clamps to min when value is below it", () => {
    const { result } = renderHook(() => useCounter(5, { min: 0 }))
    act(() => result.current.set(-5))
    expect(result.current.count).toBe(0)
  })
})
