"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadService = void 0;
// src/app/Service/Action/Common/FileUploadService.ts
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class FileUploadService {
    async upload(file, folder, options = {}) {
        const { baseFileName } = options;
        const originalName = file.originalname;
        const extension = path_1.default.extname(originalName).toLowerCase();
        let baseName = baseFileName ?? path_1.default.basename(originalName, extension);
        baseName = baseName.replace(/[\s/]/g, '-');
        let fileName;
        if (baseFileName) {
            fileName = `${baseName}${extension}`;
        }
        else {
            const randomSuffix = `${Date.now()}_${Math.random().toString(36).slice(2)}`;
            fileName = `${baseName}-${randomSuffix}${extension}`;
        }
        const relativePath = `${folder}/${fileName}`;
        const absolutePath = path_1.default.join('public', relativePath);
        fs_1.default.mkdirSync(path_1.default.dirname(absolutePath), { recursive: true });
        await fs_1.default.promises.writeFile(absolutePath, file.buffer);
        return {
            fileName,
            originalName,
            mimeType: file.mimetype,
            size: file.size,
            path: relativePath,
        };
    }
    async remove(filePath) {
        try {
            const absolutePath = path_1.default.join('public', filePath);
            if (fs_1.default.existsSync(absolutePath)) {
                await fs_1.default.promises.unlink(absolutePath);
                return true;
            }
            return false;
        }
        catch (error) {
            console.error(`Failed to remove file: ${filePath}`, error);
            return false;
        }
    }
}
exports.FileUploadService = FileUploadService;
//# sourceMappingURL=FileUploadService.js.map