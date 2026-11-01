import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import type { CheckoutPayload } from "@/types";
import { randomUUID } from "crypto";

function validate(body: CheckoutPayload) {
  if (!body.customer_name?.trim()) return "Name is required";
  if (!body.phone?.trim() || body.phone.replace(/\D/g, "").length < 10)
    return "Valid phone number is required";
  if (!body.address?.trim()) return "Delivery address is required";
  if (!Array.isArray(body.items) || body.items.length === 0)
    return "Cart is empty";
  for (const item of body.items) {
    if (!item.name || !item.quantity || item.quantity < 1 || item.unit_price < 0)
      return "Invalid cart item";
  }
  return null;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckoutPayload;
    const error = validate(body);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const subtotal = body.items.reduce(
      (sum, item) => sum + item.unit_price * item.quantity,
      0
    );
    const total = subtotal;

    const supabase = createServiceClient();

    if (!supabase) {
      // Local / demo fallback when Supabase is not configured
      const orderId = `local-${randomUUID()}`;
      return NextResponse.json({
        orderId,
        mode: "local",
        message:
          "Order accepted in local demo mode. Configure Supabase to persist orders.",
      });
    }

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_name: body.customer_name.trim(),
        phone: body.phone.trim(),
        address: body.address.trim(),
        notes: body.notes?.trim() || null,
        subtotal,
        total,
        status: "pending",
      })
      .select("id")
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        { error: orderError?.message || "Failed to create order" },
        { status: 500 }
      );
    }

    const orderItems = body.items.map((item) => ({
      order_id: order.id,
      menu_item_id: item.menu_item_id || null,
      name: item.name,
      portion: item.portion,
      unit_price: item.unit_price,
      quantity: item.quantity,
      line_total: item.unit_price * item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      await supabase.from("orders").delete().eq("id", order.id);
      return NextResponse.json(
        { error: itemsError.message || "Failed to save order items" },
        { status: 500 }
      );
    }

    return NextResponse.json({ orderId: order.id, mode: "supabase" });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function GET() {
  const supabase = createServiceClient();
  if (!supabase) {
    return NextResponse.json({ orders: [], mode: "local" });
  }

  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ orders: data, mode: "supabase" });
}
