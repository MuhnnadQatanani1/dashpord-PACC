import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { HeroVisual } from "@/components/site/HeroVisual";
import { dataSource } from "@/lib/mock-data";
import { getDashboardSummary } from "@/lib/enforcement-kpis";
import { YEARS as ENFORCEMENT_YEARS } from "@/components/site/EnforcementCharts";
import { getLocale, useLocale, dictionaries } from "@/i18n";
import hqImage from "@/assets/pacc-headquarters.png.asset.json";
import {
  BarChart3,
  ArrowLeft,
  Database,
  BookOpen,
  Layers,
  ShieldCheck,
  MapPin,
  Activity,
  ShieldAlert,
  CalendarCheck,
  CalendarRange,
  LayoutGrid,
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
  const summaryColors = [
    "#2563eb",
    "#16a34a",
    "#d97706",
    "#dc2626",
    "#7c3aed",
    "#0d9488",
    "#e11d48",
    "#ca8a04",
  ];
  const heroStats = [
    { icon: CalendarCheck, label: t("home.heroStatUpdated"), value: d(dq.lastUpdate) },
    { icon: LayoutGrid, label: t("home.heroStatIndicators"), value: "31" },
    { icon: CalendarRange, label: t("home.heroStatCoverage"), value: dq.coveragePeriod },
  ];

  return (
    <SiteLayout>
      {/* HERO — full-width headquarters photograph with navy overlay */}
      <section className="relative isolate overflow-hidden">
        <img
          src={hqImage.url}
          alt={pick(
            "مقر هيئة مكافحة الفساد الفلسطينية",
            "Palestinian Anti-Corruption Commission headquarters",
          )}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-[oklch(0.16_0.06_258)]/88" />
        <div className="absolute inset-0 bg-gradient-to-l from-[oklch(0.14_0.05_258)]/70 via-transparent to-[oklch(0.14_0.05_258)]/60" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-24 text-white lg:grid-cols-2 lg:px-8 lg:py-32">
          <div className="reveal">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-white/85">
              <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
              {t("home.heroBadge")}
            </div>
            <h1 className="text-balance text-4xl font-extrabold leading-[1.15] md:text-5xl lg:text-[3.4rem]">
              {t("home.heroTitle")}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-9 text-white/80 md:text-lg">
              {t("home.heroDesc")}
            </p>

            <div className="mt-10">
              <Link
                to="/dashboard"
                className="focus-ring inline-flex items-center gap-3 rounded-xl gradient-accent px-10 py-5 text-base font-extrabold text-accent-foreground shadow-glow transition-transform hover:-translate-y-0.5 hover:opacity-95"
              >
                {t("home.heroCta")} <ArrowLeft className="h-5 w-5" />
              </Link>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
              {heroStats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur"
                >
                  <div className="flex items-center gap-2 text-white/75">
                    <s.icon className="h-4 w-4 text-accent" />
                    <span className="text-[11px] font-semibold">{s.label}</span>
                  </div>
                  <div className="mt-2 text-lg font-extrabold text-white" dir={dir}>
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="reveal flex justify-center text-white/85 lg:justify-end"
            style={{ animationDelay: "140ms" }}
          >
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* KPI CARDS */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {t("home.kpiEyebrow")}
          </div>
          <h2 className="text-3xl font-bold text-primary md:text-4xl">{t("home.kpiTitle")}</h2>
          <p className="mt-3 leading-8 text-muted-foreground">{t("home.kpiDesc")}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {summaryKpis.map((k, i) => (
            <div
              key={k.id}
              dir={dir}
              className="relative overflow-hidden rounded-xl border border-border bg-card shadow-soft transition-shadow hover:shadow-elevated"
            >
              <span
                className="absolute inset-x-0 top-0 h-1.5"
                style={{ background: summaryColors[i % summaryColors.length] }}
              />
              <div className="flex flex-col gap-1 p-5 pt-4">
                <div className="flex items-center">
                  <span className="text-[13px] font-semibold leading-5 text-muted-foreground">
                    {locale === "ar" ? k.label : k.labelEn}
                  </span>
                </div>
                <div
                  className={`mt-1 text-4xl font-black tracking-tight text-foreground ${
                    locale === "ar" ? "text-right" : "text-left"
                  }`}
                  dir={dir}
                >
                  {k.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK NAV CARDS */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-10 text-center text-3xl font-bold text-foreground md:text-4xl">
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
                to: "/map",
                icon: MapPin,
                title: t("home.explore6Title"),
                desc: t("home.explore6Desc"),
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
                className="focus-ring glow-card group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-elevated"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-inset ring-accent/20">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground">{c.title}</h3>
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
        <div className="relative overflow-hidden rounded-2xl bg-primary p-10 text-white md:p-14">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">
                <ShieldAlert className="h-3.5 w-3.5" /> {t("home.ctaBadge")}
              </div>
              <h2 className="text-3xl font-extrabold md:text-4xl">{t("home.ctaTitle")}</h2>
              <p className="mt-3 text-base leading-8 text-white/85">{t("home.ctaDesc")}</p>
            </div>
            <div className="flex flex-wrap justify-start gap-3 md:justify-end">
              <a
                href="https://www.pacc.ps/complaints/create"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-primary shadow-soft hover:-translate-y-0.5 transition-transform"
              >
                {t("nav.report")}
              </a>
              <a
                href="https://www.pacc.ps/WitnessProtection"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-accent px-5 py-3 text-sm font-bold text-accent-foreground transition-opacity hover:opacity-90"
              >
                {t("home.ctaProtection")}
              </a>
              <Link
                to="/contact"
                className="rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold backdrop-blur hover:bg-white/20"
              >
                {t("home.ctaContact")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
