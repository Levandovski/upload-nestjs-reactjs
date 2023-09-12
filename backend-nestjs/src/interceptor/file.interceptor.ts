import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnprocessableEntityException,
} from '@nestjs/common';

import { HttpException, HttpStatus } from '@nestjs/common';
import { fromBuffer } from 'file-type';

const MAX_SIZE_FILE = 3; //3mb

@Injectable()
export class FileFormatInterceptor implements NestInterceptor {
  constructor(private allowedFormats: string[]) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const file: Express.Multer.File = request.file;
    if (!file) {
      throw new HttpException('Imagem não encontrada!', HttpStatus.BAD_REQUEST);
    }

    const resultValidate = await fromBuffer(file.buffer);

    if (resultValidate === undefined) {
      throw new UnprocessableEntityException(
        `Arquivo ${file.originalname} está corrompido ou é malicioso!`,
      );
    }

    const fileFormat = file.originalname.split('.').pop();

    if (fileFormat !== resultValidate.ext) {
      throw new UnprocessableEntityException(
        `Arquivo ${file.originalname} está corrompido ou é malicioso!`,
      );
    }

    if (!this.allowedFormats.includes(resultValidate.ext.toLowerCase())) {
      throw new UnprocessableEntityException(
        `O Arquivo ${
          file.originalname
        } está no formato inválido! Insira uma imagem nos formatos ${this.allowedFormats.join(
          ', ',
        )}`,
      );
    }

    const sizeValue = Number(file.size) / 1024 / 1024; //Convert from Byte to MB

    if (sizeValue > MAX_SIZE_FILE)
      throw new UnprocessableEntityException(
        `O tamanho da imagem ${file.originalname} inserida é inválida!`,
      );

    return next.handle();
  }
}
