import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { getLocale, useLocale, dictionaries } from "@/i18n";
import { Eye, Target, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => {
    const dict = dictionaries[getLocale()];
    return {
      meta: [
        { title: dict["meta.aboutTitle"] },
        { name: "description", content: dict["meta.aboutDesc"] },
      ],
    };
  },
});

function About() {
  const { t } = useLocale();
  const objectives = [t("about.obj1"), t("about.obj2"), t("about.obj3"), t("about.obj4")];
  const journeySteps = [
    t("about.jstep1"),
    t("about.jstep2"),
    t("about.jstep3"),
    t("about.jstep4"),
    t("about.jstep5"),
    t("about.jstep6"),
    t("about.jstep7"),
  ];
  const dataSources = [t("about.data1"), t("about.data2"), t("about.data3")];
  const refs = [t("about.ref1"), t("about.ref2"), t("about.ref3")];

  return (
    <SiteLayout>
      <PageHeader
        eyebrow={t("about.eyebrow")}
        title={t("about.title")}
        description={t("about.desc")}
      />

      {/* النشأة */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6 text-base leading-9 text-foreground/85">
            <p>{t("about.intro")}</p>
          </div>

          <aside className="rounded-2xl gradient-hero p-6 text-white shadow-elevated">
            <div className="flex items-center gap-2 text-sm opacity-85">
              <ShieldCheck className="h-4 w-4" /> {t("about.refTitle")}
            </div>
            <ul className="mt-4 space-y-3 text-sm leading-7 opacity-90">
              {refs.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* الرؤية والرسالة */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="glow-card rounded-2xl border border-border bg-card p-8 shadow-soft">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl gradient-accent text-accent-foreground">
                <Eye className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-primary">{t("about.visionT")}</h3>
              <p className="mt-3 text-base leading-8 text-muted-foreground">{t("about.vision")}</p>
            </div>
            <div className="glow-card rounded-2xl border border-border bg-card p-8 shadow-soft">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl gradient-accent text-accent-foreground">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-primary">{t("about.missionT")}</h3>
              <p className="mt-3 text-base leading-8 text-muted-foreground">{t("about.mission")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* الأهداف */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {t("about.objectivesEyebrow")}
          </div>
          <h2 className="text-3xl font-bold text-primary md:text-4xl">
            {t("about.objectivesTitle")}
          </h2>
        </div>
        <p className="mb-8 max-w-4xl text-base leading-9 text-muted-foreground">
          {t("about.objectivesIntro")}
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {objectives.map((o, i) => (
            <div
              key={i}
              className="glow-card flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft"
            >
              <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-sm font-bold text-accent ring-1 ring-inset ring-accent/20">
                {i + 1}
              </div>
              <p className="text-sm leading-8 text-foreground/85">{o}</p>
            </div>
          ))}
        </div>
      </section>

      {/* رحلة انشاء المرصد */}
      <section className="bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <h2 className="text-3xl font-bold text-primary md:text-4xl">
              {t("about.journeyTitle")}
            </h2>
            <p className="mt-3 text-base font-bold leading-8 text-foreground">
              {t("about.journeySubtitle")}
            </p>
            <p className="mt-2 max-w-3xl text-base leading-9 text-muted-foreground">
              {t("about.journeyDesc")}
            </p>
          </div>

          <div className="relative max-w-3xl">
            <div className="absolute bottom-8 right-[27px] top-8 w-0.5 bg-accent/30 md:right-[35px]" />
            <ol className="space-y-8">
              {journeySteps.map((s, i) => (
                <li key={s} className="relative flex items-stretch gap-5 md:gap-7">
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full gradient-accent text-lg font-extrabold text-accent-foreground shadow-soft ring-4 ring-surface md:h-[70px] md:w-[70px] md:text-xl">
                    {i + 1}
                  </div>
                  <div className="glow-card flex-1 rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-elevated md:p-8">
                    <div className="text-xs font-bold tracking-wide text-accent">
                      {t("about.phase", { n: i + 1 })}
                    </div>
                    <h3 className="mt-2 text-lg font-bold leading-8 text-foreground md:text-2xl">
                      {s}
                    </h3>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* مصادر البيانات */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <h2 className="text-3xl font-bold text-primary md:text-4xl">{t("about.dataTitle")}</h2>
        <ul className="mt-8 max-w-4xl space-y-3">
          {dataSources.map((d) => (
            <li
              key={d}
              className="glow-card flex gap-3 rounded-xl border border-border bg-card p-4 text-sm leading-8 text-foreground/85"
            >
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </section>
    </SiteLayout>
  );
}
