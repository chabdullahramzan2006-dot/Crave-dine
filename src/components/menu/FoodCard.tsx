"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import type { MenuItem, PortionSize } from "@/types";
import { useCartStore } from "@/store/cart";
import { defaultSize, getPriceForSize, getSizeOptions } from "@/lib/pricing";
import { formatPrice } from "@/lib/utils";

export default function FoodCard({ item }: { item: MenuItem }) {
  const addItem = useCartStore((s) => s.addItem);
  const options = useMemo(() => getSizeOptions(item), [item]);
  const multiSize = options.length > 1;
  const [portion, setPortion] = useState<PortionSize>(defaultSize(item));
  const price = getPriceForSize(item, portion);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-black/[0.06] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(20,15,15,0.1)] hover:ring-cd-red/20">
      <div className="relative aspect-[5/4] overflow-hidden bg-[#f3ebe0]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, 25vw"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
          <p className="font-display text-xl text-white drop-shadow">
            {formatPrice(price)}
          </p>
          {item.bestseller && (
            <span className="rounded-full bg-cd-yellow px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-cd-ink">
              Best
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="line-clamp-2 min-h-[2.75rem] text-[1.05rem] font-bold leading-snug text-cd-ink">
          {item.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 min-h-[2.5rem] text-sm leading-relaxed text-cd-muted">
          {item.description}
        </p>

        <div className="mt-4 min-h-[2.4rem]">
          {multiSize ? (
            <div className="flex gap-1.5">
              {options.map((opt) => (
                <button
                  key={opt.size}
                  type="button"
                  onClick={() => setPortion(opt.size)}
                  className={`min-w-[2.4rem] rounded-full px-3 py-1.5 text-xs font-bold transition ${
                    portion === opt.size
                      ? "bg-cd-red text-white"
                      : "bg-[#f6f0e6] text-cd-muted hover:text-cd-ink"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => addItem(item, portion)}
          className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-cd-red px-4 py-3 text-sm font-semibold text-white transition hover:bg-cd-red-deep"
        >
          <Plus className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </article>
  );
}
