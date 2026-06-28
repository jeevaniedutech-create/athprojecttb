import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://hdebckeapvfvnlkcpcnm.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkZWJja2VhcHZmdm5sa2NwY25tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyOTk5MTMsImV4cCI6MjA5Nzg3NTkxM30.MEFaY_XMPDNuSqlIU4jBCetN1HCfE8Mwlo7Q5vQB2zQ";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

export type ImageRow = {
  id: number;
  position: number;
  url: string;
  title: string | null;
  created_at: string;
  updated_at: string;
};

export type MemberRow = {
  id: number;
  code: string;
  name: string;
  paused: boolean;
  created_at: string;
};

// Convert a Google Drive share/view link into a direct-image link.
export function normalizeImageUrl(raw: string): string {
  if (!raw) return raw;
  const url = raw.trim();
  // /file/d/<ID>/...
  const m1 = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (m1) return `https://drive.google.com/thumbnail?id=${m1[1]}&sz=w2000`;
  // open?id=<ID>
  const m2 = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (m2 && url.includes("drive.google.com")) {
    return `https://drive.google.com/thumbnail?id=${m2[1]}&sz=w2000`;
  }
  return url;
}
