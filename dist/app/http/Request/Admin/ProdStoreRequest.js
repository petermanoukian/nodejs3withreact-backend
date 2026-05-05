export class ProdStoreRequest {
    static async validate(req, prodService) {
        const errors = [];
        const { catid, subcatid, name, des, dess } = req.body;
        // catid required
        if (!catid || isNaN(Number(catid))) {
            errors.push("catid is required and must be a number.");
        }
        // subcatid required
        if (!subcatid || isNaN(Number(subcatid))) {
            errors.push("subcatid is required and must be a number.");
        }
        // name required
        if (!name || typeof name !== "string" || name.trim() === "") {
            errors.push("Name is required.");
        }
        // des optional
        if (des && typeof des !== "string") {
            errors.push("des must be a string if provided.");
        }
        // dess optional
        if (dess && typeof dess !== "string") {
            errors.push("dess must be a string if provided.");
        }
        // Uniqueness check: combination of catid + subcatid + name
        if (catid && subcatid && name) {
            const existing = await prodService.returnOne({ catid, subcatid, name });
            if (existing) {
                errors.push("Prod with this catid, subcatid, and name already exists.");
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
//# sourceMappingURL=ProdStoreRequest.js.map