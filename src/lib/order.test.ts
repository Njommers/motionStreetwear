import { describe, expect, it } from "vitest";
import { buildOrderMessage, cartTotal, makeOrderReference } from "./order";
import { getProduct } from "./products";

const hoodie = getProduct("long-live-dr-hoodie")!;
const cap = getProduct("mm-tour-trucker-cap")!;

describe("order", () => {
  it("totals price x quantity across lines from the product list", () => {
    const total = cartTotal([
      { slug: hoodie.slug, size: "L", color: "Black", qty: 2 },
      { slug: cap.slug, size: "One size", color: "Black / White", qty: 1 },
    ]);
    expect(total).toBe(hoodie.price * 2 + cap.price);
  });

  it("ignores unknown products in the total", () => {
    expect(cartTotal([{ slug: "fake", size: "M", color: "Red", qty: 5 }])).toBe(0);
  });

  it("WhatsApp message lists product, size, quantity, total and customer details", () => {
    const msg = buildOrderMessage(
      "MM-TEST01",
      [{ slug: hoodie.slug, size: "XL", color: "Black", qty: 3 }],
      { name: "Thabo M", phone: "0821234567", address: "12 Vilakazi St, Soweto" },
    );
    expect(msg).toContain("Long Live DR Hoodie");
    expect(msg).toContain("Size: XL");
    expect(msg).toContain("Qty: 3");
    expect(msg).toContain(`ORDER TOTAL: R ${(hoodie.price * 3).toLocaleString("en-ZA")}`);
    expect(msg).toContain("Name: Thabo M");
    expect(msg).toContain("Phone: 0821234567");
    expect(msg).toContain("Delivery address: 12 Vilakazi St, Soweto");
    expect(msg).toContain("Order ref: MM-TEST01");
  });

  it("order references look like MM-XXXXXX", () => {
    expect(makeOrderReference()).toMatch(/^MM-[A-Z2-9]{6}$/);
  });
});
