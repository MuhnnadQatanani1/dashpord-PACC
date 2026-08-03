import { createFileRoute } from "@tanstack/react-router";
import { FileDown, Calendar, Users, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/reports/surveys")({
  component: SurveysReport,
});

const SURVEYS = [
  {
    id: "survey-2025",
    title: "استطلاع رأي عام حول مظاهر الفساد ومدى انتشاره 2025",
    description: "مسح وطني يمثل كافة محافظات الضفة الغربية حول إدراك المواطنين لمظاهر الفساد والاستعداد للإبلاغ عنه.",
    date: "نوفمبر 2025",
    scope: "2,400 مستجيب",
  },
  {
    id: "survey-2024",
    title: "استطلاع رأي حول أداء أجهزة مكافحة الفساد 2024",
    description: "قياس ثقة المواطنين بأداء الهيئة والنيابة والمحكمة ومدى رضاهم عن آلية معالجة الشكاوى.",
    date: "ديسمبر 2024",
    scope: "1,950 مستجيب",
  },
  {
    id: "survey-2023",
    title: "مسح رضا متلقي الخدمة في القطاع العام 2023",
    description: "تقييم تجربة المواطنين في الحصول على الخدمات العامة ومدى وضوح الإجراءات وسهولة الوصول.",
    date: "أكتوبر 2023",
    scope: "1,700 مستجيب",
  },
];

function SurveysReport() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-accent" />
          <h2 className="text-xl font-bold text-primary">استطلاعات الرأي</h2>
        </div>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          مسوح واستطلاعات رأي متخصصة حول منظومة النزاهة والحوكمة ومكافحة الفساد، تنفذ وفق منهجيات علمية وتمثل مختلف الفئات والمناطق.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {SURVEYS.map((r) => (
          <article key={r.id} className="group rounded-xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated">
            <div className="flex items-start justify-between">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400">
                <MessageSquare className="h-5 w-5" />
              </div>
              <span className="rounded-md bg-muted px-2 py-1 text-[11px] font-bold text-muted-foreground">PDF</span>
            </div>
            <h3 className="mt-4 text-base font-bold leading-snug">{r.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground line-clamp-2">{r.description}</p>
            <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {r.date}</span>
              <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {r.scope}</span>
            </div>
            <a
              href="#"
              className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-primary/10 px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <FileDown className="h-4 w-4" /> تحميل الاستطلاع
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
