import { renderHook, act } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { useToggle } from "../use-toggle"

describe("useToggle", () => {
  it("initializes with false by default", () => {
    const { result } = renderHook(() => useToggle())
    expect(result.current.value).toBe(false)
  })

  it("initializes with the provided value", () => {
    const { result } = renderHook(() => useToggle(true))
    expect(result.current.value).toBe(true)
  })

  it("toggle flips the value from false to true", () => {
    const { result } = renderHook(() => useToggle(false))
    act(() => result.current.toggle())
    expect(result.current.value).toBe(true)
  })

  it("toggle flips the value back to false", () => {
    const { result } = renderHook(() => useToggle(true))
    act(() => result.current.toggle())
    expect(result.current.value).toBe(false)
  })

  it("setTrue sets value to true regardless of current state", () => {
    const { result } = renderHook(() => useToggle(false))
    act(() => result.current.setTrue())
    expect(result.current.value).toBe(true)
    act(() => result.current.setTrue())
    expect(result.current.value).toBe(true)
  })

  it("setFalse sets value to false regardless of current state", () => {
    const { result } = renderHook(() => useToggle(true))
    act(() => result.current.setFalse())
    expect(result.current.value).toBe(false)
    act(() => result.current.setFalse())
    expect(result.current.value).toBe(false)
  })
})
