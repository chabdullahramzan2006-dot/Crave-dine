"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { deals } from "@/data/menu";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

const featuredIds = ["deal-s2", "deal-t3", "deal-f3", "deal-c4"] as const;

const spring = { type: "spring" as const, stiffness: 260, damping: 24 };

export default function DealsSection() {
  const addDeal = useCartStore((s) => s.addDeal);
  const featured = deals.filter((d) =>
    featuredIds.includes(d.id as (typeof featuredIds)[number])
  );

  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      <div className="absolute inset-0 bg-cd-red" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(245,197,24,0.3),transparent_42%),radial-gradient(circle_at_88%_78%,rgba(0,0,0,0.28),transparent_48%)]" />

      <div className="container-site section-pad relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={spring}
          className="mb-8 text-center sm:mb-10"
        >
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-cd-yellow">
            <Sparkles className="h-3.5 w-3.5" />
            Crave Deals
          </p>
          <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl md:text-5xl">
            Special Deals
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
            Solo, duo, family, and mega combos — real flyer prices with food
            worth sharing.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featured.map((deal, index) => (
            <motion.article
              key={deal.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ ...spring, delay: index * 0.07 }}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.985 }}
              className="group flex h-full flex-col overflow-hidden rounded-[1.35rem] bg-cd-ink/35 ring-1 ring-white/15 backdrop-blur-sm"
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-black/30">
                <Image
                  src={deal.image}
                  alt={deal.title}
                  fill
                  className="object-cover transition duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width:640px) 100vw, (max-width:1280px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                <span className="absolute left-3 top-3 rounded-full bg-cd-yellow px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-cd-ink shadow-sm">
                  {deal.badge}
                </span>
                <p className="absolute bottom-3 left-3 font-display text-2xl text-cd-yellow drop-shadow">
                  {formatPrice(deal.price)}
                </p>
              </div>

              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cd-yellow/80">
                  {deal.subtitle}
                </p>
                <h3 className="mt-1.5 font-display text-xl leading-tight text-white sm:text-2xl">
                  {deal.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/70">
                  {deal.description}
                </p>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={spring}
                  onClick={() =>
                    addDeal({
                      id: deal.id,
                      title: deal.title,
                      price: deal.price,
                      image: deal.image,
                    })
                  }
                  className="mt-5 w-full rounded-full bg-white px-4 py-3 text-xs font-bold uppercase tracking-wide text-cd-red transition hover:bg-cd-yellow hover:text-cd-ink"
                >
                  Add Deal
                </motion.button>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="mt-8 flex flex-col items-center gap-3 sm:mt-10"
        >
          <p className="text-center text-xs text-white/55">
            Single · 2 Person · Family · Crave Special — full list on Menu
          </p>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white hover:text-cd-ink"
          >
            Browse all deals
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
