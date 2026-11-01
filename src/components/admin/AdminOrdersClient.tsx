"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/utils";

type Order = {
  id: string;
  customer_name: string;
  phone: string;
  address: string;
  notes: string | null;
  total: number;
  status: string;
  created_at: string;
  order_items: Array<{
    name: string;
    portion: string;
    quantity: number;
    unit_price: number;
    line_total: number;
  }>;
};

const statuses = [
  "pending",
  "confirmed",
  "preparing",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

export default function AdminOrdersClient({
  initialOrders,
  configured,
}: {
  initialOrders: Order[];
  configured: boolean;
}) {
  const [orders, setOrders] = useState(initialOrders);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function updateStatus(id: string, status: string) {
    setBusyId(id);
    const res = await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o))
      );
    }
    setBusyId(null);
  }

  if (!configured) {
    return (
      <div className="rounded-2xl border border-dashed border-black/15 bg-white p-6 text-sm text-cd-muted">
        Configure Supabase environment variables to view live orders here.
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="rounded-2xl border border-dashed border-black/15 bg-white p-6 text-sm text-cd-muted">
        No orders yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <article
          key={order.id}
          className="rounded-2xl border border-black/5 bg-white p-5"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-semibold text-cd-ink">{order.customer_name}</h2>
              <p className="text-sm text-cd-muted">{order.phone}</p>
              <p className="mt-1 text-sm text-cd-muted">{order.address}</p>
              {order.notes && (
                <p className="mt-1 text-xs italic text-cd-muted">
                  Note: {order.notes}
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="font-bold text-cd-red">
                {formatPrice(Number(order.total))}
              </p>
              <p className="text-xs text-cd-muted">
                {new Date(order.created_at).toLocaleString()}
              </p>
            </div>
          </div>

          <ul className="mt-4 space-y-1 border-t border-black/5 pt-3 text-sm">
            {order.order_items?.map((item, idx) => (
              <li key={idx} className="flex justify-between gap-3">
                <span>
                  {item.quantity}× {item.name}{" "}
                  <span className="capitalize text-cd-muted">({item.portion})</span>
                </span>
                <span>{formatPrice(Number(item.line_total))}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-cd-muted">
              Status
            </label>
            <select
              value={order.status}
              disabled={busyId === order.id}
              onChange={(e) => updateStatus(order.id, e.target.value)}
              className="rounded-xl border border-black/10 bg-cd-cream px-3 py-2 text-sm"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </div>
        </article>
      ))}
    </div>
  );
}
