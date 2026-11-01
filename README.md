# Crave Dine — Premium Restaurant Website

Modern, fully responsive restaurant website for **Crave Dine** built with Next.js, TypeScript, Tailwind CSS, Supabase, Framer Motion, and Lucide icons.

**Tagline:** Your Taste, Our Passion.

## Features

- Premium home page with animated loader, hero, featured dishes, deals, testimonials, and hours
- Complete menu with category filters, search, full/half portions, and add-to-cart
- Cart drawer + cart page + checkout with customer details
- Orders and contact messages saved to Supabase (with local demo fallback)
- Admin dashboard for orders, menu availability/prices, and contact messages
- Sticky nav, mobile menu, WhatsApp order button, call links, SEO metadata

## Menu source

Menu categories, item names, and prices are taken from the restaurant’s printed menu photos (BBQ, Shanwari kitchen, specials, mutton/chicken dishes, Chinese, rice, snacks, salads, clay oven, desserts, beverages, etc.).

Deal bundles on the site are composed only from those real menu items.

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Without Supabase keys, the site still runs using the local menu data. Orders/contact submissions work in **demo mode** (accepted, not persisted).

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Copy Project URL, anon key, and service role key into `.env.local`.
3. In the SQL Editor, run:
   - `supabase/schema.sql`
   - `supabase/seed.sql` (generate with `npm run seed:sql` if needed)
4. Create an admin user under **Authentication → Users**.
5. Sign in at `/admin/login`.

### Generate seed SQL

```bash
npm run seed:sql
```

This rebuilds `supabase/seed.sql` from `src/data/menu.ts`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Lint |
| `npm run seed:sql` | Regenerate Supabase seed file |

## Project structure

```text
src/
  app/(site)/          Public pages (home, menu, about, contact, cart, checkout)
  app/admin/           Admin dashboard
  app/api/             Orders, contact, menu, admin APIs
  components/          UI sections and shared components
  data/menu.ts         Full menu source of truth
  lib/supabase/        Browser + server + service clients
  store/cart.ts        Zustand cart store
supabase/
  schema.sql           Tables + RLS policies
  seed.sql             Menu seed data
```

## Contact info used on the site

- **Phones:** 0303-4625553 · 0314-6893553 · 0346-8952253
- **Address:** Shop # G3, G4, Near Elahi College, Salam Center, Multan Road, Dokota.

## Security notes

- Only `NEXT_PUBLIC_*` keys are used in the browser.
- `SUPABASE_SERVICE_ROLE_KEY` is server-only (API routes / admin reads).
- Never commit `.env.local`.
