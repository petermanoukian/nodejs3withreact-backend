// src/app/Model/Admin/Prod.model.ts
export interface Prod {
  id: number;
  catid: number;       // required, foreign key to Cat
  subcatid: number;    // required, foreign key to Subcat
  name: string;
  des?: string;        // optional description
  dess?: string;       // optional secondary description
  img?: string;        // optional large image
  img2?: string;       // optional thumbnail
  filer?: string;      // optional file
  created_at?: Date;   // auto-managed by Knex timestamps
  updated_at?: Date;   // auto-managed by Knex timestamps
}
