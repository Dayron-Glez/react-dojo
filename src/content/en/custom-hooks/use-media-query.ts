import type { CustomHook } from "@/content/custom-hooks/types"

export const useMediaQuery: CustomHook = {
  id: "useMediaQuery",
  label: "useMediaQuery",
  description:
    "Subscribes to a CSS media query and returns whether it currently matches. Updates reactively when the viewport changes.",
  category: "dom",
  code: `import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [query])

  return matches
}`,
  playground: {
    files: {
      "/App.js": `import { useState, useEffect } from "react"

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)
    const listener = (e) => setMatches(e.matches)
    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [query])

  return matches
}

export default function App() {
  const isWide = useMediaQuery("(min-width: 500px)")
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)")
  const prefersReduced = useMediaQuery("(prefers-reduced-motion: reduce)")

  const row = (label, value) => (
    <tr key={label}>
      <td style={{ padding: "6px 0", color: "var(--fg-muted)", fontSize: 13 }}>{label}</td>
      <td style={{ textAlign: "right", fontFamily: "monospace", fontSize: 13 }}>
        <span style={{ color: value ? "#34d399" : "#f87171" }}>{value ? "true" : "false"}</span>
      </td>
    </tr>
  )

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif", maxWidth: 400 }}>
      <h2 style={{ marginBottom: 4 }}>useMediaQuery</h2>
      <p style={{ color: "var(--fg-muted)", fontSize: 13, marginBottom: 20 }}>
        Resize the preview panel to see <code>isWide</code> change reactively.
      </p>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          {row("(min-width: 500px)", isWide)}
          {row("(prefers-color-scheme: dark)", prefersDark)}
          {row("(prefers-reduced-motion: reduce)", prefersReduced)}
        </tbody>
      </table>
    </div>
  )
}`,
    },
  },
}
