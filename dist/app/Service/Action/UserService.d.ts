import { User } from "@Model/Admin/User.model";
import { UserServiceInterface } from "@ServiceInterface/UserServiceInterface";
export declare class UserService implements UserServiceInterface {
    private userRepo;
    constructor();
    login(identifier: string, password: string): Promise<User | null>;
    rememberUser(userId: number, token: string): Promise<void>;
    getUserByEmail(email: string): Promise<User | null>;
    getUserByUsername(username: string): Promise<User | null>;
    findUserById(userId: number): Promise<User | null>;
    private verifyPassword;
}
//# sourceMappingURL=UserService.d.ts.map