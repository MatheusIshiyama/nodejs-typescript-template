import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

type SchemaValidatorMiddlewareReturn = (req: Request, res: Response, next: NextFunction) => void;

export function schemaValidatorMiddleware(schema: Joi.ObjectSchema): SchemaValidatorMiddlewareReturn {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    next();
  };
}
