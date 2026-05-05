export class CatUpdateRequest {
    static async validate(req, catService) {
        const errors = [];
        const id = Number(req.params.id);
        const { name } = req.body;
        // Existence check
        const existing = await catService.returnOneById(id);
        if (!existing) {
            errors.push("Cat not found.");
        }
        // Name optional but must be valid if present
        if (name && (typeof name !== "string" || name.trim() === "")) {
            errors.push("Name must be a non-empty string.");
        }
        // Uniqueness check
        if (name) {
            const duplicate = await catService.returnOne({ name });
            if (duplicate && duplicate.id !== id) {
                errors.push("Name already exists.");
            }
        }
        const files = req.files;
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
//# sourceMappingURL=CatUpdateRequest.js.map