import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_ENV, appEnv } from '../config/environments';
import typeORMConfig from '../config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          ...typeORMConfig,
          autoLoadEntities: true,
          dropSchema: appEnv === APP_ENV.TEST,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
