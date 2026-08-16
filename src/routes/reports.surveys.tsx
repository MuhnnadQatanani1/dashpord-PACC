import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { getLocale, useLocale, dictionaries } from "@/i18n";
import { getReports } from "@/lib/reports.functions";
import { ReportList } from "@/components/reports/ReportList";

const CATEGORIES = ["surveys"] as const;

export const Route = createFileRoute("/reports/surveys")({
  component: SurveysReport,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ["reports", CATEGORIES.join(",")],
      queryFn: () => getReports({ data: { categories: [...CATEGORIES] } }),
    });
  },
  head: () => {
    const dict = dictionaries[getLocale()];
    return {
      meta: [
        { title: dict["meta.surveysTitle"] },
        { name: "description", content: dict["meta.surveysDesc"] },
      ],
    };
  },
});

function SurveysReport() {
  const { t } = useLocale();
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-accent" />
          <h2 className="text-xl font-bold text-primary">{t("reports.surveys")}</h2>
        </div>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">{t("reports.descSurveys")}</p>
      </div>
      <ReportList categories={[...CATEGORIES]} />
    </section>
  );
}
