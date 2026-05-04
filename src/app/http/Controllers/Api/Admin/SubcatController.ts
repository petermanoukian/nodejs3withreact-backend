//src\app\http\Controllers\Api\Admin\SubcatController.ts

import { Request, Response } from "express";
import { SubcatService } from "@Service/Action/Admin/SubcatService";
import { ImageUploadService } from "@Service/Action/Common/ImageUploadService";
import { FileUploadService } from "@Service/Action/Common/FileUploadService";
import { Cat } from "@Model/Admin/Cat.model";
import { Subcat } from "@Model/Admin/Subcat.model";
import { SubcatStoreRequest } from "@Http/Request/Admin/SubcatStoreRequest";
import { SubcatUpdateRequest } from "@Http/Request/Admin/SubcatUpdateRequest";

import { SubcatQuery } from "@Repository/Queries/Admin/SubcatQuery";
import knex from "knex";
import knexConfig from "@config/knexfile";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });


export class SubcatController {


    static uploadMiddleware = upload.fields([
        { name: "img", maxCount: 1 },
        { name: "filer", maxCount: 1 },
    ]);
    static readonly instance = new SubcatController(
        new SubcatService(new SubcatQuery(knex(knexConfig))),
        new ImageUploadService(),
        new FileUploadService()
    );


    constructor(
        private subcatService: SubcatService,
        private imageUploadService: ImageUploadService,
        private fileUploadService: FileUploadService
    ) {}


    async list(req: Request, res: Response) {
        try {
            const {
                page = 1,
                pageSize = 10,
                orderByField = "id",
                orderByDirection = "desc",
                searchFields: _searchFields,
                "searchFields[]": _searchFieldsBracket,
                searchMode: _searchMode,
                searchOperator: _searchOperator,
                ...filters
            } = req.query;

            const rawSearchFields = _searchFields ?? _searchFieldsBracket;
            let normalizedSearchFields: string[] = [];
            if (Array.isArray(rawSearchFields)) {
                normalizedSearchFields = rawSearchFields.map(String);
            } else if (typeof rawSearchFields === "string") {
                normalizedSearchFields = [rawSearchFields];
            }

            const catid = req.body?.catid ?? req.query.catid ?? req.params.catid ?? null;
            if (catid) {
                filters.catid = String(catid);
            }

            const searchMode = String(_searchMode ?? "like").toLowerCase() === "exact" ? "exact" : "like";
            const searchOperator = String(_searchOperator ?? "OR").toUpperCase() === "AND" ? "AND" : "OR";
            const direction = String(orderByDirection).toLowerCase() === "asc" ? "asc" : "desc";

            const result = await this.subcatService.returnSearchPaginatedWithCounts(
                filters,
                String(orderByField),
                direction,
                normalizedSearchFields,
                searchOperator,
                searchMode,
                Number(page),
                Number(pageSize)
            );

            res.json({
                ...result,
                catid: catid ? Number(catid) : null,
            });
        } catch (err: any) {
            console.error("Subcat list error:", err);
            res.status(500).json({ message: "Failed to list subcats" });
        }
    }



    // ✅ Show single subcat
    async show(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const result = await this.subcatService.returnOne({ id });
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: "Failed to show subcat", details: error });
        }
    }

    // ✅ Edit subcat
    async edit(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const result = await this.subcatService.returnOne({ id });
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: "Failed to edit subcat", details: error });
        }
    }

    // ✅ Create form (optionally scoped by catid, with override priority)
    async create(req: Request, res: Response) {
        try {
            // Priority: body > query > params
            const catid =
                req.body.catid ??
                req.query.catid ??
                req.params.catid ??
                null;

            res.json({
                message: "Render create form",
                catid: catid ? Number(catid) : null
            });
        } catch (error) {
            res.status(500).json({ error: "Failed to load create form", details: error });
        }
    }



    // ✅ Check name existence (for add)
    async checkNameExistsForAdd(req: Request, res: Response) {
        const { catid, name } = req.body;
        const existing = await this.subcatService.returnOne({ catid, name });
        if (existing) {
            return res.status(400).json({ message: "Name already exists in this cat" });
        }
        res.json({ valid: true });
    }

    // ✅ Check name existence (for update)
    async checkNameExistsForUpdate(req: Request, res: Response) {
        const { id, catid, name } = req.body;
        const existing = await this.subcatService.returnOne({ catid, name });
        if (existing && existing.id !== id) {
            return res.status(400).json({ message: "Name already exists in this cat" });
        }
        res.json({ valid: true });
    }



    // ✅ Store new subcat (catid REQUIRED)


    async store(req: Request, res: Response) 
    {
        const validation = await SubcatStoreRequest.validate(req, this.subcatService);
        if (!validation.valid) {
            return res.status(400).json({ errors: validation.errors });
        }

        const { catid, name, des, dess } = req.body;
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        let img: string | undefined;
        let img2: string | undefined;
        let filer: string | undefined;

        if (files?.img?.[0]) {
            const result = await this.imageUploadService.upload(
                files.img[0],
                "uploads/subcats/large",
                "uploads/subcats/thumb",
                { baseFileName: name }
            );
            img = result.large;
            img2 = result.small;
        }

        if (files?.filer?.[0]) {
            const result = await this.fileUploadService.upload(files.filer[0], "uploads/subcats/files");
            filer = result.path;
        }

        const data: Partial<Subcat> = { catid: Number(catid), name, des, dess };
        if (img !== undefined) data.img = img;
        if (img2 !== undefined) data.img2 = img2;
        if (filer !== undefined) data.filer = filer;

        const subcat = await this.subcatService.store(data);
        res.status(201).json(subcat);
    }

    // ✅ Update subcat (with validation + uploads)
    async update(req: Request, res: Response) {
        const id = Number(req.params.id);

        const validation = await SubcatUpdateRequest.validate(req, this.subcatService);
        if (!validation.valid) {
            return res.status(400).json({ errors: validation.errors });
        }

        const { catid, name, des, dess } = req.body;
        const existing = await this.subcatService.returnOneById(id);
        if (!existing) return res.status(404).json({ message: "Subcat not found" });

        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        let img: string | undefined;
        let img2: string | undefined;
        let filer: string | undefined;

        if (files?.img?.[0]) {
            const result = await this.imageUploadService.upload(
                files.img[0],
                "uploads/subcats/img/large",
                "uploads/subcats/img/thumb",
                { baseFileName: name ?? existing.name }
            );
            img = result.large;
            img2 = result.small;
        }

        if (files?.filer?.[0]) {
            const result = await this.fileUploadService.upload(files.filer[0], "uploads/subcats/files");
            filer = result.path;
        }

        const resolvedImg   = img   ?? existing.img;
        const resolvedImg2  = img2  ?? existing.img2;
        const resolvedFiler = filer ?? existing.filer;

        const data: Partial<Subcat> = { catid: Number(catid), name, des, dess };
        if (resolvedImg   !== undefined) data.img   = resolvedImg;
        if (resolvedImg2  !== undefined) data.img2  = resolvedImg2;
        if (resolvedFiler !== undefined) data.filer = resolvedFiler;

        const updated = await this.subcatService.update(id, data);
        res.json(updated);
    }


    // ✅ Delete single subcat
    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            await this.subcatService.delete(id);
            res.json({ message: "Subcat deleted", id });
        } catch (error) {
            res.status(500).json({ error: "Failed to delete subcat", details: error });
        }
    }

    // ✅ Delete many subcats
    async deleteMany(req: Request, res: Response) {
        try {
            const ids: number[] = req.body.ids || [];
            await this.subcatService.deleteMany(ids);
            res.json({ message: "Subcats deleted", ids });
        } catch (error) {
            res.status(500).json({ error: "Failed to delete subcats", details: error });
        }
    }

    // ✅ Dropdown view (for select inputs, optionally filtered by catid)
    async dropdownView(req: Request, res: Response) {
        try {
            // Optional preselect id (priority: body > query > params)
            const preselectId =
                req.body.id ??
                req.query.id ??
                req.params.id ??
                null;

            // Optional catid filter (priority: body > query)
            const catid =
                req.body.catid ??
                req.query.catid ??
                null;

            // Build filter if catid present
            const filter = catid ? { catid: Number(catid) } : {};

            // Fetch subcats ordered by name ASC
            const subcats = await this.subcatService.returnMany(
                filter,
                "name",
                "asc",
                [],
                ["id", "name"]
            );

            res.json({
                subcats,
                preselectId: preselectId ? Number(preselectId) : null,
                catid: catid ? Number(catid) : null
            });
        } catch (error) {
            res.status(500).json({ error: "Failed to load dropdown", details: error });
        }
    }


}
