import type { CustomHook } from "./types"

export const useIntersectionObserver: CustomHook = {
  id: "useIntersectionObserver",
  label: "useIntersectionObserver",
  description:
    "Observa si un elemento es visible en el viewport (o en un contenedor scrollable). Devuelve una ref, la entrada completa del observer y un booleano isIntersecting.",
  category: "dom",
  code: `import { useState, useEffect, useRef } from "react"

interface Options {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
}

export function useIntersectionObserver<T extends HTMLElement>(
  options: Options = {}
) {
  const { threshold = 0, root = null, rootMargin = "0px" } = options
  const ref = useRef<T>(null)
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([e]) => setEntry(e),
      { threshold, root, rootMargin }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, root, rootMargin])

  return { ref, entry, isIntersecting: entry?.isIntersecting ?? false }
}`,
  playground: {
    files: {
      "/App.js": `import { useState, useEffect, useRef } from "react"

function useIntersectionObserver(options = {}) {
  const { threshold = 0, root = null, rootMargin = "0px" } = options
  const ref = useRef(null)
  const [entry, setEntry] = useState(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([e]) => setEntry(e),
      { threshold, root, rootMargin }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, root, rootMargin])

  return { ref, entry, isIntersecting: entry?.isIntersecting ?? false }
}

function Elemento({ index, root }) {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.6, root })

  return (
    <div
      ref={ref}
      style={{
        padding: "14px 16px",
        marginBottom: 10,
        borderRadius: 8,
        border: \`1px solid \${isIntersecting ? "#34d399" : "var(--line)"}\`,
        background: isIntersecting ? "#34d39912" : "var(--surface-1)",
        display: "flex",
        alignItems: "center",
        gap: 12,
        transform: isIntersecting ? "translateX(0)" : "translateX(-12px)",
        opacity: isIntersecting ? 1 : 0.35,
        transition: "all 280ms ease",
      }}
    >
      <div style={{
        width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 13, fontWeight: 700,
        background: isIntersecting ? "#34d399" : "var(--surface-2)",
        color: isIntersecting ? "#fff" : "var(--fg-muted)",
        transition: "background 280ms",
      }}>
        {index + 1}
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600 }}>Elemento {index + 1}</div>
        <div style={{ fontSize: 11, color: "var(--fg-muted)" }}>
          {isIntersecting ? "✓ Visible en el viewport" : "Fuera del viewport"}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [scrollEl, setScrollEl] = useState(null)

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: 380 }}>
      <h2 style={{ marginBottom: 4 }}>useIntersectionObserver</h2>
      <p style={{ color: "var(--fg-muted)", fontSize: 13, marginBottom: 14 }}>
        Haz scroll dentro del contenedor para ver los elementos activarse.
      </p>
      <div
        ref={setScrollEl}
        style={{
          height: 280,
          overflowY: "auto",
          border: "1px solid var(--line)",
          borderRadius: 8,
          padding: "10px 10px 10px",
        }}
      >
        {scrollEl && Array.from({ length: 8 }, (_, i) => (
          <Elemento key={i} index={i} root={scrollEl} />
        ))}
      </div>
    </div>
  )
}`,
    },
  },
}
