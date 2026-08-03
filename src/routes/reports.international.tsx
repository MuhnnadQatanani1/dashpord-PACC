import { createFileRoute } from "@tanstack/react-router";
import { FileDown, Calendar, Globe2, Handshake } from "lucide-react";

export const Route = createFileRoute("/reports/international")({
  component: InternationalReport,
});

const INTERNATIONAL = [
  {
    id: "intl-uncac",
    title: "إضاءة — آلية استعراض تنفيذ اتفاقية الأمم المتحدة لمكافحة الفساد",
    description: "موجز حول مشاركة فلسطين في الدورة الأولى لآلية استعراض تنفيذ اتفاقية الأمم المتحدة لمكافحة الفساد (UNCAC).",
    date: "أكتوبر 2025",
    scope: "مرجعية دولية",
  },
  {
    id: "intl-arab",
    title: "إضاءة — الشبكة العربية لتعزيز النزاهة ومكافحة الفساد",
    description: "عرض لأبرز المخرجات والتوصيات الصادرة عن اجتماعات الشبكة العربية لتعزيز النزاهة ومكافحة الفساد.",
    date: "سبتمبر 2025",
    scope: "مرجعية إقليمية",
  },
  {
    id: "intl-bench",
    title: "إضاءة — مقارنة مع مؤشرات دولية مرجعية",
    description: "مقارنة أولية بين مؤشرات المرصد الوطني وأبرز المقاييس الدولية المعتمدة في مجال النزاهة ومكافحة الفساد.",
    date: "يونيو 2025",
    scope: "تحليل مقارن",
  },
];

function InternationalReport() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <div className="flex items-center gap-2">
          <Globe2 className="h-5 w-5 text-accent" />
          <h2 className="text-xl font-bold text-primary">إضاءات دولية</h2>
        </div>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          إضاءات حول التفاعل الدولي والإقليمي لفلسطين في مجال النزاهة ومكافحة الفساد، وموقع المؤشرات الوطنية من المقاييس الدولية المرجعية.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {INTERNATIONAL.map((r) => (
          <article key={r.id} className="group rounded-xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated">
            <div className="flex items-start justify-between">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400">
                <Handshake className="h-5 w-5" />
              </div>
              <span className="rounded-md bg-muted px-2 py-1 text-[11px] font-bold text-muted-foreground">PDF</span>
            </div>
            <h3 className="mt-4 text-base font-bold leading-snug">{r.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground line-clamp-2">{r.description}</p>
            <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {r.date}</span>
              <span className="flex items-center gap-1"><Globe2 className="h-3.5 w-3.5" /> {r.scope}</span>
            </div>
            <a
              href="#"
              className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-primary/10 px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <FileDown className="h-4 w-4" /> تحميل الإضاءة
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
