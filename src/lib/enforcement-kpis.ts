import { dashboardData, type SubTable } from "@/data/dashboardData";
import { YEARS } from "@/components/site/EnforcementCharts";

export type YearFilter = Set<number>;

export const nf = (v: number | null | undefined) => (v == null ? "â€”" : v.toLocaleString("en-US"));

/** Sum of a column over all years (year-row tables). */
export function columnTotal(table: SubTable, col: number | string): number {
  const idx = typeof col === "number" ? col : table.columns.indexOf(col);
  const valid = table.data
    .map((r) => (typeof r[idx] === "number" ? (r[idx] as number) : null))
    .filter((v): v is number => v != null);
  return valid.reduce((a, b) => a + b, 0);
}

/** Total complaints across the period (879+587+670+787). */
export const TOTAL_COMPLAINTS = 2923;

/** 10 summary cards on the dashboard page, updated by the year filter. */
export interface SummaryKpi {
  id: string;
  value: number | string;
  label: string;
  labelEn: string;
  suffix?: string;
}

export function getDashboardSummary(selected: YearFilter): SummaryKpi[] {
  // summed over selected years
  const yearArray = YEARS.filter((y) => selected.has(y) || selected.size === 0);

  const sumYearCol = (table: SubTable, year: number, colIdx: number): number => {
    const row = table.data.find((r) => Number(r[0]) === year);
    if (!row) return 0;
    return typeof row[colIdx] === "number" ? (row[colIdx] as number) : 0;
  };

  const yrs = yearArray;

  const sumComplaints = yrs.reduce(
    (s, y) => s + sumYearCol(dashboardData.complaintsBySource, y, 6),
    0,
  );
  const sumCompleted = yrs.reduce(
    (s, y) => s + sumYearCol(dashboardData.completedComplaints.totalAtCommission, y, 4),
    0,
  );
  const sumLegis = yrs.reduce((s, y) => s + sumYearCol(dashboardData.legislations, y, 5), 0);
  const sumReferred = yrs.reduce(
    (s, y) => s + sumYearCol(dashboardData.filesReferredToProsecutionBySource, y, 5),
    0,
  );
  const sumConvicted = yrs.reduce(
    (s, y) => s + sumYearCol(dashboardData.courtVerdictResults, y, 6),
    0,
  );

  return [
    {
      id: "complaints",
      value: nf(sumComplaints),
      label: "Ø¥Ø¬Ù…Ø§Ù„ÙŠ Ø§Ù„Ø´ÙƒØ§ÙˆÙ‰ ÙˆØ§Ù„Ø¨Ù„Ø§ØºØ§Øª Ø§Ù„ÙˆØ§Ø±Ø¯Ø©",
      labelEn: "Total complaints and reports received",
    },
    {
      id: "completed",
      value: nf(sumCompleted),
      label: "Ø¥Ø¬Ù…Ø§Ù„ÙŠ Ø§Ù„Ø´ÙƒØ§ÙˆÙ‰ Ø§Ù„Ù…Ù†Ø¬Ø²Ø© Ù„Ø¯Ù‰ Ø§Ù„Ù‡ÙŠØ¦Ø©",
      labelEn: "Total complaints completed at the Commission",
    },
    {
      id: "legislations",
      value: nf(sumLegis),
      label: "Ø¥Ø¬Ù…Ø§Ù„ÙŠ Ø§Ù„ØªØ´Ø±ÙŠØ¹Ø§Øª ÙˆØ§Ù„Ø¨Ù†ÙˆØ¯ Ø§Ù„Ù…Ø¹Ø²Ø²Ø© Ù„Ù„ÙˆÙ‚Ø§ÙŠØ©",
      labelEn: "Total legislations and provisions for prevention",
    },
    {
      id: "referred",
      value: nf(sumReferred),
      label: "Ù…Ù„ÙØ§Øª Ø§Ù„ØªØ­Ù‚ÙŠÙ‚ Ø§Ù„ÙˆØ§Ø±Ø¯Ø© Ù„Ù†ÙŠØ§Ø¨Ø© Ø¬Ø±Ø§Ø¦Ù… Ø§Ù„ÙØ³Ø§Ø¯",
      labelEn: "Investigation files received by the Corruption Crimes Prosecution",
    },
    {
      id: "convicted",
      value: nf(sumConvicted),
      label:
        "Ø¥Ø¬Ù…Ø§Ù„ÙŠ Ø§Ù„Ù…Ø­ÙƒÙˆÙ…ÙŠÙ† (Ø§Ù„Ù…Ø¯Ø§Ù†ÙŠÙ†) ÙÙŠ Ù…Ø­ÙƒÙ…Ø© Ø¬Ø±Ø§Ø¦Ù… Ø§Ù„ÙØ³Ø§Ø¯",
      labelEn: "Total convicted persons in the Corruption Crimes Court",
    },
    {
      id: "procedures",
      value: nf(columnTotal(dashboardData.prosecutionFilesCompletedByProcedure, 5)),
      label: "Ù…Ù„ÙØ§Øª Ø§Ù„ØªØ­Ù‚ÙŠÙ‚ Ø§Ù„Ù…Ù†Ø¬Ø²Ø© Ù„Ù†ÙŠØ§Ø¨Ø© Ø¬Ø±Ø§Ø¦Ù… Ø§Ù„ÙØ³Ø§Ø¯",
      labelEn: "Investigation files completed by the Corruption Crimes Prosecution",
    },
    {
      id: "defendants",
      value: nf(columnTotal(dashboardData.defendantsReferredToCourtByGender, 3)),
      label: "Ø§Ù„Ù…ØªÙ‡Ù…ÙˆÙ† Ø§Ù„Ù…Ø­Ø§Ù„ÙˆÙ† Ù„Ù…Ø­ÙƒÙ…Ø© Ø¬Ø±Ø§Ø¦Ù… Ø§Ù„ÙØ³Ø§Ø¯",
      labelEn: "Defendants referred to the Corruption Crimes Court",
    },
    {
      id: "verdicts",
      value: nf(columnTotal(dashboardData.courtVerdictResults, 5)),
      label: "Ø§Ù„Ù‚Ø¶Ø§ÙŠØ§ Ø§Ù„Ù…ÙØµÙˆÙ„Ø© Ø¨Ø­ÙƒÙ…",
      labelEn: "Cases settled by verdict",
    },
  ];
}

/** 11 spotlight KPI numbers (period 2022-2025). */
export interface SpotlightKpi {
  id: string;
  value: string;
  unit: "%" | "Ù…Ù„Ù" | "ÙØ±Ø¯" | "Ø´ÙƒÙˆÙ‰" | "Ù…Ø´ØªØ¨Ù‡ Ø¨Ù‡" | "";
  label: string;
  labelEn: string;
  note?: string;
  isRatio?: boolean;
}

function pct(part: number, whole: number): string {
  if (!whole) return "0.0";
  return ((part / whole) * 100).toFixed(1);
}

/** Recompute the 11 spotlight cards for a specific set of years (default all four). */
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

  /** Per-year total of a category-row table (from total_row; columns after the first are years). */
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

  // complaints per year total (col 6 = Ø§Ù„Ù…Ø¬Ù…ÙˆØ¹)
  const complaintsTotal = all
    ? TOTAL_COMPLAINTS
    : yearArray.reduce((s, y) => s + yrSum(dashboardData.complaintsBySource, y, 6), 0);

  const femaleSum = all
    ? 140
    : yearArray.reduce((s, y) => s + yrSum(dashboardData.complaintsBySource, y, 2), 0);

  const abuseSum = catSum(
    dashboardData.complaintsByCrimeQualification,
    "Ø¥Ø³Ø§Ø¡Ø© Ø§Ø³ØªØ¹Ù…Ø§Ù„ Ø§Ù„Ø³Ù„Ø·Ø©",
  );
  const abuseTotal = all ? TOTAL_COMPLAINTS : complaintsTotal;

  const attendanceSum = catSum(
    dashboardData.complaintsByReceiptMethod,
    "Ø§Ù„Ø­Ø¶ÙˆØ± Ø§Ù„Ø´Ø®ØµÙŠ ÙˆØªØ³Ù„ÙŠÙ… Ø¨Ø§Ù„ÙŠØ¯",
  );
  const electronicSum = catSum(
    dashboardData.complaintsByReceiptMethod,
    "Ø§Ù„ÙˆØ³Ø§Ø¦Ù„ ÙˆØ§Ù„ØªØ·Ø¨ÙŠÙ‚Ø§Øª Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠØ©",
  );

  const forgeryInv = catSum(
    dashboardData.investigationFilesReferredToProsecutionBySectorAndCrime.byCrime,
    "Ø§Ù„ØªØ²ÙˆÙŠØ±/Ø¥Ø¹Ø·Ø§Ø¡ Ù…ØµØ¯Ù‚Ø§Øª ÙƒØ§Ø°Ø¨Ø©/Ø§Ø³ØªØ¹Ù…Ø§Ù„ Ø³Ù†Ø¯ Ù…Ø²ÙˆØ±",
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
    "Ø§Ù„ØªØ²ÙˆÙŠØ±/Ø¥Ø¹Ø·Ø§Ø¡ Ù…ØµØ¯Ù‚Ø§Øª ÙƒØ§Ø°Ø¨Ø©/Ø§Ø³ØªØ¹Ù…Ø§Ù„ Ø³Ù†Ø¯ Ù…Ø²ÙˆØ±",
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
      label:
        "Ù†Ø³Ø¨Ø© Ù…Ø´Ø§Ø±ÙƒØ© Ø§Ù„Ø¥Ù†Ø§Ø« Ø¶Ù…Ù† Ø§Ù„Ø´ÙƒØ§ÙˆÙ‰ Ø§Ù„ÙˆØ§Ø±Ø¯Ø© Ø¥Ù„Ù‰ Ø§Ù„Ù‡ÙŠØ¦Ø©",
      labelEn: "Share of female complainants among complaints received by the Commission",
      isRatio: true,
      note: all
        ? "Ø£ÙØ±Ø§Ø¯-Ø£Ù†Ø«Ù‰ (140) Ù…Ù† Ø¥Ø¬Ù…Ø§Ù„ÙŠ 2923 Ø´ÙƒÙˆÙ‰"
        : `Ø£Ù†Ø«Ù‰ (${nf(femaleSum)}) Ù…Ù† Ø¥Ø¬Ù…Ø§Ù„ÙŠ ${nf(complaintsTotal)} ÙÙŠ Ø§Ù„Ø³Ù†ÙˆØ§Øª Ø§Ù„Ù…Ø®ØªØ§Ø±Ø©`,
    },
    {
      id: "top-crime",
      value: pct(abuseSum, abuseTotal),
      unit: "%",
      label:
        "Ù…Ù† Ø§Ù„Ø´ÙƒØ§ÙˆÙ‰ Ø§Ù„ÙˆØ§Ø±Ø¯Ø© ØµÙÙ†Ù‘ÙØª ÙƒØ¥Ø³Ø§Ø¡Ø© Ø§Ø³ØªØ¹Ù…Ø§Ù„ Ù„Ù„Ø³Ù„Ø·Ø©",
      labelEn: "of complaints received classified as abuse of power",
      isRatio: true,
      note: all
        ? "2256 Ù…Ù† Ø¥Ø¬Ù…Ø§Ù„ÙŠ 2923 â€” Ø§Ù„Ø£Ø¹Ù„Ù‰ ØªÙƒØ±Ø§Ø±Ø§Ù‹ ÙÙŠ Ø§Ù„Ø³Ù†ÙˆØ§Øª Ø§Ù„Ø£Ø±Ø¨Ø¹"
        : `${nf(abuseSum)} Ù…Ù† ${nf(abuseTotal)} ÙÙŠ Ø§Ù„Ø³Ù†ÙˆØ§Øª Ø§Ù„Ù…Ø®ØªØ§Ø±Ø©`,
    },
    {
      id: "personal-attendance",
      value: pct(attendanceSum, complaintsTotal),
      unit: "%",
      label:
        "Ù…Ù† Ø§Ù„Ø´ÙƒØ§ÙˆÙ‰ Ø§Ù„ÙˆØ§Ø±Ø¯Ø© Ø¹Ù† Ø·Ø±ÙŠÙ‚ Ø§Ù„Ø­Ø¶ÙˆØ± Ø§Ù„Ø´Ø®ØµÙŠ ÙˆØ§Ù„ØªØ³Ù„ÙŠÙ… Ø¨Ø§Ù„ÙŠØ¯",
      labelEn: "of complaints received by in-person attendance and hand delivery",
      isRatio: true,
      note: all
        ? "1086 Ø´ÙƒÙˆÙ‰ Ù…Ù† Ø¥Ø¬Ù…Ø§Ù„ÙŠ 2923"
        : `${nf(attendanceSum)} Ù…Ù† ${nf(complaintsTotal)}`,
    },
    {
      id: "electronic",
      value: pct(electronicSum, complaintsTotal),
      unit: "%",
      label:
        "Ù…Ù† Ø§Ù„Ø´ÙƒØ§ÙˆÙ‰ Ø§Ù„ÙˆØ§Ø±Ø¯Ø© Ø¹Ø¨Ø± Ø§Ù„ÙˆØ³Ø§Ø¦Ù„ ÙˆØ§Ù„ØªØ·Ø¨ÙŠÙ‚Ø§Øª Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠØ©",
      labelEn: "of complaints received via electronic means and applications",
      isRatio: true,
      note: all
        ? "1634 Ø´ÙƒÙˆÙ‰ Ù…Ù† Ø¥Ø¬Ù…Ø§Ù„ÙŠ 2923"
        : `${nf(electronicSum)} Ù…Ù† ${nf(complaintsTotal)}`,
    },
    {
      id: "forgery-files",
      value: pct(forgeryInv, totalReferredByCrime),
      unit: "%",
      label:
        "Ù…Ù† Ø§Ù„Ù…Ù„ÙØ§Øª Ø§Ù„ØªØ­Ù‚ÙŠÙ‚ÙŠØ© Ø§Ù„Ù…Ø­Ø§Ù„Ø© Ø¥Ù„Ù‰ Ø§Ù„Ù†ÙŠØ§Ø¨Ø© Ø¹Ù† Ø¬Ø±ÙŠÙ…Ø© Ø§Ù„ØªØ²ÙˆÙŠØ±",
      labelEn: "of investigation files referred to the Prosecution for forgery",
      isRatio: true,
      note: all
        ? `${nf(forgeryInv)} Ù…Ù† Ø¥Ø¬Ù…Ø§Ù„ÙŠ ${nf(totalReferredByCrime)} Ù…Ù„ÙØ§Ù‹`
        : `${nf(forgeryInv)} Ù…Ù† ${nf(totalReferredByCrime)} ÙÙŠ Ø§Ù„Ø³Ù†ÙˆØ§Øª Ø§Ù„Ù…Ø®ØªØ§Ø±Ø©`,
    },
    {
      id: "suspects",
      value: nf(suspects),
      unit: "",
      label:
        "Ø¹Ø¯Ø¯ Ø§Ù„Ù…Ø´ØªØ¨Ù‡ Ø¨Ù‡Ù… Ø§Ù„Ù…Ø­Ø§Ù„ÙŠÙ† Ø¥Ù„Ù‰ Ø§Ù„Ù†ÙŠØ§Ø¨Ø© Ø§Ù„Ø¹Ø§Ù…Ø© (Ø§Ù„Ù…Ø¬Ù…ÙˆØ¹ Ø§Ù„ÙƒÙ„ÙŠ)",
      labelEn: "Number of suspects referred to the Public Prosecution (total)",
      note: "ðŸ”¢ 2022: 93 Â· 2023: 58 Â· 2024: 75 (ÙŠÙØ³ØªØ«Ù†Ù‰ ØµÙ 68 Ø§Ù„Ù…ÙƒØ±Ù‘Ø±) â€” Ø§Ù„Ù…Ø¬Ù…ÙˆØ¹ 226",
    },
    {
      id: "pacc-source",
      value: pct(paccSrc, paccSrcTotal),
      unit: "%",
      label:
        "Ù…Ù† Ù…Ù„ÙØ§Øª Ø§Ù„ØªØ­Ù‚ÙŠÙ‚ Ø§Ù„Ø¬Ø²Ø§Ø¦ÙŠ Ø§Ù„ÙˆØ§Ø±Ø¯Ø© Ø¥Ù„Ù‰ Ø§Ù„Ù†ÙŠØ§Ø¨Ø© Ù…Ù† Ø§Ù„Ù‡ÙŠØ¦Ø©",
      labelEn: "of criminal investigation files received by the Prosecution from the Commission",
      isRatio: true,
      note: all
        ? `${nf(paccSrc)} Ù…Ù† Ø¥Ø¬Ù…Ø§Ù„ÙŠ ${nf(paccSrcTotal)} Ù‚Ø¶ÙŠØ© ÙˆØ§Ø±Ø¯Ø©`
        : `${nf(paccSrc)} Ù…Ù† ${nf(paccSrcTotal)} ÙÙŠ Ø§Ù„Ø³Ù†ÙˆØ§Øª Ø§Ù„Ù…Ø®ØªØ§Ø±Ø©`,
    },
    {
      id: "to-court",
      value: nf(toCourtTotalAll),
      unit: "",
      label: "Ø¹Ø¯Ø¯ Ø§Ù„Ø£ÙØ±Ø§Ø¯ Ø§Ù„Ù…Ø­Ø§Ù„ÙŠÙ† Ø¥Ù„Ù‰ Ù…Ø­ÙƒÙ…Ø© Ø¬Ø±Ø§Ø¦Ù… Ø§Ù„ÙØ³Ø§Ø¯",
      labelEn: "Number of individuals referred to the Corruption Crimes Court",
      note: `Ø¥Ø¶Ø§ÙØ© Ø¥Ù„Ù‰ ${nf(toCourtLegal)} Ø£Ø´Ø®Ø§Øµ Ù…Ø¹Ù†ÙˆÙŠÙŠÙ†`,
    },
    {
      id: "court-top-crime",
      value: pct(forgeryCourt, courtTotalReferred),
      unit: "%",
      label:
        "Ù…Ù† Ø§Ù„Ø¬Ø±Ø§Ø¦Ù… Ø§Ù„Ù…Ø­Ø§Ù„Ø© Ø¥Ù„Ù‰ Ø§Ù„Ù…Ø­ÙƒÙ…Ø© ÙƒÙŠÙ‘ÙØª Ø¹Ù„Ù‰ Ø£Ù†Ù‡Ø§ ØªØ²ÙˆÙŠØ±",
      labelEn: "of crimes referred to court classified as forgery",
      isRatio: true,
      note: `${nf(forgeryCourt)} Ù…Ù† Ø¥Ø¬Ù…Ø§Ù„ÙŠ ${nf(courtTotalReferred)} Ù…Ù„ÙØ§Ù‹ Ù…Ø­Ø§Ù„Ø§Ù‹ Ù„Ù„Ù…Ø­ÙƒÙ…Ø©`,
    },
    {
      id: "male-share",
      value: pct(toCourtMale, toCourtTotalAll),
      unit: "%",
      label: "Ù†Ø³Ø¨Ø© Ø§Ù„Ø°ÙƒÙˆØ± Ø¶Ù…Ù† Ø§Ù„Ù…ØªÙ‡Ù…ÙŠÙ† Ø§Ù„Ù…Ø­Ø§Ù„ÙŠÙ† Ø¥Ù„Ù‰ Ø§Ù„Ù…Ø­ÙƒÙ…Ø©",
      labelEn: "Share of males among defendants referred to court",
      isRatio: true,
      note: `${nf(toCourtMale)} Ø°ÙƒØ±Ø§Ù‹ Ù…Ù† Ø¥Ø¬Ù…Ø§Ù„ÙŠ ${nf(toCourtTotalAll)} Ø£ÙØ±Ø§Ø¯`,
    },
    {
      id: "conviction-rate",
      value: pct(convictionCount, verdictTotal),
      unit: "%",
      label:
        "Ù†Ø³Ø¨Ø© Ø§Ù„Ù…Ø¯Ø§Ù†ÙŠÙ† Ø¶Ù…Ù† Ø§Ù„Ù‚Ø¶Ø§ÙŠØ§ Ø§Ù„Ù…ÙØµÙˆÙ„Ø© Ø¨Ø­ÙƒÙ… ÙÙŠ Ø§Ù„Ù…Ø­ÙƒÙ…Ø©",
      labelEn: "Share of convicted persons among cases settled by verdict",
      isRatio: true,
      note: `${nf(convictionCount)} Ø¥Ø¯Ø§Ù†Ø© Ù…Ù† Ø¥Ø¬Ù…Ø§Ù„ÙŠ ${nf(verdictTotal)} Ù‚Ø¶ÙŠØ© Ù…ÙØµÙˆÙ„Ø©`,
    },
  ];
}
