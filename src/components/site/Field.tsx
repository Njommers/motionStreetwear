import type { ReactNode } from "react";

export const inputCls =
  "w-full rounded-md border border-input bg-card px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-chrome";

export function Field({ label, error, children }: { label: string; error?: string | undefined; children: ReactNode }) {
  return (
    <label className="block">
      <span className="label-mono text-muted-foreground">{label}</span>
      <div className="mt-2">{children}</div>
      {error && <span className="mt-1.5 block text-sm text-primary" role="alert">{error}</span>}
    </label>
  );
}
