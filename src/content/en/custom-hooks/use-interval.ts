import type { CustomHook } from "@/content/custom-hooks/types"

export const useInterval: CustomHook = {
  id: "useInterval",
  label: "useInterval",
  description:
    "Declarative wrapper around setInterval that always syncs the latest callback without manual cleanup.",
  category: "utility",
  code: `import { useEffect, useRef } from "react"

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (delay === null) return
    const id = setInterval(() => savedCallback.current(), delay)
    return () => clearInterval(id)
  }, [delay])
}`,
  playground: {
    files: {
      "/App.js": `import { useState, useRef, useEffect } from "react"

function useInterval(callback, delay) {
  const savedCallback = useRef(callback)

  useEffect(() => { savedCallback.current = callback }, [callback])

  useEffect(() => {
    if (delay === null) return
    const id = setInterval(() => savedCallback.current(), delay)
    return () => clearInterval(id)
  }, [delay])
}

function formatTime(ms) {
  const s = Math.floor(ms / 1000)
  const centis = Math.floor((ms % 1000) / 10)
  const m = Math.floor(s / 60)
  return \`\${String(m).padStart(2, "0")}:\${String(s % 60).padStart(2, "0")}.\${String(centis).padStart(2, "0")}\`
}

export default function App() {
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const [laps, setLaps] = useState([])

  useInterval(() => setElapsed((e) => e + 10), running ? 10 : null)

  const reset = () => { setElapsed(0); setRunning(false); setLaps([]) }
  const lap = () => setLaps((l) => [elapsed, ...l])

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif", maxWidth: 320 }}>
      <h2 style={{ marginBottom: 4 }}>useInterval</h2>
      <p style={{ color: "var(--fg-muted)", fontSize: 13, marginBottom: 20 }}>
        Delay is <code>null</code> when paused — the interval unmounts automatically.
      </p>

      <div style={{ textAlign: "center", fontFamily: "monospace", fontSize: 36, letterSpacing: 2, marginBottom: 20 }}>
        {formatTime(elapsed)}
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 16 }}>
        <button onClick={() => setRunning((r) => !r)} style={{ minWidth: 80 }}>
          {running ? "Pause" : "Start"}
        </button>
        <button onClick={lap} disabled={!running}>Lap</button>
        <button onClick={reset}>Reset</button>
      </div>

      {laps.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {laps.map((t, i) => (
            <li key={i} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 13, borderBottom: "1px solid var(--line)" }}>
              <span style={{ color: "var(--fg-muted)" }}>Lap {laps.length - i}</span>
              <span style={{ fontFamily: "monospace" }}>{formatTime(t)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}`,
    },
  },
}
