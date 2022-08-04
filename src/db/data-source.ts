import { DataSource } from 'typeorm';
import typeormConfig from '../config/typeorm.config';

const AppDataSource = new DataSource(typeormConfig);
export default AppDataSource;
