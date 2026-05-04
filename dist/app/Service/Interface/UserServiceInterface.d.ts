import { User } from "../../Model/Admin/User.model";
export interface UserServiceInterface {
    /**
     * Attempt login using either email or username.
     */
    login(identifier: string, password: string): Promise<User | null>;
    /**
     * Remember a user session by storing a token.
     */
    rememberUser(userId: number, token: string): Promise<void>;
    /**
     * Find a user directly by email.
     */
    getUserByEmail(email: string): Promise<User | null>;
    /**
     * Find a user directly by username.
     */
    getUserByUsername(username: string): Promise<User | null>;
    findUserById(userId: number): Promise<User | null>;
}
//# sourceMappingURL=UserServiceInterface.d.ts.map