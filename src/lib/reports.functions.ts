import { createServerFn } from "@tanstack/react-start";

export type ReportCategory =
  | "annual"
  | "quarterly"
  | "specialized"
  | "surveys"
  | "international";

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
  added_by: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  file_mime: string | null;
}

export const REPORT_CATEGORIES: ReportCategory[] = [
  "annual",
  "quarterly",
  "specialized",
  "surveys",
  "international",
];

function mockDate(y: number, m: number, d: number): string {
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}T00:00:00`;
}

export const MOCK_REPORTS: ReportItem[] = [
  {
    id: "mock-annual-1",
    category: "annual",
    title_ar: "التقرير السنوي لمؤشرات النزاهة ومكافحة الفساد 2025",
    title_en: "Annual Report on Integrity and Anti-Corruption Indicators 2025",
    description_ar: "تقرير سنوي شامل يستعرض مؤشرات النزاهة والشفافية والمساءلة.",
    description_en: "A comprehensive annual report reviewing integrity and accountability indicators.",
    publish_date: "2026-03-01",
    pages: 148,
    size_mb: 8.4,
    file_url: null,
    original_filename: null,
    added_by: null,
    is_published: true,
    created_at: mockDate(2026, 3, 1),
    updated_at: mockDate(2026, 3, 1),
    file_mime: null,
  },
  {
    id: "mock-annual-2",
    category: "annual",
    title_ar: "التقرير السنوي لجهود مكافحة الفساد 2024",
    title_en: "Annual Report on Anti-Corruption Efforts 2024",
    description_ar: "يرصد التقرير نتائج أعمال جهات إنفاذ القانون في قضايا الفساد.",
    description_en: "The report monitors law enforcement outputs in corruption cases.",
    publish_date: "2025-03-15",
    pages: 122,
    size_mb: 6.2,
    file_url: null,
    original_filename: null,
    added_by: null,
    is_published: true,
    created_at: mockDate(2025, 3, 15),
    updated_at: mockDate(2025, 3, 15),
    file_mime: null,
  },
  {
    id: "mock-annual-3",
    category: "annual",
    title_ar: "التقرير السنوي 2023",
    title_en: "Annual Report 2023",
    description_ar: "تقرير سنوي يغطي مستجدات منظومة النزاهة الوطنية.",
    description_en: "An annual report covering national integrity framework developments.",
    publish_date: "2024-02-20",
    pages: 110,
    size_mb: 5.1,
    file_url: null,
    original_filename: null,
    added_by: null,
    is_published: true,
    created_at: mockDate(2024, 2, 20),
    updated_at: mockDate(2024, 2, 20),
    file_mime: null,
  },
  {
    id: "mock-annual-4",
    category: "annual",
    title_ar: "التقرير السنوي 2022",
    title_en: "Annual Report 2022",
    description_ar: "تقرير سنوي يوثق تطور المؤشرات الوطنية للنزاهة ومكافحة الفساد.",
    description_en: "An annual report documenting national integrity indicator evolution.",
    publish_date: "2023-02-12",
    pages: 98,
    size_mb: 4.7,
    file_url: null,
    original_filename: null,
    added_by: null,
    is_published: true,
    created_at: mockDate(2023, 2, 12),
    updated_at: mockDate(2023, 2, 12),
    file_mime: null,
  },
  {
    id: "mock-annual-5",
    category: "annual",
    title_ar: "التقرير السنوي 2021",
    title_en: "Annual Report 2021",
    description_ar: "تقرير سنوي يستعرض وضع النزاهة ومكافحة الفساد في فلسطين.",
    description_en: "An annual report reviewing integrity and anti-corruption in Palestine.",
    publish_date: "2022-02-08",
    pages: 86,
    size_mb: 4.1,
    file_url: null,
    original_filename: null,
    added_by: null,
    is_published: true,
    created_at: mockDate(2022, 2, 8),
    updated_at: mockDate(2022, 2, 8),
    file_mime: null,
  },
  {
    id: "mock-quarterly-1",
    category: "quarterly",
    title_ar: "النشرة الربعية - الربع الرابع 2025",
    title_en: "Quarterly Bulletin - Q4 2025",
    description_ar: "نشرة ربع سنوية تعرض أبرز مؤشرات النزاهة خلال الربع الأخير من 2025.",
    description_en: "A quarterly bulletin presenting key integrity indicators during Q4 2025.",
    publish_date: "2026-01-10",
    pages: 42,
    size_mb: 2.3,
    file_url: null,
    original_filename: null,
    added_by: null,
    is_published: true,
    created_at: mockDate(2026, 1, 10),
    updated_at: mockDate(2026, 1, 10),
    file_mime: null,
  },
  {
    id: "mock-quarterly-2",
    category: "quarterly",
    title_ar: "النشرة الربعية - الربع الثالث 2025",
    title_en: "Quarterly Bulletin - Q3 2025",
    description_ar: "نشرة ربع سنوية تعرض أبرز مؤشرات النزاهة خلال الربع الثالث من 2025.",
    description_en: "A quarterly bulletin presenting key integrity indicators during Q3 2025.",
    publish_date: "2025-10-12",
    pages: 38,
    size_mb: 2.1,
    file_url: null,
    original_filename: null,
    added_by: null,
    is_published: true,
    created_at: mockDate(2025, 10, 12),
    updated_at: mockDate(2025, 10, 12),
    file_mime: null,
  },
  {
    id: "mock-quarterly-3",
    category: "quarterly",
    title_ar: "النشرة الربعية - الربع الثاني 2025",
    title_en: "Quarterly Bulletin - Q2 2025",
    description_ar: "نشرة ربع سنوية تعرض أبرز مؤشرات النزاهة خلال الربع الثاني من 2025.",
    description_en: "A quarterly bulletin presenting key integrity indicators during Q2 2025.",
    publish_date: "2025-07-15",
    pages: 35,
    size_mb: 1.9,
    file_url: null,
    original_filename: null,
    added_by: null,
    is_published: true,
    created_at: mockDate(2025, 7, 15),
    updated_at: mockDate(2025, 7, 15),
    file_mime: null,
  },
  {
    id: "mock-quarterly-4",
    category: "quarterly",
    title_ar: "النشرة الربعية - الربع الأول 2025",
    title_en: "Quarterly Bulletin - Q1 2025",
    description_ar: "نشرة ربع سنوية تعرض أبرز مؤشرات النزاهة خلال الربع الأول من 2025.",
    description_en: "A quarterly bulletin presenting key integrity indicators during Q1 2025.",
    publish_date: "2025-04-10",
    pages: 31,
    size_mb: 1.7,
    file_url: null,
    original_filename: null,
    added_by: null,
    is_published: true,
    created_at: mockDate(2025, 4, 10),
    updated_at: mockDate(2025, 4, 10),
    file_mime: null,
  },
  {
    id: "mock-specialized-1",
    category: "specialized",
    title_ar: "دراسة: الفساد في القطاع الصحي - المظاهر والمؤشرات",
    title_en: "Study: Corruption in the Health Sector",
    description_ar: "دراسة متخصصة تحلل مؤشرات الفساد في القطاع الصحي وتقدم توصيات.",
    description_en: "A specialized study analyzing corruption indicators in the health sector.",
    publish_date: "2025-11-05",
    pages: 64,
    size_mb: 3.4,
    file_url: null,
    original_filename: null,
    added_by: null,
    is_published: true,
    created_at: mockDate(2025, 11, 5),
    updated_at: mockDate(2025, 11, 5),
    file_mime: null,
  },
  {
    id: "mock-specialized-2",
    category: "specialized",
    title_ar: "دراسة: مؤشرات النزاهة في قطاع التربية والتعليم",
    title_en: "Study: Integrity Indicators in Education",
    description_ar: "دراسة متخصصة حول مظاهر الفساد ومؤشرات النزاهة في قطاع التعليم.",
    description_en: "A specialized study on corruption and integrity indicators in education.",
    publish_date: "2025-06-18",
    pages: 58,
    size_mb: 3.0,
    file_url: null,
    original_filename: null,
    added_by: null,
    is_published: true,
    created_at: mockDate(2025, 6, 18),
    updated_at: mockDate(2025, 6, 18),
    file_mime: null,
  },
  {
    id: "mock-specialized-3",
    category: "specialized",
    title_ar: "ورقة تحليلية: الحوكمة المحلية ومخاطر الفساد",
    title_en: "Analytical Paper: Local Governance and Corruption Risks",
    description_ar: "ورقة تحليلية تبحث في مؤشرات الحوكمة المحلية ومخاطر الفساد.",
    description_en: "An analytical paper examining local governance indicators and corruption risks.",
    publish_date: "2025-04-02",
    pages: 45,
    size_mb: 2.6,
    file_url: null,
    original_filename: null,
    added_by: null,
    is_published: true,
    created_at: mockDate(2025, 4, 2),
    updated_at: mockDate(2025, 4, 2),
    file_mime: null,
  },
  {
    id: "mock-specialized-4",
    category: "specialized",
    title_ar: "تقرير متخصص: حوكمة القطاع المالي ومكافحة غسل الأموال",
    title_en: "Specialized Report: Financial Sector Governance and AML",
    description_ar: "تقرير متخصص حول حوكمة القطاع المالي وجهود مكافحة غسل الأموال.",
    description_en: "A specialized report on financial sector governance and AML efforts.",
    publish_date: "2024-12-01",
    pages: 72,
    size_mb: 4.0,
    file_url: null,
    original_filename: null,
    added_by: null,
    is_published: true,
    created_at: mockDate(2024, 12, 1),
    updated_at: mockDate(2024, 12, 1),
    file_mime: null,
  },
  {
    id: "mock-surveys-1",
    category: "surveys",
    title_ar: "استطلاع رأي حول تصورات المواطنين لمكافحة الفساد 2025",
    title_en: "Citizen Perceptions Survey on Anti-Corruption 2025",
    description_ar: "استطلاع رأي وطني يعكس تصورات المواطنين حول انتشار الفساد وجهود مكافحته.",
    description_en: "A national survey reflecting citizens' perceptions of corruption and anti-corruption efforts.",
    publish_date: "2025-09-20",
    pages: 88,
    size_mb: 5.2,
    file_url: null,
    original_filename: null,
    added_by: null,
    is_published: true,
    created_at: mockDate(2025, 9, 20),
    updated_at: mockDate(2025, 9, 20),
    file_mime: null,
  },
  {
    id: "mock-surveys-2",
    category: "surveys",
    title_ar: "استطلاع رأي الشباب حول النزاهة والمشاركة المجتمعية",
    title_en: "Youth Survey on Integrity and Community Participation",
    description_ar: "استطلاع يستكشف اتجاهات الشباب نحو النزاهة والمشاركة في مكافحة الفساد.",
    description_en: "A survey exploring youth attitudes toward integrity and anti-corruption participation.",
    publish_date: "2025-03-30",
    pages: 54,
    size_mb: 3.1,
    file_url: null,
    original_filename: null,
    added_by: null,
    is_published: true,
    created_at: mockDate(2025, 3, 30),
    updated_at: mockDate(2025, 3, 30),
    file_mime: null,
  },
  {
    id: "mock-surveys-3",
    category: "surveys",
    title_ar: "استطلاع رأي القطاع الخاص حول بيئة الأعمال والنزاهة",
    title_en: "Private Sector Survey on Business Environment and Integrity",
    description_ar: "استطلاع يبحث في تقييم القطاع الخاص لبيئة الأعمال ومؤشرات النزاهة.",
    description_en: "A survey examining the private sector's assessment of business environment and integrity.",
    publish_date: "2024-10-14",
    pages: 61,
    size_mb: 3.6,
    file_url: null,
    original_filename: null,
    added_by: null,
    is_published: true,
    created_at: mockDate(2024, 10, 14),
    updated_at: mockDate(2024, 10, 14),
    file_mime: null,
  },
  {
    id: "mock-surveys-4",
    category: "surveys",
    title_ar: "استطلاع رأي حول الخدمات العامة والرضا عن الأداء الحكومي",
    title_en: "Survey on Public Services and Government Performance",
    description_ar: "استطلاع وطني لقياس رضا المواطنين عن الخدمات العامة وعلاقته بالنزاهة.",
    description_en: "A national survey measuring citizen satisfaction with public services and integrity.",
    publish_date: "2024-05-22",
    pages: 70,
    size_mb: 4.2,
    file_url: null,
    original_filename: null,
    added_by: null,
    is_published: true,
    created_at: mockDate(2024, 5, 22),
    updated_at: mockDate(2024, 5, 22),
    file_mime: null,
  },
  {
    id: "mock-international-1",
    category: "international",
    title_ar: "إضاءة: موقع فلسطين من مؤشر مدركات الفساد الدولي",
    title_en: "Highlight: Palestine's Position in the CPI",
    description_ar: "إضاءة تحليلية حول موقع المؤشرات الوطنية من المؤشرات الدولية المرجعية.",
    description_en: "An analytical highlight on national indicators relative to international references.",
    publish_date: "2025-07-10",
    pages: 18,
    size_mb: 1.4,
    file_url: null,
    original_filename: null,
    added_by: null,
    is_published: true,
    created_at: mockDate(2025, 7, 10),
    updated_at: mockDate(2025, 7, 10),
    file_mime: null,
  },
  {
    id: "mock-international-2",
    category: "international",
    title_ar: "إضاءة: التعاون الدولي في استرداد الأصول",
    title_en: "Highlight: International Cooperation in Asset Recovery",
    description_ar: "إضاءة حول جهود فلسطين في التعاون الدولي لاسترداد الأصول.",
    description_en: "A highlight on Palestine's efforts in international cooperation for asset recovery.",
    publish_date: "2024-08-19",
    pages: 15,
    size_mb: 1.2,
    file_url: null,
    original_filename: null,
    added_by: null,
    is_published: true,
    created_at: mockDate(2024, 8, 19),
    updated_at: mockDate(2024, 8, 19),
    file_mime: null,
  },
  {
    id: "mock-international-3",
    category: "international",
    title_ar: "إضاءة: فلسطين ومنظومة اتفاقية الأمم المتحدة لمكافحة الفساد",
    title_en: "Highlight: Palestine and the UN Convention against Corruption",
    description_ar: "إضاءة تستعرض التزام فلسطين بمقتضيات اتفاقية الأمم المتحدة لمكافحة الفساد.",
    description_en: "A highlight reviewing Palestine's compliance with the UN Convention against Corruption.",
    publish_date: "2024-03-05",
    pages: 22,
    size_mb: 1.8,
    file_url: null,
    original_filename: null,
    added_by: null,
    is_published: true,
    created_at: mockDate(2024, 3, 5),
    updated_at: mockDate(2024, 3, 5),
    file_mime: null,
  },
];

export const getReports = createServerFn({ method: "GET" })
  .validator((d: { categories?: ReportCategory[] } = {}) => d)
  .handler(async ({ data }) => {
    const categories = data?.categories;
    try {
      const sql = (await import("mssql")).default;
      const { getPool } = await import("./db.server");
      const pool = await getPool();
      const req = pool.request();
      let query = "SELECT * FROM reports WHERE is_published = 1";
      if (categories?.length) {
        const params = categories.map((c, i) => `@cat${i}`).join(",");
        query += ` AND category IN (${params})`;
        categories.forEach((c, i) => req.input(`cat${i}`, sql.NVarChar(50), c));
      }
      query += " ORDER BY publish_date DESC";
      const result = await req.query(query);
      return (result.recordset as Record<string, unknown>[]).map((r) => ({
        ...r,
        file_data: undefined,
        created_at: r.created_at instanceof Date ? r.created_at.toISOString() : String(r.created_at ?? ""),
        updated_at: r.updated_at instanceof Date ? r.updated_at.toISOString() : String(r.updated_at ?? ""),
      })) as ReportItem[];
    } catch (e) {
      const errMsg = e instanceof Error ? e.message : String(e);
      console.warn("[reports] SQL Server unavailable, serving demo data:", e);
      return categories?.length
        ? MOCK_REPORTS.filter((r) => categories.includes(r.category))
        : MOCK_REPORTS;
    }
  });

export const createReport = createServerFn({ method: "POST" })
  .validator((d: Partial<ReportItem> & { file_data_b64?: string }) => d)
  .handler(async ({ data }) => {
    const sql = (await import("mssql")).default;
    const { getPool } = await import("./db.server");
    const pool = await getPool();
    const fileBuf = data.file_data_b64 ? Buffer.from(data.file_data_b64, "base64") : null;
    await pool
      .request()
      .input("category", sql.NVarChar(50), data.category ?? "annual")
      .input("title_ar", sql.NVarChar(500), data.title_ar ?? "")
      .input("title_en", sql.NVarChar(500), data.title_en ?? null)
      .input("description_ar", sql.NVarChar(sql.MAX), data.description_ar ?? null)
      .input("description_en", sql.NVarChar(sql.MAX), data.description_en ?? null)
      .input("publish_date", sql.NVarChar(20), data.publish_date ?? "")
      .input("pages", sql.Int, data.pages ?? 0)
      .input("size_mb", sql.Float, data.size_mb ?? 0)
      .input("file_url", sql.NVarChar(1000), data.file_url ?? null)
      .input("original_filename", sql.NVarChar(255), data.original_filename ?? null)
      .input("added_by", sql.NVarChar(255), data.added_by ?? null)
      .input("file_data", sql.VarBinary(sql.MAX), fileBuf)
      .input("file_mime", sql.NVarChar(100), data.file_mime ?? null)
      .query(
        `INSERT INTO reports (category, title_ar, title_en, description_ar, description_en, publish_date, pages, size_mb, file_url, original_filename, added_by, file_data, file_mime)
         VALUES (@category, @title_ar, @title_en, @description_ar, @description_en, @publish_date, @pages, @size_mb, @file_url, @original_filename, @added_by, @file_data, @file_mime)`,
      );
  });

export const updateReport = createServerFn({ method: "POST" })
  .validator((d: Partial<ReportItem> & { id: string; file_data_b64?: string }) => d)
  .handler(async ({ data }) => {
    const sql = (await import("mssql")).default;
    const { getPool } = await import("./db.server");
    const pool = await getPool();
    const fileBuf = data.file_data_b64 ? Buffer.from(data.file_data_b64, "base64") : null;
    const req = pool.request();
    req
      .input("id", sql.Int, Number(data.id))
      .input("category", sql.NVarChar(50), data.category ?? "annual")
      .input("title_ar", sql.NVarChar(500), data.title_ar ?? "")
      .input("title_en", sql.NVarChar(500), data.title_en ?? null)
      .input("description_ar", sql.NVarChar(sql.MAX), data.description_ar ?? null)
      .input("description_en", sql.NVarChar(sql.MAX), data.description_en ?? null)
      .input("publish_date", sql.NVarChar(20), data.publish_date ?? "")
      .input("pages", sql.Int, data.pages ?? 0)
      .input("size_mb", sql.Float, data.size_mb ?? 0)
      .input("file_url", sql.NVarChar(1000), data.file_url ?? null)
      .input("original_filename", sql.NVarChar(255), data.original_filename ?? null)
      .input("added_by", sql.NVarChar(255), data.added_by ?? null)
      .input("file_mime", sql.NVarChar(100), data.file_mime ?? null);

    if (fileBuf) {
      req.input("file_data", sql.VarBinary(sql.MAX), fileBuf);
      await req.query(
        `UPDATE reports SET category=@category, title_ar=@title_ar, title_en=@title_en,
         description_ar=@description_ar, description_en=@description_en, publish_date=@publish_date,
         pages=@pages, size_mb=@size_mb, file_url=@file_url, original_filename=@original_filename,
         added_by=@added_by, file_data=@file_data, file_mime=@file_mime, updated_at=GETDATE()
         WHERE id=@id`,
      );
    } else {
      await req.query(
        `UPDATE reports SET category=@category, title_ar=@title_ar, title_en=@title_en,
         description_ar=@description_ar, description_en=@description_en, publish_date=@publish_date,
         pages=@pages, size_mb=@size_mb, file_url=@file_url, original_filename=@original_filename,
         added_by=@added_by, file_mime=@file_mime, updated_at=GETDATE()
         WHERE id=@id`,
      );
    }
  });

export const deleteReport = createServerFn({ method: "POST" })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    const sql = (await import("mssql")).default;
    const { getPool } = await import("./db.server");
    const pool = await getPool();
    await pool.request().input("id", sql.Int, Number(data.id)).query("DELETE FROM reports WHERE id=@id");
  });

export const getReportById = createServerFn({ method: "GET" })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    const sql = (await import("mssql")).default;
    const { getPool } = await import("./db.server");
    const pool = await getPool();
    const result = await pool
      .request()
      .input("id", sql.Int, Number(data.id))
      .query("SELECT * FROM reports WHERE id = @id");
    const row = result.recordset[0] as Record<string, unknown> | undefined;
    if (!row) return null;
    return {
      ...row,
      file_data: undefined,
      file_mime: row.file_mime ?? null,
      created_at: row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at ?? ""),
      updated_at: row.updated_at instanceof Date ? row.updated_at.toISOString() : String(row.updated_at ?? ""),
    } as ReportItem;
  });

export const getReportFile = createServerFn({ method: "GET" })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    const sql = (await import("mssql")).default;
    const { getPool } = await import("./db.server");
    const pool = await getPool();
    const result = await pool
      .request()
      .input("id", sql.Int, Number(data.id))
      .query("SELECT file_data, file_mime, original_filename FROM reports WHERE id = @id");
    const row = result.recordset[0] as Record<string, unknown> | undefined;
    if (!row || !row.file_data) return null;
    const buf = row.file_data as Buffer;
    return {
      data_b64: buf.toString("base64"),
      mime: (row.file_mime as string) || "application/octet-stream",
      filename: (row.original_filename as string) || "report",
    };
  });
