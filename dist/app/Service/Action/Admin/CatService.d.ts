import { Cat, CatWithCounts } from "../../../Model/Admin/Cat.model";
import { CatInterface } from "../../../Repository/Interface/Admin/CatInterface";
import { CatServiceInterface } from "../../Interface/Admin/CatServiceInterface";
export declare class CatService implements CatServiceInterface {
    private repository;
    constructor(repository: CatInterface);
    returnMany(...args: Parameters<CatInterface["returnMany"]>): Promise<Cat[]>;
    returnManyPaginated(...args: Parameters<CatInterface["returnManyPaginated"]>): Promise<{
        data: Cat[];
        total: number;
    }>;
    returnManyPaginatedWithCounts(...args: Parameters<CatInterface["returnManyPaginatedWithCounts"]>): Promise<{
        data: CatWithCounts[];
        total: number;
    }>;
    returnSearchManyWithCounts(...args: Parameters<CatInterface["returnSearchManyWithCounts"]>): Promise<CatWithCounts[]>;
    returnSearchPaginatedWithCounts(...args: Parameters<CatInterface["returnSearchPaginatedWithCounts"]>): Promise<{
        data: CatWithCounts[];
        total: number;
    }>;
    returnOne(...args: Parameters<CatInterface["returnOne"]>): Promise<Cat | null>;
    returnOneById(...args: Parameters<CatInterface["returnOneById"]>): Promise<Cat | null>;
    returnSearchMany(...args: Parameters<CatInterface["returnSearchMany"]>): Promise<Cat[]>;
    returnSearchPaginated(...args: Parameters<CatInterface["returnSearchPaginated"]>): Promise<{
        data: Cat[];
        total: number;
    }>;
    returnSearchOne(...args: Parameters<CatInterface["returnSearchOne"]>): Promise<Cat | null>;
    store(...args: Parameters<CatInterface["store"]>): Promise<Cat>;
    update(...args: Parameters<CatInterface["update"]>): Promise<Cat>;
    delete(...args: Parameters<CatInterface["delete"]>): Promise<void>;
    deleteMany(...args: Parameters<CatInterface["deleteMany"]>): Promise<void>;
}
//# sourceMappingURL=CatService.d.ts.map