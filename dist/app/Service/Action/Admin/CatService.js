export class CatService {
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
    // ✅ new
    async returnManyPaginatedWithCounts(...args) {
        return this.repository.returnManyPaginatedWithCounts(...args);
    }
    async returnSearchManyWithCounts(...args) {
        return this.repository.returnSearchManyWithCounts(...args);
    }
    async returnSearchPaginatedWithCounts(...args) {
        return this.repository.returnSearchPaginatedWithCounts(...args);
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
//# sourceMappingURL=CatService.js.map