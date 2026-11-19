import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import { Wordmark } from "./Wordmark";
import { whatsappLink } from "@/lib/site-config";

const NAV = [
  { to: "/shop", label: "Shop" },
  { to: "/story", label: "Our Story" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenu(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
  }, [menu]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "glass py-3" : "bg-transparent py-5",
        )}
      >
        <div className="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 md:grid-cols-[1fr_auto_1fr] md:px-10">
          <Wordmark className="min-w-0" />
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="label-mono group relative px-4 py-2 text-silver transition-colors hover:text-chrome"
                activeProps={{ className: "text-chrome" }}
              >
                {n.label}
                <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setOpen(true)}
              className="relative grid h-11 w-11 place-items-center rounded-full border border-border transition-colors hover:border-chrome"
              aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 font-mono text-[10px] text-primary-foreground">
                  {count}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenu((m) => !m)}
              className="grid h-11 w-11 place-items-center rounded-full border border-border md:hidden"
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
            >
              {menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col justify-between bg-ink px-6 pb-10 pt-28 transition-[clip-path] duration-700 ease-[cubic-bezier(0.8,0,0.2,1)] md:hidden",
          menu ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]",
        )}
        aria-hidden={!menu}
      >
        <nav className="flex flex-col gap-2" aria-label="Mobile">
          {[{ to: "/", label: "Home" }, ...NAV, { to: "/cart", label: "Cart" }].map((n, i) => (
            <Link
              key={n.to}
              to={n.to}
              tabIndex={menu ? 0 : -1}
              className={cn(
                "font-display text-6xl uppercase leading-[1.05] transition-all duration-700",
                menu ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
              )}
              style={{ transitionDelay: menu ? `${150 + i * 70}ms` : "0ms" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" tabIndex={menu ? 0 : -1} className="label-mono text-silver">
          Order on WhatsApp →
        </a>
      </div>
    </>
  );
}
