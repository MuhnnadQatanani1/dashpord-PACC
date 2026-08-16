import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { Inbox, Trash2 } from "lucide-react";
import { useLocale } from "@/i18n";
import { useAuth } from "@/lib/use-auth";
import { getReports, type ReportCategory, type ReportItem } from "@/lib/reports.functions";
import { supabase } from "@/integrations/supabase/client";
import { ReportCard } from "./ReportCard";
import { ReportForm } from "./ReportForm";

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

function EmptyState({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
        <Inbox className="h-8 w-8 text-accent" />
      </div>
      <h3 className="mt-4 text-lg font-bold text-primary">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-7 text-muted-foreground">{desc}</p>
    </div>
  );
}

export function ReportList({ categories }: { categories: ReportCategory[] }) {
  const { t } = useLocale();
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const fetchReports = useServerFn(getReports);
  const [editing, setEditing] = useState<ReportItem | null>(null);
  const [deleting, setDeleting] = useState<ReportItem | null>(null);

  const { data: reports } = useSuspenseQuery({
    queryKey: ["reports", categories.join(",")],
    queryFn: () => fetchReports({ data: { categories } }),
  });

  async function handleDelete() {
    if (!deleting) return;
    const { error } = await supabase.from("reports").delete().eq("id", deleting.id);
    if (!error) {
      await queryClient.invalidateQueries({ queryKey: ["reports"] });
    }
    setDeleting(null);
  }

  const title = editing ? editing.title_ar || editing.title_en : "";

  return (
    <div className="grid gap-4">
      {session && editing && (
        <div className="rounded-2xl border border-accent/40 bg-surface p-5">
          <h3 className="mb-4 text-lg font-bold text-primary">
            {t("common.edit")}: {title}
          </h3>
          <ReportForm key={editing.id} initial={editing} onCancel={() => setEditing(null)} />
        </div>
      )}

      {reports.length === 0 ? (
        <EmptyState title={t("reports.emptyTitle")} desc={t("reports.emptyDesc")} />
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {reports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              onEdit={session ? (r) => setEditing(r) : undefined}
              onDelete={session ? (r) => setDeleting(r) : undefined}
            />
          ))}
        </div>
      )}

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
    </div>
  );
}
