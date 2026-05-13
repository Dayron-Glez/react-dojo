import type { CustomHook } from "@/content/custom-hooks/types"

export const useOnlineStatus: CustomHook = {
  id: "useOnlineStatus",
  label: "useOnlineStatus",
  description:
    "Tracks whether the user is connected to the internet by listening to the browser's online and offline events.",
  category: "dom",
  code: `import { useSyncExternalStore } from "react"

function subscribe(callback: () => void) {
  window.addEventListener("online", callback)
  window.addEventListener("offline", callback)
  return () => {
    window.removeEventListener("online", callback)
    window.removeEventListener("offline", callback)
  }
}

export function useOnlineStatus(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true
  )
}`,
  playground: {
    files: {
      "/App.js": `import { useSyncExternalStore } from "react"

function subscribe(callback) {
  window.addEventListener("online", callback)
  window.addEventListener("offline", callback)
  return () => {
    window.removeEventListener("online", callback)
    window.removeEventListener("offline", callback)
  }
}

function useOnlineStatus() {
  return useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true
  )
}

export default function App() {
  const isOnline = useOnlineStatus()

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif", maxWidth: 360 }}>
      <h2 style={{ marginBottom: 4 }}>useOnlineStatus</h2>
      <p style={{ color: "var(--fg-muted)", fontSize: 13, marginBottom: 24 }}>
        Toggle your network connection to see the status change.
      </p>

      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "16px", borderRadius: 8,
        border: "1px solid var(--line-strong)",
        background: "var(--surface-1)"
      }}>
        <div style={{
          width: 12, height: 12, borderRadius: "50%",
          background: isOnline ? "#22c55e" : "#ef4444",
          boxShadow: isOnline ? "0 0 6px #22c55e" : "0 0 6px #ef4444"
        }} />
        <div>
          <p style={{ margin: 0, fontWeight: 600, fontSize: 15 }}>
            {isOnline ? "Online" : "Offline"}
          </p>
          <p style={{ margin: 0, fontSize: 12, color: "var(--fg-muted)" }}>
            {isOnline ? "You are connected to the internet." : "No internet connection detected."}
          </p>
        </div>
      </div>

      <p style={{ marginTop: 20, fontSize: 12, color: "var(--fg-muted)" }}>
        Uses the <code>online</code> and <code>offline</code> window events.
      </p>
    </div>
  )
}`,
    },
  },
}
