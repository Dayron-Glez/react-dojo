import type { CustomHook } from "./types"

export const useClipboard: CustomHook = {
  id: "useClipboard",
  label: "useClipboard",
  description:
    "Copia texto al portapapeles y provee un estado transitorio 'copiado' que se resetea automáticamente tras un intervalo configurable.",
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

const FRAGMENTOS = [
  { etiqueta: "Instalar", codigo: "npm install react" },
  { etiqueta: "Importar hook", codigo: 'import { useClipboard } from "./useClipboard"' },
  { etiqueta: "Git clone", codigo: "git clone https://github.com/drbarzaga/react-dojo" },
]

export default function App() {
  const { copied, copy } = useClipboard(1500)
  const [ultimoCopiado, setUltimoCopiado] = useState(null)

  const handleCopiar = (texto, etiqueta) => {
    copy(texto)
    setUltimoCopiado(etiqueta)
  }

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif", maxWidth: 400 }}>
      <h2 style={{ marginBottom: 4 }}>useClipboard</h2>
      <p style={{ color: "var(--fg-muted)", fontSize: 13, marginBottom: 20 }}>
        Haz clic en "Copiar" para copiar el texto al portapapeles.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {FRAGMENTOS.map(({ etiqueta, codigo }) => (
          <div
            key={etiqueta}
            style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              gap: 12, padding: "10px 12px", borderRadius: 6,
              border: "1px solid var(--line)", background: "var(--surface-1)"
            }}
          >
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 11, color: "var(--fg-muted)", marginBottom: 2 }}>{etiqueta}</div>
              <code style={{ fontSize: 12, wordBreak: "break-all" }}>{codigo}</code>
            </div>
            <button
              onClick={() => handleCopiar(codigo, etiqueta)}
              style={{ flexShrink: 0, fontSize: 12 }}
            >
              {copied && ultimoCopiado === etiqueta ? "✓ Copiado" : "Copiar"}
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
