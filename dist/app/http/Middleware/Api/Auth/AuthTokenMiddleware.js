import jwt from "jsonwebtoken";
import { setting } from "@config/setting";
export function authTokenMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const secret = setting.jwtSecret; // ✅ same trick as SignOptions
        const options = {};
        const test = setting.jwtSecret; // force TS to tell us the type
        console.log("JWT Secret type:", typeof test); // should log "string"
        const decoded = jwt.verify(token, setting.jwtSecret, options);
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