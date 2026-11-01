import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(amount: number) {
  return `Rs. ${amount.toLocaleString("en-PK")}`;
}

export function formatPhoneLink(phone: string) {
  return `tel:${phone.replace(/[^0-9+]/g, "")}`;
}
