// import { NextFunction, Request, Response } from "express";
// import jwt from 'jsonwebtoken';

// const User = require('../models/user');
// require('dotenv').config();

// module.exports = async (req: Request, res: Response, next: NextFunction) => {
//   console.log('인증 미들웨어 🔒');

//   if (req.headers.authorization) {
//     const accessToken = req.headers.authorization.split('Bearer ')[1];

//   if (!token) {
//     return res.status(401).json({ message: '유저가 아닙니다.' });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
//     if (error) {
//       return res.status(401).json({ message: '인증되지 않은 토큰입니다.' });
//     }
//     const user = await User.findByPk(decoded.id);
//     if (!user) {
//       return res.status(401).json({ message: '인증되지 않았습니다.' });
//     }
//     req.userId = user.id; // req.customData
//     // console.log(req.userId)
//     req.token = token;
//     next();
//   });
// };
