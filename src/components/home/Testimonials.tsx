"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/data/menu";

export default function Testimonials() {
  return (
    <section className="section-pad py-20">
      <div className="container-site">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cd-red">
            Guests Love Us
          </p>
          <h2 className="mt-2 font-display text-3xl text-cd-ink sm:text-4xl">
            What Our Guests Say
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-[1.6rem] border border-black/5 bg-white p-6 shadow-[0_10px_40px_rgba(20,15,15,0.04)]"
            >
              <div className="mb-4 flex gap-1 text-cd-yellow">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-cd-muted">“{t.text}”</p>
              <footer className="mt-5 font-display text-lg text-cd-ink">
                {t.name}
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
