import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Eye, Target, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "عن المرصد | المرصد الوطني لمؤشرات النزاهة والحوكمة ومكافحة الفساد" },
      { name: "description", content: "المرصد الوطني لمؤشرات النزاهة والحوكمة ومكافحة الفساد: النشأة، الرؤية، الرسالة، الأهداف، رحلة الإنشاء، ومصادر البيانات." },
    ],
  }),
});

const INTRO =
  "سعت هيئة مكافحة الفساد إلى انشاء مرصد وطني لمؤشرات النزاهة والحوكمة ومكافحة الفساد، فعال، وموثوق، وذو مصداقية عالية استناداً إلى قانون مكافحة الفساد رقم 1 لعام 2005 وتعديلاته، وحرصاً منها على الالتزام بما ورد في الاستراتيجية الوطنية عبر القطاعية لتعزيز النزاهة ومكافحة الفساد 2020-2023، الذي يختص بجمع وتوفير المعلومات حول مظاهر الفساد والوقاية منه، من خلال إعداد مؤشرات وطنية وقطاعية، ورصدها، وتحليلها، بما يخدم تطوير سياسات النزاهة والحوكمة وتدابير الوقاية من الفساد في الدولة، والعمل على إيجاد قاعدة بيانات وأنظمة معلومات، وتبادلها مع الجهات والهيئات المعنية في قضايا الفساد في الداخل والخارج.";

const VISION = "مرصد وطني لمؤشرات النزاهة ومكافحة الفساد، فعال، وموثوق، وذو مصداقية عالية";

const MISSION =
  "توفير المعلومات حول مظاهر الفساد والوقاية منه، من خلال اعداد مؤشرات وطنية وقطاعية، ورصدها، وتحليلها، بما يخدم تطوير سياسات النزاهة والحوكمة وتدابير الوقاية من الفساد في الدولة";

const OBJECTIVES_INTRO =
  "يهدف المرصد بشكل عام إلى رصد وتوفير البيانات لبناء قاعدة شاملة لإنتاج مؤشرات النزاهة والحوكمة ومكافحة الفساد، لتقييم انتشار الفساد في فلسطين ووضع السياسات وتعديلها والمساءلة والمحاسبة وقياس النجاح والاخفاق، أذ يوفر المرصد البيانات والمؤشرات الإحصائية ذات العلاقة بواقع النزاهة والحوكمة وجهود مكافحة الفساد في فلسطين، وذلك للاعتبارات الآتية:";

const OBJECTIVES = [
  "حق المواطن الفلسطيني بالحصول على المعلومات حول الجهود المبذولة في مكافحة الفساد والتدابير الوقائية تضمن سهولة الوصول للمعلومة وسهولة فهمها من قبل المستخدمين.",
  "بناء سلسلة زمنية للبيانات المتعلقة بجهود مكافحة الفساد وتنظيم عرضها بما يمكن من تحليلها واستخلاص الفرص التحسينية منها، حيث أنها تشكل مرجعاً لاتخاذ القرارات ورسم السياسات.",
  "رفع وعي كافة شرائح المجتمع الفلسطيني بما يشمله متخذي القرارات والخبراء المستهدفين في المؤشرات والمقاييس الدولية.",
  "تعزيز ثقة المستخدمين والشركاء في جهود مكافحة الفساد والمساهمة في تغيير الانطباع الذهني حول هذه الجهود.",
];

const JOURNEY_STEPS = [
  "تشخيص واقع البيانات المتوفرة",
  "اختيار المقاييس والمؤشرات على ضوء البيانات المتوفرة",
  "التوافق على القواعد الأساسية لمنهجية قراءة وتحليل البيانات",
  "بناء برنامج محوسب للمرصد",
  "إعداد وإصدار التقارير التحليلية المتخصصة",
  "خطة للتشاور مع الشركاء وتوسيع قواعد البيانات",
  "النشر والتعميم وتبادل الخبرات",
];

const DATA_SOURCES = [
  "السجلات الإدارية لهيئة مكافحة الفساد والمؤسسات الحكومية وغير الحكومية.",
  "مسوحات واستطلاعات رأي متخصصة.",
  "التشريعات الصادرة، قرارات مجلس الوزراء، قرارات وتعليمات صناع القرار، والخطط الوطنية (الاستراتيجية والقطاعية) وخططها التنفيذية وغيرها.",
];

function About() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="عن المرصد"
        title="المرصد الوطني لمؤشرات النزاهة والحوكمة ومكافحة الفساد"
        description="مبادرة ريادية وطنية أطلقتها هيئة مكافحة الفساد الفلسطينية لرصد مؤشرات النزاهة والحوكمة ومكافحة الفساد بالاعتماد على الأرقام والبيانات الرسمية."
      />

      {/* النشأة */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6 text-base leading-9 text-foreground/85">
            <p>{INTRO}</p>
          </div>

          <aside className="rounded-2xl gradient-hero p-6 text-white shadow-elevated">
            <div className="flex items-center gap-2 text-sm opacity-85">
              <ShieldCheck className="h-4 w-4" /> الإطار المرجعي
            </div>
            <ul className="mt-4 space-y-3 text-sm leading-7 opacity-90">
              <li>• قانون مكافحة الفساد رقم 1 لعام 2005 وتعديلاته.</li>
              <li>• الاستراتيجية الوطنية عبر القطاعية لتعزيز النزاهة ومكافحة الفساد 2020-2023.</li>
              <li>• اتفاقية الأمم المتحدة لمكافحة الفساد (UNCAC).</li>
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
              <h3 className="text-xl font-bold text-primary">الرؤية</h3>
              <p className="mt-3 text-base leading-8 text-muted-foreground">{VISION}</p>
            </div>
            <div className="glow-card rounded-2xl border border-border bg-card p-8 shadow-soft">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl gradient-accent text-accent-foreground">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-primary">الرسالة</h3>
              <p className="mt-3 text-base leading-8 text-muted-foreground">{MISSION}</p>
            </div>
          </div>
        </div>
      </section>

      {/* الأهداف */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">الأهداف</div>
          <h2 className="text-3xl font-bold text-primary md:text-4xl">أهداف المرصد الوطني</h2>
        </div>
        <p className="mb-8 max-w-4xl text-base leading-9 text-muted-foreground">{OBJECTIVES_INTRO}</p>
        <div className="grid gap-4 md:grid-cols-2">
          {OBJECTIVES.map((o, i) => (
            <div key={i} className="glow-card flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft">
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
            <h2 className="text-3xl font-bold text-primary md:text-4xl">رحلة انشاء المرصد</h2>
            <p className="mt-3 text-base font-bold leading-8 text-foreground">سبع مراحل رئيسية متتالية ومترابطة</p>
            <p className="mt-2 max-w-3xl text-base leading-9 text-muted-foreground">
              تم تقسيم رحلة المرصد إلى سبعة من المراحل الرئيسة والمتتالية والمرتبطة فيما بينها، والقابلة للتطوير
              والتحسين استناداً على التجربة العملية والمستجدات، بالإضافة الى قابليتها للتطوير بما يتناسب مع التجارب
              والمتطلبات الدولية.
            </p>
          </div>

          <div className="relative max-w-3xl">
            <div className="absolute bottom-8 right-[27px] top-8 w-0.5 bg-accent/30 md:right-[35px]" />
            <ol className="space-y-8">
              {JOURNEY_STEPS.map((s, i) => (
                <li key={s} className="relative flex items-stretch gap-5 md:gap-7">
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full gradient-accent text-lg font-extrabold text-accent-foreground shadow-soft ring-4 ring-surface md:h-[70px] md:w-[70px] md:text-xl">
                    {i + 1}
                  </div>
                  <div className="glow-card flex-1 rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-elevated md:p-8">
                    <div className="text-xs font-bold tracking-wide text-accent">المرحلة {i + 1}</div>
                    <h3 className="mt-2 text-lg font-bold leading-8 text-foreground md:text-2xl">{s}</h3>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* مصادر البيانات */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <h2 className="text-3xl font-bold text-primary md:text-4xl">مصادر البيانات</h2>
        <ul className="mt-8 max-w-4xl space-y-3">
          {DATA_SOURCES.map((d) => (
            <li key={d} className="glow-card flex gap-3 rounded-xl border border-border bg-card p-4 text-sm leading-8 text-foreground/85">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </section>
    </SiteLayout>
  );
}
