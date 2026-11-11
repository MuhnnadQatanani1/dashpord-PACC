import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Building2 } from "lucide-react";
import { PalestineMap } from "./PalestineMap";
import { GovernorateYearFilter } from "./GovernorateYearFilter";
import { dataSource } from "@/lib/mock-data";
import { useLocale } from "@/i18n";
import { ALL_STAT_YEARS, statsForYears } from "@/data/governorate-stats";

export function ComplaintsByGovernorate() {
  const { t, d, pick } = useLocale();
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [selectedYears, setSelectedYears] = useState<ReadonlySet<number>>(ALL_STAT_YEARS);
  const governorates = useMemo(
    () => dataSource.getGovernorates().filter((g) => g.label !== "قطاع غزة"),
    [],
  );
  const filteredMap = useMemo(() => {
    const all = statsForYears(selectedYears);
    return Object.fromEntries(governorates.map((g) => [g.name, all[g.name]]));
  }, [selectedYears, governorates]);
  const selected = selectedName ? filteredMap[selectedName] : undefined;
  const total = Object.values(filteredMap).reduce((sum, stat) => sum + stat.complaints, 0);

  return (
    <section
      id="complaints-by-governorate"
      className="bg-surface py-20"
      aria-labelledby="geo-title"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-sm font-semibold text-accent">{t("home.geoEyebrow")}</p>
          <h2 id="geo-title" className="text-3xl font-bold text-primary md:text-4xl">
            {t("map.governoratesTitle")}
          </h2>
          <p className="mt-3 text-sm leading-8 text-muted-foreground">{t("map.summaryDesc")}</p>
          <p className="mt-3 text-sm leading-8 text-muted-foreground">
            {t("map.governoratesNote")}
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <GovernorateYearFilter selected={selectedYears} onChange={setSelectedYears} />
            <div className="relative mt-4 h-[560px] w-full overflow-hidden rounded-xl border border-border bg-white">
              <PalestineMap
                stats={filteredMap}
                selectedAr={selectedName}
                onGovernorateClick={(name) => setSelectedName(name)}
              />
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
          <div className="space-y-5 lg:col-span-5">
            <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
              <p className="text-sm text-muted-foreground">
                {pick(
                  "الشكاوى والبلاغات في محافظات الضفة الغربية",
                  "Complaints and reports in West Bank governorates",
                )}
              </p>
              <p className="mt-3 text-3xl font-bold text-primary">
                {total.toLocaleString("en-US")}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {pick("11 محافظة · السنوات المختارة", "11 governorates · selected years")}
              </p>
            </div>
            <div
              className="rounded-xl border border-border bg-card p-6 shadow-soft"
              aria-live="polite"
            >
              <h3 className="mb-3 flex items-center gap-2 font-bold text-primary">
                <Building2 className="h-4 w-4 text-accent" />
                {t("home.geoDetailsTitle")}
              </h3>
              {selectedName ? (
                <>
                  <p className="text-lg font-bold text-primary">{d(selectedName)}</p>
                  <p className="mt-3 text-2xl font-bold text-accent">
                    {selected ? selected.complaints.toLocaleString("en-US") : "—"}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {selected
                      ? t("map.complaintsUnit")
                      : pick("غير مشمول بالبيانات", "Outside data coverage")}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedName(null)}
                    className="focus-ring mt-4 text-sm font-semibold text-accent underline underline-offset-4"
                  >
                    {t("home.geoClear")}
                  </button>
                </>
              ) : (
                <p className="text-sm leading-8 text-muted-foreground">{t("home.geoSelectHint")}</p>
              )}
            </div>
            <p className="text-xs leading-7 text-muted-foreground">
              {pick(
                "المصدر: بيانات التوزيع الجغرافي الموجودة في البوابة (2022–2025)، والمصنفة سابقاً كأرقام توضيحية. الإجمالي يقتصر على الضفة الغربية ولا يمثل الإجمالي الوطني.",
                "Source: the portal’s existing geographic dataset (2022–2025), previously classified as illustrative. The total covers the West Bank only and is not a national total.",
              )}
            </p>
            <Link
              to="/map"
              className="focus-ring inline-flex items-center gap-2 rounded-lg bg-navy px-5 py-3 text-sm font-bold text-white hover:bg-navy-dark"
            >
              {t("home.geoOpenPage")}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
