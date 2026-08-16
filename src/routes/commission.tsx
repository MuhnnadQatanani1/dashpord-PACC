import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { getLocale, useLocale, dictionaries } from "@/i18n";
import { Landmark, Scale, ShieldCheck, Target, Eye, Gavel, Users, BookOpen } from "lucide-react";

export const Route = createFileRoute("/commission")({
  component: Commission,
  head: () => {
    const dict = dictionaries[getLocale()];
    return {
      meta: [
        { title: dict["meta.commTitle"] },
        { name: "description", content: dict["meta.commDesc"] },
        { property: "og:title", content: dict["meta.commOgTitle"] },
        { property: "og:description", content: dict["meta.commOgDesc"] },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
});

function Commission() {
  const { t } = useLocale();
  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-navy gradient-navy text-white">
        <div className="pointer-events-none absolute inset-0 bg-dots opacity-50" />
        <div className="pointer-events-none absolute -top-24 right-[-10%] h-64 w-[45%] rounded-full bg-white/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            {t("comm.badge")}
          </div>
          <h1 className="text-balance text-3xl font-extrabold text-white md:text-5xl">
            {t("comm.title")}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-white/85 md:text-lg">
            {t("comm.intro")}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Eye, t: t("comm.visionT"), d: t("comm.visionD") },
            { icon: Target, t: t("comm.missionT"), d: t("comm.missionD") },
            { icon: ShieldCheck, t: t("comm.valuesT"), d: t("comm.valuesD") },
          ].map((c) => (
            <div
              key={c.t}
              className="glow-card rounded-2xl border border-border bg-card p-6 shadow-soft"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl gradient-navy text-white">
                <c.icon className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-primary">{c.t}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-primary">{t("comm.compTitle")}</h2>
          <p className="mt-2 max-w-3xl text-muted-foreground">{t("comm.compDesc")}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Landmark, t: t("comm.c1T"), d: t("comm.c1D") },
              { icon: Gavel, t: t("comm.c2T"), d: t("comm.c2D") },
              { icon: ShieldCheck, t: t("comm.c3T"), d: t("comm.c3D") },
              { icon: Scale, t: t("comm.c4T"), d: t("comm.c4D") },
              { icon: BookOpen, t: t("comm.c5T"), d: t("comm.c5D") },
              { icon: Users, t: t("comm.c6T"), d: t("comm.c6D") },
              { icon: Target, t: t("comm.c7T"), d: t("comm.c7D") },
              { icon: Landmark, t: t("comm.c8T"), d: t("comm.c8D") },
            ].map((c) => (
              <div
                key={c.t}
                className="glow-card rounded-xl border border-border bg-card p-5 shadow-soft"
              >
                <c.icon className="h-6 w-6 text-navy" />
                <h3 className="mt-3 text-base font-bold text-primary">{c.t}</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="glow-card rounded-2xl border border-border bg-card p-8 shadow-soft">
            <h3 className="text-2xl font-bold text-primary">{t("comm.legalTitle")}</h3>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-foreground/85">
              <li>{t("comm.legal1")}</li>
              <li>{t("comm.legal2")}</li>
              <li>{t("comm.legal3")}</li>
              <li>{t("comm.legal4")}</li>
              <li>{t("comm.legal5")}</li>
            </ul>
          </div>
          <div className="glow-card rounded-2xl border border-border bg-card p-8 shadow-soft">
            <h3 className="text-2xl font-bold text-primary">{t("comm.structureTitle")}</h3>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-foreground/85">
              <li>{t("comm.struct1")}</li>
              <li>{t("comm.struct2")}</li>
              <li>{t("comm.struct3")}</li>
              <li>{t("comm.struct4")}</li>
              <li>{t("comm.struct5")}</li>
              <li>{t("comm.struct6")}</li>
            </ul>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
