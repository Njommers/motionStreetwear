import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("group inline-flex items-center gap-2.5", className)} aria-label="Mandela Motion home">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary font-display text-[13px] tracking-tight text-primary-foreground transition-transform duration-500 group-hover:rotate-[360deg]">
        MM
      </span>
      <span className="font-display text-lg uppercase leading-none tracking-wide">
        Mandela <span className="text-chrome">Motion</span>
      </span>
    </Link>
  );
}
