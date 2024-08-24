import cors from 'cors';
import { Express, json, urlencoded } from 'express';

export default (app: Express): void => {
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(cors());
};
