"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/api.ts
const express_1 = require("express");
const login_1 = __importDefault(require("./api/auth/login"));
const auth_1 = __importDefault(require("./api/auth/auth")); // ← add this
const admin_1 = __importDefault(require("./api/admin/admin"));
const router = (0, express_1.Router)();
// Public login routes
router.use("/", login_1.default);
router.use("/auth", auth_1.default); // ← mount here
// Protected admin routes (all under /api/admin/*)
router.use("/admin", admin_1.default);
exports.default = router;
//# sourceMappingURL=api.js.map