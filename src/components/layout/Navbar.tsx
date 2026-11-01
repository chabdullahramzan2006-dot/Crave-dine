"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, ShoppingBag, X } from "lucide-react";
import CraveLogo from "@/components/brand/CraveLogo";
import { useCartStore } from "@/store/cart";
import { restaurantInfo } from "@/data/menu";
import { cn, formatPhoneLink } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());
  const openCart = useCartStore((s) => s.openCart);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
        scrolled || open
          ? "border-cd-red/10 bg-[#fffdf8] shadow-[0_10px_30px_rgba(20,15,15,0.08)]"
          : "border-cd-red/10 bg-[#fffdf8]/95 backdrop-blur-md"
      )}
    >
      <div className="container-site section-pad flex h-[4.5rem] items-center justify-between lg:h-[4.75rem]">
        <Link href="/" className="transition hover:opacity-90">
          <CraveLogo variant="dark" size="md" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-[13px] font-semibold tracking-[0.04em] transition",
                  active
                    ? "text-cd-red"
                    : "text-cd-ink/75 hover:text-cd-red"
                )}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute inset-x-4 -bottom-0.5 h-[2px] rounded-full bg-cd-yellow"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={formatPhoneLink(restaurantInfo.phones[0])}
            className="hidden items-center gap-2 rounded-full border border-cd-red/20 bg-white px-3.5 py-2 text-xs font-semibold text-cd-red transition hover:border-cd-red/40 hover:bg-cd-cream xl:inline-flex"
          >
            <Phone className="h-3.5 w-3.5" />
            {restaurantInfo.phones[0]}
          </a>

          <Link
            href="/menu"
            className="hidden items-center rounded-full bg-cd-red px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-cd-red-deep md:inline-flex"
          >
            Order Now
          </Link>

          <button
            type="button"
            onClick={openCart}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-cd-ink text-white transition hover:bg-cd-red"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-4 w-4" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-cd-yellow px-1 text-[10px] font-bold text-cd-ink">
                {totalItems}
              </span>
            )}
          </button>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cd-red/15 bg-white text-cd-ink transition hover:bg-cd-cream lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-cd-red/10 bg-[#fffdf8] lg:hidden"
          >
            <div className="section-pad flex flex-col gap-1 py-5">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-2xl px-4 py-3.5 text-sm font-semibold tracking-wide",
                    pathname === link.href
                      ? "bg-cd-red text-white"
                      : "text-cd-ink hover:bg-cd-yellow/35"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 grid gap-2">
                <a
                  href={formatPhoneLink(restaurantInfo.phones[0])}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-cd-red/15 bg-white px-6 py-3 text-sm font-semibold text-cd-red"
                >
                  <Phone className="h-4 w-4" />
                  Call {restaurantInfo.phones[0]}
                </a>
                <Link href="/menu" className="btn-primary">
                  Order Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
