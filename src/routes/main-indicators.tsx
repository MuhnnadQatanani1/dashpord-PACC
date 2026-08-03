import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import {
  ENTITY_LABELS,
  ENTITY_ORDER,
  interactiveIndicators,
  type IndicatorEntity,
  type IndicatorDefinition,
} from "@/data/indicators-catalog";
import { BadgeInfo, Database, Calculator, CalendarRange, ShieldCheck } from "lucide-react";

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

function highlight(item: IndicatorDefinition): number {
  let max = 0;
  for (const row of item.table.rows) {
    for (const cell of row) {
      if (typeof cell === "number" && cell > max) max = cell;
    }
  }
  return max;
}

function MainCard({ item }: { item: IndicatorDefinition }) {
  return (
    <article className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-elevated">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[15px] font-bold leading-8 text-foreground">{item.title}</h3>
        <div className="shrink-0 rounded-lg bg-primary/10 px-3 py-1.5 text-center">
          <div className="text-xl font-extrabold text-primary">{highlight(item).toLocaleString("ar-EG")}</div>
          <div className="text-[10px] text-muted-foreground">أعلى قيمة مرصودة</div>
        </div>
      </div>
      <dl className="mt-4 space-y-3 rounded-xl border border-border bg-surface p-4 text-sm leading-7">
        <div>
          <dt className="flex items-center gap-1.5 font-bold text-primary"><BadgeInfo className="h-4 w-4" /> التعريف</dt>
          <dd className="text-muted-foreground">{item.definition}</dd>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <dt className="flex items-center gap-1.5 font-bold text-primary"><Database className="h-4 w-4" /> مصدر البيانات</dt>
            <dd className="text-muted-foreground">{item.source}</dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 font-bold text-primary"><Calculator className="h-4 w-4" /> طريقة الحساب</dt>
            <dd className="text-muted-foreground">{item.calculation}</dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 font-bold text-primary"><CalendarRange className="h-4 w-4" /> الفترة الزمنية</dt>
            <dd className="text-muted-foreground">{item.period}</dd>
          </div>
        </div>
      </dl>
    </article>
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
      <PageHeader
        eyebrow="المؤشرات الرئيسة"
        title="المؤشرات الرئيسية لجهات إنفاذ القانون"
        description="أبرز المؤشرات الرسمية للهيئة والنيابة ومحكمة جرائم الفساد، مع بطاقة تعريفية كاملة لكل مؤشر."
      />

      <section className="mx-auto max-w-7xl space-y-10 px-4 py-12 lg:px-8">
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
      </section>
    </SiteLayout>
  );
}
