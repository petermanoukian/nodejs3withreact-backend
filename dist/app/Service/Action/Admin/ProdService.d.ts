import { Prod } from "../../../Model/Admin/Prod.model";
import { ProdInterface } from "../../../Repository/Interface/Admin/ProdInterface";
import { ProdServiceInterface } from "../../Interface/Admin/ProdServiceInterface";
export declare class ProdService implements ProdServiceInterface {
    private repository;
    constructor(repository: ProdInterface);
    returnMany(...args: Parameters<ProdInterface["returnMany"]>): Promise<Prod[]>;
    returnManyPaginated(...args: Parameters<ProdInterface["returnManyPaginated"]>): Promise<{
        data: Prod[];
        total: number;
    }>;
    returnSearchPaginatedWithDetails(...args: Parameters<ProdInterface["returnSearchPaginatedWithDetails"]>): Promise<{
        data: import("../../../Repository/Interface/Admin/ProdInterface").ProdWithDetails[];
        total: number;
    }>;
    returnOne(...args: Parameters<ProdInterface["returnOne"]>): Promise<Prod | null>;
    returnOneById(...args: Parameters<ProdInterface["returnOneById"]>): Promise<Prod | null>;
    returnSearchMany(...args: Parameters<ProdInterface["returnSearchMany"]>): Promise<Prod[]>;
    returnSearchPaginated(...args: Parameters<ProdInterface["returnSearchPaginated"]>): Promise<{
        data: Prod[];
        total: number;
    }>;
    returnSearchOne(...args: Parameters<ProdInterface["returnSearchOne"]>): Promise<Prod | null>;
    store(...args: Parameters<ProdInterface["store"]>): Promise<Prod>;
    update(...args: Parameters<ProdInterface["update"]>): Promise<Prod>;
    delete(...args: Parameters<ProdInterface["delete"]>): Promise<void>;
    deleteMany(...args: Parameters<ProdInterface["deleteMany"]>): Promise<void>;
}
//# sourceMappingURL=ProdService.d.ts.map