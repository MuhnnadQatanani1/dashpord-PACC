import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ChartCard } from "@/components/site/ChartCard";
import { MultiLine, ShareDonut } from "@/components/site/Charts";
import { FunnelCard } from "@/components/site/FunnelCard";
import { HeroVisual } from "@/components/site/HeroVisual";
import { dataSource } from "@/lib/mock-data";
import { KPI_2025 } from "@/lib/pacc-dashboard-data";
import { interactiveIndicators } from "@/data/indicators-catalog";
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
  ChevronsLeft,
  ShieldAlert,
  CalendarCheck,
  CalendarRange,
  LayoutGrid,
  Megaphone,
  CheckCircle2,
  Send,
  Gavel,
  Percent,
  Scale,
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

const KEY_KPI_ICONS: Record<string, typeof Megaphone> = {
  complaints: Megaphone,
  completed: CheckCircle2,
  referrals: Send,
  convicted: Gavel,
  convictionRate: Percent,
  legislation: Scale,
};

const KEY_KPI_COLORS: Record<string, string> = {
  complaints: "#2563eb",
  completed: "#16a34a",
  referrals: "#d97706",
  convicted: "#dc2626",
  convictionRate: "#7c3aed",
  legislation: "#0d9488",
};

function Home() {
  const { t, d, pick } = useLocale();
  const journey = dataSource.getJourney();
  const findInd = (id: string) => interactiveIndicators.find((i) => i.id === id)!;
  const yearlyTotals = (id: string) => {
    const t = findInd(id).table;
    const last = t.rows[t.rows.length - 1];
    return [0, 1, 2, 3].map((i) => (typeof last[i + 1] === "number" ? (last[i + 1] as number) : 0));
  };
  const YRS = ["2022", "2023", "2024", "2025"];
  const incoming = yearlyTotals("pacc-complaints-source");
  const completed = yearlyTotals("pacc-complaints-completed");
  const flow = YRS.map((year, i) => ({ year, واردة: incoming[i], منجزة: completed[i] }));
  const sourceRows = findInd("pacc-complaints-source").table.rows;
  const sourcesDonut = sourceRows.slice(0, -1).map((r) => ({
    name: d(String(r[0])),
    value: Number(r[1]) + Number(r[2]) + Number(r[3]) + Number(r[4]),
  }));
  const topCrime = findInd("pacc-complaints-crime")
    .table.rows.slice(0, -1)
    .map((r) => ({
      name: d(String(r[0])),
      total: Number(r[1]) + Number(r[2]) + Number(r[3]) + Number(r[4]),
    }))
    .sort((a, b) => b.total - a.total)[0];
  const totalIncoming = incoming.reduce((a, b) => a + b, 0);
  const abuseShare = topCrime ? Math.round((topCrime.total / totalIncoming) * 100) : 0;
  const launch = {
    headline: t("home.launchHeadline"),
    date: t("home.launchDate"),
    paragraphs: [t("home.launchP1"), t("home.launchP2")] as string[],
    outputs: journey.slice(-4).map((m) => ({ title: d(m.title), desc: d(m.description) })),
  };
  const dq = dataSource.getDataQuality();
  const heroStats = [
    { icon: CalendarCheck, label: t("home.heroStatUpdated"), value: d(dq.lastUpdate) },
    { icon: LayoutGrid, label: t("home.heroStatIndicators"), value: "29" },
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
                  <div className="mt-2 text-lg font-extrabold text-white">{s.value}</div>
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

      {/* بداية المرصد الوطني */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                {t("home.launchEyebrow")}
              </div>
              <h2 className="text-balance text-3xl font-bold leading-tight text-primary md:text-4xl">
                {launch.headline}
              </h2>
              <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-foreground">
                <CalendarCheck className="h-4 w-4 text-accent" />
                {launch.date}
              </div>
            </div>

            <div className="lg:col-span-7">
              {launch.paragraphs.map((p: string) => (
                <p
                  key={p.slice(0, 24)}
                  className="mb-5 text-base leading-9 text-muted-foreground md:text-[1.0625rem]"
                >
                  {p}
                </p>
              ))}

              <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {launch.outputs.map((o: { title: string; desc: string }) => (
                  <div key={o.title} className="border-t border-border pt-4">
                    <h3 className="text-sm font-bold text-foreground">{o.title}</h3>
                    <p className="mt-1.5 text-sm leading-7 text-muted-foreground">{o.desc}</p>
                  </div>
                ))}
              </div>

              <Link
                to="/concepts"
                className="focus-ring mt-10 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <BookOpen className="h-4 w-4" /> {t("nav.concepts")}
              </Link>
            </div>
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {KPI_2025.map((k) => {
            const Icon = KEY_KPI_ICONS[k.icon];
            const color = KEY_KPI_COLORS[k.icon];
            return (
              <div
                key={k.id}
                className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-elevated"
              >
                <div
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-white"
                  style={{ background: color }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-black text-primary" dir="ltr">
                    {k.value.toLocaleString("en-US")}
                    {k.suffix}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-foreground">{k.label}</div>
                  <p className="mt-1.5 text-[11px] leading-5 text-muted-foreground">{k.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ABOUT SNAPSHOT */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:py-24 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="mb-3 inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              {t("home.aboutBadge")}
            </div>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              {t("home.aboutTitle")}
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              {t("home.aboutDescA")} <em>{t("home.aboutPerc")}</em>
              {t("home.aboutDescB")} <em>{t("home.aboutInd")}</em> {t("home.aboutDescC")}
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
            >
              {t("home.aboutMore")} <ChevronsLeft className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
            {[
              { icon: Database, title: t("home.cardDataTitle"), desc: t("home.cardDataDesc") },
              {
                icon: BarChart3,
                title: t("home.cardAnalyzeTitle"),
                desc: t("home.cardAnalyzeDesc"),
              },
              {
                icon: ShieldCheck,
                title: t("home.cardPolicyTitle"),
                desc: t("home.cardPolicyDesc"),
              },
              {
                icon: BookOpen,
                title: t("home.cardKnowledgeTitle"),
                desc: t("home.cardKnowledgeDesc"),
              },
            ].map((c) => (
              <div
                key={c.title}
                className="glow-card group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-elevated"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-inset ring-accent/20 transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-foreground">{c.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-surface py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mb-3 inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              {t("home.howBadge")}
            </div>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t("home.howTitle")}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{t("home.howDesc")}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              { n: "01", t: t("home.step1Title"), d: t("home.step1Desc") },
              { n: "02", t: t("home.step2Title"), d: t("home.step2Desc") },
              { n: "03", t: t("home.step3Title"), d: t("home.step3Desc") },
              { n: "04", t: t("home.step4Title"), d: t("home.step4Desc") },
            ].map((s, i) => (
              <div
                key={s.n}
                className="glow-card relative rounded-2xl border border-border bg-card p-6 shadow-soft"
              >
                <div className="text-5xl font-black text-accent/25">{s.n}</div>
                <h3 className="mt-2 text-lg font-bold text-foreground">{s.t}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{s.d}</p>
                {i < 3 && (
                  <div className="absolute -left-3 top-1/2 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-accent-foreground md:flex">
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MINI DASHBOARD PREVIEW */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              {t("home.dashBadge")}
            </div>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              {t("home.dashTitle")}
            </h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              {t("home.dashDesc", { crime: topCrime?.name ?? "", share: abuseShare })}
            </p>
          </div>
          <Link
            to="/dashboard"
            className="focus-ring inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            {t("home.dashCta")} <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ChartCard title={t("home.chartFlowTitle")} subtitle={t("home.chartFlowSubtitle")}>
              <MultiLine
                data={flow}
                keys={[
                  { key: "واردة", name: t("home.seriesIncoming") },
                  { key: "منجزة", name: t("home.seriesCompleted") },
                ]}
                height={360}
              />
            </ChartCard>
          </div>
          <ChartCard title={t("home.chartSourcesTitle")} subtitle={t("home.chartSourcesSubtitle")}>
            <ShareDonut data={sourcesDonut} />
          </ChartCard>
        </div>

        <div className="mt-6">
          <FunnelCard showLink />
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
