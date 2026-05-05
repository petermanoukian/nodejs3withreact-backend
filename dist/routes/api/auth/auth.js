import { Router } from "express";
import { AuthController } from "@Http/Controllers/Api/Auth/AuthController";
import { authTokenMiddleware } from "@HttpMiddleware/Api/Auth/AuthTokenMiddleware";
const router = Router();
const authController = AuthController.instance;
// ✅ Apply middleware to all routes in this router
router.use(authTokenMiddleware);
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
export default router;
//# sourceMappingURL=auth.js.map