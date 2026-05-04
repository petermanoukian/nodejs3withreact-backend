import { ImageUploadServiceInterface, ImageUploadOptions, ImageUploadResult } from '../../Interface/Common/ImageUploadServiceInterface';
export declare class ImageUploadService implements ImageUploadServiceInterface {
    upload(file: Express.Multer.File, largeFolder: string, smallFolder: string, options?: ImageUploadOptions): Promise<ImageUploadResult>;
}
//# sourceMappingURL=ImageUploadService.d.ts.map