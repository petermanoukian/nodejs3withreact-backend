import { Request } from "express";
import { SubcatService } from "../../../Service/Action/Admin/SubcatService";
export declare class SubcatStoreRequest {
    static validate(req: Request, subcatService: SubcatService): Promise<{
        valid: boolean;
        errors?: string[];
    }>;
}
//# sourceMappingURL=SubcatStoreRequest.d.ts.map