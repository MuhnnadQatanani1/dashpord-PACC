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
