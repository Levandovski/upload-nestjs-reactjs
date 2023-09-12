import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Res,
  Param,
  NotFoundException,
  Query,
  UnprocessableEntityException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

import { join } from 'path';

import { Response } from 'express';
import { createReadStream, existsSync, writeFileSync } from 'fs';
import {
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { FileFormatInterceptor } from 'src/interceptor/file.interceptor';

interface ISelect {
  page: number;
  take: number;
  sort: string;
  order: string;
  search: string;
  fields: string;
}

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: HttpStatus.CREATED })
  @UseInterceptors(
    FileInterceptor('file'),
    new FileFormatInterceptor(['jpg', 'jpeg', 'png', '.heic']),
  )
  uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.uploadService.uploadFile({ file });
  }

  @Get()
  @ApiQuery({
    name: 'page',
    type: 'number',
    example: 1,
  })
  @ApiQuery({
    name: 'order',
    type: 'string',
    enum: ['asc', 'desc'],
    example: 'asc',
  })
  @ApiQuery({
    name: 'take',
    type: 'number',
    example: 8,
  })
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
  })
  @ApiQuery({
    name: 'sort',
    type: 'string',
    example: 'name',
  })
  @ApiQuery({
    name: 'fields',
    type: 'string',
    enum: ['name, filename', 'name', 'filiname'],
    example: 'name, filename',
  })
  async getAllImages(
    @Query()
    {
      page = 1,
      order = 'asc',
      take = 8,
      search,
      sort = 'name',
      fields,
    }: ISelect,
  ) {
    const logs = [];

    if (Number(page) === 0) {
      logs.push('O atributo page deve ser acima de 0!');
    }

    if (Number(take) === 0) {
      logs.push('O atributo take deve ser acima de 0!');
    }

    if (logs.length > 0) {
      throw new UnprocessableEntityException(logs);
    }

    return await this.uploadService.getAllImages({
      page,
      order,
      take,
      search,
      sort,
      fields,
    });
  }

  @Get(':name')
  async getImages(@Res() res: Response, @Param('name') name: string) {
    const fileFind = await this.uploadService.getImages(name);

    if (!fileFind) throw new NotFoundException('Imagem não encontrada');

    res.setHeader('Content-Disposition', `attachment; filename: ${name}`);

    const createFileInFolder = async () => {
      await writeFileSync(
        join(process.cwd(), 'upload', fileFind.filename),
        fileFind.file,
      );
    };

    if (!existsSync(join(process.cwd(), 'upload', fileFind.filename)))
      await createFileInFolder();

    const file = createReadStream(
      join(process.cwd(), 'upload', fileFind.filename),
    );

    file.pipe(res);
  }
}
