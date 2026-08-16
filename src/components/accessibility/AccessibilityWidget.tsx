import { useState } from "react";
import {
  Accessibility,
  X,
  Contrast,
  Type,
  Minus,
  Plus,
  AlignJustify,
  Link2,
  ImageOff,
  PauseCircle,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/i18n";
import { useA11y, setA11y, resetA11y, type FontSizeLevel } from "@/lib/accessibility-store";

const FONT_SIZES: FontSizeLevel[] = ["default", "lg", "xl"];

function Toggle({
  active,
  onClick,
  label,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "focus-ring flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-start text-sm font-medium transition-colors",
        active
          ? "border-accent bg-accent/15 text-foreground"
          : "border-border bg-card text-foreground/80 hover:bg-secondary",
      )}
    >
      <span className={cn("shrink-0", active ? "text-accent" : "text-muted-foreground")}>
        {icon}
      </span>
      <span className="flex-1">{label}</span>
      <span
        className={cn(
          "relative h-5 w-9 shrink-0 rounded-full transition-colors",
          active ? "bg-accent" : "bg-input",
        )}
        aria-hidden="true"
      >
        <span
          className={cn(
            "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all",
            active ? "start-4" : "start-0.5",
          )}
        />
      </span>
    </button>
  );
}

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const a11y = useA11y();
  const { t } = useLocale();

  const nextSize = (): FontSizeLevel => {
    const idx = FONT_SIZES.indexOf(a11y.fontsize);
    return FONT_SIZES[(idx + 1) % FONT_SIZES.length];
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("a11y.open")}
        aria-expanded={open}
        className="focus-ring fixed bottom-4 start-4 z-[70] flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-elevated transition-transform hover:scale-105"
      >
        <Accessibility className="h-6 w-6" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={t("a11y.title")}
          className="fixed bottom-20 start-4 z-[70] w-[19rem] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-border bg-background shadow-elevated"
        >
          <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-3">
            <div className="flex items-center gap-2">
              <Accessibility className="h-5 w-5 text-accent" />
              <h3 className="text-sm font-bold text-primary">{t("a11y.title")}</h3>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t("common.close")}
              className="focus-ring rounded-md p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-2 p-3">
            <Toggle
              active={a11y.contrast}
              onClick={() => setA11y({ contrast: !a11y.contrast })}
              label={t("a11y.contrast")}
              icon={<Contrast className="h-5 w-5" />}
            />

            <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
              <Type className="h-5 w-5 shrink-0 text-muted-foreground" />
              <span className="flex-1 text-sm font-medium text-foreground/80">
                {t("a11y.fontsize")}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() =>
                    setA11y({
                      fontsize:
                        a11y.fontsize === "default"
                          ? "xl"
                          : FONT_SIZES[FONT_SIZES.indexOf(a11y.fontsize) - 1],
                    })
                  }
                  aria-label={t("a11y.decrease")}
                  className="focus-ring rounded-md border border-border p-1.5 text-foreground hover:bg-secondary"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setA11y({ fontsize: nextSize() })}
                  aria-label={t("a11y.increase")}
                  className="focus-ring rounded-md border border-border p-1.5 text-foreground hover:bg-secondary"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <Toggle
              active={a11y.spacing}
              onClick={() => setA11y({ spacing: !a11y.spacing })}
              label={t("a11y.spacing")}
              icon={<AlignJustify className="h-5 w-5" />}
            />
            <Toggle
              active={a11y.links}
              onClick={() => setA11y({ links: !a11y.links })}
              label={t("a11y.links")}
              icon={<Link2 className="h-5 w-5" />}
            />
            <Toggle
              active={a11y.images}
              onClick={() => setA11y({ images: !a11y.images })}
              label={t("a11y.images")}
              icon={<ImageOff className="h-5 w-5" />}
            />
            <Toggle
              active={a11y.motion}
              onClick={() => setA11y({ motion: !a11y.motion })}
              label={t("a11y.motion")}
              icon={<PauseCircle className="h-5 w-5" />}
            />

            <button
              type="button"
              onClick={resetA11y}
              className="focus-ring mt-1 inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-semibold text-foreground hover:bg-secondary"
            >
              <RotateCcw className="h-4 w-4" />
              {t("a11y.reset")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
