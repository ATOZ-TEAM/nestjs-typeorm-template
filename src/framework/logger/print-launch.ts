import { ApplicationLogger } from './application.logger';
import { appEnv, timeZone, db } from '../../config/environments';

export function printLaunch() {
  const logger = new ApplicationLogger();
  const log = (message: any) => logger.log(message, 'Print Launch Information');
  log('===== Environment Variables =====');
  console.table({ app: { appEnv, timeZone } });

  const { port, password, ...dbConf } = db;
  console.table({ db: dbConf });
}
