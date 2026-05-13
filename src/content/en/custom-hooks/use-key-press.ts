import type { CustomHook } from "@/content/custom-hooks/types"

export const useKeyPress: CustomHook = {
  id: "useKeyPress",
  label: "useKeyPress",
  description:
    "Tracks whether a specific keyboard key is currently being held down by listening to global keydown and keyup events.",
  category: "dom",
  code: `import { useState, useEffect } from "react"

export function useKeyPress(targetKey: string): boolean {
  const [isPressed, setIsPressed] = useState(false)

  useEffect(() => {
    const handleDown = (event: KeyboardEvent) => {
      if (event.key === targetKey) setIsPressed(true)
    }
    const handleUp = (event: KeyboardEvent) => {
      if (event.key === targetKey) setIsPressed(false)
    }

    window.addEventListener("keydown", handleDown)
    window.addEventListener("keyup", handleUp)
    return () => {
      window.removeEventListener("keydown", handleDown)
      window.removeEventListener("keyup", handleUp)
    }
  }, [targetKey])

  return isPressed
}`,
  playground: {
    files: {
      "/App.js": `import { useState, useEffect } from "react"

function useKeyPress(targetKey) {
  const [isPressed, setIsPressed] = useState(false)

  useEffect(() => {
    const handleDown = (event) => {
      if (event.key === targetKey) setIsPressed(true)
    }
    const handleUp = (event) => {
      if (event.key === targetKey) setIsPressed(false)
    }

    window.addEventListener("keydown", handleDown)
    window.addEventListener("keyup", handleUp)
    return () => {
      window.removeEventListener("keydown", handleDown)
      window.removeEventListener("keyup", handleUp)
    }
  }, [targetKey])

  return isPressed
}

function KeyCap({ label, active }) {
  return (
    <div style={{
      padding: "8px 14px",
      minWidth: 64,
      borderRadius: 6,
      border: "1px solid var(--line-strong)",
      background: active ? "#6366f1" : "var(--surface-1)",
      color: active ? "white" : "var(--fg)",
      fontFamily: "monospace",
      fontSize: 13,
      textAlign: "center",
      boxShadow: active ? "0 0 0 3px rgba(99,102,241,.25)" : "0 1px 0 var(--line)",
      transform: active ? "translateY(1px)" : "translateY(0)",
      transition: "transform .08s ease, background .08s ease"
    }}>{label}</div>
  )
}

export default function App() {
  const isSpace = useKeyPress(" ")
  const isEnter = useKeyPress("Enter")
  const isShift = useKeyPress("Shift")
  const isUp = useKeyPress("ArrowUp")
  const isDown = useKeyPress("ArrowDown")
  const isLeft = useKeyPress("ArrowLeft")
  const isRight = useKeyPress("ArrowRight")

  const [pos, setPos] = useState({ x: 160, y: 50 })

  useEffect(() => {
    if (!isUp && !isDown && !isLeft && !isRight) return
    const id = setInterval(() => {
      setPos((p) => ({
        x: Math.max(0, Math.min(340, p.x + (isRight ? 5 : 0) - (isLeft ? 5 : 0))),
        y: Math.max(0, Math.min(110, p.y + (isDown ? 5 : 0) - (isUp ? 5 : 0))),
      }))
    }, 16)
    return () => clearInterval(id)
  }, [isUp, isDown, isLeft, isRight])

  useEffect(() => {
    const blockScroll = (event) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(event.key)) {
        event.preventDefault()
      }
    }
    window.addEventListener("keydown", blockScroll)
    return () => window.removeEventListener("keydown", blockScroll)
  }, [])

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif", maxWidth: 420 }}>
      <h2 style={{ marginBottom: 4 }}>useKeyPress</h2>
      <p style={{ color: "var(--fg-muted)", fontSize: 13, marginBottom: 20 }}>
        Click the preview and press the keys to see their live state.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        <KeyCap label="Space" active={isSpace} />
        <KeyCap label="Enter" active={isEnter} />
        <KeyCap label="Shift" active={isShift} />
      </div>

      <p style={{ fontSize: 12, color: "var(--fg-muted)", marginBottom: 8 }}>
        Move the block using the arrow keys ← ↑ → ↓
      </p>
      <div style={{
        position: "relative",
        height: 140,
        border: "1px solid var(--line)",
        borderRadius: 8,
        background: "var(--surface-1)",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          left: pos.x,
          top: pos.y,
          width: 28,
          height: 28,
          borderRadius: 6,
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          boxShadow: "0 4px 12px rgba(99,102,241,.4)"
        }} />
      </div>
    </div>
  )
}`,
    },
  },
}
