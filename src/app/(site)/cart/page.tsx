"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { portionLabel } from "@/lib/pricing";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal());

  return (
    <div className="container-site section-pad pb-20 pt-28">
      <h1 className="font-display text-4xl text-cd-ink">Your Cart</h1>
      <p className="mt-2 text-sm text-cd-muted">
        Review items before checkout.
      </p>

      {items.length === 0 ? (
        <div className="mt-12 rounded-[1.6rem] border border-dashed border-black/15 bg-white/70 px-6 py-16 text-center">
          <p className="font-display text-2xl">Cart is empty</p>
          <Link href="/menu" className="btn-primary mt-6 inline-flex">
            Explore Menu
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-4 rounded-[1.4rem] border border-black/5 bg-white p-4 sm:flex-row sm:items-center"
              >
                <div className="relative h-24 w-full overflow-hidden rounded-xl sm:h-24 sm:w-28">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-cd-ink">{item.name}</p>
                  <p className="text-xs text-cd-muted">
                    {portionLabel(item.portion)} · {formatPrice(item.unitPrice)}
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="inline-flex items-center rounded-full border border-black/10">
                      <button
                        type="button"
                        className="p-2"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-6 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="p-2"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-cd-red"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Remove
                    </button>
                  </div>
                </div>
                <p className="font-bold text-cd-red sm:text-right">
                  {formatPrice(item.unitPrice * item.quantity)}
                </p>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-[1.6rem] border border-black/5 bg-white p-6">
            <h2 className="font-display text-2xl">Order Summary</h2>
            <div className="mt-4 flex justify-between text-sm">
              <span className="text-cd-muted">Subtotal</span>
              <span className="font-bold text-cd-ink">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-2 text-xs text-cd-muted">
              Delivery charges confirmed on call if applicable.
            </p>
            <div className="mt-6 grid gap-2">
              <Link href="/checkout" className="btn-primary">
                Proceed to Checkout
              </Link>
              <Link href="/menu" className="btn-secondary">
                Add More Items
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
