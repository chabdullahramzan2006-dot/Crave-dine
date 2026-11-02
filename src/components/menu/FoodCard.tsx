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
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/[0.06] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(20,15,15,0.1)] hover:ring-cd-red/20 sm:rounded-3xl">
      <div className="relative aspect-[16/11] overflow-hidden bg-[#f3ebe0] sm:aspect-[5/4]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, 25vw"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent" />
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-end justify-between gap-2 sm:bottom-3 sm:left-3 sm:right-3">
          <p className="font-display text-lg text-white drop-shadow sm:text-xl">
            {formatPrice(price)}
          </p>
          {item.bestseller && (
            <span className="rounded-full bg-cd-yellow px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-cd-ink">
              Best
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3.5 sm:p-5">
        <h3 className="line-clamp-2 text-[1rem] font-bold leading-snug text-cd-ink sm:min-h-[2.75rem] sm:text-[1.05rem]">
          {item.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-cd-muted sm:mt-1.5 sm:min-h-[2.5rem]">
          {item.description}
        </p>

        <div className="mt-3 sm:mt-4 sm:min-h-[2.75rem]">
          {multiSize ? (
            <div className="flex gap-2">
              {options.map((opt) => {
                const selected = portion === opt.size;
                const fullLabel =
                  opt.size === "small"
                    ? "Small"
                    : opt.size === "medium"
                      ? "Medium"
                      : opt.size === "large"
                        ? "Large"
                        : "Regular";
                return (
                  <button
                    key={opt.size}
                    type="button"
                    onClick={() => setPortion(opt.size)}
                    className={`inline-flex min-h-11 flex-1 items-center justify-center rounded-xl border px-2 py-2.5 text-sm font-bold transition sm:min-h-0 sm:min-w-[3rem] sm:flex-none sm:rounded-full sm:px-3.5 sm:py-2 sm:text-xs ${
                      selected
                        ? "border-cd-red bg-cd-red text-white"
                        : "border-[#e8dcc8] bg-[#f8f2e8] text-cd-ink hover:border-cd-red/40"
                    }`}
                  >
                    <span className="sm:hidden">{fullLabel}</span>
                    <span className="hidden sm:inline">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => addItem(item, portion)}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-cd-red px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-cd-red-deep sm:mt-auto sm:py-3"
        >
          <Plus className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </article>
  );
}
