import { createFileRoute } from "@tanstack/react-router";
import { Microscope } from "lucide-react";
import { getLocale, useLocale, dictionaries } from "@/i18n";
import { getReports } from "@/lib/reports.functions";
import { ReportList } from "@/components/reports/ReportList";

const CATEGORIES = ["specialized"] as const;

export const Route = createFileRoute("/reports/specialized")({
  component: SpecializedReport,
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
        { title: dict["meta.specializedTitle"] },
        { name: "description", content: dict["meta.specializedDesc"] },
      ],
    };
  },
});

function SpecializedReport() {
  const { t } = useLocale();
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <div className="flex items-center gap-2">
          <Microscope className="h-5 w-5 text-accent" />
          <h2 className="text-xl font-bold text-primary">{t("reports.specialized")}</h2>
        </div>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          {t("reports.descSpecialized")}
        </p>
      </div>
      <ReportList categories={[...CATEGORIES]} />
    </section>
  );
}
