"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdService = void 0;
class ProdService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async returnMany(...args) {
        return this.repository.returnMany(...args);
    }
    async returnManyPaginated(...args) {
        return this.repository.returnManyPaginated(...args);
    }
    async returnSearchPaginatedWithDetails(...args) {
        return this.repository.returnSearchPaginatedWithDetails(...args);
    }
    async returnOne(...args) {
        return this.repository.returnOne(...args);
    }
    async returnOneById(...args) {
        return this.repository.returnOneById(...args);
    }
    async returnSearchMany(...args) {
        return this.repository.returnSearchMany(...args);
    }
    async returnSearchPaginated(...args) {
        return this.repository.returnSearchPaginated(...args);
    }
    async returnSearchOne(...args) {
        return this.repository.returnSearchOne(...args);
    }
    async store(...args) {
        return this.repository.store(...args);
    }
    async update(...args) {
        return this.repository.update(...args);
    }
    async delete(...args) {
        return this.repository.delete(...args);
    }
    async deleteMany(...args) {
        return this.repository.deleteMany(...args);
    }
}
exports.ProdService = ProdService;
//# sourceMappingURL=ProdService.js.map