"use client";

import { MessageCircle } from "lucide-react";
import { restaurantInfo } from "@/data/menu";

export default function WhatsAppButton() {
  const href = `https://wa.me/${restaurantInfo.whatsapp}?text=${encodeURIComponent(
    "Assalam o Alaikum! I would like to place an order from Crave Dine."
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(37,211,102,0.45)] transition hover:scale-105 hover:bg-[#1ebe5d]"
      aria-label="Order on WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp Order</span>
    </a>
  );
}
