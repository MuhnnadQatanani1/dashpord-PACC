/**
 * لوحة بيانات هيئة مكافحة الفساد — أهم مؤشرات الأداء الرئيسية والشارت الشامل
 * المصدر: الملف الإحصائي الرسمي لمؤشرات مكافحة الفساد 2022-2025 (48 ورقة عمل).
 */

export interface KpiCard {
  id: string;
  icon: "complaints" | "completed" | "referrals" | "convicted" | "convictionRate" | "legislation";
  label: string;
  value: number;
  suffix?: string;
  desc: string;
}

export const KPI_2025: KpiCard[] = [
  {
    id: "complaints",
    icon: "complaints",
    label: "إجمالي الشكاوى الواردة",
    value: 787,
    desc: "العدد الكلي للشكاوى والبلاغات التي استلمتها الهيئة خلال آخر سنة، وهو مقياس حجم النشاط الوارد للمنظومة.",
  },
  {
    id: "completed",
    icon: "completed",
    label: "الشكاوى المنجزة",
    value: 713,
    desc: "عدد الشكاوى التي أُغلقت فعلياً خلال نفس السنة، ويُقارن ضمنياً مع الوارد لقياس معدل الإنجاز.",
  },
  {
    id: "referrals",
    icon: "referrals",
    label: "الملفات المحالة للنيابة",
    value: 73,
    desc: "عدد الملفات التي تجاوزت الهيئة ووصلت فعلياً لنيابة جرائم الفساد، وهو مؤشر جدية القضايا الواردة.",
  },
  {
    id: "convicted",
    icon: "convicted",
    label: "عدد المدانين",
    value: 13,
    desc: "النتيجة النهائية للمسار القضائي بأشخاص حقيقيين حصلت إدانتهم فعلياً.",
  },
  {
    id: "convictionRate",
    icon: "convictionRate",
    label: "نسبة الإدانة",
    value: 41,
    suffix: "%",
    desc: "نسبة الأحكام بالإدانة من إجمالي الأحكام الصادرة، مؤشر فعالية الملاحقة القضائية.",
  },
  {
    id: "legislation",
    icon: "legislation",
    label: "التشريعات المعززة للوقاية",
    value: 63,
    desc: "عدد التشريعات أو التعديلات القانونية التي صدرت لتقوية منظومة مكافحة الفساد.",
  },
];

export interface FunnelStage {
  id: string;
  label: string;
  value: number;
}

export const FUNNEL_2025: FunnelStage[] = [
  { id: "incoming", label: "الشكاوى والبلاغات الواردة", value: 787 },
  { id: "completed", label: "الشكاوى المنجزة لدى الهيئة", value: 713 },
  { id: "referred", label: "الملفات المحالة لنيابة جرائم الفساد", value: 73 },
  { id: "prosDone", label: "ملفات النيابة المنجزة", value: 51 },
  { id: "accused", label: "المتهمون المحالون لمحكمة جرائم الفساد", value: 84 },
  { id: "verdicts", label: "القضايا المفصولة بحكم", value: 29 },
  { id: "convicted", label: "عدد المدانين فعلياً", value: 13 },
];

export const FUNNEL_NOTE =
  "الأعداد تعكس حجم النشاط في كل مرحلة خلال نفس السنة، وليست تتبعاً لنفس دفعة الملفات عبر مراحلها بالكامل (قضية 2025 قد يصدر حكمها في سنة لاحقة).";

export type ChartKind =
  | "stacked-column"
  | "treemap"
  | "donut"
  | "h-bar"
  | "line"
  | "stacked-100"
  | "stacked-area"
  | "grouped-bar"
  | "multi-line"
  | "combo";

export interface IndicatorSeries {
  name: string;
  values: number[];
}

export interface PaccIndicator {
  id: number;
  title: string;
  kind: ChartKind;
  years: string[];
  categories: IndicatorSeries[]; // each category = one series across years
  horizontalLabels?: string[]; // for treemap/h-bar donut single-year: labels + single value series
  singleYearValues?: number[];
  note?: string;
}

export const YEARS = ["2022", "2023", "2024", "2025"];

const ser = (name: string, values: number[]): IndicatorSeries => ({ name, values });

export const PACC_INDICATORS: PaccIndicator[] = [
  // 1. التشريعات المعززة للوقاية — Stacked Column
  {
    id: 1,
    title: "التشريعات المعززة للوقاية من الفساد",
    kind: "stacked-column",
    years: YEARS,
    categories: [
      ser("قرار بقانون", [11, 12, 16, 22]),
      ser("مرسوم/رئاسي", [3, 9, 3, 5]),
      ser("نظام/لائحة", [12, 24, 6, 21]),
      ser("تعليمات", [3, 14, 6, 15]),
    ],
  },
  // 2. الشكاوى حسب مصدر التقديم — Stacked Column
  {
    id: 2,
    title: "الشكاوى حسب مصدر التقديم",
    kind: "stacked-column",
    years: YEARS,
    categories: [
      ser("ذكر", [346, 237, 278, 328]),
      ser("أنثى", [45, 19, 29, 47]),
      ser("مؤسسات", [66, 43, 44, 37]),
      ser("مجهول", [414, 281, 309, 374]),
    ],
  },
  // 3. الشكاوى حسب القطاع (2025) — Treemap
  {
    id: 3,
    title: "الشكاوى حسب القطاع المشتكى عليه (2025)",
    kind: "treemap",
    years: YEARS,
    categories: [],
    horizontalLabels: [
      "مؤسسات عامة",
      "هيئات محلية",
      "المجتمع المدني",
      "قطاع خاص",
      "تعليمية وبحثية",
      "غير خاضعين",
      "دولية",
      "منظمة التحرير",
      "مكلفون بخدمة عامة",
    ],
    singleYearValues: [364, 311, 53, 20, 19, 11, 3, 5, 1],
  },
  // 4. الشكاوى حسب طريقة الاستلام (2025) — Donut
  {
    id: 4,
    title: "الشكاوى حسب طريقة الاستلام (2025)",
    kind: "donut",
    years: YEARS,
    categories: [],
    horizontalLabels: [
      "الوسائل الإلكترونية",
      "الحضور الشخصي",
      "جهات رسمية",
      "الرصد",
    ],
    singleYearValues: [481, 268, 36, 2],
  },
  // 5. تصنيف الشكاوى حسب نوع الجرم (2025) — Horizontal Bar
  {
    id: 5,
    title: "تصنيف الشكاوى حسب نوع الجرم (2025) — أعلى 6 فئات",
    kind: "h-bar",
    years: YEARS,
    categories: [],
    horizontalLabels: [
      "إساءة استعمال السلطة",
      "الواسطة والمحسوبية",
      "التزوير والتزييف",
      "التهاون في الواجبات",
      "الاختلاس",
      "الرشوة",
    ],
    singleYearValues: [552, 81, 69, 27, 17, 15],
  },
  // 6. الشكاوى المنجزة لدى الهيئة — Line
  {
    id: 6,
    title: "الشكاوى المنجزة لدى الهيئة (اتجاه سنوي)",
    kind: "line",
    years: YEARS,
    categories: [ser("الشكاوى المنجزة", [780, 679, 504, 713])],
  },
  // 7. الشكاوى حسب الإجراء المتخذ (2025) — Stacked 100%
  {
    id: 7,
    title: "الشكاوى حسب الإجراء المتخذ (2025)",
    kind: "stacked-100",
    years: YEARS,
    categories: [],
    horizontalLabels: ["حفظ", "عدم اختصاص", "إحالة للنائب العام"],
    singleYearValues: [511, 161, 41],
  },
  // 8. الملفات المحالة للنيابة حسب المصدر — Stacked Area
  {
    id: 8,
    title: "الملفات المحالة للنيابة حسب المصدر",
    kind: "stacked-area",
    years: YEARS,
    categories: [
      ser("من الهيئة", [58, 35, 31, 41]),
      ser("من النائب العام", [29, 17, 12, 28]),
      ser("قضية أخرى", [2, 3, 1, 4]),
      ser("جهات أخرى", [2, 0, 0, 0]),
    ],
  },
  // 9. الملفات المحالة للنيابة حسب الجرم (2025) — Horizontal Bar
  {
    id: 9,
    title: "الملفات المحالة للنيابة حسب الجرم (2025)",
    kind: "h-bar",
    years: YEARS,
    categories: [],
    horizontalLabels: [
      "تزوير/استعمال سند مزور",
      "التهاون في الواجبات",
      "الكسب غير المشروع",
      "الاستثمار الوظيفي",
      "إساءة استعمال السلطة",
      "الرشوة",
    ],
    singleYearValues: [21, 10, 9, 9, 6, 4],
  },
  // 10. ملفات النيابة المنجزة حسب الإجراء (2025) — Donut
  {
    id: 10,
    title: "ملفات النيابة المنجزة حسب الإجراء (2025)",
    kind: "donut",
    years: YEARS,
    categories: [],
    horizontalLabels: ["إحالة للمحكمة", "حفظ", "عدم اختصاص", "ضم لملفات أخرى"],
    singleYearValues: [34, 11, 5, 1],
  },
  // 11. المتهمون المحالون للمحكمة حسب الجنس — Grouped Bar
  {
    id: 11,
    title: "المتهمون المحالون للمحكمة حسب الجنس",
    kind: "grouped-bar",
    years: YEARS,
    categories: [ser("ذكور", [59, 89, 59, 76]), ser("إناث", [1, 12, 6, 8])],
  },
  // 12. القضايا المفصولة بحكم حسب النتيجة — Stacked Column
  {
    id: 12,
    title: "القضايا المفصولة بحكم حسب النتيجة",
    kind: "stacked-column",
    years: YEARS,
    categories: [
      ser("إدانة", [7, 6, 8, 12]),
      ser("براءة", [9, 4, 2, 14]),
      ser("عدم اختصاص", [1, 0, 1, 3]),
      ser("انقضاء الدعوى", [0, 1, 1, 0]),
    ],
  },
  // 13. عدد المدانين (اتجاه سنوي) — Line
  {
    id: 13,
    title: "عدد المدانين (اتجاه سنوي)",
    kind: "line",
    years: YEARS,
    categories: [ser("عدد المدانين", [10, 10, 12, 13])],
  },
  // 14. قيمة الأموال المحكوم بها حسب العملة — Multi Line
  {
    id: 14,
    title: "قيمة الأموال المحكوم بها حسب العملة",
    kind: "multi-line",
    years: YEARS,
    categories: [
      ser("شيكل", [15412, 1309276, 248540, 2950]),
      ser("دينار", [3000, 0, 40992, 0]),
      ser("دولار", [6800, 0, 0, 0]),
    ],
  },
  // 15. المكلفون بإقرارات الذمة المالية حسب القطاع (2025) — Treemap
  {
    id: 15,
    title: "المكلفون بإقرارات الذمة المالية حسب القطاع (2025)",
    kind: "treemap",
    years: YEARS,
    categories: [],
    horizontalLabels: [
      "المؤسسات الوزارية",
      "غير الوزارية",
      "منظمة التحرير",
      "المكلفين بخدمة عامة",
      "هيئة مكافحة الفساد",
      "العساكر",
    ],
    singleYearValues: [2523, 417, 288, 94, 41, 35],
  },
  // 16. الجهات المستهدفة مقابل الإقرارات الموزعة — Combo
  {
    id: 16,
    title: "الجهات المستهدفة مقابل الإقرارات الموزعة",
    kind: "combo",
    years: YEARS,
    categories: [ser("عدد الجهات المستهدفة", [140, 130, 33, 31]), ser("الإقرارات الموزعة", [3933, 3327, 4504, 2177])],
  },
  // 17. طلبات الحماية حسب النوع — Stacked 100%
  {
    id: 17,
    title: "طلبات الحماية حسب النوع والنتيجة",
    kind: "stacked-100",
    years: YEARS,
    categories: [],
    horizontalLabels: ["حماية وظيفية", "حماية شخصية", "حماية قانونية"],
    singleYearValues: [17, 9, 7],
  },
  // 18. نسبة من طُلب منهم رشوة حسب الفئة — H Bar
  {
    id: 18,
    title: "نسبة من دفعوا/طُلب منهم رشوة حسب الفئة",
    kind: "h-bar",
    years: YEARS,
    categories: [],
    horizontalLabels: [
      "فلسطين (إجمالي)",
      "الضفة الغربية",
      "قطاع غزة",
      "ذكور",
      "إناث",
      "حضر",
      "ريف",
      "مخيم",
    ],
    singleYearValues: [2.8, 3.7, 1.5, 2.9, 2.7, 2.5, 3.3, 3.8],
  },
];
