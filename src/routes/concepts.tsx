import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { frameworkCriteria, lawEnforcementBand } from "@/lib/observatory-framework";
import { getLocale, useLocale, dictionaries } from "@/i18n";
import {
  FileDown,
  Gavel,
  Handshake,
  Zap,
  Eye,
  Scale,
  ScrollText,
  BookOpenText,
  Users,
  Sparkles,
  Fingerprint,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const Route = createFileRoute("/concepts")({
  component: Concepts,
  head: () => {
    const dict = dictionaries[getLocale()];
    return {
      meta: [
        { title: dict["meta.conceptsTitle"] },
        { name: "description", content: dict["meta.conceptsDesc"] },
      ],
    };
  },
});

function Glossary() {
  const { t } = useLocale();
  return [
    {
      icon: Scale,
      term: t("concepts.g1Term"),
      def: t("concepts.g1Def"),
    },
    {
      icon: BookOpenText,
      term: t("concepts.g2Term"),
      def: t("concepts.g2Def"),
    },
    {
      icon: Users,
      term: t("concepts.g3Term"),
      def: t("concepts.g3Def"),
    },
    {
      icon: Fingerprint,
      term: t("concepts.g4Term"),
      def: t("concepts.g4Def"),
    },
    {
      icon: Sparkles,
      term: t("concepts.g5Term"),
      def: t("concepts.g5Def"),
    },
    {
      icon: Handshake,
      term: t("concepts.g6Term"),
      def: t("concepts.g6Def"),
    },
  ];
}

const CRITERIA_ICONS: LucideIcon[] = [Gavel, Handshake, Zap, Eye, Scale];
const BAND_ICONS: LucideIcon[] = [ScrollText, Scale];

function PrintDocument() {
  const { t, d } = useLocale();
  const glossary = Glossary();
  const criteria = frameworkCriteria.map((c, i) => ({ ...c, icon: CRITERIA_ICONS[i] }));
  const lawEnforcement = lawEnforcementBand.map((b, i) => ({ ...b, icon: BAND_ICONS[i] }));
  return (
    <div className="print-doc hidden print:block">
      <header className="print-doc__header">
        <div className="print-doc__org">{t("concepts.printOrg")}</div>
        <h1>{t("concepts.printTitle")}</h1>
        <p className="print-doc__intro">{t("concepts.printIntro")}</p>
      </header>

      <section className="print-doc__section">
        <h2>{t("concepts.printS1")}</h2>
        <table>
          <tbody>
            {glossary.map((g) => (
              <tr key={g.term}>
                <th scope="row">{g.term}</th>
                <td>{g.def}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="print-doc__section">
        <h2>{t("concepts.printS2")}</h2>
        <table>
          <tbody>
            {lawEnforcement.map((l) => (
              <tr key={l.tag}>
                <th scope="row">{d(l.tag)}</th>
                <td>
                  <div className="print-doc__bitle">{d(l.title)}</div>
                  <div className="print-doc__def">{d(l.def)}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="print-doc__section">
        <h2>{t("concepts.printS3")}</h2>
        <table>
          <tbody>
            {criteria.map((c) => (
              <tr key={c.term}>
                <th scope="row">{d(c.term)}</th>
                <td>{d(c.def)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

function Concepts() {
  const { t, d } = useLocale();
  const glossary = Glossary();
  const criteria = frameworkCriteria.map((c, i) => ({ ...c, icon: CRITERIA_ICONS[i] }));
  const lawEnforcement = lawEnforcementBand.map((b, i) => ({ ...b, icon: BAND_ICONS[i] }));
  return (
    <SiteLayout>
      <div className="print:hidden">
        <PageHeader
          eyebrow={t("concepts.eyebrow")}
          title={t("concepts.title")}
          description={t("concepts.desc")}
        />

        <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold text-primary md:text-3xl">
                {t("concepts.glossaryTitle")}
              </h2>
              <p className="mt-2 leading-8 text-muted-foreground">{t("concepts.glossaryDesc")}</p>
            </div>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-lg gradient-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground shadow-soft transition-opacity hover:opacity-90 print:hidden"
            >
              <FileDown className="h-4 w-4" /> {t("concepts.downloadPdf")}
            </button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {glossary.map((g) => (
              <article
                key={g.term}
                className="glow-card rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-elevated"
              >
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
              <h2 className="text-2xl font-bold text-primary md:text-3xl">
                {t("concepts.enforceTitle")}
              </h2>
              <p className="mt-2 leading-8 text-muted-foreground">{t("concepts.enforceDesc")}</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {lawEnforcement.map((l) => (
                <article
                  key={l.tag}
                  className="glow-card rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-elevated"
                >
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-surface text-accent">
                      <l.icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                      {d(l.tag)}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-primary">{d(l.title)}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{d(l.def)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <h2 className="text-2xl font-bold text-primary md:text-3xl">
              {t("concepts.criteriaTitle")}
            </h2>
            <p className="mt-2 leading-8 text-muted-foreground">{t("concepts.criteriaDesc")}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {criteria.map((c) => (
              <article
                key={c.term}
                className="glow-card rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-elevated"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-surface text-accent">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-primary">{d(c.term)}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{d(c.def)}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <PrintDocument />
    </SiteLayout>
  );
}
