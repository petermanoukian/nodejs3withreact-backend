// src/config/database.ts
import "./env";
import { createPool } from "mysql2/promise";
import { config } from "./index";
import fs from "fs";
import path from "path";

const caPath = path.join(__dirname, "isrgrootx1.pem");   // ← Correct relative path// adjust path if needed

const pool = createPool({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

  ssl: {
    ca: fs.readFileSync(caPath),
    rejectUnauthorized: true,
  },
});

export default pool;