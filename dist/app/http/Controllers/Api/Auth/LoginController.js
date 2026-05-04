"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const express_validator_1 = require("express-validator");
const LoginRequest_1 = require("../../../Request/Auth/LoginRequest");
const UserService_1 = require("../../../../Service/Action/UserService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const setting_1 = require("../../../../../config/setting");
class LoginController {
    userService;
    static instance = new LoginController(); // 👈 add this
    constructor() {
        this.userService = new UserService_1.UserService();
    }
    /**
     * Handle login request
     */
    async login(req, res) {
        await Promise.all(LoginRequest_1.LoginRequest.map((rule) => rule.run(req)));
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        const { identifier, email, username, password, rememberMe } = req.body; // 👈 rememberMe
        const loginIdentifier = identifier || email || username;
        try {
            const user = await this.userService.login(loginIdentifier, password);
            if (!user) {
                res.status(401).json({ message: "Invalid credentials, what you provided is not valid AMIGO" });
                return;
            }
            req.session.userId = user.id;
            const options = {
                expiresIn: rememberMe ? "30d" : setting_1.setting.jwtExpiresIn, // 👈
            };
            const token = jsonwebtoken_1.default.sign({ userId: user.id, fullname: user.fullname }, setting_1.setting.jwtSecret, options);
            res.json({ message: "Login successful", user, token, rememberMe }); // 👈 send rememberMe back
        }
        catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    }
}
exports.LoginController = LoginController;
//# sourceMappingURL=LoginController.js.map