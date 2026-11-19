import { useParallax } from "@/components/site/Reveal";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import storyVideo from "@/assets/brand/story-loop.mp4.asset.json";
import lookbook from "@/assets/brand/street-lookbook.jpg.asset.json";
import trust from "@/assets/brand/in-mandela-we-trust.jpg.asset.json";
import { story } from "@/lib/story";
import { siteConfig } from "@/lib/site-config";
import { Marquee } from "@/components/site/Marquee";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Story — Mandela Motion" },
      { name: "description", content: "The story behind Mandela Motion, the Johannesburg streetwear label. In Mandela We Trust." },
      { property: "og:title", content: "Our Story — Mandela Motion" },
      { property: "og:description", content: "The story behind Mandela Motion, in our own words." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Story,
});

function Story() {
  useParallax(null);
  const hasStory = story.paragraphs.length > 0;
  return (
    <>
      {/* Video background for the whole intro */}
      <section className="relative min-h-[100svh] overflow-hidden bg-ink">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={storyVideo.url}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/30 to-ink" />
        <div className="grain absolute inset-0" />
        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-5 pb-20 pt-36 md:px-10">
          <p className="label-mono text-silver">{siteConfig.city} · {siteConfig.brand}</p>
          <h1 className="mt-4 font-display uppercase leading-[0.82]">
            <span className="rise-line text-[24vw] md:text-[14rem]"><span>Our</span></span>
            <span className="rise-line text-[24vw] md:text-[14rem]"><span className="text-chrome" style={{ animationDelay: "120ms" }}>Story</span></span>
          </h1>
          <p className="mt-6 font-serif text-3xl italic text-chrome md:text-4xl" data-reveal>{siteConfig.tagline}.</p>
        </div>
      </section>

      <Marquee items={["In Mandela We Trust", "Mandela Motion", siteConfig.city]} reverse className="bg-ink" />

      {/* The original story */}
      <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="label-mono text-primary">Chapter 01</p>
              <h2 className="mt-3 font-display text-5xl uppercase leading-[0.9] md:text-6xl">In our <span className="text-chrome">own words</span></h2>
              <div className="mt-8 h-1 w-24 bg-sa-stripe" />
            </div>
          </div>
          <div className="lg:col-span-8">
            {hasStory ? (
              <div className="space-y-8">
                {story.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    data-reveal
                    className={i === 0 ? "text-2xl leading-relaxed text-foreground first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-8xl first-letter:leading-[0.8] first-letter:text-primary md:text-3xl" : "text-lg leading-relaxed text-silver md:text-xl"}
                  >
                    {p}
                  </p>
                ))}
              </div>
            ) : (
              <div data-reveal className="rounded-lg border-2 border-dashed border-border p-8 md:p-12">
                <p className="label-mono text-primary">Placeholder</p>
                <p className="mt-4 font-display text-4xl uppercase leading-tight md:text-5xl">The original Mandela Motion story goes here.</p>
                <p className="mt-4 max-w-xl text-silver">
                  This space is reserved for the brand's real background story, presented word for word. It will appear here as soon as it's provided.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Editorial photo spread */}
      <section className="relative h-[90svh] overflow-hidden">
        <div className="absolute inset-[-15%_0]" data-parallax="0.2">
          <img src={lookbook.url} alt="Mandela Motion crew wearing the collection in Johannesburg" loading="lazy" className="h-full w-full object-cover object-[50%_62%]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 to-transparent" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] items-center px-5 md:px-10">
          {story.pullQuote ? (
            <blockquote className="max-w-2xl font-serif text-5xl italic leading-tight text-chrome md:text-7xl" data-reveal>“{story.pullQuote}”</blockquote>
          ) : (
            <p className="max-w-2xl font-display text-6xl uppercase leading-[0.9] md:text-8xl" data-reveal>Made in <span className="text-primary">{siteConfig.city}.</span></p>
          )}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-2">
        <div className="curtain overflow-hidden rounded-lg" data-reveal>
          <img src={trust.url} alt="In Mandela We Trust" loading="lazy" className="w-full" />
        </div>
        <div>
          <p className="label-mono text-primary" data-reveal>Wear the story</p>
          <h2 className="mt-3 font-display text-5xl uppercase leading-[0.9] md:text-7xl" data-reveal>Every piece carries <span className="text-chrome">the name.</span></h2>
          <Link to="/shop" className="label-mono group mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-primary-foreground shadow-glow" data-reveal>
            Shop collection <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </>
  );
}
