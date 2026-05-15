import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test-setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      include: [
        "src/content/custom-hooks/**/*.ts",
        "src/hooks/**/*.{ts,tsx}",
        "src/components/**/*.tsx",
        "src/lib/**/*.ts",
      ],
      exclude: [
        "src/content/custom-hooks/index.ts",
        "src/content/en/custom-hooks/index.ts",
        "src/**/__tests__/**",
        "src/test-utils.tsx",
        "src/test-setup.ts",
      ],
    },
  },
})
