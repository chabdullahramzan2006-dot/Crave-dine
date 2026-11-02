"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { MenuItem } from "@/types";
import FoodCard from "@/components/menu/FoodCard";

export default function FeaturedDishes({ items }: { items: MenuItem[] }) {
  return (
    <section className="relative section-pad py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-cd-ink/[0.04] to-transparent" />

      <div className="container-site relative">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          className="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-xl">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-cd-red" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-cd-red">
                Guest Favourites
              </p>
            </div>
            <h2 className="font-display text-[2rem] leading-tight text-cd-ink sm:text-4xl">
              Dishes worth craving
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cd-muted sm:text-base">
              Signature pizzas, zingers, matka specials, and guest favourites.
            </p>
          </div>

          <Link
            href="/menu"
            className="group inline-flex items-center gap-2 self-start rounded-full border border-cd-ink/10 bg-white px-5 py-3 text-sm font-semibold text-cd-ink transition hover:border-cd-red/30 hover:text-cd-red sm:self-auto"
          >
            View full menu
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {items.slice(0, 8).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 24,
                delay: Math.min(index * 0.05, 0.3),
              }}
            >
              <FoodCard item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
