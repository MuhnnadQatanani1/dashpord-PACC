import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";

export type ReportCategory = "annual" | "quarterly" | "specialized" | "surveys" | "international";

export interface ReportItem {
  id: string;
  category: ReportCategory;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  publish_date: string;
  pages: number;
  size_mb: number;
  file_url: string | null;
  original_filename: string | null;
  is_published: boolean;
}

export const REPORT_CATEGORIES: ReportCategory[] = [
  "annual",
  "quarterly",
  "specialized",
  "surveys",
  "international",
];

export const MOCK_REPORTS: ReportItem[] = [
  // تقارير سنوية
  {
    id: "mock-annual-1",
    category: "annual",
    title_ar: "التقرير السنوي لمؤشرات النزاهة ومكافحة الفساد 2025",
    title_en: "Annual Report on Integrity and Anti-Corruption Indicators 2025",
    description_ar:
      "تقرير سنوي شامل يستعرض مؤشرات النزاهة والشفافية والمساءلة لدى الجهات الخاضعة وجهات إنفاذ القانون خلال العام 2025.",
    description_en:
      "A comprehensive annual report reviewing integrity, transparency, and accountability indicators among covered entities and law enforcement agencies during 2025.",
    publish_date: "2026-03-01",
    pages: 148,
    size_mb: 8.4,
    file_url: null,
    original_filename: null,
    is_published: true,
  },
  {
    id: "mock-annual-2",
    category: "annual",
    title_ar: "التقرير السنوي لجهود مكافحة الفساد 2024",
    title_en: "Annual Report on Anti-Corruption Efforts 2024",
    description_ar:
      "يرصد التقرير نتائج أعمال جهات إنفاذ القانون في قضايا الفساد والجرائم المرتبطة بها، وأثرها على المؤشرات الوطنية.",
    description_en:
      "The report monitors the outputs of law enforcement agencies in corruption cases and related offenses, and their impact on national indicators.",
    publish_date: "2025-03-15",
    pages: 122,
    size_mb: 6.2,
    file_url: null,
    original_filename: null,
    is_published: true,
  },
  {
    id: "mock-annual-3",
    category: "annual",
    title_ar: "التقرير السنوي 2023",
    title_en: "Annual Report 2023",
    description_ar:
      "تقرير سنوي يغطي مستجدات منظومة النزاهة الوطنية ومستوى التزام الجهات الخاضعة بمعايير الشفافية والحوكمة.",
    description_en:
      "An annual report covering developments in the national integrity framework and compliance levels of covered entities with transparency and governance standards.",
    publish_date: "2024-02-20",
    pages: 110,
    size_mb: 5.1,
    file_url: null,
    original_filename: null,
    is_published: true,
  },
  {
    id: "mock-annual-4",
    category: "annual",
    title_ar: "التقرير السنوي 2022",
    title_en: "Annual Report 2022",
    description_ar:
      "تقرير سنوي يوثق تطور المؤشرات الوطنية للنزاهة ومكافحة الفساد ويستعرض أبرز القضايا والنتائج المحققة.",
    description_en:
      "An annual report documenting the evolution of national integrity and anti-corruption indicators, highlighting key cases and achieved results.",
    publish_date: "2023-02-12",
    pages: 98,
    size_mb: 4.7,
    file_url: null,
    original_filename: null,
    is_published: true,
  },
  {
    id: "mock-annual-5",
    category: "annual",
    title_ar: "التقرير السنوي 2021",
    title_en: "Annual Report 2021",
    description_ar:
      "تقرير سنوي يستعرض وضع النزاهة ومكافحة الفساد في فلسطين وفق مؤشرات الإنفاذ والوقاية والتعاون الدولي.",
    description_en:
      "An annual report reviewing the state of integrity and anti-corruption in Palestine based on enforcement, prevention, and international cooperation indicators.",
    publish_date: "2022-02-08",
    pages: 86,
    size_mb: 4.1,
    file_url: null,
    original_filename: null,
    is_published: true,
  },
  // تقارير ربع سنوية
  {
    id: "mock-quarterly-1",
    category: "quarterly",
    title_ar: "النشرة الربعية - الربع الرابع 2025",
    title_en: "Quarterly Bulletin - Q4 2025",
    description_ar:
      "نشرة ربع سنوية تعرض أبرز مؤشرات النزاهة ومكافحة الفساد خلال الربع الأخير من العام 2025.",
    description_en:
      "A quarterly bulletin presenting key integrity and anti-corruption indicators during the last quarter of 2025.",
    publish_date: "2026-01-10",
    pages: 42,
    size_mb: 2.3,
    file_url: null,
    original_filename: null,
    is_published: true,
  },
  {
    id: "mock-quarterly-2",
    category: "quarterly",
    title_ar: "النشرة الربعية - الربع الثالث 2025",
    title_en: "Quarterly Bulletin - Q3 2025",
    description_ar:
      "نشرة ربع سنوية تعرض أبرز مؤشرات النزاهة ومكافحة الفساد خلال الربع الثالث من العام 2025.",
    description_en:
      "A quarterly bulletin presenting key integrity and anti-corruption indicators during the third quarter of 2025.",
    publish_date: "2025-10-12",
    pages: 38,
    size_mb: 2.1,
    file_url: null,
    original_filename: null,
    is_published: true,
  },
  {
    id: "mock-quarterly-3",
    category: "quarterly",
    title_ar: "النشرة الربعية - الربع الثاني 2025",
    title_en: "Quarterly Bulletin - Q2 2025",
    description_ar:
      "نشرة ربع سنوية تعرض أبرز مؤشرات النزاهة ومكافحة الفساد خلال الربع الثاني من العام 2025.",
    description_en:
      "A quarterly bulletin presenting key integrity and anti-corruption indicators during the second quarter of 2025.",
    publish_date: "2025-07-15",
    pages: 35,
    size_mb: 1.9,
    file_url: null,
    original_filename: null,
    is_published: true,
  },
  {
    id: "mock-quarterly-4",
    category: "quarterly",
    title_ar: "النشرة الربعية - الربع الأول 2025",
    title_en: "Quarterly Bulletin - Q1 2025",
    description_ar:
      "نشرة ربع سنوية تعرض أبرز مؤشرات النزاهة ومكافحة الفساد خلال الربع الأول من العام 2025.",
    description_en:
      "A quarterly bulletin presenting key integrity and anti-corruption indicators during the first quarter of 2025.",
    publish_date: "2025-04-10",
    pages: 31,
    size_mb: 1.7,
    file_url: null,
    original_filename: null,
    is_published: true,
  },
  // تقارير متخصصة
  {
    id: "mock-specialized-1",
    category: "specialized",
    title_ar: "دراسة: الفساد في القطاع الصحي - المظاهر والمؤشرات",
    title_en: "Study: Corruption in the Health Sector - Manifestations and Indicators",
    description_ar:
      "دراسة متخصصة تحلل مؤشرات الفساد في القطاع الصحي وتقدم توصيات لتعزيز النزاهة والحوكمة.",
    description_en:
      "A specialized study analyzing corruption indicators in the health sector with recommendations to strengthen integrity and governance.",
    publish_date: "2025-11-05",
    pages: 64,
    size_mb: 3.4,
    file_url: null,
    original_filename: null,
    is_published: true,
  },
  {
    id: "mock-specialized-2",
    category: "specialized",
    title_ar: "دراسة: مؤشرات النزاهة في قطاع التربية والتعليم",
    title_en: "Study: Integrity Indicators in the Education Sector",
    description_ar: "دراسة متخصصة حول مظاهر الفساد ومؤشرات النزاهة في قطاع التعليم العام والخاص.",
    description_en:
      "A specialized study on corruption manifestations and integrity indicators in public and private education.",
    publish_date: "2025-06-18",
    pages: 58,
    size_mb: 3.0,
    file_url: null,
    original_filename: null,
    is_published: true,
  },
  {
    id: "mock-specialized-3",
    category: "specialized",
    title_ar: "ورقة تحليلية: الحوكمة المحلية ومخاطر الفساد",
    title_en: "Analytical Paper: Local Governance and Corruption Risks",
    description_ar:
      "ورقة تحليلية تبحث في مؤشرات الحوكمة المحلية وتحدد مناطق خطر الفساد في الهيئات المحلية.",
    description_en:
      "An analytical paper examining local governance indicators and identifying corruption risk areas in local authorities.",
    publish_date: "2025-04-02",
    pages: 45,
    size_mb: 2.6,
    file_url: null,
    original_filename: null,
    is_published: true,
  },
  {
    id: "mock-specialized-4",
    category: "specialized",
    title_ar: "تقرير متخصص: حوكمة القطاع المالي ومكافحة غسل الأموال",
    title_en: "Specialized Report: Financial Sector Governance and AML",
    description_ar:
      "تقرير متخصص حول مؤشرات حوكمة القطاع المالي وجهود مكافحة غسل الأموال وتمويل الإرهاب.",
    description_en:
      "A specialized report on financial sector governance indicators and efforts to combat money laundering and terrorism financing.",
    publish_date: "2024-12-01",
    pages: 72,
    size_mb: 4.0,
    file_url: null,
    original_filename: null,
    is_published: true,
  },
  // استطلاعات رأي
  {
    id: "mock-surveys-1",
    category: "surveys",
    title_ar: "استطلاع رأي حول تصورات المواطنين لمكافحة الفساد 2025",
    title_en: "Citizen Perceptions Survey on Anti-Corruption 2025",
    description_ar:
      "استطلاع رأي وطني يعكس تصورات المواطنين حول انتشار الفساد وجهود مكافحته، وفق منهجية علمية تشمل مختلف المحافظات.",
    description_en:
      "A national opinion survey reflecting citizens' perceptions of corruption prevalence and anti-corruption efforts, using a scientific methodology covering all governorates.",
    publish_date: "2025-09-20",
    pages: 88,
    size_mb: 5.2,
    file_url: null,
    original_filename: null,
    is_published: true,
  },
  {
    id: "mock-surveys-2",
    category: "surveys",
    title_ar: "استطلاع رأي الشباب حول النزاهة والمشاركة المجتمعية",
    title_en: "Youth Opinion Survey on Integrity and Community Participation",
    description_ar:
      "استطلاع متخصص يستكشف اتجاهات الشباب نحو النزاهة والمشاركة في جهود مكافحة الفساد.",
    description_en:
      "A specialized survey exploring youth attitudes toward integrity and participation in anti-corruption efforts.",
    publish_date: "2025-03-30",
    pages: 54,
    size_mb: 3.1,
    file_url: null,
    original_filename: null,
    is_published: true,
  },
  {
    id: "mock-surveys-3",
    category: "surveys",
    title_ar: "استطلاع رأي القطاع الخاص حول بيئة الأعمال والنزاهة",
    title_en: "Private Sector Survey on Business Environment and Integrity",
    description_ar:
      "استطلاع يبحث في تقييم القطاع الخاص لبيئة الأعمال ومؤشرات النزاهة والشفافية في المعاملات الاقتصادية.",
    description_en:
      "A survey examining the private sector's assessment of the business environment and integrity and transparency indicators in economic transactions.",
    publish_date: "2024-10-14",
    pages: 61,
    size_mb: 3.6,
    file_url: null,
    original_filename: null,
    is_published: true,
  },
  {
    id: "mock-surveys-4",
    category: "surveys",
    title_ar: "استطلاع رأي حول الخدمات العامة والرضا عن الأداء الحكومي",
    title_en: "Survey on Public Services and Satisfaction with Government Performance",
    description_ar:
      "استطلاع وطني لقياس رضا المواطنين عن الخدمات العامة وعلاقته بمؤشرات النزاهة في الإدارة العامة.",
    description_en:
      "A national survey measuring citizens' satisfaction with public services and its relation to integrity indicators in public administration.",
    publish_date: "2024-05-22",
    pages: 70,
    size_mb: 4.2,
    file_url: null,
    original_filename: null,
    is_published: true,
  },
  // إضاءات دولية
  {
    id: "mock-international-1",
    category: "international",
    title_ar: "إضاءة: موقع فلسطين من مؤشر مدركات الفساد الدولي",
    title_en: "Highlight: Palestine's Position in the International Corruption Perceptions Index",
    description_ar:
      "إضاءة تحليلية حول موقع المؤشرات الوطنية من المؤشرات الدولية المرجعية في مجال مكافحة الفساد.",
    description_en:
      "An analytical highlight on the position of national indicators relative to international reference measures in anti-corruption.",
    publish_date: "2025-07-10",
    pages: 18,
    size_mb: 1.4,
    file_url: null,
    original_filename: null,
    is_published: true,
  },
  {
    id: "mock-international-2",
    category: "international",
    title_ar: "إضاءة: التعاون الدولي في استرداد الأصول",
    title_en: "Highlight: International Cooperation in Asset Recovery",
    description_ar:
      "إضاءة حول جهود فلسطين في التعاون الدولي لاسترداد الأصول ومكافحة التدفقات المالية غير المشروعة.",
    description_en:
      "A highlight on Palestine's efforts in international cooperation for asset recovery and combating illicit financial flows.",
    publish_date: "2024-08-19",
    pages: 15,
    size_mb: 1.2,
    file_url: null,
    original_filename: null,
    is_published: true,
  },
  {
    id: "mock-international-3",
    category: "international",
    title_ar: "إضاءة: فلسطين ومنظومة اتفاقية الأمم المتحدة لمكافحة الفساد",
    title_en: "Highlight: Palestine and the UN Convention against Corruption Framework",
    description_ar:
      "إضاءة تستعرض التزام فلسطين بمقتضيات اتفاقية الأمم المتحدة لمكافحة الفساد ومراجعة النظراء.",
    description_en:
      "A highlight reviewing Palestine's compliance with the UN Convention against Corruption requirements and peer review.",
    publish_date: "2024-03-05",
    pages: 22,
    size_mb: 1.8,
    file_url: null,
    original_filename: null,
    is_published: true,
  },
];

export const getReports = createServerFn({ method: "GET" })
  .validator((d: { categories?: ReportCategory[] } = {}) => d)
  .handler(async ({ data }) => {
    const categories = data?.categories;
    let rows: ReportItem[] = [];
    try {
      let query = supabase.from("reports").select("*");
      if (categories?.length) {
        query = query.in("category", categories);
      }
      const { data: dbRows, error } = await query.order("publish_date", {
        ascending: false,
      });
      if (error) throw error;
      rows = (dbRows as ReportItem[]) ?? [];
    } catch (e) {
      console.warn("[reports] Supabase unavailable, serving demo data:", e);
      rows = categories?.length
        ? MOCK_REPORTS.filter((r) => categories.includes(r.category))
        : MOCK_REPORTS;
    }
    return rows;
  });
