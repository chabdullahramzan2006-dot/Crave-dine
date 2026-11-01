import type { Metadata } from "next";
import CheckoutForm from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your Crave Dine order with delivery details.",
};

export default function CheckoutPage() {
  return (
    <div className="container-site section-pad pb-20 pt-28">
      <h1 className="font-display text-4xl text-cd-ink">Checkout</h1>
      <p className="mt-2 mb-8 text-sm text-cd-muted">
        Enter your details and confirm your order.
      </p>
      <CheckoutForm />
    </div>
  );
}
