import { createServerFn } from "@tanstack/react-start";
import sql from "mssql";
import { requireAdmin } from "./admin-session.server";
import { getPool } from "./db.server";

export type StoryItem = {
  id: string;
  title_ar: string;
  title_en: string;
  body_ar: string;
  body_en: string;
  highlight_ar: string | null;
  highlight_en: string | null;
  callout_ar: string | null;
  callout_en: string | null;
  author_name_ar: string | null;
  author_name_en: string | null;
  author_title_ar: string | null;
  author_title_en: string | null;
  author_image_url: string | null;
  year_range: string | null;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

function normalizeStoryRow(row: Record<string, unknown>): StoryItem {
  return {
    id: String(row.id ?? ""),
    title_ar: String(row.title_ar ?? ""),
    title_en: String(row.title_en ?? ""),
    body_ar: String(row.body_ar ?? ""),
    body_en: String(row.body_en ?? ""),
    highlight_ar: row.highlight_ar ? String(row.highlight_ar) : null,
    highlight_en: row.highlight_en ? String(row.highlight_en) : null,
    callout_ar: row.callout_ar ? String(row.callout_ar) : null,
    callout_en: row.callout_en ? String(row.callout_en) : null,
    author_name_ar: row.author_name_ar ? String(row.author_name_ar) : null,
    author_name_en: row.author_name_en ? String(row.author_name_en) : null,
    author_title_ar: row.author_title_ar ? String(row.author_title_ar) : null,
    author_title_en: row.author_title_en ? String(row.author_title_en) : null,
    author_image_url: row.author_image_url ? String(row.author_image_url) : null,
    year_range: row.year_range ? String(row.year_range) : null,
    is_published: Boolean(row.is_published),
    display_order: Number(row.display_order ?? 0),
    created_at:
      row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at ?? ""),
    updated_at:
      row.updated_at instanceof Date ? row.updated_at.toISOString() : String(row.updated_at ?? ""),
  };
}

export const listStories = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const pool = await getPool();
    const result = await pool.request().query(`
      SELECT * FROM stories
      ORDER BY display_order ASC, created_at DESC
    `);
    return (result.recordset || []).map((r: Record<string, unknown>) => normalizeStoryRow(r));
  } catch (e) {
    console.error("Failed to list stories", e);
    return [];
  }
});

export const listPublishedStories = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const pool = await getPool();
    const result = await pool.request().query(`
      SELECT * FROM stories
      WHERE is_published = 1
      ORDER BY display_order ASC, created_at DESC
    `);
    return (result.recordset || []).map((r: Record<string, unknown>) => normalizeStoryRow(r));
  } catch (e) {
    console.error("Failed to list published stories", e);
    return [];
  }
});

export const getStory = createServerFn({ method: "GET" })
  .validator((v: { id: string }) => v)
  .handler(async ({ data }) => {
    try {
      const pool = await getPool();
      const result = await pool
        .request()
        .input("id", sql.UniqueIdentifier, data.id)
        .query(`SELECT * FROM stories WHERE id = @id`);
      const row = result.recordset?.[0];
      return row ? normalizeStoryRow(row) : null;
    } catch (e) {
      console.error("Failed to get story", e);
      return null;
    }
  });

export const createStory = createServerFn({ method: "POST" })
  .validator((v: Partial<StoryItem>) => v)
  .handler(async ({ data }) => {
    await requireAdmin();
    try {
      const pool = await getPool();
      const req = pool.request();
      req.input("title_ar", sql.NVarChar(sql.MAX), data.title_ar ?? "");
      req.input("title_en", sql.NVarChar(sql.MAX), data.title_en ?? "");
      req.input("body_ar", sql.NVarChar(sql.MAX), data.body_ar ?? "");
      req.input("body_en", sql.NVarChar(sql.MAX), data.body_en ?? "");
      req.input("highlight_ar", sql.NVarChar(sql.MAX), data.highlight_ar ?? null);
      req.input("highlight_en", sql.NVarChar(sql.MAX), data.highlight_en ?? null);
      req.input("callout_ar", sql.NVarChar(sql.MAX), data.callout_ar ?? null);
      req.input("callout_en", sql.NVarChar(sql.MAX), data.callout_en ?? null);
      req.input("author_name_ar", sql.NVarChar(200), data.author_name_ar ?? null);
      req.input("author_name_en", sql.NVarChar(200), data.author_name_en ?? null);
      req.input("author_title_ar", sql.NVarChar(200), data.author_title_ar ?? null);
      req.input("author_title_en", sql.NVarChar(200), data.author_title_en ?? null);
      req.input("author_image_url", sql.NVarChar(500), data.author_image_url ?? null);
      req.input("year_range", sql.NVarChar(50), data.year_range ?? null);
      req.input("is_published", sql.Bit, data.is_published ? 1 : 0);
      req.input("display_order", sql.Int, data.display_order ?? 0);
      const result = await req.query(`
        INSERT INTO stories (
          title_ar, title_en, body_ar, body_en,
          highlight_ar, highlight_en, callout_ar, callout_en,
          author_name_ar, author_name_en, author_title_ar, author_title_en,
          author_image_url, year_range, is_published, display_order
        )
        OUTPUT inserted.*
        VALUES (
          @title_ar, @title_en, @body_ar, @body_en,
          @highlight_ar, @highlight_en, @callout_ar, @callout_en,
          @author_name_ar, @author_name_en, @author_title_ar, @author_title_en,
          @author_image_url, @year_range, @is_published, @display_order
        )
      `);
      const row = result.recordset?.[0];
      return row ? normalizeStoryRow(row) : null;
    } catch (e) {
      console.error("Failed to create story", e);
      throw e;
    }
  });

export const updateStory = createServerFn({ method: "POST" })
  .validator((v: { id: string } & Partial<StoryItem>) => v)
  .handler(async ({ data }) => {
    await requireAdmin();
    try {
      const pool = await getPool();
      const req = pool.request();
      req.input("id", sql.UniqueIdentifier, data.id);
      req.input("title_ar", sql.NVarChar(sql.MAX), data.title_ar ?? "");
      req.input("title_en", sql.NVarChar(sql.MAX), data.title_en ?? "");
      req.input("body_ar", sql.NVarChar(sql.MAX), data.body_ar ?? "");
      req.input("body_en", sql.NVarChar(sql.MAX), data.body_en ?? "");
      req.input("highlight_ar", sql.NVarChar(sql.MAX), data.highlight_ar ?? null);
      req.input("highlight_en", sql.NVarChar(sql.MAX), data.highlight_en ?? null);
      req.input("callout_ar", sql.NVarChar(sql.MAX), data.callout_ar ?? null);
      req.input("callout_en", sql.NVarChar(sql.MAX), data.callout_en ?? null);
      req.input("author_name_ar", sql.NVarChar(200), data.author_name_ar ?? null);
      req.input("author_name_en", sql.NVarChar(200), data.author_name_en ?? null);
      req.input("author_title_ar", sql.NVarChar(200), data.author_title_ar ?? null);
      req.input("author_title_en", sql.NVarChar(200), data.author_title_en ?? null);
      req.input("author_image_url", sql.NVarChar(500), data.author_image_url ?? null);
      req.input("year_range", sql.NVarChar(50), data.year_range ?? null);
      req.input("is_published", sql.Bit, data.is_published ? 1 : 0);
      req.input("display_order", sql.Int, data.display_order ?? 0);
      const result = await req.query(`
        UPDATE stories
        SET title_ar=@title_ar, title_en=@title_en, body_ar=@body_ar, body_en=@body_en,
            highlight_ar=@highlight_ar, highlight_en=@highlight_en, callout_ar=@callout_ar, callout_en=@callout_en,
            author_name_ar=@author_name_ar, author_name_en=@author_name_en,
            author_title_ar=@author_title_ar, author_title_en=@author_title_en,
            author_image_url=@author_image_url, year_range=@year_range,
            is_published=@is_published, display_order=@display_order,
            updated_at = GETDATE()
        OUTPUT inserted.*
        WHERE id = @id
      `);
      const row = result.recordset?.[0];
      return row ? normalizeStoryRow(row) : null;
    } catch (e) {
      console.error("Failed to update story", e);
      throw e;
    }
  });

export const deleteStory = createServerFn({ method: "POST" })
  .validator((v: { id: string }) => v)
  .handler(async ({ data }) => {
    await requireAdmin();
    try {
      const pool = await getPool();
      await pool
        .request()
        .input("id", sql.UniqueIdentifier, data.id)
        .query(`DELETE FROM stories WHERE id = @id`);
      return { success: true };
    } catch (e) {
      console.error("Failed to delete story", e);
      throw e;
    }
  });
