import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Cell,
  LabelList,
  LineChart,
  Line,
  PieChart,
  Pie,
  type TooltipProps,
} from "recharts";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { dashboardData, type SubTable } from "@/data/dashboardData";
import { useLocale } from "@/i18n";
import { DATA_EN } from "@/lib/enforcement-data-en";

/** Brand palette for dashboard charts. */
const CHART_COLORS = ["#3b82f6", "#f97316", "#eab308", "#64748b", "#cbd5e1"];

export const YEARS = [2022, 2023, 2024, 2025] as const;

/** Fixed chart width so every chart renders at a static, non-fluid size. */
export const CHART_W = 700;

const AXIS = { fontSize: 11 } as const;

const TOOLTIP_STYLE = {
  borderRadius: 10,
  border: "1px solid var(--tooltip-border)",
  background: "var(--tooltip-bg)",
  fontSize: 12,
} as const;

export type YearFilter = Set<number>;

const nf = (v: number | null | undefined) => (v == null ? "—" : v.toLocaleString("en-US"));

/** Translate an Arabic data label to English when the UI language is English. */
function useTr() {
  const { locale } = useLocale();
  return (ar: string): string => {
    if (locale !== "en") return ar;
    return DATA_EN[ar] ?? DATA_EN[ar.replace(/\*+$/, "")] ?? ar;
  };
}

/** Measure a container's width so charts can fill their div with no empty space. */
function useContainerWidth<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setWidth(Math.floor(el.clientWidth));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, width };
}

/** Static wrapper: each chart fills its own box (width = container, height given). */
function ChartBox({ h, children }: { h: number; children: (w: number) => ReactNode }) {
  const { ref, width } = useContainerWidth<HTMLDivElement>();
  const w = width > 0 ? width : CHART_W;
  return (
    <div ref={ref} className="w-full overflow-x-auto" style={{ minHeight: h }}>
      <div style={{ width: w, height: h }}>{children(w)}</div>
    </div>
  );
}

function YearTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div
      style={{
        ...TOOLTIP_STYLE,
        direction: "rtl",
        padding: "8px 12px",
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
          <span style={{ color: p.color }}>{p.name}:</span>
          <span>{nf(Number(p.value))}</span>
        </div>
      ))}
    </div>
  );
}

/** Sum a numeric value, treating null as excluded (not zero). */
function sumValid(values: Array<number | null | undefined>): number {
  return values.reduce<number>((acc, v) => acc + (typeof v === "number" ? v : 0), 0);
}

// generic builders ----------------------------------------------------------

function LegendBlock({ items, format }: { items: string[]; format: (s: string) => string }) {
  return (
    <Legend
      wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
      formatter={(value: string) => format(String(value))}
    />
  );
}

/** rows: [{year, catA, catB, ...}] -> stacked bar */
function StackedRows({
  rows,
  cats,
  height = 340,
}: {
  rows: Array<Record<string, unknown>>;
  cats: string[];
  height?: number;
}) {
  const tr = useTr();
  return (
    <ChartBox h={height}>
      {(w) => (
        <BarChart
          data={rows}
          width={w}
          height={height}
          margin={{ top: 8, right: 8, left: 0, bottom: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-color)" vertical={false} />
          <XAxis dataKey="year" tick={AXIS} interval={0} />
          <YAxis tick={AXIS} orientation="right" />
          <Tooltip
            content={<YearTooltip />}
            cursor={{ fill: "var(--color-accent)", fillOpacity: 0.08 }}
          />
          <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
          {cats.map((c, i) => (
            <Bar
              key={c}
              dataKey={c}
              name={tr(c)}
              stackId="s"
              fill={CHART_COLORS[i % CHART_COLORS.length]}
              radius={i === cats.length - 1 ? [6, 6, 0, 0] : [0, 0, 0, 0]}
              animationDuration={700}
            />
          ))}
        </BarChart>
      )}
    </ChartBox>
  );
}

/** rows: [{year, catA, catB, ...}] -> grouped bar */
function GroupedRows({
  rows,
  cats,
  height = 340,
}: {
  rows: Array<Record<string, unknown>>;
  cats: string[];
  height?: number;
}) {
  const tr = useTr();
  return (
    <ChartBox h={height}>
      {(w) => (
        <BarChart
          data={rows}
          width={w}
          height={height}
          margin={{ top: 8, right: 8, left: 0, bottom: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-color)" vertical={false} />
          <XAxis dataKey="year" tick={AXIS} interval={0} />
          <YAxis tick={AXIS} orientation="right" />
          <Tooltip
            content={<YearTooltip />}
            cursor={{ fill: "var(--color-accent)", fillOpacity: 0.08 }}
          />
          <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
          {cats.map((c, i) => (
            <Bar
              key={c}
              dataKey={c}
              name={tr(c)}
              fill={CHART_COLORS[i % CHART_COLORS.length]}
              radius={[5, 5, 0, 0]}
              barSize={26}
              animationDuration={700}
            />
          ))}
        </BarChart>
      )}
    </ChartBox>
  );
}

/** rows: [{year, key}] -> single line */
function LineRows({
  rows,
  keyName,
  name,
  height = 300,
}: {
  rows: Array<Record<string, unknown>>;
  keyName: string;
  name: string;
  height?: number;
}) {
  const tr = useTr();
  return (
    <ChartBox h={height}>
      {(w) => (
        <LineChart
          data={rows}
          width={w}
          height={height}
          margin={{ top: 12, right: 8, left: 0, bottom: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-color)" />
          <XAxis dataKey="year" tick={AXIS} interval={0} />
          <YAxis tick={AXIS} orientation="right" />
          <Tooltip content={<YearTooltip />} />
          <Line
            type="monotone"
            dataKey={keyName}
            name={tr(name)}
            stroke={CHART_COLORS[0]}
            strokeWidth={2.5}
            dot={{ r: 5 }}
            activeDot={{ r: 6 }}
            animationDuration={800}
          />
        </LineChart>
      )}
    </ChartBox>
  );
}

/** categorized (name + per-year values) -> horizontal bar (sum of selected years) */
function CategorizedHBar({
  rows,
  selected,
  valueName = "",
}: {
  rows: Array<Array<number | string | null>>;
  selected: YearFilter;
  valueName?: string;
}) {
  const tr = useTr();
  const yIdx = YEARS.map((y, i) => ({ y, i }));
  const items = rows
    .map((r) => {
      const name = String(r[0]);
      const byYear = yIdx.map(({ y, i }) => ({
        year: y,
        value: typeof r[i + 1] === "number" ? (r[i + 1] as number) : null,
      }));
      const filtered = byYear.filter((b) => selected.has(b.year) || selected.size === 0);
      const value = sumValid(filtered.map((f) => f.value));
      return { name, value, byYear: filtered };
    })
    .filter((it) => it.value > 0 || it.byYear.some((b) => b.value != null))
    .sort((a, b) => b.value - a.value)
    .slice(0, 4);

  const labelValueName = tr(valueName || "المجموع");
  const h = items.length * 44 + 110;
  const hasMore = rows.length > 4;
  return (
    <div className="space-y-2">
      {hasMore && (
        <p className="text-[11px] font-semibold text-muted-foreground">
          {tr("يعرض أكبر 4 أصناف قيمةً — استخدم زر «عرض البيانات» لرؤية البقية.")}
        </p>
      )}
      <ChartBox h={h}>
        {(w) => (
          <BarChart
            data={items}
            layout="vertical"
            width={w}
            height={h}
            margin={{ top: 8, right: 16, left: 8, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-color)" horizontal={false} />
            <XAxis type="number" tick={AXIS} />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ ...AXIS, fontSize: 11 }}
              width={210}
              tickMargin={16}
              orientation="right"
              tickFormatter={(v: string) => tr(v)}
            />
            <Tooltip
              content={({ active, payload }: TooltipProps<number, string>) => {
                if (!active || !payload || payload.length === 0) return null;
                const d = payload[0].payload as {
                  name: string;
                  value: number;
                  byYear: Array<{ year: number; value: number | null }>;
                };
                return (
                  <div style={{ ...TOOLTIP_STYLE, direction: "rtl", padding: "8px 12px" }}>
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>{tr(d.name)}</div>
                    {d.byYear.map((b) => (
                      <div
                        key={b.year}
                        style={{ display: "flex", justifyContent: "space-between", gap: 16 }}
                      >
                        <span>{b.year}:</span>
                        <span dir="ltr">{nf(b.value)}</span>
                      </div>
                    ))}
                    <div
                      style={{
                        fontWeight: 700,
                        marginTop: 4,
                        borderTop: "1px solid var(--tooltip-border)",
                      }}
                    >
                      {labelValueName}: <span dir="ltr">{nf(d.value)}</span>
                    </div>
                  </div>
                );
              }}
              cursor={{ fill: "var(--color-accent)", fillOpacity: 0.08 }}
            />
            <Bar
              dataKey="value"
              name={labelValueName}
              radius={[0, 6, 6, 0]}
              animationDuration={700}
              barSize={22}
            >
              {items.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
              ))}
              <LabelList
                dataKey="value"
                position="right"
                formatter={(v: number | string) => nf(Number(v))}
                className="fill-foreground font-bold"
              />
            </Bar>
          </BarChart>
        )}
      </ChartBox>
    </div>
  );
}

/** slices [{name, value}] -> donut */
function DonutSlices({ slices }: { slices: { name: string; value: number }[] }) {
  const tr = useTr();
  const h = 300;
  return (
    <ChartBox h={h}>
      {(w) => (
        <PieChart width={w} height={h}>
          <Pie
            data={slices}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={62}
            outerRadius={108}
            paddingAngle={2}
            stroke="var(--color-card)"
            strokeWidth={2}
          >
            {slices.map((_, i) => (
              <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }: TooltipProps<number, string>) => {
              if (!active || !payload || payload.length === 0) return null;
              const total = payload.reduce((s, p) => s + (Number(p.value) || 0), 0);
              return (
                <div style={{ ...TOOLTIP_STYLE, direction: "rtl", padding: "8px 12px" }}>
                  {payload.map((p, i) => (
                    <div
                      key={i}
                      style={{ display: "flex", justifyContent: "space-between", gap: 16 }}
                    >
                      <span style={{ color: p.color }}>{tr(String(p.name))}:</span>
                      <span>
                        {nf(Number(p.value))}
                        {total > 0 ? ` (${((Number(p.value) / total) * 100).toFixed(1)}%)` : ""}
                      </span>
                    </div>
                  ))}
                </div>
              );
            }}
          />
          <LegendBlock items={slices.map((s) => tr(s.name))} format={tr} />
        </PieChart>
      )}
    </ChartBox>
  );
}

// ---------- helpers to filter year-row tables ----------

function yearRows(table: SubTable, selected: YearFilter) {
  return table.data
    .filter((r) => selected.has(Number(r[0])) || selected.size === 0)
    .map((r) => {
      const obj: Record<string, unknown> = { year: r[0] };
      table.columns.slice(1).forEach((c, i) => {
        obj[c] = typeof r[i + 1] === "number" ? r[i + 1] : null;
      });
      return obj;
    });
}

// For tables whose rows are categories and columns are years (first column = category name).
// Transposes into year-keyed rows: [{year, catA, catB, ...}] usable by StackedRows/GroupedRows.
function categoryYearRows(
  table: SubTable,
  selected: YearFilter,
  cats: string[],
): Array<Record<string, unknown>> {
  const yearCols = table.columns.slice(1).map(Number).filter(Number.isFinite);
  const active = selected.size === 0 ? yearCols : yearCols.filter((y) => selected.has(y));
  return active.map((year) => {
    const obj: Record<string, unknown> = { year };
    cats.forEach((c) => {
      const row = table.data.find((r) => String(r[0]) === c);
      const idx = yearCols.indexOf(year);
      obj[c] = row && idx >= 0 ? (row[idx + 1] ?? null) : null;
    });
    return obj;
  });
}

/** Two static charts stacked vertically (bar above donut). */
function DualStacked({ top, bottom }: { top: ReactNode; bottom: ReactNode }) {
  const tr = useTr();
  return (
    <div className="flex flex-col gap-5">
      {top}
      <div>
        <p className="mb-1 text-center text-xs font-semibold text-muted-foreground">
          {tr("التوزيع الكلي للفترة")}
        </p>
        {bottom}
      </div>
    </div>
  );
}

// =====================================================================
// The 12 indicator charts (bound to exact dashboardData keys)
// =====================================================================

// 1) Legislations (stacked by year)
export function LegislationsChart({ selected }: { selected: YearFilter }) {
  const cols = [
    "قرار بقانون",
    "مرسوم أو قرار رئاسي",
    "نظام أو لائحة أو قرار مجلس وزراء",
    "تعليمات أو قرارات تنظيمية",
  ];
  return <StackedRows rows={yearRows(dashboardData.legislations, selected)} cats={cols} />;
}

// 2a) Complaints by source: grouped bars by year
export function ComplaintsBySourceChart({ selected }: { selected: YearFilter }) {
  const cats = ["أفراد-ذكر", "أفراد-أنثى", "أفراد-ذكر وأنثى معاً", "مؤسسات", "مجهول/غير معروف"];
  const rows = yearRows(dashboardData.complaintsBySource, selected);
  return <GroupedRows rows={rows} cats={cats} />;
}

// 2b) Complaints by source: total period donut
export function ComplaintsBySourcePeriodChart({ selected }: { selected: YearFilter }) {
  const cats = ["أفراد-ذكر", "أفراد-أنثى", "أفراد-ذكر وأنثى معاً", "مؤسسات", "مجهول/غير معروف"];
  const rows = yearRows(dashboardData.complaintsBySource, selected);
  const slices = cats.map((c) => ({
    name: c,
    value: sumValid(rows.map((r) => r[c] as number | null)),
  }));
  return <DonutSlices slices={slices} />;
}

// 3) Complaints by sector (horizontal, year filterable)
export function ComplaintsBySectorChart({ selected }: { selected: YearFilter }) {
  return (
    <CategorizedHBar
      rows={dashboardData.complaintsBySector.data}
      selected={selected}
      valueName="الشكاوى"
    />
  );
}

// 4a) Complaints by receipt method: stacked bars by year
export function ComplaintsByReceiptMethodChart({ selected }: { selected: YearFilter }) {
  const cats = [
    "الحضور الشخصي وتسليم باليد",
    "جهات ومؤسسات رسمية",
    "الرصد",
    "الوسائل والتطبيقات الإلكترونية",
  ];
  const rows = categoryYearRows(dashboardData.complaintsByReceiptMethod, selected, cats);
  return <StackedRows rows={rows} cats={cats} />;
}

// 4b) Complaints by receipt method: total period donut
export function ComplaintsByReceiptMethodPeriodChart({ selected }: { selected: YearFilter }) {
  const cats = [
    "الحضور الشخصي وتسليم باليد",
    "جهات ومؤسسات رسمية",
    "الرصد",
    "الوسائل والتطبيقات الإلكترونية",
  ];
  const rows = categoryYearRows(dashboardData.complaintsByReceiptMethod, selected, cats);
  const slices = cats.map((c) => ({
    name: c,
    value: sumValid(rows.map((r) => r[c] as number | null)),
  }));
  return <DonutSlices slices={slices} />;
}

// 5) Investigation files by qualification (horizontal desc, year filterable)
export function InvestigationFilesChart({ selected }: { selected: YearFilter }) {
  return (
    <CategorizedHBar
      rows={dashboardData.investigationFilesByQualification.data}
      selected={selected}
      valueName="الملفات"
    />
  );
}

// 6) Completed complaints (totalAtCommission, stacked)
export function CompletedComplaintsChart({ selected }: { selected: YearFilter }) {
  return (
    <StackedRows
      rows={yearRows(dashboardData.completedComplaints.totalAtCommission, selected)}
      cats={["حفظ", "عدم الاختصاص", "إحالة الى النائب العام"]}
    />
  );
}

// 7) Files referred to prosecution by source (grouped, source columns only)
export function FilesReferredBySourceChart({ selected }: { selected: YearFilter }) {
  const cats = ["هيئة مكافحة الفساد", "النائب العام", "منبثقة عن قضية أخرى", "واردة من جهات أخرى"];
  return (
    <GroupedRows
      rows={yearRows(dashboardData.filesReferredToProsecutionBySource, selected)}
      cats={cats}
    />
  );
}

// 8) Prosecution files referred to court by crime (horizontal, ignore null)
export function CourtByCrimeChart({ selected }: { selected: YearFilter }) {
  return (
    <CategorizedHBar
      rows={dashboardData.prosecutionFilesReferredToCourtByCrime.data}
      selected={selected}
      valueName="الملفات"
    />
  );
}

// 9) Prosecution files completed by procedure (stacked)
export function FilesCompletedByProcedureChart({ selected }: { selected: YearFilter }) {
  const cats = [
    "إحالة لمحكمة جرائم الفساد",
    "حفظ",
    "ضم لملفات أخرى",
    "إحالة الى نيابات أخرى لعدم اختصاص",
  ];
  return (
    <StackedRows
      rows={yearRows(dashboardData.prosecutionFilesCompletedByProcedure, selected)}
      cats={cats}
    />
  );
}

// 10) Defendants referred to court by gender (grouped ذكر/أنثى) + note
export function DefendantsByGenderChart({ selected }: { selected: YearFilter }) {
  return (
    <GroupedRows
      rows={yearRows(dashboardData.defendantsReferredToCourtByGender, selected)}
      cats={["ذكر", "أنثى"]}
    />
  );
}

// 11) Court verdict results (stacked: إدانة/براءة/عدم اختصاص/انقضاء)
export function CourtVerdictsChart({ selected }: { selected: YearFilter }) {
  return (
    <StackedRows
      rows={yearRows(dashboardData.courtVerdictResults, selected)}
      cats={["إدانة", "براءة", "عدم اختصاص", "انقضاء الدعوى الجزائية"]}
    />
  );
}

// 12) Convicted count (line/bar: عدد المدانين)
export function ConvictedCountChart({ selected }: { selected: YearFilter }) {
  const rows = yearRows(dashboardData.courtVerdictResults, selected);
  return <LineRows rows={rows} keyName="عدد المدانين" name="عدد المدانين" />;
}
