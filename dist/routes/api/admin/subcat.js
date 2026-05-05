// src/routes/api/admin/subcat.ts
import { Router } from "express";
import { SubcatController } from "@Http/Controllers/Api/Admin/SubcatController";
const router = Router();
const subcatController = SubcatController.instance;
// ✅ Explicit routes
// List SubCats (optionally scoped by catid)
router.get("/list", (req, res) => subcatController.list(req, res));
router.get("/list/:catid", (req, res) => subcatController.list(req, res));
router.post("/list", (req, res) => subcatController.list(req, res));
router.post("/list/:catid", (req, res) => subcatController.list(req, res));
// Show single subcat
router.get("/show/:id", (req, res) => subcatController.show(req, res));
// Edit subcat
router.get("/edit/:id", (req, res) => subcatController.edit(req, res));
// Check name existence
router.post("/check-name-add", (req, res) => subcatController.checkNameExistsForAdd(req, res));
router.post("/check-name-update", (req, res) => subcatController.checkNameExistsForUpdate(req, res));
// Create form (optionally scoped by catid)
router.get("/create", (req, res) => subcatController.create(req, res));
router.get("/create/:catid", (req, res) => subcatController.create(req, res));
router.post("/create", (req, res) => subcatController.create(req, res));
router.post("/create/:catid", (req, res) => subcatController.create(req, res));
// Store new subcat (catid REQUIRED)
router.post("/store", SubcatController.uploadMiddleware, (req, res) => subcatController.store(req, res));
// Dropdown 👈 same pattern as cat, no route params
router.get("/dropdown/view", (req, res) => subcatController.dropdownView(req, res));
router.post("/dropdown/view", (req, res) => subcatController.dropdownView(req, res));
// Update existing subcat
router.put("/update/:id", SubcatController.uploadMiddleware, (req, res) => subcatController.update(req, res));
// Delete single subcat
router.delete("/delete/:id", (req, res) => subcatController.delete(req, res));
// Delete many subcats
router.delete("/delete-many", (req, res) => subcatController.deleteMany(req, res));
export default router;
//# sourceMappingURL=subcat.js.map