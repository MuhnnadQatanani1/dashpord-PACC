import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Plus,
  LogOut,
  Trash2,
  Loader2,
  BarChart3,
  Save,
  FileText,
  Database,
  Pencil,
} from "lucide-react";
import { getLocale, useLocale, dictionaries } from "@/i18n";
import { useAuth } from "@/lib/use-auth";
import { adminLogin, type AdminUser } from "@/lib/auth.functions";
import { getAnalyticsSettings, saveAnalyticsSettings } from "@/lib/analytics.functions";
import {
  deleteDataPoint,
  getDataDatasetOptions,
  getDataPoints,
  saveDataPoint,
  type DataDatasetOption,
  type DataPoint,
} from "@/lib/data-points.functions";
import { deleteReport, getAdminReports, type ReportItem } from "@/lib/reports.functions";
import { ReportCard } from "@/components/reports/ReportCard";
import { ReportForm } from "@/components/reports/ReportForm";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/reports/manage")({
  component: ManageReports,
  head: () => {
    const dict = dictionaries[getLocale()];
    return {
      meta: [
        { title: dict["meta.manageTitle"] },
        { name: "description", content: dict["meta.manageDesc"] },
      ],
    };
  },
});

function SignInCard({ onSignIn }: { onSignIn: (user: AdminUser) => void }) {
  const { t } = useLocale();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const login = useServerFn(adminLogin);

  const inputCls =
    "focus-ring w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const user = await login({ data: { email, password } });
      if (user) {
        onSignIn(user);
      } else {
        setError(t("auth.error"));
      }
    } catch {
      setError(t("auth.dbError"));
    }
    setBusy(false);
  }

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-6 shadow-soft">
      <h3 className="text-lg font-bold text-primary">{t("auth.login")}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{t("auth.adminOnly")}</p>
      <form onSubmit={submit} className="mt-4 grid gap-3">
        <label className="grid gap-1.5">
          <span className="text-sm font-medium text-foreground">{t("auth.email")}</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputCls}
            dir="ltr"
          />
        </label>
        <label className="grid gap-1.5">
          <span className="text-sm font-medium text-foreground">{t("auth.password")}</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={inputCls}
            dir="ltr"
          />
        </label>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          {t("auth.loginBtn")}
        </button>
      </form>
    </div>
  );
}

function DataPointPanel() {
  const { t } = useLocale();
  const queryClient = useQueryClient();
  const loadOptions = useServerFn(getDataDatasetOptions);
  const loadPoints = useServerFn(getDataPoints);
  const savePoint = useServerFn(saveDataPoint);
  const removePoint = useServerFn(deleteDataPoint);
  const { data: options = [] } = useQuery({
    queryKey: ["data-dataset-options"],
    queryFn: () => loadOptions({ data: undefined }),
  });
  const { data: points = [], isFetching } = useQuery({
    queryKey: ["data-points"],
    queryFn: () => loadPoints({ data: undefined }),
  });
  const [editing, setEditing] = useState<DataPoint | null>(null);
  const [datasetKey, setDatasetKey] = useState("");
  const [rowKey, setRowKey] = useState("");
  const [metricKey, setMetricKey] = useState("value");
  const [year, setYear] = useState("2026");
  const [value, setValue] = useState("");
  const [sourceLabel, setSourceLabel] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const selectedDataset = options.find((option) => option.key === datasetKey);

  useEffect(() => {
    if (!datasetKey && options[0]) {
      setDatasetKey(options[0].key);
      setRowKey(options[0].rows[0] ?? "");
      setMetricKey(options[0].metrics[0] ?? "value");
    }
  }, [datasetKey, options]);

  useEffect(() => {
    if (!selectedDataset) return;
    if (!selectedDataset.rows.includes(rowKey)) setRowKey(selectedDataset.rows[0] ?? "");
    if (!selectedDataset.metrics.includes(metricKey)) {
      setMetricKey(selectedDataset.metrics[0] ?? "value");
    }
  }, [metricKey, rowKey, selectedDataset]);

  function resetForm(nextDataset?: DataDatasetOption) {
    const dataset = nextDataset ?? selectedDataset ?? options[0];
    setEditing(null);
    setDatasetKey(dataset?.key ?? "");
    setRowKey(dataset?.rows[0] ?? "");
    setMetricKey(dataset?.metrics[0] ?? "value");
    setYear("2026");
    setValue("");
    setSourceLabel("");
    setNote("");
  }

  function startEdit(point: DataPoint) {
    setEditing(point);
    setDatasetKey(point.dataset_key);
    setRowKey(point.row_key);
    setMetricKey(point.metric_key);
    setYear(String(point.year));
    setValue(point.value == null ? "" : String(point.value));
    setSourceLabel(point.source_label ?? "");
    setNote(point.note ?? "");
    setStatus(null);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setStatus(null);
    try {
      await savePoint({
        data: {
          id: editing?.id,
          dataset_key: datasetKey,
          row_key: rowKey,
          metric_key: metricKey || "value",
          year: Number(year),
          value: value.trim() === "" ? null : Number(value),
          source_label: sourceLabel,
          note,
        },
      });
      await queryClient.invalidateQueries({ queryKey: ["data-points"] });
      setStatus(t("admin.dataSaved"));
      resetForm();
    } catch {
      setStatus(t("admin.dataError"));
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(point: DataPoint) {
    await removePoint({ data: { id: point.id } });
    await queryClient.invalidateQueries({ queryKey: ["data-points"] });
    if (editing?.id === point.id) resetForm();
  }

  const inputCls =
    "focus-ring w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground";

  return (
    <section className="mb-8 rounded-2xl border border-border bg-card p-6 shadow-soft">
      <div className="flex items-center gap-2 text-lg font-bold text-primary">
        <Database className="h-5 w-5 text-accent" />
        {t("admin.dataTitle")}
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{t("admin.dataDesc")}</p>

      <form onSubmit={submit} className="mt-5 grid gap-4">
        <div className="grid gap-4 lg:grid-cols-2">
          <label className="grid gap-1.5 text-sm font-medium">
            <span>{t("admin.dataDataset")}</span>
            <select
              value={datasetKey}
              onChange={(event) => {
                const next = options.find((option) => option.key === event.target.value);
                resetForm(next);
              }}
              className={inputCls}
            >
              {options.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1.5 text-sm font-medium">
            <span>{t("admin.dataRow")}</span>
            <select
              value={rowKey}
              onChange={(event) => setRowKey(event.target.value)}
              className={inputCls}
            >
              {selectedDataset?.rows.map((row) => (
                <option key={row} value={row}>
                  {row}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <label className="grid gap-1.5 text-sm font-medium">
            <span>{t("admin.dataMetric")}</span>
            <select
              value={metricKey}
              onChange={(event) => setMetricKey(event.target.value)}
              className={inputCls}
            >
              {selectedDataset?.metrics.map((metric) => (
                <option key={metric} value={metric}>
                  {metric === "value" ? t("admin.dataValue") : metric}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1.5 text-sm font-medium">
            <span>{t("admin.dataYear")}</span>
            <input
              type="number"
              min={2000}
              max={2100}
              value={year}
              onChange={(event) => setYear(event.target.value)}
              className={inputCls}
              required
              dir="ltr"
            />
          </label>
          <label className="grid gap-1.5 text-sm font-medium">
            <span>{t("admin.dataValue")}</span>
            <input
              type="number"
              step="any"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              className={inputCls}
              dir="ltr"
            />
          </label>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <label className="grid gap-1.5 text-sm font-medium">
            <span>{t("admin.dataSource")}</span>
            <input
              value={sourceLabel}
              onChange={(event) => setSourceLabel(event.target.value)}
              className={inputCls}
              placeholder={t("admin.dataSourcePlaceholder")}
            />
          </label>
          <label className="grid gap-1.5 text-sm font-medium">
            <span>{t("admin.dataNote")}</span>
            <input
              value={note}
              onChange={(event) => setNote(event.target.value)}
              className={inputCls}
              placeholder={t("admin.dataNotePlaceholder")}
            />
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="submit"
            disabled={busy || !datasetKey || !rowKey || !metricKey}
            className="focus-ring inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {editing ? t("common.update") : t("common.save")}
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => resetForm()}
              className="focus-ring rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary"
            >
              {t("common.cancel")}
            </button>
          )}
          {status && <span className="text-sm text-muted-foreground">{status}</span>}
        </div>
      </form>

      <div className="mt-6 overflow-hidden rounded-xl border border-border">
        <div className="bg-surface px-4 py-3 text-sm font-bold text-primary">
          {t("admin.dataSavedEntries")}
        </div>
        <div className="max-h-96 overflow-auto">
          {isFetching ? (
            <div className="p-4 text-sm text-muted-foreground">{t("common.loading")}</div>
          ) : points.length === 0 ? (
            <div className="p-4 text-sm text-muted-foreground">{t("admin.dataEmpty")}</div>
          ) : (
            <table className="w-full min-w-[760px] text-sm">
              <thead className="bg-secondary/60 text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 text-start">{t("admin.dataYear")}</th>
                  <th className="px-3 py-2 text-start">{t("admin.dataDataset")}</th>
                  <th className="px-3 py-2 text-start">{t("admin.dataRow")}</th>
                  <th className="px-3 py-2 text-start">{t("admin.dataMetric")}</th>
                  <th className="px-3 py-2 text-start">{t("admin.dataValue")}</th>
                  <th className="px-3 py-2 text-start">{t("admin.actions")}</th>
                </tr>
              </thead>
              <tbody>
                {points.map((point) => {
                  const option = options.find((item) => item.key === point.dataset_key);
                  return (
                    <tr key={point.id} className="border-t border-border">
                      <td className="px-3 py-2 font-mono">{point.year}</td>
                      <td className="px-3 py-2">{option?.label ?? point.dataset_key}</td>
                      <td className="px-3 py-2">{point.row_key}</td>
                      <td className="px-3 py-2">
                        {point.metric_key === "value" ? t("admin.dataValue") : point.metric_key}
                      </td>
                      <td className="px-3 py-2 font-mono">{point.value ?? "-"}</td>
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => startEdit(point)}
                            className="focus-ring rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-primary"
                            aria-label={t("common.edit")}
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => void handleDelete(point)}
                            className="focus-ring rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                            aria-label={t("common.delete")}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}

export function ManageReports() {
  const { t } = useLocale();
  const { session, loading, signIn, signOut } = useAuth();
  const queryClient = useQueryClient();
  const fetchReports = useServerFn(getAdminReports);
  const { data: reports = [], isFetching: reportsLoading } = useQuery({
    queryKey: ["reports", "admin"],
    queryFn: () => fetchReports({ data: undefined }),
    enabled: !!session,
  });

  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<ReportItem | null>(null);
  const [deleting, setDeleting] = useState<ReportItem | null>(null);
  const svcDelete = useServerFn(deleteReport);
  const loadAnalytics = useServerFn(getAnalyticsSettings);
  const saveAnalytics = useServerFn(saveAnalyticsSettings);
  const [analyticsId, setAnalyticsId] = useState("");
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [analyticsStatus, setAnalyticsStatus] = useState<string | null>(null);
  const [analyticsBusy, setAnalyticsBusy] = useState(false);

  useEffect(() => {
    void loadAnalytics({ data: undefined }).then((settings) => {
      setAnalyticsId(settings.measurementId ?? "");
      setAnalyticsEnabled(settings.enabled);
    });
  }, [loadAnalytics]);

  async function handleDelete() {
    if (!deleting) return;
    await svcDelete({ data: { id: deleting.id } });
    await queryClient.invalidateQueries({ queryKey: ["reports"] });
    setDeleting(null);
  }

  async function handleAnalyticsSave(e: React.FormEvent) {
    e.preventDefault();
    setAnalyticsBusy(true);
    setAnalyticsStatus(null);
    try {
      const settings = await saveAnalytics({
        data: { enabled: analyticsEnabled, measurementId: analyticsId },
      });
      setAnalyticsId(settings.measurementId ?? "");
      setAnalyticsEnabled(settings.enabled);
      setAnalyticsStatus(t("admin.analyticsSaved"));
    } catch {
      setAnalyticsStatus(t("admin.analyticsError"));
    } finally {
      setAnalyticsBusy(false);
    }
  }

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 text-center text-muted-foreground lg:px-8">
        {t("common.loading")}
      </section>
    );
  }

  if (!session) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <h2 className="mb-4 text-xl font-bold text-primary">{t("auth.manageTitle")}</h2>
        <SignInCard
          onSignIn={(user) => signIn({ email: user.email, display_name: user.display_name })}
        />
      </section>
    );
  }

  const showForm = adding || editing;
  const publishedCount = reports.filter((report) => report.is_published).length;
  const draftCount = reports.length - publishedCount;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-primary">{t("auth.manageTitle")}</h2>
        <button
          type="button"
          onClick={signOut}
          className="focus-ring inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary"
        >
          <LogOut className="h-4 w-4" />
          {t("auth.logout")}
        </button>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4 shadow-soft">
          <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <FileText className="h-4 w-4 text-accent" />
            {t("admin.totalReports")}
          </div>
          <p className="mt-2 text-2xl font-bold text-primary">{reports.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-soft">
          <div className="text-sm font-semibold text-muted-foreground">
            {t("reports.published")}
          </div>
          <p className="mt-2 text-2xl font-bold text-success">{publishedCount}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-soft">
          <div className="text-sm font-semibold text-muted-foreground">{t("reports.draft")}</div>
          <p className="mt-2 text-2xl font-bold text-amber-700 dark:text-amber-300">{draftCount}</p>
        </div>
      </div>

      <DataPointPanel />

      <form
        onSubmit={handleAnalyticsSave}
        className="mb-8 rounded-2xl border border-border bg-card p-6 shadow-soft"
      >
        <div className="flex items-center gap-2 text-lg font-bold text-primary">
          <BarChart3 className="h-5 w-5 text-accent" />
          {t("admin.analyticsTitle")}
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{t("admin.analyticsDesc")}</p>
        <div className="mt-5 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <label className="grid gap-1.5 text-sm font-medium">
            <span>{t("admin.analyticsMeasurementId")}</span>
            <input
              value={analyticsId}
              onChange={(e) => setAnalyticsId(e.target.value)}
              placeholder="G-XXXXXXXXXX"
              className="focus-ring rounded-lg border border-input bg-background px-3 py-2 font-mono text-sm"
              dir="ltr"
            />
          </label>
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={analyticsEnabled}
              onChange={(e) => setAnalyticsEnabled(e.target.checked)}
              className="h-4 w-4 accent-accent"
            />
            {t("admin.analyticsEnabled")}
          </label>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <button
            type="submit"
            disabled={analyticsBusy}
            className="focus-ring inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            {analyticsBusy ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {t("common.save")}
          </button>
          {analyticsStatus && (
            <span className="text-sm text-muted-foreground">{analyticsStatus}</span>
          )}
        </div>
      </form>

      {showForm && (
        <div className="mb-6 rounded-2xl border border-accent/40 bg-surface p-5">
          <h3 className="mb-4 text-lg font-bold text-primary">
            {editing ? t("common.edit") : t("reports.add")}
          </h3>
          <ReportForm
            key={editing?.id ?? "new"}
            initial={editing}
            onCancel={() => {
              setAdding(false);
              setEditing(null);
            }}
          />
        </div>
      )}

      {!showForm && (
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="focus-ring mb-6 inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
        >
          <Plus className="h-4 w-4" />
          {t("reports.add")}
        </button>
      )}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {reportsLoading ? (
          <div className="rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground">
            {t("common.loading")}
          </div>
        ) : (
          reports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              onEdit={(r) => {
                setAdding(false);
                setEditing(r);
              }}
              onDelete={setDeleting}
            />
          ))
        )}
      </div>

      <AlertDialog
        open={!!deleting}
        onOpenChange={(open) => {
          if (!open) setDeleting(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("common.delete")}</AlertDialogTitle>
            <AlertDialogDescription>
              {deleting?.title_ar || deleting?.title_en || ""}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              <Trash2 className="h-4 w-4" />
              {t("common.delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
