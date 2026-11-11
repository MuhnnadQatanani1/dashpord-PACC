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
  const { t, pick } = useLocale();
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
      <PageHeader eyebrow={t("about.eyebrow")} title={t("about.title")} />

      <section id="commission" className="scroll-mt-28 border-t border-border bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="mb-3 text-sm font-semibold text-accent">
            {pick("نبذة رسمية", "Official overview")}
          </p>
          <h2 className="text-3xl font-bold text-primary">
            {pick("هيئة مكافحة الفساد", "Anti-Corruption Commission")}
          </h2>
          <p className="mt-6 max-w-4xl text-base leading-9 text-foreground/85">
            {pick(
              "مؤسسة رسمية مستقلة أُنشئت بموجب قانون مكافحة الفساد الفلسطيني رقم (1) لسنة 2005 وتعديلاته، تتمتع بالشخصية الاعتبارية والأهلية القانونية الكاملة، وترتبط برئيس دولة فلسطين.",
              "An independent official institution established under Palestinian Anti-Corruption Law No. (1) of 2005, as amended. It has legal personality and full legal capacity and is affiliated with the President of the State of Palestine.",
            )}
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              [
                pick("الرؤية", "Vision"),
                pick(
                  "مجتمع فلسطيني خالٍ من الفساد تسوده قيم النزاهة والشفافية والمساءلة.",
                  "A Palestinian society free from corruption, guided by integrity, transparency, and accountability.",
                ),
              ],
              [
                pick("الرسالة", "Mission"),
                pick(
                  "تعزيز منظومة النزاهة والوقاية من الفساد ومكافحته، وحماية المال العام، من خلال إنفاذ القانون وبناء الشراكات والتوعية.",
                  "Strengthen integrity, prevent and combat corruption, and protect public funds through law enforcement, partnerships, and awareness.",
                ),
              ],
              [
                pick("القيم", "Values"),
                pick(
                  "الاستقلالية، الحياد، المهنية، السرية، النزاهة، والعمل بروح الفريق.",
                  "Independence, impartiality, professionalism, confidentiality, integrity, and teamwork.",
                ),
              ],
            ].map(([title, text]) => (
              <div key={title} className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-xl font-bold text-primary">{title}</h3>
                <p className="mt-3 leading-8 text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm leading-8">
            {pick(
              "للمزيد عن هيئة مكافحة الفساد، تفضل بزيارة ",
              "Read more about the Anti-Corruption Commission at ",
            )}
            <a
              href="https://www.pacc.ps/"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring font-bold text-accent underline underline-offset-4"
            >
              pacc.ps
            </a>
          </p>
        </div>
      </section>

      {/* النشأة */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6 text-base leading-9 text-foreground/85">
            <h2 className="text-2xl font-bold text-primary">
              {pick(
                "المرصد الوطني لمؤشرات النزاهة ومكافحة الفساد",
                "National Observatory for Integrity and Anti-Corruption Indicators",
              )}
            </h2>
            <p className="font-medium">{t("about.desc")}</p>
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
