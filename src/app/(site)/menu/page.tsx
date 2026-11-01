import type { Metadata } from "next";
import MenuClient from "@/components/menu/MenuClient";
import { getCategories, getMenuItems } from "@/lib/menu-service";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Browse the complete Crave Dine menu — BBQ, Shanwari kitchen, chicken & mutton dishes, Chinese, rice, snacks, and beverages.",
};

export default async function MenuPage() {
  const [categories, items] = await Promise.all([
    getCategories(),
    getMenuItems(),
  ]);

  return <MenuClient categories={categories} items={items} />;
}
