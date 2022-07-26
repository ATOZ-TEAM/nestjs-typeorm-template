import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpLoggerMiddleware } from './framework/logger/http-logger.middleware';
import { ApplicationLogger } from './framework/logger/application.logger';
import { HttpExceptionFilter } from './framework/errors/exception.filter';
import TypePipe from './framework/pipes/type.pipe';
import { DatabaseModule } from './db/database.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    ApiModule,
  ],
  controllers: [],
  providers: [
    ApplicationLogger,
    HttpLoggerMiddleware,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    TypePipe,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
