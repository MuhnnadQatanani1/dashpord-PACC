import { useState } from "react";
import type { FormEvent } from "react";
import { MessageSquareText, Star } from "lucide-react";
import { useLocale } from "@/i18n";
import { submitOpinionPoll } from "@/lib/opinion-poll.functions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export function OpinionPoll() {
  const { t, dir, locale } = useLocale();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const reset = () => {
    setRating(null);
    setFeedback("");
    setSubmitted(false);
    setIsSubmitting(false);
    setError("");
  };

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
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) reset();
      }}
    >
      <DialogTrigger asChild>
        <button className="group flex w-full items-start gap-3 rounded-xl border border-primary/15 bg-card p-4 text-start text-primary shadow-elevated transition-transform hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
          <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground shadow-soft">
            <Star className="h-5 w-5 fill-current" />
          </span>
          <span className="min-w-0">
            <span className="block text-base font-bold leading-6 text-primary">
              {t("poll.footerTitle")}
            </span>
            <span className="mt-1 block text-sm leading-6 text-foreground/75">
              {t("poll.footerDesc")}
            </span>
            <span className="mt-2 inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
              {t("poll.footerTime")}
            </span>
          </span>
        </button>
      </DialogTrigger>
      <DialogContent dir={dir} className="sm:max-w-md">
        {submitted ? (
          <div className="py-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MessageSquareText className="h-6 w-6" />
            </div>
            <DialogTitle className="text-xl font-bold">{t("poll.thanksTitle")}</DialogTitle>
            <DialogDescription className="mt-3 leading-7">{t("poll.thanksDesc")}</DialogDescription>
            <Button className="mt-6" onClick={() => setOpen(false)}>
              {t("common.close")}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <DialogHeader className={locale === "ar" ? "text-right" : "text-left"}>
              <DialogTitle className="text-xl font-bold">{t("poll.title")}</DialogTitle>
              <DialogDescription className="leading-7">{t("poll.desc")}</DialogDescription>
            </DialogHeader>

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
                      className={`flex h-12 items-center justify-center rounded-lg border text-base font-bold transition-colors ${
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
                className="min-h-24 resize-none"
              />
            </label>

            {error && (
              <p className="rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">
                {error}
              </p>
            )}

            <DialogFooter className="gap-2 sm:gap-0">
              <Button type="submit" disabled={rating == null || isSubmitting}>
                {isSubmitting ? t("poll.submitting") : t("poll.submit")}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
