import { BadRequestException, Injectable } from '@nestjs/common';
import { S3Service } from 'src/common/services/s3-service';

@Injectable()
export class FileUploadService {
  constructor(private s3Service: S3Service) {}

  async save(file: Array<Express.Multer.File>) {
    try {
      console.log(file);
      let fileURL;
      const fileS3 = await this.s3Service.upload(
        file,
        process.env.AWS_PUBLIC_BUCKET_NAME,
      );
      if (file.length > 0) fileURL = fileS3[0].Location;
      console.log(file);
      return {
        file: fileURL,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro ao salvar imagem');
    }
  }
}
