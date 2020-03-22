import connect, { sql } from "@databases/pg";

const db = connect();
async function authenticate() {
  console.log("connected");
  return await db.query(sql`SELECT 1 + 1 AS result`);
}

export { db, sql, authenticate };
