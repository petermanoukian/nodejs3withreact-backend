import pool from "@config/database";
import { User } from "@Model/Admin/User.model";
import { UserInterface } from "@Repository/Interface/Admin/UserInterface";

export class UserQuery implements UserInterface {
  async findByEmail(email: string): Promise<User | null> {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ? LIMIT 1",
      [email]
    );
    return Array.isArray(rows) && rows.length > 0 ? (rows[0] as User) : null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE username = ? LIMIT 1",
      [username]
    );
    return Array.isArray(rows) && rows.length > 0 ? (rows[0] as User) : null;
  }

  async findUserById(userId: number): Promise<User | null> {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE id = ? LIMIT 1",
      [userId]
    );
    return Array.isArray(rows) && rows.length > 0 ? (rows[0] as User) : null;
  }

  async findByIdentifier(identifier: string): Promise<User | null> {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ? OR username = ? LIMIT 1",
      [identifier, identifier]
    );
    return Array.isArray(rows) && rows.length > 0 ? (rows[0] as User) : null;
  }

  async updateRememberToken(userId: number, token: string | null): Promise<void> {
    await pool.query(
      "UPDATE users SET remember_token = ? WHERE id = ?",
      [token, userId]
    );
  }
}

