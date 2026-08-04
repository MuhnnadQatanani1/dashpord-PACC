import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Cell, LabelList } from "recharts";
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

  const data = item.table.rows.map((r) => ({
    label: String(r[0]),
    "2022": typeof r[1] === "number" ? r[1] : 0,
    "2023": typeof r[2] === "number" ? r[2] : 0,
    "2024": typeof r[3] === "number" ? r[3] : 0,
    "2025": typeof r[4] === "number" ? r[4] : 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={Math.max(280, Math.min(520, data.length * 50 + 110))}>
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
}

function IndicatorCard({ item }: { item: IndicatorDefinition }) {
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
            {item.period}
          </span>
        </div>
        <IndicatorChart item={item} />
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
  const q = dataSource.getDataQuality();
  const items = getInteractiveByEntity(active);

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="لوحة البيانات التفاعلية"
        title="لوحة البيانات التفاعلية للمؤشرات"
        description="استعراض المؤشرات الرسمية لجهات إنفاذ القانون (الهيئة، النيابة، المحكمة) مع إمكانية الاطلاع على الجدول التفصيلي لكل مؤشر وتحميله بصيغة Excel."
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
            <IndicatorCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
