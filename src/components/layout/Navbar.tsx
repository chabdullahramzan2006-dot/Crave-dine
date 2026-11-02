"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock3, Menu, Phone, ShoppingBag, X } from "lucide-react";
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
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    document.body.style.overflow = "";
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNavClick = () => {
    setOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Classic top info strip */}
      <div className="hidden border-b border-white/10 bg-cd-red text-white md:block">
        <div className="container-site section-pad flex h-8 items-center justify-between text-[11px] font-medium tracking-wide">
          <p className="inline-flex items-center gap-1.5 text-white/90">
            <Clock3 className="h-3.5 w-3.5 text-cd-yellow" />
            Open Daily · 11:00 AM – 01:00 AM
          </p>
          <a
            href={formatPhoneLink(restaurantInfo.phones[0])}
            className="inline-flex items-center gap-1.5 transition hover:text-cd-yellow"
          >
            <Phone className="h-3.5 w-3.5 text-cd-yellow" />
            {restaurantInfo.phones[0]}
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div
        className={cn(
          "border-b border-[#e8dcc8] transition-all duration-300",
          scrolled || open
            ? "bg-[#fffaf2] shadow-[0_8px_24px_rgba(20,15,15,0.08)]"
            : "bg-[#fffaf2]/98 backdrop-blur-md"
        )}
      >
        <div className="container-site section-pad relative flex h-[3.85rem] items-center justify-between sm:h-[4.5rem]">
          {/* Brand */}
          <Link
            href="/"
            onClick={handleNavClick}
            className="group relative z-10 flex min-w-0 flex-col"
          >
            <span className="font-display text-[1.35rem] leading-none tracking-[0.06em] text-cd-ink sm:text-[1.65rem]">
              CRAVE{" "}
              <span className="text-cd-red">DINE</span>
            </span>
            <span className="mt-1 hidden text-[9px] font-semibold uppercase tracking-[0.28em] text-cd-muted sm:block">
              Your Taste, Our Passion
            </span>
          </Link>

          {/* Desktop links — centered classic restaurant style */}
          <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 lg:flex">
            {links.map((link, i) => {
              const active = pathname === link.href;
              return (
                <span key={link.href} className="flex items-center">
                  {i > 0 && (
                    <span className="mx-2 h-1 w-1 rounded-full bg-cd-yellow/90" aria-hidden />
                  )}
                  <Link
                    href={link.href}
                    onClick={handleNavClick}
                    className={cn(
                      "relative px-2.5 py-1 text-[12px] font-semibold uppercase tracking-[0.18em] transition",
                      active ? "text-cd-red" : "text-cd-ink/65 hover:text-cd-red"
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        "absolute inset-x-2 -bottom-0.5 h-px origin-left bg-cd-red transition-transform duration-300",
                        active ? "scale-x-100" : "scale-x-0"
                      )}
                    />
                  </Link>
                </span>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="relative z-10 flex items-center gap-2 sm:gap-3">
            <Link
              href="/menu"
              onClick={handleNavClick}
              className="hidden items-center border border-cd-red bg-cd-red px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:bg-cd-red-deep md:inline-flex"
            >
              Order Now
            </Link>

            <button
              type="button"
              onClick={openCart}
              className="relative inline-flex h-10 w-10 items-center justify-center border border-[#e0d2bc] bg-white text-cd-ink transition hover:border-cd-red hover:text-cd-red"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-4 w-4" />
              {totalItems > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-cd-red px-1 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center border border-[#e0d2bc] bg-white text-cd-ink transition hover:border-cd-red hover:text-cd-red lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Gold accent line */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-cd-yellow to-transparent" />
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-[3.85rem] z-40 bg-[#fffaf2] sm:top-[4.5rem] lg:hidden md:top-[calc(2rem+4.5rem)]"
          >
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="section-pad flex h-full flex-col overflow-y-auto pb-12 pt-8"
            >
              <p className="mb-6 text-center text-[10px] font-semibold uppercase tracking-[0.32em] text-cd-muted">
                Welcome to Crave Dine
              </p>

              <nav className="mx-auto flex w-full max-w-sm flex-col items-center gap-1">
                {links.map((link, index) => {
                  const active = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * index }}
                      className="w-full"
                    >
                      <Link
                        href={link.href}
                        onClick={handleNavClick}
                        className={cn(
                          "block border-b border-[#eadfcd] py-4 text-center font-display text-3xl tracking-wide transition",
                          active ? "text-cd-red" : "text-cd-ink"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="mx-auto mt-10 flex w-full max-w-sm flex-col gap-3">
                <a
                  href={formatPhoneLink(restaurantInfo.phones[0])}
                  className="inline-flex items-center justify-center gap-2 border border-[#e0d2bc] bg-white px-5 py-3.5 text-sm font-semibold text-cd-ink"
                >
                  <Phone className="h-4 w-4 text-cd-red" />
                  {restaurantInfo.phones[0]}
                </a>
                <Link
                  href="/menu"
                  onClick={handleNavClick}
                  className="inline-flex items-center justify-center bg-cd-red px-5 py-3.5 text-sm font-bold uppercase tracking-[0.16em] text-white"
                >
                  Order Now
                </Link>
                <p className="pt-2 text-center text-[11px] text-cd-muted">
                  Open Daily · 11:00 AM – 01:00 AM
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
