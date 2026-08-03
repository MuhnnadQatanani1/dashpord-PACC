import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-surface">
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-70" />
      <div className="pointer-events-none absolute -top-24 left-[-10%] h-64 w-[45%] rounded-full bg-accent/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        {eyebrow && (
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {eyebrow}
          </div>
        )}
        <h1 className="text-balance text-3xl font-extrabold text-primary md:text-5xl">{title}</h1>
        {description && (
          <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">{description}</p>
        )}
      </div>
    </section>
  );
}
