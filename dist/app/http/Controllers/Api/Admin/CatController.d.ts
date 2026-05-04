import { Request, Response } from "express";
import { CatService } from "../../../../Service/Action/Admin/CatService";
import { ImageUploadService } from "../../../../Service/Action/Common/ImageUploadService";
import { FileUploadService } from "../../../../Service/Action/Common/FileUploadService";
export declare class CatController {
    private catService;
    private imageUploadService;
    private fileUploadService;
    static uploadMiddleware: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    static readonly instance: CatController;
    constructor(catService: CatService, imageUploadService: ImageUploadService, fileUploadService: FileUploadService);
    index(req: Request, res: Response): Promise<void>;
    dropdownView(req: Request, res: Response): Promise<void>;
    show(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    edit(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    checkNameExistsForAdd(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    checkNameExistsForUpdate(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    store(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    update(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    delete(req: Request, res: Response): Promise<void>;
    deleteMany(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=CatController.d.ts.map