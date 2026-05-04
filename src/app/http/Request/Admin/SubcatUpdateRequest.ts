// src/app/http/Request/Admin/SubcatUpdateRequest.ts
import { Request } from "express";
import { SubcatService } from "@Service/Action/Admin/SubcatService";

export class SubcatUpdateRequest {
  static async validate(req: Request, subcatService: SubcatService): Promise<{ valid: boolean; errors?: string[] }> {
    const errors: string[] = [];
    const id = Number(req.params.id);
    const { catid, name, des, dess } = req.body;

    // Existence check
    const existing = await subcatService.returnOneById(id);
    if (!existing) {
      errors.push("Subcat not found.");
    }

    // catid required
    if (!catid || isNaN(Number(catid))) {
      errors.push("catid is required and must be a number.");
    }

    // name optional but must be valid if present
    if (name && (typeof name !== "string" || name.trim() === "")) {
      errors.push("Name must be a non-empty string.");
    }

    // des optional
    if (des && (typeof des !== "string")) {
      errors.push("des must be a string if provided.");
    }

    // dess optional
    if (dess && (typeof dess !== "string")) {
      errors.push("dess must be a string if provided.");
    }

    // Uniqueness check: combination of catid + name
    if (catid && name) {
      const duplicate = await subcatService.returnOne({ catid, name });
      if (duplicate && duplicate.id !== id) {
        errors.push("Subcat with this catid and name already exists.");
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
