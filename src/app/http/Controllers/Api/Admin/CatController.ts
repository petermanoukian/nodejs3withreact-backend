// src/app/http/Controllers/Api/Admin/CatController.ts
import { Request, Response } from "express";
import { CatService } from "@Service/Action/Admin/CatService";
import { ImageUploadService } from "@Service/Action/Common/ImageUploadService";
import { FileUploadService } from "@Service/Action/Common/FileUploadService";
import { Cat } from "@Model/Admin/Cat.model";
import { CatStoreRequest } from "@Http/Request/Admin/CatStoreRequest";
import { CatUpdateRequest } from "@Http/Request/Admin/CatUpdateRequest";
import { CatQuery } from "@Repository/Queries/Admin/CatQuery";
import knex from "knex";
import knexConfig from "@config/knexfile";

import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

export class CatController {
    private catService: CatService;
    private imageUploadService: ImageUploadService;
    private fileUploadService: FileUploadService;

    static uploadMiddleware = upload.fields([
        { name: "img", maxCount: 1 },
        { name: "filer", maxCount: 1 },
    ]);

    static readonly instance = new CatController(
        new CatService(new CatQuery(knex(knexConfig))),
        new ImageUploadService(),
        new FileUploadService()
    );

    constructor(
        catService: CatService,
        imageUploadService: ImageUploadService,
        fileUploadService: FileUploadService
        ) {
        this.catService = catService;
        this.imageUploadService = imageUploadService;
        this.fileUploadService = fileUploadService;
    }

    // ✅ Paginated list


    async index(req: Request, res: Response) {
        try {
            const {
            page = 1,
            pageSize = 10,
            orderByField = "id",
            orderByDirection = "desc",
            searchFields,
            searchMode: _searchMode,
            searchOperator: _searchOperator,
            ...filters
            } = req.query;

            const searchMode =
            String(_searchMode ?? "like").toLowerCase() === "exact"
                ? "exact"
                : "like";

            const searchOperator =
            String(_searchOperator ?? "AND").toUpperCase() === "OR"
                ? "OR"
                : "AND";

            const direction =
            String(orderByDirection).toLowerCase() === "asc" ? "asc" : "desc";

            let normalizedSearchFields: string[] = [];

            if (Array.isArray(searchFields)) {
            normalizedSearchFields = searchFields.map(String);
            } else if (typeof searchFields === "string") {
            normalizedSearchFields = [searchFields];
            }

            const result = await this.catService.returnSearchPaginatedWithCounts(
            filters,
            String(orderByField),
            direction,
            normalizedSearchFields,
            searchOperator,
            searchMode,
            Number(page),
            Number(pageSize)
            );

            res.json(result);
        } catch (err: any) {
            console.error("Index error:", err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async dropdownView(req: Request, res: Response) {
        try {
            const preselectId =
            req.body?.id ??
            req.query.id ??
            req.params.id ??
            null;
            const cats = await this.catService.returnMany(
            {},
            "name",
            "asc",
            [],
            ["id", "name"]
            );

            res.json({
            cats,
            preselectId: preselectId ? Number(preselectId) : null,
            });
        } catch (error: any) {
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
    async show(req: Request, res: Response) {
        const id = Number(req.params.id);
        const cat = await this.catService.returnOneById(id);
        if (!cat) return res.status(404).json({ message: "Cat not found" });
        res.json(cat);
    }

  // ✅ Edit (update) existing cat
    async edit(req: Request, res: Response) 
    {
        const id = Number(req.params.id);
        const cat = await this.catService.returnOneById(id);
        if (!cat) return res.status(404).json({ message: "Cat not found" });
        res.json(cat);
    }


    // ✅ Check name existence (for add)
    async checkNameExistsForAdd(req: Request, res: Response) {
        const { name } = req.body;
        const existing = await this.catService.returnOne({ name });
        if (existing) return res.status(400).json({ message: "Name already exists" });
        res.json({ valid: true });
    }

  // ✅ Check name existence (for update)
    async checkNameExistsForUpdate(req: Request, res: Response) {
        const { id, name } = req.body;
        const existing = await this.catService.returnOne({ name });
        if (existing && existing.id !== id) {
            return res.status(400).json({ message: "Name already exists" });
        }
        res.json({ valid: true });
    }

  // ✅ Store new cat


    async store(req: Request, res: Response) 
    {
        try {
        
            const { name } = req.body;

            const validation = await CatStoreRequest.validate(req, this.catService);
            if (!validation.valid) {
                return res.status(400).json({ errors: validation.errors });
            }

            const files = req.files as { [fieldname: string]: Express.Multer.File[] };
            let img: string | undefined;
            let img2: string | undefined;
            let filer: string | undefined;

            if (files?.img && files.img.length > 0 && files.img[0]) {
            const result = await this.imageUploadService.upload(
                files.img[0],
                "uploads/cats/img",
                "uploads/cats/img/thumb",
                { baseFileName: name }
            );
            img = result.large;
            img2 = result.small;
            }

            if (files?.filer && files.filer.length > 0 && files.filer[0]) {
            const result = await this.fileUploadService.upload(files.filer[0], "uploads/cats/files");
            filer = result.path;
            }


            // ✅ Build object dynamically
            const data: Partial<Cat> = {};
            data.name = name;
            if (img !== undefined) data.img = img;
            if (img2 !== undefined) data.img2 = img2;
            if (filer !== undefined) data.filer = filer;

            const cat = await this.catService.store(data);
            res.status(201).json(cat);
        }

        catch (err: any) {
            console.error("Cat store error:", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }


    }


    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { name } = req.body;

            const validation = await CatUpdateRequest.validate(req, this.catService);
            if (!validation.valid) {
            return res.status(400).json({ errors: validation.errors });
            }

            const existing = await this.catService.returnOneById(id);
            if (!existing) return res.status(404).json({ message: "Cat not found" });

            const files = req.files as { [fieldname: string]: Express.Multer.File[] };

            let img: string | undefined;
            let img2: string | undefined;
            let filer: string | undefined;

            if (files?.img && files.img.length > 0 && files.img[0]) {
            const result = await this.imageUploadService.upload(
                files.img[0],
                "uploads/cats/img/",
                "uploads/cats/img/thumb",
                { baseFileName: name }
            );
            img = result.large;
            img2 = result.small;
            }

            if (files?.filer && files.filer.length > 0 && files.filer[0]) {
            const result = await this.fileUploadService.upload(files.filer[0], "uploads/cats/files");
            filer = result.path;
            }

            const resolvedImg   = img   ?? existing.img;
            const resolvedImg2  = img2  ?? existing.img2;
            const resolvedFiler = filer ?? existing.filer;

            const data: Partial<Cat> = { name };
            if (resolvedImg   !== undefined) data.img   = resolvedImg;
            if (resolvedImg2  !== undefined) data.img2  = resolvedImg2;
            if (resolvedFiler !== undefined) data.filer = resolvedFiler;

            const updated = await this.catService.update(id, data);
            res.status(200).json(updated);

        } catch (err: any) {
            console.error("Cat update error:", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }


    // ✅ Delete single cat
    async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    await this.catService.delete(id);
    res.json({ message: "Cat deleted successfully" });
    }

    // ✅ Delete many cats
    async deleteMany(req: Request, res: Response) {
        const { ids } = req.body;
        await this.catService.deleteMany(ids);
        res.json({ message: "Cats deleted successfully" });
    }
}
