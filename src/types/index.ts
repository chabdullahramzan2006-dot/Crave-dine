export type PortionSize = "regular" | "small" | "medium" | "large";

export interface Category {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category_id: string;
  category_slug: string;
  /** Single / regular price when no size options */
  price_full: number;
  price_half: number | null;
  price_small: number | null;
  price_medium: number | null;
  price_large: number | null;
  image: string;
  featured?: boolean;
  bestseller?: boolean;
  available?: boolean;
}

export interface CartItem {
  id: string;
  menuItemId: string;
  name: string;
  image: string;
  portion: PortionSize;
  unitPrice: number;
  quantity: number;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export interface Order {
  id: string;
  customer_name: string;
  phone: string;
  address: string;
  notes: string | null;
  subtotal: number;
  total: number;
  status: OrderStatus;
  created_at: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id?: string;
  order_id?: string;
  menu_item_id: string | null;
  name: string;
  portion: string;
  unit_price: number;
  quantity: number;
  line_total: number;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  created_at?: string;
  read?: boolean;
}

export interface CheckoutPayload {
  customer_name: string;
  phone: string;
  address: string;
  notes?: string;
  items: Array<{
    menu_item_id: string;
    name: string;
    portion: PortionSize;
    unit_price: number;
    quantity: number;
  }>;
}

export interface Deal {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  badge: string;
  group: "single" | "two" | "family" | "special";
}
