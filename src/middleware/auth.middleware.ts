// eslint-disable-next-line prettier/prettier
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRequest } from 'src/user/interface/userRequest.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    if (!req.session.key) {
      throw new UnauthorizedException('Session Key does not exist');
    }
    req.session.key = req.session.key;
    next();
  }
}
