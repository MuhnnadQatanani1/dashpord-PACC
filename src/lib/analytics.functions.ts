import { createServerFn } from "@tanstack/react-start";
import sql from "mssql";
import { getPool } from "./db.server";
import { requireAdmin } from "./admin-session.server";

export interface AnalyticsSettings {
  enabled: boolean;
  measurementId: string | null;
}

function normalizeMeasurementId(value: unknown) {
  const id = typeof value === "string" ? value.trim().toUpperCase() : "";
  if (!id) return null;
  if (!/^G-[A-Z0-9]+$/.test(id)) {
    throw new Error("Google Analytics Measurement ID must look like G-XXXXXXXXXX.");
  }
  return id;
}

export const getAnalyticsSettings = createServerFn({ method: "GET" }).handler(
  async (): Promise<AnalyticsSettings> => {
    try {
      const pool = await getPool();
      const result = await pool
        .request()
        .input("setting_key", sql.NVarChar(100), "google_analytics")
        .query("SELECT setting_value FROM site_settings WHERE setting_key = @setting_key");
      const raw = result.recordset[0]?.setting_value;
      if (typeof raw === "string" && raw) return JSON.parse(raw) as AnalyticsSettings;
    } catch {
      // Public pages remain usable when the optional settings database is unavailable.
    }

    const measurementId = normalizeMeasurementId(process.env.GA_MEASUREMENT_ID);
    return { enabled: Boolean(measurementId), measurementId };
  },
);

export const saveAnalyticsSettings = createServerFn({ method: "POST" })
  .validator((data: { enabled: boolean; measurementId: string }) => data)
  .handler(async ({ data }): Promise<AnalyticsSettings> => {
    await requireAdmin();
    const measurementId = normalizeMeasurementId(data.measurementId);
    const settings = {
      enabled: Boolean(data.enabled && measurementId),
      measurementId,
    } satisfies AnalyticsSettings;
    const pool = await getPool();

    await pool
      .request()
      .input("setting_key", sql.NVarChar(100), "google_analytics")
      .input("setting_value", sql.NVarChar(sql.MAX), JSON.stringify(settings))
      .query(
        `MERGE site_settings AS target
         USING (SELECT @setting_key AS setting_key, @setting_value AS setting_value) AS source
         ON target.setting_key = source.setting_key
         WHEN MATCHED THEN UPDATE SET setting_value = source.setting_value, updated_at = GETDATE()
         WHEN NOT MATCHED THEN INSERT (setting_key, setting_value) VALUES (source.setting_key, source.setting_value);`,
      );

    return settings;
  });
