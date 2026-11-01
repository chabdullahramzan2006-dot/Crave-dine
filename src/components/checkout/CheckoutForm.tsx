"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { portionLabel } from "@/lib/pricing";
import { formatPrice } from "@/lib/utils";

export default function CheckoutForm() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const clearCart = useCartStore((s) => s.clearCart);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!items.length) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const payload = {
      customer_name: String(form.get("customer_name") || "").trim(),
      phone: String(form.get("phone") || "").trim(),
      address: String(form.get("address") || "").trim(),
      notes: String(form.get("notes") || "").trim(),
      items: items.map((i) => ({
        menu_item_id: i.menuItemId,
        name: i.name,
        portion: i.portion,
        unit_price: i.unitPrice,
        quantity: i.quantity,
      })),
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Order failed");
      clearCart();
      router.push(`/order-confirmation/${json.orderId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to place order");
      setLoading(false);
    }
  }

  if (!items.length) {
    return (
      <div className="rounded-[1.6rem] border border-dashed border-black/15 bg-white/70 px-6 py-16 text-center">
        <p className="font-display text-2xl">Nothing to checkout</p>
        <a href="/menu" className="btn-primary mt-6 inline-flex">
          Explore Menu
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-4 rounded-[1.6rem] border border-black/5 bg-white p-6 sm:p-8">
        <h2 className="font-display text-2xl text-cd-ink">Delivery Details</h2>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-cd-muted">
            Full Name
          </label>
          <input name="customer_name" required className="input-field" placeholder="Your full name" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-cd-muted">
            Phone Number
          </label>
          <input
            name="phone"
            required
            pattern="[0-9+\-\s]{10,15}"
            className="input-field"
            placeholder="03XX-XXXXXXX"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-cd-muted">
            Delivery Address
          </label>
          <textarea
            name="address"
            required
            rows={3}
            className="input-field resize-none"
            placeholder="House / street / area"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-cd-muted">
            Order Notes
          </label>
          <textarea
            name="notes"
            rows={3}
            className="input-field resize-none"
            placeholder="Spice level, landmark, etc."
          />
        </div>
      </div>

      <aside className="h-fit rounded-[1.6rem] border border-black/5 bg-white p-6">
        <h2 className="font-display text-2xl">Summary</h2>
        <ul className="scrollbar-hide mt-4 max-h-64 space-y-3 overflow-y-auto text-sm">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between gap-3">
              <span className="text-cd-muted">
                {item.quantity}× {item.name}{" "}
                <span>({portionLabel(item.portion)})</span>
              </span>
              <span className="shrink-0 font-semibold">
                {formatPrice(item.unitPrice * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between border-t border-black/5 pt-4">
          <span className="text-cd-muted">Total</span>
          <span className="text-xl font-bold text-cd-red">
            {formatPrice(subtotal)}
          </span>
        </div>

        {error && (
          <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <button type="submit" disabled={loading} className="btn-primary mt-6 w-full">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Place Order
        </button>
      </aside>
    </form>
  );
}
