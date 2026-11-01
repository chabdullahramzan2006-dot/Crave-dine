"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Phone } from "lucide-react";
import { restaurantInfo } from "@/data/menu";
import { formatPhoneLink } from "@/lib/utils";

export default function InfoHours() {
  return (
    <section className="section-pad pb-24">
      <div className="container-site overflow-hidden rounded-[2rem] bg-cd-ink text-white">
        <div className="grid lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 p-8 sm:p-12"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cd-yellow">
              Visit Crave Dine
            </p>
            <h2 className="font-display text-3xl sm:text-4xl">
              Restaurant Info & Hours
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-white/65">
              Walk in for pizza, burgers, wraps, and shakes — or order online
              for free delivery.
            </p>

            <div className="space-y-4 text-sm">
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-cd-yellow" />
                {restaurantInfo.address}
              </p>
              {restaurantInfo.phones.map((phone) => (
                <a
                  key={phone}
                  href={formatPhoneLink(phone)}
                  className="flex items-center gap-3 transition hover:text-cd-yellow"
                >
                  <Phone className="h-5 w-5 text-cd-yellow" />
                  {phone}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="border-t border-white/10 bg-white/5 p-8 sm:p-12 lg:border-l lg:border-t-0"
          >
            <div className="mb-6 flex items-center gap-2 text-cd-yellow">
              <Clock className="h-5 w-5" />
              <h3 className="font-display text-2xl text-white">Opening Hours</h3>
            </div>
            <ul className="space-y-4">
              {restaurantInfo.hours.map((h) => (
                <li
                  key={h.day}
                  className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 text-sm last:border-0"
                >
                  <span className="text-white/70">{h.day}</span>
                  <span className="font-semibold text-cd-yellow">{h.time}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
