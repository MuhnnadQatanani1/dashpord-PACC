import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BookOpen, Loader2, Pencil, Plus, Save, Trash2 } from "lucide-react";

import { useLocale } from "@/i18n";
import {
  createStory,
  deleteStory,
  listStories,
  updateStory,
  type StoryItem,
} from "@/lib/stories.server";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type StoryFormState = {
  title_ar: string;
  title_en: string;
  body_ar: string;
  body_en: string;
  highlight_ar: string;
  highlight_en: string;
  callout_ar: string;
  callout_en: string;
  author_name_ar: string;
  author_name_en: string;
  author_title_ar: string;
  author_title_en: string;
  author_image_url: string;
  year_range: string;
  display_order: string;
  is_published: boolean;
};

const EMPTY_FORM: StoryFormState = {
  title_ar: "",
  title_en: "",
  body_ar: "",
  body_en: "",
  highlight_ar: "",
  highlight_en: "",
  callout_ar: "",
  callout_en: "",
  author_name_ar: "",
  author_name_en: "",
  author_title_ar: "",
  author_title_en: "",
  author_image_url: "",
  year_range: "",
  display_order: "0",
  is_published: true,
};

function formFromStory(story: StoryItem): StoryFormState {
  return {
    title_ar: story.title_ar,
    title_en: story.title_en,
    body_ar: story.body_ar,
    body_en: story.body_en,
    highlight_ar: story.highlight_ar ?? "",
    highlight_en: story.highlight_en ?? "",
    callout_ar: story.callout_ar ?? "",
    callout_en: story.callout_en ?? "",
    author_name_ar: story.author_name_ar ?? "",
    author_name_en: story.author_name_en ?? "",
    author_title_ar: story.author_title_ar ?? "",
    author_title_en: story.author_title_en ?? "",
    author_image_url: story.author_image_url ?? "",
    year_range: story.year_range ?? "",
    display_order: String(story.display_order),
    is_published: story.is_published,
  };
}

export function StoriesPanel() {
  const { t } = useLocale();
  const queryClient = useQueryClient();

  const fetchStories = useServerFn(listStories);
  const saveStory = useServerFn(createStory);
  const editStory = useServerFn(updateStory);
  const removeStory = useServerFn(deleteStory);

  const { data: stories = [], isFetching } = useQuery({
    queryKey: ["stories", "admin"],
    queryFn: () => fetchStories({ data: undefined }),
  });

  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<StoryItem | null>(null);
  const [deleting, setDeleting] = useState<StoryItem | null>(null);
  const [form, setForm] = useState<StoryFormState>(EMPTY_FORM);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const inputCls =
    "focus-ring w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground";
  const areaCls = `${inputCls} min-h-28 resize-y`;

  function set<K extends keyof StoryFormState>(key: K, value: StoryFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function startAdd() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setStatus(null);
    setAdding(true);
  }

  function startEdit(story: StoryItem) {
    setAdding(false);
    setEditing(story);
    setForm(formFromStory(story));
    setStatus(null);
  }

  function cancel() {
    setAdding(false);
    setEditing(null);
    setStatus(null);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setStatus(null);
    try {
      const payload = {
        ...form,
        display_order: Number(form.display_order) || 0,
        year_range: form.year_range.trim() || null,
        author_image_url: form.author_image_url.trim() || null,
      };
      if (editing) {
        await editStory({ data: { id: editing.id, ...payload } });
      } else {
        await saveStory({ data: payload });
      }
      await queryClient.invalidateQueries({ queryKey: ["stories"] });
      setStatus(t("admin.storySaved"));
      setEditing(null);
      setAdding(false);
      setForm(EMPTY_FORM);
    } catch {
      setStatus(t("admin.storyError"));
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    if (!deleting) return;
    await removeStory({ data: { id: deleting.id } });
    await queryClient.invalidateQueries({ queryKey: ["stories"] });
    if (editing?.id === deleting.id) cancel();
    setDeleting(null);
  }

  const showForm = adding || editing;

  return (
    <section className="mb-8 rounded-2xl border border-border bg-card p-6 shadow-soft">
      <div className="flex items-center gap-2 text-lg font-bold text-primary">
        <BookOpen className="h-5 w-5 text-accent" />
        {t("admin.storiesTitle")}
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{t("admin.storiesDesc")}</p>

      <div className="mt-5 mb-4 flex flex-wrap items-center gap-3">
        {!showForm && (
          <button
            type="button"
            onClick={startAdd}
            className="focus-ring inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
          >
            <Plus className="h-4 w-4" />
            {t("admin.storyAdd")}
          </button>
        )}
        {status && <span className="text-sm text-muted-foreground">{status}</span>}
      </div>

      {showForm && (
        <form onSubmit={submit} className="mb-6 rounded-xl border border-accent/40 bg-surface p-5">
          <h3 className="mb-4 text-lg font-bold text-primary">
            {editing ? t("common.edit") : t("admin.storyAdd")}
          </h3>

          <div className="grid gap-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-medium">
                <span>{t("admin.storyTitleAr")}</span>
                <input
                  value={form.title_ar}
                  onChange={(e) => set("title_ar", e.target.value)}
                  className={inputCls}
                  required
                  dir="rtl"
                />
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                <span>{t("admin.storyTitleEn")}</span>
                <input
                  value={form.title_en}
                  onChange={(e) => set("title_en", e.target.value)}
                  className={inputCls}
                  dir="ltr"
                />
              </label>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-medium">
                <span>{t("admin.storyBodyAr")}</span>
                <textarea
                  value={form.body_ar}
                  onChange={(e) => set("body_ar", e.target.value)}
                  className={areaCls}
                  required
                  dir="rtl"
                />
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                <span>{t("admin.storyBodyEn")}</span>
                <textarea
                  value={form.body_en}
                  onChange={(e) => set("body_en", e.target.value)}
                  className={areaCls}
                  dir="ltr"
                />
              </label>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-medium">
                <span>{t("admin.storyHighlightAr")}</span>
                <textarea
                  value={form.highlight_ar}
                  onChange={(e) => set("highlight_ar", e.target.value)}
                  className={areaCls}
                  dir="rtl"
                />
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                <span>{t("admin.storyHighlightEn")}</span>
                <textarea
                  value={form.highlight_en}
                  onChange={(e) => set("highlight_en", e.target.value)}
                  className={areaCls}
                  dir="ltr"
                />
              </label>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-medium">
                <span>{t("admin.storyCalloutAr")}</span>
                <textarea
                  value={form.callout_ar}
                  onChange={(e) => set("callout_ar", e.target.value)}
                  className={areaCls}
                  dir="rtl"
                />
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                <span>{t("admin.storyCalloutEn")}</span>
                <textarea
                  value={form.callout_en}
                  onChange={(e) => set("callout_en", e.target.value)}
                  className={areaCls}
                  dir="ltr"
                />
              </label>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-medium">
                <span>{t("admin.storyAuthorNameAr")}</span>
                <input
                  value={form.author_name_ar}
                  onChange={(e) => set("author_name_ar", e.target.value)}
                  className={inputCls}
                  dir="rtl"
                />
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                <span>{t("admin.storyAuthorNameEn")}</span>
                <input
                  value={form.author_name_en}
                  onChange={(e) => set("author_name_en", e.target.value)}
                  className={inputCls}
                  dir="ltr"
                />
              </label>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-medium">
                <span>{t("admin.storyAuthorTitleAr")}</span>
                <input
                  value={form.author_title_ar}
                  onChange={(e) => set("author_title_ar", e.target.value)}
                  className={inputCls}
                  dir="rtl"
                />
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                <span>{t("admin.storyAuthorTitleEn")}</span>
                <input
                  value={form.author_title_en}
                  onChange={(e) => set("author_title_en", e.target.value)}
                  className={inputCls}
                  dir="ltr"
                />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <label className="grid gap-1.5 text-sm font-medium">
                <span>{t("admin.storyAuthorImage")}</span>
                <input
                  value={form.author_image_url}
                  onChange={(e) => set("author_image_url", e.target.value)}
                  className={inputCls}
                  placeholder="/uploads/author.png"
                  dir="ltr"
                />
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                <span>{t("admin.storyYearRange")}</span>
                <input
                  value={form.year_range}
                  onChange={(e) => set("year_range", e.target.value)}
                  className={inputCls}
                  placeholder="2022 – 2025"
                />
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                <span>{t("admin.storyOrder")}</span>
                <input
                  type="number"
                  value={form.display_order}
                  onChange={(e) => set("display_order", e.target.value)}
                  className={inputCls}
                  dir="ltr"
                />
              </label>
            </div>

            <label className="flex items-center gap-2 text-sm font-medium">
              <input
                type="checkbox"
                checked={form.is_published}
                onChange={(e) => set("is_published", e.target.checked)}
                className="h-4 w-4 accent-accent"
              />
              {t("admin.storyPublished")}
            </label>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="submit"
                disabled={busy || !form.title_ar.trim() || !form.body_ar.trim()}
                className="focus-ring inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
              >
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {editing ? t("common.update") : t("common.save")}
              </button>
              <button
                type="button"
                onClick={cancel}
                className="focus-ring rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary"
              >
                {t("common.cancel")}
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="overflow-hidden rounded-xl border border-border">
        <div className="bg-surface px-4 py-3 text-sm font-bold text-primary">
          {t("admin.storiesSavedEntries")}
        </div>
        <div className="max-h-96 overflow-auto">
          {isFetching ? (
            <div className="p-4 text-sm text-muted-foreground">{t("common.loading")}</div>
          ) : stories.length === 0 ? (
            <div className="p-4 text-sm text-muted-foreground">{t("admin.storiesEmpty")}</div>
          ) : (
            <table className="w-full min-w-[760px] text-sm">
              <thead className="bg-secondary/60 text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 text-start">{t("admin.storyTitleAr")}</th>
                  <th className="px-3 py-2 text-start">{t("admin.storyAuthorNameAr")}</th>
                  <th className="px-3 py-2 text-start">{t("admin.storyOrder")}</th>
                  <th className="px-3 py-2 text-start">{t("admin.storyPublished")}</th>
                  <th className="px-3 py-2 text-start">{t("admin.actions")}</th>
                </tr>
              </thead>
              <tbody>
                {stories.map((story: StoryItem) => (
                  <tr key={story.id} className="border-t border-border">
                    <td className="max-w-[280px] px-3 py-2 font-medium text-foreground">
                      <span className="line-clamp-2">{story.title_ar}</span>
                    </td>
                    <td className="px-3 py-2">{story.author_name_ar ?? "-"}</td>
                    <td className="px-3 py-2 font-mono">{story.display_order}</td>
                    <td className="px-3 py-2">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                          story.is_published
                            ? "bg-success/15 text-success"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {story.is_published ? t("reports.published") : t("reports.draft")}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => startEdit(story)}
                          className="focus-ring rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-primary"
                          aria-label={t("common.edit")}
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleting(story)}
                          className="focus-ring rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                          aria-label={t("common.delete")}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <AlertDialog
        open={!!deleting}
        onOpenChange={(open) => {
          if (!open) setDeleting(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("common.delete")}</AlertDialogTitle>
            <AlertDialogDescription>{deleting?.title_ar || ""}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              <Trash2 className="h-4 w-4" />
              {t("common.delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
