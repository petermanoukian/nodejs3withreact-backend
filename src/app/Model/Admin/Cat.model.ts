export interface Cat {
  id: number;
  name: string;
  img?: string;      // optional large image
  img2?: string;     // optional thumbnail
  filer?: string;    // optional file
  created_at?: Date; // auto-managed by Knex timestamps
  updated_at?: Date; // auto-managed by Knex timestamps
}


export interface CatWithCounts extends Cat {
  subcatCount: number;
  prodCount: number;
}