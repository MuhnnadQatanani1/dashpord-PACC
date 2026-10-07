import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { BookOpen, Info, Quote, User } from "lucide-react";

import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { listPublishedStories, type StoryItem } from "@/lib/stories.server";
import { getLocale, useLocale, dictionaries } from "@/i18n";

export const Route = createFileRoute("/stories")({
  component: Stories,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ["published-stories"],
      queryFn: () => listPublishedStories(),
    });
  },
  head: () => {
    const dict = dictionaries[getLocale()];
    return {
      meta: [
        { title: dict["meta.storiesTitle"] },
        { name: "description", content: dict["meta.storiesDesc"] },
      ],
    };
  },
});

function Stories() {
  const { t, locale } = useLocale();
  const fetchStories = useServerFn(listPublishedStories);
  const { data: stories } = useSuspenseQuery({
    queryKey: ["published-stories"],
    queryFn: fetchStories,
  });

  const pick = (ar: string | null, en: string | null) =>
    (locale === "ar" ? ar || en : en || ar) ?? "";

  return (
    <SiteLayout>
      <PageHeader
        eyebrow={t("stories.eyebrow")}
        title={t("stories.title")}
        description={t("stories.desc")}
      />
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        {stories.length === 0 ? (
          <div className="note">
            <Info className="note-icon" />
            <p className="note-line">{t("stories.empty")}</p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {stories.map((s: StoryItem) => {
              const authorName = pick(s.author_name_ar, s.author_name_en);
              const authorTitle = pick(s.author_title_ar, s.author_title_en);
              const highlight = pick(s.highlight_ar, s.highlight_en);
              const callout = pick(s.callout_ar, s.callout_en);
              return (
                <article key={s.id} className="card flex h-full flex-col">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-semibold text-heading">
                      <BookOpen className="h-3.5 w-3.5" />
                      {t("stories.badge")}
                    </span>
                    {s.year_range && (
                      <span className="text-xs text-muted-foreground">{s.year_range}</span>
                    )}
                  </div>

                  <h2 className="text-xl font-extrabold leading-relaxed text-heading">
                    {pick(s.title_ar, s.title_en)}
                  </h2>
                  <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-foreground/90">
                    {pick(s.body_ar, s.body_en)}
                  </p>

                  {highlight && (
                    <blockquote className="mt-4 rounded-xl border border-border bg-surface-muted p-4">
                      <Quote className="mb-2 h-5 w-5 text-accent" />
                      <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/90">
                        {highlight}
                      </p>
                    </blockquote>
                  )}
                  {callout && (
                    <div className="mt-4 rounded-xl border border-border bg-accent-soft p-4">
                      <p className="whitespace-pre-line text-sm font-medium leading-relaxed text-heading">
                        {callout}
                      </p>
                    </div>
                  )}

                  {(authorName || authorTitle) && (
                    <div className="mt-auto flex items-center gap-3 border-t border-border pt-4">
                      {s.author_image_url ? (
                        <img
                          src={s.author_image_url}
                          alt={authorName}
                          className="h-12 w-12 shrink-0 rounded-full border border-border object-cover"
                        />
                      ) : (
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                          <User className="h-6 w-6" />
                        </span>
                      )}
                      <div>
                        {authorName && (
                          <div className="text-sm font-semibold text-heading">{authorName}</div>
                        )}
                        {authorTitle && (
                          <div className="text-xs text-muted-foreground">{authorTitle}</div>
                        )}
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
