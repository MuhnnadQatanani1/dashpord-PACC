import type { ReactNode } from "react";

export function ChartCard({
  title,
  subtitle,
  children,
  action,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-card-border bg-card p-6 shadow-soft transition-shadow hover:shadow-elevated">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-gold/50 to-transparent" />
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base font-bold text-heading md:text-lg">{title}</h3>
          {subtitle && (
            <p className="mt-1 text-sm font-medium leading-6 text-muted-foreground md:text-base">
              {subtitle}
            </p>
          )}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
