import { Request } from "express";
import { ProdService } from "../../../Service/Action/Admin/ProdService";
export declare class ProdStoreRequest {
    static validate(req: Request, prodService: ProdService): Promise<{
        valid: boolean;
        errors?: string[];
    }>;
}
//# sourceMappingURL=ProdStoreRequest.d.ts.map