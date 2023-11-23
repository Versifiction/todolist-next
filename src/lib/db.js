import { Pool } from "pg";

let conn;

if (!conn) {
  conn = new Pool({
    host: "localhost",
    port: 5432,
    database: "v",
    user: "postgres",
    password: "admin",
  });
}

export default conn;
