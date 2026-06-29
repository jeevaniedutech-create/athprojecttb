import { QueryClient } from "@tanstack/react-query";
import { createRouter, createHashHistory } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// Use base path matching Vite's base (default GitHub Pages repo path).
const basepath = (import.meta.env.BASE_URL || "/").replace(/\/$/, "") || "/";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    basepath: basepath === "/" ? undefined : basepath,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};

// Re-export for potential hash-history fallback usage.
export { createHashHistory };
