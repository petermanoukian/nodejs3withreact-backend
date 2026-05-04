"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatController = void 0;
const CatService_1 = require("../../../../Service/Action/Admin/CatService");
const ImageUploadService_1 = require("../../../../Service/Action/Common/ImageUploadService");
const FileUploadService_1 = require("../../../../Service/Action/Common/FileUploadService");
const CatStoreRequest_1 = require("../../../Request/Admin/CatStoreRequest");
const CatUpdateRequest_1 = require("../../../Request/Admin/CatUpdateRequest");
const CatQuery_1 = require("../../../../Repository/Queries/Admin/CatQuery");
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("../../../../../config/knexfile"));
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
class CatController {
    catService;
    imageUploadService;
    fileUploadService;
    static uploadMiddleware = upload.fields([
        { name: "img", maxCount: 1 },
        { name: "filer", maxCount: 1 },
    ]);
    static instance = new CatController(new CatService_1.CatService(new CatQuery_1.CatQuery((0, knex_1.default)(knexfile_1.default))), new ImageUploadService_1.ImageUploadService(), new FileUploadService_1.FileUploadService());
    constructor(catService, imageUploadService, fileUploadService) {
        this.catService = catService;
        this.imageUploadService = imageUploadService;
        this.fileUploadService = fileUploadService;
    }
    // ✅ Paginated list
    async index(req, res) {
        try {
            const { page = 1, pageSize = 10, orderByField = "id", orderByDirection = "desc", searchFields, searchMode: _searchMode, searchOperator: _searchOperator, ...filters } = req.query;
            const searchMode = String(_searchMode ?? "like").toLowerCase() === "exact"
                ? "exact"
                : "like";
            const searchOperator = String(_searchOperator ?? "AND").toUpperCase() === "OR"
                ? "OR"
                : "AND";
            const direction = String(orderByDirection).toLowerCase() === "asc" ? "asc" : "desc";
            let normalizedSearchFields = [];
            if (Array.isArray(searchFields)) {
                normalizedSearchFields = searchFields.map(String);
            }
            else if (typeof searchFields === "string") {
                normalizedSearchFields = [searchFields];
            }
            const result = await this.catService.returnSearchPaginatedWithCounts(filters, String(orderByField), direction, normalizedSearchFields, searchOperator, searchMode, Number(page), Number(pageSize));
            res.json(result);
        }
        catch (err) {
            console.error("Index error:", err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    async dropdownView(req, res) {
        try {
            const preselectId = req.body?.id ??
                req.query.id ??
                req.params.id ??
                null;
            const cats = await this.catService.returnMany({}, "name", "asc", [], ["id", "name"]);
            res.json({
                cats,
                preselectId: preselectId ? Number(preselectId) : null,
            });
        }
        catch (error) {
            console.error("Dropdown view error:", {
                message: error.message,
                stack: error.stack,
                code: error.code,
                sqlMessage: error.sqlMessage,
                sql: error.sql,
            });
            res.status(500).json({
                error: "Failed to load dropdown",
                message: error.message,
                sqlMessage: error.sqlMessage,
                sql: error.sql,
            });
        }
    }
    // ✅ Show single cat
    async show(req, res) {
        const id = Number(req.params.id);
        const cat = await this.catService.returnOneById(id);
        if (!cat)
            return res.status(404).json({ message: "Cat not found" });
        res.json(cat);
    }
    // ✅ Edit (update) existing cat
    async edit(req, res) {
        const id = Number(req.params.id);
        const cat = await this.catService.returnOneById(id);
        if (!cat)
            return res.status(404).json({ message: "Cat not found" });
        res.json(cat);
    }
    // ✅ Check name existence (for add)
    async checkNameExistsForAdd(req, res) {
        const { name } = req.body;
        const existing = await this.catService.returnOne({ name });
        if (existing)
            return res.status(400).json({ message: "Name already exists" });
        res.json({ valid: true });
    }
    // ✅ Check name existence (for update)
    async checkNameExistsForUpdate(req, res) {
        const { id, name } = req.body;
        const existing = await this.catService.returnOne({ name });
        if (existing && existing.id !== id) {
            return res.status(400).json({ message: "Name already exists" });
        }
        res.json({ valid: true });
    }
    // ✅ Store new cat
    async store(req, res) {
        try {
            const { name } = req.body;
            const validation = await CatStoreRequest_1.CatStoreRequest.validate(req, this.catService);
            if (!validation.valid) {
                return res.status(400).json({ errors: validation.errors });
            }
            const files = req.files;
            let img;
            let img2;
            let filer;
            if (files?.img && files.img.length > 0 && files.img[0]) {
                const result = await this.imageUploadService.upload(files.img[0], "uploads/cats/img", "uploads/cats/img/thumb", { baseFileName: name });
                img = result.large;
                img2 = result.small;
            }
            if (files?.filer && files.filer.length > 0 && files.filer[0]) {
                const result = await this.fileUploadService.upload(files.filer[0], "uploads/cats/files");
                filer = result.path;
            }
            // ✅ Build object dynamically
            const data = {};
            data.name = name;
            if (img !== undefined)
                data.img = img;
            if (img2 !== undefined)
                data.img2 = img2;
            if (filer !== undefined)
                data.filer = filer;
            const cat = await this.catService.store(data);
            res.status(201).json(cat);
        }
        catch (err) {
            console.error("Cat store error:", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
    async update(req, res) {
        try {
            const id = Number(req.params.id);
            const { name } = req.body;
            const validation = await CatUpdateRequest_1.CatUpdateRequest.validate(req, this.catService);
            if (!validation.valid) {
                return res.status(400).json({ errors: validation.errors });
            }
            const existing = await this.catService.returnOneById(id);
            if (!existing)
                return res.status(404).json({ message: "Cat not found" });
            const files = req.files;
            let img;
            let img2;
            let filer;
            if (files?.img && files.img.length > 0 && files.img[0]) {
                const result = await this.imageUploadService.upload(files.img[0], "uploads/cats/img/", "uploads/cats/img/thumb", { baseFileName: name });
                img = result.large;
                img2 = result.small;
            }
            if (files?.filer && files.filer.length > 0 && files.filer[0]) {
                const result = await this.fileUploadService.upload(files.filer[0], "uploads/cats/files");
                filer = result.path;
            }
            const resolvedImg = img ?? existing.img;
            const resolvedImg2 = img2 ?? existing.img2;
            const resolvedFiler = filer ?? existing.filer;
            const data = { name };
            if (resolvedImg !== undefined)
                data.img = resolvedImg;
            if (resolvedImg2 !== undefined)
                data.img2 = resolvedImg2;
            if (resolvedFiler !== undefined)
                data.filer = resolvedFiler;
            const updated = await this.catService.update(id, data);
            res.status(200).json(updated);
        }
        catch (err) {
            console.error("Cat update error:", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
    // ✅ Delete single cat
    async delete(req, res) {
        const id = Number(req.params.id);
        await this.catService.delete(id);
        res.json({ message: "Cat deleted successfully" });
    }
    // ✅ Delete many cats
    async deleteMany(req, res) {
        const { ids } = req.body;
        await this.catService.deleteMany(ids);
        res.json({ message: "Cats deleted successfully" });
    }
}
exports.CatController = CatController;
//# sourceMappingURL=CatController.js.map