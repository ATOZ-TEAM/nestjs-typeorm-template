import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { appEnv, db } from './environments';

type Dialect = 'mysql' | 'mariadb' | 'postgres';

const { dialect, host, port, username, password, database } = db;

const serverEnv = ['staging', 'production'];

export const typeORMConfig: TypeOrmModuleOptions = {
  type: dialect as Dialect,
  host,
  port,
  username,
  password,
  database,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false, // 절대로 이 값을 true 로 바꾸지 마세요. 디비 스키마를 강제로 동기화 시키기 위해 모든 데이터를 날리게 됩니다.
  migrationsRun: serverEnv.includes(appEnv), // 배포시에는 migration 이 동시실행 되어야 합니다. (참고: https://wikidocs.net/158618)
  migrations: ['dist/src/db/migrations/**/*{.ts,.js}'],
  // cli: {
  //   migrationsDir: 'src/db/migrations',
  // },
  logging: db.logging,

  // // 참고: https://github.com/w3tecch/typeorm-seeding
  // seeds: ['dist/src/db/seeds/**/*.js'],
  // factories: ['dist/src/db/factories/**/*{.ts,.js}'],
};
