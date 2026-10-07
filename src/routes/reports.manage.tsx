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
  MessageSquare,
  Percent,
  RefreshCw,
  Star,
  Trophy,
} from "lucide-react";
import { getLocale, useLocale, dictionaries } from "@/i18n";
import { useAuth } from "@/lib/use-auth";
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
import { getAdminOpinionPoll } from "@/lib/opinion-poll.functions";
import { ReportCard } from "@/components/reports/ReportCard";
import { ReportForm } from "@/components/reports/ReportForm";
import { SignInCard } from "@/components/admin/SignInCard";
import { StoriesPanel } from "@/components/admin/StoriesPanel";

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

function OpinionPollPanel() {
  const { t, locale } = useLocale();
  const loadOpinionPoll = useServerFn(getAdminOpinionPoll);
  const { data, isError, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["admin-opinion-poll"],
    queryFn: () => loadOpinionPoll({ data: undefined }),
  });

  const numberLocale = locale === "ar" ? "ar-EG" : "en-US";
  const formatNumber = (value: number) => value.toLocaleString(numberLocale);
  const formatPercent = (value: number) =>
    `${value.toLocaleString(numberLocale, { maximumFractionDigits: 1 })}%`;
  const formatDate = (value: string | Date) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime())
      ? "-"
      : new Intl.DateTimeFormat(locale === "ar" ? "ar-PS" : "en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(date);
  };

  const stats = data
    ? [
        { label: t("admin.pollTotal"), value: formatNumber(data.total), icon: MessageSquare },
        {
          label: t("admin.pollAverage"),
          value: data.total ? `${data.averageRating.toFixed(1)} / 5` : "-",
          icon: Star,
        },
        {
          label: t("admin.pollHighestCount"),
          value: formatNumber(data.highestRatingCount),
          icon: Trophy,
        },
        {
          label: t("admin.pollHighestPercent"),
          value: formatPercent(data.highestRatingPercent),
          icon: Percent,
        },
      ]
    : [];

  return (
    <section className="mb-8" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3 border-b border-border pb-4">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-bold text-primary">
            <MessageSquare className="h-5 w-5 text-accent" />
            {t("admin.pollTitle")}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{t("admin.pollDesc")}</p>
        </div>
        <button
          type="button"
          onClick={() => void refetch()}
          disabled={isFetching}
          className="focus-ring inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary disabled:opacity-60"
        >
          <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
          {t("common.update")}
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center gap-2 py-8 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          {t("common.loading")}
        </div>
      ) : isError || !data ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          <span>{t("admin.pollLoadError")}</span>
          <button type="button" onClick={() => void refetch()} className="font-semibold underline">
            {t("common.retry")}
          </button>
        </div>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="rounded-xl border border-border bg-card p-4 shadow-soft">
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                  <Icon className="h-4 w-4 text-accent" />
                  {label}
                </div>
                <p className="mt-2 text-2xl font-bold text-primary">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.2fr)]">
            <div>
              <h4 className="mb-4 text-base font-bold text-heading">
                {t("admin.pollDistribution")}
              </h4>
              <div className="space-y-4">
                {data.distribution.map((item) => (
                  <div key={item.rating}>
                    <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                      <span className="font-medium text-foreground">
                        {t("admin.pollRating", { rating: item.rating })}
                      </span>
                      <span className="text-muted-foreground">
                        {formatNumber(item.count)} · {formatPercent(item.percent)}
                      </span>
                    </div>
                    <div
                      role="progressbar"
                      aria-label={t("admin.pollRating", { rating: item.rating })}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={item.percent}
                      className="h-2 overflow-hidden rounded-full bg-secondary"
                    >
                      <div
                        className="h-full rounded-full bg-accent transition-[width]"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="min-w-0">
              <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="text-base font-bold text-heading">{t("admin.pollResponses")}</h4>
                <span className="text-xs text-muted-foreground">
                  {t("admin.pollLatestCount", { count: formatNumber(data.responses.length) })}
                </span>
              </div>
              {data.responses.length === 0 ? (
                <p className="border-y border-border py-6 text-sm text-muted-foreground">
                  {t("admin.pollEmpty")}
                </p>
              ) : (
                <ul className="max-h-[560px] divide-y divide-border overflow-y-auto border-y border-border">
                  {data.responses.map((response) => (
                    <li key={response.id} className="py-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-primary">
                            {t("admin.pollRating", { rating: response.rating })}
                          </span>
                          <span
                            aria-hidden="true"
                            className="flex items-center text-gold"
                          >
                            {Array.from({ length: 5 }, (_, index) => (
                              <Star
                                key={index}
                                className={`h-3.5 w-3.5 ${index < response.rating ? "fill-current" : "text-muted-foreground/30"}`}
                              />
                            ))}
                          </span>
                        </div>
                        <time className="text-xs text-muted-foreground">
                          {formatDate(response.created_at)}
                        </time>
                      </div>
                      <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-foreground/85">
                        {response.feedback?.trim() || t("admin.pollNoFeedback")}
                      </p>
                      {response.page_path && (
                        <p className="mt-1 truncate text-xs text-muted-foreground" dir="ltr">
                          {response.page_path}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      )}
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
          <p className="mt-2 text-2xl font-bold text-gold-ink">{draftCount}</p>
        </div>
      </div>

      <OpinionPollPanel />

      <DataPointPanel />

      <StoriesPanel />

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
