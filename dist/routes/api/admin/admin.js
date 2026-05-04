"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/api/admin/admin.ts
const express_1 = require("express");
const AuthTokenMiddleware_1 = require("../../../app/http/Middleware/Api/Auth/AuthTokenMiddleware");
const cat_1 = __importDefault(require("./cat"));
const subcat_1 = __importDefault(require("./subcat"));
const prod_1 = __importDefault(require("./prod"));
const router = (0, express_1.Router)();
// Apply middleware to all admin routes
router.use(AuthTokenMiddleware_1.authTokenMiddleware);
// Prefix all admin routes with /admin
router.use("/cat", cat_1.default);
router.use("/subcat", subcat_1.default);
router.use("/prod", prod_1.default);
exports.default = router;
//# sourceMappingURL=admin.js.map