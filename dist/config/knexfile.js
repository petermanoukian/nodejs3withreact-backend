"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/config/knexfile.ts
require("./env"); // must be first
const path_1 = __importDefault(require("path"));
const index_1 = require("./index");
exports.default = {
    client: "mysql2",
    connection: {
        host: index_1.config.db.host,
        port: index_1.config.db.port,
        user: index_1.config.db.user,
        password: index_1.config.db.password,
        database: index_1.config.db.database,
    },
    migrations: {
        directory: path_1.default.resolve(__dirname, "../database/migrations"),
        extension: "ts",
    },
};
//# sourceMappingURL=knexfile.js.map