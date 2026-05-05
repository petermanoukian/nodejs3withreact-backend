// src/config/database.ts
import "./env"; // must be first
import { createPool } from "mysql2/promise";
import { config } from "./index";
const pool = createPool({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
export default pool;
//# sourceMappingURL=database.js.map