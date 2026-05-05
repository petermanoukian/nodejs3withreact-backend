import { User } from "@Model/Admin/User.model";
import { UserInterface } from "@Repository/Interface/Admin/UserInterface";
export declare class UserQuery implements UserInterface {
    findByEmail(email: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
    findUserById(userId: number): Promise<User | null>;
    findByIdentifier(identifier: string): Promise<User | null>;
    updateRememberToken(userId: number, token: string | null): Promise<void>;
}
//# sourceMappingURL=UserQuery.d.ts.map