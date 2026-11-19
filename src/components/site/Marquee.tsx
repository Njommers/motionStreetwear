import { cn } from "@/lib/utils";

export function Marquee({ items, className, reverse }: { items: string[]; className?: string; reverse?: boolean }) {
  const row = [...items, ...items];
  return (
    <div className={cn("relative flex overflow-hidden border-y border-border py-4", className)} aria-hidden>
      <div className={cn("flex shrink-0 animate-marquee items-center gap-10 pr-10", reverse && "[animation-direction:reverse]")}>
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap font-display text-3xl uppercase tracking-wide md:text-5xl">
            {t}
            <span className="inline-block h-3 w-3 rotate-45 bg-primary" />
          </span>
        ))}
      </div>
      <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10" style={reverse ? { animationDirection: "reverse" } : undefined}>
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap font-display text-3xl uppercase tracking-wide md:text-5xl">
            {t}
            <span className="inline-block h-3 w-3 rotate-45 bg-primary" />
          </span>
        ))}
      </div>
    </div>
  );
}
