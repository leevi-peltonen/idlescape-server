import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction ) {
        const { method, originalUrl } = req;
        const message = `[${new Date().toISOString()}] ${method} ${originalUrl}`;
        console.log(message);
    
        next();
      }
}
