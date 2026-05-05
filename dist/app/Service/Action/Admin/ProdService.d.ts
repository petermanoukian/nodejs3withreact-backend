import { ProdInterface } from "@Repository/Interface/Admin/ProdInterface";
import { ProdServiceInterface } from "@Service/Interface/Admin/ProdServiceInterface";
export declare class ProdService implements ProdServiceInterface {
    private repository;
    constructor(repository: ProdInterface);
    returnMany(...args: Parameters<ProdInterface["returnMany"]>): Promise<any>;
    returnManyPaginated(...args: Parameters<ProdInterface["returnManyPaginated"]>): Promise<any>;
    returnSearchPaginatedWithDetails(...args: Parameters<ProdInterface["returnSearchPaginatedWithDetails"]>): Promise<any>;
    returnOne(...args: Parameters<ProdInterface["returnOne"]>): Promise<any>;
    returnOneById(...args: Parameters<ProdInterface["returnOneById"]>): Promise<any>;
    returnSearchMany(...args: Parameters<ProdInterface["returnSearchMany"]>): Promise<any>;
    returnSearchPaginated(...args: Parameters<ProdInterface["returnSearchPaginated"]>): Promise<any>;
    returnSearchOne(...args: Parameters<ProdInterface["returnSearchOne"]>): Promise<any>;
    store(...args: Parameters<ProdInterface["store"]>): Promise<any>;
    update(...args: Parameters<ProdInterface["update"]>): Promise<any>;
    delete(...args: Parameters<ProdInterface["delete"]>): Promise<any>;
    deleteMany(...args: Parameters<ProdInterface["deleteMany"]>): Promise<any>;
}
//# sourceMappingURL=ProdService.d.ts.map