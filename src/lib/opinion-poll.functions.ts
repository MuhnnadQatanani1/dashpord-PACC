import { createServerFn } from "@tanstack/react-start";

export interface OpinionPollInput {
  rating: number;
  feedback?: string;
  locale?: "ar" | "en";
  page_path?: string;
  user_agent?: string;
}

export const submitOpinionPoll = createServerFn({ method: "POST" })
  .validator((data: OpinionPollInput) => {
    const rating = Number(data.rating);
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      throw new Error("Rating must be an integer from 1 to 5.");
    }

    return {
      rating,
      feedback: data.feedback?.trim().slice(0, 2000) || null,
      locale: data.locale === "en" ? "en" : "ar",
      page_path: data.page_path?.slice(0, 1000) || null,
      user_agent: data.user_agent?.slice(0, 1000) || null,
    };
  })
  .handler(async ({ data }) => {
    const sql = (await import("mssql")).default;
    const { getPool } = await import("./db.server");
    const pool = await getPool();

    await pool
      .request()
      .input("rating", sql.Int, data.rating)
      .input("feedback", sql.NVarChar(sql.MAX), data.feedback)
      .input("locale", sql.NVarChar(5), data.locale)
      .input("page_path", sql.NVarChar(1000), data.page_path)
      .input("user_agent", sql.NVarChar(1000), data.user_agent)
      .query(
        `INSERT INTO opinion_poll_responses (rating, feedback, locale, page_path, user_agent)
         VALUES (@rating, @feedback, @locale, @page_path, @user_agent)`,
      );

    return { ok: true };
  });

export interface AdminOpinionPollResponse {
  id: number;
  rating: number;
  feedback: string | null;
  locale: "ar" | "en" | null;
  page_path: string | null;
  created_at: string | Date;
}

export interface AdminOpinionPollData {
  total: number;
  averageRating: number;
  highestRatingCount: number;
  highestRatingPercent: number;
  distribution: { rating: number; count: number; percent: number }[];
  responses: AdminOpinionPollResponse[];
}

export const getAdminOpinionPoll = createServerFn({ method: "GET" }).handler(
  async (): Promise<AdminOpinionPollData> => {
    const { requireAdmin } = await import("./admin-session.server");
    await requireAdmin();

    const { getPool } = await import("./db.server");
    const pool = await getPool();
    const [summaryResult, distributionResult, responseResult] = await Promise.all([
      pool.request().query(`
        SELECT COUNT(*) AS total,
               AVG(CAST(rating AS FLOAT)) AS averageRating,
               SUM(CASE WHEN rating = 5 THEN 1 ELSE 0 END) AS highestRatingCount
        FROM opinion_poll_responses
      `),
      pool
        .request()
        .query("SELECT rating, COUNT(*) AS count FROM opinion_poll_responses GROUP BY rating"),
      pool.request().query(`
        SELECT TOP (100) id, rating, feedback, locale, page_path, created_at
        FROM opinion_poll_responses
        ORDER BY created_at DESC, id DESC
      `),
    ]);

    const summary = summaryResult.recordset[0];
    const total = Number(summary?.total ?? 0);
    const highestRatingCount = Number(summary?.highestRatingCount ?? 0);
    const counts = new Map(
      (distributionResult.recordset as { rating: number; count: number }[]).map((row) => [
        Number(row.rating),
        Number(row.count),
      ]),
    );

    return {
      total,
      averageRating: Number(summary?.averageRating ?? 0),
      highestRatingCount,
      highestRatingPercent: total ? (highestRatingCount / total) * 100 : 0,
      distribution: [1, 2, 3, 4, 5].map((rating) => {
        const count = counts.get(rating) ?? 0;
        return { rating, count, percent: total ? (count / total) * 100 : 0 };
      }),
      responses: responseResult.recordset as AdminOpinionPollResponse[],
    };
  },
);
