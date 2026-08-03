import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import {
  ENTITY_LABELS,
  ENTITY_ORDER,
  getSpotlightByEntity,
  type IndicatorEntity,
} from "@/data/indicators-catalog";
import { Lightbulb, Info } from "lucide-react";

export const Route = createFileRoute("/indicators")({
  component: Indicators,
  head: () => ({
    meta: [
      { title: "أرقام تحت الضوء | المرصد الوطني" },
      { name: "description", content: "أرقام ونسب مستخلصة من البيانات الرسمية لهيئة مكافحة الفساد والنيابة ومحكمة جرائم الفساد 2022-2025." },
    ],
  }),
});

const ENTITY_ICON_COLOR: Record<IndicatorEntity, string> = {
  pacc: "bg-primary/10 text-primary",
  prosecution: "bg-accent/10 text-accent",
  court: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
};

function Indicators() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="أرقام تحت الضوء"
        title="أرقام ونسب تحت الضوء"
        description="نسب مستخلصة من الملف الإحصائي الرسمي للفترة 2022-2025، تبرز أنماطاً لافتة في شكاوى الفساد والملفات التحقيقية والأحكام القضائية."
      />

      <section className="mx-auto max-w-7xl space-y-10 px-4 py-12 lg:px-8">
        {ENTITY_ORDER.map((e) => {
          const items = getSpotlightByEntity(e);
          return (
            <div key={e}>
              <div className="mb-5 flex items-center gap-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg gradient-accent text-accent-foreground">
                  <Lightbulb className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold text-primary">{ENTITY_LABELS[e]}</h2>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((i) => (
                  <article
                    key={i.id}
                    className={`rounded-2xl border border-border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1 ${ENTITY_ICON_COLOR[e]}`}
                  >
                    <div className="text-5xl font-extrabold tracking-tight text-primary">
                      {i.value.toLocaleString("ar-EG")}
                      <span className="text-2xl">٪</span>
                    </div>
                    <h3 className="mt-3 min-h-[2.5rem] text-sm font-bold leading-6 text-foreground">{i.label}</h3>
                    {i.note && (
                      <p className="mt-2 flex items-start gap-1.5 text-xs leading-5 text-muted-foreground">
                        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {i.note}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </SiteLayout>
  );
}
