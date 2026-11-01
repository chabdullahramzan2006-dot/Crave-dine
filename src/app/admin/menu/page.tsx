import { menuItems, categories } from "@/data/menu";
import AdminMenuClient from "@/components/admin/AdminMenuClient";
import { createServiceClient } from "@/lib/supabase/server";
import type { MenuItem } from "@/types";

export default async function AdminMenuPage() {
  const supabase = createServiceClient();
  let items: MenuItem[] = menuItems;

  if (supabase) {
    const { data } = await supabase.from("menu_items").select("*").order("name");
    if (data?.length) items = data as MenuItem[];
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-3xl text-cd-ink">Menu Management</h1>
        <p className="mt-1 text-sm text-cd-muted">
          Toggle availability and update prices. Seed Supabase to manage live data.
        </p>
      </div>
      <AdminMenuClient
        items={items}
        categories={categories}
        configured={Boolean(supabase)}
      />
    </div>
  );
}
