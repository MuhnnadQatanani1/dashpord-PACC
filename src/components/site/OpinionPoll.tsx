import { useState } from "react";
import type { FormEvent } from "react";
import { Star } from "lucide-react";
import { useLocale } from "@/i18n";
import { submitOpinionPoll } from "@/lib/opinion-poll.functions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function OpinionPoll() {
  const { t, dir, locale } = useLocale();
  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (rating == null || isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    try {
      await submitOpinionPoll({
        data: {
          rating,
          feedback,
          locale,
          page_path:
            typeof window === "undefined"
              ? undefined
              : `${window.location.pathname}${window.location.search}`,
          user_agent: typeof window === "undefined" ? undefined : window.navigator.userAgent,
        },
      });
      setSubmitted(true);
    } catch (err) {
      console.error("[opinion-poll] submit failed", err);
      setError(t("poll.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      dir={dir}
      className="rounded-xl border border-primary/15 bg-card p-5 text-start text-primary shadow-elevated"
    >
      {submitted ? (
        <div className={locale === "ar" ? "text-right" : "text-left"}>
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground shadow-soft">
            <Star className="h-5 w-5 fill-current" />
          </div>
          <h2 className="text-lg font-bold leading-7 text-primary">{t("poll.thanksTitle")}</h2>
          <p className="mt-2 text-sm leading-7 text-foreground/75">{t("poll.thanksDesc")}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground shadow-soft">
              <Star className="h-5 w-5 fill-current" />
            </span>
            <div className="min-w-0">
              <h2 className="text-lg font-bold leading-7 text-primary">{t("poll.footerTitle")}</h2>
              <p className="mt-1 text-sm leading-6 text-foreground/75">{t("poll.footerDesc")}</p>
              <span className="mt-2 inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                {t("poll.footerTime")}
              </span>
            </div>
          </div>

          <fieldset>
            <legend className="mb-3 text-sm font-semibold text-foreground">
              {t("poll.ratingLabel")}
            </legend>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((value) => {
                const active = rating === value;
                return (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setRating(value)}
                    className={`flex h-11 items-center justify-center rounded-lg border text-base font-bold transition-colors ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-primary/5"
                    }`}
                  >
                    <Star
                      className={`h-4 w-4 ${active ? "fill-current" : ""}`}
                      aria-hidden="true"
                    />
                    <span>{value}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-foreground">
              {t("poll.feedbackLabel")}
            </span>
            <Textarea
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
              placeholder={t("poll.feedbackPlaceholder")}
              className="min-h-24 resize-none bg-background"
            />
          </label>

          {error && (
            <p className="rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">
              {error}
            </p>
          )}

          <div className="flex justify-end">
            <Button type="submit" disabled={rating == null || isSubmitting}>
              {isSubmitting ? t("poll.submitting") : t("poll.submit")}
            </Button>
          </div>
        </form>
      )}
    </section>
  );
}
