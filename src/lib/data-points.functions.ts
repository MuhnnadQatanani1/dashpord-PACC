import { createServerFn } from "@tanstack/react-start";
import sql from "mssql";
import { dashboardData, type SubTable } from "@/data/dashboardData";
import { requireAdmin } from "./admin-session.server";
import { getPool } from "./db.server";

export interface DataPoint {
  id: string;
  dataset_key: string;
  row_key: string;
  metric_key: string;
  year: number;
  value: number | null;
  note: string | null;
  source_label: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface DataDatasetOption {
  key: string;
  label: string;
  mode: "row-year" | "metric-year";
  rows: string[];
  metrics: string[];
}

const DASHBOARD_TABLES: Array<{ key: string; table: SubTable; label: string }> = [
  {
    key: "dashboard.legislations",
    label: dashboardData.legislations.title,
    table: dashboardData.legislations,
  },
  {
    key: "dashboard.complaintsBySource",
    label: dashboardData.complaintsBySource.title,
    table: dashboardData.complaintsBySource,
  },
  {
    key: "dashboard.complaintsByCrimeQualification",
    label: dashboardData.complaintsByCrimeQualification.title,
    table: dashboardData.complaintsByCrimeQualification,
  },
  {
    key: "dashboard.complaintsBySector",
    label: dashboardData.complaintsBySector.title,
    table: dashboardData.complaintsBySector,
  },
  {
    key: "dashboard.complaintsByReceiptMethod",
    label: dashboardData.complaintsByReceiptMethod.title,
    table: dashboardData.complaintsByReceiptMethod,
  },
  {
    key: "dashboard.complaintsByDefendantGender",
    label: dashboardData.complaintsByDefendantGender.title,
    table: dashboardData.complaintsByDefendantGender,
  },
  {
    key: "dashboard.investigationFilesByQualification",
    label: dashboardData.investigationFilesByQualification.title,
    table: dashboardData.investigationFilesByQualification,
  },
  {
    key: "dashboard.completedComplaints.beforeInvestigation",
    label: `${dashboardData.completedComplaints.title} - قبل التحقيق`,
    table: dashboardData.completedComplaints.beforeInvestigation,
  },
  {
    key: "dashboard.completedComplaints.afterInvestigation",
    label: `${dashboardData.completedComplaints.title} - بعد التحقيق`,
    table: dashboardData.completedComplaints.afterInvestigation,
  },
  {
    key: "dashboard.completedComplaints.totalAtCommission",
    label: `${dashboardData.completedComplaints.title} - الإجمالي لدى الهيئة`,
    table: dashboardData.completedComplaints.totalAtCommission,
  },
  {
    key: "dashboard.filesReferredToProsecutionBySource",
    label: dashboardData.filesReferredToProsecutionBySource.title,
    table: dashboardData.filesReferredToProsecutionBySource,
  },
  {
    key: "dashboard.prosecutionFilesReferredToCourtByCrime",
    label: dashboardData.prosecutionFilesReferredToCourtByCrime.title,
    table: dashboardData.prosecutionFilesReferredToCourtByCrime,
  },
  {
    key: "dashboard.prosecutionFilesCompletedByProcedure",
    label: dashboardData.prosecutionFilesCompletedByProcedure.title,
    table: dashboardData.prosecutionFilesCompletedByProcedure,
  },
  {
    key: "dashboard.defendantsReferredToCourtByGender",
    label: dashboardData.defendantsReferredToCourtByGender.title,
    table: dashboardData.defendantsReferredToCourtByGender,
  },
  {
    key: "dashboard.courtVerdictResults",
    label: dashboardData.courtVerdictResults.title,
    table: dashboardData.courtVerdictResults,
  },
  {
    key: "dashboard.investigationFilesReferredToProsecutionBySectorAndCrime.bySector",
    label: `${dashboardData.investigationFilesReferredToProsecutionBySectorAndCrime.title} - حسب القطاع`,
    table: dashboardData.investigationFilesReferredToProsecutionBySectorAndCrime.bySector,
  },
  {
    key: "dashboard.investigationFilesReferredToProsecutionBySectorAndCrime.byCrime",
    label: `${dashboardData.investigationFilesReferredToProsecutionBySectorAndCrime.title} - حسب الجرم`,
    table: dashboardData.investigationFilesReferredToProsecutionBySectorAndCrime.byCrime,
  },
  {
    key: "dashboard.suspectsReferredToProsecution",
    label: dashboardData.suspectsReferredToProsecution.title,
    table: dashboardData.suspectsReferredToProsecution,
  },
];

function tableToDatasetOption(item: (typeof DASHBOARD_TABLES)[number]): DataDatasetOption {
  const firstColumn = item.table.columns[0] ?? "";
  const firstColumnIsYear = firstColumn.includes("السنة");
  return {
    key: item.key,
    label: item.label,
    mode: firstColumnIsYear ? "metric-year" : "row-year",
    rows: firstColumnIsYear ? ["السنة"] : item.table.data.map((row) => String(row[0] ?? "")),
    metrics: firstColumnIsYear ? item.table.columns.slice(1) : ["value"],
  };
}

function normalizePoint(row: Record<string, unknown>): DataPoint {
  return {
    id: String(row.id),
    dataset_key: String(row.dataset_key ?? ""),
    row_key: String(row.row_key ?? ""),
    metric_key: String(row.metric_key ?? "value"),
    year: Number(row.year ?? 0),
    value: row.value == null ? null : Number(row.value),
    note: row.note == null ? null : String(row.note),
    source_label: row.source_label == null ? null : String(row.source_label),
    updated_by: row.updated_by == null ? null : String(row.updated_by),
    created_at:
      row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at ?? ""),
    updated_at:
      row.updated_at instanceof Date ? row.updated_at.toISOString() : String(row.updated_at ?? ""),
  };
}

export const getDataDatasetOptions = createServerFn({ method: "GET" }).handler(
  async (): Promise<DataDatasetOption[]> => DASHBOARD_TABLES.map(tableToDatasetOption),
);

export const getDataPoints = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const pool = await getPool();
  const result = await pool
    .request()
    .query("SELECT * FROM portal_data_points ORDER BY year DESC, dataset_key, row_key, metric_key");
  return (result.recordset as Record<string, unknown>[]).map(normalizePoint);
});

export const saveDataPoint = createServerFn({ method: "POST" })
  .validator(
    (d: {
      id?: string;
      dataset_key: string;
      row_key: string;
      metric_key: string;
      year: number;
      value: number | null;
      note?: string | null;
      source_label?: string | null;
    }) => d,
  )
  .handler(async ({ data }) => {
    const admin = await requireAdmin();
    const pool = await getPool();
    const req = pool
      .request()
      .input("dataset_key", sql.NVarChar(200), data.dataset_key)
      .input("row_key", sql.NVarChar(500), data.row_key)
      .input("metric_key", sql.NVarChar(500), data.metric_key || "value")
      .input("year", sql.Int, Number(data.year))
      .input("value", sql.Float, data.value)
      .input("note", sql.NVarChar(sql.MAX), data.note?.trim() || null)
      .input("source_label", sql.NVarChar(500), data.source_label?.trim() || null)
      .input("updated_by", sql.NVarChar(255), admin.email);

    if (data.id) {
      await req.input("id", sql.Int, Number(data.id)).query(
        `UPDATE portal_data_points
         SET dataset_key=@dataset_key, row_key=@row_key, metric_key=@metric_key,
             year=@year, value=@value, note=@note, source_label=@source_label,
             updated_by=@updated_by, updated_at=GETDATE()
         WHERE id=@id`,
      );
    } else {
      await req.query(
        `MERGE portal_data_points AS target
         USING (SELECT @dataset_key AS dataset_key, @row_key AS row_key, @metric_key AS metric_key, @year AS year) AS source
         ON target.dataset_key = source.dataset_key
            AND target.row_key = source.row_key
            AND target.metric_key = source.metric_key
            AND target.year = source.year
         WHEN MATCHED THEN
           UPDATE SET value=@value, note=@note, source_label=@source_label, updated_by=@updated_by, updated_at=GETDATE()
         WHEN NOT MATCHED THEN
           INSERT (dataset_key, row_key, metric_key, year, value, note, source_label, updated_by)
           VALUES (@dataset_key, @row_key, @metric_key, @year, @value, @note, @source_label, @updated_by);`,
      );
    }

    return { ok: true };
  });

export const deleteDataPoint = createServerFn({ method: "POST" })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    await requireAdmin();
    const pool = await getPool();
    await pool
      .request()
      .input("id", sql.Int, Number(data.id))
      .query("DELETE FROM portal_data_points WHERE id=@id");
    return { ok: true };
  });
