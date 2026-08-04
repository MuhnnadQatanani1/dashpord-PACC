import { createFileRoute } from "@tanstack/react-router";
import { Microscope, Inbox } from "lucide-react";

export const Route = createFileRoute("/reports/specialized")({
  component: SpecializedReport,
});

function SpecializedReport() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <div className="flex items-center gap-2">
          <Microscope className="h-5 w-5 text-accent" />
          <h2 className="text-xl font-bold text-primary">التقارير المتخصصة</h2>
        </div>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          دراسات وتقارير متخصصة حول جوانب محددة من منظومة النزاهة والحوكمة ومكافحة الفساد.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
          <Inbox className="h-8 w-8 text-accent" />
        </div>
        <h3 className="mt-4 text-lg font-bold text-primary">لم يتم إضافته حتى الآن</h3>
        <p className="mt-2 max-w-md text-sm leading-7 text-muted-foreground">
          سيتم إضافة التقارير المتخصصة في هذه الصفحة لاحقاً.
        </p>
      </div>
    </section>
  );
}
