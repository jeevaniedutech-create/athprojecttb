import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase, type ImageRow, type MemberRow, normalizeImageUrl } from "@/lib/supabase";

export const Route = createFileRoute("/control-panel-jeevani")({
  head: () => ({
    meta: [
      { title: "Admin — Athijeevana" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Admin,
});

const ADMIN_USER = "jeevani";
const ADMIN_PASS = "jeevani";
const MAX_IMAGES = 100;
const MAX_MEMBERS = 250;

function Admin() {
  const [authed, setAuthed] = useState(false);
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("ath_admin") === "1") {
      setAuthed(true);
    }
  }, []);

  if (!authed) {
    return (
      <div className="min-h-screen bg-gradient-soft flex items-center justify-center px-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (u === ADMIN_USER && p === ADMIN_PASS) {
              sessionStorage.setItem("ath_admin", "1");
              setAuthed(true);
            } else {
              setErr("Invalid credentials");
            }
          }}
          className="w-full max-w-md rounded-3xl bg-white p-10 shadow-luxe border border-[var(--border)]"
        >
          <h1 className="text-3xl font-semibold text-center">
            Admin <span className="text-gradient-brand italic">Console</span>
          </h1>
          <p className="text-center text-sm text-muted-foreground mt-2">
            Athijeevana administration
          </p>
          <div className="mt-8 space-y-4">
            <input
              value={u}
              onChange={(e) => setU(e.target.value)}
              placeholder="Username"
              className="w-full rounded-full border border-[var(--border)] bg-[var(--brand-cream)] px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--brand-teal)]"
            />
            <input
              value={p}
              onChange={(e) => setP(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full rounded-full border border-[var(--border)] bg-[var(--brand-cream)] px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--brand-teal)]"
            />
            {err && <p className="text-sm text-[var(--destructive)] text-center">{err}</p>}
            <button className="w-full rounded-full bg-gradient-brand py-3 text-white font-medium shadow-luxe">
              Sign in
            </button>
          </div>
        </form>
      </div>
    );
  }

  return <Dashboard onLogout={() => { sessionStorage.removeItem("ath_admin"); setAuthed(false); }} />;
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<"images" | "members">("images");
  return (
    <div className="min-h-screen bg-gradient-soft">
      <header className="border-b border-[var(--border)] bg-white/70 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">
            Athijeevana <span className="text-gradient-brand">Admin</span>
          </h1>
          <button
            onClick={onLogout}
            className="text-sm rounded-full border border-[var(--border)] px-4 py-2 hover:bg-white"
          >
            Sign out
          </button>
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-3 flex gap-2">
          <TabBtn active={tab === "images"} onClick={() => setTab("images")}>
            Image Links
          </TabBtn>
          <TabBtn active={tab === "members"} onClick={() => setTab("members")}>
            Memberships
          </TabBtn>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-10">
        {tab === "images" ? <ImagesPanel /> : <MembersPanel />}
      </main>
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-full text-sm font-medium transition ${
        active
          ? "bg-gradient-brand text-white shadow-luxe"
          : "bg-white border border-[var(--border)] hover:bg-[var(--brand-cream)]"
      }`}
    >
      {children}
    </button>
  );
}

/* ---------------- IMAGES ---------------- */

function ImagesPanel() {
  const [rows, setRows] = useState<ImageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("images")
      .select("*")
      .order("position", { ascending: true });
    setRows((data as ImageRow[]) ?? []);
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, []);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    if (!url.trim()) return;
    if (rows.length >= MAX_IMAGES) {
      setMsg("Maximum 100 images reached.");
      return;
    }
    setSaving(true);
    const nextPos = (rows[rows.length - 1]?.position ?? 0) + 1;
    const { error } = await supabase.from("images").insert({
      position: nextPos,
      url: url.trim(),
      title: title.trim() || null,
    });
    setSaving(false);
    if (error) {
      setMsg(error.message);
      return;
    }
    setUrl("");
    setTitle("");
    await load();
  }

  async function updateRow(id: number, patch: Partial<ImageRow>) {
    const { error } = await supabase
      .from("images")
      .update({ ...patch, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) setMsg(error.message);
    await load();
  }

  async function remove(id: number) {
    if (!confirm("Remove this image?")) return;
    await supabase.from("images").delete().eq("id", id);
    await load();
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-white p-6 shadow-card border border-[var(--border)]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Image Links</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Paste a direct image URL or a Google Drive share link. Field auto-grows up
              to {MAX_IMAGES}.
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-semibold text-gradient-brand">
              {rows.length}
              <span className="text-base text-muted-foreground"> / {MAX_IMAGES}</span>
            </div>
          </div>
        </div>
        <form onSubmit={add} className="mt-6 grid gap-3 sm:grid-cols-[1fr_240px_auto]">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://drive.google.com/file/d/... or direct image URL"
            className="rounded-full border border-[var(--border)] bg-[var(--brand-cream)] px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--brand-teal)]"
          />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Caption (optional)"
            className="rounded-full border border-[var(--border)] bg-[var(--brand-cream)] px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--brand-teal)]"
          />
          <button
            disabled={saving || rows.length >= MAX_IMAGES}
            className="rounded-full bg-gradient-brand px-7 py-3 text-white font-medium shadow-luxe disabled:opacity-60"
          >
            {saving ? "Adding…" : "Add"}
          </button>
        </form>
        {msg && <p className="mt-3 text-sm text-[var(--destructive)]">{msg}</p>}
      </div>

      {loading ? (
        <p className="text-center text-muted-foreground">Loading…</p>
      ) : rows.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[var(--border)] bg-white/60 p-12 text-center text-muted-foreground">
          No images yet. Add the first one above.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((r) => (
            <ImageCard
              key={r.id}
              row={r}
              onSave={(patch) => updateRow(r.id, patch)}
              onDelete={() => remove(r.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ImageCard({
  row,
  onSave,
  onDelete,
}: {
  row: ImageRow;
  onSave: (p: Partial<ImageRow>) => void;
  onDelete: () => void;
}) {
  const [url, setUrl] = useState(row.url);
  const [title, setTitle] = useState(row.title ?? "");
  const dirty = url !== row.url || title !== (row.title ?? "");
  return (
    <div className="rounded-2xl bg-white border border-[var(--border)] shadow-card overflow-hidden">
      <div className="aspect-video bg-[var(--brand-cream)] overflow-hidden">
        <img
          src={normalizeImageUrl(url)}
          alt=""
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover"
          onError={(e) => ((e.currentTarget.style.opacity = "0.2"))}
        />
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            #{row.position}
          </span>
          <button
            onClick={onDelete}
            className="text-xs text-[var(--destructive)] hover:underline"
          >
            Remove
          </button>
        </div>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full text-xs rounded-md border border-[var(--border)] bg-[var(--brand-cream)] px-3 py-2"
        />
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Caption"
          className="w-full text-xs rounded-md border border-[var(--border)] bg-[var(--brand-cream)] px-3 py-2"
        />
        <button
          disabled={!dirty}
          onClick={() => onSave({ url: url.trim(), title: title.trim() || null })}
          className="w-full rounded-full bg-gradient-brand py-2 text-xs text-white font-medium disabled:opacity-40"
        >
          Save changes
        </button>
      </div>
    </div>
  );
}

/* ---------------- MEMBERS ---------------- */

function MembersPanel() {
  const [rows, setRows] = useState<MemberRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [q, setQ] = useState("");

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("members")
      .select("*")
      .order("created_at", { ascending: false });
    setRows((data as MemberRow[]) ?? []);
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, []);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    const c = code.trim();
    const n = name.trim();
    if (!c || !n) return;
    if (rows.length >= MAX_MEMBERS) {
      setMsg("Maximum 250 members reached.");
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("members").insert({ code: c, name: n });
    setSaving(false);
    if (error) {
      setMsg(error.message.includes("duplicate") ? "That code already exists." : error.message);
      return;
    }
    setCode("");
    setName("");
    await load();
  }

  async function togglePause(m: MemberRow) {
    await supabase.from("members").update({ paused: !m.paused }).eq("id", m.id);
    await load();
  }

  const filtered = rows.filter(
    (r) =>
      !q.trim() ||
      r.code.toLowerCase().includes(q.toLowerCase()) ||
      r.name.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-white p-6 shadow-card border border-[var(--border)]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Memberships</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Add up to {MAX_MEMBERS} members. Members cannot be deleted — only paused.
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-semibold text-gradient-brand">
              {rows.length}
              <span className="text-base text-muted-foreground"> / {MAX_MEMBERS}</span>
            </div>
          </div>
        </div>
        <form onSubmit={add} className="mt-6 grid gap-3 sm:grid-cols-[200px_1fr_auto]">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Membership code"
            className="rounded-full border border-[var(--border)] bg-[var(--brand-cream)] px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--brand-teal)]"
          />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Member name"
            className="rounded-full border border-[var(--border)] bg-[var(--brand-cream)] px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--brand-teal)]"
          />
          <button
            disabled={saving || rows.length >= MAX_MEMBERS}
            className="rounded-full bg-gradient-brand px-7 py-3 text-white font-medium shadow-luxe disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </form>
        {msg && <p className="mt-3 text-sm text-[var(--destructive)]">{msg}</p>}
      </div>

      <div className="rounded-3xl bg-white shadow-card border border-[var(--border)] overflow-hidden">
        <div className="p-4 border-b border-[var(--border)]">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or code…"
            className="w-full rounded-full border border-[var(--border)] bg-[var(--brand-cream)] px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-teal)]"
          />
        </div>
        {loading ? (
          <p className="p-8 text-center text-muted-foreground">Loading…</p>
        ) : filtered.length === 0 ? (
          <p className="p-8 text-center text-muted-foreground">No members.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-[var(--brand-cream)] text-xs uppercase tracking-wider">
              <tr>
                <th className="text-left px-5 py-3">Code</th>
                <th className="text-left px-5 py-3">Name</th>
                <th className="text-left px-5 py-3">Status</th>
                <th className="text-right px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} className="border-t border-[var(--border)]">
                  <td className="px-5 py-3 font-mono">{m.code}</td>
                  <td className="px-5 py-3">{m.name}</td>
                  <td className="px-5 py-3">
                    {m.paused ? (
                      <span className="inline-block rounded-full bg-[rgba(232,154,60,0.15)] text-[var(--brand-orange)] px-3 py-1 text-xs">
                        Paused
                      </span>
                    ) : (
                      <span className="inline-block rounded-full bg-[rgba(30,165,185,0.12)] text-[var(--brand-teal-deep)] px-3 py-1 text-xs">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => togglePause(m)}
                      className="rounded-full border border-[var(--border)] px-4 py-1.5 text-xs hover:bg-[var(--brand-cream)]"
                    >
                      {m.paused ? "Resume" : "Pause"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
