import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';
import { S3Service } from 'src/common/services/s3-service';

@Module({
  controllers: [FileUploadController],
  providers: [FileUploadService, S3Service],
})
export class FileUploadModule {}
