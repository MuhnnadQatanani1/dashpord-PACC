import { useState } from "react";
import { AudioLines, X, Play, Pause, Square, Volume2, AlertCircle } from "lucide-react";
import { useLocale } from "@/i18n";
import { useReadAloud } from "./use-read-aloud";

export function ReadAloud() {
  const [open, setOpen] = useState(false);
  const { t } = useLocale();
  const read = useReadAloud();

  const canControl = read.supported && (read.state === "playing" || read.state === "paused");

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("tts.open")}
        aria-expanded={open}
        className="focus-ring fixed bottom-4 end-4 z-[70] flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-elevated transition-transform hover:scale-105"
      >
        <AudioLines className="h-6 w-6" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={t("tts.open")}
          className="fixed bottom-20 end-4 z-[70] w-[19rem] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-border bg-background shadow-elevated"
        >
          <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-3">
            <div className="flex items-center gap-2">
              <AudioLines className="h-5 w-5 text-accent" />
              <h3 className="text-sm font-bold text-primary">{t("tts.listen")}</h3>
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

          <div className="grid gap-3 p-3">
            {read.error && (
              <p className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                {t(read.error)}
              </p>
            )}

            {!read.supported ? (
              <p className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground">
                {t("tts.unavailable")}
              </p>
            ) : (
              <>
                <p className="text-xs text-muted-foreground">
                  {read.state === "playing" ? t("tts.reading") : ""}
                </p>

                <div className="flex items-center justify-center gap-2">
                  {read.state === "playing" ? (
                    <button
                      type="button"
                      onClick={read.pause}
                      className="focus-ring flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft hover:bg-primary/90"
                      aria-label={t("tts.pause")}
                    >
                      <Pause className="h-5 w-5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={read.play}
                      className="focus-ring flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-soft hover:bg-accent/90"
                      aria-label={read.state === "paused" ? t("tts.resume") : t("tts.play")}
                    >
                      <Play className="h-5 w-5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={read.stop}
                    disabled={!canControl}
                    className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-soft hover:bg-secondary disabled:opacity-40"
                    aria-label={t("tts.stop")}
                  >
                    <Square className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
                  <Volume2 className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="flex-1 text-sm font-medium text-foreground/80">
                    {t("tts.speed")}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => read.setRate(read.rate - 0.25)}
                      className="focus-ring rounded-md border border-border px-2 py-1 text-xs text-foreground hover:bg-secondary"
                      aria-label={t("a11y.decrease")}
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-sm font-bold text-primary">
                      {read.rate.toFixed(2)}
                    </span>
                    <button
                      type="button"
                      onClick={() => read.setRate(read.rate + 0.25)}
                      className="focus-ring rounded-md border border-border px-2 py-1 text-xs text-foreground hover:bg-secondary"
                      aria-label={t("a11y.increase")}
                    >
                      +
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
