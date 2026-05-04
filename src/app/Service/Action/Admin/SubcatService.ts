// src/app/Service/Action/Admin/SubcatService.ts
import { Subcat } from "@Model/Admin/Subcat.model";
import { SubcatInterface } from "@Repository/Interface/Admin/SubcatInterface";
import { SubcatServiceInterface } from "@Service/Interface/Admin/SubcatServiceInterface";

export class SubcatService implements SubcatServiceInterface {
  private repository: SubcatInterface;

  constructor(repository: SubcatInterface) {
    this.repository = repository;
  }

  async returnMany(...args: Parameters<SubcatInterface["returnMany"]>) {
    return this.repository.returnMany(...args);
  }

  async returnManyPaginated(...args: Parameters<SubcatInterface["returnManyPaginated"]>) {
    return this.repository.returnManyPaginated(...args);
  }

  async returnSearchPaginatedWithCounts(
    ...args: Parameters<SubcatInterface["returnSearchPaginatedWithCounts"]>
  ) {
    return this.repository.returnSearchPaginatedWithCounts(...args);
  }


  async returnOne(...args: Parameters<SubcatInterface["returnOne"]>) {
    return this.repository.returnOne(...args);
  }

  async returnOneById(...args: Parameters<SubcatInterface["returnOneById"]>) {
    return this.repository.returnOneById(...args);
  }

  async returnSearchMany(...args: Parameters<SubcatInterface["returnSearchMany"]>) {
    return this.repository.returnSearchMany(...args);
  }

  async returnSearchPaginated(...args: Parameters<SubcatInterface["returnSearchPaginated"]>) {
    return this.repository.returnSearchPaginated(...args);
  }

  async returnSearchOne(...args: Parameters<SubcatInterface["returnSearchOne"]>) {
    return this.repository.returnSearchOne(...args);
  }

  async store(...args: Parameters<SubcatInterface["store"]>) {
    return this.repository.store(...args);
  }

  async update(...args: Parameters<SubcatInterface["update"]>) {
    return this.repository.update(...args);
  }

  async delete(...args: Parameters<SubcatInterface["delete"]>) {
    return this.repository.delete(...args);
  }

  async deleteMany(...args: Parameters<SubcatInterface["deleteMany"]>) {
    return this.repository.deleteMany(...args);
  }
}

