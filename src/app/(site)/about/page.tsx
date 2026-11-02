import type { Metadata } from "next";
import AboutContent from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Discover the story behind Crave Dine — passion for authentic flavours, quality ingredients, and warm hospitality on Multan Road, Dokota.",
};

export default function AboutPage() {
  return <AboutContent />;
}
