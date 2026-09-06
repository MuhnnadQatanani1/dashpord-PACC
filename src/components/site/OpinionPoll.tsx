import { useState } from "react";
import type { FormEvent } from "react";
import { Star } from "lucide-react";
import { useLocale } from "@/i18n";
import { submitOpinionPoll } from "@/lib/opinion-poll.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
      className="rounded-xl border border-primary/15 bg-emerald-50/80 p-4 text-start text-primary shadow-sm"
    >
      {submitted ? (
        <div className={`flex items-center gap-3 ${locale === "ar" ? "text-right" : "text-left"}`}>
          <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-soft">
            <Star className="h-5 w-5 fill-current" />
          </div>
          <div>
            <h2 className="text-base font-bold leading-6 text-primary">{t("poll.thanksTitle")}</h2>
            <p className="text-sm leading-6 text-foreground/75">{t("poll.thanksDesc")}</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-soft">
              <Star className="h-5 w-5 fill-current" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-base font-bold leading-6 text-primary">
                {t("poll.footerTitle")}
              </h2>
              <p className="text-sm leading-6 text-foreground/75">
                {t("poll.footerDesc")} -{" "}
                <span className="font-semibold text-primary/80">{t("poll.footerTime")}</span>
              </p>
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-[auto_1fr_auto] lg:items-end">
            <fieldset>
              <legend className="mb-2 text-sm font-semibold text-foreground">
                {t("poll.ratingLabel")}
              </legend>
              <div className="grid grid-cols-5 gap-1.5">
                {[1, 2, 3, 4, 5].map((value) => {
                  const active = rating === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setRating(value)}
                      className={`flex h-9 w-10 items-center justify-center rounded-md border text-sm font-bold transition-colors ${
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-primary/15 bg-white text-foreground hover:border-primary/40 hover:bg-primary/5"
                      }`}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <label className="block">
              <span className="sr-only">{t("poll.feedbackLabel")}</span>
              <Input
                value={feedback}
                onChange={(event) => setFeedback(event.target.value)}
                placeholder={t("poll.feedbackPlaceholder")}
                className="h-10 border-primary/15 bg-white"
              />
            </label>

            <Button type="submit" className="h-10 px-5" disabled={rating == null || isSubmitting}>
              {isSubmitting ? t("poll.submitting") : t("poll.submit")}
            </Button>
          </div>

          {error && (
            <p className="rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">
              {error}
            </p>
          )}
        </form>
      )}
    </section>
  );
}
