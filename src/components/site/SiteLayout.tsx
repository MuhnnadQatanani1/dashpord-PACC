import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { OpinionPoll } from "./OpinionPoll";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="pt-[85px]">
        {children}
      </main>
      <section className="mx-auto max-w-7xl px-4 pb-3 pt-8 print:hidden lg:px-8">
        <div className="mx-auto max-w-5xl">
          <OpinionPoll />
        </div>
      </section>
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
    <section className="relative overflow-hidden border-b-[4px] border-gold bg-warm">
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-70" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 text-start lg:px-8 lg:py-20">
        {eyebrow && (
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold bg-white px-3 py-1 text-xs font-semibold text-gold-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            {eyebrow}
          </div>
        )}
        <h1 className="section-title !mb-0 !border-0 !p-0 text-balance text-3xl font-extrabold md:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-3xl text-base leading-8 text-section-sub md:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
