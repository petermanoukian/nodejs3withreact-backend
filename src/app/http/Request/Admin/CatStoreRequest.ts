// src/app/http/Request/Admin/CatStoreRequest.ts
import { Request } from "express";
import { CatService } from "@Service/Action/Admin/CatService";

export class CatStoreRequest {
  static async validate(req: Request, catService: CatService): Promise<{ valid: boolean; errors?: string[] }> {
    const errors: string[] = [];
    const { name } = req.body;

    // Name required
    if (!name || typeof name !== "string" || name.trim() === "") {
      errors.push("Name is required.");
    }

    // Uniqueness check
    if (name) {
      const existing = await catService.returnOne({ name });
      if (existing) {
        errors.push("Name already exists.");
      }
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // Image validation
    if (files?.img?.[0]) {
      const img = files.img[0];
      const allowedImageTypes = ["image/jpeg", "image/jpg", "image/gif", "image/png", "image/webp", "image/tiff"];
      if (!allowedImageTypes.includes(img.mimetype)) {
        errors.push(`Image type ${img.mimetype} is not allowed.`);
      }
      if (img.size > 20 * 1024 * 1024) {
        errors.push("Image must not exceed 20MB.");
      }
    }

    // File validation
    if (files?.filer?.[0]) {
      const filer = files.filer[0];
      const allowedFileTypes = [
        "image/jpeg", "image/jpg", "image/gif", "image/png", "image/webp", "image/tiff",
        "application/pdf", "text/plain",
        "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/json",
        "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/html"
      ];
      if (!allowedFileTypes.includes(filer.mimetype)) {
        errors.push(`File type ${filer.mimetype} is not allowed.`);
      }
      if (filer.size > 20 * 1024 * 1024) {
        errors.push("File must not exceed 20MB.");
      }
    }

    return errors.length > 0 ? { valid: false, errors } : { valid: true };
  }
}
