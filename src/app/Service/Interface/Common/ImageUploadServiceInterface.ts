//src\app\Service\Interface\Common\ImageUploadServiceInterface.ts
export type ImageUploadResult = {
    large: string;
    small: string;
    original_name: string;
}

export type ImageUploadOptions = {
    maxWidth?: number;
    maxHeight?: number;
    thumbWidth?: number;
    thumbHeight?: number;
    baseFileName?: string;
}

export interface ImageUploadServiceInterface {
    upload(
        file: Express.Multer.File,
        largeFolder: string,
        smallFolder: string,
        options?: ImageUploadOptions
    ): Promise<ImageUploadResult>;
}