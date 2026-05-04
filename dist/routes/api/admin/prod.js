"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/api/admin/prod.ts
const express_1 = require("express");
const ProdController_1 = require("../../../app/http/Controllers/Api/Admin/ProdController");
const router = (0, express_1.Router)();
const prodController = ProdController_1.ProdController.instance;
// ✅ Explicit routes
// List Prods (optionally scoped by catid + subcatid)
// List Products (optionally scoped by catid/subcatid)
router.get("/list", (req, res) => prodController.list(req, res));
router.get("/list/:catid", (req, res) => prodController.list(req, res));
router.get("/list/:catid/:subcatid", (req, res) => prodController.list(req, res));
router.post("/list", (req, res) => prodController.list(req, res));
router.post("/list/:catid", (req, res) => prodController.list(req, res));
router.post("/list/:catid/:subcatid", (req, res) => prodController.list(req, res));
// Create form (optionally scoped by catid/subcatid)
router.get("/create", (req, res) => prodController.create(req, res));
router.get("/create/:catid", (req, res) => prodController.create(req, res));
router.get("/create/:catid/:subcatid", (req, res) => prodController.create(req, res));
router.post("/create", (req, res) => prodController.create(req, res));
router.post("/create/:catid", (req, res) => prodController.create(req, res));
router.post("/create/:catid/:subcatid", (req, res) => prodController.create(req, res));
// Show single prod
router.get("/show/:id", (req, res) => prodController.show(req, res));
// Edit prod
router.get("/edit/:id", (req, res) => prodController.edit(req, res));
// Check name existence
router.post("/check-name-add", (req, res) => prodController.checkNameExistsForAdd(req, res));
router.post("/check-name-update", (req, res) => prodController.checkNameExistsForUpdate(req, res));
// Store new prod (catid + subcatid REQUIRED)
router.post("/store", ProdController_1.ProdController.uploadMiddleware, (req, res) => prodController.store(req, res));
// Update existing prod
router.put("/update/:id", ProdController_1.ProdController.uploadMiddleware, (req, res) => prodController.update(req, res));
// Delete single prod
router.delete("/delete/:id", (req, res) => prodController.delete(req, res));
// Delete many prods
router.delete("/delete-many", (req, res) => prodController.deleteMany(req, res));
exports.default = router;
//# sourceMappingURL=prod.js.map