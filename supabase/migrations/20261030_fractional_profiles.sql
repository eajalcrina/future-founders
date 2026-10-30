-- Red Fractional: perfiles registrados desde /fractional y /en/fractional.
-- Solo el servidor escribe (service role). RLS activo y sin políticas públicas:
-- nadie puede leer ni escribir con la clave anónima.

create table if not exists public.fractional_profiles (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  first_name text not null,
  last_name text not null,
  email text not null unique,
  phone text,
  linkedin text not null,
  country text not null,
  city text,
  role text not null,
  role_other text,
  experience text not null,
  industries text[] not null default '{}',
  situation text not null,
  availability text not null,
  start text not null,
  modality text[] not null default '{}',
  languages text[] not null default '{}',
  fee text,
  summary text not null,
  consent boolean not null default false,
  consent_at timestamptz,
  newsletter boolean not null default false,
  lang text not null default 'es',
  status text not null default 'nuevo' check (status in ('nuevo', 'revisado', 'contactado', 'activo', 'descartado')),
  notes text,
  attribution jsonb
);

create index if not exists fractional_profiles_role_idx on public.fractional_profiles (role);
create index if not exists fractional_profiles_country_idx on public.fractional_profiles (country);
create index if not exists fractional_profiles_status_idx on public.fractional_profiles (status);

alter table public.fractional_profiles enable row level security;
