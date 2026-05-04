"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSeeder = void 0;
const database_1 = __importDefault(require("../../config/database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserSeeder {
    static async run() {
        // Hash the password
        const hashedPassword = await bcrypt_1.default.hash("12345678", 10);
        // Insert the admin user
        await database_1.default.query(`INSERT INTO users (fullname, email, username, password, remember_token)
       VALUES (?, ?, ?, ?, NULL)`, ["Admin", "admin@admin.com", "admin", hashedPassword]);
        console.log("✅ Admin user seeded successfully");
    }
}
exports.UserSeeder = UserSeeder;
//# sourceMappingURL=UserSeeder.js.map