// src/app/http/Controllers/Api/Admin/ProdController.ts
import { ProdService } from "@Service/Action/Admin/ProdService";
import { ImageUploadService } from "@Service/Action/Common/ImageUploadService";
import { FileUploadService } from "@Service/Action/Common/FileUploadService";
import { ProdStoreRequest } from "@Http/Request/Admin/ProdStoreRequest";
import { ProdUpdateRequest } from "@Http/Request/Admin/ProdUpdateRequest";
import { ProdQuery } from "@Repository/Queries/Admin/ProdQuery";
import knex from "knex";
import knexConfig from "@config/knexfile";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });
export class ProdController {
    prodService;
    imageUploadService;
    fileUploadService;
    static uploadMiddleware = upload.fields([
        { name: "img", maxCount: 1 },
        { name: "filer", maxCount: 1 },
    ]);
    static instance = new ProdController(new ProdService(new ProdQuery(knex(knexConfig))), new ImageUploadService(), new FileUploadService());
    constructor(prodService, imageUploadService, fileUploadService) {
        this.prodService = prodService;
        this.imageUploadService = imageUploadService;
        this.fileUploadService = fileUploadService;
    }
    // ✅ List products (optionally scoped by catid + subcatid)
    async list(req, res) {
        try {
            console.log("list called");
            const body = req.body ?? {};
            const catid = body.catid ?? req.query.catid ?? null;
            const subcatid = body.subcatid ?? req.query.subcatid ?? null;
            const page = Number(body.page ?? req.query.page ?? 1);
            const pageSize = Number(body.pageSize ?? req.query.pageSize ?? 10);
            const orderByField = (body.orderByField ?? req.query.orderByField ?? "id");
            const orderByDirection = (body.orderByDirection ?? req.query.orderByDirection ?? "desc");
            const rawSearchFields = body.searchFields
                ?? req.query.searchFields
                ?? req.query["searchFields[]"]
                ?? [];
            const searchFields = Array.isArray(rawSearchFields) ? rawSearchFields : [rawSearchFields];
            const searchOperator = (body.searchOperator ?? req.query.searchOperator ?? "OR");
            const searchMode = (body.searchMode ?? req.query.searchMode ?? "like");
            const search = body.search ?? req.query.search ?? "";
            // 👇 Add explicit logs
            console.log("RAW query params:", req.query);
            console.log("RAW body params:", req.body);
            console.log("Resolved params:", {
                catid, subcatid, page, pageSize, orderByField, orderByDirection,
                searchFields, searchOperator, searchMode, search
            });
            const filters = {};
            if (catid)
                filters.catid = Number(catid);
            if (subcatid)
                filters.subcatid = Number(subcatid);
            console.log("filters:", filters);
            const result = await this.prodService.returnSearchPaginatedWithDetails(filters, orderByField, orderByDirection, searchFields, searchOperator, searchMode, page, pageSize, search);
            console.log("result length:", result.data.length, "total:", result.total);
            res.json({ data: result.data, total: result.total });
        }
        catch (error) {
            console.error("FULL ERROR:", error);
            res.status(500).json({
                error: "Failed to list prods",
                details: error instanceof Error ? error.message : String(error)
            });
        }
    }
    // ✅ Show single prod
    async show(req, res) {
        try {
            const id = Number(req.params.id);
            const result = await this.prodService.returnOne({ id });
            res.json(result);
        }
        catch (error) {
            res.status(500).json({ error: "Failed to show prod", details: error });
        }
    }
    // ✅ Edit prod
    async edit(req, res) {
        try {
            const id = Number(req.params.id);
            const result = await this.prodService.returnOne({ id });
            res.json(result);
        }
        catch (error) {
            res.status(500).json({ error: "Failed to edit prod", details: error });
        }
    }
    // ✅ Create form (optionally scoped by catid + subcatid)
    async create(req, res) {
        try {
            const catid = req.body.catid ?? req.query.catid ?? req.params.catid ?? null;
            const subcatid = req.body.subcatid ?? req.query.subcatid ?? req.params.subcatid ?? null;
            res.json({
                message: "Render create form",
                catid: catid ? Number(catid) : null,
                subcatid: subcatid ? Number(subcatid) : null
            });
        }
        catch (error) {
            res.status(500).json({ error: "Failed to load create form", details: error });
        }
    }
    // ✅ Check name existence (for add)
    async checkNameExistsForAdd(req, res) {
        const { catid, subcatid, name } = req.body;
        const existing = await this.prodService.returnOne({ catid, subcatid, name });
        if (existing) {
            return res.status(400).json({ message: "Name already exists in this cat/subcat" });
        }
        res.json({ valid: true });
    }
    // ✅ Check name existence (for update)
    async checkNameExistsForUpdate(req, res) {
        const { id, catid, subcatid, name } = req.body;
        const existing = await this.prodService.returnOne({ catid, subcatid, name });
        if (existing && existing.id !== id) {
            return res.status(400).json({ message: "Name already exists in this cat/subcat" });
        }
        res.json({ valid: true });
    }
    // ✅ Store new prod
    async store(req, res) {
        const validation = await ProdStoreRequest.validate(req, this.prodService);
        if (!validation.valid) {
            return res.status(400).json({ errors: validation.errors });
        }
        const { catid, subcatid, name, des, dess } = req.body;
        const files = req.files;
        let img;
        let img2;
        let filer;
        if (files?.img?.[0]) {
            const result = await this.imageUploadService.upload(files.img[0], "uploads/prods/img/large", "uploads/prods/img/thumb", { baseFileName: name });
            img = result.large;
            img2 = result.small;
        }
        if (files?.filer?.[0]) {
            const result = await this.fileUploadService.upload(files.filer[0], "uploads/prods/files");
            filer = result.path;
        }
        const data = { catid: Number(catid), subcatid: Number(subcatid), name, des, dess };
        if (img !== undefined)
            data.img = img;
        if (img2 !== undefined)
            data.img2 = img2;
        if (filer !== undefined)
            data.filer = filer;
        const prod = await this.prodService.store(data);
        res.status(201).json(prod);
    }
    // ✅ Update prod
    async update(req, res) {
        const id = Number(req.params.id);
        const validation = await ProdUpdateRequest.validate(req, this.prodService);
        if (!validation.valid) {
            return res.status(400).json({ errors: validation.errors });
        }
        const { catid, subcatid, name, des, dess } = req.body;
        const existing = await this.prodService.returnOneById(id);
        if (!existing)
            return res.status(404).json({ message: "Prod not found" });
        const files = req.files;
        let img;
        let img2;
        let filer;
        if (files?.img?.[0]) {
            const result = await this.imageUploadService.upload(files.img[0], "uploads/prods/img/large", "uploads/prods/img/thumb", { baseFileName: name ?? existing.name });
            img = result.large;
            img2 = result.small;
        }
        if (files?.filer?.[0]) {
            const result = await this.fileUploadService.upload(files.filer[0], "uploads/prods/files");
            filer = result.path;
        }
        const resolvedImg = img ?? existing.img;
        const resolvedImg2 = img2 ?? existing.img2;
        const resolvedFiler = filer ?? existing.filer;
        const data = { catid: Number(catid), subcatid: Number(subcatid), name, des, dess };
        if (resolvedImg !== undefined)
            data.img = resolvedImg;
        if (resolvedImg2 !== undefined)
            data.img2 = resolvedImg2;
        if (resolvedFiler !== undefined)
            data.filer = resolvedFiler;
        const updated = await this.prodService.update(id, data);
        res.json(updated);
    }
    // ✅ Delete single prod
    async delete(req, res) {
        try {
            const id = Number(req.params.id);
            await this.prodService.delete(id);
            res.json({ message: "Prod deleted", id });
        }
        catch (error) {
            res.status(500).json({ error: "Failed to delete prod", details: error });
        }
    }
    // ✅ Delete many prods
    async deleteMany(req, res) {
        try {
            const ids = req.body.ids || [];
            await this.prodService.deleteMany(ids);
            res.json({ message: "Prods deleted", ids });
        }
        catch (error) {
            res.status(500).json({ error: "Failed to delete prods", details: error });
        }
    }
}
//# sourceMappingURL=ProdController.js.map