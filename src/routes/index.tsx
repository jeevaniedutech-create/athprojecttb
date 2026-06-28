import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase, type ImageRow, normalizeImageUrl } from "@/lib/supabase";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import logoAsset from "@/assets/athijeevana-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Athijeevana — Heal · Rise · Live" },
      {
        name: "description",
        content:
          "Athijeevana is a community mental health and free counselling programme dedicated to healing, rising, and living fully.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [images, setImages] = useState<ImageRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data } = await supabase
        .from("images")
        .select("*")
        .order("position", { ascending: true });
      if (active) {
        setImages((data as ImageRow[]) ?? []);
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-soft">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[var(--brand-pink)] opacity-20 blur-3xl" />
          <div className="absolute top-20 -right-32 h-96 w-96 rounded-full bg-[var(--brand-orange)] opacity-20 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-[var(--brand-teal)] opacity-20 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-24 text-center">
          <img src={logoAsset.url} alt="Athijeevana" className="mx-auto h-44 w-auto" />
          <p className="mt-6 inline-block rounded-full bg-white/70 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-[var(--brand-teal-deep)] shadow-card">
            Heal · Rise · Live
          </p>
          <h1 className="mt-8 text-5xl sm:text-7xl font-semibold leading-[1.05] text-[var(--brand-ink)]">
            A sanctuary for the mind, <br />
            <span className="text-gradient-brand italic">a community for the soul.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Athijeevana is a community-led mental health initiative offering free,
            compassionate counselling, gentle guidance, and a circle of care for everyone
            who needs to be heard.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="#about"
              className="rounded-full bg-gradient-brand px-7 py-3 text-sm font-medium text-white shadow-luxe"
            >
              Discover Our Mission
            </a>
            <a
              href="#works"
              className="rounded-full bg-white px-7 py-3 text-sm font-medium text-[var(--brand-ink)] shadow-card border border-[var(--border)]"
            >
              Our Works
            </a>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section id="about" className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-teal-deep)]">
            Our Three Pillars
          </p>
          <h2 className="mt-4 text-4xl sm:text-5xl font-semibold">
            Built on <span className="text-gradient-brand italic">Heal, Rise, Live</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">
            Every conversation, every workshop, every quiet moment of care we offer is
            rooted in three guiding promises.
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            {
              t: "Heal",
              c: "var(--brand-pink)",
              d: "Free, confidential counselling sessions led by trained volunteer counsellors who listen without judgment.",
            },
            {
              t: "Rise",
              c: "var(--brand-orange)",
              d: "Workshops, peer support circles and creative therapies that rebuild self-worth and quiet resilience.",
            },
            {
              t: "Live",
              c: "var(--brand-teal)",
              d: "A continuing community of friendship, follow-ups and gentle accountability — because healing is not a one-time event.",
            },
          ].map((p) => (
            <div
              key={p.t}
              className="rounded-3xl bg-white p-8 shadow-card border border-[var(--border)] hover:-translate-y-1 transition"
            >
              <div
                className="h-12 w-12 rounded-2xl flex items-center justify-center text-white font-semibold"
                style={{ background: p.c }}
              >
                {p.t[0]}
              </div>
              <h3 className="mt-6 text-2xl font-semibold">{p.t}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section className="bg-white/60 border-y border-[var(--border)] py-24">
        <div className="mx-auto max-w-5xl px-6 grid gap-12 md:grid-cols-2 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-teal-deep)]">
              Our Story
            </p>
            <h2 className="mt-4 text-4xl font-semibold">
              Born from a quiet belief that <em className="text-gradient-brand">no one should suffer alone.</em>
            </h2>
          </div>
          <div className="space-y-5 text-muted-foreground leading-relaxed text-[1.05rem]">
            <p>
              Athijeevana began as a small circle of friends, counsellors and survivors
              who saw too many people slipping through the cracks of an overburdened
              system. We started with simple home visits, a phone line, and a promise:
              whoever calls will be answered.
            </p>
            <p>
              Today, we are a growing community of volunteers, licensed therapists,
              educators and members — bound by a shared commitment to make mental
              wellness accessible, dignified, and entirely free for those who need it
              most.
            </p>
            <p>
              We do not charge. We do not judge. We simply walk alongside.
            </p>
          </div>
        </div>
      </section>

      {/* PROGRAMMES */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-teal-deep)]">
            What We Offer
          </p>
          <h2 className="mt-4 text-4xl sm:text-5xl font-semibold">Our Programmes</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            ["Free Counselling", "One-on-one confidential sessions, in person or by phone."],
            ["Crisis Support", "A compassionate first response for moments of acute distress."],
            ["Community Circles", "Weekly peer groups where stories are held with care."],
            ["School Outreach", "Workshops that teach young people the language of feelings."],
            ["Family Mediation", "Gentle, structured conversations to repair relationships."],
            ["Creative Therapies", "Art, music and movement as pathways back to oneself."],
          ].map(([t, d]) => (
            <div
              key={t}
              className="rounded-3xl border border-[var(--border)] bg-white p-7 shadow-card hover:shadow-luxe transition"
            >
              <div className="h-1.5 w-12 rounded-full bg-gradient-brand" />
              <h3 className="mt-5 text-xl font-semibold">{t}</h3>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* IMPACT */}
      <section className="bg-gradient-brand text-white py-20">
        <div className="mx-auto max-w-6xl px-6 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 text-center">
          {[
            ["2,400+", "Counselling sessions held"],
            ["60+", "Volunteer counsellors"],
            ["120+", "Community workshops"],
            ["100%", "Free, always"],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="text-5xl font-semibold">{n}</div>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] opacity-90">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WORKS / IMAGE GALLERY */}
      <section id="works" className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-teal-deep)]">
            Moments From The Field
          </p>
          <h2 className="mt-4 text-4xl sm:text-5xl font-semibold">
            Our <span className="text-gradient-brand italic">Works</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">
            A growing chronicle of the workshops, circles, home visits and quiet
            kindnesses that make up Athijeevana — added one frame at a time.
          </p>
        </div>

        {loading ? (
          <div className="mt-14 text-center text-muted-foreground">Loading gallery…</div>
        ) : images.length === 0 ? (
          <div className="mt-14 mx-auto max-w-xl text-center rounded-3xl border border-dashed border-[var(--border)] bg-white/70 p-12">
            <p className="text-muted-foreground">
              Our gallery is being curated. New moments will appear here soon.
            </p>
          </div>
        ) : (
          <div className="mt-14 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {images.map((img) => (
              <figure
                key={img.id}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-card aspect-[4/5]"
              >
                <img
                  src={normalizeImageUrl(img.url)}
                  alt={img.title ?? `Athijeevana moment ${img.position}`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-xs text-white opacity-0 group-hover:opacity-100 transition">
                  {img.title ?? `Moment #${img.position}`}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
        <p className="mt-8 text-center text-xs text-muted-foreground">
          {images.length} / 100 moments shared
        </p>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="rounded-[2rem] bg-white p-12 sm:p-16 text-center shadow-luxe border border-[var(--border)]">
          <h2 className="text-4xl font-semibold">
            Are you a member of <span className="text-gradient-brand italic">Athijeevana?</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Verify your membership instantly with the code shared by our team.
          </p>
          <a
            href="/verify"
            className="mt-8 inline-block rounded-full bg-gradient-brand px-8 py-3 text-sm font-medium text-white shadow-luxe"
          >
            Verify Membership →
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
