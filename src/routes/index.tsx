import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { StatCard } from "@/components/site/StatCard";
import { ChartCard } from "@/components/site/ChartCard";
import { TimelineArea, SectorsPie } from "@/components/site/Charts";
import { HeroVisual } from "@/components/site/HeroVisual";
import { dataSource } from "@/lib/mock-data";
import hqImage from "@/assets/pacc-headquarters.png.asset.json";
import {
  BarChart3,
  Gavel,
  Scale,
  Megaphone,
  ArrowLeft,
  Database,
  BookOpen,
  Layers,
  ShieldCheck,
  MapPin,
  Activity,
  ChevronsLeft,
  ShieldAlert,
  CalendarCheck,
  CalendarRange,
  LayoutGrid,
  Files,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "المرصد الوطني لمؤشرات الفساد | هيئة مكافحة الفساد الفلسطينية" },
      {
        name: "description",
        content:
          "منصة وطنية فلسطينية لرصد وتحليل ونشر مؤشرات النزاهة والشفافية ومكافحة الفساد، بما يدعم صناعة القرار ويعزز الوصول إلى البيانات الرسمية.",
      },
      { property: "og:title", content: "المرصد الوطني لمؤشرات الفساد | هيئة مكافحة الفساد الفلسطينية" },
      { property: "og:description", content: "منصة وطنية فلسطينية لرصد وتحليل ونشر مؤشرات النزاهة والشفافية ومكافحة الفساد، بما يدعم صناعة القرار ويعزز الوصول إلى البيانات الرسمية." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const KPI_ICONS = {
  complaints: Megaphone,
  investigations: Files,
  referrals: Scale,
  verdicts: Gavel,
} as const;

function Home() {
  const kpis = dataSource.getKpis();
  const timeline = dataSource.getTimeline();
  const sectors = dataSource.getSectors();
  const journey = dataSource.getJourney();
  const launch = {
    headline: "من قياس المدركات إلى قياس المؤشرات الفعلية للفساد",
    date: "التقرير العلني الأول — 31 يناير 2021",
    paragraphs: [
      "انطلق المرصد الوطني لمؤشرات الفساد ليكون المرجع الرسمي الفلسطيني في رصد وتحليل بيانات النزاهة ومكافحة الفساد، اعتماداً على السجلات الرسمية للهيئة والنيابة ومحكمة جرائم الفساد بدلاً من استطلاعات المدركات.",
      "تغطي البيانات المنشورة في هذه المنصة الفترة 2022 – 2025 وتشمل الشكاوى والبلاغات، الملفات التحقيقية، الإحالات للنائب العام، الأحكام القضائية، إقرارات الذمة المالية، وطلبات الحماية.",
    ] as string[],
    outputs: journey.slice(-4).map((m) => ({ title: m.title, desc: m.description })),
  };
  const figures = kpis.map((k) => ({ id: k.id, label: k.label, value: k.value }));
  const dq = dataSource.getDataQuality();
  const heroStats = [
    { icon: CalendarCheck, label: "آخر تحديث", value: dq.lastUpdate },
    { icon: LayoutGrid, label: "عدد المؤشرات", value: dq.indicators.toLocaleString("ar-EG") },
    { icon: CalendarRange, label: "الفترة الزمنية المغطاة", value: dq.coveragePeriod },
  ];

  return (
    <SiteLayout>
      {/* HERO — full-width headquarters photograph with navy overlay */}
      <section className="relative isolate overflow-hidden">
        <img
          src={hqImage.url}
          alt="مقر هيئة مكافحة الفساد الفلسطينية"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-[oklch(0.16_0.06_258)]/88" />
        <div className="absolute inset-0 bg-gradient-to-l from-[oklch(0.14_0.05_258)]/70 via-transparent to-[oklch(0.14_0.05_258)]/60" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-24 text-white lg:grid-cols-2 lg:px-8 lg:py-32">
          <div className="reveal">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-white/85">
              <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
              هيئة مكافحة الفساد الفلسطينية
            </div>
            <h1 className="text-balance text-4xl font-extrabold leading-[1.15] md:text-5xl lg:text-[3.4rem]">
              المرصد الوطني لمؤشرات الفساد
            </h1>
            <p className="mt-6 max-w-xl text-base leading-9 text-white/80 md:text-lg">
              منصة وطنية لرصد وتحليل مؤشرات النزاهة والشفافية ومكافحة الفساد اعتماداً على البيانات الرسمية.
            </p>

            <div className="mt-10">
              <Link
                to="/dashboard"
                className="focus-ring inline-flex items-center gap-3 rounded-xl gradient-accent px-10 py-5 text-base font-extrabold text-accent-foreground shadow-glow transition-transform hover:-translate-y-0.5 hover:opacity-95"
              >
                استكشف المرصد <ArrowLeft className="h-5 w-5" />
              </Link>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
              {heroStats.map((s) => (
                <div key={s.label} className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <div className="flex items-center gap-2 text-white/75">
                    <s.icon className="h-4 w-4 text-accent" />
                    <span className="text-[11px] font-semibold">{s.label}</span>
                  </div>
                  <div className="mt-2 text-lg font-extrabold text-white">{s.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal flex justify-center text-white/85 lg:justify-end" style={{ animationDelay: "140ms" }}>
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* بداية المرصد الوطني */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                بداية المرصد الوطني
              </div>
              <h2 className="text-balance text-3xl font-bold leading-tight text-primary md:text-4xl">
                {launch.headline}
              </h2>
              <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-foreground">
                <CalendarCheck className="h-4 w-4 text-accent" />
                {launch.date}
              </div>
            </div>

            <div className="lg:col-span-7">
              {launch.paragraphs.map((p: string) => (
                <p key={p.slice(0, 24)} className="mb-5 text-base leading-9 text-muted-foreground md:text-[1.0625rem]">
                  {p}
                </p>
              ))}

              <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {launch.outputs.map((o: { title: string; desc: string }) => (
                  <div key={o.title} className="border-t border-border pt-4">
                    <h3 className="text-sm font-bold text-foreground">{o.title}</h3>
                    <p className="mt-1.5 text-sm leading-7 text-muted-foreground">{o.desc}</p>
                  </div>
                ))}
              </div>

              <Link
                to="/concepts"
                className="focus-ring mt-10 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <BookOpen className="h-4 w-4" /> المفاهيم والمصطلحات
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* KEY FIGURES — من التقرير الأول */}
      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">أرقام رئيسية</div>
            <h2 className="text-3xl font-bold text-primary md:text-4xl">أبرز مؤشرات المرصد الوطني</h2>
            <p className="mt-3 leading-8 text-muted-foreground">
              أرقام رسمية موثّقة تعكس مسار الشكوى من لحظة استلامها حتى صدور الحكم القضائي.
            </p>
          </div>
          <dl className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {figures.map((f: { id: string; label: string; value: number }) => (
              <div key={f.id} className="border-t-2 border-primary/15 pt-6">
                <dd className="text-4xl font-extrabold tracking-tight text-primary md:text-5xl">
                  {f.value.toLocaleString("ar-EG")}
                </dd>
                <dt className="mt-2 text-sm font-semibold text-muted-foreground">{f.label}</dt>

              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* KPI CARDS */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">المؤشرات التراكمية</div>
          <h2 className="text-3xl font-bold text-primary md:text-4xl">أرقام تعكس أداء منظومة النزاهة</h2>
          <p className="mt-3 leading-8 text-muted-foreground">إجماليات الأعوام 2022 – 2025 وفق البيانات الرسمية للهيئة.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {kpis.map((k) => (
            <StatCard
              key={k.id}
              label={k.label}
              value={k.value}
              trend={k.trend}
              icon={KPI_ICONS[k.id as keyof typeof KPI_ICONS]}
            />
          ))}
        </div>
      </section>


      {/* ABOUT SNAPSHOT */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:py-24 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="mb-3 inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              عن المرصد
            </div>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              من مرحلة الانطباعات إلى الأرقام الحقيقية
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              أطلقت هيئة مكافحة الفساد الفلسطينية المرصد كأداة ريادية للانتقال من قياس <em>مدركات الفساد</em>
              المبنية على الانطباعات، إلى <em>مؤشرات فعلية</em> مبنية على وثائق وملفات وأرقام قضائية دقيقة.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
            >
              اقرأ المزيد <ChevronsLeft className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
            {[
              { icon: Database, title: "جمع البيانات", desc: "تجميع الإحصاءات الشهرية والربعية للبلاغات والملفات التحقيقية." },
              { icon: BarChart3, title: "تحليل المؤشرات", desc: "معادلات إحصائية موزونة تربط الاحتمالية بالأثر لقياس الخطورة." },
              { icon: ShieldCheck, title: "دعم السياسات", desc: "توصيات ملزمة تدفع الحكومة لتعديل اللوائح وسدّ الثغرات." },
              { icon: BookOpen, title: "نشر المعرفة", desc: "تقارير وبيانات مفتوحة للباحثين والصحفيين والمجتمع المدني." },
            ].map((c) => (
              <div key={c.title} className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-elevated">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-inset ring-accent/20 transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-foreground">{c.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-surface py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mb-3 inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              كيف يعمل المرصد
            </div>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">دورة حياة البيانات في المرصد</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              من لحظة استقبال البلاغ حتى صدور الحكم القضائي، تُوثَّق كل مرحلة رقمياً وتُدرج في المؤشرات.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              { n: "01", t: "جمع البيانات", d: "تسجيل البلاغات والشكاوى فور استلامها عبر التطبيق والموقع والحضور." },
              { n: "02", t: "تصنيف البيانات", d: "فرز آلي حسب القطاع، المحافظة، ونوع الجريمة." },
              { n: "03", t: "التحليل الإحصائي", d: "معادلات موزونة (احتمالية × أثر) لقياس مستوى الخطر." },
              { n: "04", t: "التقارير والمؤشرات", d: "إصدار نشرات شهرية وربعية وسنوية للجمهور." },
            ].map((s, i) => (
              <div key={s.n} className="relative rounded-2xl border border-border bg-card p-6 shadow-soft">
                <div className="text-5xl font-black text-accent/25">{s.n}</div>
                <h3 className="mt-2 text-lg font-bold text-foreground">{s.t}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{s.d}</p>
                {i < 3 && (
                  <div className="absolute -left-3 top-1/2 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-accent-foreground md:flex">
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MINI DASHBOARD PREVIEW */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              لوحة المؤشرات
            </div>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">لمحة سريعة عن البيانات</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">اتجاهات البلاغات والملفات التحقيقية عبر السنوات، وتوزيع القضايا القطاعي.</p>
          </div>
          <Link to="/dashboard" className="focus-ring inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
            الذهاب إلى اللوحة الكاملة <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ChartCard title="اتجاه البلاغات والملفات التحقيقية" subtitle="2020 – 2025">
              <TimelineArea data={timeline} />
            </ChartCard>
          </div>
          <ChartCard title="التوزيع القطاعي" subtitle="أعلى القطاعات ملفات">
            <SectorsPie data={sectors} />
          </ChartCard>
        </div>
      </section>

      {/* QUICK NAV CARDS */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-10 text-center text-3xl font-bold text-foreground md:text-4xl">استكشف المنصة</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { to: "/commission", icon: ShieldCheck, title: "عن الهيئة", desc: "نبذة رسمية عن هيئة مكافحة الفساد." },
              { to: "/about", icon: Layers, title: "عن المرصد", desc: "الرؤية والرسالة والأهداف ورحلة الإنشاء." },
              { to: "/concepts", icon: BookOpen, title: "المفاهيم والمصطلحات", desc: "قائمة المؤشرات والبطاقات التعريفية." },
              { to: "/dashboard", icon: BarChart3, title: "لوحة البيانات التفاعلية", desc: "KPIs ورسوم بيانية تفاعلية." },
              { to: "/indicators", icon: Activity, title: "أرقام تحت الضوء", desc: "أبرز النسب والمؤشرات الرقمية." },
              { to: "/map", icon: MapPin, title: "التحليل الجغرافي", desc: "بيانات المحافظات الفلسطينية." },
              { to: "/stories", icon: Database, title: "قصص البيانات", desc: "قراءات موجّهة لأبرز النتائج." },
            ].map((c) => (
              <Link
                key={c.to}
                to={c.to}
                className="focus-ring group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-elevated"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-inset ring-accent/20">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  فتح <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* REPORT CORRUPTION CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-primary p-10 text-white md:p-14">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">
                <ShieldAlert className="h-3.5 w-3.5" /> سرية · قانونية · محمية
              </div>
              <h2 className="text-3xl font-extrabold md:text-4xl">هل لديك بلاغ عن فساد؟</h2>
              <p className="mt-3 text-base leading-8 text-white/85">
                البيانات المنشورة إحصائية ومجمّعة. هويّتك محمية بموجب القانون وضمن أعلى معايير السرية.
              </p>
            </div>
            <div className="flex flex-wrap justify-start gap-3 md:justify-end">
              <a href="https://www.pacc.ps/complaints/create" target="_blank" rel="noopener noreferrer" className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-primary shadow-soft hover:-translate-y-0.5 transition-transform">
                تقديم بلاغ
              </a>
              <a href="https://www.pacc.ps/WitnessProtection" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-accent px-5 py-3 text-sm font-bold text-accent-foreground transition-opacity hover:opacity-90">
                طلب حماية
              </a>
              <Link to="/contact" className="rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold backdrop-blur hover:bg-white/20">
                التواصل مع الهيئة
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
