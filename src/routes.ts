import { logger } from '@loggers/logger.js';
import authRouter from '@routes/auth.routes.js';
import { NextFunction, Request, Response, Router } from 'express';

const routes: Router = Router({ mergeParams: true });

const getUrlMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    logger.silly(`URL: ${req.method} ${req.originalUrl}`);
    next();
};

routes.use(getUrlMiddleWare);

/**
 * @route /auth
 * @description Route for authentication
 */
routes.use('/auth', authRouter);

export default routes;
