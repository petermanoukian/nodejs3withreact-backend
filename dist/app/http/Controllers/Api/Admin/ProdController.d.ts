import { Request, Response } from "express";
import { ProdService } from "@Service/Action/Admin/ProdService";
import { ImageUploadService } from "@Service/Action/Common/ImageUploadService";
import { FileUploadService } from "@Service/Action/Common/FileUploadService";
export declare class ProdController {
    private prodService;
    private imageUploadService;
    private fileUploadService;
    static uploadMiddleware: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    static readonly instance: ProdController;
    constructor(prodService: ProdService, imageUploadService: ImageUploadService, fileUploadService: FileUploadService);
    list(req: Request, res: Response): Promise<void>;
    show(req: Request, res: Response): Promise<void>;
    edit(req: Request, res: Response): Promise<void>;
    create(req: Request, res: Response): Promise<void>;
    checkNameExistsForAdd(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    checkNameExistsForUpdate(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    store(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    update(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    delete(req: Request, res: Response): Promise<void>;
    deleteMany(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=ProdController.d.ts.map