import { BadRequestException } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

export class S3Service {
  async upload(files: Array<Express.Multer.File>, bucketName: string) {
    try {
      const s3 = new S3();
      console.log(files);
      console.log(bucketName);
      if (!files) {
        throw new BadRequestException('Arquivo não recebido');
      }
      const params = files.map((file: any) => {
        return {
          Bucket: bucketName,
          Body: file.buffer,
          Key: `${uuid()}-${file.originalname}`,
          ContentType: file.mimetype,
        };
      });

      const uploadedImages = await Promise.all(
        params.map((param) => s3.upload(param).promise()),
      );

      return uploadedImages;
    } catch (error) {
      console.log(error);

      throw new BadRequestException('Erro ao salvar imagem');
    }
  }
}
