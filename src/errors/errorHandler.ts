import { NextFunction, Request, Response } from 'express';
import os from 'os';

const deployEnv = process.env.DEPLOY_ENV || 'development';

export class ApiError extends Error {
    statusCode: number;

    name: string;

    static message: string;

    static statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
    }
}

export class ValidationError extends ApiError {
    constructor(message: string) {
        super(400, message);
    }
}

// Default Error Handler
export function defaultErrorHandler(
    err: Error,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
) {
    const DEFAULT_ERROR_CODE = 500;
    // Validation Error Handler
    if (err instanceof ValidationError) {
        console.log(err.message);
        return res.status(400).json({
            message: err.message,
            debugInfo: os.hostname(),
            timestamp: new Date().toISOString(),
        });
    }
    // Api Error Handler
    if (err instanceof ApiError) {
        console.log(err);
        const statusCode = err.statusCode || DEFAULT_ERROR_CODE;
        return res.status(statusCode).json({
            message: err.message,
            debugInfo: os.hostname(),
            timestamp: new Date().toISOString(),
        });
    }
    // Unauthorized Error Handler
    if (
        err.name === 'UnauthorizedError' ||
        err.name === 'InvalidTokenError' ||
        err.name === 'InvalidRequestError' ||
        err.name === 'InsufficientScopeError'
    ) {
        return res.status(401).json({
            message: 'Unauthorized',
            debugInfo: os.hostname(),
            timestamp: new Date().toISOString(),
        });
    }
    console.log(err);
    return res.status(DEFAULT_ERROR_CODE).json({
        message: 'Something went wrong!',
        debugInfo: os.hostname(),
        timestamp: new Date().toISOString(),
        error: deployEnv !== 'production' ? err.message : null,
    });
}
