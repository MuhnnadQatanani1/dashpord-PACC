import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { getLocale, useLocale, dictionaries } from "@/i18n";
import { Database, LineChart, RefreshCw, Lock, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/methodology")({
  component: Methodology,
  head: () => {
    const dict = dictionaries[getLocale()];
    return {
      meta: [
        { title: dict["meta.methodTitle"] },
        { name: "description", content: dict["meta.methodDesc"] },
      ],
    };
  },
});

function Methodology() {
  const { t } = useLocale();
  const items = [
    { icon: Database, t: t("method.item1T"), d: t("method.item1D") },
    { icon: LineChart, t: t("method.item2T"), d: t("method.item2D") },
    { icon: RefreshCw, t: t("method.item3T"), d: t("method.item3D") },
    { icon: Lock, t: t("method.item4T"), d: t("method.item4D") },
    { icon: ShieldCheck, t: t("method.item5T"), d: t("method.item5D") },
  ];
  return (
    <SiteLayout>
      <PageHeader
        eyebrow={t("method.eyebrow")}
        title={t("method.title")}
        description={t("method.desc")}
      />
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((i) => (
            <div key={i.t} className="rounded-xl border border-border bg-card p-6 shadow-soft">
              <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg gradient-accent text-accent-foreground">
                <i.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-primary">{i.t}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{i.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-surface p-8">
          <h3 className="text-xl font-bold text-primary">{t("method.scaleTitle")}</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{t("method.scaleIntro")}</p>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            <li className="rounded-lg border border-border bg-card p-4">
              <div className="text-sm font-bold text-accent">{t("method.scale1T")}</div>
              <div className="mt-1 text-sm text-muted-foreground">{t("method.scale1D")}</div>
            </li>
            <li className="rounded-lg border border-border bg-card p-4">
              <div className="text-sm font-bold text-accent">{t("method.scale2T")}</div>
              <div className="mt-1 text-sm text-muted-foreground">{t("method.scale2D")}</div>
            </li>
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
}
