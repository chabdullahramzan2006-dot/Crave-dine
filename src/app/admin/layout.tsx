import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardList, LayoutDashboard, MessageSquare, UtensilsCrossed } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Orders", icon: ClipboardList },
  { href: "/admin/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f4efe6]">
      <header className="border-b border-black/5 bg-cd-ink text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/admin" className="font-display text-xl tracking-wide">
            CRAVE <span className="text-cd-yellow">ADMIN</span>
          </Link>
          <Link href="/" className="text-xs font-semibold uppercase tracking-wide text-white/70 hover:text-cd-yellow">
            View Site
          </Link>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[220px_1fr]">
        <aside className="h-fit rounded-2xl border border-black/5 bg-white p-3">
          <nav className="space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-cd-ink transition hover:bg-cd-cream"
              >
                <link.icon className="h-4 w-4 text-cd-red" />
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
}
