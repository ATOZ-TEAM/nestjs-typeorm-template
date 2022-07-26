// You can load you .env file here synchronously using dotenv package (not installed here),
import * as dotenv from 'dotenv';
// import * as fs from 'fs';
// const environment = process.env.NODE_ENV || 'development';
// const data: any = dotenv.parse(fs.readFileSync(`${environment}.env`));
// You can also make a singleton service that load and expose the .env file content.
// ...
dotenv.config({ path: `./.env` });

/**
 * 실행 시 아래와 같이 실행할 수 있습니다.
 * (.env.staging 또는 .env.production 파일이 있어야 합니다.)
 * NODE_ENV=staging yarn start:dev
 * NODE_ENV=production yarn start:dev
 */
const dotenvFilename: string =
  {
    staging: '.env.staging',
    production: '.env.production',
  }[process.env.NODE_ENV] || '.env';
dotenv.config({ path: `./${dotenvFilename}`, override: true });
dotenv.config({ path: './.env.local' });

export enum APP_ENV {
  DEV = 'development',
  TEST = 'test',
  STAGE = 'staging',
  PROD = 'production',
}

export const appEnv: APP_ENV = (process.env.NODE_ENV as APP_ENV) || APP_ENV.DEV;
export const port = process.env.PORT || 8000;
export const timeZone = process.env.TZ;

export const db = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: process.env.DB_LOGGING === 'true',
};
