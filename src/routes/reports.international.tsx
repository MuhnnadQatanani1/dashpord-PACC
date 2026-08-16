import { createFileRoute } from "@tanstack/react-router";
import { Globe2 } from "lucide-react";
import { getLocale, useLocale, dictionaries } from "@/i18n";
import { getReports } from "@/lib/reports.functions";
import { ReportList } from "@/components/reports/ReportList";

const CATEGORIES = ["international"] as const;

export const Route = createFileRoute("/reports/international")({
  component: InternationalReport,
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
        { title: dict["meta.internationalTitle"] },
        { name: "description", content: dict["meta.internationalDesc"] },
      ],
    };
  },
});

function InternationalReport() {
  const { t } = useLocale();
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <div className="flex items-center gap-2">
          <Globe2 className="h-5 w-5 text-accent" />
          <h2 className="text-xl font-bold text-primary">{t("reports.international")}</h2>
        </div>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          {t("reports.descInternational")}
        </p>
      </div>
      <ReportList categories={[...CATEGORIES]} />
    </section>
  );
}
