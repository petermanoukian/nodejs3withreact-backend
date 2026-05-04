// src/routes/api/admin/admin.ts
import { Router } from "express";
import { authTokenMiddleware } from "@HttpMiddleware/Api/Auth/AuthTokenMiddleware";
import catRoutes from "./cat";
import subcatRoutes from "./subcat";
import prodRoudes from "./prod"

const router = Router();

// Apply middleware to all admin routes
router.use(authTokenMiddleware);

// Prefix all admin routes with /admin
router.use("/cat", catRoutes);
router.use("/subcat", subcatRoutes);
router.use("/prod", prodRoudes);
export default router;
