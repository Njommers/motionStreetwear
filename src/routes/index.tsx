import { useParallax } from "@/components/site/Reveal";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import call from "@/assets/brand/incoming-call.png.asset.json";
import lookbook from "@/assets/brand/street-lookbook.jpg.asset.json";
import trust from "@/assets/brand/in-mandela-we-trust.jpg.asset.json";
import { products, getProduct } from "@/lib/products";
import { formatZAR, instagram, siteConfig, whatsappLink } from "@/lib/site-config";
import { ProductCard } from "@/components/site/ProductCard";
import { Marquee } from "@/components/site/Marquee";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { TiltCard } from "@/components/site/TiltCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mandela Motion — Johannesburg Streetwear | Shop the Collection" },
      { name: "description", content: "Mandela Motion: South African streetwear from Johannesburg. Shop the Long Live DR hoodie and sleeveless shirt, MM Tour trucker caps and No Free Rides tees." },
      { property: "og:title", content: "Mandela Motion — Johannesburg Streetwear" },
      { property: "og:description", content: "In Mandela We Trust. Shop the collection and order on WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  useParallax(null);
  return (
    <>
      <Hero />
      <Marquee items={["In Mandela We Trust", "Long Live DR", "No Free Rides", "MM Tour", "Johannesburg"]} className="bg-ink" />
      <Featured />
      <Lookbook />
      <LatestDrops />
      <StoryPreview />
      <InstagramGrid />
      <SignUp />
    </>
  );
}

function Hero() {
  return (
    <section className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-ink pt-28">
      {/* Cinematic backdrop */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[80vmax] w-[80vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl" style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--primary) 32%, transparent), transparent 60%)" }} />
        <div className="absolute inset-x-0 top-[18%] select-none text-center" data-parallax="-0.25">
          <p className="font-display text-[22vw] uppercase leading-[0.82] text-foreground/[0.06]">Mandela</p>
          <p className="mirror font-display text-[22vw] uppercase leading-[0.82] text-primary/[0.12]">Mandela</p>
        </div>
        <div className="absolute inset-0 overflow-hidden opacity-[0.07]">
          <div className="h-1/3 w-full bg-gradient-to-b from-transparent via-chrome to-transparent animate-scan" />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-center justify-center px-5 text-center md:px-10">
        <p className="label-mono flex items-center gap-2 text-silver">
          <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full rounded-full bg-primary animate-pulse-ring" /><span className="relative inline-flex h-2 w-2 rounded-full bg-primary" /></span>
          Incoming call · {siteConfig.city}
        </p>

        {/* Cover: the incoming-call image */}
        <div className="relative mt-8 w-full max-w-[560px] animate-float">
          <div aria-hidden className="absolute inset-0 -z-10 rounded-[2rem] bg-primary/40 animate-pulse-ring" />
          <div className="relative animate-ring">
            <img src={call.url} alt="Incoming call from Mandela Motion, mobile" className="w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]" width={1177} height={295} fetchPriority="high" />
            <Link to="/shop" aria-label="Answer the call — shop the collection" className="absolute right-[3%] top-[30%] h-[42%] w-[11%] rounded-full outline-offset-4 hover:ring-4 hover:ring-whatsapp/50" />
            <a href="#collection" aria-label="Decline — scroll to the collection" className="absolute right-[17.5%] top-[30%] h-[42%] w-[11%] rounded-full outline-offset-4 hover:ring-4 hover:ring-primary/50" />
          </div>
        </div>

        <h1 className="mt-10 font-display uppercase leading-[0.85] tracking-tight">
          <span className="rise-line text-[17vw] md:text-[11.5vw]"><span className="text-chrome">Mandela</span></span>
          <span className="rise-line text-[17vw] md:text-[11.5vw]"><span style={{ animationDelay: "120ms" }}>Motion</span></span>
        </h1>
        <p className="mt-6 max-w-xl text-balance text-base text-silver md:text-lg" data-reveal>
          Streetwear out of {siteConfig.city}. <span className="font-serif text-xl italic text-chrome md:text-2xl">{siteConfig.tagline}.</span>
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row" data-reveal style={{ ["--reveal-delay" as string]: "150ms" }}>
          <Link to="/shop" className="label-mono group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-sm text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]">
            Shop collection <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a href={whatsappLink(`Hi ${siteConfig.brand}! I'd like to order.`)} target="_blank" rel="noopener noreferrer" className="label-mono inline-flex items-center gap-2 rounded-full border border-border px-7 py-4 text-sm transition-colors hover:border-whatsapp hover:text-whatsapp">
            <WhatsAppIcon className="h-4 w-4" /> Order on WhatsApp
          </a>
        </div>
      </div>
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] items-end justify-between px-5 pb-6 pt-10 md:px-10">
        <span className="label-mono text-muted-foreground">Drop 01</span>
        <span className="label-mono text-muted-foreground">Scroll ↓</span>
      </div>
    </section>
  );
}

function SectionHead({ kicker, title, children }: { kicker: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6">
      <div className="min-w-0" data-reveal>
        <p className="label-mono text-primary">{kicker}</p>
        <h2 className="mt-3 font-display text-5xl uppercase leading-[0.9] md:text-8xl">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Featured() {
  return (
    <section id="collection" className="mx-auto max-w-[1440px] scroll-mt-20 px-5 py-24 md:px-10 md:py-32">
      <SectionHead kicker="The collection" title={<>Featured <span className="font-serif normal-case italic text-chrome">pieces</span></>}>
        <Link to="/shop" className="label-mono hidden items-center gap-2 text-silver hover:text-chrome sm:inline-flex">
          View all <ArrowUpRight className="h-4 w-4" />
        </Link>
      </SectionHead>
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p, i) => (
          <ProductCard key={p.slug} product={p} index={i} className={i % 2 === 1 ? "lg:translate-y-12" : ""} />
        ))}
      </div>
    </section>
  );
}

function Lookbook() {
  return (
    <section className="relative h-[110svh] overflow-hidden bg-ink">
      <div className="absolute inset-[-15%_0]" data-parallax="0.18">
        <img src={lookbook.url} alt="Mandela Motion No Free Rides and Long Live DR tees worn on the street in Johannesburg" loading="lazy" className="h-full w-full object-cover object-[50%_60%]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/60" />
      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-5 pb-16 md:px-10 md:pb-24">
        <p className="label-mono text-silver" data-reveal>Shot on the streets · {siteConfig.city}</p>
        <h2 className="mt-4 max-w-4xl font-display text-6xl uppercase leading-[0.88] md:text-[9rem]" data-reveal>
          No free <span className="text-primary">rides.</span>
        </h2>
        <Link to="/shop/$slug" params={{ slug: "no-free-rides-t-shirt" }} className="label-mono mt-8 inline-flex w-fit items-center gap-2 rounded-full glass px-6 py-3.5 hover:text-chrome" data-reveal>
          Shop the tee <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function LatestDrops() {
  const hoodie = getProduct("long-live-dr-hoodie")!;
  const sleeveless = getProduct("long-live-dr-sleeveless-shirt")!;
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
      <SectionHead kicker="Latest drops" title={<>Long live <span className="text-chrome">DR</span></>} />
      <div className="mt-14 grid gap-6 lg:grid-cols-12">
        <Link to="/shop/$slug" params={{ slug: hoodie.slug }} className="group relative overflow-hidden rounded-lg lg:col-span-7" data-reveal>
          <div className="curtain aspect-[4/5] lg:aspect-[5/6]">
            <img src={hoodie.images[0]?.src} alt={hoodie.images[0]?.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105" />
          </div>
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink/90 to-transparent p-6 md:p-8">
            <div className="min-w-0">
              <p className="label-mono text-primary">Drop 01 / 01</p>
              <h3 className="mt-2 font-display text-4xl uppercase md:text-6xl">{hoodie.name}</h3>
            </div>
            <span className="shrink-0 font-mono text-silver">{formatZAR(hoodie.price)}</span>
          </div>
        </Link>
        <div className="flex flex-col gap-6 lg:col-span-5">
          <Link to="/shop/$slug" params={{ slug: sleeveless.slug }} className="group relative overflow-hidden rounded-lg border border-border bg-ink" data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
            <div className="curtain aspect-square">
              <img src={sleeveless.images[0]?.src} alt={sleeveless.images[0]?.alt} loading="lazy" className="h-full w-full object-contain transition-transform duration-[1.4s] ease-out group-hover:scale-105" />
            </div>
            <div className="flex items-center justify-between gap-4 p-5">
              <div className="min-w-0">
                <p className="label-mono text-primary">Drop 01 / 02</p>
                <h3 className="mt-1 truncate font-display text-2xl uppercase">{sleeveless.name}</h3>
              </div>
              <ArrowUpRight className="h-6 w-6 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </div>
          </Link>
          <div className="flex flex-1 flex-col justify-between rounded-lg border border-border bg-card p-6" data-reveal style={{ ["--reveal-delay" as string]: "220ms" }}>
            <p className="font-serif text-3xl italic leading-tight text-chrome">Limited runs. When a drop is gone, it's gone.</p>
            <a href={whatsappLink(`Hi ${siteConfig.brand}! I'd like to hear about the next drop.`)} target="_blank" rel="noopener noreferrer" className="label-mono mt-6 inline-flex w-fit items-center gap-2 text-whatsapp">
              <WhatsAppIcon className="h-4 w-4" /> Ask about the next drop
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryPreview() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-card">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-2">
        <div className="relative mx-auto aspect-square w-full max-w-md [perspective:1200px]" data-reveal>
          {/* 3D medallion */}
          <div className="absolute inset-0 animate-spin-y [transform-style:preserve-3d]">
            <div className="absolute inset-0 overflow-hidden rounded-full border border-border bg-ink shadow-deep [backface-visibility:hidden]">
              <img src={trust.url} alt="In Mandela We Trust graphic" loading="lazy" className="h-full w-full scale-125 object-cover" />
            </div>
            <div className="absolute inset-0 grid place-items-center rounded-full bg-primary [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <span className="font-display text-[9rem] leading-none text-primary-foreground">MM</span>
            </div>
          </div>
          <div aria-hidden className="absolute -bottom-10 left-1/2 h-8 w-2/3 -translate-x-1/2 rounded-full bg-ink/80 blur-xl" />
        </div>
        <div>
          <p className="label-mono text-primary" data-reveal>Our story</p>
          <h2 className="mt-4 font-display text-5xl uppercase leading-[0.9] md:text-7xl" data-reveal>
            In Mandela<br /><span className="text-chrome">we trust.</span>
          </h2>
          <p className="mt-6 max-w-lg text-lg text-silver" data-reveal>
            Where the name comes from, who's behind it and what it stands for — told in our own words.
          </p>
          <Link to="/story" className="label-mono group mt-8 inline-flex items-center gap-3 rounded-full border border-border px-7 py-4 transition-colors hover:border-chrome" data-reveal>
            Read our story <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function InstagramGrid() {
  const ig = instagram();
  const tiles = [
    { src: lookbook.url, alt: "Mandela Motion on the street", cls: "col-span-2 row-span-2", fit: "object-cover" },
    { src: getProduct("long-live-dr-hoodie")!.images[0]!.src, alt: "Long Live DR hoodie", cls: "", fit: "object-cover" },
    { src: getProduct("mm-tour-trucker-cap")!.images[0]!.src, alt: "MM Tour trucker cap", cls: "", fit: "object-cover" },
    { src: trust.url, alt: "In Mandela We Trust", cls: "", fit: "object-cover scale-125" },
    { src: getProduct("long-live-dr-sleeveless-shirt")!.images[0]!.src, alt: "Long Live DR sleeveless shirt", cls: "", fit: "object-contain" },
  ];
  const Wrapper = ({ children, className }: { children: React.ReactNode; className: string }) =>
    ig.url ? (
      <a href={ig.url} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>
    ) : (
      <Link to="/shop" className={className}>{children}</Link>
    );
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
      <SectionHead kicker={`Instagram ${ig.handle}`} title={<>On the <span className="font-serif normal-case italic text-chrome">feed</span></>}>
        {ig.url ? (
          <a href={ig.url} target="_blank" rel="noopener noreferrer" className="label-mono hidden items-center gap-2 rounded-full border border-border px-5 py-3 hover:border-chrome sm:inline-flex">
            Follow <ArrowUpRight className="h-4 w-4" />
          </a>
        ) : (
          <span className="label-mono hidden rounded-full border border-dashed border-border px-5 py-3 text-muted-foreground sm:inline-flex">Instagram link soon</span>
        )}
      </SectionHead>
      <div className="mt-14 grid auto-rows-[38vw] grid-cols-2 gap-3 md:auto-rows-[19vw] md:grid-cols-4 lg:auto-rows-[15vw]">
        {tiles.map((t, i) => (
          <div key={i} className={t.cls} data-reveal style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
            <TiltCard className="h-full rounded-lg" max={6}>
              <Wrapper className="group relative block h-full overflow-hidden rounded-lg bg-ink">
                <img src={t.src} alt={t.alt} loading="lazy" className={`h-full w-full ${t.fit} transition-all duration-700 group-hover:scale-110 group-hover:saturate-150`} />
                <span className="absolute inset-0 grid place-items-center bg-ink/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="label-mono text-chrome">{ig.handle}</span>
                </span>
              </Wrapper>
            </TiltCard>
          </div>
        ))}
      </div>
    </section>
  );
}

function SignUp() {
  return (
    <section className="relative overflow-hidden bg-paper text-ink">
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-[1.3fr_1fr]">
        <div data-reveal>
          <h2 className="-rotate-2 text-balance text-5xl leading-[0.95] text-primary md:text-7xl" style={{ fontFamily: '"Permanent Marker", var(--font-display)' }}>
            Sign up to our email list for early access and exclusive drops
          </h2>
          <NewsletterForm source="home" tone="paper" className="mt-10 max-w-lg" />
        </div>
        <div className="relative mx-auto w-full max-w-sm rotate-3 shadow-deep transition-transform duration-700 hover:rotate-0" data-reveal>
          <span aria-hidden className="absolute -top-4 left-1/2 z-10 h-8 w-28 -translate-x-1/2 -rotate-6 bg-sa-gold/50" />
          <img src={trust.url} alt="In Mandela We Trust" loading="lazy" className="w-full rounded-sm" />
        </div>
      </div>
    </section>
  );
}
