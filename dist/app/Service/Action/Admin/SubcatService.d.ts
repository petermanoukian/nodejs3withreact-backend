import { SubcatInterface } from "@Repository/Interface/Admin/SubcatInterface";
import { SubcatServiceInterface } from "@Service/Interface/Admin/SubcatServiceInterface";
export declare class SubcatService implements SubcatServiceInterface {
    private repository;
    constructor(repository: SubcatInterface);
    returnMany(...args: Parameters<SubcatInterface["returnMany"]>): Promise<any>;
    returnManyPaginated(...args: Parameters<SubcatInterface["returnManyPaginated"]>): Promise<any>;
    returnSearchPaginatedWithCounts(...args: Parameters<SubcatInterface["returnSearchPaginatedWithCounts"]>): Promise<any>;
    returnOne(...args: Parameters<SubcatInterface["returnOne"]>): Promise<any>;
    returnOneById(...args: Parameters<SubcatInterface["returnOneById"]>): Promise<any>;
    returnSearchMany(...args: Parameters<SubcatInterface["returnSearchMany"]>): Promise<any>;
    returnSearchPaginated(...args: Parameters<SubcatInterface["returnSearchPaginated"]>): Promise<any>;
    returnSearchOne(...args: Parameters<SubcatInterface["returnSearchOne"]>): Promise<any>;
    store(...args: Parameters<SubcatInterface["store"]>): Promise<any>;
    update(...args: Parameters<SubcatInterface["update"]>): Promise<any>;
    delete(...args: Parameters<SubcatInterface["delete"]>): Promise<any>;
    deleteMany(...args: Parameters<SubcatInterface["deleteMany"]>): Promise<any>;
}
//# sourceMappingURL=SubcatService.d.ts.map