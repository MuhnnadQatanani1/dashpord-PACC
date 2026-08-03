import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";

export interface DataStory {
  id: string;
  slug: string;
  title: string;
  summary: string;
  headline: string;
  headline_label: string;
  series: { label: string; value: number }[];
  display_order: number;
}

export const getStories = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await (supabase as any)
    .from("data_stories")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Failed to fetch data stories:", error);
    throw new Error(error.message);
  }

  return ((data as DataStory[]) ?? []).map((s) => ({
    ...s,
    series: Array.isArray(s.series) ? s.series : [],
  }));
});
