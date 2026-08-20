import { createServerFn } from "@tanstack/react-start";

export interface AdminUser {
  id: number;
  email: string;
  display_name: string | null;
}

export const adminLogin = createServerFn({ method: "POST" })
  .validator((d: { email: string; password: string }) => d)
  .handler(async ({ data }): Promise<AdminUser | null> => {
    const sql = (await import("mssql")).default;
    const { getPool, sha256 } = await import("./db.server");
    const pool = await getPool();
    const result = await pool
      .request()
      .input("email", sql.NVarChar(255), data.email)
      .input("hash", sql.NVarChar(255), sha256(data.password))
      .query(
        "SELECT id, email, display_name FROM admin_users WHERE email = @email AND password_hash = @hash",
      );
    return result.recordset[0] ?? null;
  });
