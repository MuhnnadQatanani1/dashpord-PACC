import { FUNNEL_2025, FUNNEL_NOTE } from "@/lib/pacc-dashboard-data";
import { CHART_COLORS } from "@/components/site/Charts";
import { Info, Link2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function FunnelCard({ showLink = false }: { showLink?: boolean }) {
  const max = FUNNEL_2025[0].value;
  return (
    <div className="rounded-xl border border-card-border bg-card p-6 shadow-soft">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-bold text-heading">
          مسار القضية الكامل
          <span className="mr-2 rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
            2025
          </span>
        </h2>
        {showLink && (
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
          >
            <Link2 className="h-3.5 w-3.5" /> عرض التفاصيل
          </Link>
        )}
      </div>
      <p className="mb-5 text-sm leading-6 text-muted-foreground">
        كيف تتحول الأعداد عبر كامل مراحل معالجة قضية الفساد خلال آخر سنة، من لحظة استلام الشكوى وحتى
        صدور الحكم.
      </p>
      <div className="space-y-1.5">
        {FUNNEL_2025.map((stage, i) => {
          const pct = (stage.value / max) * 100;
          return (
            <div key={stage.id} className="flex items-center gap-3">
              <div
                className="flex h-10 items-center justify-center rounded-lg px-3 text-xs font-bold text-white"
                dir="rtl"
                style={{
                  width: `${Math.max(28, pct)}%`,
                  background: CHART_COLORS[i % CHART_COLORS.length],
                }}
              >
                {stage.value.toLocaleString("en-US")}
              </div>
              <span className="text-xs font-medium text-foreground/85">{stage.label}</span>
            </div>
          );
        })}
      </div>
      <p className="note mt-4">
        <Info className="note-icon" />
        {FUNNEL_NOTE}
      </p>
    </div>
  );
}
