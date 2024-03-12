import { DataSource } from 'typeorm';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

export const dbConfig: any = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [join(__dirname, '../src/**/*.entity.{ts,js,!d.ts}')],
  migrations: [join(__dirname, './migrations/*.{ts,js,!d.ts}')],
  autoLoadEntities: true,
  migrationsRun: true,
  logging: true,
  ...(process.env.NODE_ENV !== 'local' && {
    logging: false,
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  }),
};

export const CliDataSource = new DataSource(dbConfig);
