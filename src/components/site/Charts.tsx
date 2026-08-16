import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import type { TimePoint, SectorSlice, CrimeSlice, YearSeries } from "@/lib/mock-data";

/**
 * Chart tokens — driven by CSS custom properties so charts adapt to
 * both light and dark themes.
 */
const V = (name: string) => `var(--${name})`;

const AXIS = { fontSize: 12, fill: V("axis-color") } as const;
const GRID = V("grid-color");
const TOOLTIP = {
  borderRadius: 12,
  border: `1px solid ${V("tooltip-border")}`,
  background: V("tooltip-bg"),
  color: V("color-foreground"),
  fontSize: 12,
  boxShadow: "0 8px 30px -12px rgba(0,0,0,0.25)",
} as const;

export const CHART_COLORS = [
  "#16a34a",
  "#dc2626",
  "#2563eb",
  "#d97706",
  "#7c3aed",
  "#0d9488",
  "#e11d48",
  "#ca8a04",
];

const YEAR_KEYS = ["y2022", "y2023", "y2024", "y2025"] as const;
const YEAR_LABELS = ["2022", "2023", "2024", "2025"] as const;

/** Turn a YearSeries[] into recharts rows keyed by category label. */
function toRows(data: YearSeries[]) {
  return data.map((d) => ({
    label: d.label,
    "2022": d.y2022 ?? 0,
    "2023": d.y2023 ?? 0,
    "2024": d.y2024 ?? 0,
    "2025": d.y2025 ?? 0,
    total: YEAR_KEYS.reduce((s, k) => s + (d[k] ?? 0), 0),
  }));
}

export function CrimesBar({ data }: { data: CrimeSlice[] }) {
  const sorted = [...data].sort((a, b) => b.cases - a.cases);
  return (
    <ResponsiveContainer width="100%" height={420}>
      <BarChart
        data={sorted}
        layout="vertical"
        margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={GRID} horizontal={false} />
        <XAxis type="number" tick={AXIS} />
        <YAxis
          type="category"
          dataKey="crime"
          tick={{ ...AXIS, fontSize: 11 }}
          width={190}
          orientation="right"
        />
        <Tooltip
          contentStyle={TOOLTIP}
          cursor={{ fill: "var(--color-accent)", fillOpacity: 0.08 }}
        />
        <Bar dataKey="cases" name="القضايا" radius={[0, 8, 8, 0]} animationDuration={900}>
          {sorted.map((_, i) => (
            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function TimelineArea({ data }: { data: TimePoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={340}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="gCmp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={CHART_COLORS[0]} stopOpacity={0.45} />
            <stop offset="100%" stopColor={CHART_COLORS[0]} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gInv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={CHART_COLORS[1]} stopOpacity={0.45} />
            <stop offset="100%" stopColor={CHART_COLORS[1]} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
        <XAxis dataKey="year" tick={AXIS} reversed />
        <YAxis tick={AXIS} orientation="right" />
        <Tooltip contentStyle={TOOLTIP} />
        <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
        <Area
          type="monotone"
          dataKey="complaints"
          name="الشكاوى والبلاغات"
          stroke={CHART_COLORS[0]}
          fill="url(#gCmp)"
          strokeWidth={2.5}
          animationDuration={900}
        />
        <Area
          type="monotone"
          dataKey="investigations"
          name="الملفات التحقيقية"
          stroke={CHART_COLORS[1]}
          fill="url(#gInv)"
          strokeWidth={2.5}
          animationDuration={900}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function VerdictsLine({ data }: { data: TimePoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
        <XAxis dataKey="year" tick={AXIS} reversed />
        <YAxis tick={AXIS} orientation="right" />
        <Tooltip contentStyle={TOOLTIP} />
        <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
        <Line
          type="monotone"
          dataKey="referrals"
          name="محالة للنائب العام"
          stroke={CHART_COLORS[5]}
          strokeWidth={2.5}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="verdicts"
          name="القضايا المفصولة بحكم"
          stroke={CHART_COLORS[1]}
          strokeWidth={2.5}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function SectorsBar({ data }: { data: SectorSlice[] }) {
  return (
    <ResponsiveContainer width="100%" height={340}>
      <BarChart data={data} layout="vertical" margin={{ top: 10, right: 20, left: 20, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID} horizontal={false} />
        <XAxis type="number" tick={AXIS} />
        <YAxis type="category" dataKey="sector" tick={AXIS} width={150} orientation="right" />
        <Tooltip
          contentStyle={TOOLTIP}
          cursor={{ fill: "var(--color-accent)", fillOpacity: 0.08 }}
        />
        <Bar dataKey="cases" name="الملفات" radius={[0, 8, 8, 0]} animationDuration={900}>
          {data.map((_, i) => (
            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function SectorsPie({ data }: { data: SectorSlice[] }) {
  return (
    <ResponsiveContainer width="100%" height={340}>
      <PieChart>
        <Pie
          data={data}
          dataKey="cases"
          nameKey="sector"
          innerRadius={65}
          outerRadius={115}
          paddingAngle={2}
          stroke="var(--color-card)"
          strokeWidth={2}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={TOOLTIP} />
        <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

/** Generic donut for any {name, value} slice list. */
export function ShareDonut({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={340}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={72}
          outerRadius={115}
          paddingAngle={3}
          stroke="var(--color-card)"
          strokeWidth={2}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={TOOLTIP} />
        <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

/** Grouped bars: one bar per year, one group per category. */
export function YearGroupedBar({
  data,
  height = 380,
  horizontal = false,
}: {
  data: YearSeries[];
  height?: number;
  horizontal?: boolean;
}) {
  const rows = toRows(data);
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={rows}
        layout={horizontal ? "vertical" : "horizontal"}
        margin={{ top: 10, right: 20, left: 10, bottom: horizontal ? 10 : 60 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={GRID}
          horizontal={!horizontal}
          vertical={horizontal}
        />
        {horizontal ? (
          <XAxis type="number" tick={AXIS} />
        ) : (
          <XAxis
            dataKey="label"
            tick={{ ...AXIS, fontSize: 10 }}
            interval={0}
            angle={-25}
            textAnchor="end"
            height={70}
          />
        )}
        {horizontal ? (
          <YAxis
            type="category"
            dataKey="label"
            tick={{ ...AXIS, fontSize: 11 }}
            width={200}
            orientation="right"
          />
        ) : (
          <YAxis tick={AXIS} orientation="right" />
        )}
        <Tooltip
          contentStyle={TOOLTIP}
          cursor={{ fill: "var(--color-accent)", fillOpacity: 0.08 }}
        />
        <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
        {YEAR_LABELS.map((y, i) => (
          <Bar
            key={y}
            dataKey={y}
            name={y}
            fill={CHART_COLORS[i]}
            radius={horizontal ? [0, 6, 6, 0] : [6, 6, 0, 0]}
            animationDuration={800}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

/** Simple multi-series bar chart over years for arbitrary numeric keys. */
export function MultiBar({
  data,
  keys,
  height = 320,
}: {
  data: Record<string, unknown>[];
  keys: { key: string; name: string }[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID} vertical={false} />
        <XAxis dataKey="year" tick={AXIS} reversed />
        <YAxis tick={AXIS} orientation="right" />
        <Tooltip
          contentStyle={TOOLTIP}
          cursor={{ fill: "var(--color-accent)", fillOpacity: 0.08 }}
        />
        <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
        {keys.map((k, i) => (
          <Bar
            key={k.key}
            dataKey={k.key}
            name={k.name}
            fill={CHART_COLORS[i % CHART_COLORS.length]}
            radius={[6, 6, 0, 0]}
            animationDuration={800}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

/** Multi-series line chart over years. */
export function MultiLine({
  data,
  keys,
  height = 320,
}: {
  data: Record<string, unknown>[];
  keys: { key: string; name: string }[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
        <XAxis dataKey="year" tick={AXIS} reversed />
        <YAxis tick={AXIS} orientation="right" />
        <Tooltip contentStyle={TOOLTIP} />
        <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
        {keys.map((k, i) => (
          <Line
            key={k.key}
            type="monotone"
            dataKey={k.key}
            name={k.name}
            stroke={CHART_COLORS[i % CHART_COLORS.length]}
            strokeWidth={2.5}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
