import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { createServiceClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Order Confirmed",
};

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createServiceClient();

  let order: {
    id: string;
    customer_name: string;
    phone: string;
    address: string;
    total: number;
    status: string;
    created_at: string;
  } | null = null;

  if (supabase && !id.startsWith("local-")) {
    const { data } = await supabase
      .from("orders")
      .select("id, customer_name, phone, address, total, status, created_at")
      .eq("id", id)
      .maybeSingle();
    order = data;
  }

  return (
    <div className="container-site section-pad flex min-h-[70vh] items-center justify-center pb-20 pt-28">
      <div className="w-full max-w-lg rounded-[1.8rem] border border-black/5 bg-white p-8 text-center shadow-[0_20px_60px_rgba(20,15,15,0.06)]">
        <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" />
        <h1 className="mt-4 font-display text-3xl text-cd-ink">
          Order Confirmed
        </h1>
        <p className="mt-2 text-sm text-cd-muted">
          Thank you{order ? `, ${order.customer_name}` : ""}! We’ve received your
          order and will contact you shortly.
        </p>

        <div className="mt-6 rounded-2xl bg-cd-cream px-4 py-4 text-left text-sm">
          <p>
            <span className="text-cd-muted">Order ID:</span>{" "}
            <span className="break-all font-semibold">{id}</span>
          </p>
          {order && (
            <>
              <p className="mt-2">
                <span className="text-cd-muted">Total:</span>{" "}
                <span className="font-bold text-cd-red">
                  {formatPrice(Number(order.total))}
                </span>
              </p>
              <p className="mt-2">
                <span className="text-cd-muted">Status:</span>{" "}
                <span className="font-semibold capitalize">{order.status}</span>
              </p>
              <p className="mt-2">
                <span className="text-cd-muted">Phone:</span> {order.phone}
              </p>
            </>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link href="/menu" className="btn-primary">
            Order More
          </Link>
          <Link href="/" className="btn-secondary">
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
