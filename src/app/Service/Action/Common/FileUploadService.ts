// src/app/Service/Action/Common/FileUploadService.ts
import path from 'path';
import fs from 'fs';
import { 
    FileUploadServiceInterface, 
    FileUploadOptions, 
    FileUploadResult 
} from '@ServiceInterface/Common/FileUploadServiceInterface';

export class FileUploadService implements FileUploadServiceInterface {

    async upload(
        file: Express.Multer.File,
        folder: string,
        options: FileUploadOptions = {}
    ): Promise<FileUploadResult> {
        const { baseFileName } = options;

        const originalName = file.originalname;
        const extension = path.extname(originalName).toLowerCase();

        let baseName = baseFileName ?? path.basename(originalName, extension);
        baseName = baseName.replace(/[\s/]/g, '-');

        let fileName: string;
        if (baseFileName) {
            fileName = `${baseName}${extension}`;
        } else {
            const randomSuffix = `${Date.now()}_${Math.random().toString(36).slice(2)}`;
            fileName = `${baseName}-${randomSuffix}${extension}`;
        }

        const relativePath = `${folder}/${fileName}`;
        const absolutePath = path.join('public', relativePath);

        fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
        await fs.promises.writeFile(absolutePath, file.buffer);

        return {
            fileName,
            originalName,
            mimeType: file.mimetype,
            size: file.size,
            path: relativePath,
        };
    }

    async remove(filePath: string): Promise<boolean> {
        try {
            const absolutePath = path.join('public', filePath);
            if (fs.existsSync(absolutePath)) {
                await fs.promises.unlink(absolutePath);
                return true;
            }
            return false;
        } catch (error) {
            console.error(`Failed to remove file: ${filePath}`, error);
            return false;
        }
    }
}
