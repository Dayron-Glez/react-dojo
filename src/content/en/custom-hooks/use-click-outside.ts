import type { CustomHook } from "@/content/custom-hooks/types"

export const useClickOutside: CustomHook = {
  id: "useClickOutside",
  label: "useClickOutside",
  description:
    "Calls a callback when the user clicks outside a referenced element. Great for closing dropdowns, modals, and popovers.",
  category: "dom",
  code: `import { useEffect, useRef } from "react"

export function useClickOutside<T extends HTMLElement>(
  callback: () => void
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [callback])

  return ref
}`,
  playground: {
    files: {
      "/App.js": `import { useState, useEffect, useRef, useCallback } from "react"

function useClickOutside(callback) {
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [callback])

  return ref
}

export default function App() {
  const [open, setOpen] = useState(false)
  const [closeCount, setCloseCount] = useState(0)

  const handleClose = useCallback(() => {
    if (open) {
      setOpen(false)
      setCloseCount((c) => c + 1)
    }
  }, [open])

  const ref = useClickOutside(handleClose)

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif" }}>
      <h2 style={{ marginBottom: 4 }}>useClickOutside</h2>
      <p style={{ color: "var(--fg-muted)", fontSize: 13, marginBottom: 20 }}>
        Click the button to open the panel, then click outside to close it.
      </p>

      <button onClick={() => setOpen(true)} disabled={open}>
        Open panel
      </button>

      {open && (
        <div
          ref={ref}
          style={{
            marginTop: 12, padding: "16px", borderRadius: 8,
            border: "1px solid var(--line-strong)", background: "var(--surface-1)",
            maxWidth: 260
          }}
        >
          <strong style={{ fontSize: 14 }}>Panel is open</strong>
          <p style={{ fontSize: 13, color: "var(--fg-muted)", margin: "8px 0 0" }}>
            Click outside this panel to close it.
          </p>
        </div>
      )}

      <p style={{ marginTop: 16, fontSize: 12, color: "var(--fg-muted)" }}>
        Times closed by outside click: <strong>{closeCount}</strong>
      </p>
    </div>
  )
}`,
    },
  },
}
