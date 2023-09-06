import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers.authorization;
    if (!auth) {
      throw new HttpException('User is not authorized', HttpStatus.FORBIDDEN);
    }
    if (auth === 'admin') {
      next();
    } else {
      throw new HttpException('Invalid Token', HttpStatus.BAD_REQUEST);
    }
  }
}
