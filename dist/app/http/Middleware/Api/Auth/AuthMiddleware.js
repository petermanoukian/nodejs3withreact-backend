"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
/**
 * Middleware to enforce authentication
 */
function authMiddleware(req, res, next) {
    if (req.session && req.session.userId) {
        // User is authenticated
        return next();
    }
    // Not authenticated
    return res.status(401).json({ message: "Unauthorized" });
}
//# sourceMappingURL=AuthMiddleware.js.map