import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// Build for GitHub Pages under `/athprojecttb/` by default.
// Dev stays at `/` so direct routes like `/verify` never show a Vite 404.
export default defineConfig(({ command }) => ({
  base: command === "build" ? (process.env.VITE_BASE ?? "/athprojecttb/") : "/",
  plugins: [
    tsconfigPaths(),
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    react(),
    tailwindcss(),
  ],
  server: {
    host: "::",
    port: 8080,
    strictPort: true,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
}));
