import { categories as localCategories, menuItems as localMenu } from "@/data/menu";
import type { Category, MenuItem } from "@/types";
import { createClient } from "@/lib/supabase/server";

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();
  if (!supabase) return localCategories;

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data?.length) return localCategories;
  return data as Category[];
}

export async function getMenuItems(): Promise<MenuItem[]> {
  const supabase = await createClient();
  if (!supabase) return localMenu;

  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .eq("available", true)
    .order("name", { ascending: true });

  if (error || !data?.length) return localMenu;
  return data as MenuItem[];
}

export async function getFeaturedItems(): Promise<MenuItem[]> {
  const items = await getMenuItems();
  const featured = items.filter((i) => i.featured || i.bestseller);
  return featured.slice(0, 8);
}
