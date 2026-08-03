import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Landmark, Scale, ShieldCheck, Target, Eye, Gavel, Users, BookOpen } from "lucide-react";

export const Route = createFileRoute("/commission")({
  component: Commission,
  head: () => ({
    meta: [
      { title: "هيئة مكافحة الفساد الفلسطينية | نبذة" },
      { name: "description", content: "نبذة عن هيئة مكافحة الفساد الفلسطينية: النشأة، الرؤية، الرسالة، والاختصاصات." },
      { property: "og:title", content: "هيئة مكافحة الفساد الفلسطينية" },
      { property: "og:description", content: "المؤسسة الرسمية المستقلة المكلّفة بمكافحة الفساد في فلسطين." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Commission() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="نبذة رسمية"
        title="هيئة مكافحة الفساد الفلسطينية"
        description="مؤسسة رسمية مستقلة أُنشئت بموجب قانون مكافحة الفساد الفلسطيني رقم (1) لسنة 2005 وتعديلاته، تتمتع بالشخصية الاعتبارية والأهلية القانونية الكاملة، وترتبط برئيس دولة فلسطين."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Eye,
              t: "الرؤية",
              d: "مجتمع فلسطيني خالٍ من الفساد تسوده قيم النزاهة والشفافية والمساءلة.",
            },
            {
              icon: Target,
              t: "الرسالة",
              d: "تعزيز منظومة النزاهة والوقاية من الفساد ومكافحته، وحماية المال العام، من خلال إنفاذ القانون وبناء الشراكات والتوعية.",
            },
            {
              icon: ShieldCheck,
              t: "القيم",
              d: "الاستقلالية، الحياد، المهنية، السرية، النزاهة، والعمل بروح الفريق.",
            },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl gradient-accent text-accent-foreground">
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
          <h2 className="text-3xl font-bold text-primary">الاختصاصات الرئيسية</h2>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            وفقاً لقانون مكافحة الفساد رقم (1) لسنة 2005 وتعديلاته، تضطلع الهيئة بمجموعة من الاختصاصات
            الجوهرية التي تُغطي الوقاية والملاحقة والحماية والتوعية.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Landmark, t: "الوقاية", d: "وضع السياسات والخطط ومتابعة أوجه القصور في التشريعات والإجراءات." },
              { icon: Gavel, t: "التحقيق والملاحقة", d: "تلقّي البلاغات، إجراء التحقيقات، والإحالة إلى نيابة جرائم الفساد." },
              { icon: ShieldCheck, t: "الحماية", d: "حماية الشهود والمخبرين والمبلغين والخبراء والمحقّقين وذويهم." },
              { icon: Scale, t: "استرداد الأموال", d: "متابعة استرداد الأموال والحقوق العامة الناجمة عن جرائم الفساد." },
              { icon: BookOpen, t: "إقرارات الذمة المالية", d: "تلقّي وفحص إقرارات الذمة المالية للجهات الخاضعة." },
              { icon: Users, t: "التوعية", d: "نشر ثقافة النزاهة والشفافية عبر برامج توعوية وشراكات مجتمعية." },
              { icon: Target, t: "التعاون الدولي", d: "تنفيذ اتفاقية الأمم المتحدة لمكافحة الفساد (UNCAC) وربط الشراكات الإقليمية." },
              { icon: Landmark, t: "الاستراتيجية الوطنية", d: "متابعة تنفيذ الاستراتيجية عبر القطاعية للنزاهة ومكافحة الفساد." },
            ].map((c) => (
              <div key={c.t} className="rounded-xl border border-border bg-card p-5 shadow-soft">
                <c.icon className="h-6 w-6 text-accent" />
                <h3 className="mt-3 text-base font-bold text-primary">{c.t}</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
            <h3 className="text-2xl font-bold text-primary">الإطار القانوني</h3>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-foreground/85">
              <li>• قانون مكافحة الفساد الفلسطيني رقم (1) لسنة 2005 وتعديلاته.</li>
              <li>• قرار بقانون رقم (7) لسنة 2010 بشأن مكافحة الفساد.</li>
              <li>• النظام الداخلي وأنظمة إقرارات الذمة المالية.</li>
              <li>• اتفاقية الأمم المتحدة لمكافحة الفساد (UNCAC) الموقّعة والمُصادَق عليها.</li>
              <li>• الاستراتيجية الوطنية عبر القطاعية لتعزيز النزاهة ومكافحة الفساد.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
            <h3 className="text-2xl font-bold text-primary">البنية المؤسسية</h3>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-foreground/85">
              <li>• رئيس الهيئة يُعيَّن بمرسوم رئاسي بدرجة وزير.</li>
              <li>• الإدارة العامة للتحقيق — تُنفّذ الملفات التحقيقية.</li>
              <li>• الإدارة العامة للوقاية — السياسات والدراسات والتوعية.</li>
              <li>• الإدارة العامة للشؤون القانونية وإقرارات الذمة المالية.</li>
              <li>• وحدة حماية الشهود والمبلغين والمُخبرين.</li>
              <li>• المرصد الوطني لمؤشرات الفساد — وحدة إدارية مستقلة.</li>
            </ul>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
