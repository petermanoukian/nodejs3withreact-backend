import { Subcat } from "../../../Model/Admin/Subcat.model";
import { SubcatInterface } from "../../../Repository/Interface/Admin/SubcatInterface";
import { SubcatServiceInterface } from "../../Interface/Admin/SubcatServiceInterface";
export declare class SubcatService implements SubcatServiceInterface {
    private repository;
    constructor(repository: SubcatInterface);
    returnMany(...args: Parameters<SubcatInterface["returnMany"]>): Promise<Subcat[]>;
    returnManyPaginated(...args: Parameters<SubcatInterface["returnManyPaginated"]>): Promise<{
        data: Subcat[];
        total: number;
    }>;
    returnSearchPaginatedWithCounts(...args: Parameters<SubcatInterface["returnSearchPaginatedWithCounts"]>): Promise<{
        data: import("../../../Repository/Interface/Admin/SubcatInterface").SubcatWithCounts[];
        total: number;
    }>;
    returnOne(...args: Parameters<SubcatInterface["returnOne"]>): Promise<Subcat | null>;
    returnOneById(...args: Parameters<SubcatInterface["returnOneById"]>): Promise<Subcat | null>;
    returnSearchMany(...args: Parameters<SubcatInterface["returnSearchMany"]>): Promise<Subcat[]>;
    returnSearchPaginated(...args: Parameters<SubcatInterface["returnSearchPaginated"]>): Promise<{
        data: Subcat[];
        total: number;
    }>;
    returnSearchOne(...args: Parameters<SubcatInterface["returnSearchOne"]>): Promise<Subcat | null>;
    store(...args: Parameters<SubcatInterface["store"]>): Promise<Subcat>;
    update(...args: Parameters<SubcatInterface["update"]>): Promise<Subcat>;
    delete(...args: Parameters<SubcatInterface["delete"]>): Promise<void>;
    deleteMany(...args: Parameters<SubcatInterface["deleteMany"]>): Promise<void>;
}
//# sourceMappingURL=SubcatService.d.ts.map