import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title: "Shop the Collection — Mandela Motion" },
      { name: "description", content: "Shop Mandela Motion: Long Live DR hoodie and sleeveless shirt, MM Tour trucker caps and No Free Rides t-shirts. Pick your size and order on WhatsApp." },
      { property: "og:title", content: "Shop the Collection — Mandela Motion" },
      { property: "og:description", content: "Hoodies, tees, sleeveless shirts and trucker caps from Johannesburg." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

function Shop() {
  const lines = ["All", ...Array.from(new Set(products.map((p) => p.line)))];
  const [line, setLine] = useState("All");
  const shown = line === "All" ? products : products.filter((p) => p.line === line);
  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-28 pt-36 md:px-10">
      <p className="label-mono text-primary">Drop 01 · {products.length} pieces</p>
      <h1 className="mt-3 font-display text-[18vw] uppercase leading-[0.82] md:text-[10rem]">
        The <span className="text-chrome">collection</span>
      </h1>
      <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter by line">
        {lines.map((l) => (
          <button
            key={l}
            role="tab"
            aria-selected={line === l}
            onClick={() => setLine(l)}
            className={cn(
              "label-mono rounded-full border px-5 py-2.5 transition-all",
              line === l ? "border-primary bg-primary text-primary-foreground" : "border-border text-silver hover:border-chrome",
            )}
          >
            {l}
          </button>
        ))}
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {shown.map((p, i) => (
          <ProductCard key={p.slug} product={p} index={i} />
        ))}
      </div>
    </div>
  );
}
