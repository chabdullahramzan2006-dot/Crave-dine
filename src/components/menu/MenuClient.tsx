"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Category, MenuItem } from "@/types";
import FoodCard from "@/components/menu/FoodCard";
import { deals } from "@/data/menu";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

export default function MenuClient({
  categories,
  items,
}: {
  categories: Category[];
  items: MenuItem[];
}) {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");
  const addDeal = useCartStore((s) => s.addDeal);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchCat = active === "all" || item.category_slug === active;
      const matchQ =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [items, active, query]);

  const grouped = useMemo(() => {
    if (active !== "all" || query.trim()) {
      return [{ slug: active, name: "", items: filtered }];
    }
    return categories
      .map((cat) => ({
        slug: cat.slug,
        name: cat.name,
        items: filtered.filter((i) => i.category_slug === cat.slug),
      }))
      .filter((g) => g.items.length > 0);
  }, [active, query, filtered, categories]);

  const showDeals = active === "all" || active === "deals";

  return (
    <div className="bg-[#fbf7f0]">
      {/* Menu page banner */}
      <section className="relative overflow-hidden border-b border-black/5">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=1800&q=80"
            alt="Crave Dine menu"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a0f0f]/92 via-[#1a0f0f]/75 to-[#1a0f0f]/45" />
        </div>
        <div className="container-site section-pad relative py-20 pt-28 sm:py-24 sm:pt-32">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-cd-yellow">
            Order Online
          </p>
          <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl lg:text-6xl">
            Our Menu
          </h1>
          <p className="mt-3 max-w-lg text-sm text-white/70 sm:text-base">
            Pizzas, burgers, wraps, pasta, shakes & special deals — fresh from
            Crave Dine.
          </p>
        </div>
      </section>

      {/* Sticky filters */}
      <div className="sticky top-[4.5rem] z-30 border-b border-black/5 bg-[#fbf7f0]/95 backdrop-blur-xl lg:top-20">
        <div className="container-site section-pad py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative w-full max-w-sm shrink-0">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cd-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search menu…"
                className="w-full rounded-full border border-black/8 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-cd-red focus:ring-2 focus:ring-cd-red/15"
              />
            </div>

            <div className="scrollbar-hide min-w-0 w-full flex-1 overflow-x-auto overscroll-x-contain touch-pan-x pb-1">
              <div className="flex w-max gap-2 pr-2">
                <FilterChip
                  active={active === "all"}
                  onClick={() => setActive("all")}
                  label="All"
                />
                <FilterChip
                  active={active === "deals"}
                  onClick={() => setActive("deals")}
                  label="Deals"
                />
                {categories.map((cat) => (
                  <FilterChip
                    key={cat.id}
                    active={active === cat.slug}
                    onClick={() => setActive(cat.slug)}
                    label={cat.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-site section-pad py-10 sm:py-12">
        {showDeals && (
          <section className="mb-14">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cd-red">
                  Combos
                </p>
                <h2 className="mt-1 font-display text-3xl text-cd-ink">
                  Special Deals
                </h2>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {deals.slice(0, active === "deals" ? deals.length : 8).map((deal) => (
                <div
                  key={deal.id}
                  className="flex h-full flex-col rounded-3xl bg-white p-5 ring-1 ring-black/[0.06]"
                >
                  <span className="inline-flex w-fit rounded-full bg-cd-yellow/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-cd-ink">
                    {deal.badge}
                  </span>
                  <h3 className="mt-3 min-h-[3rem] font-display text-xl leading-tight text-cd-ink">
                    {deal.title}
                  </h3>
                  <p className="mt-2 min-h-[3rem] flex-1 text-sm leading-relaxed text-cd-muted">
                    {deal.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <p className="font-display text-2xl text-cd-red">
                      {formatPrice(deal.price)}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        addDeal({
                          id: deal.id,
                          title: deal.title,
                          price: deal.price,
                        })
                      }
                      className="rounded-full bg-cd-red px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-cd-red-deep"
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {active !== "deals" && (
          <>
            {filtered.length === 0 ? (
              <div className="rounded-3xl bg-white px-6 py-16 text-center ring-1 ring-black/5">
                <p className="font-display text-2xl text-cd-ink">No dishes found</p>
                <p className="mt-2 text-sm text-cd-muted">
                  Try another category or search term.
                </p>
              </div>
            ) : (
              <div className="space-y-14">
                {grouped.map((group) => (
                  <section key={group.slug || "list"}>
                    {group.name ? (
                      <div className="mb-6 flex items-center gap-4">
                        <h2 className="font-display text-2xl text-cd-ink sm:text-3xl">
                          {group.name}
                        </h2>
                        <div className="h-px flex-1 bg-cd-red/15" />
                        <span className="text-xs font-semibold text-cd-muted">
                          {group.items.length} items
                        </span>
                      </div>
                    ) : null}

                    <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {group.items.map((item) => (
                        <FoodCard key={item.id} item={item} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
        active
          ? "bg-cd-red text-white shadow-[0_8px_20px_rgba(155,28,28,0.25)]"
          : "bg-white text-cd-ink ring-1 ring-black/8 hover:ring-cd-red/30"
      }`}
    >
      {label}
    </button>
  );
}
