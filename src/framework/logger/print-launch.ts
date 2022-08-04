import { ApplicationLogger } from './application.logger';
import { appEnv, timeZone, port, db } from '../../config/environments';

export function printLaunch() {
  const logger = new ApplicationLogger();
  const log = (message: any) => logger.log(message, 'Print Launch Information');
  log('===== Environment Variables =====');
  console.table({ app: { appEnv, timeZone, port } });

  const { port: dbPort, password, ...dbConf } = db;
  console.table({ db: dbConf });
}
