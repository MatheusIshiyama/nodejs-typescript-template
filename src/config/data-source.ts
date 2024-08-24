import 'reflect-metadata';

import { DataSource } from 'typeorm';

import { User } from '@models/User';
import { logger } from '@utils/logger';

export const AppDataSource: DataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ...(process.env.NODE_ENV === 'dev' && {
    ssl: false,
  }),
  synchronize: true,
  logging: process.env.NODE_ENV === 'dev' && process.env.DATASOURCE_LOGGING === 'true',
  entities: [User],
  migrations: ['src/migration/*.ts'],
  subscribers: [],
});

export async function initAppDataSource(): Promise<any> {
  try {
    await AppDataSource.initialize();

    logger('SUCCESS', 'DATABASE', 'Connected Successfully.');
  } catch (error) {
    logger('ERROR', 'DATA SOURCE - initAppDataSource', error);
    throw error;
  }
}
