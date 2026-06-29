import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase, type MemberRow } from "@/lib/supabase";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

const homeHref =
  typeof window !== "undefined" && window.location.pathname.startsWith("/athprojecttb")
    ? "/athprojecttb/"
    : import.meta.env.BASE_URL || "/";

export const Route = createFileRoute("/verify")({
  head: () => ({
    meta: [
      { title: "Verify Membership — Athijeevana" },
      {
        name: "description",
        content: "Verify your Athijeevana membership using your unique membership code.",
      },
    ],
  }),
  component: Verify,
});

type Result =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "found"; member: MemberRow }
  | { kind: "paused"; member: MemberRow }
  | { kind: "notfound" }
  | { kind: "error"; message: string };

function Verify() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<Result>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const c = code.trim();
    if (!c) return;
    setResult({ kind: "loading" });
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .eq("code", c)
      .maybeSingle();
    if (error) {
      setResult({ kind: "error", message: error.message });
      return;
    }
    if (!data) {
      setResult({ kind: "notfound" });
      return;
    }
    const m = data as MemberRow;
    setResult(m.paused ? { kind: "paused", member: m } : { kind: "found", member: m });
  }

  return (
    <div className="min-h-screen bg-gradient-soft flex flex-col">
      <SiteHeader />
      <main className="flex-1 mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-teal-deep)]">
            Membership
          </p>
          <h1 className="mt-4 text-5xl sm:text-6xl font-semibold">
            Verify your <span className="text-gradient-brand italic">membership</span>
          </h1>
          <p className="mt-5 text-muted-foreground text-lg">
            Enter your membership code below to confirm your association with the
            Athijeevana community.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-12 rounded-[2rem] bg-white p-8 sm:p-10 shadow-luxe border border-[var(--border)]"
        >
          <label className="block text-sm font-medium mb-3 text-[var(--brand-ink)]">
            Membership Code
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. ATH-1024 or 7821"
              className="flex-1 rounded-full border border-[var(--border)] bg-[var(--brand-cream)] px-6 py-4 text-lg tracking-wider focus:outline-none focus:ring-2 focus:ring-[var(--brand-teal)] transition"
              autoFocus
            />
            <button
              type="submit"
              disabled={result.kind === "loading"}
              className="rounded-full bg-gradient-brand px-8 py-4 text-white font-medium shadow-luxe disabled:opacity-60"
            >
              {result.kind === "loading" ? "Verifying…" : "Verify"}
            </button>
          </div>

          {/* RESULT */}
          <div className="mt-8">
            {result.kind === "found" && (
              <div className="rounded-2xl border border-[var(--brand-teal)] bg-[rgba(30,165,185,0.06)] p-6 flex items-center gap-5">
                <div className="h-14 w-14 rounded-full bg-gradient-brand flex items-center justify-center text-white text-2xl">
                  ✓
                </div>
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--brand-teal-deep)]">
                    Verified Member
                  </p>
                  <h3 className="mt-1 text-2xl font-semibold">{result.member.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Code: {result.member.code}
                  </p>
                </div>
              </div>
            )}
            {result.kind === "paused" && (
              <div className="rounded-2xl border border-[var(--brand-orange)] bg-[rgba(232,154,60,0.08)] p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--brand-orange)]">
                  Membership paused
                </p>
                <h3 className="mt-1 text-2xl font-semibold">{result.member.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  This membership exists but is currently paused. Please contact the
                  Athijeevana team.
                </p>
              </div>
            )}
            {result.kind === "notfound" && (
              <div className="rounded-2xl border border-[var(--destructive)] bg-[rgba(220,38,38,0.05)] p-6 text-center">
                <p className="text-lg font-semibold text-[var(--destructive)]">
                  Member not found
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  We couldn't find a member with that code. Please check and try again.
                </p>
              </div>
            )}
            {result.kind === "error" && (
              <div className="rounded-2xl border border-[var(--destructive)] bg-[rgba(220,38,38,0.05)] p-6 text-center">
                <p className="text-sm text-[var(--destructive)]">{result.message}</p>
              </div>
            )}
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Don't have a code yet?{" "}
          <a href={homeHref} className="text-[var(--brand-teal-deep)] underline">
            Learn about Athijeevana
          </a>
          .
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
