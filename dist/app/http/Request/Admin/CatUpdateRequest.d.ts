import { Request } from "express";
import { CatService } from "@Service/Action/Admin/CatService";
export declare class CatUpdateRequest {
    static validate(req: Request, catService: CatService): Promise<{
        valid: boolean;
        errors?: string[];
    }>;
}
//# sourceMappingURL=CatUpdateRequest.d.ts.map