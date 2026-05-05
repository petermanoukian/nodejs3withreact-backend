import { Request } from "express";
import { ProdService } from "@Service/Action/Admin/ProdService";
export declare class ProdUpdateRequest {
    static validate(req: Request, prodService: ProdService): Promise<{
        valid: boolean;
        errors?: string[];
    }>;
}
//# sourceMappingURL=ProdUpdateRequest.d.ts.map