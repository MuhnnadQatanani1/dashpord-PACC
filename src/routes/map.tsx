import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { PalestineMap } from "@/components/site/PalestineMap";
import { dataSource } from "@/lib/mock-data";
import { TOTAL_COMPLAINTS } from "@/lib/enforcement-kpis";
import { getLocale, useLocale, dictionaries } from "@/i18n";
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
      links: [
        {
          rel: "stylesheet",
          href: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
          integrity: "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=",
          crossOrigin: "",
        },
      ],
    };
  },
});

function MapPage() {
  const { t, d, locale } = useLocale();
  const governorates = dataSource.getGovernorates();

  return (
    <SiteLayout>
      <PageHeader eyebrow={t("map.eyebrow")} title={t("map.title")} description={t("map.desc")} />

      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3 rounded-xl border border-border bg-surface p-6">
            <div className="relative isolate h-[500px] w-full overflow-hidden rounded-lg">
              <PalestineMap onGovernorateClick={() => {}} />
            </div>
          </div>

          <aside className="lg:col-span-2">
            <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
                <MapPinned className="h-4 w-4 text-accent" />
                {t("map.summaryTitle")}
              </div>
              <p className="text-sm leading-7 text-muted-foreground">{t("map.summaryDesc")}</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-surface p-4">
                  <div className="text-xs text-muted-foreground">
                    {t("home.geoGovernorateCount")}
                  </div>
                  <div className="mt-1 text-2xl font-extrabold text-primary">
                    {governorates.length.toLocaleString(locale === "ar" ? "ar-EG" : "en-US")}
                  </div>
                </div>
                <div className="rounded-lg bg-surface p-4">
                  <div className="text-xs text-muted-foreground">
                    {t("home.geoTotalComplaints")}
                  </div>
                  <div className="mt-1 text-2xl font-extrabold text-primary">
                    {TOTAL_COMPLAINTS.toLocaleString(locale === "ar" ? "ar-EG" : "en-US")}
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
              <div key={g.name} className="rounded-xl border border-border bg-card p-4 shadow-soft">
                <div className="text-xs text-muted-foreground">{d(g.label)}</div>
                <div className="mt-1 text-base font-bold text-foreground">{d(g.name)}</div>
                <div className="mt-2 text-2xl font-extrabold text-accent">
                  {g.complaints.toLocaleString(locale === "ar" ? "ar-EG" : "en-US")}
                </div>
                <div className="text-xs text-muted-foreground">{t("map.complaintsUnit")}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">{t("map.governoratesNote")}</p>
        </div>
      </section>
    </SiteLayout>
  );
}
