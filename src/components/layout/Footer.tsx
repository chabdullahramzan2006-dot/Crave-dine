import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import CraveLogo from "@/components/brand/CraveLogo";
import { restaurantInfo } from "@/data/menu";
import { formatPhoneLink } from "@/lib/utils";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 4.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm5.2-.9a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1zM12 9.5A2.5 2.5 0 1 1 9.5 12 2.5 2.5 0 0 1 12 9.5z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-black/5 bg-cd-ink text-white">
      <div className="container-site section-pad grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <CraveLogo variant="light" size="md" showTagline />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
            Pizzas, burgers, wraps, shakes, and loaded deals — fresh every day
            till 1 AM.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-cd-yellow hover:text-cd-ink"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-cd-yellow hover:text-cd-ink"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-cd-yellow">
            Explore
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {[
              ["/", "Home"],
              ["/menu", "Menu"],
              ["/about", "About Us"],
              ["/contact", "Contact"],
              ["/cart", "Cart"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="transition hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-cd-yellow">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            {restaurantInfo.phones.map((phone) => (
              <li key={phone}>
                <a
                  href={formatPhoneLink(phone)}
                  className="inline-flex items-center gap-2 transition hover:text-white"
                >
                  <Phone className="h-4 w-4 text-cd-yellow" />
                  {phone}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-cd-yellow">
            Visit Us
          </h3>
          <p className="mt-4 inline-flex items-start gap-2 text-sm leading-relaxed text-white/70">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cd-yellow" />
            {restaurantInfo.address}
          </p>
          <div className="mt-4 space-y-1 text-sm text-white/60">
            {restaurantInfo.hours.map((h) => (
              <p key={h.day}>
                <span className="text-white/85">{h.day}:</span> {h.time}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/45">
        © {new Date().getFullYear()} Crave Dine. All rights reserved.
      </div>
    </footer>
  );
}
