import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown, ShieldAlert } from "lucide-react";
import { useState } from "react";

import { ThemeToggle } from "./ThemeToggle";

type NavLeaf = { to: string; label: string };
type NavGroup = { label: string; children: NavLeaf[] };
type NavItem = NavLeaf | NavGroup;

const NAV: NavItem[] = [
  { to: "/", label: "الرئيسية" },
  {
    label: "من نحن",
    children: [
      { to: "/commission", label: "عن الهيئة" },
      { to: "/about", label: "عن المرصد" },
      { to: "/concepts", label: "المفاهيم والمصطلحات" },
      { to: "/main-indicators", label: "المؤشرات الرئيسة" },
    ],
  },
  {
    label: "المؤشرات والبيانات",
    children: [
      { to: "/dashboard", label: "لوحة البيانات التفاعلية" },
      { to: "/indicators", label: "أرقام تحت الضوء" },
      { to: "/map", label: "التحليل الجغرافي" },
      { to: "/stories", label: "قصص البيانات" },
    ],
  },
  {
    label: "التقارير",
    children: [
      { to: "/reports/annual", label: "تقارير سنوية دورية" },
      { to: "/reports/specialized", label: "تقارير متخصصة" },
      { to: "/reports/surveys", label: "استطلاعات رأي" },
      { to: "/reports/international", label: "إضاءات دولية" },
    ],
  },
];

function isGroup(item: NavItem): item is NavGroup {
  return "children" in item;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
        <Link to="/" className="focus-ring flex items-center gap-2 rounded-md">
          <img
            src="/observatory-logo.png"
            alt="شعار المرصد الوطني لمؤشرات النزاهة ومكافحة الفساد"
            className="h-14 w-auto shrink-0 object-contain"
          />
        </Link>

        <nav className="hidden xl:flex items-center gap-1">
          {NAV.map((n) =>
            isGroup(n) ? (
              <div key={n.label} className="group relative">
                <button className="focus-ring inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:text-primary hover:bg-secondary">
                  {n.label} <ChevronDown className="h-3.5 w-3.5" />
                </button>
                <div className="invisible absolute right-0 top-full z-50 mt-1 min-w-[220px] rounded-xl border border-border bg-popover p-1 opacity-0 shadow-elevated transition-all group-hover:visible group-hover:opacity-100">
                  {n.children.map((c) => (
                    <Link
                      key={c.to}
                      to={c.to}
                      activeProps={{ className: "text-primary bg-secondary" }}
                      className="block rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-secondary hover:text-primary"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={n.to}
                to={n.to}
                activeProps={{ className: "text-primary bg-secondary" }}
                className="focus-ring rounded-md px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:text-primary hover:bg-secondary"
              >
                {n.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="https://www.pacc.ps/complaints/create"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring hidden lg:inline-flex items-center gap-2 rounded-lg gradient-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-soft transition-transform hover:-translate-y-0.5"
          >
            <ShieldAlert className="h-4 w-4" /> تقديم بلاغ
          </a>
          <button
            className="focus-ring xl:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label="القائمة"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="xl:hidden border-t border-border bg-background">
          <nav className="mx-auto grid max-w-7xl gap-1 px-4 py-3">
            {NAV.flatMap((n) => (isGroup(n) ? n.children : [n])).map((c) => (
              <Link
                key={c.to}
                to={c.to}
                onClick={() => setOpen(false)}
                activeProps={{ className: "text-primary bg-secondary" }}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary"
              >
                {c.label}
              </Link>
            ))}
            <a
              href="https://www.pacc.ps/complaints/create"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg gradient-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground"
            >
              <ShieldAlert className="h-4 w-4" /> تقديم بلاغ
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
