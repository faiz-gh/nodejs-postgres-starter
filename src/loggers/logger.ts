import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import os from 'os';

const logLevels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
};

const env = process.env.DEPLOY_ENV || 'development';

const hostname = os.hostname();

const logger = createLogger({
    levels: logLevels,
    defaultMeta: {
        service: `nebe-backend-${env}`,
        hostname: hostname,
    },
    transports: [
        new transports.Console({
            level: process.env.LOG_LEVEL || 'debug',
            format: format.combine(
                format.colorize({ all: true }),
                format.simple()
            ),
        }),
        new DailyRotateFile({
            filename: `logs/combined-${hostname}-%DATE%.log`,
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '30d',
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),
                format.errors({ stack: true }),
                format.json()
            ),
        }),
        new DailyRotateFile({
            filename: `logs/error-${hostname}-%DATE%.log`,
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '30d',
            level: 'error',
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),
                format.errors({ stack: true }),
                format.json()
            ),
        }),
        // TODO: Add Sentry transport
    ],
});

export { logger };