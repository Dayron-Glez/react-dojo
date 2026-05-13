import type { CustomHook } from "@/content/custom-hooks/types"

export const useEventListener: CustomHook = {
  id: "useEventListener",
  label: "useEventListener",
  description:
    "Attaches event listeners declaratively, always keeps the latest callback, and cleans up automatically on unmount.",
  category: "dom",
  code: `import { useEffect, useRef } from "react"

export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element: EventTarget = window
) {
  const savedHandler = useRef(handler)

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    if (!element?.addEventListener) return
    const listener = (event: Event) =>
      savedHandler.current(event as WindowEventMap[K])
    element.addEventListener(eventName, listener)
    return () => element.removeEventListener(eventName, listener)
  }, [eventName, element])
}`,
  playground: {
    files: {
      "/App.js": `import { useState, useRef, useEffect } from "react"

function useEventListener(eventName, handler, element = window) {
  const savedHandler = useRef(handler)
  useEffect(() => { savedHandler.current = handler }, [handler])
  useEffect(() => {
    if (!element?.addEventListener) return
    const listener = (e) => savedHandler.current(e)
    element.addEventListener(eventName, listener)
    return () => element.removeEventListener(eventName, listener)
  }, [eventName, element])
}

export default function App() {
  const [lastKey, setLastKey] = useState(null)
  const [history, setHistory] = useState([])
  const [clicks, setClicks] = useState(0)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEventListener("keydown", (e) => {
    if (["Shift", "Control", "Alt", "Meta"].includes(e.key)) return
    const key = e.key === " " ? "Space" : e.key
    setLastKey(key)
    setHistory((h) => [key, ...h].slice(0, 8))
  })

  useEventListener("click", () => setClicks((c) => c + 1))

  useEventListener("mousemove", (e) => setPos({ x: e.clientX, y: e.clientY }))

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif", maxWidth: 380 }}>
      <h2 style={{ marginBottom: 4 }}>useEventListener</h2>
      <p style={{ color: "var(--fg-muted)", fontSize: 13, marginBottom: 20 }}>
        Click, move the cursor, and press keys to see events firing.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
        <div style={{ padding: "12px", border: "1px solid var(--line)", borderRadius: 6 }}>
          <div style={{ fontSize: 11, color: "var(--fg-muted)", marginBottom: 6 }}>keydown</div>
          <div style={{ fontFamily: "monospace", fontSize: 22, minHeight: 30 }}>
            {lastKey ?? "—"}
          </div>
        </div>
        <div style={{ padding: "12px", border: "1px solid var(--line)", borderRadius: 6 }}>
          <div style={{ fontSize: 11, color: "var(--fg-muted)", marginBottom: 6 }}>click</div>
          <div style={{ fontFamily: "monospace", fontSize: 22 }}>{clicks}</div>
        </div>
      </div>

      <div style={{ padding: "12px", border: "1px solid var(--line)", borderRadius: 6, marginBottom: 12 }}>
        <div style={{ fontSize: 11, color: "var(--fg-muted)", marginBottom: 4 }}>mousemove</div>
        <div style={{ fontFamily: "monospace", fontSize: 13 }}>x: {pos.x} · y: {pos.y}</div>
      </div>

      {history.length > 0 && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {history.map((k, i) => (
            <span key={i} style={{
              fontFamily: "monospace", fontSize: 11,
              padding: "2px 8px", borderRadius: 4,
              background: "var(--surface-2)", color: "var(--fg-muted)",
              opacity: 1 - i * 0.1
            }}>{k}</span>
          ))}
        </div>
      )}
    </div>
  )
}`,
    },
  },
}
