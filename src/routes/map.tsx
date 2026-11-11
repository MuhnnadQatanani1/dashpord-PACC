import { useState } from "react";
import { ALL_STAT_YEARS, statsForYears } from "@/data/governorate-stats";
import { GovernorateYearFilter } from "@/components/site/GovernorateYearFilter";
import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { PalestineMap } from "@/components/site/PalestineMap";
import { getLocale, useLocale, dictionaries } from "@/i18n";
import { palestineMapPaths } from "@/data/palestine-svg-paths";
import { Building2, MapPinned } from "lucide-react";

export const Route = createFileRoute("/map")({
  component: MapPage,
  head: () => {
    const dict = dictionaries[getLocale()];
    return {
      meta: [
        { title: dict["meta.mapTitle"] },
        { name: "description", content: dict["meta.mapDesc"] },
        { property: "og:title", content: dict["meta.mapTitle"] },
        { property: "og:description", content: dict["meta.mapOgDesc"] },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
});

function MapPage() {
  const { t, pick } = useLocale();
  const governorates = palestineMapPaths.filter(
    (area) => area.enabled && !/^PS-(NGZ|GZA|DEB|KYS|RFH)$/.test(area.id),
  );

  const [selectedYears, setSelectedYears] = useState<ReadonlySet<number>>(ALL_STAT_YEARS);
  const allStats = statsForYears(selectedYears);
  const filteredMap = Object.fromEntries(governorates.map((g) => [g.nameAr, allStats[g.nameAr]]));
  const total = Object.values(filteredMap).reduce((sum, stat) => sum + (stat?.complaints ?? 0), 0);

  return (
    <SiteLayout>
      <PageHeader eyebrow={t("map.eyebrow")} title={t("map.title")} />

      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <p className="mb-6 rounded-xl border border-border bg-surface p-5 text-sm leading-8 text-muted-foreground">
          {t("map.governoratesNote")}
        </p>

        <div className="mb-6">
          <GovernorateYearFilter selected={selectedYears} onChange={setSelectedYears} />
        </div>
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="relative isolate h-[680px] w-full">
              <PalestineMap stats={filteredMap} />
            </div>
            <div className="mt-3 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <span aria-hidden="true" className="h-3 w-3 rounded-sm bg-[#54798b]" />
                {pick("محافظات الضفة الغربية", "West Bank governorates")}
              </span>
              <span className="inline-flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-3 w-3 rounded-sm border border-border bg-[#fbf8f1]"
                />
                {pick("قطاع غزة: غير مشمول بالبيانات", "Gaza Strip: outside data coverage")}
              </span>
            </div>
          </div>

          <aside className="lg:col-span-2">
            <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
                <MapPinned className="h-4 w-4 text-accent" />
                {t("map.summaryTitle")}
              </div>
              <p className="text-sm leading-7 text-muted-foreground">{t("map.summaryDesc")}</p>
              <div className="mt-6">
                <div className="rounded-lg bg-surface p-4">
                  <div className="text-xs text-muted-foreground">
                    {t("home.geoGovernorateCount")}
                  </div>
                  <div className="mt-1 text-2xl font-extrabold text-primary">
                    {governorates.length.toLocaleString("en-US")}
                  </div>
                </div>
                <div className="rounded-lg bg-surface p-4">
                  <div className="text-xs text-muted-foreground">
                    {pick(
                      "إجمالي الشكاوى والبلاغات في محافظات الضفة الغربية",
                      "Total complaints and reports in West Bank governorates",
                    )}
                  </div>
                  <div className="mt-1 text-2xl font-extrabold text-primary">
                    {total.toLocaleString("en-US")}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-10">
          <div className="mb-6 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-accent" />
            <h2 className="text-xl font-bold text-primary">{t("map.governoratesTitle")}</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {governorates.map((g) => (
              <div key={g.id} className="rounded-xl border border-border bg-card p-4 shadow-soft">
                <div className="text-xs text-muted-foreground">{pick("محافظة", "Governorate")}</div>
                <div className="mt-1 text-base font-bold text-foreground">
                  {pick(g.nameAr, g.nameEn)}
                </div>
                <div className="mt-2 text-2xl font-extrabold text-accent">
                  {filteredMap[g.nameAr]?.complaints?.toLocaleString("en-US") ?? "—"}
                </div>
                <div className="text-xs text-muted-foreground">{t("map.complaintsUnit")}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-8 text-muted-foreground">
            {pick(
              "مصدر البيانات: بيانات التوزيع الجغرافي الموجودة في البوابة للفترة 2022–2025، والمصنفة سابقاً كأرقام توضيحية؛ ليست مستخرجة من تقرير المرصد للفترة 2022–2025. يقتصر الإجمالي المعروض على محافظات الضفة الغربية والسنوات المختارة، ولا يمثل الإجمالي الوطني.",
              "Data source: the portal’s existing geographic dataset for 2022–2025, previously classified as illustrative figures; it is not extracted from the Observatory report for 2022–2025. The displayed total covers only West Bank governorates and selected years and is not a national total.",
            )}
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
