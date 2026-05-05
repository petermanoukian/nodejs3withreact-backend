import pool from "@config/database";
export class UserQuery {
    async findByEmail(email) {
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ? LIMIT 1", [email]);
        return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    }
    async findByUsername(username) {
        const [rows] = await pool.query("SELECT * FROM users WHERE username = ? LIMIT 1", [username]);
        return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    }
    async findUserById(userId) {
        const [rows] = await pool.query("SELECT * FROM users WHERE id = ? LIMIT 1", [userId]);
        return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    }
    async findByIdentifier(identifier) {
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ? OR username = ? LIMIT 1", [identifier, identifier]);
        return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    }
    async updateRememberToken(userId, token) {
        await pool.query("UPDATE users SET remember_token = ? WHERE id = ?", [token, userId]);
    }
}
//# sourceMappingURL=UserQuery.js.map