"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { deals } from "@/data/menu";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

const groups = [
  { key: "single" as const, title: "Single Person Deals" },
  { key: "two" as const, title: "2 Person Deals" },
  { key: "family" as const, title: "Family Deals" },
  { key: "special" as const, title: "Crave Special Deals" },
];

export default function DealsSection() {
  const addDeal = useCartStore((s) => s.addDeal);
  const featured = deals.filter((d) =>
    ["deal-s2", "deal-t3", "deal-f3", "deal-c4"].includes(d.id)
  );

  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-cd-red" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(245,197,24,0.28),transparent_40%),radial-gradient(circle_at_90%_80%,rgba(0,0,0,0.25),transparent_45%)]" />

      <div className="container-site section-pad relative">
        <div className="mb-10 text-center">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-cd-yellow">
            <Sparkles className="h-3.5 w-3.5" />
            Crave Deals
          </p>
          <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
            Special Deals
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70 sm:text-base">
            Single, duo, family, and Crave special combos — priced from our menu flyer.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featured.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="flex h-full flex-col rounded-[1.6rem] border border-white/15 bg-white/10 p-5 text-white backdrop-blur"
            >
              <span className="self-start rounded-full bg-cd-yellow px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-cd-ink">
                {deal.badge}
              </span>
              <h3 className="mt-4 min-h-[3.5rem] font-display text-2xl leading-tight">
                {deal.title}
              </h3>
              <p className="text-sm text-cd-yellow">{deal.subtitle}</p>
              <p className="mt-3 min-h-[3.5rem] flex-1 text-sm leading-relaxed text-white/70">
                {deal.description}
              </p>
              <div className="mt-5 flex items-center justify-between gap-3">
                <p className="font-display text-2xl text-cd-yellow">
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
                  className="rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-cd-red transition hover:bg-cd-yellow hover:text-cd-ink"
                >
                  Add Deal
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center text-xs text-white/55">
          {groups.map((g) => g.title).join(" · ")} — see full list on the Menu page
        </div>
      </div>
    </section>
  );
}
