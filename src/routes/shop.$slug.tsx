import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { getProduct, products } from "@/lib/products";
import { formatZAR, siteConfig, whatsappLink } from "@/lib/site-config";
import { useCart } from "@/lib/cart";
import { MAX_QTY } from "@/lib/order";
import { ProductCard } from "@/components/site/ProductCard";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { slug: product.slug };
  },
  head: ({ loaderData }) => {
    const p = loaderData ? getProduct(loaderData.slug) : undefined;
    if (!p) return { meta: [{ title: "Product not found — Mandela Motion" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${p.name} — Mandela Motion` },
        { name: "description", content: `${p.description} ${formatZAR(p.price)}. Order on WhatsApp.` },
        { property: "og:title", content: `${p.name} — Mandela Motion` },
        { property: "og:description", content: p.description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-5 pb-32 pt-40 text-center">
      <h1 className="font-display text-6xl uppercase">Not in this drop</h1>
      <p className="mt-4 text-silver">That piece doesn't exist or has sold out.</p>
      <Link to="/shop" className="label-mono mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-primary-foreground">Back to shop</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useLoaderData();
  const product = getProduct(slug)!;
  const { add, setOpen } = useCart();
  const [active, setActive] = useState(0);
  const [size, setSize] = useState<string | null>(product.sizes.length === 1 ? product.sizes[0]! : null);
  const [color, setColor] = useState(product.colors[0]!);
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const img = product.images[active] ?? product.images[0]!;

  const onAdd = () => {
    if (!size) {
      setSizeError(true);
      return;
    }
    add({ slug: product.slug, size, color, qty });
    toast.success(`${product.name} added`, { description: `${size} · ${color} · Qty ${qty}`, action: { label: "View bag", onClick: () => setOpen(true) } });
  };

  const quickMsg = `Hi ${siteConfig.brand}! I'd like to order:\n${product.name}\nSize: ${size ?? "(not sure yet)"} | Colour: ${color} | Qty: ${qty}\n${formatZAR(product.price * qty)}`;
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-28 md:px-10">
      <Link to="/shop" className="label-mono inline-flex items-center gap-2 text-silver hover:text-chrome">
        <ArrowLeft className="h-4 w-4" /> All products
      </Link>
      <div className="mt-8 grid gap-10 lg:grid-cols-12">
        {/* Gallery */}
        <div className="lg:col-span-7">
          <div
            className="relative aspect-[4/5] cursor-zoom-in overflow-hidden rounded-lg border border-border bg-ink"
            onPointerMove={(e) => {
              if (e.pointerType !== "mouse") return;
              const r = e.currentTarget.getBoundingClientRect();
              setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
            }}
            onPointerLeave={() => setZoom(null)}
          >
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              className={cn("h-full w-full animate-page-in transition-transform duration-200", img.fit === "contain" ? "object-contain" : "object-cover")}
              style={zoom ? { transform: "scale(1.9)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
            />
            {product.badge && <span className="label-mono absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-primary-foreground">{product.badge}</span>}
            <span className="label-mono absolute bottom-4 right-4 rounded-full glass px-3 py-1.5 text-silver">Hover to zoom</span>
          </div>
          {product.images.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-3">
              {product.images.map((im, i) => (
                <button
                  key={im.src}
                  onClick={() => setActive(i)}
                  aria-label={`Show photo ${i + 1}`}
                  aria-current={i === active}
                  className={cn("aspect-square overflow-hidden rounded-md border bg-ink transition-all", i === active ? "border-chrome" : "border-border opacity-60 hover:opacity-100")}
                >
                  <img src={im.src} alt="" className={cn("h-full w-full", im.fit === "contain" ? "object-contain" : "object-cover")} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <p className="label-mono text-primary">{product.line}</p>
          <h1 className="mt-3 font-display text-5xl uppercase leading-[0.92] md:text-6xl">{product.name}</h1>
          <p className="mt-4 font-mono text-2xl text-chrome">{formatZAR(product.price)}</p>
          <p className="mt-6 text-silver">{product.description}</p>

          <fieldset className="mt-8">
            <legend className="label-mono text-muted-foreground">Colour — <span className="text-foreground">{color}</span></legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button key={c} onClick={() => setColor(c)} aria-pressed={color === c} className={cn("label-mono rounded-full border px-4 py-2.5 transition-all", color === c ? "border-chrome bg-chrome text-ink" : "border-border hover:border-chrome")}>
                  {c}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="label-mono text-muted-foreground">Size {size && <>— <span className="text-foreground">{size}</span></>}</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => { setSize(s); setSizeError(false); }}
                  aria-pressed={size === s}
                  className={cn("min-w-14 rounded-md border px-4 py-3 font-mono text-sm transition-all", size === s ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-chrome", sizeError && "border-primary/60")}
                >
                  {s}
                </button>
              ))}
            </div>
            {sizeError && <p className="mt-2 text-sm text-primary" role="alert">Please choose a size.</p>}
          </fieldset>

          <div className="mt-6 flex items-center gap-4">
            <span className="label-mono text-muted-foreground">Qty</span>
            <div className="flex items-center rounded-full border border-border">
              <button aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-11 w-11 place-items-center"><Minus className="h-4 w-4" /></button>
              <span className="w-8 text-center font-mono">{qty}</span>
              <button aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))} className="grid h-11 w-11 place-items-center"><Plus className="h-4 w-4" /></button>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <button onClick={onAdd} className="label-mono rounded-full bg-primary py-4 text-sm text-primary-foreground shadow-glow transition-transform hover:scale-[1.01]">
              Add to bag — {formatZAR(product.price * qty)}
            </button>
            <a href={whatsappLink(quickMsg)} target="_blank" rel="noopener noreferrer" className="label-mono flex items-center justify-center gap-2 rounded-full border border-whatsapp/60 py-4 text-sm text-whatsapp transition-colors hover:bg-whatsapp hover:text-whatsapp-foreground">
              <WhatsAppIcon className="h-4 w-4" /> Order this on WhatsApp
            </a>
          </div>

          <ul className="mt-8 space-y-2 border-t border-border pt-6">
            {product.details.map((d) => (
              <li key={d} className="flex items-start gap-3 text-sm text-silver"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {d}</li>
            ))}
          </ul>
        </div>
      </div>

      <section className="mt-28">
        <h2 className="font-display text-4xl uppercase md:text-6xl">Complete the <span className="text-chrome">fit</span></h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
        </div>
      </section>
    </div>
  );
}
