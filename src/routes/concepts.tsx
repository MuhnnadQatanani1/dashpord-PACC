import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { frameworkCriteria, lawEnforcementBand } from "@/lib/observatory-framework";
import { FileDown, Gavel, Handshake, Zap, Eye, Scale, ScrollText, BookOpenText, Users, Sparkles, Fingerprint } from "lucide-react";
import type { LucideIcon } from "lucide-react";

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

const CRITERIA_ICONS: LucideIcon[] = [Gavel, Handshake, Zap, Eye, Scale];
const CRITERIA = frameworkCriteria.map((c, i) => ({ ...c, icon: CRITERIA_ICONS[i] }));

const BAND_ICONS: LucideIcon[] = [ScrollText, Scale];
const LAW_ENFORCEMENT = lawEnforcementBand.map((b, i) => ({ ...b, icon: BAND_ICONS[i] }));

function PrintDocument() {
  return (
    <div className="print-doc hidden print:block">
      <header className="print-doc__header">
        <div className="print-doc__org">المرصد الوطني لمؤشرات النزاهة والحوكمة ومكافحة الفساد</div>
        <h1>المفاهيم والمصطلحات</h1>
        <p className="print-doc__intro">
          مدخل مبسط للمصطلحات المعتمدة في المرصد الوطني، مع الإطار المرجعي لجهود تعزيز النزاهة والشفافية ومكافحة الفساد وفق معاييره الخمسة، ومنظومة إنفاذ القانون.
        </p>
      </header>

      <section className="print-doc__section">
        <h2>أولاً: المفاهيم والمصطلحات</h2>
        <table>
          <tbody>
            {GLOSSARY.map((g) => (
              <tr key={g.term}>
                <th scope="row">{g.term}</th>
                <td>{g.def}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="print-doc__section">
        <h2>ثانياً: إنفاذ القانون</h2>
        <table>
          <tbody>
            {LAW_ENFORCEMENT.map((l) => (
              <tr key={l.tag}>
                <th scope="row">{l.tag}</th>
                <td>
                  <div className="print-doc__bitle">{l.title}</div>
                  <div className="print-doc__def">{l.def}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="print-doc__section">
        <h2>ثالثاً: جهود تعزيز النزاهة والشفافية ومكافحة الفساد والمشاركة فيها</h2>
        <table>
          <tbody>
            {CRITERIA.map((c) => (
              <tr key={c.term}>
                <th scope="row">{c.term}</th>
                <td>{c.def}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

function Concepts() {
  return (
    <SiteLayout>
      <div className="print:hidden">
        <PageHeader
          eyebrow="المفاهيم والمصطلحات"
          title="بطاقات تعريفية للمفاهيم والمصطلحات"
          description="مدخل مبسط للمصطلحات المعتمدة في المرصد الوطني، مع الإطار المرجعي لجهود تعزيز النزاهة والشفافية ومكافحة الفساد وفق معاييره الخمسة."
        />

        <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold text-primary md:text-3xl">المفاهيم والمصطلحات</h2>
              <p className="mt-2 leading-8 text-muted-foreground">تعريفات موجزة للكلمات والمصطلحات الأكثر تداولاً ضمن بيانات وتقارير المرصد.</p>
            </div>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-lg gradient-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground shadow-soft transition-opacity hover:opacity-90 print:hidden"
            >
              <FileDown className="h-4 w-4" /> تحميل PDF
            </button>
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
              <h2 className="text-2xl font-bold text-primary md:text-3xl">إنفاذ القانون</h2>
              <p className="mt-2 leading-8 text-muted-foreground">
                أبرز مظاهر منظومة إنفاذ القانون في مكافحة الفساد، مقسّمة على بندين رئيسيين.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {LAW_ENFORCEMENT.map((l) => (
                <article key={l.tag} className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-elevated">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-surface text-accent">
                      <l.icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">{l.tag}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-primary">{l.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{l.def}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <h2 className="text-2xl font-bold text-primary md:text-3xl">جهود تعزيز النزاهة والشفافية ومكافحة الفساد والمشاركة فيها</h2>
            <p className="mt-2 leading-8 text-muted-foreground">
              الإطار المرجعي المعتمد لدى المرصد، موزّعاً على خمسة معايير تُعرض هنا كمصطلحات مع تعريفاتها: المساءلة، المشاركة، الفاعلية، الشفافية، والعدالة وعدم التمييز.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CRITERIA.map((c) => (
              <article key={c.term} className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-elevated">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-surface text-accent">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-primary">{c.term}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{c.def}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <PrintDocument />
    </SiteLayout>
  );
}
