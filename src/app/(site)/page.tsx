import Hero from "@/components/home/Hero";
import FeaturedDishes from "@/components/home/FeaturedDishes";
import DealsSection from "@/components/home/DealsSection";
import Testimonials from "@/components/home/Testimonials";
import InfoHours from "@/components/home/InfoHours";
import { getFeaturedItems } from "@/lib/menu-service";

export default async function HomePage() {
  const featured = await getFeaturedItems();

  return (
    <>
      <Hero />
      <FeaturedDishes items={featured} />
      <DealsSection />
      <Testimonials />
      <InfoHours />
    </>
  );
}
