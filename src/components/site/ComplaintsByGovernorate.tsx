import { useCallback, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Building2, MapPin } from "lucide-react";
import { PalestineMap } from "./PalestineMap";
import { dataSource } from "@/lib/mock-data";
import { useLocale } from "@/i18n";
import {
  computeGovernorateStatistics,
  findGovernorateByName,
  formatCount,
  formatPercent,
} from "@/lib/governorate-map-data";

export function ComplaintsByGovernorate() {
  const { t, d, locale, dir } = useLocale();
  const [selectedName, setSelectedName] = useState<string | null>(null);

  const governorates = useMemo(
    () => dataSource.getGovernorates(),
    [],
  );
  const stats = useMemo(() => computeGovernorateStatistics(governorates), [governorates]);
  const selected = useMemo(() => findGovernorateByName(stats, selectedName), [stats, selectedName]);
  const maxCount = stats[0]?.complaints ?? 1;

  const handleGovernorateClick = useCallback((nameAr: string) => {
    setSelectedName(nameAr);
  }, []);
  const clearSelection = useCallback(() => setSelectedName(null), []);

  const unit = t("map.complaintsUnit");
  const num = (v: number) => formatCount(v, locale);

  return (
    <section
      id="complaints-by-governorate"
      className="bg-surface py-20"
      aria-labelledby="geo-title"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {t("home.geoEyebrow")}
          </div>
          <h2 id="geo-title" className="text-3xl font-bold text-primary md:text-4xl">
            {t("home.geoTitle")}
          </h2>
          <p className="mt-3 leading-8 text-muted-foreground">{t("home.geoDesc")}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Map */}
          <div className="lg:col-span-7">
            <div className="relative h-[460px] w-full overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
              <PalestineMap onGovernorateClick={handleGovernorateClick} />
            </div>
            <div className="mt-3 flex items-center justify-center gap-3 text-xs text-muted-foreground">
              <span>{t("home.geoLegendLow")}</span>
              <div
                className="h-2.5 w-28 rounded-full"
                role="img"
                aria-label={t("home.geoLegendLabel")}
                style={{
                  background: "linear-gradient(to right, #bbf7d0, #064e3b)",
                }}
              />
              <span>{t("home.geoLegendHigh")}</span>
            </div>
          </div>

          {/* Details + CTA */}
          <div className="space-y-4 lg:col-span-5">
            <div
              className="rounded-xl border border-border bg-card p-5 shadow-soft"
              aria-live="polite"
            >
              <div className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
                <Building2 className="h-4 w-4 text-accent" />
                {t("home.geoDetailsTitle")}
              </div>
              {selected ? (
                <div>
                  <div className="text-lg font-extrabold text-primary">{d(selected.name)}</div>
                  <div className="text-xs text-muted-foreground">{d(selected.region)}</div>
                  <div className="mt-4 flex items-end justify-between gap-2">
                    <div>
                      <div className="text-3xl font-black text-foreground" dir={dir}>
                        {num(selected.complaints)}
                      </div>
                      <div className="text-xs text-muted-foreground">{unit}</div>
                    </div>
                    <div className="text-end">
                      <div className="text-base font-bold text-accent" dir={dir}>
                        {formatPercent(selected.share, locale)}
                      </div>
                      <div className="text-xs text-muted-foreground">{t("home.geoShare")}</div>
                    </div>
                  </div>
                  <div
                    className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary"
                    role="progressbar"
                    aria-valuenow={Math.round((selected.complaints / maxCount) * 100)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={t("home.geoShare")}
                  >
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-700"
                      style={{
                        width: `${Math.max(2, (selected.complaints / maxCount) * 100)}%`,
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={clearSelection}
                    className="mt-3 text-xs font-semibold text-accent hover:underline"
                  >
                    {t("home.geoClear")}
                  </button>
                </div>
              ) : (
                <p className="text-sm leading-6 text-muted-foreground">{t("home.geoSelectHint")}</p>
              )}
            </div>

            <Link
              to="/map"
              className="group flex w-full items-center justify-between gap-3 rounded-xl gradient-accent px-6 py-5 text-accent-foreground shadow-soft transition-transform hover:-translate-y-0.5 hover:opacity-95"
            >
              <span className="inline-flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 backdrop-blur">
                  <MapPin className="h-5 w-5" />
                </span>
                <span className="text-start">
                  <span className="block text-base font-extrabold">{t("home.geoOpenPage")}</span>
                  <span className="block text-xs font-medium opacity-80">
                    {t("home.geoOpenPageHint")}
                  </span>
                </span>
              </span>
              <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
