import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { HeroVisual } from "@/components/site/HeroVisual";
import { ComplaintsByGovernorate } from "@/components/site/ComplaintsByGovernorate";
import { dataSource } from "@/lib/mock-data";
import { getDashboardSummary } from "@/lib/enforcement-kpis";
import { YEARS as ENFORCEMENT_YEARS } from "@/components/site/EnforcementCharts";
import { getLocale, useLocale, dictionaries } from "@/i18n";
import {
  BarChart3,
  ArrowLeft,
  Database,
  BookOpen,
  Layers,
  ShieldCheck,
  Activity,
  ShieldAlert,
  CalendarCheck,
  CalendarRange,
  LayoutGrid,
  Info,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => {
    const dict = dictionaries[getLocale()];
    return {
      meta: [
        { title: dict["meta.homeTitle"] },
        {
          name: "description",
          content: dict["meta.homeDesc"],
        },
        { property: "og:title", content: dict["meta.homeTitle"] },
        { property: "og:description", content: dict["meta.homeDesc"] },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
});

function Home() {
  const { t, d, pick, dir, locale } = useLocale();
  const dq = dataSource.getDataQuality();
  const summaryKpis = getDashboardSummary(new Set<number>(ENFORCEMENT_YEARS));
  const heroStats = [
    { icon: CalendarCheck, label: t("home.heroStatUpdated"), value: d(dq.lastUpdate) },
    { icon: LayoutGrid, label: t("home.heroStatIndicators"), value: "31" },
    { icon: CalendarRange, label: t("home.heroStatCoverage"), value: dq.coveragePeriod },
  ];

  return (
    <SiteLayout>
      {/* HERO — light cover page, same background as the rest of the site */}
      <section className="cover relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-dots opacity-60" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-24 text-start lg:grid-cols-2 lg:px-8 lg:py-28">
          <div className="reveal">
            <div className="badge mb-6 inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              {t("home.heroBadge")}
            </div>
            <h1 className="section-title !border-0 !p-0 text-balance text-3xl font-extrabold md:text-4xl lg:text-[2.75rem]">
              {t("home.heroTitle")}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
              {t("home.heroDesc")}
            </p>

            <div className="mt-10">
              <Link
                to="/dashboard"
                className="focus-ring inline-flex items-center gap-3 rounded-lg bg-navy px-8 py-4 text-base font-bold text-white shadow-soft transition-colors hover:bg-navy-dark"
              >
                {t("home.heroCta")} <ArrowLeft className="h-5 w-5" />
              </Link>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
              {heroStats.map((s) => (
                <div key={s.label} className="card !p-4">
                  <div className="flex items-center gap-2 text-section-sub">
                    <s.icon className="h-4 w-4 text-accent" />
                    <span className="text-[11px] font-semibold">{s.label}</span>
                  </div>
                  <div className="mt-2 text-lg font-extrabold text-heading" dir={dir}>
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal flex justify-center lg:justify-end" style={{ animationDelay: "140ms" }}>
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* KPI CARDS */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <h2 className="section-title text-3xl md:text-4xl">{t("home.kpiTitle")}</h2>
        </div>
        <div className="kpi-row">
          {summaryKpis.map((k) => (
            <div key={k.id} dir={dir} className="kpi">
              <div className="lbl">{locale === "ar" ? k.label : k.labelEn}</div>
              <div className="num" dir={dir}>
                {k.value}
              </div>
            </div>
          ))}
        </div>
        <div className="note mt-3">
          <Info className="note-icon" />
          <p className="note-line">{t("dash2.carryOverNote")}</p>
        </div>
      </section>

      {/* COMPLAINTS BY GOVERNORATE */}
      <ComplaintsByGovernorate />

      {/* QUICK NAV CARDS */}
      <section className="bg-warm py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="section-title mb-10 border-0 text-center text-3xl md:text-4xl">
            {t("home.exploreTitle")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                to: "/commission",
                icon: ShieldCheck,
                title: t("home.explore1Title"),
                desc: t("home.explore1Desc"),
              },
              {
                to: "/about",
                icon: Layers,
                title: t("home.explore2Title"),
                desc: t("home.explore2Desc"),
              },
              {
                to: "/concepts",
                icon: BookOpen,
                title: t("home.explore3Title"),
                desc: t("home.explore3Desc"),
              },
              {
                to: "/dashboard",
                icon: BarChart3,
                title: t("home.explore4Title"),
                desc: t("home.explore4Desc"),
              },
              {
                to: "/indicators",
                icon: Activity,
                title: t("home.explore5Title"),
                desc: t("home.explore5Desc"),
              },
              {
                to: "/stories",
                icon: Database,
                title: t("home.explore7Title"),
                desc: t("home.explore7Desc"),
              },
            ].map((c) => (
              <Link
                key={c.to}
                to={c.to}
                className="focus-ring group rounded-xl border border-card-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-gold hover:shadow-elevated"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent ring-1 ring-inset ring-gold/30">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-heading">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  {t("home.exploreOpen")}{" "}
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* REPORT CORRUPTION CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="relative overflow-hidden rounded-xl bg-navy p-10 text-white md:p-14">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-3 py-1 text-xs font-semibold text-gold-light">
                <ShieldAlert className="h-3.5 w-3.5" /> {t("home.ctaBadge")}
              </div>
              <h2 className="text-3xl font-extrabold text-white md:text-4xl">{t("home.ctaTitle")}</h2>
              <p className="mt-3 text-base leading-8 text-white/85">{t("home.ctaDesc")}</p>
            </div>
            <div className="flex flex-wrap justify-start gap-3 md:justify-end">
              <a
                href="https://www.pacc.ps/complaints/create"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-white px-5 py-3 text-sm font-bold text-navy transition-transform hover:-translate-y-0.5"
              >
                {t("nav.report")}
              </a>
              <a
                href="https://www.pacc.ps/WitnessProtection"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-gold px-5 py-3 text-sm font-bold text-navy transition-colors hover:bg-gold-light"
              >
                {t("home.ctaProtection")}
              </a>
              <a
                href="https://www.pacc.ps/ContactUs"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-gold/50 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
              >
                {t("home.ctaContact")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
