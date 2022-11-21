import { config } from 'dotenv';
import { join } from 'path';
import { DataSourceOptions } from 'typeorm';

config();
config({ path: join(process.cwd(), '.default.env') });

export const DbConnectionOptions: DataSourceOptions = {
  type: process.env.DB_TYPE as 'postgres' | 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
};
