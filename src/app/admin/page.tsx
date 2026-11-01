import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/server";
import { menuItems } from "@/data/menu";
import { formatPrice } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const supabase = createServiceClient();

  let ordersCount = 0;
  let pendingCount = 0;
  let messagesCount = 0;
  let recent: Array<{
    id: string;
    customer_name: string;
    total: number;
    status: string;
    created_at: string;
  }> = [];

  if (supabase) {
    const [ordersRes, pendingRes, messagesRes, recentRes] = await Promise.all([
      supabase.from("orders").select("id", { count: "exact", head: true }),
      supabase
        .from("orders")
        .select("id", { count: "exact", head: true })
        .eq("status", "pending"),
      supabase
        .from("contact_messages")
        .select("id", { count: "exact", head: true })
        .eq("read", false),
      supabase
        .from("orders")
        .select("id, customer_name, total, status, created_at")
        .order("created_at", { ascending: false })
        .limit(5),
    ]);
    ordersCount = ordersRes.count || 0;
    pendingCount = pendingRes.count || 0;
    messagesCount = messagesRes.count || 0;
    recent = recentRes.data || [];
  }

  const cards = [
    { label: "Total Orders", value: String(ordersCount), href: "/admin/orders" },
    { label: "Pending Orders", value: String(pendingCount), href: "/admin/orders" },
    { label: "Menu Items", value: String(menuItems.length), href: "/admin/menu" },
    { label: "Unread Messages", value: String(messagesCount), href: "/admin/messages" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-cd-ink">Dashboard</h1>
        <p className="mt-1 text-sm text-cd-muted">
          {supabase
            ? "Connected to Supabase."
            : "Running in local demo mode — add Supabase keys to enable live orders."}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-2xl border border-black/5 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-cd-muted">
              {card.label}
            </p>
            <p className="mt-2 font-display text-3xl text-cd-red">{card.value}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-black/5 bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl">Recent Orders</h2>
          <Link href="/admin/orders" className="text-sm font-semibold text-cd-red">
            View all
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="text-sm text-cd-muted">
            No orders yet. Place a test order from the website checkout.
          </p>
        ) : (
          <ul className="divide-y divide-black/5">
            {recent.map((order) => (
              <li
                key={order.id}
                className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm"
              >
                <div>
                  <p className="font-semibold text-cd-ink">{order.customer_name}</p>
                  <p className="text-xs text-cd-muted">
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-cd-red">
                    {formatPrice(Number(order.total))}
                  </p>
                  <p className="text-xs capitalize text-cd-muted">{order.status}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
