import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/smart-switch")({
  head: () => ({
    meta: [
      { title: "Smart Switch — Athijeevana" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SmartSwitch,
});

type Status = "ready" | "processing" | "success" | "failed";

type RunResult = {
  status: string;
  rows_processed: number;
  last_run: string | null;
};

function formatStamp(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getDate())}-${p(d.getMonth() + 1)}-${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

function SmartSwitch() {
  const [status, setStatus] = useState<Status>("ready");
  const [rows, setRows] = useState<number | null>(null);
  const [lastRun, setLastRun] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase.rpc("smart_switch_status");
      const r = data as RunResult | null;
      if (r?.last_run) setLastRun(r.last_run);
    })();
  }, []);

  async function run() {
    setStatus("processing");
    setError("");

    const { data, error: rpcError } =
      await supabase.rpc("run_smart_switch");

    // Handle the RPC response safely whether Supabase returns
    // the result directly or wraps it in an array.
    const result = (
      Array.isArray(data) ? data[0] : data
    ) as RunResult | null;

    if (rpcError) {
      setStatus("failed");
      setError(rpcError.message);
      return;
    }

    if (!result || result.status !== "success") {
      setStatus("failed");
      setError("Operation did not complete.");
      return;
    }

    setRows(result.rows_processed);
    setLastRun(result.last_run);
    setStatus("success");
  }

  const statusLabel =
    status === "ready"
      ? "Ready"
      : status === "processing"
        ? "Processing"
        : status === "success"
          ? "Run Successful"
          : "Failed";

  return (
    <div className="min-h-screen bg-[var(--brand-cream,#faf6ef)] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-3xl bg-white border border-[color:rgba(14,42,56,0.10)] shadow-card p-10 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Smart Switch</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Routine backend maintenance run.
        </p>

        <button
          onClick={run}
          disabled={status === "processing"}
          className="mt-8 w-full rounded-full bg-gradient-brand py-4 text-white font-medium tracking-wide shadow-luxe disabled:opacity-60"
        >
          {status === "processing" ? "PROCESSING…" : "⚡ RUN SMART SWITCH"}
        </button>

        <p className="mt-6 text-sm">
          <span className="text-muted-foreground">Status: </span>
          <span className="font-medium">{statusLabel}</span>
        </p>

        {status === "success" && (
          <div className="mt-6 rounded-2xl border border-[color:rgba(30,165,185,0.30)] bg-[rgba(30,165,185,0.07)] p-5 text-left">
            <p className="text-center font-medium text-[var(--brand-teal-deep,#0e2a38)]">
              ✓ Run Successful
            </p>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Rows Processed</dt>
                <dd className="font-mono">
                  {(rows ?? 0).toLocaleString("en-US")}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Last Run</dt>
                <dd className="font-mono">{formatStamp(lastRun)}</dd>
              </div>
            </dl>
          </div>
        )}

        {status === "failed" && (
          <div className="mt-6 rounded-2xl border border-[color:rgba(200,60,60,0.3)] bg-[rgba(200,60,60,0.06)] p-5 text-sm">
            <p className="font-medium">Run Failed</p>
            <p className="mt-1 text-muted-foreground break-words">{error}</p>
            <p className="mt-3 text-xs text-muted-foreground">
              Last Run unchanged:{" "}
              <span className="font-mono">{formatStamp(lastRun)}</span>
            </p>
          </div>
        )}

        {status !== "success" && status !== "failed" && lastRun && (
          <p className="mt-4 text-xs text-muted-foreground">
            Last Run: <span className="font-mono">{formatStamp(lastRun)}</span>
          </p>
        )}
      </div>
    </div>
  );
}
