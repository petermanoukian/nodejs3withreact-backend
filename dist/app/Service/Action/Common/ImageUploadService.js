"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageUploadService = void 0;
// src/app/Service/Action/Common/ImageUploadService.ts
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class ImageUploadService {
    async upload(file, largeFolder, smallFolder, options = {}) {
        const { maxWidth = 1500, maxHeight = 1000, thumbWidth = 200, thumbHeight = 200, baseFileName, } = options;
        const originalName = file.originalname;
        const extension = path_1.default.extname(originalName).toLowerCase();
        // Sanitize base name
        let baseName = baseFileName ?? path_1.default.basename(originalName, extension);
        baseName = baseName.replace(/[\s/]/g, '-');
        // Generate file name
        const random3 = Math.floor(100 + Math.random() * 900).toString();
        const fileName = `${baseName}-${random3}${extension}`;
        const relativeLargePath = `${largeFolder}/${fileName}`;
        const relativeSmallPath = `${smallFolder}/${fileName}`;
        const largePath = path_1.default.join('public', relativeLargePath);
        const smallPath = path_1.default.join('public', relativeSmallPath);
        fs_1.default.mkdirSync(path_1.default.dirname(largePath), { recursive: true });
        fs_1.default.mkdirSync(path_1.default.dirname(smallPath), { recursive: true });
        const metadata = await (0, sharp_1.default)(file.buffer).metadata();
        const needsResize = (metadata.width ?? 0) > maxWidth || (metadata.height ?? 0) > maxHeight;
        await (0, sharp_1.default)(file.buffer)
            .resize(needsResize ? { width: maxWidth, height: maxHeight, fit: 'inside', withoutEnlargement: true } : undefined)
            .toFile(largePath);
        await (0, sharp_1.default)(file.buffer)
            .resize({ width: thumbWidth, height: thumbHeight, fit: 'cover' })
            .toFile(smallPath);
        return {
            large: relativeLargePath,
            small: relativeSmallPath,
            original_name: originalName,
        };
    }
}
exports.ImageUploadService = ImageUploadService;
//# sourceMappingURL=ImageUploadService.js.map