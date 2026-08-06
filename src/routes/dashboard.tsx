import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Cell, LabelList, LineChart, Line, PieChart, Pie } from "recharts";
import { CHART_COLORS } from "@/components/site/Charts";
import { dataSource } from "@/lib/mock-data";
import { downloadExcel } from "@/lib/excel";
import {
  ENTITY_LABELS,
  ENTITY_ORDER,
  getInteractiveByEntity,
  type IndicatorDefinition,
  type IndicatorEntity,
} from "@/data/indicators-catalog";
import {
  BadgeInfo,
  Table2,
  FileSpreadsheet,
  Calendar,
  Database,
  Layers,
  ShieldCheck,
  BookOpen,
  BarChart3,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "لوحة البيانات التفاعلية | المرصد الوطني" },
      { name: "description", content: "لوحة تفاعلية للمؤشرات الرسمية للهيئة والنيابة ومحكمة جرائم الفساد مع إمكانية الاطلاع على الجداول التفصيلية بصيغة Excel." },
    ],
  }),
});

const YEARS = ["2022", "2023", "2024", "2025"];
const AXIS = { fontSize: 11 } as const;

function IndicatorChart({ item }: { item: IndicatorDefinition }) {
  if (item.chart === "bar-years") {
    const data = item.table.rows.map((r) => ({
      label: String(r[0]),
      value: typeof r[1] === "number" ? r[1] : 0,
    }));
    return (
      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={data} margin={{ top: 28, right: 8, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-color)" vertical={false} />
          <XAxis dataKey="label" tick={{ ...AXIS, fontSize: 13 }} interval={0} />
          <YAxis tick={AXIS} orientation="right" allowDecimals={false} />
          <Tooltip
            contentStyle={{ borderRadius: 10, border: "1px solid var(--tooltip-border)", background: "var(--tooltip-bg)", fontSize: 12 }}
            cursor={{ fill: "var(--color-accent)", fillOpacity: 0.08 }}
          />
          <Bar dataKey="value" name="العدد" radius={[8, 8, 0, 0]} animationDuration={700} barSize={56}>
            {data.map((d, i) => (
              <Cell key={i} fill={d.value === 0 ? "var(--muted-foreground)" : CHART_COLORS[i % CHART_COLORS.length]} fillOpacity={d.value === 0 ? 0.35 : 1} />
            ))}
            <LabelList dataKey="value" position="top" formatter={(v: number) => v} className="fill-foreground font-bold" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (item.chart === "bar-single") {
    const rows = item.table.rows
      .filter((r) => typeof r[1] === "number")
      .map((r) => ({ label: String(r[0]), value: r[1] as number }))
      .sort((a, b) => b.value - a.value);
    const fmt = (v: number) => v.toLocaleString("en-US");
    return (
      <ResponsiveContainer width="100%" height={Math.max(300, Math.min(600, rows.length * 46 + 120))}>
        <BarChart data={rows} layout="vertical" margin={{ top: 4, right: 56, left: 8, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-color)" horizontal={false} />
          <XAxis type="number" tick={{ ...AXIS, fontSize: 11 }} tickFormatter={fmt} />
          <YAxis type="category" dataKey="label" tick={{ ...AXIS, fontSize: 11 }} width={210} orientation="right" />
          <Tooltip
            contentStyle={{ borderRadius: 10, border: "1px solid var(--tooltip-border)", background: "var(--tooltip-bg)", fontSize: 12 }}
            cursor={{ fill: "var(--color-accent)", fillOpacity: 0.08 }}
          />
          <Bar dataKey="value" name="العدد" radius={[0, 6, 6, 0]} animationDuration={700} barSize={24}>
            {rows.map((d, i) => (
              <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} fillOpacity={1 - i * 0.055} />
            ))}
            <LabelList dataKey="value" position="right" formatter={(v: number) => fmt(v)} className="fill-foreground font-bold" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }

  const TOTAL_LABELS = new Set(["المجموع", "الإجمالي"]);

  if (item.chart === "stacked-year") {
    const cats = item.table.rows
      .filter((r) => !TOTAL_LABELS.has(String(r[0])))
      .map((r) => ({
        label: String(r[0]),
        "2022": typeof r[1] === "number" ? r[1] : 0,
        "2023": typeof r[2] === "number" ? r[2] : 0,
        "2024": typeof r[3] === "number" ? r[3] : 0,
        "2025": typeof r[4] === "number" ? r[4] : 0,
      }));
    const yearRows = YEARS.map((y) => {
      const row: Record<string, number | string> = { year: y };
      cats.forEach((c) => {
        row[c.label] = c[y as "2022"];
      });
      return row;
    });
    return (
      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={yearRows} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-color)" vertical={false} />
          <XAxis dataKey="year" tick={{ ...AXIS, fontSize: 12 }} interval={0} />
          <YAxis tick={AXIS} orientation="right" />
          <Tooltip
            contentStyle={{ borderRadius: 10, border: "1px solid var(--tooltip-border)", background: "var(--tooltip-bg)", fontSize: 12 }}
            cursor={{ fill: "var(--color-accent)", fillOpacity: 0.08 }}
          />
          <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
          {cats.map((c, i) => (
            <Bar
              key={c.label}
              dataKey={c.label}
              name={c.label}
              stackId="s"
              fill={CHART_COLORS[i % CHART_COLORS.length]}
              radius={i === cats.length - 1 ? [6, 6, 0, 0] : [0, 0, 0, 0]}
              animationDuration={700}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  }

  const data = item.table.rows
    .filter((r) => !TOTAL_LABELS.has(String(r[0])))
    .map((r) => ({
      label: String(r[0]),
      "2022": typeof r[1] === "number" ? r[1] : 0,
      "2023": typeof r[2] === "number" ? r[2] : 0,
      "2024": typeof r[3] === "number" ? r[3] : 0,
      "2025": typeof r[4] === "number" ? r[4] : 0,
    }));

  const horizontal = data.length >= 8;

  if (horizontal) {
    const h = Math.max(360, Math.min(620, data.length * 42 + 140));
    return (
      <ResponsiveContainer width="100%" height={h}>
        <BarChart data={data} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-color)" horizontal={false} />
          <XAxis type="number" tick={{ ...AXIS, fontSize: 11 }} />
          <YAxis type="category" dataKey="label" tick={{ ...AXIS, fontSize: 10 }} width={230} orientation="right" />
          <Tooltip
            contentStyle={{ borderRadius: 10, border: "1px solid var(--tooltip-border)", background: "var(--tooltip-bg)", fontSize: 12 }}
            cursor={{ fill: "var(--color-accent)", fillOpacity: 0.08 }}
          />
          <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
          {YEARS.map((y, i) => (
            <Bar key={y} dataKey={y} name={y} fill={CHART_COLORS[i % CHART_COLORS.length]} radius={[0, 5, 5, 0]} animationDuration={700} barSize={14} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={Math.max(320, Math.min(560, data.length * 46 + 120))}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-color)" vertical={false} />
        <XAxis dataKey="label" tick={{ ...AXIS, fontSize: 11 }} interval={0} angle={-28} textAnchor="end" height={78} />
        <YAxis tick={AXIS} orientation="right" />
        <Tooltip
          contentStyle={{ borderRadius: 10, border: "1px solid var(--tooltip-border)", background: "var(--tooltip-bg)", fontSize: 12 }}
          cursor={{ fill: "var(--color-accent)", fillOpacity: 0.08 }}
        />
        <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
        {YEARS.map((y, i) => (
          <Bar key={y} dataKey={y} name={y} fill={CHART_COLORS[i % CHART_COLORS.length]} radius={[5, 5, 0, 0]} animationDuration={700} barSize={18} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );

  if (item.chart === "pie") {
    const twoCol = item.table.columns.length === 2;
    const slices = item.table.rows
      .filter((r) => !TOTAL_LABELS.has(String(r[0])))
      .map((r) => ({
        name: String(r[0]),
        value: twoCol
          ? (typeof r[1] === "number" ? r[1] : 0)
          : YEARS.reduce((s, _, i) => s + (typeof r[i + 1] === "number" ? (r[i + 1] as number) : 0), 0),
      }));
    return (
      <ResponsiveContainer width="100%" height={340}>
        <PieChart>
          <Pie data={slices} dataKey="value" nameKey="name" innerRadius={62} outerRadius={108} paddingAngle={2} stroke="var(--color-card)" strokeWidth={2}>
            {slices.map((_, i) => (
              <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ borderRadius: 10, border: "1px solid var(--tooltip-border)", background: "var(--tooltip-bg)", fontSize: 12 }}
          />
          <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  if (item.chart === "line-years") {
    const cats = item.table.rows.filter((r) => !TOTAL_LABELS.has(String(r[0])));
    const isYearRows = cats.every((r) => YEARS.includes(String(r[0])));
    if (isYearRows) {
      const data = cats.map((r) => ({ year: String(r[0]), value: typeof r[1] === "number" ? r[1] : 0 }));
      return (
        <ResponsiveContainer width="100%" height={340}>
          <LineChart data={data} margin={{ top: 12, right: 8, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-color)" />
            <XAxis dataKey="year" tick={{ ...AXIS, fontSize: 12 }} />
            <YAxis tick={AXIS} orientation="right" />
            <Tooltip
              contentStyle={{ borderRadius: 10, border: "1px solid var(--tooltip-border)", background: "var(--tooltip-bg)", fontSize: 12 }}
            />
            <Line type="monotone" dataKey="value" name="العدد" stroke={CHART_COLORS[0]} strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} animationDuration={800} />
          </LineChart>
        </ResponsiveContainer>
      );
    }
    const seriesNames = cats.map((r) => String(r[0]));
    const yearRows = YEARS.map((y, yi) => {
      const row: Record<string, string | number> = { year: y };
      cats.forEach((r) => {
        row[String(r[0])] = typeof r[yi + 1] === "number" ? (r[yi + 1] as number) : 0;
      });
      return row;
    });
    return (
      <ResponsiveContainer width="100%" height={340}>
        <LineChart data={yearRows} margin={{ top: 12, right: 8, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-color)" />
          <XAxis dataKey="year" tick={{ ...AXIS, fontSize: 12 }} />
          <YAxis tick={AXIS} orientation="right" />
          <Tooltip
            contentStyle={{ borderRadius: 10, border: "1px solid var(--tooltip-border)", background: "var(--tooltip-bg)", fontSize: 12 }}
          />
          <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
          {seriesNames.map((c, i) => (
            <Line key={c} type="monotone" dataKey={c} name={c} stroke={CHART_COLORS[i % CHART_COLORS.length]} strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} animationDuration={800} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

function YearChart({ item, year }: { item: IndicatorDefinition; year: string }) {
  const yearIdx = YEARS.indexOf(year);
  const TOTAL_LABELS = new Set(["المجموع", "الإجمالي"]);
  const cats = item.table.rows.filter((r) => !TOTAL_LABELS.has(String(r[0])));

  const rows = cats.map((r) => ({
    label: String(r[0]),
    value: typeof r[yearIdx + 1] === "number" ? (r[yearIdx + 1] as number) : 0,
  }));

  const isYearRows = cats.every((r) => YEARS.includes(String(r[0])));
  if (isYearRows) {
    const curRow = cats.find((r) => String(r[0]) === year);
    const cur = curRow ? (typeof curRow[1] === "number" ? (curRow[1] as number) : 0) : 0;
    const prevRow = cats.find((r) => String(r[0]) === String(Number(year) - 1));
    const prev = prevRow ? (typeof prevRow[1] === "number" ? (prevRow[1] as number) : 0) : undefined;
    const delta = prev === undefined ? null : cur - prev;
    return (
      <div className="flex h-[340px] flex-col items-center justify-center gap-3 text-center">
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">قيمة المؤشر في عام {year}</span>
        <div className="text-6xl font-black text-primary">{cur.toLocaleString("en-US")}</div>
        {delta !== null && delta !== 0 && (
          <div className={`flex items-center gap-1 text-sm font-bold ${delta > 0 ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}>
            {delta > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            {delta > 0 ? "+" : ""}
            {delta.toLocaleString("en-US")} عن عام {Number(year) - 1}
          </div>
        )}
        {delta !== null && delta === 0 && (
          <div className="text-sm font-bold text-muted-foreground">مستقر مقارنة بعام {Number(year) - 1}</div>
        )}
      </div>
    );
  }

  if (item.chart === "pie" || item.chart === "stacked-year") {
    return (
      <ResponsiveContainer width="100%" height={340}>
        <PieChart>
          <Pie data={rows} dataKey="value" nameKey="label" innerRadius={62} outerRadius={108} paddingAngle={2} stroke="var(--color-card)" strokeWidth={2}>
            {rows.map((_, i) => (
              <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ borderRadius: 10, border: "1px solid var(--tooltip-border)", background: "var(--tooltip-bg)", fontSize: 12 }}
          />
          <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  if (rows.length >= 8) {
    const h = Math.max(360, Math.min(620, rows.length * 42 + 140));
    return (
      <ResponsiveContainer width="100%" height={h}>
        <BarChart data={rows} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-color)" horizontal={false} />
          <XAxis type="number" tick={{ ...AXIS, fontSize: 11 }} />
          <YAxis type="category" dataKey="label" tick={{ ...AXIS, fontSize: 10 }} width={230} orientation="right" />
          <Tooltip
            contentStyle={{ borderRadius: 10, border: "1px solid var(--tooltip-border)", background: "var(--tooltip-bg)", fontSize: 12 }}
            cursor={{ fill: "var(--color-accent)", fillOpacity: 0.08 }}
          />
          <Bar dataKey="value" name={year} radius={[0, 5, 5, 0]} animationDuration={700} barSize={18}>
            {rows.map((_, i) => (
              <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} fillOpacity={1 - i * 0.05} />
            ))}
            <LabelList dataKey="value" position="right" formatter={(v: number) => v.toLocaleString("en-US")} className="fill-foreground font-bold" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={Math.max(320, Math.min(560, rows.length * 46 + 120))}>
      <BarChart data={rows} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-color)" vertical={false} />
        <XAxis dataKey="label" tick={{ ...AXIS, fontSize: 11 }} interval={0} angle={-28} textAnchor="end" height={78} />
        <YAxis tick={AXIS} orientation="right" allowDecimals={false} />
        <Tooltip
          contentStyle={{ borderRadius: 10, border: "1px solid var(--tooltip-border)", background: "var(--tooltip-bg)", fontSize: 12 }}
          cursor={{ fill: "var(--color-accent)", fillOpacity: 0.08 }}
        />
        <Bar dataKey="value" name={year} radius={[5, 5, 0, 0]} animationDuration={700} barSize={28}>
          {rows.map((_, i) => (
            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
          ))}
          <LabelList dataKey="value" position="top" formatter={(v: number) => v.toLocaleString("en-US")} className="fill-foreground font-bold" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function IndicatorCard({ item, year }: { item: IndicatorDefinition; year: string }) {
  const [showDef, setShowDef] = useState(false);
  const [showTable, setShowTable] = useState(false);

  return (
    <article className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-elevated">
      {/* عنوان المؤشر */}
      <header className="flex items-start justify-between gap-3">
        <h3 className="text-[15px] font-bold leading-8 text-foreground">{item.title}</h3>
        <button
          onClick={() => setShowDef((v) => !v)}
          className="focus-ring inline-flex shrink-0 items-center gap-1 rounded-md bg-accent/10 px-2.5 py-1.5 text-[11px] font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <BadgeInfo className="h-3.5 w-3.5" /> البطاقة التعريفية
        </button>
      </header>

      {/* البطاقة التعريفية */}
      {showDef && (
        <div className="mt-4 space-y-3 rounded-xl border border-border bg-surface p-4 text-sm leading-7">
          <div>
            <p className="font-bold text-primary">التعريف</p>
            <p className="text-muted-foreground">{item.definition}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <p className="font-bold text-primary">مصدر البيانات</p>
              <p className="text-muted-foreground">{item.source}</p>
            </div>
            <div>
              <p className="font-bold text-primary">طريقة الحساب</p>
              <p className="text-muted-foreground">{item.calculation}</p>
            </div>
            <div>
              <p className="font-bold text-primary">الفترة الزمنية</p>
              <p className="text-muted-foreground">{item.period}</p>
            </div>
          </div>
        </div>
      )}

      {item.note && (
        <p className="mt-3 rounded-lg bg-amber-100 px-3 py-2 text-xs leading-6 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
          {item.note}
        </p>
      )}

      {/* الرسم البياني */}
      <div className="mt-5 flex-1 rounded-xl border border-border bg-surface/60 p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary">
            <BarChart3 className="h-4 w-4" /> الرسم البياني
          </span>
          <span className="rounded-md bg-card px-2 py-1 text-[11px] font-semibold text-muted-foreground ring-1 ring-border">
            {year === "all" ? item.period : `سنة ${year}`}
          </span>
        </div>
        {year === "all" ? <IndicatorChart item={item} /> : <YearChart item={item} year={year} />}
      </div>

      {/* الأزرار */}
      <div className="mt-5 flex flex-wrap gap-2">
        <button
          onClick={() => setShowTable((v) => !v)}
          className="focus-ring inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3.5 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <Table2 className="h-4 w-4" /> {showTable ? "إخفاء الجدول التفصيلي" : "عرض الجدول التفصيلي"}
        </button>
        <button
          onClick={() => downloadExcel(`مؤشر-${item.id}`, item.title.slice(0, 30), item.table.columns, item.table.rows)}
          className="focus-ring inline-flex items-center gap-1.5 rounded-lg gradient-accent px-3.5 py-2 text-xs font-semibold text-accent-foreground transition-opacity hover:opacity-90"
        >
          <FileSpreadsheet className="h-4 w-4" /> تحميل الجدول بصيغة Excel
        </button>
      </div>

      {/* الجدول التفصيلي */}
      {showTable && (
        <div className="mt-4 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <thead>
              <tr className="bg-surface">
                {item.table.columns.map((c) => (
                  <th key={c} className="border-b border-border px-3 py-2.5 text-right text-xs font-bold text-primary">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {item.table.rows.map((row, ri) => (
                <tr key={ri} className={ri % 2 ? "bg-surface/50" : "bg-card"}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="border-b border-border/60 px-3 py-2 text-xs text-foreground/85">
                      {typeof cell === "number" ? cell.toLocaleString("ar-EG") : cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </article>
  );
}

function Dashboard() {
  const [active, setActive] = useState<IndicatorEntity>("pacc");
  const [year, setYear] = useState<string>("all");
  const q = dataSource.getDataQuality();
  const items = getInteractiveByEntity(active);

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="لوحة البيانات التفاعلية"
        title="لوحة البيانات التفاعلية للمؤشرات"
        description="استعراض المؤشرات الرسمية لجهات إنفاذ القانون (الهيئة، النيابة، المحكمة) مع إمكانية اختيار سنة محددة لعرض مؤشراتها بالرسم المناسب، وتحميل الجدول التفصيلي لكل مؤشر بصيغة Excel."
      />

      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:grid-cols-2 lg:grid-cols-5 lg:px-8">
          {[
            { icon: Calendar, label: "الفترة المشمولة", value: q.coveragePeriod },
            { icon: Database, label: "الملفات التحقيقية", value: q.records.toLocaleString("ar-EG") },
            { icon: Layers, label: "المؤشرات", value: q.indicators.toLocaleString("ar-EG") },
            { icon: ShieldCheck, label: "أوراق العمل", value: q.sheets.toLocaleString("ar-EG") },
            { icon: BookOpen, label: "آخر تحديث", value: q.lastUpdate },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                <s.icon className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[11px] text-muted-foreground">{s.label}</div>
                <div className="text-sm font-bold text-primary">{s.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold text-primary">السنة:</span>
          {[{ value: "all", label: "كل السنوات" }, ...YEARS.map((y) => ({ value: y, label: y }))].map((o) => (
            <button
              key={o.value}
              onClick={() => setYear(o.value)}
              className={`focus-ring rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                year === o.value ? "gradient-accent text-accent-foreground shadow-soft" : "border border-border bg-card text-foreground/75 hover:bg-secondary"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {ENTITY_ORDER.map((e) => (
            <button
              key={e}
              onClick={() => setActive(e)}
              className={`focus-ring rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                active === e ? "gradient-accent text-accent-foreground shadow-soft" : "border border-border bg-card text-foreground/75 hover:bg-secondary"
              }`}
            >
              {ENTITY_LABELS[e]}
            </button>
          ))}
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2">
          {items.length === 0 && (
            <p className="text-muted-foreground">لا توجد مؤشرات متاحة لهذه الجهة.</p>
          )}
          {items.map((item) => (
            <IndicatorCard key={item.id} item={item} year={year} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
