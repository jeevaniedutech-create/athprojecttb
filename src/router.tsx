import { QueryClient } from "@tanstack/react-query";
import { createRouter, createHashHistory } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// Support both root-hosted previews and GitHub Pages under `/athprojecttb/`.
const configuredBasepath =
  (import.meta.env.BASE_URL || "/").replace(/\/$/, "") || "/";
const runtimeBasepath =
  typeof window !== "undefined" && window.location.pathname.startsWith("/athprojecttb")
    ? "/athprojecttb"
    : configuredBasepath;

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    basepath: runtimeBasepath === "/" ? undefined : runtimeBasepath,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};

// Re-export for potential hash-history fallback usage.
export { createHashHistory };
