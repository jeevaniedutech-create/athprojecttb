import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase, type ImageRow, normalizeImageUrl } from "@/lib/supabase";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { LazyImage } from "@/components/LazyImage";
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

const PAGE = 12;

function Home() {
  const [images, setImages] = useState<ImageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(PAGE);

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

  const shown = useMemo(() => images.slice(0, visible), [images, visible]);

  return (
    <div className="min-h-screen bg-[var(--brand-cream)]">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-6 pt-24 pb-28 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7">
            <div className="flex items-center gap-3">
              <span className="rule" />
              <span className="eyebrow">A Community Mental Health Initiative</span>
            </div>
            <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
              A quiet sanctuary
              <br />
              for the mind,
              <br />
              <em className="text-gradient-brand not-italic font-medium">a community for the soul.</em>
            </h1>
            <p className="mt-8 max-w-xl text-[1.05rem] leading-relaxed text-[var(--brand-ink-soft)]">
              Athijeevana is a community-led mental health programme offering free,
              confidential counselling, peer-support circles, and a continuing
              fellowship of care — for everyone who needs to be heard.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#about"
                className="rounded-full bg-[var(--brand-ink)] px-7 py-3.5 text-sm font-medium text-white hover:bg-[var(--brand-teal-deep)] transition"
              >
                Our Mission
              </a>
              <a
                href="#works"
                className="rounded-full bg-white px-7 py-3.5 text-sm font-medium text-[var(--brand-ink)] border border-[color:rgba(14,42,56,0.12)] hover:border-[var(--brand-ink)] transition"
              >
                See Our Works →
              </a>
            </div>

            <dl className="mt-14 grid grid-cols-3 gap-6 max-w-lg border-t border-[color:rgba(14,42,56,0.1)] pt-8">
              {[
                ["2,400+", "Sessions held"],
                ["60+", "Volunteer counsellors"],
                ["100%", "Free, always"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="font-display text-3xl text-[var(--brand-ink)]">{n}</dt>
                  <dd className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[var(--brand-ink-soft)]">
                    {l}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="md:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-[2px] overflow-hidden shadow-luxe bg-white">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-paper)] to-white" />
              <img
                src={logoAsset.url}
                alt="Athijeevana"
                className="absolute inset-0 m-auto h-48 w-auto"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-[color:rgba(14,42,56,0.08)] bg-white/80 backdrop-blur">
                <p className="eyebrow">Est. 2019</p>
                <p className="mt-2 font-display text-xl text-[var(--brand-ink)] leading-snug">
                  "Whoever calls, will be answered."
                </p>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 h-24 w-24 bg-[var(--brand-orange)] opacity-90" />
            <div className="absolute -top-6 -right-6 h-16 w-16 bg-[var(--brand-teal)] opacity-90" />
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section id="about" className="border-t border-[color:rgba(14,42,56,0.08)] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid md:grid-cols-12 gap-12 items-end">
            <div className="md:col-span-5">
              <span className="eyebrow">Our Three Pillars</span>
              <h2 className="mt-4 text-4xl sm:text-5xl leading-tight">
                Built on the quiet practice of <em className="text-gradient-brand not-italic font-medium">Heal, Rise, Live.</em>
              </h2>
            </div>
            <p className="md:col-span-6 md:col-start-7 text-[var(--brand-ink-soft)] leading-relaxed">
              Every conversation, every workshop, every quiet act of care we offer is
              rooted in three guiding promises. They shape who we accept as
              volunteers, how we train them, and the patience we bring to each person
              who walks through our door.
            </p>
          </div>

          <div className="mt-16 grid gap-px bg-[color:rgba(14,42,56,0.08)] md:grid-cols-3 border border-[color:rgba(14,42,56,0.08)]">
            {[
              {
                t: "Heal",
                n: "01",
                c: "var(--brand-pink)",
                d: "Free, confidential counselling sessions led by trained volunteer counsellors who listen without judgment, without clock, without cost.",
              },
              {
                t: "Rise",
                n: "02",
                c: "var(--brand-orange)",
                d: "Workshops, peer-support circles, and creative therapies that rebuild self-worth, agency, and a quiet, durable resilience.",
              },
              {
                t: "Live",
                n: "03",
                c: "var(--brand-teal)",
                d: "A continuing community of friendship, follow-ups, and gentle accountability — because healing is a season, not an appointment.",
              },
            ].map((p) => (
              <div key={p.t} className="bg-white p-10 hover:bg-[var(--brand-cream)] transition">
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-5xl text-[var(--brand-ink)]">{p.t}</span>
                  <span className="eyebrow text-[var(--brand-ink-soft)]">{p.n}</span>
                </div>
                <div className="mt-6 h-px w-full bg-[color:rgba(14,42,56,0.1)]" />
                <p className="mt-6 text-[var(--brand-ink-soft)] leading-relaxed">{p.d}</p>
                <div className="mt-8 h-1 w-12" style={{ background: p.c }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="border-t border-[color:rgba(14,42,56,0.08)] py-24 bg-[var(--brand-paper)]">
        <div className="mx-auto max-w-6xl px-6 grid gap-16 md:grid-cols-12 items-start">
          <div className="md:col-span-5">
            <span className="eyebrow">Our Story</span>
            <h2 className="mt-4 text-4xl sm:text-5xl leading-tight">
              Born from a quiet belief that <em className="text-gradient-brand not-italic font-medium">no one should suffer alone.</em>
            </h2>
            <div className="mt-8 flex items-center gap-3">
              <span className="rule" />
              <span className="eyebrow">Since 2019</span>
            </div>
          </div>
          <div className="md:col-span-7 space-y-6 text-[var(--brand-ink-soft)] leading-relaxed text-[1.05rem] md:text-[1.1rem]">
            <p className="first-letter:font-display first-letter:text-6xl first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:text-[var(--brand-ink)]">
              Athijeevana began as a small circle of friends, counsellors, and
              survivors who watched too many people slip through the cracks of an
              overburdened system. We started with simple home visits, a single
              phone line, and a promise: whoever calls will be answered.
            </p>
            <p>
              Today, we are a growing community of trained volunteers, licensed
              therapists, educators, and members — bound by a shared commitment to
              make mental wellness accessible, dignified, and entirely free for
              those who need it most.
            </p>
            <p>We do not charge. We do not judge. We simply walk alongside.</p>
            <figure className="mt-10 border-l-2 border-[var(--brand-teal)] pl-6">
              <blockquote className="font-display text-2xl leading-snug text-[var(--brand-ink)]">
                "We are not here to fix anyone. We are here to sit with them, until
                the room feels safe enough for them to fix themselves."
              </blockquote>
              <figcaption className="mt-3 eyebrow">— A founding volunteer</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* PROGRAMMES */}
      <section id="programmes" className="border-t border-[color:rgba(14,42,56,0.08)] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <span className="eyebrow">What We Offer</span>
              <h2 className="mt-4 text-4xl sm:text-5xl">Our Programmes</h2>
            </div>
            <p className="max-w-md text-[var(--brand-ink-soft)] leading-relaxed">
              Six core programmes, each shaped by a decade of community listening —
              and continually refined by the people they serve.
            </p>
          </div>

          <div className="mt-14 grid gap-px bg-[color:rgba(14,42,56,0.08)] md:grid-cols-2 lg:grid-cols-3 border border-[color:rgba(14,42,56,0.08)]">
            {[
              ["01", "Free Counselling", "One-on-one confidential sessions, in person or by phone, with no waiting list, no cost, no paperwork."],
              ["02", "Crisis Support", "A compassionate first response for moments of acute distress — answered by a real person, day or night."],
              ["03", "Community Circles", "Weekly peer groups where stories are held with care and met with quiet, structured listening."],
              ["04", "School Outreach", "Workshops in schools and colleges that teach young people the language of feelings, before silence calcifies."],
              ["05", "Family Mediation", "Gentle, structured conversations to repair relationships strained by illness, grief, or distance."],
              ["06", "Creative Therapies", "Art, music, and movement sessions as alternative pathways back to the self for those who cannot find words."],
            ].map(([n, t, d]) => (
              <div key={t} className="bg-white p-10 hover:bg-[var(--brand-cream)] transition group">
                <div className="flex items-baseline justify-between">
                  <span className="eyebrow text-[var(--brand-ink-soft)]">{n}</span>
                  <span className="h-px w-8 bg-[var(--brand-teal)] group-hover:w-16 transition-all" />
                </div>
                <h3 className="mt-6 text-2xl">{t}</h3>
                <p className="mt-3 text-sm text-[var(--brand-ink-soft)] leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="border-t border-[color:rgba(14,42,56,0.08)] py-24 bg-[var(--brand-cream)]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-3xl mx-auto">
            <span className="eyebrow">Our Approach</span>
            <h2 className="mt-4 text-4xl sm:text-5xl">Slow care, quietly delivered.</h2>
          </div>
          <ol className="mt-16 grid md:grid-cols-4 gap-8">
            {[
              ["Listen", "We begin with silence, not solutions. Every story is met with full attention."],
              ["Understand", "Trained counsellors map the contours of what you carry — without diagnosis or judgment."],
              ["Walk Alongside", "We choose, together, the next gentle step. A session, a circle, a friend on the phone."],
              ["Return", "Healing is not linear. Our door remains open, always. You can come back, again and again."],
            ].map(([t, d], i) => (
              <li key={t} className="relative">
                <div className="font-display text-6xl text-[var(--brand-teal-deep)] opacity-30">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-3 text-xl">{t}</h3>
                <p className="mt-2 text-sm text-[var(--brand-ink-soft)] leading-relaxed">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* IMPACT */}
      <section className="bg-[var(--brand-ink)] text-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <span className="eyebrow text-[var(--brand-teal)]">By The Numbers</span>
              <h2 className="mt-4 text-4xl sm:text-5xl text-white">A measure of presence.</h2>
            </div>
            <p className="max-w-md text-white/70 leading-relaxed">
              Numbers cannot describe what happens in a counselling room — but they
              do trace the shape of a community choosing care, together.
            </p>
          </div>
          <div className="mt-14 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4 border border-white/10">
            {[
              ["2,400+", "Counselling sessions held"],
              ["60+", "Volunteer counsellors"],
              ["120+", "Community workshops"],
              ["100%", "Free, always"],
            ].map(([n, l]) => (
              <div key={l} className="bg-[var(--brand-ink)] p-10">
                <div className="font-display text-5xl sm:text-6xl text-white">{n}</div>
                <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-white/60">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKS / GALLERY */}
      <section id="works" className="border-t border-[color:rgba(14,42,56,0.08)] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <span className="eyebrow">Moments From The Field</span>
              <h2 className="mt-4 text-4xl sm:text-5xl">
                Our <em className="text-gradient-brand not-italic font-medium">Works</em>
              </h2>
              <p className="mt-4 max-w-xl text-[var(--brand-ink-soft)] leading-relaxed">
                A growing chronicle of the workshops, circles, home visits, and
                quiet kindnesses that make up Athijeevana — added one frame at a
                time, by hand.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[4/5] animate-pulse bg-[var(--brand-paper)]"
                />
              ))}
            </div>
          ) : images.length === 0 ? (
            <div className="mt-16 mx-auto max-w-xl text-center border border-dashed border-[color:rgba(14,42,56,0.2)] bg-[var(--brand-cream)] p-16">
              <p className="text-[var(--brand-ink-soft)]">
                Our gallery is being curated. New moments will appear here soon.
              </p>
            </div>
          ) : (
            <>
              <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {shown.map((img) => (
                  <figure
                    key={img.id}
                    className="group relative overflow-hidden aspect-[4/5] shadow-card"
                  >
                    <LazyImage
                      src={normalizeImageUrl(img.url)}
                      alt={img.title ?? `Athijeevana moment ${img.position}`}
                      className="h-full w-full"
                    />
                    <div className="absolute top-3 left-3 px-2 py-0.5 text-[10px] tracking-[0.2em] font-mono bg-white/85 text-[var(--brand-ink)] backdrop-blur">
                      {String(img.position).padStart(3, "0")}
                    </div>
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 text-xs text-white opacity-0 group-hover:opacity-100 transition duration-500">
                      {img.title ?? `Moment #${img.position}`}
                    </figcaption>
                  </figure>
                ))}
              </div>
              {visible < images.length && (
                <div className="mt-12 text-center">
                  <button
                    onClick={() => setVisible((v) => v + PAGE)}
                    className="rounded-full border border-[var(--brand-ink)] px-8 py-3 text-sm font-medium text-[var(--brand-ink)] hover:bg-[var(--brand-ink)] hover:text-white transition"
                  >
                    Load More Moments ({images.length - visible} remaining)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-t border-[color:rgba(14,42,56,0.08)] bg-[var(--brand-paper)] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">Voices From The Circle</span>
            <h2 className="mt-4 text-4xl sm:text-5xl">In their own words.</h2>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {[
              ["The phone was picked up on the second ring. That alone, in the state I was in, felt like a miracle.", "— A caller, Bengaluru"],
              ["I came expecting a clinic. I found a room of strangers who became, somehow, family.", "— A community-circle member"],
              ["They never told me what to feel. They only made it safe to feel anything at all.", "— A young adult, after six sessions"],
            ].map(([q, a]) => (
              <figure key={a} className="bg-white p-8 shadow-card">
                <div className="font-display text-5xl leading-none text-[var(--brand-teal-deep)]">"</div>
                <blockquote className="mt-2 text-[var(--brand-ink)] leading-relaxed font-display text-xl">
                  {q}
                </blockquote>
                <figcaption className="mt-6 eyebrow">{a}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-[color:rgba(14,42,56,0.08)] bg-white py-24">
        <div className="mx-auto max-w-5xl px-6 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <span className="eyebrow">Common Questions</span>
            <h2 className="mt-4 text-4xl sm:text-5xl leading-tight">Before you reach out.</h2>
          </div>
          <div className="md:col-span-8 divide-y divide-[color:rgba(14,42,56,0.1)] border-t border-b border-[color:rgba(14,42,56,0.1)]">
            {[
              ["Is everything truly free?", "Yes. Every programme — counselling, circles, mediation, outreach — is offered entirely free of cost. We are sustained by volunteers and small community donations."],
              ["Are sessions confidential?", "Absolutely. What is shared in a session stays in that room. We follow strict ethical guidelines aligned with professional counselling practice."],
              ["Do I need a referral?", "No referral, no diagnosis, no paperwork is required. A single phone call or message is enough to begin."],
              ["Who are your counsellors?", "A mix of licensed therapists volunteering their time, and rigorously trained community counsellors supervised by clinical mentors."],
              ["Can I volunteer?", "Yes. We welcome thoughtful volunteers — counsellors, educators, organisers, and quiet helpers. Reach out and we'll begin a conversation."],
            ].map(([q, a]) => (
              <details key={q} className="group py-6">
                <summary className="flex cursor-pointer items-start justify-between gap-6 list-none">
                  <span className="font-display text-xl text-[var(--brand-ink)]">{q}</span>
                  <span className="mt-1 text-[var(--brand-teal-deep)] text-xl leading-none transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[var(--brand-ink-soft)] leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
        <div className="relative overflow-hidden bg-[var(--brand-ink)] text-white p-12 sm:p-20 text-center">
          <div className="absolute inset-0 bg-gradient-hero opacity-50" />
          <div className="relative">
            <span className="eyebrow text-[var(--brand-teal)]">For Members</span>
            <h2 className="mt-4 text-4xl sm:text-5xl text-white">
              Are you a member of <em className="text-gradient-brand not-italic font-medium">Athijeevana?</em>
            </h2>
            <p className="mt-5 text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              Verify your membership instantly using the code shared by our team.
              Members enjoy priority access, dedicated circles, and a continuing
              fellowship of care.
            </p>
            <a
              href="/verify"
              className="mt-10 inline-block rounded-full bg-white px-10 py-4 text-sm font-medium text-[var(--brand-ink)] hover:bg-[var(--brand-cream)] transition"
            >
              Verify Membership →
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
