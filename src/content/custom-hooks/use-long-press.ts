import type { CustomHook } from "./types"

export const useLongPress: CustomHook = {
  id: "useLongPress",
  label: "useLongPress",
  description:
    "Detecta pulsaciones largas sobre cualquier elemento. Dispara un callback tras mantener presionado el tiempo configurado y cancela si el usuario suelta antes.",
  category: "dom",
  code: `import { useCallback, useRef } from "react"

interface UseLongPressOptions {
  delay?: number
  onStart?: () => void
  onCancel?: () => void
}

export function useLongPress(
  callback: () => void,
  { delay = 500, onStart, onCancel }: UseLongPressOptions = {}
) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const callbackRef = useRef(callback)
  const onStartRef = useRef(onStart)
  const onCancelRef = useRef(onCancel)

  callbackRef.current = callback
  onStartRef.current = onStart
  onCancelRef.current = onCancel

  const start = useCallback(() => {
    onStartRef.current?.()
    timerRef.current = setTimeout(() => {
      callbackRef.current()
      timerRef.current = null
    }, delay)
  }, [delay])

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
      onCancelRef.current?.()
    }
  }, [])

  return {
    onMouseDown: start,
    onMouseUp: cancel,
    onMouseLeave: cancel,
    onTouchStart: start,
    onTouchEnd: cancel,
  }
}`,
  playground: {
    files: {
      "/App.js": `import { useCallback, useRef, useState } from "react"

function useLongPress(callback, { delay = 500, onStart, onCancel } = {}) {
  const timerRef = useRef(null)
  const callbackRef = useRef(callback)
  const onStartRef = useRef(onStart)
  const onCancelRef = useRef(onCancel)

  callbackRef.current = callback
  onStartRef.current = onStart
  onCancelRef.current = onCancel

  const start = useCallback(() => {
    onStartRef.current?.()
    timerRef.current = setTimeout(() => {
      callbackRef.current()
      timerRef.current = null
    }, delay)
  }, [delay])

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
      onCancelRef.current?.()
    }
  }, [])

  return {
    onMouseDown: start,
    onMouseUp: cancel,
    onMouseLeave: cancel,
    onTouchStart: start,
    onTouchEnd: cancel,
  }
}

const DELAY = 600

export default function App() {
  const [count, setCount] = useState(0)
  const [pressing, setPressing] = useState(false)
  const [progress, setProgress] = useState(0)
  const startTimeRef = useRef(null)
  const rafRef = useRef(null)

  const animate = useCallback(function tick() {
    const elapsed = Date.now() - startTimeRef.current
    const p = Math.min(elapsed / DELAY, 1)
    setProgress(p)
    if (p < 1) rafRef.current = requestAnimationFrame(tick)
  }, [])

  const handlers = useLongPress(
    () => {
      cancelAnimationFrame(rafRef.current)
      setCount((c) => c + 1)
      setPressing(false)
      setProgress(0)
    },
    {
      delay: DELAY,
      onStart: () => {
        startTimeRef.current = Date.now()
        setPressing(true)
        rafRef.current = requestAnimationFrame(animate)
      },
      onCancel: () => {
        cancelAnimationFrame(rafRef.current)
        setPressing(false)
        setProgress(0)
      },
    }
  )

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif", maxWidth: 380 }}>
      <h2 style={{ marginBottom: 4 }}>useLongPress</h2>
      <p style={{ color: "var(--fg-muted)", fontSize: 13, marginBottom: 24 }}>
        Mantén presionado el botón 600 ms para activar el long press.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <button
          {...handlers}
          style={{
            padding: "14px 24px",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            userSelect: "none",
            background: pressing ? "#6366f1" : "var(--surface-2)",
            color: pressing ? "white" : "var(--fg)",
            border: "1px solid var(--line-strong)",
            borderRadius: 8,
            transition: "background 150ms, color 150ms",
          }}
        >
          {pressing ? "Manteniendo…" : "Mantén presionado"}
        </button>

        <div style={{ height: 6, borderRadius: 4, background: "var(--surface-2)", overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: (progress * 100) + "%",
              background: "#6366f1",
              borderRadius: 4,
            }}
          />
        </div>

        <div style={{
          padding: "14px 16px", borderRadius: 8,
          border: "1px solid var(--line)", background: "var(--surface-1)",
          display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          <span style={{ fontSize: 13, color: "var(--fg-muted)" }}>Long presses activados</span>
          <span style={{ fontFamily: "monospace", fontSize: 22, fontWeight: 700 }}>{count}</span>
        </div>
      </div>
    </div>
  )
}`,
    },
  },
}
