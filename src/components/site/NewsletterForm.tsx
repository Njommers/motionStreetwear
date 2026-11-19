import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { subscribeNewsletter } from "@/lib/forms.functions";
import { cn } from "@/lib/utils";

export function NewsletterForm({ source = "website", tone = "dark", className }: { source?: string; tone?: "dark" | "paper"; className?: string }) {
  const subscribe = useServerFn(subscribeNewsletter);
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "already" | "error">("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setState("error");
      setError("Please enter a valid email address.");
      return;
    }
    setState("loading");
    try {
      const res = await subscribe({ data: { email, source, website: hp } });
      setState(res.already ? "already" : "done");
      setEmail("");
    } catch {
      setState("error");
      setError("We couldn't add you right now. Please try again.");
    }
  };

  const paper = tone === "paper";
  if (state === "done" || state === "already") {
    return (
      <div role="status" className={cn("flex items-center gap-3 rounded-md border p-4", paper ? "border-ink/20 text-ink" : "border-border", className)}>
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-4 w-4" />
        </span>
        <p className="text-sm">
          {state === "already" ? "You're already on the list — early access is yours." : "You're in. Watch your inbox for early access and exclusive drops."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={className}>
      <div className={cn("flex overflow-hidden rounded-md border", paper ? "border-ink/30 bg-paper" : "border-border bg-card")}>
        <label htmlFor={`nl-${source}`} className="sr-only">Email address</label>
        <input
          id={`nl-${source}`}
          type="email"
          required
          maxLength={255}
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className={cn("min-w-0 flex-1 bg-transparent px-4 py-3.5 text-sm outline-none", paper ? "text-ink placeholder:text-ink/50" : "placeholder:text-muted-foreground")}
        />
        <input tabIndex={-1} autoComplete="off" aria-hidden className="hidden" value={hp} onChange={(e) => setHp(e.target.value)} name="website" />
        <button
          type="submit"
          disabled={state === "loading"}
          className="label-mono flex shrink-0 items-center gap-2 bg-primary px-5 text-primary-foreground transition-colors hover:bg-primary/85 disabled:opacity-60"
        >
          {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Join <ArrowRight className="h-4 w-4" /></>}
        </button>
      </div>
      {state === "error" && <p className="mt-2 text-sm text-primary">{error}</p>}
    </form>
  );
}
