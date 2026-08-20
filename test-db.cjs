const sql = require("mssql");
const cs = "Server=db64583.public.databaseasp.net;Database=db64583;User Id=db64583;Password=Bg9#%2DmPw6_;Encrypt=True;TrustServerCertificate=True;MultipleActiveResultSets=True;";
(async () => {
  try {
    const p = await sql.connect(cs);
    const r = await p.request().query("SELECT id, email, display_name FROM admin_users");
    console.log("OK! Users:", JSON.stringify(r.recordset));
    await p.close();
  } catch (e) { console.error("ERR:", e.message); }
})();
