import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const User = require('../entity/User');

require('dotenv').config();

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
  console.log('인증 미들웨어 🔒');
  // 토큰 정보 없을 때
  if (req.headers.authorization === undefined) {
    return res.status(401).json({ message: '토큰 정보가 없습니다.' });
  }

  const accessToken = req.headers.authorization.split('Bearer ')[1];

  // decoded object interface
  interface TokenInterface {
    userId: number;
    email: string;
    iat: number;
    exp: number;
  }
  try {
    const decoded = (await jwt.verify(accessToken, process.env.ACCESS_SECRET as string)) as TokenInterface;
    req.userId = decoded.userId;
    req.userEmail = decoded.email;
    console.log('인증 성공!');
    next();
  } catch (err: any) {
    console.log(err);
    res.status(401).json({ message: err.message });
  }
};
