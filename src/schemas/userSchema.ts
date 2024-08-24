import Joi from 'joi';

export const createUserSchema: Joi.ObjectSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(16).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,32}$')).required(),
});
