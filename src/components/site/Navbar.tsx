import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown, ShieldAlert, Languages } from "lucide-react";
import { useState } from "react";

import { ThemeToggle } from "./ThemeToggle";
import { useLocale } from "@/i18n";
import type { Dict } from "@/i18n/ar";

type NavLeaf = { to: string; label: keyof Dict };
type NavGroup = { label: keyof Dict; children: NavLeaf[] };
type NavItem = NavLeaf | NavGroup;

const NAV: NavItem[] = [
  { to: "/", label: "nav.home" },
  {
    label: "nav.about",
    children: [
      { to: "/commission", label: "nav.commission" },
      { to: "/about", label: "nav.observatory" },
      { to: "/concepts", label: "nav.concepts" },
      { to: "/main-indicators", label: "nav.enforcement" },
      { to: "/main-indicators-efforts", label: "nav.efforts" },
    ],
  },
  {
    label: "nav.data",
    children: [
      { to: "/dashboard", label: "nav.dashboard" },
      { to: "/indicators", label: "nav.spotlight" },
      { to: "/map", label: "nav.map" },
      { to: "/stories", label: "nav.stories" },
    ],
  },
  {
    label: "nav.reports",
    children: [
      { to: "/reports/annual", label: "nav.annual" },
      { to: "/reports/specialized", label: "nav.specialized" },
      { to: "/reports/surveys", label: "nav.surveys" },
      { to: "/reports/international", label: "nav.international" },
    ],
  },
];

function isGroup(item: NavItem): item is NavGroup {
  return "children" in item;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { t, toggle } = useLocale();
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
        <Link to="/" className="focus-ring flex items-center gap-2 rounded-md">
          <img
            src="/observatory-logo.png"
            alt={t("common.logoAlt")}
            className="h-14 w-auto shrink-0 object-contain"
          />
        </Link>

        <nav className="hidden xl:flex items-center gap-1">
          {NAV.map((n) =>
            isGroup(n) ? (
              <div key={String(n.label)} className="group relative">
                <button className="focus-ring inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:text-primary hover:bg-secondary">
                  {t(n.label)} <ChevronDown className="h-3.5 w-3.5" />
                </button>
                <div className="invisible absolute right-0 top-full z-50 mt-1 min-w-[220px] rounded-xl border border-border bg-popover p-1 opacity-0 shadow-elevated transition-all group-hover:visible group-hover:opacity-100">
                  {n.children.map((c) => (
                    <Link
                      key={c.to}
                      to={c.to}
                      activeProps={{ className: "text-primary bg-secondary" }}
                      className="block rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-secondary hover:text-primary"
                    >
                      {t(c.label)}
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
                {t(n.label)}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label={t("nav.switchLang")}
            className="focus-ring inline-flex h-10 items-center gap-1.5 rounded-lg border border-border bg-card px-3 text-sm font-semibold text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
          >
            <Languages className="h-4 w-4" />
            {t("nav.langLabel")}
          </button>
          <ThemeToggle />
          <a
            href="https://www.pacc.ps/complaints/create"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring hidden lg:inline-flex items-center gap-2 rounded-lg gradient-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-soft transition-transform hover:-translate-y-0.5"
          >
            <ShieldAlert className="h-4 w-4" /> {t("nav.report")}
          </a>
          <button
            className="focus-ring xl:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label={t("common.menu")}
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
                {t(c.label)}
              </Link>
            ))}
            <a
              href="https://www.pacc.ps/complaints/create"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg gradient-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground"
            >
              <ShieldAlert className="h-4 w-4" /> {t("nav.report")}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
