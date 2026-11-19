import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatZAR } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { TiltCard } from "./TiltCard";

export function ProductCard({ product, index = 0, className }: { product: Product; index?: number; className?: string }) {
  const [first, second] = product.images;
  return (
    <div data-reveal style={{ ["--reveal-delay" as string]: `${index * 90}ms` }} className={className}>
      <TiltCard className="rounded-lg">
        <Link
          to="/shop/$slug"
          params={{ slug: product.slug }}
          className="block overflow-hidden rounded-lg border border-border bg-card"
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-ink">
            {first && (
              <img
                src={first.src}
                alt={first.alt}
                loading="lazy"
                className={cn(
                  "absolute inset-0 h-full w-full transition-all duration-700 ease-out group-hover/tilt:scale-[1.06]",
                  first.fit === "contain" ? "object-contain p-2" : "object-cover",
                  second && "group-hover/tilt:opacity-0",
                )}
              />
            )}
            {second && (
              <img
                src={second.src}
                alt={second.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full scale-110 object-cover opacity-0 transition-all duration-700 ease-out group-hover/tilt:scale-100 group-hover/tilt:opacity-100"
              />
            )}
            {product.badge && (
              <span className="label-mono absolute left-3 top-3 z-[5] rounded-full bg-primary px-2.5 py-1 text-[0.6rem] text-primary-foreground">
                {product.badge}
              </span>
            )}
            <span className="absolute bottom-3 right-3 z-[5] grid h-10 w-10 translate-y-3 place-items-center rounded-full bg-chrome text-ink opacity-0 transition-all duration-500 group-hover/tilt:translate-y-0 group-hover/tilt:opacity-100">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </div>
          <div className="flex items-end justify-between gap-3 p-4 [transform:translateZ(30px)]">
            <div className="min-w-0">
              <p className="label-mono text-muted-foreground">{product.line}</p>
              <h3 className="mt-1 truncate font-display text-xl uppercase tracking-wide">{product.name}</h3>
            </div>
            <p className="shrink-0 font-mono text-sm text-silver">{formatZAR(product.price)}</p>
          </div>
        </Link>
      </TiltCard>
    </div>
  );
}
