import type { CustomHook } from "@/content/custom-hooks/types"

export const useHover: CustomHook = {
  id: "useHover",
  label: "useHover",
  description:
    "Detects whether the cursor is over a referenced element. Returns a ref and a boolean that updates on mouseenter/mouseleave.",
  category: "dom",
  code: `import { useState, useRef, useEffect } from "react"

export function useHover<T extends HTMLElement>() {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const enter = () => setHovered(true)
    const leave = () => setHovered(false)

    el.addEventListener("mouseenter", enter)
    el.addEventListener("mouseleave", leave)
    return () => {
      el.removeEventListener("mouseenter", enter)
      el.removeEventListener("mouseleave", leave)
    }
  }, [])

  return [ref, hovered] as const
}`,
  playground: {
    files: {
      "/App.js": `import { useState, useRef, useEffect } from "react"

function useHover() {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const enter = () => setHovered(true)
    const leave = () => setHovered(false)
    el.addEventListener("mouseenter", enter)
    el.addEventListener("mouseleave", leave)
    return () => {
      el.removeEventListener("mouseenter", enter)
      el.removeEventListener("mouseleave", leave)
    }
  }, [])

  return [ref, hovered]
}

function HoverCard({ title, description, color }) {
  const [ref, hovered] = useHover()
  return (
    <div
      ref={ref}
      style={{
        padding: "16px", borderRadius: 8, cursor: "default",
        border: \`1px solid \${hovered ? color : "var(--line)"}\`,
        background: hovered ? color + "10" : "var(--surface-1)",
        transition: "all 160ms",
      }}
    >
      <div style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 12, color: hovered ? "var(--fg)" : "var(--fg-muted)", transition: "color 160ms" }}>
        {hovered ? "Hovering! 🎯" : description}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif", maxWidth: 360 }}>
      <h2 style={{ marginBottom: 4 }}>useHover</h2>
      <p style={{ color: "var(--fg-muted)", fontSize: 13, marginBottom: 20 }}>
        Hover over each card — each one has its own hook instance.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <HoverCard title="useLocalStorage" description="Persists state to localStorage" color="#60a5fa" />
        <HoverCard title="useDebounce" description="Delays value updates" color="#34d399" />
        <HoverCard title="useToggle" description="Toggles a boolean state" color="#f59e0b" />
      </div>
    </div>
  )
}`,
    },
  },
}
