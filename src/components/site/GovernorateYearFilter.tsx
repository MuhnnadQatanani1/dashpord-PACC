import { Filter } from "lucide-react";
import { useLocale } from "@/i18n";
import { ALL_STAT_YEARS, STAT_YEARS } from "@/data/governorate-stats";

interface GovernorateYearFilterProps {
  selected: ReadonlySet<number>;
  onChange: (next: Set<number>) => void;
}

export function GovernorateYearFilter({ selected, onChange }: GovernorateYearFilterProps) {
  const { t } = useLocale();
  const isAll = selected.size === STAT_YEARS.length;

  const toggle = (year: number) => {
    const next = new Set(selected);
    if (next.has(year)) {
      next.delete(year);
    } else {
      next.add(year);
    }
    onChange(next.size === 0 ? new Set(ALL_STAT_YEARS) : next);
  };

  return (
    <div className="flex flex-wrap items-center gap-1 rounded-lg border border-border bg-card p-1.5 shadow-soft">
      <span className="inline-flex items-center gap-1.5 px-2.5 text-[13px] font-semibold text-muted-foreground">
        <Filter className="h-4 w-4 text-accent" /> {t("map.filterTitle")}
      </span>
      <button
        type="button"
        onClick={() => onChange(new Set(ALL_STAT_YEARS))}
        className={`rounded-md px-3 py-1.5 text-sm font-bold transition-colors ${
          isAll
            ? "bg-accent text-accent-foreground shadow-sm"
            : "bg-surface text-foreground/80 hover:bg-secondary"
        }`}
      >
        {t("map.allYears")}
      </button>
      {STAT_YEARS.map((year) => (
        <button
          key={year}
          type="button"
          onClick={() => toggle(year)}
          className={`rounded-md px-3 py-1.5 text-sm font-bold transition-colors ${
            selected.has(year)
              ? "bg-accent text-accent-foreground shadow-sm"
              : "bg-surface text-foreground/80 hover:bg-secondary"
          }`}
        >
          {year}
        </button>
      ))}
    </div>
  );
}
