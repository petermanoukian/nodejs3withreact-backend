import pool from "@config/database";
import bcrypt from "bcrypt";
export class UserSeeder {
    static async run() {
        // Hash the password
        const hashedPassword = await bcrypt.hash("12345678", 10);
        // Insert the admin user
        await pool.query(`INSERT INTO users (fullname, email, username, password, remember_token)
       VALUES (?, ?, ?, ?, NULL)`, ["Admin", "admin@admin.com", "admin", hashedPassword]);
        console.log("✅ Admin user seeded successfully");
    }
}
//# sourceMappingURL=UserSeeder.js.map