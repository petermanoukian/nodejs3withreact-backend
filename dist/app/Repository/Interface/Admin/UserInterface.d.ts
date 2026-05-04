import { User } from "../../../Model/Admin/User.model";
export interface UserInterface {
    /**
     * Find a user by email (used for login).
     */
    findByEmail(email: string): Promise<User | null>;
    /**
     * Find a user by username (alternative login).
     */
    findByUsername(username: string): Promise<User | null>;
    findUserById(userId: number): Promise<User | null>;
    findByIdentifier(identifier: string): Promise<User | null>;
    /**
     * Update the remember_token for a user.
     * Used when "remember me" is checked.
     */
    updateRememberToken(userId: number, token: string | null): Promise<void>;
}
//# sourceMappingURL=UserInterface.d.ts.map