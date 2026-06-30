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
  const message = "Free mental health support is available now — WhatsApp us anytime at +91 97444 88987";
  const item = (
    <span className="inline-flex items-center gap-3 mx-8">
      <span className="hidden sm:inline-block h-px w-5 bg-[var(--brand-teal)]" />
      <span className="font-medium tracking-wide">{message}</span>
      <a
        href="https://wa.me/919744488987"
        target="_blank"
        rel="noopener noreferrer"
        className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-xs hover:bg-white/20 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        WhatsApp
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
