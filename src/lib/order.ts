import { getProduct } from "./products";
import { formatZAR, siteConfig } from "./site-config";

export type CartLine = { slug: string; size: string; color: string; qty: number };

export type Customer = {
  name: string;
  phone: string;
  email?: string;
  address: string;
  notes?: string;
};

export const MAX_QTY = 20;

export function lineKey(l: Pick<CartLine, "slug" | "size" | "color">) {
  return `${l.slug}__${l.size}__${l.color}`;
}

/** Price is always looked up from the product list, never trusted from the browser. */
export function lineTotal(l: CartLine) {
  const p = getProduct(l.slug);
  return p ? p.price * l.qty : 0;
}

export function cartTotal(lines: CartLine[]) {
  return lines.reduce((sum, l) => sum + lineTotal(l), 0);
}

export function cartCount(lines: CartLine[]) {
  return lines.reduce((sum, l) => sum + l.qty, 0);
}

export function makeOrderReference(random: () => number = Math.random) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i++) out += chars[Math.floor(random() * chars.length)];
  return `MM-${out}`;
}

export function buildOrderMessage(reference: string, lines: CartLine[], customer: Customer) {
  const items = lines
    .map((l, i) => {
      const p = getProduct(l.slug);
      if (!p) return null;
      return `${i + 1}. ${p.name}\n   Size: ${l.size} | Colour: ${l.color} | Qty: ${l.qty}\n   ${formatZAR(p.price)} each = ${formatZAR(p.price * l.qty)}`;
    })
    .filter(Boolean)
    .join("\n");

  return [
    `Hi ${siteConfig.brand}! I'd like to place an order.`,
    `Order ref: ${reference}`,
    "",
    "ITEMS",
    items,
    "",
    `ORDER TOTAL: ${formatZAR(cartTotal(lines))}`,
    "",
    "MY DETAILS",
    `Name: ${customer.name}`,
    `Phone: ${customer.phone}`,
    customer.email ? `Email: ${customer.email}` : null,
    `Delivery address: ${customer.address}`,
    customer.notes ? `Notes: ${customer.notes}` : null,
  ]
    .filter((x) => x !== null)
    .join("\n");
}
