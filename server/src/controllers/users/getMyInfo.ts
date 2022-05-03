import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import bcrypt from 'bcrypt';

import { accessTokenGenerator } from '../../jwt/GenerateAccessToken';
import { refreshTokenGenerator } from '../../jwt/GenerateRefreshToken';
import { User } from '../../entity/User';

dotenv.config();

module.exports = async (req: Request, res: Response) => {
  console.log('내 회원 정보 확인 🕹');

  // 이전 미들웨어에서 토큰 해독후 검증 걸친후 
  // 토큰이 만료되었거나, 없는 경우 401 
  // --- 
  // req.id에 저장된 값을 이용하여 유저정보 find 
  // 토큰이 만료되었거나, 해독되지 않는 경우 401 
  // 요청한 회원 정보가 없는 경우 404 
  //

  const { email, password, name, nickname, mobile } = req.body;
  console.log('서버에서 받은 회원 정보: ', email, password, name, nickname, mobile);

  // 이미 등록된 이메일을 가진 유저 정보
  const user = await getRepository(User).findOne({ where: { email } });

  if (user) {
    return res.status(409).json({ message: 'email already in use' });
  }

  // 이미 등록된 전화번호를 가진 유저 정보
  const duplicateMobile = await getRepository(User).findOne({
    where: { nickname: nickname },
  });

  if (duplicateMobile) {
    return res.status(409).json({ message: 'mobile already in use' });
  }

  // 이미 등록된 닉네임을 가진 유저 정보
  const duplicateNickname = await getRepository(User).findOne({
    where: { nickname: nickname },
  });

  if (duplicateNickname) {
    return res.status(409).json({ message: 'nickname already in use' });
  }

  // 비밀번호 해쉬
  const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS)).catch((err) => console.log(err));
  // console.log('hashed password 🗄: ', hashedPassword);

  // 이메일, 닉네임, 모바일 충돌이 없으면
  // 바디에 들어온 정보를 바탕으로 users에 저장
  const newUserInfo = await User.create({
    email,
    password: hashedPassword as string,
    name,
    nickname,
    mobile,
  });
  const savedUserInfo = await newUserInfo.save();

  // 이메일 인증 진행
  // 토큰 발급 후 전송

  res.status(200).json({ accessToken: 'accessToken', message: '일단 ok' });
};
