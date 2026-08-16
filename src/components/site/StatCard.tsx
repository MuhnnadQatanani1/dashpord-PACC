import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLocale } from "@/i18n";

interface Props {
  label: string;
  value: number;
  trend?: number;
  suffix?: string;
  icon?: LucideIcon;
}

function useCountUp(target: number, duration = 1400) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return n;
}

export function StatCard({ label, value, trend, suffix, icon: Icon }: Props) {
  const { locale } = useLocale();
  const n = useCountUp(value);
  const positive = (trend ?? 0) >= 0;
  const fmt = (v: number) => v.toLocaleString(locale === "ar" ? "ar-EG" : "en-US");
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-elevated">
      <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-accent/8 blur-2xl transition-transform group-hover:scale-125" />
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {label}
          </div>
          <div className="mt-3 text-3xl font-extrabold tracking-tight text-primary md:text-4xl">
            {fmt(n)}
            {suffix && (
              <span className="ms-1 text-sm font-semibold text-muted-foreground">{suffix}</span>
            )}
          </div>
          {typeof trend === "number" && (
            <div
              className={`mt-3 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                positive ? "bg-success/12 text-success" : "bg-destructive/10 text-destructive"
              }`}
            >
              {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {Math.abs(trend).toFixed(1)}%
            </div>
          )}
        </div>
        {Icon && (
          <div className="shrink-0 rounded-xl bg-accent/12 p-3 text-accent ring-1 ring-inset ring-accent/20">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </div>
  );
}
