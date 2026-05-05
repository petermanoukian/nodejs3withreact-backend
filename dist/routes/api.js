// src/routes/api.ts
import { Router } from "express";
import loginRoutes from "./api/auth/login";
import authRoutes from "./api/auth/auth"; // ← add this
import adminRoutes from "./api/admin/admin";
const router = Router();
// Public login routes
router.use("/", loginRoutes);
router.use("/auth", authRoutes); // ← mount here
// Protected admin routes (all under /api/admin/*)
router.use("/admin", adminRoutes);
export default router;
//# sourceMappingURL=api.js.map