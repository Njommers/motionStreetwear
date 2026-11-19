import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Check, Loader2, Mail } from "lucide-react";
import { contactSchema, submitContact } from "@/lib/forms.functions";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { Field, inputCls } from "@/components/site/Field";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import { Socials } from "@/components/site/Socials";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Mandela Motion" },
      { name: "description", content: "Get in touch with Mandela Motion: orders, wholesale, collaborations and press. Email, WhatsApp or send an enquiry." },
      { property: "og:title", content: "Contact — Mandela Motion" },
      { property: "og:description", content: "Orders, wholesale, collabs and press enquiries." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Contact,
});

const TYPES = [
  { value: "general", label: "General question" },
  { value: "order", label: "An existing order" },
  { value: "wholesale", label: "Wholesale / stockist" },
  { value: "collab", label: "Collaboration" },
  { value: "press", label: "Press & media" },
] as const;

type FormState = { name: string; email: string; phone: string; enquiryType: (typeof TYPES)[number]["value"]; message: string; website: string };
const empty: FormState = { name: "", email: "", phone: "", enquiryType: "general", message: "", website: "" };

function Contact() {
  const send = useServerFn(submitContact);
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const i of parsed.error.issues) errs[String(i.path[0])] ??= i.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setState("loading");
    try {
      await send({ data: parsed.data });
      setState("done");
      setForm(empty);
    } catch {
      setState("error");
    }
  };

  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-28 pt-36 md:px-10">
      <p className="label-mono text-primary">Get in touch</p>
      <h1 className="mt-3 font-display text-[19vw] uppercase leading-[0.82] md:text-[10rem]">Holla <span className="text-chrome">at us</span></h1>

      <div className="mt-16 grid gap-12 lg:grid-cols-12">
        <aside className="space-y-6 lg:col-span-5">
          <a href={`mailto:${siteConfig.businessEmail}`} className="group block rounded-lg border border-border bg-card p-6 transition-colors hover:border-chrome" data-reveal>
            <Mail className="h-6 w-6 text-primary" />
            <p className="label-mono mt-4 text-muted-foreground">Email</p>
            <p className="mt-1 break-all font-display text-2xl uppercase group-hover:text-chrome md:text-3xl">{siteConfig.businessEmail}</p>
          </a>
          <a href={whatsappLink(`Hi ${siteConfig.brand}!`)} target="_blank" rel="noopener noreferrer" className="group block rounded-lg border border-border bg-card p-6 transition-colors hover:border-whatsapp" data-reveal>
            <WhatsAppIcon className="h-6 w-6 text-whatsapp" />
            <p className="label-mono mt-4 text-muted-foreground">WhatsApp — fastest for orders</p>
            <p className="mt-1 font-display text-2xl uppercase group-hover:text-whatsapp md:text-3xl">Chat with us</p>
          </a>
          <div className="rounded-lg border border-border bg-card p-6" data-reveal>
            <p className="label-mono text-muted-foreground">Socials</p>
            <Socials className="mt-4" />
          </div>
          <div className="rounded-lg border border-border bg-ink p-6" data-reveal>
            <p className="label-mono text-primary">Newsletter</p>
            <p className="mt-2 font-display text-2xl uppercase">Early access & exclusive drops</p>
            <NewsletterForm source="contact" className="mt-4" />
          </div>
        </aside>

        <div className="lg:col-span-7">
          {state === "done" ? (
            <div role="status" className="flex h-full flex-col items-center justify-center rounded-lg border border-border bg-card p-12 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="h-8 w-8" /></span>
              <h2 className="mt-6 font-display text-5xl uppercase">Message received</h2>
              <p className="mt-3 max-w-md text-silver">Thanks for reaching out — we'll get back to you soon. Need a faster answer? WhatsApp us.</p>
              <button onClick={() => setState("idle")} className="label-mono mt-8 rounded-full border border-border px-6 py-3 hover:border-chrome">Send another</button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-lg border border-border bg-card p-6 md:p-10">
              <h2 className="font-display text-4xl uppercase">Send an enquiry</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" error={errors["name"]}><input className={inputCls} value={form.name} onChange={set("name")} autoComplete="name" maxLength={100} /></Field>
                <Field label="Email" error={errors["email"]}><input className={inputCls} type="email" value={form.email} onChange={set("email")} autoComplete="email" maxLength={255} /></Field>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Phone (optional)" error={errors["phone"]}><input className={inputCls} value={form.phone} onChange={set("phone")} autoComplete="tel" maxLength={30} /></Field>
                <Field label="Enquiry type">
                  <select className={inputCls} value={form.enquiryType} onChange={set("enquiryType")}>
                    {TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Message" error={errors["message"]}><textarea className={inputCls} rows={6} value={form.message} onChange={set("message")} maxLength={2000} /></Field>
              <input tabIndex={-1} autoComplete="off" aria-hidden className="hidden" name="website" value={form.website} onChange={set("website")} />
              {state === "error" && <p className="text-sm text-primary" role="alert">We couldn't send your message. Please try again or WhatsApp us.</p>}
              <button type="submit" disabled={state === "loading"} className="label-mono flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 text-primary-foreground shadow-glow disabled:opacity-60">
                {state === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending</> : "Send message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
