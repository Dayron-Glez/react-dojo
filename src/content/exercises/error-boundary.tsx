import type { Exercise } from "./types"

export const errorBoundary: Exercise = {
  id: "error-boundary",
  label: "error boundary",
  title: "Construye un Error Boundary",
  lede: "Tienes una app con un componente que puede fallar al renderizar. Actualmente, cualquier error derrumba toda la UI. Implementa un Error Boundary como clase de React que capture el error, muestre una UI de fallback con el mensaje de error y un botón para reintentar.",
  difficulty: "advanced",
  objectives: [
    "Crea una clase ErrorBoundary que extiende Component",
    "Implementa static getDerivedStateFromError para actualizar el estado con el error",
    "Implementa componentDidCatch para loguear el error en consola",
    "Renderiza un fallback con el mensaje de error cuando hasError es true",
    "Añade un botón 'Reintentar' que resetee el estado del boundary",
    "Envuelve <UserProfile> con <ErrorBoundary> en App",
  ],
  hint: "getDerivedStateFromError es un método estático que devuelve el nuevo estado. componentDidCatch es donde haces side effects como logs. El botón de reintentar debe llamar a this.setState({ hasError: false, error: null }).",
  relatedConcepts: ["error-boundary"],
  starter: {
    "/App.js": `import { Component, useState } from "react";

// TODO: implementa la clase ErrorBoundary
// - extiende Component
// - estado inicial: { hasError: false, error: null }
// - static getDerivedStateFromError(error): devuelve { hasError: true, error }
// - componentDidCatch(error, info): console.error con el error y info.componentStack
// - render(): si hasError, muestra el fallback con el mensaje y un botón reintentar
//             si no, renderiza this.props.children

function UserProfile({ userId }) {
  if (userId === 42) throw new Error(\`Usuario \${userId} no encontrado\`);
  return (
    <div style={{ padding: 16, border: "1px solid var(--line-strong)", borderRadius: 8 }}>
      <strong>Usuario #{userId}</strong>
      <p style={{ margin: "8px 0 0", color: "var(--fg-muted)", fontSize: 14 }}>
        Perfil cargado correctamente ✓
      </p>
    </div>
  );
}

export default function App() {
  const [userId, setUserId] = useState(1);
  return (
    <div style={{ fontFamily: "system-ui", padding: 24, maxWidth: 400 }}>
      <h2 style={{ color: "var(--fg)" }}>Perfil de usuario</h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={() => setUserId(1)}>Usuario 1 ✓</button>
        <button onClick={() => setUserId(42)}>Usuario 42 💥</button>
      </div>
      {/* TODO: envuelve UserProfile con ErrorBoundary */}
      <UserProfile userId={userId} />
    </div>
  );
}
`,
  },
  solution: {
    "/App.js": `import { Component, useState } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("Error capturado:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 16, background: "#fee2e2", borderRadius: 8, color: "#991b1b" }}>
          <strong>Algo salió mal 😕</strong>
          <p style={{ fontSize: 13, marginTop: 8 }}>{this.state.error?.message}</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{ marginTop: 8, padding: "4px 12px", cursor: "pointer" }}
          >
            Reintentar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function UserProfile({ userId }) {
  if (userId === 42) throw new Error(\`Usuario \${userId} no encontrado\`);
  return (
    <div style={{ padding: 16, border: "1px solid var(--line-strong)", borderRadius: 8 }}>
      <strong>Usuario #{userId}</strong>
      <p style={{ margin: "8px 0 0", color: "var(--fg-muted)", fontSize: 14 }}>
        Perfil cargado correctamente ✓
      </p>
    </div>
  );
}

export default function App() {
  const [userId, setUserId] = useState(1);
  return (
    <div style={{ fontFamily: "system-ui", padding: 24, maxWidth: 400 }}>
      <h2 style={{ color: "var(--fg)" }}>Perfil de usuario</h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={() => setUserId(1)}>Usuario 1 ✓</button>
        <button onClick={() => setUserId(42)}>Usuario 42 💥</button>
      </div>
      <ErrorBoundary key={userId}>
        <UserProfile userId={userId} />
      </ErrorBoundary>
    </div>
  );
}
`,
  },
}
