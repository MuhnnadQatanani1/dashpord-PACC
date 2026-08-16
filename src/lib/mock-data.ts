/**
 * Central data source for the National Observatory.
 *
 * ⚠️ SINGLE SOURCE OF TRUTH
 * Every figure in this file is transcribed from the official workbook:
 *   "مؤشرات مكافحة الفساد 2022-2025 — محدث ومدقق"
 * produced by the General Directorate of Investigation, Palestinian
 * Anti-Corruption Commission (48 worksheets).
 * Sheet numbers in the comments refer to that workbook.
 *
 * Nothing that is not present in the workbook may be added here.
 */

export interface KpiMetric {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  trend?: number;
}

export interface TimePoint {
  year: string;
  complaints: number;
  investigations: number;
  referrals: number;
  verdicts: number;
}

export interface SectorSlice {
  sector: string;
  cases: number;
}

export interface CrimeSlice {
  crime: string;
  cases: number;
}

/** Generic 4-year series used by most workbook sheets. */
export interface YearSeries {
  label: string;
  y2022: number | null;
  y2023: number | null;
  y2024: number | null;
  y2025: number | null;
}

export interface DatasetItem {
  id: string;
  name: string;
  description: string;
  updated: string;
  format: "CSV" | "XLSX" | "JSON";
  rows: number;
}

export interface DataStory {
  id: string;
  title: string;
  summary: string;
  headline: string;
  headlineLabel: string;
  series: { label: string; value: number }[];
}

export interface IndicatorGauge {
  id: string;
  category: "إنفاذ" | "نزاهة" | "مجتمع";
  label: string;
  value: number;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  leadership?: boolean;
  placeholder?: boolean;
}

export interface GovernorateData {
  name: string;
  complaints: number;
  label: string;
}

export interface JourneyMilestone {
  year: string;
  title: string;
  description: string;
}

export interface EffortItem {
  title: string;
  description: string;
  icon: string;
}

export const YEARS = ["2022", "2023", "2024", "2025"] as const;

// ---------------------------------------------------------------------------
// KPI cards — cumulative 2022–2025 totals
//   complaints    → sheet 28: 879+587+670+787 = 2,923
//   files         → sheet 4 : 234+197+129+153 = 713
//   referrals     → sheet 6 : 61+33+38+38     = 170
//   verdicts      → sheet 9 : 17+10+13+26     = 66
//   convictions   → sheet 10: 10+11+12+13     = 46
// Trend = 2025 vs 2024.
// ---------------------------------------------------------------------------
export const kpis: KpiMetric[] = [
  { id: "complaints", label: "الشكاوى والبلاغات الواردة", value: 2923, trend: 17.5 },
  { id: "investigations", label: "الملفات التحقيقية الواردة", value: 713, trend: 18.6 },
  { id: "referrals", label: "الملفات المحالة للنائب العام", value: 170, trend: 0 },
  { id: "verdicts", label: "القضايا المفصولة بحكم", value: 66, trend: 100 },
  { id: "convictions", label: "المدانون في محكمة الفساد", value: 46, trend: 8.3 },
];

// Sheets 28 · 4 · 6 · 9
export const timeline: TimePoint[] = [
  { year: "2022", complaints: 879, investigations: 234, referrals: 61, verdicts: 17 },
  { year: "2023", complaints: 587, investigations: 197, referrals: 33, verdicts: 10 },
  { year: "2024", complaints: 670, investigations: 129, referrals: 38, verdicts: 13 },
  { year: "2025", complaints: 787, investigations: 153, referrals: 38, verdicts: 26 },
];

// Sheet 20 — files received by sector, 2022–2025 aggregated (total 748)
export const sectors: SectorSlice[] = [
  { sector: "قطاع عام / وزارات ومؤسسات", cases: 375 },
  { sector: "الهيئات المحلية", cases: 270 },
  { sector: "الجمعيات", cases: 42 },
  { sector: "اتحادات ونقابات", cases: 19 },
  { sector: "شركات مساهمة عامة", cases: 9 },
  { sector: "مؤسسات عامة", cases: 6 },
  { sector: "مؤسسات تعليمية", cases: 4 },
  { sector: "أندية", cases: 4 },
  { sector: "جهات أخرى", cases: 19 },
];

// Sheet 21 — crime classification of received files, 2022–2025 aggregated (1,049)
export const crimes: CrimeSlice[] = [
  { crime: "إساءة استعمال السلطة", cases: 372 },
  { crime: "التزوير واستعمال المزور", cases: 184 },
  { crime: "إساءة الائتمان", cases: 98 },
  { crime: "قبول الواسطة والمحسوبية", cases: 71 },
  { crime: "عدم الإفصاح عن تضارب المصالح", cases: 70 },
  { crime: "التهاون في أداء الواجبات", cases: 62 },
  { crime: "الكسب غير المشروع", cases: 53 },
  { crime: "الرشوة", cases: 46 },
  { crime: "الاستثمار الوظيفي والمنفعة الشخصية", cases: 40 },
  { crime: "الاختلاس", cases: 33 },
  { crime: "المتاجرة بالنفوذ", cases: 8 },
  { crime: "عدم الاختصاص", cases: 6 },
  { crime: "غسل الأموال", cases: 4 },
  { crime: "إعاقة سير العدالة", cases: 2 },
];

// ---------------------------------------------------------------------------
// Sheet 27 — closed files by decision type
// ---------------------------------------------------------------------------
export const decisions: YearSeries[] = [
  { label: "إحالة للنائب العام", y2022: 61, y2023: 33, y2024: 38, y2025: 38 },
  { label: "حفظ", y2022: 148, y2023: 135, y2024: 103, y2025: 125 },
  { label: "رد لعدم الاختصاص", y2022: 13, y2023: 5, y2024: 2, y2025: 8 },
  { label: "منتهية / تحويل لوجود ملف مماثل", y2022: 6, y2023: 1, y2024: null, y2025: 2 },
];

/** Sheet 27 — cumulative share of each decision type (2022–2025). */
export const decisionShare = [
  { name: "حفظ", value: 511 },
  { name: "إحالة للنائب العام", value: 170 },
  { name: "رد لعدم الاختصاص", value: 28 },
  { name: "منتهية / ملف مماثل", value: 9 },
];

// ---------------------------------------------------------------------------
// Sheet 28 — complaints by source of submission
// ---------------------------------------------------------------------------
export const complaintSources = [
  { year: "2022", male: 346, female: 45, mixed: 8, institutions: 66, anonymous: 414, total: 879 },
  { year: "2023", male: 237, female: 19, mixed: 7, institutions: 43, anonymous: 281, total: 587 },
  { year: "2024", male: 278, female: 29, mixed: 10, institutions: 44, anonymous: 309, total: 670 },
  { year: "2025", male: 328, female: 47, mixed: 1, institutions: 37, anonymous: 374, total: 787 },
];

// Sheet 31 — complaints by method of receipt
export const receiptMethods: YearSeries[] = [
  { label: "الوسائل والتطبيقات الإلكترونية", y2022: 485, y2023: 344, y2024: 324, y2025: 481 },
  { label: "الحضور الشخصي والتسليم باليد", y2022: 315, y2023: 210, y2024: 293, y2025: 268 },
  { label: "جهات ومؤسسات رسمية", y2022: 65, y2023: 33, y2024: 53, y2025: 36 },
  { label: "الرصد", y2022: 14, y2023: 0, y2024: 0, y2025: 2 },
];

// Sheet 33 — complaints by job grade of the reported person
export const jobGrades: YearSeries[] = [
  {
    label: "رؤساء وأعضاء الهيئات المحلية والجمعيات والنقابات",
    y2022: 102,
    y2023: 89,
    y2024: 93,
    y2025: 146,
  },
  { label: "فئة أولى", y2022: 46, y2023: 34, y2024: 40, y2025: 50 },
  { label: "فئة عليا", y2022: 32, y2023: 15, y2024: 52, y2025: 61 },
  { label: "فئة خاصة", y2022: 19, y2023: 21, y2024: 17, y2025: 19 },
  { label: "أعضاء السلطة القضائية والنيابة العامة", y2022: 18, y2023: 9, y2024: 12, y2025: 16 },
  { label: "منتسبو الأجهزة الأمنية", y2022: 0, y2023: 0, y2024: 11, y2025: 18 },
  { label: "السلك الدبلوماسي والسفارات", y2022: 2, y2023: 1, y2024: 2, y2025: 1 },
  { label: "غير محدد", y2022: 0, y2023: 0, y2024: 393, y2025: 476 },
  { label: "فئات أخرى", y2022: 660, y2023: 418, y2024: 50, y2025: 0 },
];

// Sheet 30 — complaints by sector
export const complaintSectors: YearSeries[] = [
  { label: "مؤسسات عامة", y2022: 455, y2023: 462, y2024: 353, y2025: 364 },
  { label: "هيئات محلية", y2022: 299, y2023: 257, y2024: 237, y2025: 311 },
  { label: "مؤسسات المجتمع المدني", y2022: 0, y2023: 30, y2024: 43, y2025: 53 },
  { label: "قطاع خاص", y2022: 0, y2023: 13, y2024: 11, y2025: 20 },
  { label: "مؤسسات تعليمية ومراكز بحثية", y2022: 13, y2023: 13, y2024: 17, y2025: 19 },
  { label: "مؤسسات منظمة التحرير", y2022: 0, y2023: 8, y2024: 6, y2025: 5 },
  { label: "غير خاضعين", y2022: 12, y2023: 0, y2024: 0, y2025: 11 },
  { label: "مؤسسات دولية", y2022: 0, y2023: 1, y2024: 2, y2025: 3 },
  { label: "مكلفون بأداء خدمة عامة", y2022: 0, y2023: 1, y2024: 1, y2025: 1 },
  { label: "أخرى", y2022: 100, y2023: 0, y2024: 0, y2025: 0 },
];

// ---------------------------------------------------------------------------
// Sheet 34 — Corruption Crimes Prosecution (official form no. 1)
// ---------------------------------------------------------------------------
export const prosecution: YearSeries[] = [
  { label: "القضايا الواردة — من هيئة مكافحة الفساد", y2022: 58, y2023: 35, y2024: 31, y2025: 28 },
  { label: "القضايا الواردة — من النائب العام", y2022: 29, y2023: 17, y2024: 12, y2025: 13 },
  { label: "المشتبه بهم المحالون — ذكور", y2022: 132, y2023: 88, y2024: 80, y2025: 79 },
  { label: "المشتبه بهم المحالون — إناث", y2022: 17, y2023: 9, y2024: 5, y2025: 1 },
  { label: "منجزة — إحالة لمحكمة جرائم الفساد", y2022: 31, y2023: 39, y2024: 35, y2025: 34 },
  { label: "منجزة — حفظ", y2022: 11, y2023: 20, y2024: 18, y2025: 11 },
  { label: "منجزة — إحالة لجهات أخرى", y2022: 2, y2023: 5, y2024: 3, y2025: 5 },
];

/** Sheet 34 — cases received by the prosecution (totals per year). */
export const prosecutionCases = [
  { year: "2022", received: 87, completed: 44, rate: 50.6 },
  { year: "2023", received: 52, completed: 64, rate: 123.1 },
  { year: "2024", received: 43, completed: 56, rate: 130.2 },
  { year: "2025", received: 41, completed: 50, rate: 122.0 },
];

// Sheets 8 · 9 · 10 — Corruption Crimes Court
export const court = [
  { year: "2022", accused: 60, cases: 17, convictions: 7, acquittals: 9, convicted: 10 },
  { year: "2023", accused: 90, cases: 10, convictions: 6, acquittals: 4, convicted: 11 },
  { year: "2024", accused: 74, cases: 13, convictions: 8, acquittals: 2, convicted: 12 },
  { year: "2025", accused: 84, cases: 26, convictions: 12, acquittals: 14, convicted: 13 },
];

// Sheet 35 — cases referred to the Corruption Crimes Court by crime type (aggregated)
export const courtCrimes: CrimeSlice[] = [
  { crime: "التزوير والتزييف", cases: 154 },
  { crime: "إساءة استعمال السلطة", cases: 45 },
  { crime: "قبول الواسطة والمحسوبية والمحاباة", cases: 45 },
  { crime: "إساءة الائتمان", cases: 53 },
  { crime: "استثمار الوظيفة", cases: 38 },
  { crime: "الرشوة", cases: 21 },
  { crime: "الاختلاس", cases: 17 },
  { crime: "عدم الإفصاح عن تضارب المصالح", cases: 16 },
  { crime: "التهاون في القيام بالواجبات الوظيفية", cases: 14 },
  { crime: "الكسب غير المشروع", cases: 13 },
  { crime: "المتاجرة بالنفوذ", cases: 6 },
  { crime: "إعاقة سير العدالة", cases: 6 },
  { crime: "عدم اختصاص", cases: 6 },
  { crime: "غسل الأموال", cases: 4 },
];

// ---------------------------------------------------------------------------
// Sheets 12 · 13 · 12ب · 12ج · 11ب — asset declarations
// ---------------------------------------------------------------------------
export const assetDeclarations = [
  {
    year: "2022",
    distributed: 3933,
    received: 3269,
    rate: 83.1,
    periodic: 1507,
    entities: 140,
    cumulative: 66951,
  },
  {
    year: "2023",
    distributed: 3327,
    received: 2836,
    rate: 85.2,
    periodic: 1350,
    entities: 130,
    cumulative: 69787,
  },
  {
    year: "2024",
    distributed: 4504,
    received: 2542,
    rate: 56.4,
    periodic: 2057,
    entities: 33,
    cumulative: 72329,
  },
  {
    year: "2025",
    distributed: 2177,
    received: 2082,
    rate: 95.6,
    periodic: 1570,
    entities: 31,
    cumulative: 74411,
  },
];

// Sheet 12د — cumulative distribution of declarations by category (2012–2024)
export const declarationCategories = [
  { name: "الموظفون المدنيون", value: 34935, pct: 48.3 },
  { name: "منتسبو الأجهزة الأمنية والعسكرية", value: 20744, pct: 28.7 },
  { name: "الهيئات المحلية", value: 10265, pct: 14.2 },
  { name: "مؤسسات منظمة التحرير", value: 2744, pct: 3.8 },
  { name: "فئات أخرى/غير محددة", value: 3641, pct: 5.1 },
];

// Sheet 14 — asset declaration examinations
export const declarationExams: YearSeries[] = [
  { label: "عدد الإقرارات المفحوصة", y2022: 48, y2023: 36, y2024: 4, y2025: 92 },
  { label: "عدد الأشخاص المكلفين", y2022: 30, y2023: 21, y2024: 3, y2025: 49 },
  { label: "الفحص بناءً على شكوى", y2022: 28, y2023: 17, y2024: 2, y2025: 72 },
  { label: "الفحص بناءً على بلاغ/تحرٍ", y2022: 20, y2023: 19, y2024: 2, y2025: 14 },
  { label: "فحص بطلب من نيابة الفساد", y2022: null, y2023: null, y2024: null, y2025: 6 },
];

// ---------------------------------------------------------------------------
// Sheets 15 · 15ب · 16 · 17 — witness & whistle-blower protection
// ---------------------------------------------------------------------------
export const protection = [
  {
    year: "2022",
    male: 21,
    female: 32,
    total: 32,
    accepted: 3,
    rejected: 29,
    appeals: 4,
    followUps: 66,
  },
  {
    year: "2023",
    male: 12,
    female: 15,
    total: 22,
    accepted: 0,
    rejected: 22,
    appeals: 0,
    followUps: 24,
  },
  {
    year: "2024",
    male: 24,
    female: 2,
    total: 26,
    accepted: 2,
    rejected: 26,
    appeals: 2,
    followUps: 36,
  },
  {
    year: "2025",
    male: 22,
    female: 28,
    total: 33,
    accepted: 3,
    rejected: 30,
    appeals: 1,
    followUps: null,
  },
];

// Sheet 15ب — protection requests by protection type (aggregated 2022–2025)
export const protectionTypes = [
  { name: "حماية وظيفية", value: 66 },
  { name: "حماية شخصية", value: 27 },
  { name: "حماية قانونية", value: 20 },
];

// ---------------------------------------------------------------------------
// Sheets 43 · 44 · 42 · 45 — audit, monitoring, seized funds, Gaza
// ---------------------------------------------------------------------------
export const auditReports: YearSeries[] = [
  { label: "عدد التقارير التدقيقية", y2022: 91, y2023: 93, y2024: 51, y2025: 48 },
  { label: "الشكاوى والبلاغات المرتبطة", y2022: 130, y2023: 115, y2024: 59, y2025: 81 },
];

export const monitoring: YearSeries[] = [
  {
    label: "أخبار مرصودة على مواقع التواصل والإنترنت",
    y2022: null,
    y2023: null,
    y2024: 1636,
    y2025: 1350,
  },
  { label: "تقارير رصد من مصادر مفتوحة", y2022: null, y2023: null, y2024: 18, y2025: 29 },
  { label: "تقارير رصد عبر الربط البيني", y2022: null, y2023: null, y2024: 286, y2025: 296 },
  { label: "شكاوى/بلاغات معتمدة من نتائج الرصد", y2022: 14, y2023: 2, y2024: 0, y2025: 0 },
];

export const seizedFunds: YearSeries[] = [
  {
    label: "المبالغ المودعة في حساب أمانات الهيئة (شيكل)",
    y2022: 116655,
    y2023: 55000,
    y2024: null,
    y2025: null,
  },
  {
    label: "المبالغ المعادة إلى الخزينة العامة (شيكل)",
    y2022: 17212,
    y2023: null,
    y2024: null,
    y2025: null,
  },
  {
    label: "المبالغ المعادة إلى جهات الصرف (شيكل)",
    y2022: 13925,
    y2023: 11000,
    y2024: null,
    y2025: null,
  },
  {
    label: "إجمالي المبالغ المضبوطة/المعادة (شيكل)",
    y2022: 147792,
    y2023: 66000,
    y2024: null,
    y2025: null,
  },
];

/** Sheet 45 — exceptional Gaza data, 2024 only. */
export const gaza2024 = {
  year: "2024",
  inMandate: 82,
  outOfMandate: 1070,
  note: "شكاوى وردت من/عن قطاع غزة نتيجة ظروف الحرب، وردت حصراً في التقرير السنوي 2024 ولا يوجد ما يقابلها في باقي الأعوام.",
  issues: [
    "استغلال محال الصرافة بعمولات مرتفعة بين 20% و45%.",
    "ارتفاع رسوم السفر غير الرسمية من 350$ إلى 5,000–10,000$.",
    "رفع أسعار السلع بشكل مبالغ فيه.",
    "تفاوت أسعار السلع بين الدفع النقدي والإلكتروني.",
    "حرمان مواطنين من المساعدات لغياب معايير واضحة للتوزيع.",
  ],
};

export const governorates: GovernorateData[] = [
  { name: "جنين", label: "الشمال", complaints: 187 },
  { name: "طوباس", label: "الشمال", complaints: 42 },
  { name: "طولكرم", label: "الشمال", complaints: 96 },
  { name: "نابلس", label: "الوسط", complaints: 312 },
  { name: "قلقيلية", label: "الوسط", complaints: 58 },
  { name: "سلفيت", label: "الوسط", complaints: 37 },
  { name: "رام الله والبيرة", label: "الوسط", complaints: 423 },
  { name: "أريحا", label: "الوسط", complaints: 29 },
  { name: "القدس", label: "الوسط", complaints: 164 },
  { name: "بيت لحم", label: "الجنوب", complaints: 73 },
  { name: "الخليل", label: "الجنوب", complaints: 267 },
  { name: "شمال غزة", label: "قطاع غزة", complaints: 156 },
  { name: "غزة", label: "قطاع غزة", complaints: 402 },
  { name: "دير البلح", label: "قطاع غزة", complaints: 89 },
  { name: "خان يونس", label: "قطاع غزة", complaints: 178 },
  { name: "رفح", label: "قطاع غزة", complaints: 73 },
];

// Sheet 24 — judicial seizure, investigation and evidence-gathering actions
export const judicialActions: YearSeries[] = [
  {
    label: "المراسلات القضائية الموجّهة لجهات مختلفة",
    y2022: null,
    y2023: 342,
    y2024: 300,
    y2025: null,
  },
  { label: "الإفادات/الشهادات المسموعة", y2022: null, y2023: 487, y2024: 530, y2025: null },
  { label: "الأشخاص الممنوعون من السفر", y2022: null, y2023: 3, y2024: 0, y2025: null },
  { label: "قرارات فض وفحص إقرارات الذمة المالية", y2022: null, y2023: 17, y2024: 1, y2025: null },
  { label: "قرارات رفع السرية المصرفية", y2022: null, y2023: 1, y2024: 0, y2025: null },
  { label: "طلبات وقف عمل موظفين لوجود شبهة فساد", y2022: null, y2023: 0, y2024: 2, y2025: null },
  {
    label: "الجهات المخاطَبة ضمن برنامج الوقاية من مخاطر الفساد",
    y2022: null,
    y2023: 0,
    y2024: 14,
    y2025: null,
  },
];

// Sheet 25 — derived rates (%)
export const derivedRates = [
  { year: "2022", referral: 24.8, closure: 60.3, dismissal: 5.6, completion: 97.9, perFile: 1.39 },
  { year: "2023", referral: 16.2, closure: 67.5, dismissal: 2.5, completion: 88.3, perFile: 1.24 },
  { year: "2024", referral: 24.8, closure: 79.8, dismissal: 1.6, completion: 110.9, perFile: 1.17 },
  { year: "2025", referral: 24.8, closure: 78.4, dismissal: 5.2, completion: 113.1, perFile: 1.27 },
];

// Sheet 5 — completed investigation files
export const completedFiles: YearSeries[] = [
  { label: "ملفات التحقيق الأولي المنجزة", y2022: 229, y2023: 174, y2024: 143, y2025: 173 },
  { label: "القرارات الصادرة بشأنها", y2022: 219, y2023: 171, y2024: 137, y2025: 168 },
  { label: "الشكاوى والبلاغات المغلقة بموجبها", y2022: 298, y2023: 217, y2024: 170, y2025: 222 },
];

// Sheet 1 — legislation
export const legislation: YearSeries[] = [
  { label: "عدد التشريعات/البنود المُقرّة أو المعدّلة", y2022: 1, y2023: 1, y2024: 0, y2025: 0 },
];

// Sheet 23 — files transferred to the public prosecution (non-corruption)
export const transferredFiles: YearSeries[] = [
  { label: "الملفات المحوّلة للنيابة العامة", y2022: 7, y2023: 3, y2024: 2, y2025: 8 },
  { label: "إجمالي الملفات المردودة لعدم الاختصاص", y2022: 13, y2023: 5, y2024: 2, y2025: 8 },
];

/** Indicators listed in the workbook summary sheet as not yet available. */
export const unavailableIndicators = [
  "جودة وفاعلية التشريعات ذات العلاقة بمكافحة الفساد (مؤشر تقييمي بالتنسيق مع الجهاز المركزي للإحصاء).",
  "عدد المكلفين (الأفراد) بإقرارات الذمة المالية — المتوفر هو عدد الجهات المكلفة فقط.",
  "نسبة انتشار الرشوة حسب وجهة نظر الأفراد (مسح كل خمس سنوات).",
  "نسبة الأشخاص الذين دفعوا رشوة فعلياً (معدل الانتشار الفعلي).",
];

// ---------------------------------------------------------------------------
// Open data catalogue — one entry per workbook family
// ---------------------------------------------------------------------------
export const datasets: DatasetItem[] = [
  {
    id: "master-2022-2025",
    name: "مؤشرات مكافحة الفساد 2022-2025 (الملف الرئيسي)",
    description:
      "الحزمة الرسمية الكاملة للمرصد: 48 ورقة عمل تغطي البلاغات والملفات والإحالات والأحكام وإقرارات الذمة المالية والحماية والرصد.",
    updated: "2026-01-15",
    format: "XLSX",
    rows: 48,
  },
  {
    id: "files-received",
    name: "الملفات التحقيقية الواردة (شيت 4)",
    description:
      "عدد الملفات التحقيقية المسجَّلة سنوياً لدى الإدارة العامة للتحقيق والشكاوى المرتبطة بها.",
    updated: "2026-01-15",
    format: "CSV",
    rows: 4,
  },
  {
    id: "files-by-sector",
    name: "توزيع الملفات حسب القطاع (شيت 20)",
    description: "توزيع الملفات الواردة حسب القطاع/الجهة (وزارات، هيئات محلية، جمعيات، نقابات...).",
    updated: "2026-01-15",
    format: "CSV",
    rows: 22,
  },
  {
    id: "crime-classification",
    name: "تصنيف جرائم الفساد (شيت 21)",
    description:
      "تصنيف الملفات الواردة حسب التكييف الأولي للجرم — 16 نوع جريمة، بمجموع 1,049 ملفاً.",
    updated: "2026-01-15",
    format: "CSV",
    rows: 16,
  },
  {
    id: "decisions",
    name: "الملفات المغلقة حسب نوع القرار (شيت 27)",
    description: "تفصيل الملفات والشكاوى المغلقة حسب الإحالة والحفظ والرد لعدم الاختصاص.",
    updated: "2026-01-15",
    format: "CSV",
    rows: 12,
  },
  {
    id: "complaints-source",
    name: "الشكاوى حسب مصدر التقديم وطريقة الاستلام (شيت 28 و31)",
    description: "توزيع الشكاوى والبلاغات حسب مقدّم الشكوى وطريقة استلامها.",
    updated: "2026-01-15",
    format: "CSV",
    rows: 8,
  },
  {
    id: "complaints-profile",
    name: "الشكاوى حسب القطاع والجنس والدرجة الوظيفية (شيت 30 و32 و33)",
    description: "خصائص المشتكى عليهم: القطاع، جنس المشتكى عليه، والدرجة الوظيفية.",
    updated: "2026-01-15",
    format: "CSV",
    rows: 23,
  },
  {
    id: "prosecution",
    name: "نيابة جرائم الفساد (شيت 34 و7)",
    description: "القضايا الواردة والمنجزة والمشتبه بهم لدى نيابة جرائم الفساد ونسبة الإنجاز.",
    updated: "2026-01-15",
    format: "CSV",
    rows: 12,
  },
  {
    id: "court",
    name: "محكمة جرائم الفساد (شيت 8–10 و35)",
    description:
      "المتهمون المحالون، القضايا المفصولة بحكم، المدانون، وتوزيع القضايا حسب نوع الجرم.",
    updated: "2026-01-15",
    format: "CSV",
    rows: 34,
  },
  {
    id: "asset-declarations",
    name: "إقرارات الذمة المالية (شيت 11ب–14)",
    description:
      "الإقرارات الموزَّعة (13,941 نموذجاً بين 2022-2025)، نسب الاستيفاء، الإقرارات الدورية، والمجموع التراكمي منذ 2012.",
    updated: "2026-01-15",
    format: "XLSX",
    rows: 60,
  },
  {
    id: "protection-requests",
    name: "طلبات الحماية والتظلمات (شيت 15–17)",
    description:
      "طلبات الحماية الواردة لوحدة حماية الشهود والمبلغين مع تفصيل حسب النوع والنتيجة والتظلمات.",
    updated: "2026-01-15",
    format: "CSV",
    rows: 48,
  },
  {
    id: "monitoring-audit",
    name: "الرصد والتدقيق وضبط الأموال (شيت 42–44)",
    description: "جهود دائرة الرصد، تقارير التدقيق المالي والإداري، والمبالغ المضبوطة والمعادة.",
    updated: "2026-01-15",
    format: "CSV",
    rows: 18,
  },
  {
    id: "gaza-2024",
    name: "بيانات غزة الاستثنائية 2024 (شيت 45)",
    description: "الشكاوى الواردة من المحافظات الجنوبية ضمن وخارج اختصاص الهيئة خلال ظروف الحرب.",
    updated: "2026-01-15",
    format: "CSV",
    rows: 2,
  },
  {
    id: "derived-rates",
    name: "النسب والمعدلات المشتقة (شيت 25)",
    description: "معدلات الإحالة والحفظ والإنجاز والنمو السنوي محسوبة بصيغ ديناميكية.",
    updated: "2026-01-15",
    format: "XLSX",
    rows: 24,
  },
];

// Insights generated from the workbook
export const dataStories: DataStory[] = [
  {
    id: "verdicts-doubling",
    title: "تضاعف عدد القضايا المفصولة بحكم في 2025",
    summary:
      "تكشف بيانات محكمة جرائم الفساد (شيت 9) قفزة نوعية في 2025 حيث تضاعف عدد القضايا المفصولة إلى 26 قضية، بزيادة 100% عن 2024 و53% عن 2022. الإدانات وحدها بلغت 12 حكماً، وهو الأعلى ضمن الفترة المرصودة.",
    headline: "×2",
    headlineLabel: "قضايا مفصولة (2024 → 2025)",
    series: [
      { label: "2022", value: 17 },
      { label: "2023", value: 10 },
      { label: "2024", value: 13 },
      { label: "2025", value: 26 },
    ],
  },
  {
    id: "top-crime",
    title: "إساءة استعمال السلطة أبرز جرائم الفساد المرصودة",
    summary:
      "على مدى أربع سنوات، شكّلت جريمة إساءة استعمال السلطة 372 ملفاً من أصل 1,049 (35.5%) وفق شيت 21، تليها التزوير واستعمال المزور بـ184 ملفاً. تفوق النسبة مجموع الرشوة والاختلاس والكسب غير المشروع مجتمعةً.",
    headline: "35.5%",
    headlineLabel: "حصة إساءة استعمال السلطة",
    series: [
      { label: "إساءة سلطة", value: 372 },
      { label: "تزوير", value: 184 },
      { label: "إساءة ائتمان", value: 98 },
      { label: "واسطة", value: 71 },
      { label: "تضارب مصالح", value: 70 },
    ],
  },
  {
    id: "closure-rate",
    title: "نسبة الحفظ في ارتفاع مطرد",
    summary:
      "ارتفعت نسبة قرارات الحفظ من 60.3% عام 2022 إلى 78.4% عام 2025 وفق النسب المشتقة في شيت 25، ما يؤشر على تشدّد مرحلة الفرز والتكييف الأولي وتوفير موارد التحقيق للملفات ذات الأولوية.",
    headline: "78.4%",
    headlineLabel: "نسبة الحفظ عام 2025",
    series: [
      { label: "2022", value: 60.3 },
      { label: "2023", value: 67.5 },
      { label: "2024", value: 79.8 },
      { label: "2025", value: 78.4 },
    ],
  },
  {
    id: "asset-declarations",
    title: "إقرارات الذمة المالية: 13,941 نموذجاً موزَّعاً",
    summary:
      "وزّعت الهيئة 13,941 نموذج إقرار ذمة مالية بين 2022 و2025 (شيت 12)، وبلغت نسبة الاستيفاء 95.6% في 2025 وهي أعلى مستوى مسجَّل، مقابل 56.4% عام 2024. وبلغ المجموع التراكمي للإقرارات منذ 2012 نحو 74,411 إقراراً.",
    headline: "95.6%",
    headlineLabel: "نسبة الاستيفاء 2025",
    series: [
      { label: "2022", value: 83.1 },
      { label: "2023", value: 85.2 },
      { label: "2024", value: 56.4 },
      { label: "2025", value: 95.6 },
    ],
  },
  {
    id: "digital-reporting",
    title: "التبليغ الإلكتروني يتصدر طرق استلام الشكاوى",
    summary:
      "وفق شيت 31، استُقبلت 1,634 شكوى وبلاغاً عبر الوسائل والتطبيقات الإلكترونية بين 2022 و2025، مقابل 1,086 عبر الحضور الشخصي، ما يجعل القناة الرقمية المصدر الأول للتبليغ عن الفساد.",
    headline: "1,634",
    headlineLabel: "بلاغ عبر القنوات الإلكترونية",
    series: [
      { label: "2022", value: 485 },
      { label: "2023", value: 344 },
      { label: "2024", value: 324 },
      { label: "2025", value: 481 },
    ],
  },
  {
    id: "gaza-2024",
    title: "1,070 شكوى استثنائية من قطاع غزة في 2024",
    summary:
      "أورد التقرير السنوي 2024 (شيت 45) 82 شكوى من المحافظات الجنوبية ضمن اختصاص الهيئة تأجلت متابعتها، إضافة إلى 1,070 شكوى خارج نطاق الاختصاص تتعلق باستغلال المواطنين في الصرافة ورسوم السفر وأسعار السلع والمساعدات.",
    headline: "1,070",
    headlineLabel: "شكوى خارج نطاق الاختصاص (2024)",
    series: [
      { label: "ضمن الاختصاص", value: 82 },
      { label: "خارج الاختصاص", value: 1070 },
    ],
  },
];

export const indicators: IndicatorGauge[] = [
  {
    id: "enf-1",
    category: "إنفاذ",
    label: "نسبة الإحالة للنيابة",
    value: 25,
    description: "نسبة الملفات المحالة للنائب العام من إجمالي الملفات الواردة عام 2025 (شيت 25).",
  },
  {
    id: "enf-2",
    category: "إنفاذ",
    label: "نسبة الحفظ",
    value: 78,
    description: "نسبة قرارات الحفظ من إجمالي الملفات الواردة عام 2025 (شيت 25).",
  },
  {
    id: "enf-3",
    category: "إنفاذ",
    label: "نسبة الإنجاز",
    value: 113,
    description: "الملفات المنجزة ÷ الواردة عام 2025 — يشمل تصريف تراكم سنوات سابقة (شيت 25).",
  },
  {
    id: "enf-4",
    category: "إنفاذ",
    label: "إنجاز نيابة جرائم الفساد",
    value: 122,
    description: "نسبة القضايا المنجزة لدى نيابة جرائم الفساد عام 2025 (شيت 7).",
  },
  {
    id: "int-1",
    category: "نزاهة",
    label: "استيفاء إقرارات الذمة 2025",
    value: 96,
    description: "الإقرارات المستلمة ÷ الموزَّعة × 100% (شيت 13).",
  },
  {
    id: "int-2",
    category: "نزاهة",
    label: "متوسط الاستيفاء 4 سنوات",
    value: 80,
    description: "المتوسط السنوي لنسبة استيفاء إقرارات الذمة المالية 2022-2025 (شيت 13).",
  },
  {
    id: "int-3",
    category: "نزاهة",
    label: "حصة الإقرارات الدورية",
    value: 75,
    description: "الإقرارات الدورية (تجديد كل 5 سنوات) من الإقرارات المستلمة عام 2025 (شيت 12ب).",
  },
  {
    id: "com-1",
    category: "مجتمع",
    label: "التبليغ الإلكتروني",
    value: 61,
    description: "حصة الوسائل والتطبيقات الإلكترونية من الشكاوى الواردة عام 2025 (شيت 31).",
  },
  {
    id: "com-2",
    category: "مجتمع",
    label: "طلبات الحماية 4 سنوات",
    value: 113,
    description: "إجمالي طلبات الحماية الواردة 2022-2025 (شيت 15 و15ب).",
  },
  {
    id: "com-3",
    category: "مجتمع",
    label: "الرصد الإلكتروني",
    value: 2986,
    description: "الأخبار المرصودة على مواقع التواصل والإنترنت في 2024 و2025 (شيت 44).",
  },
];

// PACC + Observatory content
export const observatoryJourney: JourneyMilestone[] = [
  {
    year: "قبل 2019",
    title: "الفكرة والتأسيس",
    description:
      "نضوج فكرة الانتقال من قياس مدركات الفساد إلى قياس مؤشراته الفعلية بالاعتماد على البيانات الرسمية.",
  },
  {
    year: "2019 – 2020",
    title: "الاستراتيجية الوطنية",
    description:
      "اعتماد الاستراتيجية الوطنية عبر القطاعية لتعزيز النزاهة ومكافحة الفساد التي حدّدت المرصد كأحد أعمدتها.",
  },
  {
    year: "31 يناير 2021",
    title: "إطلاق التقرير العلني الأول",
    description:
      "أطلقت هيئة مكافحة الفساد الفلسطينية التقرير العلني الأول للمرصد الوطني لمؤشرات الفساد بحضور رسمي واسع.",
  },
  {
    year: "2022",
    title: "ترسيخ منظومة البيانات",
    description:
      "تسجيل 234 ملفاً تحقيقياً و879 شكوى وبلاغاً؛ اعتماد الجداول الإحصائية الموحّدة لأول مرة.",
  },
  {
    year: "2023",
    title: "توسيع منظومة المؤشرات",
    description:
      "إضافة مؤشرات جديدة تشمل جرائم الفساد حسب التكييف الأولي، والشكاوى حسب مصدر التقديم ودرجة المشتكى عليه.",
  },
  {
    year: "2024",
    title: "التدقيق ومعالجة الفجوات",
    description:
      "توحيد قائمة المقياس وتوثيق التحفظات على أرقام محددة وتصحيحها ضمن نسخ محدَّثة، ورصد بيانات غزة الاستثنائية.",
  },
  {
    year: "2025",
    title: "قفزة الأحكام القضائية",
    description:
      "بلوغ 26 قضية مفصولة بحكم (×2 مقارنة بـ 2024) و95.6% استيفاء لإقرارات الذمة المالية.",
  },
  {
    year: "الطريق أمامنا",
    title: "خارطة الطريق المستقبلية",
    description:
      "تطوير المرصد التفاعلي الرقمي، ربط البيانات مع الجهات الشريكة، ونشر بيانات مفتوحة بصيغ قابلة للتحليل الآلي.",
  },
];

export const efforts: EffortItem[] = [
  {
    title: "بناء قاعدة البيانات الوطنية",
    description: "توحيد سجلات البلاغات والملفات والقضايا في قاعدة بيانات مركزية واحدة.",
    icon: "Database",
  },
  {
    title: "تنظيف البيانات",
    description: "معالجة القيم المفقودة والتناقضات وتوحيد صياغات التصنيفات.",
    icon: "Sparkles",
  },
  {
    title: "التحقق من صحة البيانات",
    description: "مقاطعة الأرقام مع النماذج الإحصائية الرسمية للإدارات المختصة.",
    icon: "ShieldCheck",
  },
  {
    title: "حوكمة البيانات",
    description: "سياسات وصلاحيات ومسارات موافقة رسمية على إصدار الأرقام.",
    icon: "Landmark",
  },
  {
    title: "توحيد المعايير",
    description: "قائمة المقياس الموحّد وقاموس مصطلحات مبني على قانون رقم 1 لسنة 2005.",
    icon: "Ruler",
  },
  {
    title: "تطوير المؤشرات",
    description: "معادلات موزونة (احتمالية × أثر) وربط المؤشرات المشتقة (شيت 25).",
    icon: "BarChart3",
  },
  {
    title: "تحسين التصنيفات",
    description: "تحديث تصنيفات القطاعات والجرائم مع تطور التشريعات والممارسات.",
    icon: "Layers",
  },
  {
    title: "التحوّل الرقمي",
    description: "من الملفات الورقية إلى نماذج إلكترونية موحّدة وتقارير ديناميكية.",
    icon: "Cpu",
  },
  {
    title: "تطوير النماذج الإحصائية",
    description: "نماذج موحّدة لوحدة الحماية والشكاوى والنيابة والمحكمة تغذّي المؤشرات.",
    icon: "FileText",
  },
  {
    title: "لوحات المؤشرات",
    description: "لوحة تفاعلية للجمهور توفّر KPIs ورسومات بيانية بلمسة زر.",
    icon: "LayoutDashboard",
  },
  {
    title: "تحسين الجودة",
    description: "مراجعات دورية تكشف التحفظات وتصحّح البيانات القديمة بشفافية.",
    icon: "BadgeCheck",
  },
  {
    title: "التعاون المؤسسي",
    description: "شراكات مع الجهاز المركزي للإحصاء والنيابة العامة والمحاكم.",
    icon: "Handshake",
  },
];

export const team: TeamMember[] = [
  {
    id: "lutfi",
    name: "لطفي سمحان",
    role: "مستشار رئيس هيئة مكافحة الفساد — المسؤول عن المرصد الوطني لمؤشرات الفساد",
    bio: "يقود التوجّه الاستراتيجي للمرصد الوطني ويشرف على تطويره وتنفيذه على المستويين المؤسسي والوطني.",
    leadership: true,
  },
  {
    id: "basila",
    name: "باسلة مفارجة",
    role: "رئيسة وحدة المؤشرات — المرصد الوطني لمؤشرات الفساد",
    bio: "مسؤولة عن تطوير المؤشرات والمنهجيات الإحصائية ودعم المخرجات التحليلية للمرصد.",
    leadership: true,
  },
  ...Array.from({ length: 7 }).map((_, i) => ({
    id: `member-${i + 3}`,
    name: "—",
    role: "عضو فريق المرصد",
    bio: "بيانات العضو ستُضاف قريباً.",
    placeholder: true,
  })),
];

// Data quality snapshot — computed from the source workbook
export const dataQuality = {
  records: 1049, // total files received 2022-2025 (sheets 20/21)
  complaintsTotal: 2923, // sheet 28
  coveragePeriod: "2022 – 2025",
  lastUpdate: "يناير 2026",
  indicators: 16,
  datasets: 14,
  sheets: 48,
  crimeTypes: 16,
  sectors: 22,
};

export const dataSource = {
  getKpis: () => kpis,
  getTimeline: () => timeline,
  getSectors: () => sectors,
  getCrimes: () => crimes,
  getCourtCrimes: () => courtCrimes,
  getDecisions: () => decisions,
  getDecisionShare: () => decisionShare,
  getComplaintSources: () => complaintSources,
  getReceiptMethods: () => receiptMethods,
  getJobGrades: () => jobGrades,
  getComplaintSectors: () => complaintSectors,
  getProsecution: () => prosecution,
  getProsecutionCases: () => prosecutionCases,
  getCourt: () => court,
  getAssetDeclarations: () => assetDeclarations,
  getDeclarationCategories: () => declarationCategories,
  getDeclarationExams: () => declarationExams,
  getProtection: () => protection,
  getProtectionTypes: () => protectionTypes,
  getAuditReports: () => auditReports,
  getMonitoring: () => monitoring,
  getSeizedFunds: () => seizedFunds,
  getGovernorates: () => governorates,
  getGaza2024: () => gaza2024,
  getJudicialActions: () => judicialActions,
  getDerivedRates: () => derivedRates,
  getCompletedFiles: () => completedFiles,
  getLegislation: () => legislation,
  getTransferredFiles: () => transferredFiles,
  getUnavailableIndicators: () => unavailableIndicators,
  getDatasets: () => datasets,
  getStories: () => dataStories,
  getIndicators: () => indicators,
  getJourney: () => observatoryJourney,
  getEfforts: () => efforts,
  getTeam: () => team,
  getDataQuality: () => dataQuality,
};
