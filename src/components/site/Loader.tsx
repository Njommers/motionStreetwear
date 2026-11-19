import { useEffect, useState } from "react";

/** Intro loader on first load. Fades itself out with CSS even if scripts fail. */
export function Loader() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 2000);
    return () => clearTimeout(t);
  }, []);
  if (gone) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] grid place-items-center bg-ink animate-loader-out">
      <div className="text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary font-display text-3xl text-primary-foreground animate-spin-y">
          MM
        </div>
        <p className="label-mono mt-6 text-silver">Mandela Motion</p>
        <div className="mx-auto mt-3 h-px w-40 bg-border">
          <div className="h-px w-full bg-chrome animate-loader-bar" />
        </div>
      </div>
    </div>
  );
}
