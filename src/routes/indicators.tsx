import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { YEARS } from "@/components/site/EnforcementCharts";
import { getSpotlight, nf, type YearFilter } from "@/lib/enforcement-kpis";
import { getLocale, useLocale, dictionaries } from "@/i18n";
import { Filter, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/indicators")({
  component: Indicators,
  head: () => {
    const dict = dictionaries[getLocale()];
    return {
      meta: [
        { title: dict["meta.indicatorsTitle"] },
        { name: "description", content: dict["meta.indicatorsDesc"] },
      ],
    };
  },
});

const ALL = new Set<number>(YEARS) as YearFilter;

/** Soft light backgrounds + matching strong number/band colors, cycled for the 11 slots. */
const SPOTLIGHT_COLORS = [
  { bg: "#e7efff", band: "#3b82f6", number: "#274dbd" },
  { bg: "#fdebe0", band: "#f97316", number: "#c44d0f" },
  { bg: "#fdf3d8", band: "#eab308", number: "#966d04" },
  { bg: "#e8ecf4", band: "#64748b", number: "#3f4a5c" },
  { bg: "#eef2f7", band: "#94a3b8", number: "#526071" },
  { bg: "#ddf4f1", band: "#0d9488", number: "#0b6f66" },
  { bg: "#fbeaf0", band: "#e11d48", number: "#b90f38" },
  { bg: "#eceffe", band: "#6366f1", number: "#4338ca" },
];

function YearFilterBar({
  selected,
  setSelected,
}: {
  selected: YearFilter;
  setSelected: (s: YearFilter) => void;
}) {
  const toggle = (y: number) => {
    const next = new Set(selected);
    if (next.has(y)) next.delete(y);
    else next.add(y);
    setSelected(next.size === 0 ? ALL : next);
  };
  const isAll = selected.size === YEARS.length;
  const { t } = useLocale();
  return (
    <div className="mx-auto mt-6 flex max-w-7xl flex-wrap items-center gap-2 rounded-xl border border-border bg-card p-3 shadow-soft px-4 lg:px-8">
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
        <Filter className="h-4 w-4" /> {t("ind.yearLabel")}:
      </span>
      <button
        onClick={() => setSelected(ALL)}
        className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
          isAll
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-foreground/80 hover:bg-secondary/70"
        }`}
      >
        {t("ind.allYears")}
      </button>
      {YEARS.map((y) => (
        <button
          key={y}
          onClick={() => toggle(y)}
          className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
            selected.has(y)
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-foreground/80 hover:bg-secondary/70"
          }`}
        >
          {y}
        </button>
      ))}
    </div>
  );
}

function Indicators() {
  const [selected, setSelected] = useState<YearFilter>(ALL);
  const kpis = getSpotlight(selected);
  const { t, locale, dir } = useLocale();

  return (
    <SiteLayout>
      <PageHeader eyebrow={t("ind.eyebrow")} title={t("ind.title")} description={t("ind.desc")} />

      <YearFilterBar selected={selected} setSelected={setSelected} />
      {selected.size !== YEARS.length && (
        <p className="mx-auto mt-3 max-w-7xl px-4 text-xs text-muted-foreground lg:px-8">
          {t("ind.filterNote", { years: [...selected].sort().join(", ") })}
        </p>
      )}

      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-xl font-bold text-primary">
            <Lightbulb className="h-5 w-5" /> {t("ind.sectionTitle")}
          </h2>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
          >
            ← {t("ind.backToDashboard")}
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {kpis.map((k, i) => {
            const c = SPOTLIGHT_COLORS[i % SPOTLIGHT_COLORS.length];
            return (
              <article
                key={k.id}
                dir={dir}
                className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1"
                style={{ background: c.bg }}
              >
                <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: c.band }} />
                <div
                  className={locale === "ar" ? "text-right" : "text-left"}
                  style={{ color: c.number }}
                >
                  {k.unit === "%" ? (
                    <div className="flex items-baseline justify-start gap-1" dir={dir}>
                      <span className="text-5xl font-extrabold tracking-tight">{k.value}</span>
                      <span className="text-3xl font-bold">٪</span>
                    </div>
                  ) : (
                    <div className="text-4xl font-extrabold tracking-tight" dir={dir}>
                      {k.value}
                      {k.unit ? <span className="text-2xl">{k.unit}</span> : null}
                    </div>
                  )}
                </div>
                <h3 className="mt-4 min-h-[2.5rem] text-[15px] font-bold leading-6 text-foreground">
                  {locale === "ar" ? k.label : k.labelEn}
                </h3>
              </article>
            );
          })}
        </div>
      </section>
    </SiteLayout>
  );
}
