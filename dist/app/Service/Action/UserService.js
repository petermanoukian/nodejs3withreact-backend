"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const UserQuery_1 = require("../../Repository/Queries/Admin/UserQuery");
class UserService {
    userRepo;
    constructor() {
        this.userRepo = new UserQuery_1.UserQuery();
    }
    async login(identifier, password) {
        const user = await this.userRepo.findByIdentifier(identifier);
        if (!user)
            return null;
        const isValid = await this.verifyPassword(password, user.password);
        return isValid ? user : null;
    }
    async rememberUser(userId, token) {
        await this.userRepo.updateRememberToken(userId, token);
    }
    async getUserByEmail(email) {
        return this.userRepo.findByEmail(email);
    }
    async getUserByUsername(username) {
        return this.userRepo.findByUsername(username);
    }
    async findUserById(userId) {
        return this.userRepo.findUserById(userId);
    }
    async verifyPassword(plain, hashed) {
        const bcrypt = await import("bcrypt");
        return bcrypt.compare(plain, hashed);
    }
}
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map