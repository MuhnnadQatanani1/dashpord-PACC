import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { getLocale, useLocale, dictionaries } from "@/i18n";
import { getReports } from "@/lib/reports.functions";
import { ReportList } from "@/components/reports/ReportList";

const CATEGORIES = ["annual", "quarterly"] as const;

export const Route = createFileRoute("/reports/annual")({
  component: AnnualReport,
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
        { title: dict["meta.annualTitle"] },
        { name: "description", content: dict["meta.annualDesc"] },
      ],
    };
  },
});

function AnnualReport() {
  const { t } = useLocale();
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-accent" />
          <h2 className="text-xl font-bold text-primary">{t("reports.annual")}</h2>
        </div>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">{t("reports.descAnnual")}</p>
      </div>
      <ReportList categories={[...CATEGORIES]} />
    </section>
  );
}
