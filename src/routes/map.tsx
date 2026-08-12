import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { PalestineMap } from "@/components/site/PalestineMap";
import { ChartCard } from "@/components/site/ChartCard";
import { ShareDonut, SectorsBar } from "@/components/site/Charts";
import { dataSource } from "@/lib/mock-data";
import { MapPin, AlertTriangle, Building2 } from "lucide-react";

export const Route = createFileRoute("/map")({
  component: MapPage,
  head: () => ({
    meta: [
      { title: "التحليل الجغرافي | المرصد الوطني لمؤشرات الفساد" },
      { name: "description", content: "خريطة فلسطين التاريخية وبيانات قطاع غزة الاستثنائية لعام 2024 كما وردت في تقارير الهيئة." },
      { property: "og:title", content: "التحليل الجغرافي | المرصد الوطني لمؤشرات الفساد" },
      { property: "og:description", content: "خريطة فلسطين التاريخية وبيانات قطاع غزة الاستثنائية لعام 2024." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css", integrity: "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=", crossOrigin: "" },
    ],
  }),
});

function MapPage() {
  const gaza = dataSource.getGaza2024();
  const governorates = dataSource.getGovernorates();

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="التحليل الجغرافي"
        title="خريطة فلسطين والبيانات الجغرافية المتاحة"
        description="بيانات توضيحية لتوزيع الشكاوى حسب المحافظات الفلسطينية، مع إبراز بيانات قطاع غزة الاستثنائية لعام 2024 (شيت 45)."
      />

      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3 rounded-xl border border-border bg-surface p-6">
            <div className="relative isolate h-[500px] w-full overflow-hidden rounded-lg">
              <PalestineMap />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              * خرائط OpenStreetMap مع حدود المحافظات الفلسطينية. قد لا تعكس الحدود الرسمية المعتمدة.
            </p>
          </div>

          <aside className="lg:col-span-2 space-y-4">
            <div className="rounded-xl gradient-hero p-6 text-white shadow-elevated">
              <div className="flex items-center gap-2 text-sm opacity-85">
                <MapPin className="h-4 w-4" /> بيانات استثنائية — قطاع غزة {gaza.year}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs opacity-75">شكاوى ضمن اختصاص الهيئة</div>
                  <div className="text-3xl font-bold">{gaza.inMandate.toLocaleString("ar-EG")}</div>
                </div>
                <div>
                  <div className="text-xs opacity-75">شكاوى خارج نطاق الاختصاص</div>
                  <div className="text-3xl font-bold">{gaza.outOfMandate.toLocaleString("ar-EG")}</div>
                </div>
              </div>
              <p className="mt-6 rounded-lg bg-white/10 p-3 text-xs leading-6 backdrop-blur">{gaza.note}</p>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
                <AlertTriangle className="h-4 w-4" /> أبرز القضايا المرصودة
              </div>
              <ul className="space-y-2">
                {gaza.issues.map((i) => (
                  <li key={i} className="flex gap-2 text-sm leading-7 text-muted-foreground">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <div className="mt-10">
          <div className="mb-6 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-accent" />
            <h2 className="text-xl font-bold text-primary">توزيع الشكاوى حسب المحافظات</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {governorates.map((g) => (
              <div key={g.name} className="rounded-xl border border-border bg-card p-4 shadow-soft">
                <div className="text-xs text-muted-foreground">{g.label}</div>
                <div className="mt-1 text-base font-bold text-foreground">{g.name}</div>
                <div className="mt-2 text-2xl font-extrabold text-accent">{g.complaints}</div>
                <div className="text-xs text-muted-foreground">شكوى</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">* أرقام توضيحية مبنية على التوزيع المتوقع للشكاوى حسب المحافظات.</p>
        </div>

        <div className="mt-10">
          <ChartCard title="توزيع شكاوى قطاع غزة 2024" subtitle="شيت 45 — بيانات استثنائية مرتبطة بظروف الحرب">
            <ShareDonut
              data={[
                { name: "ضمن اختصاص الهيئة", value: gaza.inMandate },
                { name: "خارج نطاق الاختصاص", value: gaza.outOfMandate },
              ]}
            />
          </ChartCard>
        </div>
      </section>
    </SiteLayout>
  );
}
