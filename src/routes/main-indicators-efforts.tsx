import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { frameworkCriteria } from "@/lib/observatory-framework";
import { getLocale, useLocale, dictionaries } from "@/i18n";
import { FileDown, Gavel, Handshake, Zap, Eye, Scale } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const Route = createFileRoute("/main-indicators-efforts")({
  component: MainIndicatorsEfforts,
  head: () => {
    const dict = dictionaries[getLocale()];
    return {
      meta: [
        { title: dict["meta.effortsTitle"] },
        { name: "description", content: dict["meta.effortsDesc"] },
      ],
    };
  },
});

const CRITERIA_ICONS: LucideIcon[] = [Gavel, Handshake, Zap, Eye, Scale];

function PrintDocument() {
  const { t, d } = useLocale();
  return (
    <div className="print-doc hidden print:block">
      <header className="print-doc__header">
        <div className="print-doc__org">{t("efforts.printOrg")}</div>
        <h1>{t("efforts.printTitle")}</h1>
        <p className="print-doc__intro">{t("efforts.printIntro")}</p>
      </header>

      {frameworkCriteria.map((c) => (
        <section key={c.id} className="print-doc__section">
          <h2>{d(c.term)}</h2>
          <p className="print-doc__def">{d(c.def)}</p>
        </section>
      ))}
    </div>
  );
}

function MainIndicatorsEfforts() {
  const { t, d } = useLocale();
  return (
    <SiteLayout>
      <div className="print:hidden">
        <PageHeader
          eyebrow={t("efforts.eyebrow")}
          title={t("efforts.title")}
          description={t("efforts.desc")}
        />

        <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
              {t("efforts.intro")}
            </p>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-lg gradient-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground shadow-soft transition-opacity hover:opacity-90 print:hidden"
            >
              <FileDown className="h-4 w-4" /> {t("efforts.downloadPdf")}
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
                    <h2 className="text-2xl font-bold text-primary">{d(c.term)}</h2>
                  </div>
                  <p className="mb-4 max-w-3xl text-sm leading-7 text-muted-foreground">
                    {d(c.def)}
                  </p>
                  <div className="flex items-center justify-center rounded-2xl border border-dashed border-border bg-surface px-6 py-8">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {t("efforts.inProgress")}
                    </span>
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
