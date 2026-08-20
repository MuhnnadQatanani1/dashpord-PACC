import { useState, useEffect, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Download,
  FileText,
  CalendarDays,
  BookOpen,
  HardDrive,
  User,
  Eye,
  ExternalLink,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useLocale } from "@/i18n";
import { getReportById, getReportFile } from "@/lib/reports.functions";
import type { Dict } from "@/i18n/ar";
import type { ReportCategory } from "@/lib/reports.functions";

export const Route = createFileRoute("/reports/$reportId")({
  component: ReportViewer,
});

const CAT_LABEL: Record<ReportCategory, keyof Dict> = {
  annual: "reports.annual",
  quarterly: "reports.catQuarterly",
  specialized: "reports.specialized",
  surveys: "reports.surveys",
  international: "reports.international",
};

function formatDate(dateStr: string, locale: "ar" | "en"): string {
  try {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(d);
  } catch {
    return dateStr;
  }
}

function getMimeLabel(mime: string | null, locale: "ar" | "en"): string {
  if (!mime) return "—";
  const labels: Record<string, { ar: string; en: string }> = {
    "application/pdf": { ar: "PDF", en: "PDF" },
    "application/msword": { ar: "مستند Word", en: "Word Document" },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      ar: "مستند Word",
      en: "Word Document",
    },
    "application/vnd.ms-excel": { ar: "جدول بيانات Excel", en: "Excel Spreadsheet" },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
      ar: "جدول بيانات Excel",
      en: "Excel Spreadsheet",
    },
    "text/csv": { ar: "ملف CSV", en: "CSV File" },
    "image/png": { ar: "صورة PNG", en: "PNG Image" },
    "image/jpeg": { ar: "صورة JPEG", en: "JPEG Image" },
  };
  const entry = labels[mime];
  if (entry) return entry[locale === "ar" ? "ar" : "en"];
  return mime.split("/").pop()?.toUpperCase() ?? mime;
}

function isPreviewable(mime: string | null): boolean {
  if (!mime) return false;
  return (
    mime === "application/pdf" ||
    mime.startsWith("image/")
  );
}

function ReportViewer() {
  const { reportId } = Route.useParams();
  const { t, locale } = useLocale();

  const [report, setReport] = useState<Record<string, unknown> | null>(null);
  const [fileInfo, setFileInfo] = useState<{
    data_b64: string;
    mime: string;
    filename: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const r = await getReportById({ data: { id: reportId } });
        if (cancelled) return;
        if (!r) {
          setError(true);
          return;
        }
        setReport(r as Record<string, unknown>);
        const f = await getReportFile({ data: { id: reportId } });
        if (cancelled) return;
        if (f) setFileInfo(f as { data_b64: string; mime: string; filename: string });
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [reportId]);

  const blobUrl = useMemo(() => {
    if (!fileInfo) return null;
    const binary = atob(fileInfo.data_b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const blob = new Blob([bytes], { type: fileInfo.mime });
    return URL.createObjectURL(blob);
  }, [fileInfo]);

  useEffect(() => {
    return () => { if (blobUrl) URL.revokeObjectURL(blobUrl); };
  }, [blobUrl]);

  if (loading) {
    return (
      <SiteLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </SiteLayout>
    );
  }

  if (error || !report) {
    return (
      <SiteLayout>
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <h2 className="text-xl font-bold text-foreground">{t("common.error")}</h2>
          <Link
            to="/reports/annual"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            <ArrowRight className="h-4 w-4" />
            {t("viewer.backToList")}
          </Link>
        </div>
      </SiteLayout>
    );
  }

  const title = locale === "ar" && report.title_ar ? report.title_ar : report.title_en || report.title_ar;
  const description = locale === "ar" && report.description_ar ? report.description_ar : report.description_en || report.description_ar;
  const category = report.category as ReportCategory;
  const hasFile = !!fileInfo;

  function handleDownload() {
    if (!blobUrl || !fileInfo) return;
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = fileInfo.filename;
    a.click();
  }

  function handleOpenInNewTab() {
    if (!blobUrl) return;
    window.open(blobUrl, "_blank");
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
        {/* Breadcrumb + Back */}
        <div className="mb-8">
          <Link
            to="/reports/annual"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowRight className="h-4 w-4" />
            {t("viewer.backToList")}
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* Title Card */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
                {t(CAT_LABEL[category])}
              </span>
              <h1 className="mt-4 text-2xl font-bold leading-8 text-primary md:text-3xl">
                {title}
              </h1>
              {description && (
                <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">
                  {description}
                </p>
              )}
            </div>

            {/* File Preview */}
            <div className="mt-6 rounded-2xl border border-border bg-card shadow-soft">
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <h2 className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <Eye className="h-4 w-4 text-primary" />
                  {t("viewer.preview")}
                </h2>
                {hasFile && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleOpenInNewTab}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      {t("viewer.openInNewTab")}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      <Download className="h-3.5 w-3.5" />
                      {t("viewer.downloadBtn")}
                    </button>
                  </div>
                )}
              </div>

              <div className="p-6">
                {hasFile && blobUrl ? (
                  isPreviewable(fileInfo.mime) ? (
                    fileInfo.mime === "application/pdf" ? (
                      <iframe
                        src={blobUrl}
                        className="h-[70vh] w-full rounded-lg border border-border"
                        title={t("viewer.pdfViewer")}
                      />
                    ) : (
                      <img
                        src={blobUrl}
                        alt={title}
                        className="mx-auto max-h-[70vh] rounded-lg object-contain"
                      />
                    )
                  ) : (
                    <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-border bg-surface/50 py-16 text-center">
                      <FileText className="h-16 w-16 text-muted-foreground/40" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {t("viewer.previewNotAvailable")}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {getMimeLabel(fileInfo.mime, locale)}
                        </p>
                      </div>
                      <button
                        onClick={handleDownload}
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                      >
                        <Download className="h-4 w-4" />
                        {t("viewer.downloadBtn")}
                      </button>
                    </div>
                  )
                ) : (
                  <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-border bg-surface/50 py-16 text-center">
                    <FileText className="h-16 w-16 text-muted-foreground/40" />
                    <p className="text-sm text-muted-foreground">{t("viewer.noFile")}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
                <FileText className="h-4 w-4 text-primary" />
                {t("viewer.reportDetails")}
              </h3>

              <div className="mt-5 space-y-4">
                {/* Published Date */}
                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">{t("viewer.publishedDate")}</p>
                    <p className="text-sm font-medium text-foreground">
                      {formatDate(report.publish_date as string, locale)}
                    </p>
                  </div>
                </div>

                {/* Pages */}
                {report.pages != null && (report.pages as number) > 0 && (
                  <div className="flex items-start gap-3">
                    <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">{t("viewer.pages")}</p>
                      <p className="text-sm font-medium text-foreground">{report.pages} {t("reports.pages")}</p>
                    </div>
                  </div>
                )}

                {/* Size */}
                {report.size_mb != null && (report.size_mb as number) > 0 && (
                  <div className="flex items-start gap-3">
                    <HardDrive className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">{t("viewer.size")}</p>
                      <p className="text-sm font-medium text-foreground">{report.size_mb} MB</p>
                    </div>
                  </div>
                )}

                {/* Added By */}
                {report.added_by && (
                  <div className="flex items-start gap-3">
                    <User className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">{t("viewer.addedBy")}</p>
                      <p className="text-sm font-medium text-foreground">{report.added_by as string}</p>
                    </div>
                  </div>
                )}

                {/* File Type */}
                {hasFile && (
                  <div className="flex items-start gap-3">
                    <FileText className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">{t("viewer.fileType")}</p>
                      <p className="text-sm font-medium text-foreground">
                        {getMimeLabel(fileInfo.mime, locale)}
                      </p>
                    </div>
                  </div>
                )}

                {/* Added At */}
                {report.created_at && (
                  <div className="border-t border-border pt-4">
                    <p className="text-xs text-muted-foreground">{t("reports.addedAt")}</p>
                    <p className="text-sm font-medium text-foreground">
                      {formatDate(report.created_at as string, locale)}
                    </p>
                  </div>
                )}
              </div>

              {/* Download Button */}
              {hasFile && (
                <div className="mt-6 border-t border-border pt-5">
                  <button
                    onClick={handleDownload}
                    className="focus-ring flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    <Download className="h-4 w-4" />
                    {t("viewer.downloadBtn")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
