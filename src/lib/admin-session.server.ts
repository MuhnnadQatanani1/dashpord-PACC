import { createHash, randomBytes } from "node:crypto";
import { deleteCookie, getCookie, setCookie } from "@tanstack/react-start/server";
import sql from "mssql";
import { getPool } from "./db.server";

const COOKIE_NAME = "pacc_admin_session";
const SESSION_DAYS = 7;

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  };
}

export async function startAdminSession(adminUserId: number) {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  const pool = await getPool();

  await pool
    .request()
    .input("token_hash", sql.NVarChar(128), hashToken(token))
    .input("admin_user_id", sql.Int, adminUserId)
    .input("expires_at", sql.DateTime2, expiresAt)
    .query(
      "INSERT INTO admin_sessions (token_hash, admin_user_id, expires_at) VALUES (@token_hash, @admin_user_id, @expires_at)",
    );

  setCookie(COOKIE_NAME, token, cookieOptions());
}

export async function getCurrentAdmin() {
  const token = getCookie(COOKIE_NAME);
  if (!token) return null;

  const pool = await getPool();
  const result = await pool
    .request()
    .input("token_hash", sql.NVarChar(128), hashToken(token))
    .query(
      `SELECT u.id, u.email, u.display_name
       FROM admin_sessions s
       INNER JOIN admin_users u ON u.id = s.admin_user_id
       WHERE s.token_hash = @token_hash AND s.expires_at > GETDATE()`,
    );

  return result.recordset[0] ?? null;
}

export async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error("Admin authentication required.");
  return admin as { id: number; email: string; display_name: string | null };
}

export async function endAdminSession() {
  const token = getCookie(COOKIE_NAME);
  if (token) {
    const pool = await getPool();
    await pool
      .request()
      .input("token_hash", sql.NVarChar(128), hashToken(token))
      .query("DELETE FROM admin_sessions WHERE token_hash = @token_hash");
  }
  deleteCookie(COOKIE_NAME, { path: "/" });
}
