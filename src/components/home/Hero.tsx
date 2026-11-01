"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock3 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#1a0f0f]">
      {/* Full-bleed pizza background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=2400&q=90"
          alt="Professional pizza background at Crave Dine"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Light overlays so pizza stays clear and text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25" />
      <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(ellipse_at_70%_40%,rgba(245,197,24,0.18),transparent_55%)]" />

      <div className="container-site section-pad relative flex min-h-[100svh] items-center pt-28 pb-16">
        <div className="max-w-xl lg:max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-cd-yellow/40 bg-black/25 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-cd-yellow backdrop-blur-sm"
          >
            <Clock3 className="h-3.5 w-3.5" />
            Open 11:00 AM – 01:00 AM
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(3.75rem,12vw,7.5rem)] leading-[0.88] tracking-[0.02em] text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.45)]"
          >
            CRAVE
            <span className="block text-cd-yellow">DINE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22 }}
            className="mt-5 font-display text-2xl text-white sm:text-3xl"
          >
            Your Taste, Our Passion.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.32 }}
            className="mt-4 max-w-md text-base leading-relaxed text-white/80"
          >
            Hot pizzas, juicy burgers, wraps & shakes — order online or visit us
            on Multan Road.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.42 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Link
              href="/menu"
              className="group inline-flex items-center gap-2 rounded-full bg-cd-yellow px-8 py-4 text-sm font-bold tracking-wide text-cd-ink shadow-[0_12px_30px_rgba(245,197,24,0.4)] transition hover:bg-cd-yellow-soft"
            >
              Explore Menu
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/checkout"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/70 bg-white/10 px-8 py-4 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition hover:bg-white hover:text-cd-ink"
            >
              Order Now
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
