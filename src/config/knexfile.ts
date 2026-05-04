// src/config/knexfile.ts
import "./env"; // must be first
import path from "path";
import { config } from "./index";

export default {
  client: "mysql2",
  connection: {
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
  },
  migrations: {
    directory: path.resolve(__dirname, "../database/migrations"),
    extension: "ts",
  },
};