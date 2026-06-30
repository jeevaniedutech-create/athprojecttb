import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/athijeevana-logo";

const appBase =
  typeof window !== "undefined" && window.location.pathname.startsWith("/athprojecttb")
    ? "/athprojecttb/"
    : import.meta.env.BASE_URL;
const homeHref = appBase || "/";
const sectionHref = (hash: string) => `${homeHref.replace(/\/$/, "/")}${hash}`;

export function SiteHeader() {
  return (
    <>
      <TopBanner />
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
            href={sectionHref("#programmes")}
            className="hidden sm:inline-block px-3 py-2 rounded-full text-[var(--brand-ink-soft)] hover:text-[var(--brand-ink)] transition"
          >
            Programmes
          </a>
          <a
            href={sectionHref("#works")}
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
    </>
  );
}

function TopBanner() {
  const message = "Free mental health support is available now — reach us anytime at +91 97444 88987";
  const item = (
    <span className="inline-flex items-center gap-3 mx-8">
      <span className="hidden sm:inline-block h-px w-5 bg-[var(--brand-teal)]" />
      <span className="font-medium tracking-wide">{message}</span>
      <a
        href="tel:+919744488987"
        className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-xs hover:bg-white/20 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        Call now
      </a>
      <span className="hidden sm:inline-block h-px w-5 bg-[var(--brand-teal)]" />
    </span>
  );

  return (
    <div className="bg-[var(--brand-teal-deep)] text-white text-[11px] sm:text-xs py-2.5 overflow-hidden border-b border-[rgba(255,255,255,0.08)]">
      <div className="marquee-track">
        {item}
        {item}
        {item}
        {item}
      </div>
    </div>
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
            <li><a href={sectionHref("#about")} className="hover:text-[var(--brand-ink)]">About</a></li>
            <li><a href={sectionHref("#programmes")} className="hover:text-[var(--brand-ink)]">Programmes</a></li>
            <li><a href={sectionHref("#works")} className="hover:text-[var(--brand-ink)]">Works</a></li>
            <li><a href={sectionHref("#contact")} className="hover:text-[var(--brand-ink)]">Contact</a></li>
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
          <p className="tracking-[0.2em] uppercase">Strength for the Mind · Resilience for Life</p>
        </div>
      </div>
    </footer>
  );
}
