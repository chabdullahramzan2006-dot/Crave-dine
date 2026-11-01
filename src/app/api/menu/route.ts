import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { createClient } from "@/lib/supabase/server";
import { categories, menuItems } from "@/data/menu";

export async function GET() {
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ categories, items: menuItems, mode: "local" });
  }

  const [{ data: cats }, { data: items }] = await Promise.all([
    supabase.from("categories").select("*").order("sort_order"),
    supabase.from("menu_items").select("*").order("name"),
  ]);

  return NextResponse.json({
    categories: cats?.length ? cats : categories,
    items: items?.length ? items : menuItems,
    mode: cats?.length ? "supabase" : "local",
  });
}

export async function PATCH(request: Request) {
  const supabase = createServiceClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase service role is not configured" },
      { status: 503 }
    );
  }

  const body = await request.json();
  const { id, ...updates } = body;
  if (!id) {
    return NextResponse.json({ error: "Menu item id is required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("menu_items")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ item: data });
}
