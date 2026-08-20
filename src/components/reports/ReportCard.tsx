import {
  CalendarDays,
  FileText,
  HardDrive,
  Pencil,
  Trash2,
  Eye,
  Paperclip,
  User,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLocale } from "@/i18n";
import type { Dict } from "@/i18n/ar";
import type { ReportCategory, ReportItem } from "@/lib/reports.functions";
import { cn } from "@/lib/utils";

const CAT_LABEL: Record<ReportCategory, keyof Dict> = {
  annual: "reports.annual",
  quarterly: "reports.catQuarterly",
  specialized: "reports.specialized",
  surveys: "reports.surveys",
  international: "reports.international",
};

function formatDate(dateStr: string | Date, locale: "ar" | "en"): string {
  try {
    const d = dateStr instanceof Date ? dateStr : new Date(`${dateStr}T00:00:00`);
    return new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(d);
  } catch {
    return String(dateStr);
  }
}

function toDateString(val: unknown): string {
  if (!val) return "";
  if (val instanceof Date) return val.toISOString().slice(0, 10);
  return String(val).slice(0, 10);
}

export function ReportCard({
  report,
  onEdit,
  onDelete,
}: {
  report: ReportItem;
  onEdit?: (r: ReportItem) => void;
  onDelete?: (r: ReportItem) => void;
}) {
  const { locale, t } = useLocale();
  const title =
    locale === "ar" && report.title_ar ? report.title_ar : report.title_en || report.title_ar;
  const description =
    locale === "ar" && report.description_ar
      ? report.description_ar
      : report.description_en || report.description_ar;

  return (
    <article className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-elevated">
      <div className="flex items-start justify-between gap-2">
        <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
          {t(CAT_LABEL[report.category])}
        </span>
        {(onEdit || onDelete) && (
          <div className="flex items-center gap-1">
            {onEdit && (
              <button
                type="button"
                onClick={() => onEdit(report)}
                aria-label={t("common.edit")}
                className="focus-ring rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-primary"
              >
                <Pencil className="h-4 w-4" />
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                onClick={() => onDelete(report)}
                aria-label={t("common.delete")}
                className="focus-ring rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>

      <h3 className="mt-3 text-lg font-bold leading-7 text-primary">{title}</h3>
      {description && (
        <p className="mt-2 flex-1 text-sm leading-7 text-muted-foreground">{description}</p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <CalendarDays className="h-3.5 w-3.5" />
          {formatDate(report.publish_date, locale)}
        </span>
        <span className="inline-flex items-center gap-1">
          <FileText className="h-3.5 w-3.5" />
          {report.pages} {t("reports.pages")}
        </span>
        <span className="inline-flex items-center gap-1">
          <HardDrive className="h-3.5 w-3.5" />
          {report.size_mb} MB
        </span>
        {report.added_by && (
          <span className="inline-flex items-center gap-1">
            <User className="h-3.5 w-3.5" />
            {report.added_by}
          </span>
        )}
      </div>
      {report.created_at && (
        <p className="mt-1 text-xs text-muted-foreground/60">
          {t("reports.addedAt")}: {formatDate(toDateString(report.created_at), locale)}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
        <Link
          to="/reports/$reportId"
          params={{ reportId: String(report.id) }}
          className="focus-ring inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Eye className="h-3.5 w-3.5" />
          {t("reports.view")}
        </Link>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-lg border border-dashed border-border px-3 py-2 text-xs text-muted-foreground",
          )}
        >
          <Paperclip className="h-3.5 w-3.5" />
          {report.file_url ? t("reports.uploadedFile") : t("reports.noFile")}
        </span>
      </div>
    </article>
  );
}
