"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setting = void 0;
// src/config/setting.ts
require("./env");
function requireEnv(key) {
    const value = process.env[key];
    if (!value)
        throw new Error(`Missing required env variable: ${key}`);
    return value;
}
exports.setting = {
    jwtSecret: requireEnv("JWT_SECRET"),
    jwtExpiresIn: "2h",
    corsOrigin: requireEnv("CORS_ORIGIN"), // ✅ new entry
};
//# sourceMappingURL=setting.js.map