import sql from "mssql";
import { createHash } from "crypto";

let _pool: sql.ConnectionPool | null = null;

function getConnectionString(): string | undefined {
  const key = ["DATABASE", "_URL"].join("");
  return process.env[key] as string | undefined;
}

function sha256(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

async function ensureTables(pool: sql.ConnectionPool) {
  await pool.request().query(`
    IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'reports')
    CREATE TABLE reports (
      id INT IDENTITY(1,1) PRIMARY KEY,
      category NVARCHAR(50) NOT NULL DEFAULT 'annual',
      title_ar NVARCHAR(500) NOT NULL,
      title_en NVARCHAR(500) NULL,
      description_ar NVARCHAR(MAX) NULL,
      description_en NVARCHAR(MAX) NULL,
      publish_date NVARCHAR(20) NOT NULL,
      pages INT NULL DEFAULT 0,
      size_mb FLOAT NULL DEFAULT 0,
      file_url NVARCHAR(1000) NULL,
      original_filename NVARCHAR(255) NULL,
      added_by NVARCHAR(255) NULL,
      is_published BIT NOT NULL DEFAULT 1,
      created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
      updated_at DATETIME2 NOT NULL DEFAULT GETDATE()
    );
  `);

  const cols = await pool
    .request()
    .query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'reports'");
  const colNames = cols.recordset.map((r: Record<string, unknown>) => r.COLUMN_NAME as string);
  if (!colNames.includes("file_data")) {
    await pool.request().query("ALTER TABLE reports ADD file_data VARBINARY(MAX) NULL");
  }
  if (!colNames.includes("file_mime")) {
    await pool.request().query("ALTER TABLE reports ADD file_mime NVARCHAR(100) NULL");
  }

  await pool.request().query(`
    IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'admin_users')
    CREATE TABLE admin_users (
      id INT IDENTITY(1,1) PRIMARY KEY,
      email NVARCHAR(255) NOT NULL UNIQUE,
      password_hash NVARCHAR(255) NOT NULL,
      display_name NVARCHAR(255) NULL,
      created_at DATETIME2 NOT NULL DEFAULT GETDATE()
    );
  `);

  const existing = await pool.request().query("SELECT COUNT(*) AS cnt FROM admin_users");
  if (existing.recordset[0].cnt === 0) {
    await pool
      .request()
      .input("email", sql.NVarChar(255), "admin@pacc.ps")
      .input("hash", sql.NVarChar(255), sha256("admin123"))
      .input("name", sql.NVarChar(255), "Admin")
      .query(
        "INSERT INTO admin_users (email, password_hash, display_name) VALUES (@email, @hash, @name)",
      );
  }

  await pool.request().query(`
    IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'opinion_poll_responses')
    CREATE TABLE opinion_poll_responses (
      id INT IDENTITY(1,1) PRIMARY KEY,
      rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
      feedback NVARCHAR(MAX) NULL,
      locale NVARCHAR(5) NULL,
      page_path NVARCHAR(1000) NULL,
      user_agent NVARCHAR(1000) NULL,
      created_at DATETIME2 NOT NULL DEFAULT GETDATE()
    );
  `);
}

export async function getPool(): Promise<sql.ConnectionPool> {
  if (_pool && _pool.connected) return _pool;
  const connectionString = getConnectionString();
  if (!connectionString) throw new Error("DATABASE_URL is not set");

  _pool = new sql.ConnectionPool(connectionString);
  await _pool.connect();
  await ensureTables(_pool);
  return _pool;
}

export { sha256 };
