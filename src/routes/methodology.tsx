import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Database, LineChart, RefreshCw, Lock, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/methodology")({
  component: Methodology,
  head: () => ({
    meta: [
      { title: "المنهجية | المرصد الوطني لمؤشرات الفساد" },
      { name: "description", content: "منهجية جمع البيانات وحساب المؤشرات وضمانات السرية وحماية المبلغين." },
    ],
  }),
});

function Methodology() {
  const items = [
    { icon: Database, t: "مصادر البيانات", d: "سجل الوارد الرقمي للهيئة، بيانات الإحالة لنيابة مكافحة الفساد، قلم محكمة جرائم الفساد، ومنظومة إقرارات الذمة المالية." },
    { icon: LineChart, t: "منهجية المؤشرات", d: "معادلة موزونة: (احتمالية الوقوع × الأثر) لكل قطاع لحساب مستوى الخطر الفعلي." },
    { icon: RefreshCw, t: "وتيرة التحديث", d: "تحديث شهري للنشرات، ربعي للتقارير التحليلية، وسنوي للتقرير الشامل." },
    { icon: Lock, t: "خصوصية البيانات", d: "جميع البيانات المنشورة مجمّعة وإحصائية ولا تتضمن أي معلومات شخصية." },
    { icon: ShieldCheck, t: "حماية المبلغين", d: "التزام تام بأعلى معايير السرية بموجب القانون الفلسطيني وحماية هوية الشهود والمصادر." },
  ];
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="المنهجية"
        title="كيف يبني المرصد مؤشراته؟"
        description="شفافية كاملة في المصادر، وطرق الحساب، ووتيرة التحديث، وضمانات الحماية."
      />
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((i) => (
            <div key={i.t} className="rounded-xl border border-border bg-card p-6 shadow-soft">
              <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg gradient-accent text-accent-foreground">
                <i.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-primary">{i.t}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{i.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-surface p-8">
          <h3 className="text-xl font-bold text-primary">قائمة المقياس الموحد</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            طوّرت الهيئة بالتعاون مع بعثة البنك الدولي «قائمة المقياس الموحد» المعتمدة على ركيزتين:
          </p>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            <li className="rounded-lg border border-border bg-card p-4">
              <div className="text-sm font-bold text-accent">مقياس إنفاذ القانون</div>
              <div className="mt-1 text-sm text-muted-foreground">أداء الهيئة والنيابة والمحاكم في ملاحقة الفساد.</div>
            </li>
            <li className="rounded-lg border border-border bg-card p-4">
              <div className="text-sm font-bold text-accent">مقياس تعزيز النزاهة والشفافية</div>
              <div className="mt-1 text-sm text-muted-foreground">جهود الوقاية والمشاركة المجتمعية لكل قطاع.</div>
            </li>
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
}
