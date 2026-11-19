import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/** Social links. Empty URLs in site-config render as "coming soon" instead of dead links. */
export function Socials({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {siteConfig.socials.map((s) =>
        s.url ? (
          <li key={s.name}>
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="label-mono inline-flex rounded-full border border-border px-3 py-1.5 transition-colors hover:border-chrome hover:text-chrome">
              {s.name}
            </a>
          </li>
        ) : (
          <li key={s.name} title="Link coming soon" className="label-mono inline-flex items-center gap-1.5 rounded-full border border-dashed border-border px-3 py-1.5 text-muted-foreground">
            {s.name} <span className="text-[0.55rem] text-primary">soon</span>
          </li>
        ),
      )}
    </ul>
  );
}
