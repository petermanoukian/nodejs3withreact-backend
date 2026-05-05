// src/config/knexfile.ts

import "./env";
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

    ssl: {
      ca: process.env.DB_CA_CERT?.replace(/\\n/g, "\n"),
      rejectUnauthorized: true,
      minVersion: "TLSv1.2",
    },
  },

  migrations: {
    directory: path.resolve(__dirname, "../database/migrations"),
    extension: "ts",
  },
};