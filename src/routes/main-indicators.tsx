import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import {
  ENTITY_LABELS,
  ENTITY_ORDER,
  interactiveIndicators,
  type IndicatorEntity,
  type IndicatorDefinition,
} from "@/data/indicators-catalog";
import { ShieldCheck, FileDown } from "lucide-react";

export const Route = createFileRoute("/main-indicators")({
  component: MainIndicators,
  head: () => ({
    meta: [
      { title: "المؤشرات الرئيسة | المرصد الوطني" },
      { name: "description", content: "المؤشرات الرئيسية للهيئة والنيابة ومحكمة جرائم الفساد مع بطاقات تعريفية لكل مؤشر." },
    ],
  }),
});

const MAIN_IDS = new Set([
  "pacc-complaints-source",
  "pacc-complaints-crime",
  "pacc-files-result",
  "pacc-suspects-referred",
  "pros-received-source",
  "pros-completed-result",
  "pros-accused-court",
  "court-verdicts",
  "court-confiscated",
]);

function MainCard({ item }: { item: IndicatorDefinition }) {
  return (
    <article className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-elevated">
      <h3 className="text-[15px] font-bold leading-8 text-foreground">{item.title}</h3>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.definition}</p>
    </article>
  );
}

function PrintDocument({ byEntity }: { byEntity: Record<IndicatorEntity, IndicatorDefinition[]> }) {
  return (
    <div className="print-doc hidden print:block">
      <header className="print-doc__header">
        <div className="print-doc__org">المرصد الوطني لمؤشرات النزاهة والحوكمة ومكافحة الفساد</div>
        <h1>المؤشرات الرئيسية لجهات إنفاذ القانون</h1>
        <p className="print-doc__intro">
          أبرز المؤشرات الرسمية للهيئة والنيابة ومحكمة جرائم الفساد مع البطاقة التعريفية لكل مؤشر.
        </p>
      </header>

      {ENTITY_ORDER.map((e) => (
        <section key={e} className="print-doc__section">
          <h2>{ENTITY_LABELS[e]}</h2>
          {byEntity[e].map((item) => (
            <div key={item.id} className="print-doc__indicator">
              <div className="print-doc__bitle">{item.title}</div>
              <div className="print-doc__def">{item.definition}</div>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}

function MainIndicators() {
  const byEntity: Record<IndicatorEntity, IndicatorDefinition[]> = {
    pacc: [],
    prosecution: [],
    court: [],
  };
  interactiveIndicators.forEach((i) => {
    if (MAIN_IDS.has(i.id)) byEntity[i.entity].push(i);
  });

  return (
    <SiteLayout>
      <div className="print:hidden">
        <PageHeader
          eyebrow="المؤشرات الرئيسة"
          title="المؤشرات الرئيسية لجهات إنفاذ القانون"
          description="أبرز المؤشرات الرسمية للهيئة والنيابة ومحكمة جرائم الفساد، مع بطاقة تعريفية كاملة لكل مؤشر."
        />

        <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
              استعراض المؤشرات الرئيسية لجهات إنفاذ القانون مع البطاقة التعريفية الكاملة لكل مؤشر، وقابلة للتحميل بصيغة PDF.
            </p>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-lg gradient-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground shadow-soft transition-opacity hover:opacity-90 print:hidden"
            >
              <FileDown className="h-4 w-4" /> تحميل PDF
            </button>
          </div>

          <div className="space-y-10">
            {ENTITY_ORDER.map((e) => (
              <div key={e}>
                <div className="mb-5 flex items-center gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg gradient-accent text-accent-foreground">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary">{ENTITY_LABELS[e]}</h2>
                </div>
                <div className="grid gap-5 lg:grid-cols-2">
                  {byEntity[e].map((item) => (
                    <MainCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <PrintDocument byEntity={byEntity} />
    </SiteLayout>
  );
}
