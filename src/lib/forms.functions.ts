import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";
import { cartTotal, MAX_QTY } from "./order";
import { getProduct } from "./products";

function publicClient() {
  const url = process.env["SUPABASE_URL"]!;
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(url, key, {
    auth: { persistSession: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

const honeypot = z.string().max(0).optional().default("");

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(30).optional().default(""),
  enquiryType: z.enum(["general", "order", "wholesale", "collab", "press"]),
  message: z.string().trim().min(5, "Tell us a bit more").max(2000),
  website: honeypot,
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => contactSchema.parse(d))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true };
    const { error } = await publicClient().from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      enquiry_type: data.enquiryType,
      message: data.message,
    });
    if (error) {
      console.error("contact insert failed", error);
      throw new Error("We couldn't send your message. Please try again or WhatsApp us.");
    }
    return { ok: true };
  });

export const newsletterSchema = z.object({
  email: z.string().trim().toLowerCase().email("Please enter a valid email").max(255),
  source: z.string().trim().max(40).optional().default("website"),
  website: honeypot,
});

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => newsletterSchema.parse(d))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true, already: false };
    const { error } = await publicClient()
      .from("newsletter_subscribers")
      .insert({ email: data.email, source: data.source });
    if (error) {
      if (error.code === "23505") return { ok: true, already: true };
      console.error("newsletter insert failed", error);
      throw new Error("We couldn't add you right now. Please try again.");
    }
    return { ok: true, already: false };
  });

export const orderSchema = z.object({
  reference: z.string().regex(/^MM-[A-Z2-9]{6}$/),
  customer: z.object({
    name: z.string().trim().min(1).max(100),
    phone: z.string().trim().min(5).max(30),
    email: z.string().trim().email().max(255).optional().or(z.literal("")),
    address: z.string().trim().min(5).max(500),
    notes: z.string().trim().max(500).optional().default(""),
  }),
  lines: z
    .array(
      z.object({
        slug: z.string().max(80),
        size: z.string().max(20),
        color: z.string().max(40),
        qty: z.number().int().min(1).max(MAX_QTY),
      }),
    )
    .min(1)
    .max(30),
});

export const recordOrder = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => orderSchema.parse(d))
  .handler(async ({ data }) => {
    const lines = data.lines.filter((l) => {
      const p = getProduct(l.slug);
      return p && p.sizes.includes(l.size) && p.colors.includes(l.color);
    });
    if (lines.length === 0) throw new Error("Your cart has no valid items.");
    const items = lines.map((l) => {
      const p = getProduct(l.slug)!;
      return { ...l, name: p.name, unit_price: p.price };
    });
    const { error } = await publicClient().from("orders").insert({
      reference: data.reference,
      customer_name: data.customer.name,
      customer_phone: data.customer.phone,
      customer_email: data.customer.email || null,
      delivery_address: data.customer.address,
      notes: data.customer.notes || null,
      items,
      total_zar: cartTotal(lines),
    });
    if (error) {
      console.error("order insert failed", error);
      throw new Error("Order record failed");
    }
    return { ok: true };
  });
