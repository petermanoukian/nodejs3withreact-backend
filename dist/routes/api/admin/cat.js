"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/api/admin/cat.ts
const express_1 = require("express");
const CatController_1 = require("../../../app/http/Controllers/Api/Admin/CatController");
// ✅ use the config you already have
const router = (0, express_1.Router)();
const catController = CatController_1.CatController.instance;
// ✅ Explicit routes
router.get("/list", (req, res) => catController.index(req, res));
router.post("/list", (req, res) => catController.index(req, res));
router.get("/dropdown/view", (req, res) => catController.dropdownView(req, res));
router.post("/dropdown/view", (req, res) => catController.dropdownView(req, res));
router.get("/dropdown/view/:id", (req, res) => catController.dropdownView(req, res));
router.post("/dropdown/view/:id", (req, res) => catController.dropdownView(req, res));
// Show single Cat (GET + POST)
router.get("/show/:id", (req, res) => catController.show(req, res));
router.post("/show/:id", (req, res) => catController.show(req, res));
// Edit Cat (GET + POST)
router.get("/edit/:id", (req, res) => catController.edit(req, res));
router.post("/edit/:id", (req, res) => catController.edit(req, res));
router.post("/check-name-add", (req, res) => catController.checkNameExistsForAdd(req, res));
router.post("/check-name-update", (req, res) => catController.checkNameExistsForUpdate(req, res));
// cat.ts
router.post("/store", CatController_1.CatController.uploadMiddleware, // 👈 add this
(req, res) => catController.store(req, res));
router.put("/update/:id", CatController_1.CatController.uploadMiddleware, // 👈 add this
(req, res) => catController.update(req, res));
router.delete("/delete/:id", (req, res) => catController.delete(req, res));
router.delete("/delete-many", (req, res) => catController.deleteMany(req, res));
exports.default = router;
//# sourceMappingURL=cat.js.map