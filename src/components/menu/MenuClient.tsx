"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import type { Category, MenuItem } from "@/types";
import FoodCard from "@/components/menu/FoodCard";
import { deals } from "@/data/menu";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

const spring = { type: "spring" as const, stiffness: 240, damping: 24 };

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
  const visibleDeals = deals.slice(
    0,
    active === "deals" ? deals.length : 4
  );

  return (
    <div className="bg-[#fbf7f0]">
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
        <div className="container-site section-pad relative py-10 pt-[5.5rem] sm:py-16 sm:pt-28 md:pt-[7.25rem] lg:py-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring}
            className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cd-yellow sm:text-[11px] sm:tracking-[0.35em]"
          >
            Order Online
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.06 }}
            className="mt-2 font-display text-3xl text-white sm:mt-3 sm:text-5xl lg:text-6xl"
          >
            Our Menu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.12 }}
            className="mt-2 max-w-lg text-sm text-white/70 sm:mt-3 sm:text-base"
          >
            Pizzas, burgers, wraps, pasta, shakes & special deals — fresh from
            Crave Dine.
          </motion.p>
        </div>
      </section>

      <div className="sticky top-[3.85rem] z-30 border-b border-black/5 bg-[#fbf7f0]/97 backdrop-blur-xl sm:top-[4.5rem] md:top-[calc(2rem+4.5rem)]">
        <div className="container-site section-pad py-2.5 sm:py-3.5">
          <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:gap-4">
            <div className="relative w-full max-w-sm shrink-0">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cd-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search menu…"
                className="w-full rounded-full border border-black/8 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-cd-red focus:ring-2 focus:ring-cd-red/15 sm:py-3 sm:pl-11"
              />
            </div>

            <div className="scrollbar-hide min-w-0 w-full flex-1 overflow-x-auto overscroll-x-contain touch-pan-x">
              <div className="flex w-max items-center gap-1.5 py-0.5 pr-2 sm:gap-2">
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

      <div className="container-site section-pad py-6 sm:py-10 lg:py-12">
        {showDeals && (
          <motion.section
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={spring}
            className="mb-8 sm:mb-12 lg:mb-14"
          >
            <div className="mb-4 flex items-end justify-between gap-4 sm:mb-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cd-red">
                  Combos
                </p>
                <h2 className="mt-1 font-display text-2xl text-cd-ink sm:text-3xl">
                  Special Deals
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
              {visibleDeals.map((deal, index) => (
                <motion.div
                  key={deal.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ ...spring, delay: Math.min(index * 0.05, 0.25) }}
                  whileHover={{ y: -6 }}
                  className="flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-black/[0.06]"
                >
                  <div className="relative aspect-[16/11] bg-[#f3ebe0]">
                    <Image
                      src={deal.image}
                      alt={deal.title}
                      fill
                      className="object-cover"
                      sizes="(max-width:640px) 100vw, (max-width:1280px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-cd-yellow px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-cd-ink">
                      {deal.badge}
                    </span>
                    <p className="absolute bottom-3 left-3 font-display text-xl text-white">
                      {formatPrice(deal.price)}
                    </p>
                  </div>
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <h3 className="font-display text-xl leading-tight text-cd-ink">
                      {deal.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-cd-muted">
                      {deal.description}
                    </p>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={() =>
                        addDeal({
                          id: deal.id,
                          title: deal.title,
                          price: deal.price,
                          image: deal.image,
                        })
                      }
                      className="mt-4 rounded-full bg-cd-red px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-cd-red-deep"
                    >
                      Add Deal
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {active !== "deals" && (
          <>
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl bg-white px-6 py-16 text-center ring-1 ring-black/5"
              >
                <p className="font-display text-2xl text-cd-ink">No dishes found</p>
                <p className="mt-2 text-sm text-cd-muted">
                  Try another category or search term.
                </p>
              </motion.div>
            ) : (
              <div className="space-y-8 sm:space-y-12 lg:space-y-14">
                {grouped.map((group) => (
                  <motion.section
                    key={group.slug || "list"}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={spring}
                  >
                    {group.name ? (
                      <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
                        <h2 className="font-display text-xl text-cd-ink sm:text-3xl">
                          {group.name}
                        </h2>
                        <div className="h-px flex-1 bg-cd-red/15" />
                        <span className="shrink-0 text-xs font-semibold text-cd-muted">
                          {group.items.length}
                        </span>
                      </div>
                    ) : null}

                    <div className="grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                      {group.items.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 24 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.15 }}
                          transition={{
                            ...spring,
                            delay: Math.min(index * 0.04, 0.28),
                          }}
                        >
                          <FoodCard item={item} />
                        </motion.div>
                      ))}
                    </div>
                  </motion.section>
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
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      transition={spring}
      className={`relative isolate shrink-0 overflow-visible rounded-full px-3 py-1.5 text-xs font-semibold transition sm:px-4 sm:py-2 sm:text-sm ${
        active
          ? "text-white"
          : "bg-white text-cd-ink ring-1 ring-black/8 hover:ring-cd-red/30"
      }`}
    >
      {active ? (
        <motion.span
          layoutId="menu-filter-active"
          className="absolute inset-0 rounded-full bg-cd-red"
          transition={spring}
        />
      ) : null}
      <span className="relative">{label}</span>
    </motion.button>
  );
}
