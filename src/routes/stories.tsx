import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { getStories } from "@/lib/stories.functions";
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";

export const Route = createFileRoute("/stories")({
  component: Stories,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ["data-stories"],
      queryFn: () => getStories(),
    });
  },
  head: () => ({
    meta: [
      { title: "قصص البيانات | المرصد الوطني" },
      { name: "description", content: "قراءات موجّهة لأبرز النتائج والاتجاهات في مؤشرات الفساد." },
    ],
  }),
});

function Stories() {
  const fetchStories = useServerFn(getStories);
  const { data: stories } = useSuspenseQuery({
    queryKey: ["data-stories"],
    queryFn: fetchStories,
  });

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="قصص البيانات"
        title="قراءات موجّهة لأبرز النتائج"
        description="نحوّل الأرقام الخام إلى قصص واضحة تفسّر ما وراء الاتجاهات."
      />
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {stories.map((s, i) => (
            <article
              key={s.slug}
              className={`rounded-2xl border border-border bg-card p-6 shadow-soft ${i === 0 ? "lg:col-span-2" : ""}`}
            >
              <div className="grid gap-6 md:grid-cols-2 md:items-center">
                <div>
                  <div className="text-xs font-semibold text-accent">قصة بيانات</div>
                  <h3 className="mt-2 text-2xl font-bold text-primary">{s.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{s.summary}</p>
                  <div className="mt-6 flex items-baseline gap-3">
                    <div className="text-5xl font-black bg-gradient-to-l from-primary to-accent bg-clip-text text-transparent">
                      {s.headline}
                    </div>
                    <div className="text-sm text-muted-foreground">{s.headline_label}</div>
                  </div>
                </div>
                <div className="rounded-xl bg-surface p-3">
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={s.series}>
                      <XAxis dataKey="label" tick={{ fontSize: 11, fill: "oklch(0.48 0.02 258)" }} />
                      <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid oklch(0.92 0.01 250)", fontSize: 12 }} />
                      <Bar dataKey="value" fill="oklch(0.62 0.15 158)" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
