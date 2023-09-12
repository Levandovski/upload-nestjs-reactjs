import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UploadModule } from './upload/upload.module';
import { LoggerMiddleware } from './midddleware/logger.middleware';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UploadModule, PrismaModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'upload', method: RequestMethod.POST });
  }
}
