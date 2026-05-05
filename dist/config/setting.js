// src/config/setting.ts
import "./env";
function requireEnv(key) {
    const value = process.env[key];
    if (!value)
        throw new Error(`Missing required env variable: ${key}`);
    return value;
}
export const setting = {
    jwtSecret: requireEnv("JWT_SECRET"),
    jwtExpiresIn: "2h",
    corsOrigin: requireEnv("CORS_ORIGIN"), // ✅ new entry
};
//# sourceMappingURL=setting.js.map