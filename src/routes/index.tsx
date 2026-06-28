import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase, type ImageRow, normalizeImageUrl } from "@/lib/supabase";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { LazyImage } from "@/components/LazyImage";
import logoAsset from "@/assets/athijeevana-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Athijeevana — Community Mental Health Initiative by Jeevani Institute of Mind Care" },
      {
        name: "description",
        content:
          "Athijeevana is a community mental health initiative by Jeevani Institute of Mind Care offering free counselling, awareness and support — Strength for the Mind, Resilience for Life.",
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
              Welcome to
              <br />
              <em className="text-gradient-brand not-italic font-medium">ATHIJEEVANA.</em>
            </h1>
            <p className="mt-8 max-w-xl text-[1.05rem] leading-relaxed text-[var(--brand-ink-soft)]">
              A community mental health initiative launched by Jeevani Institute of
              Mind Care — with the vision of promoting mental well-being and providing
              accessible psychological support to individuals in need.
            </p>
            <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-[var(--brand-ink-soft)]">
              Our mission is to ensure that quality mental health care reaches everyone,
              especially those who face financial difficulties or lack access to
              professional counselling services. We believe every individual deserves
              emotional support, hope, and the opportunity to lead a healthy, meaningful life.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#about"
                className="rounded-full bg-[var(--brand-ink)] px-7 py-3.5 text-sm font-medium text-white hover:bg-[var(--brand-teal-deep)] transition"
              >
                Our Vision & Mission
              </a>
              <a
                href="#services"
                className="rounded-full bg-white px-7 py-3.5 text-sm font-medium text-[var(--brand-ink)] border border-[color:rgba(14,42,56,0.12)] hover:border-[var(--brand-ink)] transition"
              >
                Our Services →
              </a>
            </div>

            <div className="mt-14 border-t border-[color:rgba(14,42,56,0.1)] pt-8 max-w-lg">
              <span className="eyebrow">Our Motto</span>
              <p className="mt-3 font-display text-2xl leading-snug text-[var(--brand-ink)]">
                "Strength for the Mind — Resilience for Life."
              </p>
            </div>
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
                <p className="eyebrow">By Jeevani Institute of Mind Care</p>
                <p className="mt-2 font-display text-xl text-[var(--brand-ink)] leading-snug">
                  Strength for the Mind — Resilience for Life.
                </p>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 h-24 w-24 bg-[var(--brand-orange)] opacity-90" />
            <div className="absolute -top-6 -right-6 h-16 w-16 bg-[var(--brand-teal)] opacity-90" />
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section id="about" className="border-t border-[color:rgba(14,42,56,0.08)] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-5">
              <span className="eyebrow">Our Vision & Mission</span>
              <h2 className="mt-4 text-4xl sm:text-5xl leading-tight">
                A mentally healthy, resilient, and <em className="text-gradient-brand not-italic font-medium">compassionate society.</em>
              </h2>
            </div>
            <div className="md:col-span-7 space-y-8 text-[var(--brand-ink-soft)] leading-relaxed">
              <div>
                <span className="eyebrow">Vision</span>
                <p className="mt-3 text-[1.05rem]">
                  To build a mentally healthy, resilient, and compassionate society
                  where every person has access to professional mental health support
                  regardless of their financial background.
                </p>
              </div>
              <div>
                <span className="eyebrow">Mission</span>
                <ul className="mt-3 space-y-3 text-[1.05rem]">
                  <li className="flex gap-3"><span className="text-[var(--brand-teal-deep)]">—</span> Provide free and affordable counselling services to those in need.</li>
                  <li className="flex gap-3"><span className="text-[var(--brand-teal-deep)]">—</span> Promote mental health awareness within communities.</li>
                  <li className="flex gap-3"><span className="text-[var(--brand-teal-deep)]">—</span> Support students, families, and vulnerable populations.</li>
                  <li className="flex gap-3"><span className="text-[var(--brand-teal-deep)]">—</span> Create a network of dedicated mental health professionals and volunteers committed to social well-being.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="border-t border-[color:rgba(14,42,56,0.08)] bg-[var(--brand-paper)]">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <span className="eyebrow">What We Offer</span>
              <h2 className="mt-4 text-4xl sm:text-5xl">Our Services</h2>
            </div>
            <p className="max-w-md text-[var(--brand-ink-soft)] leading-relaxed">
              Programmes shaped by community listening — offered with care, dignity,
              and an unwavering commitment to accessibility.
            </p>
          </div>

          <div className="mt-14 grid gap-px bg-[color:rgba(14,42,56,0.08)] md:grid-cols-2 border border-[color:rgba(14,42,56,0.08)]">
            {[
              ["01", "Free Counselling Sessions", "Professional counselling support for individuals experiencing emotional, psychological, family, academic, or personal challenges."],
              ["02", "Crisis Support Services", "Immediate psychological assistance and guidance for individuals facing emotional crises and difficult life situations."],
              ["03", "Student Mental Health Programmes", "Mental health awareness programmes, workshops, and counselling support designed specifically for school and college students."],
              ["04", "Community Awareness Workshops", "Educational seminars and awareness campaigns aimed at reducing stigma and promoting mental well-being in society."],
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

      {/* JOIN MOVEMENT */}
      <section className="border-t border-[color:rgba(14,42,56,0.08)] py-24 bg-white">
        <div className="mx-auto max-w-6xl px-6 grid gap-16 md:grid-cols-12 items-start">
          <div className="md:col-span-5">
            <span className="eyebrow">Join Our Movement</span>
            <h2 className="mt-4 text-4xl sm:text-5xl leading-tight">
              Together, a <em className="text-gradient-brand not-italic font-medium">healthier, more compassionate</em> society.
            </h2>
            <p className="mt-6 text-[var(--brand-ink-soft)] leading-relaxed">
              Your contribution can make a significant difference in the lives of
              individuals and families seeking support.
            </p>
          </div>
          <div className="md:col-span-7">
            <p className="text-[var(--brand-ink-soft)] leading-relaxed">ATHIJEEVANA welcomes:</p>
            <div className="mt-6 grid sm:grid-cols-2 gap-px bg-[color:rgba(14,42,56,0.08)] border border-[color:rgba(14,42,56,0.08)]">
              {[
                "Psychologists",
                "Counsellors",
                "Social Workers",
                "Mental Health Professionals",
                "Psychology Students",
                "Volunteers & Community Leaders",
              ].map((r) => (
                <div key={r} className="bg-white p-5 text-[var(--brand-ink)] font-display text-lg">
                  {r}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MEMBERSHIP BENEFITS */}
      <section className="border-t border-[color:rgba(14,42,56,0.08)] py-24 bg-[var(--brand-cream)]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-3xl mx-auto">
            <span className="eyebrow">Membership Benefits</span>
            <h2 className="mt-4 text-4xl sm:text-5xl">Become part of the project.</h2>
            <p className="mt-5 text-[var(--brand-ink-soft)] leading-relaxed">
              Individuals who become part of the ATHIJEEVANA Mental Health Project
              will receive:
            </p>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-px bg-[color:rgba(14,42,56,0.08)] border border-[color:rgba(14,42,56,0.08)]">
            {[
              ["01", "Official Membership Card", "A formal identification card recognising you as a member of the ATHIJEEVANA community."],
              ["02", "Community Participation", "Opportunities to participate in community mental health initiatives across Kerala."],
              ["03", "Professional Network", "Professional networking and meaningful social service experience alongside committed peers."],
            ].map(([n, t, d]) => (
              <div key={t} className="bg-white p-10">
                <div className="font-display text-5xl text-[var(--brand-teal-deep)] opacity-30">{n}</div>
                <h3 className="mt-4 text-xl">{t}</h3>
                <p className="mt-3 text-sm text-[var(--brand-ink-soft)] leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INAUGURATION */}
      <section className="bg-[var(--brand-ink)] text-white py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <span className="eyebrow text-[var(--brand-teal)]">Inauguration</span>
          <h2 className="mt-4 text-4xl sm:text-5xl text-white leading-tight">
            Formally inaugurated by
            <br />
            <em className="text-gradient-brand not-italic font-medium">Prof. C. Ravindran.</em>
          </h2>
          <p className="mt-6 text-white/70 text-lg">
            Former Minister for Education, Government of Kerala.
          </p>
          <div className="mt-10 mx-auto max-w-2xl border-t border-white/10 pt-8">
            <p className="text-white/80 leading-relaxed">
              His presence and encouragement have strengthened our commitment to
              community mental health and social welfare.
            </p>
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
            <div className="mt-16 columns-2 md:columns-3 lg:columns-4 gap-3 [column-fill:_balance]">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="mb-3 break-inside-avoid animate-pulse bg-[var(--brand-paper)]"
                  style={{ height: 220 + ((i * 47) % 180) }}
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
              <div className="mt-14 columns-2 md:columns-3 lg:columns-4 gap-3 [column-fill:_balance]">
                {shown.map((img) => (
                  <figure
                    key={img.id}
                    className="group relative mb-3 break-inside-avoid overflow-hidden shadow-card"
                  >
                    <LazyImage
                      src={normalizeImageUrl(img.url)}
                      alt={img.title ?? `Athijeevana moment ${img.position}`}
                      className="w-full"
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
