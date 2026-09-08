import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { getLocale, useLocale, dictionaries } from "@/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/reports")({
  component: ReportsLayout,
  head: () => {
    const dict = dictionaries[getLocale()];
    return {
      meta: [
        { title: dict["meta.reportsTitle"] },
        { name: "description", content: dict["meta.reportsDesc"] },
      ],
    };
  },
});

const TABS: {
  to: string;
  labelKey: "reports.annual" | "reports.specialized" | "reports.surveys" | "reports.international";
}[] = [
  { to: "/reports/annual", labelKey: "reports.annual" },
  { to: "/reports/specialized", labelKey: "reports.specialized" },
  { to: "/reports/surveys", labelKey: "reports.surveys" },
  { to: "/reports/international", labelKey: "reports.international" },
];

function ReportsLayout() {
  const { t } = useLocale();
  return (
    <SiteLayout>
      <PageHeader
        eyebrow={t("reports.eyebrow")}
        title={t("reports.title")}
        description={t("reports.description")}
      />
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 pb-6 lg:px-8">
        <nav className="flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <Link
              key={tab.to}
              to={tab.to}
              activeProps={{ className: "bg-primary text-primary-foreground" }}
              inactiveProps={{ className: "bg-card text-foreground/80 hover:bg-secondary" }}
              className={cn("rounded-lg px-4 py-2 text-sm font-medium transition-colors")}
            >
              {t(tab.labelKey)}
            </Link>
          ))}
        </nav>
      </div>
      <Outlet />
    </SiteLayout>
  );
}
