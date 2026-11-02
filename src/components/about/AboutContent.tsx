"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, MapPin, Phone } from "lucide-react";
import FoodCoverflow from "@/components/about/FoodCoverflow";
import { restaurantInfo } from "@/data/menu";
import { formatPhoneLink } from "@/lib/utils";

const spring = { type: "spring" as const, stiffness: 220, damping: 24 };

export default function AboutContent() {
  return (
    <div className="bg-[#fbf7f0]">
      {/* Traditional restaurant hero */}
      <section className="relative isolate min-h-[70svh] overflow-hidden bg-[#1a0f0f]">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2000&q=85"
            alt="Dining at Crave Dine"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-transparent" />

        <div className="container-site section-pad relative flex min-h-[70svh] flex-col justify-end pb-14 pt-28 sm:pb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring}
            className="text-[11px] font-semibold uppercase tracking-[0.32em] text-cd-yellow"
          >
            Est. on Multan Road
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.08 }}
            className="mt-3 max-w-3xl font-display text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.95] text-white"
          >
            About
            <span className="block text-cd-yellow">Crave Dine</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.16 }}
            className="mt-4 max-w-md font-display text-xl text-white/90 sm:text-2xl"
          >
            Your Taste, Our Passion.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="container-site section-pad py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={spring}
            className="lg:col-span-5"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-cd-red" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cd-red">
                Our Story
              </p>
            </div>
            <h2 className="font-display text-3xl leading-tight text-cd-ink sm:text-4xl">
              A neighbourhood table for real cravings
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-cd-muted sm:text-base">
              Crave Dine grew from a simple idea: serve hot, honest food that
              families come back for. From wood-fired style pizzas and crispy
              zingers to wraps, pasta, and late-night shakes — every plate is
              made fresh to order.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-cd-muted sm:text-base">
              Near Elahi College on Multan Road, Dokota, we welcome dine-in
              guests, takeaway regulars, and online orders with the same care.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/menu" className="btn-primary">
                Explore Menu
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-cd-ink/15 bg-white px-6 py-3.5 text-sm font-semibold text-cd-ink transition hover:border-cd-red/30 hover:text-cd-red"
              >
                Visit Us
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ ...spring, delay: 0.08 }}
            className="relative min-w-0 lg:col-span-7"
          >
            <FoodCoverflow />
          </motion.div>
        </div>
      </section>

      {/* Promise strip */}
      <section className="border-y border-black/5 bg-white">
        <div className="container-site section-pad py-12 sm:py-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={spring}
            className="grid gap-8 sm:grid-cols-3 sm:gap-6"
          >
            {[
              {
                title: "Made to order",
                text: "Pizzas, burgers, wraps & cafe classics cooked fresh when you ask.",
              },
              {
                title: "Family deals",
                text: "Solo bites to mega feasts — flyer prices, honest combos.",
              },
              {
                title: "Open late",
                text: "11:00 AM to 01:00 AM — for lunch, dinner, and late cravings.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...spring, delay: i * 0.06 }}
                className="text-center sm:text-left"
              >
                <p className="font-display text-xl text-cd-ink sm:text-2xl">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-cd-muted">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Visit */}
      <section className="container-site section-pad py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={spring}
          className="overflow-hidden bg-cd-ink text-white"
        >
          <div className="grid lg:grid-cols-2">
            <div className="space-y-6 p-8 sm:p-10 lg:p-12">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cd-yellow">
                Find us
              </p>
              <h2 className="font-display text-3xl sm:text-4xl">
                Come hungry to Multan Road
              </h2>
              <p className="flex items-start gap-3 text-sm leading-relaxed text-white/75">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-cd-yellow" />
                {restaurantInfo.address}
              </p>
              <div className="space-y-3">
                {restaurantInfo.phones.map((phone) => (
                  <a
                    key={phone}
                    href={formatPhoneLink(phone)}
                    className="flex items-center gap-3 text-sm transition hover:text-cd-yellow"
                  >
                    <Phone className="h-5 w-5 text-cd-yellow" />
                    {phone}
                  </a>
                ))}
              </div>
              <div className="flex items-center gap-3 border-t border-white/10 pt-6 text-sm">
                <Clock className="h-5 w-5 text-cd-yellow" />
                <span className="text-white/70">Open Daily</span>
                <span className="font-semibold text-cd-yellow">
                  11:00 AM – 01:00 AM
                </span>
              </div>
            </div>
            <div className="relative min-h-[240px] lg:min-h-full">
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
                alt="Crave Dine restaurant interior"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cd-ink/40 to-transparent lg:bg-gradient-to-l" />
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
