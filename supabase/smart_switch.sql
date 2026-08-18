-- =========================================================
-- SMART SWITCH v2 — run ONCE in the Supabase SQL Editor.
-- Idempotent + self-contained (never fails because of other tables).
-- =========================================================

-- 1) State table (single row)
create table if not exists public.smart_switch_state (
  id boolean primary key default true check (id),
  last_run timestamptz,
  rows_processed integer default 0
);

alter table public.smart_switch_state disable row level security;

insert into public.smart_switch_state (id, last_run, rows_processed)
values (true, null, 0)
on conflict (id) do nothing;

-- 2) Heartbeat log table (real write activity, kept tiny)
create table if not exists public.smart_switch_log (
  id bigserial primary key,
  ran_at timestamptz not null default now()
);

alter table public.smart_switch_log disable row level security;

-- 3) The operation
create or replace function public.run_smart_switch()
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  total int := 0;
  n     int := 0;
  ts    timestamptz := now();
  msg   text;
begin
  -- Real write #1: heartbeat row (always works, keeps project active)
  insert into public.smart_switch_log (ran_at) values (ts);
  total := total + 1;

  -- Keep the log small
  delete from public.smart_switch_log
   where id < (select max(id) - 50 from public.smart_switch_log);
  get diagnostics n = row_count;
  total := total + n;

  -- Optional write #2: touch images (ignored if table/columns differ)
  begin
    update public.images set updated_at = ts;
    get diagnostics n = row_count;
    total := total + n;
  exception when others then null;
  end;

  -- Optional write #3: normalise members (ignored if table/columns differ)
  begin
    update public.members set code = btrim(code), name = btrim(name);
    get diagnostics n = row_count;
    total := total + n;
  exception when others then null;
  end;

  insert into public.smart_switch_state (id, last_run, rows_processed)
  values (true, ts, total)
  on conflict (id) do update
    set last_run = excluded.last_run,
        rows_processed = excluded.rows_processed;

  return json_build_object(
    'status', 'success',
    'rows_processed', total,
    'last_run', to_char(ts at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"')
  );
exception when others then
  msg := sqlerrm;
  return json_build_object('status', 'failed', 'rows_processed', 0,
                           'last_run', null, 'error', msg);
end;
$$;

-- 4) Read-only status
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

-- 5) Permissions
grant usage on schema public to anon, authenticated;
grant execute on function public.run_smart_switch() to anon, authenticated;
grant execute on function public.smart_switch_status() to anon, authenticated;
revoke all on public.smart_switch_state from anon;
revoke all on public.smart_switch_log from anon;
