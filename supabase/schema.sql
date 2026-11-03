-- 수어 자료 테이블과 조회 함수: anon은 테이블을 직접 읽지 못하고 lookup_signs 함수로만 조회한다
-- Supabase 대시보드 SQL Editor에서 실행한다. 실행 전 초안이며 아직 검증하지 않았다.

create table if not exists public.signs (
  id bigint generated always as identity primary key,
  collection text not null,
  local_id text not null,
  title text not null,
  record jsonb not null
);
create index if not exists signs_collection_idx on public.signs (collection);

-- RLS를 켜고 정책을 만들지 않는다. 전체 내려받기를 막고 조회 결과만 함수로 내보내기 위해서다.
alter table public.signs enable row level security;
revoke all on public.signs from anon, authenticated;

-- 낱말마다 레코드 하나를 고른다. 제목의 첫 낱말이 일치 > 제목에 낱말이 있음 > 부분 일치,
-- 같은 순위에서는 일상생활수어를 먼저, 그다음 제목이 짧은 것. 낱말은 6개까지, 60자까지만 본다.
create or replace function public.lookup_signs(words text[])
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(jsonb_agg(jsonb_build_object('word', q.w, 'record', best.record) order by q.ord), '[]'::jsonb)
  from unnest(coalesce(words, '{}'::text[])) with ordinality as q(w, ord)
  cross join lateral (
    select s.record
    from public.signs s
    cross join lateral (
      select array(select btrim(t) from unnest(string_to_array(s.title, ',')) as t) as terms
    ) x
    where q.ord <= 6
      and length(btrim(q.w)) between 1 and 60
      and (btrim(q.w) = any(x.terms) or position(btrim(q.w) in s.title) > 0)
    order by
      case when x.terms[1] = btrim(q.w) then 0 when btrim(q.w) = any(x.terms) then 1 else 2 end,
      (s.collection <> '일상생활수어'),
      length(s.title)
    limit 1
  ) best;
$$;
revoke all on function public.lookup_signs(text[]) from public;
grant execute on function public.lookup_signs(text[]) to anon, authenticated;
