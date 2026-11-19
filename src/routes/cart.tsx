import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { lineKey, lineTotal } from "@/lib/order";
import { getProduct } from "@/lib/products";
import { formatZAR } from "@/lib/site-config";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag — Mandela Motion" },
      { name: "description", content: "Review your Mandela Motion order: sizes, quantities and total before checking out on WhatsApp." },
      { property: "og:title", content: "Your Bag — Mandela Motion" },
      { property: "og:description", content: "Review your order and check out on WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, total, count, setQty, remove, clear } = useCart();
  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-28 pt-36 md:px-10">
      <h1 className="font-display text-7xl uppercase leading-none md:text-9xl">Your <span className="text-chrome">bag</span></h1>
      {lines.length === 0 ? (
        <div className="mt-16 rounded-lg border border-dashed border-border p-12 text-center">
          <p className="font-display text-4xl uppercase text-muted-foreground">Nothing here yet</p>
          <Link to="/shop" className="label-mono mt-6 inline-flex rounded-full bg-primary px-7 py-4 text-primary-foreground">Shop the collection</Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <ul className="divide-y divide-border border-y border-border lg:col-span-8">
            {lines.map((l) => {
              const p = getProduct(l.slug);
              if (!p) return null;
              const k = lineKey(l);
              return (
                <li key={k} className="grid grid-cols-[auto_minmax(0,1fr)] gap-5 py-6 sm:grid-cols-[auto_minmax(0,1fr)_auto]">
                  <Link to="/shop/$slug" params={{ slug: p.slug }} className="block h-32 w-28 shrink-0 overflow-hidden rounded-md bg-ink">
                    <img src={p.images[0]?.src} alt={p.name} className="h-full w-full object-cover" />
                  </Link>
                  <div className="min-w-0">
                    <Link to="/shop/$slug" params={{ slug: p.slug }} className="font-display text-2xl uppercase hover:text-chrome">{p.name}</Link>
                    <p className="label-mono mt-1 text-muted-foreground">Size {l.size} · {l.color}</p>
                    <p className="mt-1 font-mono text-sm text-silver">{formatZAR(p.price)} each</p>
                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex items-center rounded-full border border-border">
                        <button aria-label="Decrease quantity" onClick={() => setQty(k, l.qty - 1)} className="grid h-10 w-10 place-items-center"><Minus className="h-3.5 w-3.5" /></button>
                        <span className="w-8 text-center font-mono">{l.qty}</span>
                        <button aria-label="Increase quantity" onClick={() => setQty(k, l.qty + 1)} className="grid h-10 w-10 place-items-center"><Plus className="h-3.5 w-3.5" /></button>
                      </div>
                      <button onClick={() => remove(k)} className="label-mono inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary">
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                  <p className="col-span-2 text-right font-display text-2xl sm:col-span-1">{formatZAR(lineTotal(l))}</p>
                </li>
              );
            })}
          </ul>
          <aside className="h-fit rounded-lg border border-border bg-card p-6 lg:sticky lg:top-28 lg:col-span-4">
            <h2 className="font-display text-3xl uppercase">Order summary</h2>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-silver">Items</dt><dd className="font-mono">{count}</dd></div>
              <div className="flex justify-between"><dt className="text-silver">Delivery</dt><dd className="text-silver">Confirmed on WhatsApp</dd></div>
              <div className="flex items-baseline justify-between border-t border-border pt-4"><dt className="label-mono">Total</dt><dd className="font-display text-3xl">{formatZAR(total)}</dd></div>
            </dl>
            <Link to="/checkout" className="label-mono mt-6 flex w-full items-center justify-center rounded-full bg-primary py-4 text-primary-foreground shadow-glow">Proceed to checkout</Link>
            <button onClick={clear} className="label-mono mt-3 w-full py-2 text-muted-foreground hover:text-primary">Clear bag</button>
          </aside>
        </div>
      )}
    </div>
  );
}
