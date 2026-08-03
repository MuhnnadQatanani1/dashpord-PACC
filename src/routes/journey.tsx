import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { dataSource } from "@/lib/mock-data";
import { Flag } from "lucide-react";

export const Route = createFileRoute("/journey")({
  component: Journey,
  head: () => ({
    meta: [
      { title: "رحلة إنشاء المرصد | المرصد الوطني لمؤشرات الفساد" },
      { name: "description", content: "الخط الزمني التفاعلي لرحلة إنشاء المرصد الوطني لمؤشرات الفساد." },
    ],
  }),
});

function Journey() {
  const milestones = dataSource.getJourney();

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="رحلة الإنشاء"
        title="من الفكرة إلى منظومة بيانات وطنية"
        description="خط زمني تفاعلي يستعرض المراحل الرئيسية لإنشاء المرصد الوطني لمؤشرات الفساد."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <h2 className="mb-10 text-3xl font-bold text-primary">الخط الزمني للمرصد</h2>
        <div className="relative">
          <div className="absolute right-4 top-0 hidden h-full w-0.5 bg-gradient-to-b from-primary via-accent to-primary/30 md:block" />
          <ol className="space-y-6">
            {milestones.map((m, i) => (
              <li key={m.year} className="relative md:pr-16">
                <div className="absolute right-0 top-1 hidden h-9 w-9 items-center justify-center rounded-full gradient-accent text-accent-foreground shadow-elevated md:flex">
                  <Flag className="h-4 w-4" />
                </div>
                <article
                  className={`rounded-2xl border border-border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1 hover:shadow-elevated ${
                    i === 2 ? "border-accent/50 ring-2 ring-accent/20" : ""
                  }`}
                >
                  <div className="flex flex-wrap items-baseline gap-3">
                    <div className="text-2xl font-black bg-gradient-to-l from-primary to-accent bg-clip-text text-transparent">
                      {m.year}
                    </div>
                    <h3 className="text-lg font-bold text-primary">{m.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{m.description}</p>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </SiteLayout>
  );
}
