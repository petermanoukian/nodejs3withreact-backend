"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserQuery = void 0;
const database_1 = __importDefault(require("../../../../config/database"));
class UserQuery {
    async findByEmail(email) {
        const [rows] = await database_1.default.query("SELECT * FROM users WHERE email = ? LIMIT 1", [email]);
        return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    }
    async findByUsername(username) {
        const [rows] = await database_1.default.query("SELECT * FROM users WHERE username = ? LIMIT 1", [username]);
        return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    }
    async findUserById(userId) {
        const [rows] = await database_1.default.query("SELECT * FROM users WHERE id = ? LIMIT 1", [userId]);
        return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    }
    async findByIdentifier(identifier) {
        const [rows] = await database_1.default.query("SELECT * FROM users WHERE email = ? OR username = ? LIMIT 1", [identifier, identifier]);
        return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    }
    async updateRememberToken(userId, token) {
        await database_1.default.query("UPDATE users SET remember_token = ? WHERE id = ?", [token, userId]);
    }
}
exports.UserQuery = UserQuery;
//# sourceMappingURL=UserQuery.js.map