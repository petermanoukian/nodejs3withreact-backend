"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/config/database.ts
require("./env"); // must be first
const promise_1 = require("mysql2/promise");
const index_1 = require("./index");
const pool = (0, promise_1.createPool)({
    host: index_1.config.db.host,
    port: index_1.config.db.port,
    user: index_1.config.db.user,
    password: index_1.config.db.password,
    database: index_1.config.db.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
exports.default = pool;
//# sourceMappingURL=database.js.map