import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useServerFn } from "@tanstack/react-start";
import { useSuspenseQuery } from "@tanstack/react-query";

const testDb = createServerFn({ method: "GET" })
  .validator(() => ({}))
  .handler(async () => {
    const results: Record<string, unknown> = {};

    const key = ["DATABASE", "_URL"].join("");
    const dbUrl = process.env[key];
    results.envVar = {
      exists: !!dbUrl,
      prefix: dbUrl ? dbUrl.substring(0, 40) + "..." : "NOT SET",
    };

    try {
      const sql = (await import("mssql")).default;
      results.mssql = { loaded: true };

      if (!dbUrl) {
        results.connection = { error: "DATABASE_URL is not set" };
      } else {
        try {
          const pool = new sql.ConnectionPool(dbUrl);
          await pool.connect();
          results.connection = { success: true };

          try {
            const r = await pool.request().query("SELECT COUNT(*) as cnt FROM reports");
            results.query = { success: true, count: r.recordset[0].cnt };
          } catch (qErr) {
            results.query = {
              error: qErr instanceof Error ? qErr.message : String(qErr),
            };
          }
          await pool.close();
        } catch (cErr) {
          results.connection = {
            error: cErr instanceof Error ? cErr.message : String(cErr),
          };
        }
      }
    } catch (importErr) {
      results.mssql = {
        loaded: false,
        error: importErr instanceof Error ? importErr.message : String(importErr),
      };
    }

    return results;
  });

function RouteComponent() {
  const testFn = useServerFn(testDb);
  const { data } = useSuspenseQuery({
    queryKey: ["test-db"],
    queryFn: () => testFn({ data: {} }),
  });

  return (
    <div className="p-8 font-mono text-sm" dir="ltr">
      <h1 className="text-xl font-bold mb-4">DB Connection Debug</h1>
      <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-auto whitespace-pre-wrap">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

export const Route = createFileRoute("/test-db")({
  component: RouteComponent,
});
