import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { lineKey, lineTotal } from "@/lib/order";
import { getProduct } from "@/lib/products";
import { formatZAR } from "@/lib/site-config";

export function CartDrawer() {
  const { open, setOpen, lines, total, setQty, remove, count } = useCart();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 border-l border-border bg-background p-0 sm:max-w-md [&>button]:hidden">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div>
            <SheetTitle className="font-display text-2xl uppercase tracking-wide">Your bag</SheetTitle>
            <SheetDescription className="label-mono text-muted-foreground">{count} item{count === 1 ? "" : "s"}</SheetDescription>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close cart" className="grid h-10 w-10 place-items-center rounded-full border border-border hover:border-chrome">
            <X className="h-4 w-4" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-display text-4xl uppercase text-muted-foreground">Bag's empty</p>
            <Link to="/shop" onClick={() => setOpen(false)} className="label-mono rounded-full bg-primary px-6 py-3 text-primary-foreground">
              Shop the collection
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-6">
              {lines.map((l) => {
                const p = getProduct(l.slug);
                if (!p) return null;
                const k = lineKey(l);
                return (
                  <li key={k} className="flex gap-4 py-5">
                    <img src={p.images[0]?.src} alt="" className="h-24 w-20 shrink-0 rounded bg-ink object-cover" />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <p className="truncate font-display text-lg uppercase">{p.name}</p>
                      <p className="label-mono text-muted-foreground">{l.size} · {l.color}</p>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center rounded-full border border-border">
                          <button aria-label="Decrease quantity" onClick={() => setQty(k, l.qty - 1)} className="grid h-8 w-8 place-items-center"><Minus className="h-3 w-3" /></button>
                          <span className="w-6 text-center font-mono text-sm">{l.qty}</span>
                          <button aria-label="Increase quantity" onClick={() => setQty(k, l.qty + 1)} className="grid h-8 w-8 place-items-center"><Plus className="h-3 w-3" /></button>
                        </div>
                        <p className="font-mono text-sm">{formatZAR(lineTotal(l))}</p>
                      </div>
                    </div>
                    <button aria-label={`Remove ${p.name}`} onClick={() => remove(k)} className="self-start text-muted-foreground hover:text-primary">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="space-y-3 border-t border-border p-6">
              <div className="flex items-center justify-between">
                <span className="label-mono text-muted-foreground">Subtotal</span>
                <span className="font-display text-2xl">{formatZAR(total)}</span>
              </div>
              <Link to="/checkout" onClick={() => setOpen(false)} className="label-mono flex w-full items-center justify-center rounded-full bg-primary py-4 text-primary-foreground transition-colors hover:bg-primary/85">
                Checkout via WhatsApp
              </Link>
              <Link to="/cart" onClick={() => setOpen(false)} className="label-mono flex w-full items-center justify-center rounded-full border border-border py-3.5 hover:border-chrome">
                View full cart
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
