export interface Cat {
    id: number;
    name: string;
    img?: string;
    img2?: string;
    filer?: string;
    created_at?: Date;
    updated_at?: Date;
}
export interface CatWithCounts extends Cat {
    subcatCount: number;
    prodCount: number;
}
//# sourceMappingURL=Cat.model.d.ts.map