import type { Metadata } from "next";
import { MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import { restaurantInfo } from "@/data/menu";
import { formatPhoneLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Crave Dine — phone, address, and message form. Shop G3-G4, Salam Center, Multan Road, Dokota.",
};

export default function ContactPage() {
  return (
    <div className="container-site section-pad pb-20 pt-28">
      <div className="mb-10 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cd-red">
          Get in Touch
        </p>
        <h1 className="mt-2 font-display text-4xl text-cd-ink sm:text-5xl">
          Contact Crave Dine
        </h1>
        <p className="mt-3 text-sm text-cd-muted sm:text-base">
          Call us for reservations and orders, or send a message — we respond
          quickly during opening hours.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-[1.6rem] border border-black/5 bg-white p-6">
            <h2 className="font-display text-2xl text-cd-ink">Reach Us</h2>
            <ul className="mt-4 space-y-3 text-sm text-cd-muted">
              {restaurantInfo.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={formatPhoneLink(phone)}
                    className="inline-flex items-center gap-2 font-medium text-cd-ink transition hover:text-cd-red"
                  >
                    <Phone className="h-4 w-4 text-cd-red" />
                    {phone}
                  </a>
                </li>
              ))}
              <li className="flex items-start gap-2 pt-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cd-red" />
                {restaurantInfo.address}
              </li>
            </ul>
          </div>

          <div className="overflow-hidden rounded-[1.6rem] border border-black/5 bg-white">
            <iframe
              title="Crave Dine location map"
              src={restaurantInfo.mapEmbed}
              className="h-72 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
