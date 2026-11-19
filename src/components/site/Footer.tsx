import { Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { siteConfig, whatsappLink, instagram } from "@/lib/site-config";
import { NewsletterForm } from "./NewsletterForm";
import { Socials } from "./Socials";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function Footer() {
  const ig = instagram();
  return (
    <footer className="grain relative overflow-hidden border-t border-border bg-ink">
      <div className="h-1 w-full bg-sa-stripe" />
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <p className="label-mono text-primary">Newsletter</p>
          <h2 className="mt-3 font-display text-4xl uppercase leading-none md:text-5xl">Early access.<br />Exclusive drops.</h2>
          <NewsletterForm source="footer" className="mt-6 max-w-md" />
        </div>
        <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3">
          <div>
            <p className="label-mono text-muted-foreground">Navigate</p>
            <ul className="mt-4 space-y-2.5">
              <li><Link to="/shop" className="hover:text-chrome">Shop</Link></li>
              <li><Link to="/story" className="hover:text-chrome">Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-chrome">Contact</Link></li>
              <li><Link to="/cart" className="hover:text-chrome">Cart</Link></li>
            </ul>
          </div>
          <div>
            <p className="label-mono text-muted-foreground">Reach us</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-chrome">
                  <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.businessEmail}`} className="inline-flex items-center gap-2 break-all hover:text-chrome">
                  <Mail className="h-4 w-4 shrink-0" /> {siteConfig.businessEmail}
                </a>
              </li>
              <li>
                {ig.url ? (
                  <a href={ig.url} target="_blank" rel="noopener noreferrer" className="hover:text-chrome">Instagram {ig.handle}</a>
                ) : (
                  <span className="text-muted-foreground">Instagram {ig.handle} (soon)</span>
                )}
              </li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <p className="label-mono text-muted-foreground">Follow</p>
            <Socials className="mt-4" />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <p className="select-none font-display text-[19vw] uppercase leading-[0.8] text-chrome md:text-[16.5vw]" aria-hidden>
          Mandela
        </p>
        <p className="mirror -mt-[2vw] select-none font-display text-[19vw] uppercase leading-[0.8] text-foreground/10 md:text-[16.5vw]" aria-hidden>
          Motion
        </p>
      </div>
      <div className="mx-auto flex max-w-[1440px] flex-col gap-2 border-t border-border px-5 py-6 text-xs text-muted-foreground md:flex-row md:justify-between md:px-10">
        <p>© {new Date().getFullYear()} {siteConfig.brand}. All rights reserved.</p>
        <p className="label-mono">{siteConfig.city} · {siteConfig.tagline}</p>
      </div>
    </footer>
  );
}
