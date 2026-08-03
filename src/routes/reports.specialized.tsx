import { createFileRoute } from "@tanstack/react-router";
import { fakeReports } from "@/data/fake-reports";
import { FileDown, Calendar, BookOpen, Microscope } from "lucide-react";

export const Route = createFileRoute("/reports/specialized")({
  component: SpecializedReport,
});

function SpecializedReport() {
  const reports = fakeReports.filter((r) => r.category === "specialized");

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="mb-6 flex items-center gap-2">
        <Microscope className="h-5 w-5 text-accent" />
        <h2 className="text-xl font-bold text-primary">التقارير المتخصصة</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((r) => (
          <article key={r.id} className="group rounded-xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated">
            <div className="flex items-start justify-between">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
                <FileDown className="h-5 w-5" />
              </div>
              <span className="rounded-md bg-muted px-2 py-1 text-[11px] font-bold text-muted-foreground">PDF</span>
            </div>
            <h3 className="mt-4 text-base font-bold leading-snug">{r.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground line-clamp-2">{r.description}</p>
            <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {r.date}</span>
              <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> {r.pages} صفحة</span>
              <span>{r.size}</span>
            </div>
            <a
              href="#"
              className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-primary/10 px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <FileDown className="h-4 w-4" /> تحميل التقرير
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
