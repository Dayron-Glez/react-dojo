import type { CustomHook } from "@/content/custom-hooks/types"

export const useClipboard: CustomHook = {
  id: "useClipboard",
  label: "useClipboard",
  description:
    "Copies text to the clipboard and provides a transient 'copied' state that resets automatically after a configurable delay.",
  category: "utility",
  code: `import { useState, useCallback } from "react"

interface UseClipboardReturn {
  copied: boolean
  copy: (text: string) => Promise<void>
}

export function useClipboard(resetInterval = 2000): UseClipboardReturn {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), resetInterval)
      } catch {
        setCopied(false)
      }
    },
    [resetInterval]
  )

  return { copied, copy }
}`,
  playground: {
    files: {
      "/App.js": `import { useState, useCallback } from "react"

function useClipboard(resetInterval = 2000) {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), resetInterval)
    } catch {
      setCopied(false)
    }
  }, [resetInterval])

  return { copied, copy }
}

const SNIPPETS = [
  { label: "Install", code: "npm install react" },
  { label: "Import hook", code: 'import { useClipboard } from "./useClipboard"' },
  { label: "Git clone", code: "git clone https://github.com/drbarzaga/react-dojo" },
]

export default function App() {
  const { copied, copy } = useClipboard(1500)
  const [lastCopied, setLastCopied] = useState(null)

  const handleCopy = (text, label) => {
    copy(text)
    setLastCopied(label)
  }

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif", maxWidth: 400 }}>
      <h2 style={{ marginBottom: 4 }}>useClipboard</h2>
      <p style={{ color: "var(--fg-muted)", fontSize: 13, marginBottom: 20 }}>
        Click "Copy" to copy text to the clipboard.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {SNIPPETS.map(({ label, code }) => (
          <div
            key={label}
            style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              gap: 12, padding: "10px 12px", borderRadius: 6,
              border: "1px solid var(--line)", background: "var(--surface-1)"
            }}
          >
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 11, color: "var(--fg-muted)", marginBottom: 2 }}>{label}</div>
              <code style={{ fontSize: 12, wordBreak: "break-all" }}>{code}</code>
            </div>
            <button
              onClick={() => handleCopy(code, label)}
              style={{ flexShrink: 0, fontSize: 12 }}
            >
              {copied && lastCopied === label ? "✓ Copied" : "Copy"}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}`,
    },
  },
}
