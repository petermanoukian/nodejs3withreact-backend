// src/app/Service/Action/Admin/CatService.ts
import { Cat, CatWithCounts } from "@Model/Admin/Cat.model";
import { CatInterface } from "@Repository/Interface/Admin/CatInterface";
import { CatServiceInterface } from "@Service/Interface/Admin/CatServiceInterface";

export class CatService implements CatServiceInterface {
  private repository: CatInterface;

  constructor(repository: CatInterface) {
    this.repository = repository;
  }

  async returnMany(...args: Parameters<CatInterface["returnMany"]>) {
    return this.repository.returnMany(...args);
  }

  async returnManyPaginated(...args: Parameters<CatInterface["returnManyPaginated"]>) {
    return this.repository.returnManyPaginated(...args);
  }

    // ✅ new
  async returnManyPaginatedWithCounts(...args: Parameters<CatInterface["returnManyPaginatedWithCounts"]>) {
    return this.repository.returnManyPaginatedWithCounts(...args);
  }

  async returnSearchManyWithCounts(
    ...args: Parameters<CatInterface["returnSearchManyWithCounts"]>
  ) {
    return this.repository.returnSearchManyWithCounts(...args);
  }

  async returnSearchPaginatedWithCounts(
    ...args: Parameters<CatInterface["returnSearchPaginatedWithCounts"]>
  ) {
    return this.repository.returnSearchPaginatedWithCounts(...args);
  }


  async returnOne(...args: Parameters<CatInterface["returnOne"]>) {
    return this.repository.returnOne(...args);
  }

  async returnOneById(...args: Parameters<CatInterface["returnOneById"]>) {
    return this.repository.returnOneById(...args);
  }

  async returnSearchMany(...args: Parameters<CatInterface["returnSearchMany"]>) {
    return this.repository.returnSearchMany(...args);
  }

  async returnSearchPaginated(...args: Parameters<CatInterface["returnSearchPaginated"]>) {
    return this.repository.returnSearchPaginated(...args);
  }

  async returnSearchOne(...args: Parameters<CatInterface["returnSearchOne"]>) {
    return this.repository.returnSearchOne(...args);
  }

  async store(...args: Parameters<CatInterface["store"]>) {
    return this.repository.store(...args);
  }

  async update(...args: Parameters<CatInterface["update"]>) {
    return this.repository.update(...args);
  }

  async delete(...args: Parameters<CatInterface["delete"]>) {
    return this.repository.delete(...args);
  }

  async deleteMany(...args: Parameters<CatInterface["deleteMany"]>) {
    return this.repository.deleteMany(...args);
  }
}
