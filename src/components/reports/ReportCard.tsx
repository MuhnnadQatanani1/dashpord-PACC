import {
  CalendarDays,
  FileText,
  HardDrive,
  Pencil,
  Trash2,
  Eye,
  Download,
  Paperclip,
} from "lucide-react";
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

function formatDate(dateStr: string, locale: "ar" | "en"): string {
  try {
    return new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(`${dateStr}T00:00:00`));
  } catch {
    return dateStr;
  }
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
      </div>

      <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
        {report.file_url ? (
          <>
            <a
              href={report.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Eye className="h-3.5 w-3.5" />
              {t("reports.view")}
            </a>
            <a
              href={report.file_url}
              download={report.original_filename || undefined}
              className="focus-ring inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              <Download className="h-3.5 w-3.5" />
              {t("common.download")}
            </a>
          </>
        ) : (
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg border border-dashed border-border px-3 py-2 text-xs text-muted-foreground",
            )}
          >
            <Paperclip className="h-3.5 w-3.5" />
            {t("reports.comingSoon")}
          </span>
        )}
      </div>
    </article>
  );
}
