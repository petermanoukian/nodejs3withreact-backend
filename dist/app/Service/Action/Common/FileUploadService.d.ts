import { FileUploadServiceInterface, FileUploadOptions, FileUploadResult } from '@ServiceInterface/Common/FileUploadServiceInterface';
export declare class FileUploadService implements FileUploadServiceInterface {
    upload(file: Express.Multer.File, folder: string, options?: FileUploadOptions): Promise<FileUploadResult>;
    remove(filePath: string): Promise<boolean>;
}
//# sourceMappingURL=FileUploadService.d.ts.map