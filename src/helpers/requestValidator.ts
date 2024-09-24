import { ValidationError } from '@errors/errorHandler.js';
import { Request } from 'express';
import Joi from 'joi';

interface Schema {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    query?: Joi.ObjectSchema<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params?: Joi.ObjectSchema<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: Joi.ObjectSchema<any>;
}

/**
 * @function RequestValidator
 * @description Validate request body, query and params
 * @param req {Request}
 * @param schema {Schema}
 * @returns void
 * @throws ValidationError
 */
export function RequestValidator(req: Request, schema: Schema) {
    const querySchema = schema.query;
    const paramsSchema = schema.params;
    const bodySchema = schema.body;
    if (querySchema) {
        const { error } = querySchema.validate(req.query);
        if (error) {
            throw new ValidationError(error.message);
        }
    }
    if (paramsSchema) {
        const { error } = paramsSchema.validate(req.params);
        if (error) {
            throw new ValidationError(error.message);
        }
    }
    if (bodySchema) {
        const { error } = bodySchema.validate(req.body);
        if (error) {
            throw new ValidationError(error.message);
        }
    }
}
