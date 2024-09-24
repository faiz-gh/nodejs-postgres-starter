import * as AuthService from '@services/auth.service.js';
import { Request, Response, NextFunction } from 'express';
import { RequestValidator } from 'helpers/requestValidator.js';
import Joi from 'joi';

/**
 * @function register
 * @description Controller for POST /auth/register
 */
export async function register(req: Request, res: Response, next: NextFunction) {
    try {
        RequestValidator(req, {
            body: Joi.object({
                name: Joi.string().optional(),
                username: Joi.string().optional(),
                email: Joi.string().email().required(),
                password: Joi.string().required(),
                passwordConfirm: Joi.string().required(),
                emailVisibility: Joi.boolean().default('false').optional(),
            }),
        });
        const data = await AuthService.register(
            req.body as unknown as ICreateUserRequest
        );
        res.json(data);
    } catch (error) {
        next(error);
    }
}