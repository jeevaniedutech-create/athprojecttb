-- =========================================================
-- SMART SWITCH — run this ONCE in the Supabase SQL Editor.
-- Safe to re-run (idempotent).
-- =========================================================

-- 1) Single-row state table (never more than one timestamp)
create table if not exists public.smart_switch_state (
  id boolean primary key default true check (id),
  last_run timestamptz,
  rows_processed integer default 0
);

alter table public.smart_switch_state disable row level security;

insert into public.smart_switch_state (id, last_run, rows_processed)
values (true, null, 0)
on conflict (id) do nothing;

-- 2) The real maintenance operation (server-side, SECURITY DEFINER)
create or replace function public.run_smart_switch()
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  img_rows int := 0;
  mem_rows int := 0;
  total    int := 0;
  ts       timestamptz := now();
begin
  -- Real write #1: normalise + touch every image record
  update public.images
     set url        = btrim(url),
         title      = nullif(btrim(coalesce(title, '')), ''),
         updated_at = ts;
  get diagnostics img_rows = row_count;

  -- Real write #2: normalise every membership record
  update public.members
     set code = btrim(code),
         name = btrim(name);
  get diagnostics mem_rows = row_count;

  total := img_rows + mem_rows + 1;

  -- Overwrite the single stored timestamp (no history kept)
  update public.smart_switch_state
     set last_run = ts,
         rows_processed = total
   where id = true;

  return json_build_object(
    'status', 'success',
    'rows_processed', total,
    'last_run', to_char(ts at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"')
  );
exception when others then
  -- Keep the previous timestamp untouched on failure
  return json_build_object('status', 'failed', 'rows_processed', 0, 'last_run', null);
end;
$$;

-- 3) Read-only status (no client data exposed)
create or replace function public.smart_switch_status()
returns json
language sql
stable
security definer
set search_path = public
as $$
  select json_build_object(
    'status', 'ready',
    'rows_processed', coalesce(rows_processed, 0),
    'last_run', case when last_run is null then null
                else to_char(last_run at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') end
  )
  from public.smart_switch_state
  where id = true;
$$;

-- 4) Permissions: operator (anon) may only execute these two functions
grant usage on schema public to anon, authenticated;
grant execute on function public.run_smart_switch() to anon, authenticated;
grant execute on function public.smart_switch_status() to anon, authenticated;
revoke all on public.smart_switch_state from anon;
