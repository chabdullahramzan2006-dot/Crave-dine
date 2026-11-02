"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: "pizza-1",
    label: "Pizza",
    src: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "burger-1",
    label: "Burger",
    src: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "pasta-1",
    label: "Pasta",
    src: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "pizza-2",
    label: "Pizza",
    src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "burger-2",
    label: "Burger",
    src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "pasta-2",
    label: "Pasta",
    src: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "burger-3",
    label: "Burger",
    src: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=900&q=80",
  },
];

const spring = { type: "spring" as const, stiffness: 260, damping: 28 };

function wrapIndex(index: number, length: number) {
  return ((index % length) + length) % length;
}

export default function FoodCoverflow() {
  const [active, setActive] = useState(0);
  const count = slides.length;

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((prev) => wrapIndex(prev + 1, count));
    }, 3400);
    return () => window.clearInterval(id);
  }, [count]);

  const go = (dir: -1 | 1) => setActive((prev) => wrapIndex(prev + dir, count));

  return (
    <div className="relative w-full">
      <div
        className="relative mx-auto h-[340px] w-full overflow-visible sm:h-[400px] lg:h-[440px]"
        style={{ perspective: "1400px", perspectiveOrigin: "50% 50%" }}
        onPointerDown={(e) => {
          const startX = e.clientX;
          const onUp = (ev: PointerEvent) => {
            const delta = ev.clientX - startX;
            if (Math.abs(delta) > 42) go(delta < 0 ? 1 : -1);
            window.removeEventListener("pointerup", onUp);
          };
          window.addEventListener("pointerup", onUp);
        }}
      >
        <div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {slides.map((slide, index) => {
            let offset = index - active;
            if (offset > Math.floor(count / 2)) offset -= count;
            if (offset < -Math.floor(count / 2)) offset += count;

            const abs = Math.abs(offset);
            if (abs > 3) return null;

            return (
              <motion.button
                key={slide.id}
                type="button"
                aria-label={`Show ${slide.label}`}
                onClick={() => setActive(index)}
                className="absolute left-1/2 top-1/2 h-[250px] w-[175px] overflow-hidden rounded-2xl border border-black/5 bg-[#f3ebe0] shadow-[0_16px_36px_rgba(20,15,15,0.16)] outline-none sm:h-[310px] sm:w-[215px] lg:h-[350px] lg:w-[245px]"
                style={{ zIndex: 30 - abs, transformStyle: "preserve-3d" }}
                animate={{
                  x: `calc(-50% + ${offset * 98}px)`,
                  y: "-50%",
                  rotateY: offset * -48,
                  scale: abs === 0 ? 1 : Math.max(0.7, 1 - abs * 0.11),
                  opacity: abs > 2 ? 0.4 : 1,
                  filter: abs === 0 ? "brightness(1)" : "brightness(0.88)",
                }}
                transition={spring}
              >
                <Image
                  src={slide.src}
                  alt={`${slide.label} at Crave Dine`}
                  fill
                  className="object-cover"
                  sizes="(max-width:640px) 175px, 245px"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/5" />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-cd-ink">
                  {slide.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="mt-2 flex items-center justify-center gap-3 sm:mt-3">
        <button
          type="button"
          aria-label="Previous dish"
          onClick={() => go(-1)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-cd-ink ring-1 ring-black/10 transition hover:text-cd-red"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-1.5">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Go to ${slide.label}`}
              onClick={() => setActive(index)}
              className={`h-2 rounded-full transition-all ${
                index === active ? "w-6 bg-cd-red" : "w-2 bg-cd-ink/20"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next dish"
          onClick={() => go(1)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-cd-ink ring-1 ring-black/10 transition hover:text-cd-red"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={slides[active].id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="mt-4 text-center font-display text-lg text-cd-ink sm:text-xl"
        >
          {slides[active].label} — Fresh daily. Generous portions.
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
