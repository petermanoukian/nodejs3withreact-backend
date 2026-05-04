"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authTokenMiddleware = authTokenMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const setting_1 = require("../../../../../config/setting");
function authTokenMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const secret = setting_1.setting.jwtSecret; // ✅ same trick as SignOptions
        const options = {};
        const test = setting_1.setting.jwtSecret; // force TS to tell us the type
        console.log("JWT Secret type:", typeof test); // should log "string"
        const decoded = jsonwebtoken_1.default.verify(token, setting_1.setting.jwtSecret, options);
        req.user = decoded;
        return next();
    }
    catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        }
        return res.status(401).json({ message: "Invalid token" });
    }
}
//# sourceMappingURL=AuthTokenMiddleware.js.map