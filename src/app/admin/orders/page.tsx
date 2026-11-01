import { createServiceClient } from "@/lib/supabase/server";
import AdminOrdersClient from "@/components/admin/AdminOrdersClient";

export default async function AdminOrdersPage() {
  const supabase = createServiceClient();
  let orders: Array<{
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
  }> = [];

  if (supabase) {
    const { data } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .order("created_at", { ascending: false });
    orders = (data as typeof orders) || [];
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-3xl text-cd-ink">Orders</h1>
        <p className="mt-1 text-sm text-cd-muted">
          View and update incoming customer orders.
        </p>
      </div>
      <AdminOrdersClient initialOrders={orders} configured={Boolean(supabase)} />
    </div>
  );
}
