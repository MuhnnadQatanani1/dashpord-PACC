import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { frameworkStandards } from "@/lib/observatory-framework";
import { ChevronDown, BookOpenText, Scale, Users, Sparkles, Handshake, Fingerprint } from "lucide-react";

export const Route = createFileRoute("/concepts")({
  component: Concepts,
  head: () => ({
    meta: [
      { title: "المفاهيم والمصطلحات | المرصد الوطني" },
      { name: "description", content: "بطاقات تعريفية للمفاهيم والمصطلحات المعتمدة في المرصد الوطني لمؤشرات النزاهة والحوكمة ومكافحة الفساد." },
    ],
  }),
});

const GLOSSARY = [
  {
    icon: Scale,
    term: "النزاهة",
    def: "الالتزام بالقيم الأخلاقية والقوانين والأنظمة في أداء الوظائف والمسؤوليات، وتقديم الخدمة العامة بلا تحيز أو محسوبية أو استغلال للمنصب.",
  },
  {
    icon: BookOpenText,
    term: "الشفافية",
    def: "إتاحة المعلومات والقرارات والإجراءات الخاصة بعمل المؤسسات العامة للجمهور بشكل واضح وسهل الوصول، بما يمكن من الرقابة المجتمعية على أداء المؤسسات.",
  },
  {
    icon: Users,
    term: "المساءلة",
    def: "إلزام المسؤولين وأصحاب القرار ببيان أعمالهم وقراراتهم ومحاسبتهم على أدائهم، عبر آليات رقابية داخلية وخارجية واضحة ومعلنة.",
  },
  {
    icon: Fingerprint,
    term: "الحوكمة",
    def: "منظومة القواعد والإجراءات والممارسات التي تحكم إدارة المؤسسات واتخاذ القرارات فيها بما يضمن الكفاءة والفاعلية والعدالة والشفافية.",
  },
  {
    icon: Sparkles,
    term: "مكافحة الفساد",
    def: "الجهود الوقائية والزجرية التي تبذلها الدولة ومؤسساتها والمجتمع لمنع ممارسات الفساد وكشفها وملاحقة مرتكبيها واسترداد الأموال والعائدات الجرمية.",
  },
  {
    icon: Handshake,
    term: "المؤشر",
    def: "كمية أو نسبة إحصائية قابلة للقياس والرصد عبر الزمن، تعكس أداء جهة أو منظومة في جانب محدد من جوانب النزاهة والحوكمة ومكافحة الفساد.",
  },
];

const EXTRA_STANDARDS = [
  {
    id: "effectiveness",
    scale: "المقياس الرابع: الفاعلية في تحقيق النتائج",
    standard: "المعيار: الفاعلية",
    items: [
      {
        title: "البند الأول: فاعلية أجهزة إنفاذ القانون في كشف الفساد وملاحقته",
        measures: [
          "نسبة الملفات التحقيقية المنجزة إلى الملفات الواردة سنوياً.",
          "متوسط الزمن اللازم لإنجاز الملف التحقيقي والقضائي.",
          "نسبة القضايا المحالة للمحكمة والتي تنتهي بإدانة.",
          "نسبة استرداد الأموال والعائدات الجرمية المحكوم بها.",
        ],
      },
    ],
  },
  {
    id: "equity",
    scale: "المقياس الخامس: العدالة والمساواة وعدم التمييز",
    standard: "المعيار: العدالة وعدم التمييز",
    items: [
      {
        title: "البند الأول: تكافؤ فرص الوصول إلى العدالة والخدمة العامة",
        measures: [
          "سهولة وصول المواطنين في جميع المحافظات إلى قنوات تقديم الشكاوى والخدمات.",
          "توفير ضمانات عدم التمييز في معالجة الشكاوى والبلاغات.",
          "مراعاة النوع الاجتماعي والفئات المهمشة في آليات الإبلاغ والمتابعة.",
          "وضوح معايير الاختيار والتعيين والترقية في الوظيفة العامة.",
        ],
      },
    ],
  },
];

const ALL_STANDARDS = [...frameworkStandards, ...EXTRA_STANDARDS];

function CriteriaAccordion() {
  const [open, setOpen] = useState<string | null>(ALL_STANDARDS[0].id);

  return (
    <div className="space-y-3">
      {ALL_STANDARDS.map((s) => {
        const isOpen = open === s.id;
        return (
          <div key={s.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
            <button
              onClick={() => setOpen(isOpen ? null : s.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-right"
            >
              <div>
                <div className="text-[11px] font-semibold text-muted-foreground">{s.scale}</div>
                <div className="mt-1 text-base font-bold text-primary">{s.standard}</div>
              </div>
              <ChevronDown className={`h-5 w-5 shrink-0 text-accent transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            {isOpen && (
              <div className="border-t border-border bg-surface px-5 py-4">
                <div className="grid gap-4 lg:grid-cols-2">
                  {s.items.map((item) => (
                    <div key={item.title} className="rounded-xl border border-border bg-card p-5">
                      <h4 className="text-sm font-bold text-foreground">{item.title}</h4>
                      <div className="mt-2 text-xs font-semibold text-accent">مؤشرات القياس</div>
                      <ul className="mt-2 space-y-2">
                        {item.measures.map((m) => (
                          <li key={m} className="flex gap-2 text-sm leading-7 text-muted-foreground">
                            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Concepts() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="المفاهيم والمصطلحات"
        title="بطاقات تعريفية للمفاهيم والمصطلحات"
        description="مدخل مبسط للمصطلحات المعتمدة في المرصد الوطني، مع الإطار المرجعي لجهود تعزيز النزاهة والشفافية ومكافحة الفساد وفق معاييره الخمسة."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <h2 className="text-2xl font-bold text-primary md:text-3xl">المفاهيم الأساسية</h2>
          <p className="mt-2 leading-8 text-muted-foreground">تعريفات موجزة للكلمات والمصطلحات الأكثر تداولاً ضمن بيانات وتقارير المرصد.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GLOSSARY.map((g) => (
            <article key={g.term} className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-elevated">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg gradient-accent text-accent-foreground">
                <g.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-primary">{g.term}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{g.def}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <h2 className="text-2xl font-bold text-primary md:text-3xl">جهود تعزيز النزاهة والشفافية ومكافحة الفساد والمشاركة فيها</h2>
            <p className="mt-2 leading-8 text-muted-foreground">
              الإطار المرجعي المعتمد لدى المرصد، موزّعاً على خمسة معايير (المساءلة، المشاركة، الفاعلية، الشفافية، العدالة وعدم التمييز). اضغط على أي معيار لعرض بنوده ومؤشرات قياسه.
            </p>
          </div>
          <CriteriaAccordion />
        </div>
      </section>
    </SiteLayout>
  );
}
