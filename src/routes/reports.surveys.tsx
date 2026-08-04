import { createFileRoute } from "@tanstack/react-router";
import { Users, Inbox } from "lucide-react";

export const Route = createFileRoute("/reports/surveys")({
  component: SurveysReport,
});

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
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
          <Inbox className="h-8 w-8 text-accent" />
        </div>
        <h3 className="mt-4 text-lg font-bold text-primary">لم يتم إضافته حتى الآن</h3>
        <p className="mt-2 max-w-md text-sm leading-7 text-muted-foreground">
          سيتم إضافة استطلاعات الرأي في هذه الصفحة لاحقاً.
        </p>
      </div>
    </section>
  );
}
