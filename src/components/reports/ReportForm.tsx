import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, AlertCircle, Loader2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLocale } from "@/i18n";
import type { Dict } from "@/i18n/ar";
import { REPORT_CATEGORIES, type ReportCategory, type ReportItem } from "@/lib/reports.functions";
import { cn } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

function uuid(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2) + Date.now().toString(36);
}

const CAT_OPTION: Record<ReportCategory, keyof Dict> = {
  annual: "reports.annual",
  quarterly: "reports.catQuarterly",
  specialized: "reports.specialized",
  surveys: "reports.surveys",
  international: "reports.international",
};

export function ReportForm({
  initial,
  onCancel,
}: {
  initial?: ReportItem | null;
  onCancel?: () => void;
}) {
  const { t } = useLocale();
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const schema = z.object({
    title_ar: z.string().min(1, t("form.titleRequired")),
    title_en: z.string(),
    description_ar: z.string(),
    description_en: z.string(),
    category: z.enum(REPORT_CATEGORIES),
    publish_date: z.string().min(1, t("form.dateRequired")),
    pages: z.coerce.number().int().min(0),
    size_mb: z.coerce.number().min(0),
  });

  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title_ar: initial?.title_ar ?? "",
      title_en: initial?.title_en ?? "",
      description_ar: initial?.description_ar ?? "",
      description_en: initial?.description_en ?? "",
      category: initial?.category ?? "annual",
      publish_date: initial?.publish_date ?? new Date().toISOString().slice(0, 10),
      pages: initial?.pages ?? 0,
      size_mb: initial?.size_mb ?? 0,
    },
  });

  async function onSubmit(values: FormValues) {
    setBusy(true);
    setMessage(null);
    try {
      let file_url = initial?.file_url ?? null;
      let original_filename = initial?.original_filename ?? null;

      if (file) {
        const path = `reports/${uuid()}-${file.name}`;
        const { error: upErr } = await supabase.storage.from("reports").upload(path, file, {
          upsert: true,
        });
        if (upErr) throw upErr;
        const { data: pub } = supabase.storage.from("reports").getPublicUrl(path);
        file_url = pub.publicUrl;
        original_filename = file.name;
      }

      const payload = {
        title_ar: values.title_ar,
        title_en: values.title_en,
        description_ar: values.description_ar,
        description_en: values.description_en,
        category: values.category,
        publish_date: values.publish_date,
        pages: values.pages,
        size_mb: values.size_mb,
        file_url,
        original_filename,
      };

      const { error } = initial
        ? await supabase.from("reports").update(payload).eq("id", initial.id)
        : await supabase.from("reports").insert(payload);
      if (error) throw error;

      setMessage({ type: "success", text: t("form.saved") });
      await queryClient.invalidateQueries({ queryKey: ["reports"] });
      setFile(null);
      if (onCancel) onCancel();
    } catch (e) {
      console.error("Failed to save report:", e);
      setMessage({ type: "error", text: t("form.saveError") });
    } finally {
      setBusy(false);
    }
  }

  const inputCls =
    "focus-ring w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title_ar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.titleAr")}</FormLabel>
                <FormControl>
                  <input {...field} className={inputCls} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title_en"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.titleEn")}</FormLabel>
                <FormControl>
                  <input {...field} className={inputCls} dir="ltr" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description_ar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.descAr")}</FormLabel>
              <FormControl>
                <textarea {...field} rows={3} className={cn(inputCls, "resize-y")} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description_en"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.descEn")}</FormLabel>
              <FormControl>
                <textarea {...field} rows={3} className={cn(inputCls, "resize-y")} dir="ltr" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.category")}</FormLabel>
                <FormControl>
                  <select {...field} className={inputCls}>
                    {REPORT_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {t(CAT_OPTION[c])}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="publish_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.date")}</FormLabel>
                <FormControl>
                  <input type="date" {...field} className={inputCls} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="pages"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.pages")}</FormLabel>
                <FormControl>
                  <input type="number" min={0} {...field} className={inputCls} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="size_mb"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.sizeMb")}</FormLabel>
                <FormControl>
                  <input type="number" min={0} step="0.1" {...field} className={inputCls} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormItem>
          <FormLabel>{t("form.file")}</FormLabel>
          <FormControl>
            <div className="flex flex-col gap-2">
              <label className="focus-ring inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-input bg-surface px-3 py-3 text-sm text-muted-foreground hover:bg-secondary">
                <Upload className="h-4 w-4" />
                {file ? file.name : initial?.original_filename || t("form.file")}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.csv"
                  className="sr-only"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
              </label>
              {initial?.file_url && !file && (
                <p className="text-xs text-muted-foreground">{t("form.fileNote")}</p>
              )}
            </div>
          </FormControl>
        </FormItem>

        {message && (
          <p
            role="status"
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm",
              message.type === "success"
                ? "border border-success/30 bg-success/10 text-success"
                : "border border-destructive/30 bg-destructive/10 text-destructive",
            )}
          >
            {message.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0" />
            )}
            {message.text}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="submit"
            disabled={busy}
            className="focus-ring inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            {initial ? t("common.update") : t("common.add")}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="focus-ring rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary"
            >
              {t("common.cancel")}
            </button>
          )}
        </div>
      </form>
    </Form>
  );
}
