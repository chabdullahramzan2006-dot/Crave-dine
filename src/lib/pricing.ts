import type { MenuItem, PortionSize } from "@/types";

export function getSizeOptions(item: MenuItem): Array<{
  size: PortionSize;
  label: string;
  price: number;
}> {
  const options: Array<{ size: PortionSize; label: string; price: number }> = [];

  if (item.price_small != null) {
    options.push({ size: "small", label: "S", price: item.price_small });
  }
  if (item.price_medium != null) {
    options.push({ size: "medium", label: "M", price: item.price_medium });
  }
  if (item.price_large != null) {
    options.push({ size: "large", label: "L", price: item.price_large });
  }

  if (options.length === 0) {
    options.push({ size: "regular", label: "Reg", price: item.price_full });
  }

  return options;
}

export function getPriceForSize(item: MenuItem, size: PortionSize): number {
  if (size === "small" && item.price_small != null) return item.price_small;
  if (size === "medium" && item.price_medium != null) return item.price_medium;
  if (size === "large" && item.price_large != null) return item.price_large;
  return item.price_full;
}

export function defaultSize(item: MenuItem): PortionSize {
  return getSizeOptions(item)[0]?.size ?? "regular";
}

export function portionLabel(size: PortionSize): string {
  switch (size) {
    case "small":
      return "Small";
    case "medium":
      return "Medium";
    case "large":
      return "Large";
    default:
      return "Regular";
  }
}
