import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { readFileSync } from 'fs';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  convertToBase64InBuffer,
  convertToBufferInBase64,
} from 'src/utilts/convertBuffer';
import { CreateUploadDto } from './dto/create-upload.dto';

interface ISelect {
  page: number;
  take: number;
  sort: string;
  order: string;
  search: string;
  fields: string;
}
@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {}

  async uploadFile({ file }: CreateUploadDto) {
    try {
      await this.prisma.file.create({
        data: {
          name: (() => {
            const nameFormated = file.originalname.split('.');
            nameFormated.pop();
            return nameFormated.join('.');
          })(),
          file: file.buffer,
          size: file.size,
          filename: file.originalname,
          type: file.mimetype,
        },
      });
      return `Imagem ${file.originalname} salva com sucesso`;
    } catch {
      throw new UnauthorizedException('Não foi possível salvar a imagem');
    }
  }

  async getAllImages({ order, page, search, take, sort, fields }: ISelect) {
    const selectFields = {};

    if (fields !== '') {
      const arrFields = fields.replace(/( )+/gi, '').split(',');

      arrFields.length === 1
        ? (selectFields[arrFields[0]] = true)
        : arrFields.map((e) => {
            selectFields[e] = true;
          });
    }

    const results = await this.prisma.file.findMany({
      skip: Number(page) * Number(take) - Number(take),
      take: Number(take),
      where: {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
      ...(fields && { select: { ...selectFields } }),
      orderBy: { [sort]: order },
    });

    const totalItems = await this.prisma.file.count({
      where: {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
    });

    return {
      results,
      pagination: {
        length: totalItems,
        take: Number(take),
        lastPage: Math.ceil(totalItems / take),
        currentPage: Number(page),
        nextPage:
          Number(page) < Math.ceil(totalItems / take)
            ? Number(page) + 1
            : Math.ceil(totalItems / take),
        previousPage: Number(page) - 1 !== 0 ? Number(page) - 1 : 1,
      },
    };
  }

  async getImages(filename: string) {
    let name: string = filename;

    if (!name) throw new NotFoundException('Nenhuma imagem encontrada');

    const nameFormated = filename.split('.');
    if (nameFormated.length > 1) {
      nameFormated.pop();
      name = nameFormated.join('.');
    }

    const findAllFiles: any = await this.prisma.file.findFirst({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });

    if (!findAllFiles) throw new NotFoundException('Nenhuma imagem encontrada');

    return findAllFiles;
  }
}
