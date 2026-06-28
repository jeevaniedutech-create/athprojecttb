import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/athijeevana-logo.png.asset.json";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[rgba(250,246,239,0.78)] border-b border-[color:rgba(14,42,56,0.08)]">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoAsset.url} alt="Athijeevana" className="h-11 w-auto" />
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-display text-xl tracking-tight text-[var(--brand-ink)]">
              Athijeevana
            </span>
            <span className="eyebrow mt-1 text-[0.6rem]">Strength for the Mind · Resilience for Life</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2 text-sm">
          <Link
            to="/"
            className="px-3 py-2 rounded-full text-[var(--brand-ink-soft)] hover:text-[var(--brand-ink)] transition"
            activeOptions={{ exact: true }}
            activeProps={{ className: "px-3 py-2 rounded-full text-[var(--brand-ink)] font-medium" }}
          >
            Home
          </Link>
          <a
            href="/#programmes"
            className="hidden sm:inline-block px-3 py-2 rounded-full text-[var(--brand-ink-soft)] hover:text-[var(--brand-ink)] transition"
          >
            Programmes
          </a>
          <a
            href="/#works"
            className="hidden sm:inline-block px-3 py-2 rounded-full text-[var(--brand-ink-soft)] hover:text-[var(--brand-ink)] transition"
          >
            Works
          </a>
          <Link
            to="/verify"
            className="ml-2 px-4 py-2 rounded-full bg-[var(--brand-ink)] text-white hover:bg-[var(--brand-teal-deep)] transition text-xs font-medium tracking-wide"
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
    <footer className="mt-24 border-t border-[color:rgba(14,42,56,0.1)] bg-[var(--brand-paper)]">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src={logoAsset.url} alt="Athijeevana" className="h-14 w-auto" />
          <p className="mt-5 text-sm leading-relaxed text-[var(--brand-ink-soft)] max-w-sm">
            A community mental health initiative by Jeevani Institute of Mind Care —
            ensuring quality mental health care reaches everyone, regardless of background.
          </p>
          <div className="mt-6 text-sm text-[var(--brand-ink-soft)] space-y-1">
            <p className="font-medium text-[var(--brand-ink)]">Jeevani Institute of Mind Care</p>
            <p>Westfort, Thrissur, Kerala, India</p>
            <p>Mobile: <a href="tel:+919744488987" className="hover:text-[var(--brand-ink)]">+91 97444 88987</a></p>
            <p>Office: <a href="tel:+914872386088" className="hover:text-[var(--brand-ink)]">0487 238 6088</a></p>
          </div>
        </div>
        <div>
          <p className="eyebrow">Explore</p>
          <ul className="mt-4 space-y-2 text-sm text-[var(--brand-ink-soft)]">
            <li><a href="/#about" className="hover:text-[var(--brand-ink)]">About</a></li>
            <li><a href="/#programmes" className="hover:text-[var(--brand-ink)]">Programmes</a></li>
            <li><a href="/#works" className="hover:text-[var(--brand-ink)]">Works</a></li>
            <li><a href="/#contact" className="hover:text-[var(--brand-ink)]">Contact</a></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Members</p>
          <ul className="mt-4 space-y-2 text-sm text-[var(--brand-ink-soft)]">
            <li><Link to="/verify" className="hover:text-[var(--brand-ink)]">Verify Membership</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[color:rgba(14,42,56,0.08)]">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--brand-ink-soft)]">
          <p>© {new Date().getFullYear()} Athijeevana. All rights reserved.</p>
          <p className="tracking-[0.2em] uppercase">Heal · Rise · Live</p>
        </div>
      </div>
    </footer>
  );
}
