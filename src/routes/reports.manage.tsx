import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { Plus, LogOut, Trash2, Loader2, BarChart3, Save } from "lucide-react";
import { getLocale, useLocale, dictionaries } from "@/i18n";
import { useAuth } from "@/lib/use-auth";
import { adminLogin } from "@/lib/auth.functions";
import { getAnalyticsSettings, saveAnalyticsSettings } from "@/lib/analytics.functions";
import { getReports, deleteReport, type ReportItem } from "@/lib/reports.functions";
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
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ["reports", "all"],
      queryFn: () => getReports({ data: {} }),
    });
  },
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

function SignInCard({ onSignIn }: { onSignIn: (name: string | null) => void }) {
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
        onSignIn(user.display_name);
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

function ManageReports() {
  const { t } = useLocale();
  const { session, loading, signIn, signOut } = useAuth();
  const queryClient = useQueryClient();
  const fetchReports = useServerFn(getReports);
  const { data: reports } = useSuspenseQuery({
    queryKey: ["reports", "all"],
    queryFn: () => fetchReports({ data: {} }),
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
        <SignInCard onSignIn={(name) => signIn({ email: "admin", display_name: name })} />
      </section>
    );
  }

  const showForm = adding || editing;

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
        {reports.map((report) => (
          <ReportCard
            key={report.id}
            report={report}
            onEdit={(r) => {
              setAdding(false);
              setEditing(r);
            }}
            onDelete={setDeleting}
          />
        ))}
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
