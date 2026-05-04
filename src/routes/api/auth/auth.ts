import { Router, Request, Response } from "express";
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
router.get("/check", (req: Request, res: Response) =>
  authController.checkAuth(req, res)
);

/**
 * Logout route
 * POST /api/auth/logout
 */
router.post("/logout", (req: Request, res: Response) =>
  authController.logout(req, res)
);

/**
 * Get logged-in user info
 * GET /api/auth/loggeduser
 * POST /api/auth/loggeduser
 */
router.get("/loggeduser", (req: Request, res: Response) =>
  authController.loggeduseinfo(req, res)
);
router.post("/loggeduser", (req: Request, res: Response) =>
  authController.loggeduseinfo(req, res)
);

export default router;
