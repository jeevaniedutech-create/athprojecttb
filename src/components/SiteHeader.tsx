import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/athijeevana-logo.png.asset.json";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[rgba(251,246,238,0.85)] border-b border-[var(--brand-cream)]">
      <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoAsset.url} alt="Athijeevana" className="h-12 w-auto" />
        </Link>
        <nav className="flex items-center gap-2 sm:gap-6 text-sm font-medium">
          <Link
            to="/"
            className="px-3 py-2 rounded-full hover:bg-white/70 transition"
            activeOptions={{ exact: true }}
            activeProps={{ className: "px-3 py-2 rounded-full bg-white shadow-card" }}
          >
            Home
          </Link>
          <Link
            to="/verify"
            className="px-4 py-2 rounded-full bg-gradient-brand text-white shadow-luxe hover:opacity-95 transition"
          >
            Verify Membership
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[var(--border)] bg-white/60">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={logoAsset.url} alt="Athijeevana" className="h-10 w-auto" />
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Athijeevana — Heal · Rise · Live
        </p>
      </div>
    </footer>
  );
}
