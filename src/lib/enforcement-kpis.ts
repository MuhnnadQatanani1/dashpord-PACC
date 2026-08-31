import { dashboardData, type SubTable } from "@/data/dashboardData";
import { YEARS } from "@/components/site/EnforcementCharts";

export type YearFilter = Set<number>;

export const nf = (v: number | null | undefined) => (v == null ? "—" : v.toLocaleString("en-US"));

/** Sum of a column over all years (year-row tables). */
export function columnTotal(table: SubTable, col: number | string): number {
  const idx = typeof col === "number" ? col : table.columns.indexOf(col);
  const valid = table.data
    .map((r) => (typeof r[idx] === "number" ? (r[idx] as number) : null))
    .filter((v): v is number => v != null);
  return valid.reduce((a, b) => a + b, 0);
}

/** Total complaints across the period (879 + 587 + 670 + 787). */
export const TOTAL_COMPLAINTS = 2923;

/** Summary cards on the dashboard page, updated by the year filter. */
export interface SummaryKpi {
  id: string;
  value: number | string;
  label: string;
  labelEn: string;
  suffix?: string;
}

export function getDashboardSummary(selected: YearFilter): SummaryKpi[] {
  const yearArray = YEARS.filter((y) => selected.has(y) || selected.size === 0);

  const sumYearCol = (table: SubTable, year: number, colIdx: number): number => {
    const row = table.data.find((r) => Number(r[0]) === year);
    if (!row) return 0;
    return typeof row[colIdx] === "number" ? (row[colIdx] as number) : 0;
  };

  const sumComplaints = yearArray.reduce(
    (s, y) => s + sumYearCol(dashboardData.complaintsBySource, y, 6),
    0,
  );
  const sumCompleted = yearArray.reduce(
    (s, y) => s + sumYearCol(dashboardData.completedComplaints.totalAtCommission, y, 4),
    0,
  );
  const sumLegis = yearArray.reduce((s, y) => s + sumYearCol(dashboardData.legislations, y, 5), 0);
  const sumReferred = yearArray.reduce(
    (s, y) => s + sumYearCol(dashboardData.filesReferredToProsecutionBySource, y, 5),
    0,
  );
  const sumConvicted = yearArray.reduce(
    (s, y) => s + sumYearCol(dashboardData.courtVerdictResults, y, 6),
    0,
  );
  const sumProcedures = yearArray.reduce(
    (s, y) => s + sumYearCol(dashboardData.prosecutionFilesCompletedByProcedure, y, 5),
    0,
  );
  const sumDefendants = yearArray.reduce(
    (s, y) => s + sumYearCol(dashboardData.defendantsReferredToCourtByGender, y, 3),
    0,
  );
  const sumVerdicts = yearArray.reduce(
    (s, y) => s + sumYearCol(dashboardData.courtVerdictResults, y, 5),
    0,
  );

  return [
    {
      id: "complaints",
      value: nf(sumComplaints),
      label: "إجمالي الشكاوى والبلاغات الواردة",
      labelEn: "Total complaints and reports received",
    },
    {
      id: "completed",
      value: nf(sumCompleted),
      label: "إجمالي الشكاوى المنجزة لدى الهيئة",
      labelEn: "Total complaints completed at the Commission",
    },
    {
      id: "legislations",
      value: nf(sumLegis),
      label: "إجمالي التشريعات والبنود المعززة للوقاية",
      labelEn: "Total legislations and provisions for prevention",
    },
    {
      id: "referred",
      value: nf(sumReferred),
      label: "ملفات التحقيق الواردة لنيابة جرائم الفساد",
      labelEn: "Investigation files received by the Corruption Crimes Prosecution",
    },
    {
      id: "convicted",
      value: nf(sumConvicted),
      label: "إجمالي المحكومين (المدانين) في محكمة جرائم الفساد",
      labelEn: "Total convicted persons in the Corruption Crimes Court",
    },
    {
      id: "procedures",
      value: nf(sumProcedures),
      label: "ملفات التحقيق المنجزة لنيابة جرائم الفساد",
      labelEn: "Investigation files completed by the Corruption Crimes Prosecution",
    },
    {
      id: "defendants",
      value: nf(sumDefendants),
      label: "المتهمون المحالون لمحكمة جرائم الفساد",
      labelEn: "Defendants referred to the Corruption Crimes Court",
    },
    {
      id: "verdicts",
      value: nf(sumVerdicts),
      label: "القضايا المفصولة بحكم",
      labelEn: "Cases settled by verdict",
    },
  ];
}

/** Spotlight KPI numbers for the selected years. */
export interface SpotlightKpi {
  id: string;
  value: string;
  unit: "%" | "ملف" | "فرد" | "شكوى" | "مشتبه به" | "";
  label: string;
  labelEn: string;
  note?: string;
  isRatio?: boolean;
}

function pct(part: number, whole: number): string {
  if (!whole) return "0.0";
  return ((part / whole) * 100).toFixed(1);
}

/** Recompute spotlight cards for a specific set of years (default all four). */
export function getSpotlight(selected: YearFilter): SpotlightKpi[] {
  const yearArray: number[] = YEARS.filter((y) => selected.has(y) || selected.size === 0);
  const all = selected.size === 0 || selected.size === YEARS.length;

  const catByYear = (table: SubTable, rowName: string, year: number): number => {
    const row = table.data.find((r) => String(r[0]) === rowName);
    if (!row) return 0;
    const idx = table.columns.slice(1).indexOf(String(year)) + 1;
    const v = row[idx];
    return typeof v === "number" ? v : 0;
  };

  const catYearTotal = (table: SubTable, year: number): number => {
    if (!table.total_row) return 0;
    const idx = table.columns.slice(1).indexOf(String(year)) + 1;
    const v = table.total_row[idx];
    return typeof v === "number" ? v : 0;
  };

  const catSum = (table: SubTable, rowName: string): number => {
    const row = table.data.find((r) => String(r[0]) === rowName);
    if (!row) return 0;
    if (all) {
      return row
        .slice(1, 5)
        .map((v) => (typeof v === "number" ? v : 0))
        .reduce((a, b) => a + b, 0);
    }
    return yearArray.reduce((s, y) => s + catByYear(table, rowName, y), 0);
  };

  const yrSum = (table: SubTable, year: number, colIdx: number): number => {
    const row = table.data.find((r) => Number(r[0]) === year);
    if (!row) return 0;
    return typeof row[colIdx] === "number" ? (row[colIdx] as number) : 0;
  };

  const complaintsTotal = all
    ? TOTAL_COMPLAINTS
    : yearArray.reduce((s, y) => s + yrSum(dashboardData.complaintsBySource, y, 6), 0);

  const femaleSum = all
    ? 140
    : yearArray.reduce((s, y) => s + yrSum(dashboardData.complaintsBySource, y, 2), 0);

  const abuseSum = catSum(dashboardData.complaintsByCrimeQualification, "إساءة استعمال السلطة");
  const abuseTotal = all ? TOTAL_COMPLAINTS : complaintsTotal;

  const attendanceSum = catSum(
    dashboardData.complaintsByReceiptMethod,
    "الحضور الشخصي وتسليم باليد",
  );
  const electronicSum = catSum(
    dashboardData.complaintsByReceiptMethod,
    "الوسائل والتطبيقات الإلكترونية",
  );

  const forgeryInv = catSum(
    dashboardData.investigationFilesReferredToProsecutionBySectorAndCrime.byCrime,
    "التزوير/إعطاء مصدقات كاذبة/استعمال سند مزور",
  );
  const totalReferredByCrime = all
    ? 319
    : yearArray.reduce(
        (sum, y) =>
          sum +
          catYearTotal(
            dashboardData.investigationFilesReferredToProsecutionBySectorAndCrime.byCrime,
            y,
          ),
        0,
      );

  const suspects = all
    ? 226
    : dashboardData.suspectsReferredToProsecution.data
        .filter((r) => yearArray.includes(Number(r[0])))
        .reduce((s, r) => s + (typeof r[3] === "number" ? (r[3] as number) : 0), 0);

  const paccSrc = all
    ? 165
    : yearArray.reduce(
        (s, y) => s + yrSum(dashboardData.filesReferredToProsecutionBySource, y, 1),
        0,
      );
  const paccSrcTotal = all
    ? 263
    : yearArray.reduce(
        (s, y) => s + yrSum(dashboardData.filesReferredToProsecutionBySource, y, 5),
        0,
      );

  const toCourtMale = all
    ? 283
    : yearArray.reduce(
        (s, y) => s + yrSum(dashboardData.defendantsReferredToCourtByGender, y, 1),
        0,
      );
  const toCourtTotalAll = all
    ? 310
    : toCourtMale +
      yearArray.reduce(
        (s, y) => s + yrSum(dashboardData.defendantsReferredToCourtByGender, y, 2),
        0,
      );
  const toCourtLegal = all
    ? 3
    : yearArray.reduce(
        (s, y) => s + yrSum(dashboardData.defendantsReferredToCourtByGender, y, 4),
        0,
      );

  const forgeryCourt = catSum(
    dashboardData.prosecutionFilesReferredToCourtByCrime,
    "التزوير/إعطاء مصدقات كاذبة/استعمال سند مزور",
  );
  const courtTotalReferred = all
    ? 458
    : yearArray.reduce(
        (s, y) => s + catYearTotal(dashboardData.prosecutionFilesReferredToCourtByCrime, y),
        0,
      );

  const convictionCount = all
    ? 33
    : yearArray.reduce((s, y) => s + yrSum(dashboardData.courtVerdictResults, y, 1), 0);
  const verdictTotal = all
    ? 69
    : yearArray.reduce((s, y) => s + yrSum(dashboardData.courtVerdictResults, y, 5), 0);

  return [
    {
      id: "female-participation",
      value: pct(femaleSum, complaintsTotal),
      unit: "%",
      label: "نسبة مشاركة الإناث ضمن الشكاوى الواردة إلى الهيئة",
      labelEn: "Share of female complainants among complaints received by the Commission",
      isRatio: true,
      note: all
        ? "أفراد-أنثى (140) من إجمالي 2923 شكوى"
        : `أنثى (${nf(femaleSum)}) من إجمالي ${nf(complaintsTotal)} في السنوات المختارة`,
    },
    {
      id: "top-crime",
      value: pct(abuseSum, abuseTotal),
      unit: "%",
      label: "من الشكاوى الواردة صُنّفت كإساءة استعمال للسلطة",
      labelEn: "of complaints received classified as abuse of power",
      isRatio: true,
      note: all
        ? "2256 من إجمالي 2923 - الأعلى تكراراً في السنوات الأربع"
        : `${nf(abuseSum)} من ${nf(abuseTotal)} في السنوات المختارة`,
    },
    {
      id: "personal-attendance",
      value: pct(attendanceSum, complaintsTotal),
      unit: "%",
      label: "من الشكاوى الواردة عن طريق الحضور الشخصي والتسليم باليد",
      labelEn: "of complaints received by in-person attendance and hand delivery",
      isRatio: true,
      note: all ? "1086 شكوى من إجمالي 2923" : `${nf(attendanceSum)} من ${nf(complaintsTotal)}`,
    },
    {
      id: "electronic",
      value: pct(electronicSum, complaintsTotal),
      unit: "%",
      label: "من الشكاوى الواردة عبر الوسائل والتطبيقات الإلكترونية",
      labelEn: "of complaints received via electronic means and applications",
      isRatio: true,
      note: all ? "1634 شكوى من إجمالي 2923" : `${nf(electronicSum)} من ${nf(complaintsTotal)}`,
    },
    {
      id: "forgery-files",
      value: pct(forgeryInv, totalReferredByCrime),
      unit: "%",
      label: "من الملفات التحقيقية المحالة إلى النيابة عن جريمة التزوير",
      labelEn: "of investigation files referred to the Prosecution for forgery",
      isRatio: true,
      note: all
        ? `${nf(forgeryInv)} من إجمالي ${nf(totalReferredByCrime)} ملفاً`
        : `${nf(forgeryInv)} من ${nf(totalReferredByCrime)} في السنوات المختارة`,
    },
    {
      id: "suspects",
      value: nf(suspects),
      unit: "",
      label: "عدد المشتبه بهم المحالين إلى النيابة العامة (المجموع الكلي)",
      labelEn: "Number of suspects referred to the Public Prosecution (total)",
      note: "2022: 93 · 2023: 58 · 2024: 75 (يُستثنى صف 68 المكرّر) - المجموع 226",
    },
    {
      id: "pacc-source",
      value: pct(paccSrc, paccSrcTotal),
      unit: "%",
      label: "من ملفات التحقيق الجزائي الواردة إلى النيابة من الهيئة",
      labelEn: "of criminal investigation files received by the Prosecution from the Commission",
      isRatio: true,
      note: all
        ? `${nf(paccSrc)} من إجمالي ${nf(paccSrcTotal)} قضية واردة`
        : `${nf(paccSrc)} من ${nf(paccSrcTotal)} في السنوات المختارة`,
    },
    {
      id: "to-court",
      value: nf(toCourtTotalAll),
      unit: "",
      label: "عدد الأفراد المحالين إلى محكمة جرائم الفساد",
      labelEn: "Number of individuals referred to the Corruption Crimes Court",
      note: `إضافة إلى ${nf(toCourtLegal)} أشخاص معنويين`,
    },
    {
      id: "court-top-crime",
      value: pct(forgeryCourt, courtTotalReferred),
      unit: "%",
      label: "من الجرائم المحالة إلى المحكمة كيّفت على أنها تزوير",
      labelEn: "of crimes referred to court classified as forgery",
      isRatio: true,
      note: `${nf(forgeryCourt)} من إجمالي ${nf(courtTotalReferred)} ملفاً محالاً للمحكمة`,
    },
    {
      id: "male-share",
      value: pct(toCourtMale, toCourtTotalAll),
      unit: "%",
      label: "نسبة الذكور ضمن المتهمين المحالين إلى المحكمة",
      labelEn: "Share of males among defendants referred to court",
      isRatio: true,
      note: `${nf(toCourtMale)} ذكراً من إجمالي ${nf(toCourtTotalAll)} أفراد`,
    },
    {
      id: "conviction-rate",
      value: pct(convictionCount, verdictTotal),
      unit: "%",
      label: "نسبة الإدانات ضمن القضايا المفصولة بحكم في المحكمة",
      labelEn: "Share of convictions among cases settled by verdict",
      isRatio: true,
      note: `${nf(convictionCount)} إدانة من إجمالي ${nf(verdictTotal)} قضية مفصولة`,
    },
  ];
}
