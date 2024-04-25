import { Response, NextFunction } from 'express';

import { verifyAccessToken } from 'helpers/jwt';
import RequestWithUser from 'utils/rest/request';
import JWTPayload from 'utils/types';
import { HttpException } from 'exceptions';
import { logger } from 'utils/logger';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const authHeader = req.headers?.authorization;

  const bearerToken = authHeader?.split(' ');
  if (!authHeader) {
    return next(new HttpException(401, 'Unauthorized', 'UNAUTHORIZED'));
  }

  if (!bearerToken || bearerToken[0] !== 'Bearer') {
    return next(new HttpException(401, 'Not a Bearer token', 'BEARER_TOKEN'));
  }

  const token = bearerToken[1];

  try {
    if (!token) {
      return next(new HttpException(403, 'Token is invalid', 'INVALID_TOKEN'));
    }
    const data: JWTPayload = verifyAccessToken(token);

    req.user = data;
    return next();
  } catch (err) {
    logger.error(`Error in authMiddleware: ${err}`);
    next(new HttpException(err?.status || 401, err?.message || err, err?.errorCode || 'Unauthorized'));
  }
};

const authorizationMiddleware = (allowedRoles: string[]) => {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req?.user;
    const condition = !user || !allowedRoles.includes(user.role);

    if (condition) {
      return next(new HttpException(403, 'Unauthorized', 'NOT_AUTHORIZED'));
    } else {
      next();
    }
  };
};

export { authMiddleware, authorizationMiddleware };
