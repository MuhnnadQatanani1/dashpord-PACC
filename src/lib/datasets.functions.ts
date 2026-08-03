import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";

export interface DatasetItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  updated: string;
  format: "CSV" | "XLSX" | "JSON";
  rows: number;
  file_url: string | null;
  original_filename: string | null;
}

export const getDatasets = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await (supabase as any)
    .from("datasets")
    .select("*")
    .order("rows", { ascending: false });

  if (error) {
    console.error("Failed to fetch datasets:", error);
    throw new Error(error.message);
  }

  return (data as DatasetItem[]) ?? [];
});
