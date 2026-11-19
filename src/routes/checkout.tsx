import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { Check } from "lucide-react";
import { useCart } from "@/lib/cart";
import { buildOrderMessage, lineKey, lineTotal, makeOrderReference, type Customer } from "@/lib/order";
import { getProduct } from "@/lib/products";
import { formatZAR, whatsappLink } from "@/lib/site-config";
import { recordOrder } from "@/lib/forms.functions";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { Field, inputCls } from "@/components/site/Field";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Mandela Motion" },
      { name: "description", content: "Enter your details and send your Mandela Motion order straight to us on WhatsApp." },
      { property: "og:title", content: "Checkout — Mandela Motion" },
      { property: "og:description", content: "Send your order on WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  phone: z.string().trim().regex(/^[+\d][\d\s()-]{6,24}$/, "Please enter a valid phone number"),
  email: z.union([z.literal(""), z.string().trim().email("Please enter a valid email").max(255)]),
  address: z.string().trim().min(5, "Please enter your delivery address").max(500),
  notes: z.string().trim().max(500),
});

type Form = z.infer<typeof schema>;

function Checkout() {
  const { lines, total, clear } = useCart();
  const saveOrder = useServerFn(recordOrder);
  const [form, setForm] = useState<Form>({ name: "", phone: "", email: "", address: "", notes: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [done, setDone] = useState<{ ref: string; url: string; total: number } | null>(null);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: Partial<Record<keyof Form, string>> = {};
      for (const issue of parsed.error.issues) errs[issue.path[0] as keyof Form] ??= issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    const ref = makeOrderReference();
    const c = parsed.data;
    const customer: Customer = { name: c.name, phone: c.phone, address: c.address };
    if (c.email) customer.email = c.email;
    if (c.notes) customer.notes = c.notes;
    const url = whatsappLink(buildOrderMessage(ref, lines, customer));
    // Open WhatsApp synchronously inside the click so pop-up blockers allow it.
    window.open(url, "_blank", "noopener");
    // Keep a copy of the order for the owner; WhatsApp remains the primary channel.
    saveOrder({ data: { reference: ref, customer: { ...c }, lines } }).catch((err) => console.error(err));
    setDone({ ref, url, total });
    clear();
    window.scrollTo({ top: 0 });
  };

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-5 pb-28 pt-40 text-center">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground"><Check className="h-9 w-9" /></span>
        <p className="label-mono mt-8 text-primary">Order ref {done.ref}</p>
        <h1 className="mt-3 font-display text-6xl uppercase leading-none md:text-7xl">Almost <span className="text-chrome">yours</span></h1>
        <p className="mt-6 text-silver">
          WhatsApp has opened with your full order ({formatZAR(done.total)}). Hit <strong className="text-foreground">send</strong> and we'll confirm payment and delivery with you there.
        </p>
        <a href={done.url} target="_blank" rel="noopener noreferrer" className="label-mono mt-8 inline-flex items-center gap-2 rounded-full bg-whatsapp px-7 py-4 text-whatsapp-foreground">
          <WhatsAppIcon className="h-4 w-4" /> WhatsApp didn't open? Tap here
        </a>
        <div className="mt-6"><Link to="/shop" className="label-mono text-silver hover:text-chrome">Keep shopping →</Link></div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-5 pb-28 pt-40 text-center">
        <h1 className="font-display text-6xl uppercase">Your bag is empty</h1>
        <Link to="/shop" className="label-mono mt-8 inline-flex rounded-full bg-primary px-7 py-4 text-primary-foreground">Shop the collection</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-28 pt-36 md:px-10">
      <p className="label-mono text-primary">Step 2 of 2</p>
      <h1 className="mt-3 font-display text-7xl uppercase leading-none md:text-9xl">Check<span className="text-chrome">out</span></h1>
      <div className="mt-12 grid gap-10 lg:grid-cols-12">
        <form onSubmit={onSubmit} noValidate className="space-y-5 lg:col-span-7">
          <h2 className="font-display text-3xl uppercase">Your details</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full name" error={errors.name}><input className={inputCls} value={form.name} onChange={set("name")} autoComplete="name" maxLength={100} /></Field>
            <Field label="Phone / WhatsApp" error={errors.phone}><input className={inputCls} value={form.phone} onChange={set("phone")} autoComplete="tel" inputMode="tel" maxLength={30} placeholder="082 123 4567" /></Field>
          </div>
          <Field label="Email (optional)" error={errors.email}><input className={inputCls} type="email" value={form.email} onChange={set("email")} autoComplete="email" maxLength={255} /></Field>
          <Field label="Delivery address" error={errors.address}><textarea className={inputCls} rows={3} value={form.address} onChange={set("address")} autoComplete="street-address" maxLength={500} placeholder="Street, suburb, city, postal code" /></Field>
          <Field label="Order notes (optional)" error={errors.notes}><textarea className={inputCls} rows={2} value={form.notes} onChange={set("notes")} maxLength={500} placeholder="Collection, delivery timing, anything else" /></Field>
          <button type="submit" className="label-mono flex w-full items-center justify-center gap-3 rounded-full bg-whatsapp py-5 text-sm text-whatsapp-foreground transition-transform hover:scale-[1.01]">
            <WhatsAppIcon className="h-5 w-5" /> Send order on WhatsApp — {formatZAR(total)}
          </button>
          <p className="text-xs text-muted-foreground">Your order opens in WhatsApp as a ready-to-send message. Payment and delivery are confirmed with you in the chat.</p>
        </form>
        <aside className="h-fit rounded-lg border border-border bg-card p-6 lg:sticky lg:top-28 lg:col-span-5">
          <h2 className="font-display text-3xl uppercase">Order summary</h2>
          <ul className="mt-6 divide-y divide-border">
            {lines.map((l) => {
              const p = getProduct(l.slug);
              if (!p) return null;
              return (
                <li key={lineKey(l)} className="flex items-center gap-4 py-4">
                  <img src={p.images[0]?.src} alt="" className="h-16 w-14 shrink-0 rounded bg-ink object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-lg uppercase">{p.name}</p>
                    <p className="label-mono text-muted-foreground">{l.size} · {l.color} · ×{l.qty}</p>
                  </div>
                  <p className="font-mono text-sm">{formatZAR(lineTotal(l))}</p>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
            <span className="label-mono">Total</span>
            <span className="font-display text-3xl">{formatZAR(total)}</span>
          </div>
          <Link to="/cart" className="label-mono mt-4 inline-block text-silver hover:text-chrome">← Edit bag</Link>
        </aside>
      </div>
    </div>
  );
}
