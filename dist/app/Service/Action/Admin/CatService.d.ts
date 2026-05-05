import { CatInterface } from "@Repository/Interface/Admin/CatInterface";
import { CatServiceInterface } from "@Service/Interface/Admin/CatServiceInterface";
export declare class CatService implements CatServiceInterface {
    private repository;
    constructor(repository: CatInterface);
    returnMany(...args: Parameters<CatInterface["returnMany"]>): Promise<any>;
    returnManyPaginated(...args: Parameters<CatInterface["returnManyPaginated"]>): Promise<any>;
    returnManyPaginatedWithCounts(...args: Parameters<CatInterface["returnManyPaginatedWithCounts"]>): Promise<any>;
    returnSearchManyWithCounts(...args: Parameters<CatInterface["returnSearchManyWithCounts"]>): Promise<any>;
    returnSearchPaginatedWithCounts(...args: Parameters<CatInterface["returnSearchPaginatedWithCounts"]>): Promise<any>;
    returnOne(...args: Parameters<CatInterface["returnOne"]>): Promise<any>;
    returnOneById(...args: Parameters<CatInterface["returnOneById"]>): Promise<any>;
    returnSearchMany(...args: Parameters<CatInterface["returnSearchMany"]>): Promise<any>;
    returnSearchPaginated(...args: Parameters<CatInterface["returnSearchPaginated"]>): Promise<any>;
    returnSearchOne(...args: Parameters<CatInterface["returnSearchOne"]>): Promise<any>;
    store(...args: Parameters<CatInterface["store"]>): Promise<any>;
    update(...args: Parameters<CatInterface["update"]>): Promise<any>;
    delete(...args: Parameters<CatInterface["delete"]>): Promise<any>;
    deleteMany(...args: Parameters<CatInterface["deleteMany"]>): Promise<any>;
}
//# sourceMappingURL=CatService.d.ts.map