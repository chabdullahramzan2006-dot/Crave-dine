import type { Metadata } from "next";
import Image from "next/image";
import { Heart, Leaf, UtensilsCrossed } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Discover the story behind Crave Dine — passion for authentic flavours, quality ingredients, and warm hospitality.",
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <section className="relative h-[48vh] min-h-[320px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=80"
          alt="Crave Dine dining atmosphere"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cd-ink/85 via-cd-ink/55 to-transparent" />
        <div className="container-site section-pad relative flex h-full items-end pb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cd-yellow">
              Our Story
            </p>
            <h1 className="mt-2 font-display text-4xl text-white sm:text-5xl">
              About Crave Dine
            </h1>
          </div>
        </div>
      </section>

      <section className="container-site section-pad py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl text-cd-ink sm:text-4xl">
              Passion served daily
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-cd-muted sm:text-base">
              Crave Dine was built around one simple promise:{" "}
              <strong className="text-cd-ink">Your Taste, Our Passion.</strong>{" "}
              From signature pizzas and juicy burgers to wraps, pasta, shakes,
              and loaded family deals — every order is prepared fresh with care.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-cd-muted sm:text-base">
              Located near Elahi College on Multan Road, Dokota, we welcome
              families, friends, and late-night food lovers looking for generous
              portions and memorable hospitality.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
            <Image
              src="https://images.unsplash.com/photo-1555939596-39aa12302552?auto=format&fit=crop&w=1200&q=80"
              alt="Fresh grilled food platter"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: UtensilsCrossed,
              title: "Crafted Flavours",
              text: "Pizzas, burgers, wraps, and cafe classics made to order.",
            },
            {
              icon: Leaf,
              title: "Fresh Ingredients",
              text: "Quality meats, spices, and produce prepared fresh throughout the day.",
            },
            {
              icon: Heart,
              title: "Warm Hospitality",
              text: "A welcoming table for dine-in, takeaway, and online orders.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-[1.6rem] border border-black/5 bg-white p-6"
            >
              <card.icon className="h-6 w-6 text-cd-red" />
              <h3 className="mt-4 font-display text-xl text-cd-ink">
                {card.title}
              </h3>
              <p className="mt-2 text-sm text-cd-muted">{card.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
