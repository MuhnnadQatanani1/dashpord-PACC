import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ReactElement } from "react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { YEARS } from "@/components/site/EnforcementCharts";
import {
  LegislationsChart,
  ComplaintsBySourceChart,
  ComplaintsBySourcePeriodChart,
  ComplaintsBySectorChart,
  ComplaintsByReceiptMethodChart,
  ComplaintsByReceiptMethodPeriodChart,
  InvestigationFilesChart,
  CompletedComplaintsChart,
  FilesReferredBySourceChart,
  CourtByCrimeChart,
  FilesCompletedByProcedureChart,
  DefendantsByGenderChart,
  CourtVerdictsChart,
  ConvictedCountChart,
} from "@/components/site/EnforcementCharts";
import { DataTable } from "@/components/site/DataTable";
import { getDashboardSummary } from "@/lib/enforcement-kpis";
import { dashboardData, type SubTable } from "@/data/dashboardData";
import { getLocale, dictionaries, useLocale } from "@/i18n";
import type { Dict } from "@/i18n/ar";
import { Filter, Info, Lightbulb, Table2 } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => {
    const dict = dictionaries[getLocale()];
    return {
      meta: [
        { title: dict["meta.dashboardTitle"] },
        { name: "description", content: dict["meta.dashboardDesc"] },
      ],
    };
  },
});

type YearFilter = Set<number>;

const ALL_YEARS = new Set<number>(YEARS) as YearFilter;

interface IndicatorDef {
  id: number;
  title: string;
  titleKey: keyof Dict;
  subtitle: string;
  kpi?: string;
  dataKey: string;
  Chart: (p: { selected: YearFilter }) => ReactElement;
  table: () => SubTable;
  note?: string;
  noteEn?: string;
  noteType?: "info" | "warn";
}

const INDICATORS: IndicatorDef[] = [
  {
    id: 1,
    title: "عدد التشريعات أو البنود المعززة للوقاية من الفساد",
    titleKey: "dash2.ind1T",
    subtitle: "توزيعها حسب نوع التشريع عبر السنوات",
    kpi: "المجموع الكلي: 182",
    dataKey: "legislations",
    Chart: LegislationsChart,
    table: () => dashboardData.legislations,
  },
  {
    id: 2,
    title: "الشكاوى والبلاغات حسب مصدر التقديم",
    titleKey: "dash2.ind2T",
    subtitle: "توزيع أفراد/مؤسسات/مجهول حسب السنة",
    kpi: "إجمالي 2923",
    dataKey: "complaintsBySource",
    Chart: ComplaintsBySourceChart,
    table: () => dashboardData.complaintsBySource,
  },
  {
    id: 13,
    title: "الشكاوى والبلاغات حسب مصدر التقديم",
    titleKey: "dash2.ind13T",
    subtitle: "نسبة كل مصدر من الإجمالي الكلي للفترة",
    kpi: "إجمالي 2923",
    dataKey: "complaintsBySource",
    Chart: ComplaintsBySourcePeriodChart,
    table: () => dashboardData.complaintsBySource,
  },
  {
    id: 3,
    title: "الشكاوى حسب قطاع المشتكى عليه",
    titleKey: "dash2.ind3T",
    subtitle: "أعمدة أفقية قابلة للفلترة بالسنة",
    kpi: "إجمالي 2923",
    dataKey: "complaintsBySector",
    Chart: ComplaintsBySectorChart,
    table: () => dashboardData.complaintsBySector,
  },
  {
    id: 4,
    title: "الشكاوى حسب طريقة الاستلام",
    titleKey: "dash2.ind4T",
    subtitle: "توزيع طرق الاستلام حسب السنة",
    kpi: "إجمالي 2923",
    dataKey: "complaintsByReceiptMethod",
    Chart: ComplaintsByReceiptMethodChart,
    table: () => dashboardData.complaintsByReceiptMethod,
  },
  {
    id: 14,
    title: "الشكاوى حسب طريقة الاستلام",
    titleKey: "dash2.ind14T",
    subtitle: "نسبة كل طريقة من الإجمالي الكلي للفترة",
    kpi: "إجمالي 2923",
    dataKey: "complaintsByReceiptMethod",
    Chart: ComplaintsByReceiptMethodPeriodChart,
    table: () => dashboardData.complaintsByReceiptMethod,
  },
  {
    id: 5,
    title: "الملفات التحقيقية لدى الهيئة حسب التكييف القانوني",
    titleKey: "dash2.ind5T",
    subtitle: "مرتب تنازلياً حسب الحجم، مع فلتر سنة",
    kpi: "إجمالي 1049",
    dataKey: "investigationFilesByQualification",
    Chart: InvestigationFilesChart,
    table: () => dashboardData.investigationFilesByQualification,
  },
  {
    id: 6,
    title: "عدد الشكاوى المنجزة لدى هيئة مكافحة الفساد",
    titleKey: "dash2.ind6T",
    subtitle: "الإجمالي لدى الهيئة حسب النتيجة (حفظ / عدم اختصاص / إحالة)",
    kpi: "إجمالي 2676",
    dataKey: "completedComplaints",
    Chart: CompletedComplaintsChart,
    table: () => dashboardData.completedComplaints.totalAtCommission,
    note: "يتوفر تفصيلان إضافيان: قبل التحقيق وبعد التحقيق.",
    noteEn: "Two additional breakdowns are available: before and after investigation.",
  },
  {
    id: 7,
    title: "الملفات المحالة لنيابة جرائم الفساد حسب المصدر",
    titleKey: "dash2.ind7T",
    subtitle: "هيئة / النائب العام / منبثقة عن قضية / واردة من جهات أخرى",
    kpi: "إجمالي 263 قضية",
    dataKey: "filesReferredToProsecutionBySource",
    Chart: FilesReferredBySourceChart,
    table: () => dashboardData.filesReferredToProsecutionBySource,
  },
  {
    id: 8,
    title: "ملفات النيابة المحالة للمحكمة حسب الجرم",
    titleKey: "dash2.ind8T",
    subtitle: "أعمدة أفقية مع فلتر سنة (تُتجاهل القيم غير المتوفرة)",
    kpi: "إجمالي 458",
    dataKey: "prosecutionFilesReferredToCourtByCrime",
    Chart: CourtByCrimeChart,
    table: () => dashboardData.prosecutionFilesReferredToCourtByCrime,
  },
  {
    id: 9,
    title: "ملفات النيابة المنجزة حسب الإجراء",
    titleKey: "dash2.ind9T",
    subtitle: "إحالة للمحكمة / حفظ / ضم / إحالة لنيابات أخرى",
    kpi: "إجمالي 219",
    dataKey: "prosecutionFilesCompletedByProcedure",
    Chart: FilesCompletedByProcedureChart,
    table: () => dashboardData.prosecutionFilesCompletedByProcedure,
  },
  {
    id: 10,
    title: "المتهمون المحالون لمحكمة جرائم الفساد حسب الجنس",
    titleKey: "dash2.ind10T",
    subtitle: "أفراد ذكر / أنثى",
    kpi: "إجمالي 310 أفراد",
    dataKey: "defendantsReferredToCourtByGender",
    Chart: DefendantsByGenderChart,
    table: () => dashboardData.defendantsReferredToCourtByGender,
    note: "شخص معنوي: 2 في 2022، و1 في 2025 (المجموع 3).",
    noteEn: "Legal persons: 2 in 2022, and 1 in 2025 (total 3).",
  },
  {
    id: 11,
    title: "القضايا المفصولة بحكم حسب النتيجة",
    titleKey: "dash2.ind11T",
    subtitle: "إدانة / براءة / عدم اختصاص / انقضاء الدعوى",
    kpi: "إجمالي 69 قضية",
    dataKey: "courtVerdictResults",
    Chart: CourtVerdictsChart,
    table: () => dashboardData.courtVerdictResults,
  },
  {
    id: 12,
    title: "عدد المحكوم عليهم (المدانين) في محكمة جرائم الفساد",
    titleKey: "dash2.ind12T",
    subtitle: "تطور عدد المدانين حسب السنة",
    kpi: "إجمالي 45",
    dataKey: "courtVerdictResults-convicted",
    Chart: ConvictedCountChart,
    table: () => dashboardData.courtVerdictResults,
  },
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
    if (next.has(y)) {
      next.delete(y);
    } else {
      next.add(y);
    }
    // if empty -> all
    setSelected(next.size === 0 ? ALL_YEARS : next);
  };
  const isAll = selected.size === YEARS.length;
  const { t } = useLocale();
  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1.5 shadow-soft">
      <span className="inline-flex items-center gap-1.5 px-2.5 text-[13px] font-semibold text-muted-foreground">
        <Filter className="h-4 w-4 text-accent" /> {t("dash2.filterTitle")}
      </span>
      <button
        onClick={() => setSelected(ALL_YEARS)}
        className={`rounded-md px-3 py-1.5 text-sm font-bold transition-colors ${
          isAll
            ? "bg-accent text-accent-foreground shadow-sm"
            : "bg-surface text-foreground/80 hover:bg-secondary"
        }`}
      >
        {t("dash2.allYears")}
      </button>
      {YEARS.map((y) => (
        <button
          key={y}
          onClick={() => toggle(y)}
          className={`rounded-md px-3 py-1.5 text-sm font-bold transition-colors ${
            selected.has(y)
              ? "bg-accent text-accent-foreground shadow-sm"
              : "bg-surface text-foreground/80 hover:bg-secondary"
          }`}
        >
          {y}
        </button>
      ))}
    </div>
  );
}

function SummaryCards({ selected }: { selected: YearFilter }) {
  const items = getDashboardSummary(selected);
  const { t, locale } = useLocale();
  const colors = [
    "#2563eb",
    "#16a34a",
    "#d97706",
    "#dc2626",
    "#7c3aed",
    "#0d9488",
    "#e11d48",
    "#ca8a04",
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 lg:px-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((k, i) => (
          <div
            key={k.id}
            className="relative overflow-hidden rounded-xl border border-border bg-card shadow-soft transition-shadow hover:shadow-elevated"
          >
            <span
              className="absolute inset-x-0 top-0 h-1.5"
              style={{ background: colors[i % colors.length] }}
            />
            <div className="flex flex-col gap-1 p-5 pt-4">
              <div className="flex items-center gap-2">
                <div
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-white"
                  style={{ background: colors[i % colors.length] }}
                >
                  <span className="text-xs font-bold">{k.id === "complaints" ? "ش" : "م"}</span>
                </div>
                <span className="text-[13px] font-semibold leading-5 text-muted-foreground">
                  {locale === "ar" ? k.label : k.labelEn}
                </span>
              </div>
              <div className="mt-1 text-4xl font-black tracking-tight text-foreground" dir="ltr">
                {k.value}
              </div>
            </div>
          </div>
        ))}
      </div>
      {selected.size !== YEARS.length && (
        <p className="mt-3 text-xs text-muted-foreground">
          {t("dash2.summaryNote", { years: [...selected].sort().join("، ") })}
        </p>
      )}
    </section>
  );
}

function IndicatorCard({ ind, selected }: { ind: IndicatorDef; selected: YearFilter }) {
  const [showData, setShowData] = useState(false);
  const C = ind.Chart;
  const { t, locale } = useLocale();
  const translateKpi = (kpi: string): string => {
    if (locale === "ar") return kpi;
    const n = kpi.replace(/[^0-9,.\s]/g, "").trim();
    if (kpi.startsWith("المجموع الكلي")) return t("dash2.kpiTotal", { value: n });
    if (kpi.includes("أفراد")) return t("dash2.kpiTotalPersons", { value: n });
    if (kpi.includes("قضية")) return t("dash2.kpiTotalFiles", { value: n });
    return t("dash2.kpiTotal", { value: n });
  };
  return (
    <article
      className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-soft transition-shadow hover:shadow-elevated"
      id={`indicator-${ind.dataKey}`}
    >
      <div className="flex items-center justify-between gap-2 border-b border-border bg-surface px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent text-xs font-bold text-accent-foreground">
            {ind.id}
          </span>
          <h3 className="text-sm font-bold leading-5 text-foreground">{t(ind.titleKey)}</h3>
        </div>
        <div className="flex items-center gap-2">
          {ind.kpi && (
            <span className="hidden shrink-0 items-center gap-1 rounded-md bg-accent-soft px-2 py-1 text-xs font-bold text-foreground sm:inline-flex">
              {translateKpi(ind.kpi)}
            </span>
          )}
          <button
            onClick={() => setShowData((v) => !v)}
            className="inline-flex shrink-0 items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-xs font-semibold text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
            aria-expanded={showData}
          >
            <Table2 className="h-3.5 w-3.5" />
            {showData ? t("dash2.hideData") : t("dash2.showData")}
          </button>
        </div>
      </div>

      <div className="flex-1 bg-card p-4">
        {showData ? (
          <DataTable table={ind.table()} />
        ) : (
          <div className="flex min-h-[260px] flex-col">
            <div className="flex-1">
              <C selected={selected} />
            </div>
          </div>
        )}
      </div>

      {ind.note && (
        <p
          className={`mx-4 mb-4 flex items-start gap-1.5 rounded-lg px-3 py-2 text-[11px] leading-5 ${
            ind.noteType === "warn"
              ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
              : "bg-muted/60 text-muted-foreground"
          }`}
        >
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />{" "}
          {locale === "ar" ? ind.note : (ind.noteEn ?? ind.note)}
        </p>
      )}
    </article>
  );
}

function Dashboard() {
  const [selected, setSelected] = useState<YearFilter>(ALL_YEARS);
  const { t } = useLocale();

  return (
    <SiteLayout>
      <PageHeader
        eyebrow={t("dash2.eyebrow")}
        title={t("dash2.title")}
        description={t("dash2.desc")}
      />

      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 lg:px-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <YearFilterBar selected={selected} setSelected={setSelected} />
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/indicators"
              className="inline-flex w-fit items-center gap-2 rounded-md gradient-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-soft transition-transform hover:-translate-y-0.5"
            >
              <Lightbulb className="h-4 w-4" /> {t("dash2.spotlight")}
            </Link>
            <span className="hidden items-center gap-1.5 rounded-md border border-border bg-card px-3 py-2 text-xs font-semibold text-muted-foreground md:inline-flex">
              <Info className="h-3.5 w-3.5" /> {t("dash2.hoverHint")}
            </span>
          </div>
        </div>
      </div>

      <div className="pb-8 pt-2">
        <SummaryCards selected={selected} />
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-20 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-bold text-primary">{t("dash2.sectionTitle")}</h2>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground">
            <Info className="h-3.5 w-3.5" /> {t("dash2.hoverHint")}
          </span>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {INDICATORS.map((ind) => (
            <IndicatorCard key={ind.dataKey} ind={ind} selected={selected} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
