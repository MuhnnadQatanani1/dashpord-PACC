import type { SubTable } from "@/data/dashboardData";
import { useLocale } from "@/i18n";
import { DATA_EN } from "@/lib/enforcement-data-en";

const fmt = (v: number | string | null) => {
  if (v == null) return "—";
  if (typeof v === "number") return v.toLocaleString("en-US");
  return v;
};

const isTotalRow = (row: Array<number | string | null>) =>
  typeof row[0] === "string" && (row[0] === "المجموع" || row[0] === "Total");

/**
 * Renders a raw data table (columns + data + optional total row) in RTL.
 * Used by the "عرض البيانات" toggle on each dashboard indicator card.
 */
export function DataTable({ table }: { table: SubTable }) {
  const { locale } = useLocale();
  const tr = (ar: string): string =>
    locale !== "en" ? ar : (DATA_EN[ar] ?? DATA_EN[ar.replace(/\*+$/, "")] ?? ar);
  const isRtl = locale === "ar";
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-card-border bg-card">
      <table
        dir={isRtl ? "rtl" : "ltr"}
        className="w-full min-w-[520px] border-collapse text-[13px]"
      >
        <thead>
          <tr>
            {table.columns.map((c) => (
              <th
                key={c}
                className="whitespace-nowrap border border-table-border bg-navy px-3 py-2.5 text-xs font-semibold text-white"
              >
                {tr(c)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.data.map((row, ri) => (
            <tr
              key={ri}
              className={`border-b border-table-border ${
                isTotalRow(row) ? "bg-accent-soft font-bold" : ""
              }`}
            >
              {table.columns.map((c, ci) => (
                <td
                  key={c}
                  className={`whitespace-nowrap border border-table-border px-3 py-2 ${
                    ci === 0 ? "text-right font-semibold text-heading" : "text-center"
                  }`}
                >
                  <span dir={ci === 0 && !isRtl ? "ltr" : isRtl ? "rtl" : "ltr"}>
                    {ci === 0 && typeof row[ci] === "string" ? tr(String(row[ci])) : fmt(row[ci])}
                  </span>
                </td>
              ))}
            </tr>
          ))}
          {table.total_row && (
            <tr className="border-t-2 border-navy bg-warm font-bold">
              {table.columns.map((c, ci) => (
                <td
                  key={c}
                  className={`whitespace-nowrap border border-table-border px-3 py-2.5 text-heading ${
                    ci === 0 ? "text-right" : "text-center"
                  }`}
                >
                  <span dir={ci === 0 ? "ltr" : "ltr"}>
                    {ci === 0 && typeof table.total_row![ci] === "string"
                      ? tr(String(table.total_row![ci]))
                      : fmt(table.total_row![ci])}
                  </span>
                </td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
