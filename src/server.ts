import 'module-alias/register';
import '@config/env';
import http from 'http';

import express, { Express } from 'express';

import { initAppDataSource } from '@config/data-source';
import configExpress from '@config/express';
import configRoutes from '@config/routes';
import { runSeeds } from '@config/run-seeds';
import { logger } from '@utils/logger';

class Server {
  public app: Express;
  public port: number;
  public server: http.Server;

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT!) || 3000;
    this.server = http.createServer(this.app);
    Promise.resolve(this.init());
  }

  async init(): Promise<void> {
    try {
      await initAppDataSource();
      runSeeds();

      configExpress(this.app);
      configRoutes(this.app);

      this.server.listen(this.port, () =>
        logger('INFO', 'SERVER', process.env.NODE_ENV === 'dev' ? `Listening at http://localhost:${this.port}` : 'Started successfully.')
      );
    } catch (error) {
      logger('ERROR', 'SERVER - init', error);
    }
  }
}

export default new Server();
