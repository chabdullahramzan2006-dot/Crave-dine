-- Crave Dine — Supabase schema
-- Run this in the Supabase SQL Editor

create extension if not exists "pgcrypto";

create table if not exists categories (
  id text primary key,
  name text not null,
  slug text not null unique,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists menu_items (
  id text primary key,
  name text not null,
  description text not null default '',
  category_id text not null references categories(id) on delete cascade,
  category_slug text not null,
  price_full numeric(10,2) not null,
  price_half numeric(10,2),
  price_small numeric(10,2),
  price_medium numeric(10,2),
  price_large numeric(10,2),
  image text not null,
  featured boolean not null default false,
  bestseller boolean not null default false,
  available boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  address text not null,
  notes text,
  subtotal numeric(10,2) not null,
  total numeric(10,2) not null,
  status text not null default 'pending'
    check (status in ('pending','confirmed','preparing','out_for_delivery','delivered','cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  menu_item_id text references menu_items(id) on delete set null,
  name text not null,
  portion text not null,
  unit_price numeric(10,2) not null,
  quantity int not null check (quantity > 0),
  line_total numeric(10,2) not null
);

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_menu_items_category on menu_items(category_id);
create index if not exists idx_menu_items_available on menu_items(available);
create index if not exists idx_orders_status on orders(status);
create index if not exists idx_orders_created on orders(created_at desc);
create index if not exists idx_order_items_order on order_items(order_id);

alter table categories enable row level security;
alter table menu_items enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table contact_messages enable row level security;

-- Public read for menu
create policy "Public can read categories"
  on categories for select using (true);

create policy "Public can read available menu items"
  on menu_items for select using (available = true);

-- Inserts from anon for orders/contact (validated in API; service role preferred)
create policy "Anyone can create orders"
  on orders for insert with check (true);

create policy "Anyone can create order items"
  on order_items for insert with check (true);

create policy "Anyone can create contact messages"
  on contact_messages for insert with check (true);

-- Authenticated admins can manage everything
create policy "Admins manage categories"
  on categories for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admins manage menu items"
  on menu_items for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admins read orders"
  on orders for select
  using (auth.role() = 'authenticated');

create policy "Admins update orders"
  on orders for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admins read order items"
  on order_items for select
  using (auth.role() = 'authenticated');

create policy "Admins manage contact messages"
  on contact_messages for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
