import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { frameworkCriteria } from "@/lib/observatory-framework";
import { FileDown, Gavel, Handshake, Zap, Eye, Scale } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const Route = createFileRoute("/main-indicators-efforts")({
  component: MainIndicatorsEfforts,
  head: () => ({
    meta: [
      { title: "المؤشرات الرئيسية لجهود مكافحة الفساد | المرصد الوطني" },
      { name: "description", content: "المؤشرات الرئيسية لجهود تعزيز النزاهة والشفافية ومكافحة الفساد وفق الإطار المرجعي المعتمد لدى المرصد." },
    ],
  }),
});

const CRITERIA_ICONS: LucideIcon[] = [Gavel, Handshake, Zap, Eye, Scale];

function PrintDocument() {
  return (
    <div className="print-doc hidden print:block">
      <header className="print-doc__header">
        <div className="print-doc__org">المرصد الوطني لمؤشرات النزاهة والحوكمة ومكافحة الفساد</div>
        <h1>المؤشرات الرئيسية لجهود مكافحة الفساد</h1>
        <p className="print-doc__intro">
          خمسة أقسام رئيسية لجهود تعزيز النزاهة والشفافية ومكافحة الفساد وفق الإطار المرجعي المعتمد لدى المرصد.
        </p>
      </header>

      {frameworkCriteria.map((c) => (
        <section key={c.id} className="print-doc__section">
          <h2>{c.term}</h2>
          <p className="print-doc__def">{c.def}</p>
        </section>
      ))}
    </div>
  );
}

function MainIndicatorsEfforts() {
  return (
    <SiteLayout>
      <div className="print:hidden">
        <PageHeader
          eyebrow="المؤشرات الرئيسة"
          title="المؤشرات الرئيسية لجهود مكافحة الفساد"
          description="خمسة أقسام رئيسية لجهود تعزيز النزاهة والشفافية ومكافحة الفساد وفق الإطار المرجعي للمرصد، وسيُضاف المحتوى الرقمي لكل قسم لاحقاً."
        />

        <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
              تقسّم جهود مكافحة الفساد في هذه الصفحة إلى خمسة أقسام وفق الإطار المرجعي للمرصد، وسيُرفد كل قسم بمؤشراته الرقمية لاحقاً.
            </p>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-lg gradient-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground shadow-soft transition-opacity hover:opacity-90 print:hidden"
            >
              <FileDown className="h-4 w-4" /> تحميل PDF
            </button>
          </div>

          <div className="space-y-12">
            {frameworkCriteria.map((c, i) => {
              const Icon = CRITERIA_ICONS[i];
              return (
                <div key={c.id}>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg gradient-accent text-accent-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary">{c.term}</h2>
                  </div>
                  <p className="mb-4 max-w-3xl text-sm leading-7 text-muted-foreground">{c.def}</p>
                  <div className="flex items-center justify-center rounded-2xl border border-dashed border-border bg-surface px-6 py-8">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">قيد الإعداد</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <PrintDocument />
    </SiteLayout>
  );
}
