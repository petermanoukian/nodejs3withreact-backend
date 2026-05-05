import { Request } from "express";
import { SubcatService } from "@Service/Action/Admin/SubcatService";
export declare class SubcatUpdateRequest {
    static validate(req: Request, subcatService: SubcatService): Promise<{
        valid: boolean;
        errors?: string[];
    }>;
}
//# sourceMappingURL=SubcatUpdateRequest.d.ts.map