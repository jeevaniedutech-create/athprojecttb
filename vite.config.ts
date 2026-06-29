import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// Base path for GitHub Pages deployment under `/athprojecttb/`.
// Override with VITE_BASE=/ for Netlify, Cloudflare Pages, Firebase, etc.
const base = process.env.VITE_BASE ?? "/athprojecttb/";

export default defineConfig({
  base,
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
});
