// src/app/Service/Interface/Common/FileUploadServiceInterface.ts

export type FileUploadResult = {
    fileName: string;
    originalName: string;
    mimeType: string;
    size: number;
    path: string;
}

export type FileUploadOptions = {
    allowedMimeTypes?: string[];
    maxSizeInBytes?: number;
    baseFileName?: string;
}

export interface FileUploadServiceInterface {
    upload(
        file: Express.Multer.File,
        folder: string,
        options?: FileUploadOptions
    ): Promise<FileUploadResult>;

    remove(filePath: string): Promise<boolean>;
}