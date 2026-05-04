"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../../../app/http/Controllers/Api/Auth/AuthController");
const AuthTokenMiddleware_1 = require("../../../app/http/Middleware/Api/Auth/AuthTokenMiddleware");
const router = (0, express_1.Router)();
const authController = AuthController_1.AuthController.instance;
// ✅ Apply middleware to all routes in this router
router.use(AuthTokenMiddleware_1.authTokenMiddleware);
/**
 * Check authentication status
 * GET /api/auth/check
 */
router.get("/check", (req, res) => authController.checkAuth(req, res));
/**
 * Logout route
 * POST /api/auth/logout
 */
router.post("/logout", (req, res) => authController.logout(req, res));
/**
 * Get logged-in user info
 * GET /api/auth/loggeduser
 * POST /api/auth/loggeduser
 */
router.get("/loggeduser", (req, res) => authController.loggeduseinfo(req, res));
router.post("/loggeduser", (req, res) => authController.loggeduseinfo(req, res));
exports.default = router;
//# sourceMappingURL=auth.js.map