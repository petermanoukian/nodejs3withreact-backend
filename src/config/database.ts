// src/config/database.ts
import "./env";
import { createPool } from "mysql2/promise";
import { config } from "./index"; 


console.log("✅ DB_CA_CERT loaded:", !!process.env.DB_CA_CERT ? "YES" : "NO");
console.log("CA Length:", process.env.DB_CA_CERT?.length || 0); 

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
    //ca: process.env.DB_CA_CERT!,
    rejectUnauthorized: true,
    minVersion: 'TLSv1.2'
  },
});


export default pool;