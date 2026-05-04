// src/app/Service/Action/Admin/ProdService.ts
import { Prod } from "@Model/Admin/Prod.model";
import { ProdInterface } from "@Repository/Interface/Admin/ProdInterface";
import { ProdServiceInterface } from "@Service/Interface/Admin/ProdServiceInterface";

export class ProdService implements ProdServiceInterface {
  private repository: ProdInterface;

  constructor(repository: ProdInterface) {
    this.repository = repository;
  }

  async returnMany(...args: Parameters<ProdInterface["returnMany"]>) {
    return this.repository.returnMany(...args);
  }

  async returnManyPaginated(...args: Parameters<ProdInterface["returnManyPaginated"]>) {
    return this.repository.returnManyPaginated(...args);
  }

  async returnSearchPaginatedWithDetails(...args: Parameters<ProdInterface["returnSearchPaginatedWithDetails"]>) {
    return this.repository.returnSearchPaginatedWithDetails(...args);
  }

  async returnOne(...args: Parameters<ProdInterface["returnOne"]>) {
    return this.repository.returnOne(...args);
  }

  async returnOneById(...args: Parameters<ProdInterface["returnOneById"]>) {
    return this.repository.returnOneById(...args);
  }

  async returnSearchMany(...args: Parameters<ProdInterface["returnSearchMany"]>) {
    return this.repository.returnSearchMany(...args);
  }

  async returnSearchPaginated(...args: Parameters<ProdInterface["returnSearchPaginated"]>) {
    return this.repository.returnSearchPaginated(...args);
  }

  async returnSearchOne(...args: Parameters<ProdInterface["returnSearchOne"]>) {
    return this.repository.returnSearchOne(...args);
  }

  async store(...args: Parameters<ProdInterface["store"]>) {
    return this.repository.store(...args);
  }

  async update(...args: Parameters<ProdInterface["update"]>) {
    return this.repository.update(...args);
  }

  async delete(...args: Parameters<ProdInterface["delete"]>) {
    return this.repository.delete(...args);
  }

  async deleteMany(...args: Parameters<ProdInterface["deleteMany"]>) {
    return this.repository.deleteMany(...args);
  }
}
