import { Request } from "express";
import { CatService } from "@Service/Action/Admin/CatService";
export declare class CatStoreRequest {
    static validate(req: Request, catService: CatService): Promise<{
        valid: boolean;
        errors?: string[];
    }>;
}
//# sourceMappingURL=CatStoreRequest.d.ts.map