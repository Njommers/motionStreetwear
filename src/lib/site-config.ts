/**
 * ============================================================
 *  MANDELA MOTION — SITE SETTINGS (edit these values)
 * ============================================================
 *  Everything marked PLACEHOLDER must be replaced with the real
 *  details before publishing. Prices live in src/lib/products.ts.
 */

export const siteConfig = {
  brand: "Mandela Motion",
  tagline: "In Mandela We Trust",
  city: "Johannesburg",

  /**
   * PLACEHOLDER — WhatsApp Business number that receives orders.
   * International format, digits only, no "+" or spaces.
   * Example for 082 123 4567 in South Africa: "27821234567"
   */
  whatsappNumber: "27000000000",

  /** PLACEHOLDER — public business email shown on the site. */
  businessEmail: "hello@mandelamotion.co.za",

  currency: "ZAR",

  /**
   * PLACEHOLDER — social links. Leave url empty ("") until the real link
   * is ready; the site then shows the platform as "coming soon".
   */
  socials: [
    { name: "Instagram", handle: "@mandelamotion", url: "" },
    { name: "TikTok", handle: "@mandelamotion", url: "" },
    { name: "X / Twitter", handle: "@mandelamotion", url: "" },
    { name: "Facebook", handle: "Mandela Motion", url: "" },
  ],
} as const;

export function instagram() {
  return siteConfig.socials[0];
}

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function formatZAR(amount: number) {
  return `R ${amount.toLocaleString("en-ZA", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}
