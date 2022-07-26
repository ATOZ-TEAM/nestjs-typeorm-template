import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ApplicationLogger } from './application.logger';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  constructor(private logger: ApplicationLogger) {}

  use(req: Request, res: Response, next: NextFunction) {
    res.on('close', () => {
      const {
        headers: reqHeaders,
        ip,
        ips,
        method,
        originalUrl: url,
        params,
        query,
        body,
      } = res.req;
      const { statusCode, statusMessage } = res;
      const resHeaders = res.getHeaders();

      this.logger.log({
        method,
        url,
        params,
        query,
        body,
        statusCode,
        statusMessage,
        reqHeaders,
        resHeaders,
        ip,
        ips,
      });
    });

    next();
  }
}
