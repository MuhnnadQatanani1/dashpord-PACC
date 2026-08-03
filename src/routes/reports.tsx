import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/reports")({
  component: ReportsLayout,
  head: () => ({
    meta: [
      { title: "التقارير | المرصد الوطني لمؤشرات الفساد" },
      { name: "description", content: "تقارير المرصد الوطني لمؤشرات الفساد - هيئة مكافحة الفساد الفلسطينية." },
    ],
  }),
});

const TABS = [
  { to: "/reports/annual", label: "تقارير سنوية دورية" },
  { to: "/reports/specialized", label: "تقارير متخصصة" },
  { to: "/reports/surveys", label: "استطلاعات رأي" },
  { to: "/reports/international", label: "إضاءات دولية" },
];

function ReportsLayout() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="التقارير"
        title="تقارير المرصد الوطني"
        description="إصدارات دورية ومتخصصة تلخص مؤشرات النزاهة ومكافحة الفساد في فلسطين."
      />
      <nav className="mx-auto flex max-w-7xl gap-2 px-4 pb-6 lg:px-8" dir="ltr">
        {TABS.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            activeProps={{ className: "bg-primary text-primary-foreground" }}
            inactiveProps={{ className: "bg-card text-foreground/80 hover:bg-secondary" }}
            className={cn("rounded-lg px-4 py-2 text-sm font-medium transition-colors")}
          >
            {t.label}
          </Link>
        ))}
      </nav>
      <Outlet />
    </SiteLayout>
  );
}
