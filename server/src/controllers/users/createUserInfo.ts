import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import * as dotenv from 'dotenv'
import bcrypt from 'bcrypt'

import { accessTokenGenerator } from '../../jwt/GenerateAccessToken'
import { refreshTokenGenerator } from '../../jwt/GenerateRefreshToken'

import { User } from '../../entity/User'

dotenv.config()

export const createUserInfo = async (req: Request, res: Response) => {
  console.log('회원 정보 생성 🕹')

  const { email, password, name, nickname, mobile, avatarRef } = req.body

  // 이미 등록된 이메일을 가진 유저 정보
  const user = await getRepository(User).findOne({ where: { email } })

  if (user && user.signupType === email) {
    return res.status(409).json({ message: 'email already in use' })
  }

  // 이미 등록된 전화번호를 가진 유저 정보
  const duplicateMobile = await getRepository(User).findOne({
    where: { nickname: nickname },
  })

  if (duplicateMobile) {
    return res.status(409).json({ message: 'mobile already in use' })
  }

  // 이미 등록된 닉네임을 가진 유저 정보
  const duplicateNickname = await getRepository(User).findOne({
    where: { nickname: nickname },
  })

  if (duplicateNickname) {
    return res.status(409).json({ message: 'nickname already in use' })
  }

  // 비밀번호 해쉬
  const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS)).catch((err) => console.log(err))

  // 이메일, 닉네임, 모바일 충돌이 없으면
  // 바디에 들어온 정보를 바탕으로 users에 저장
  const newUserInfo = await User.create({
    email,
    password: hashedPassword as string,
    name,
    nickname,
    mobile,
    avatarRef,
    signupType: 'email',
  })
  const savedUserInfo = await newUserInfo.save()

  //! 이메일 인증은 따로 api 만들어야함

  // 토큰 발급 후 전송
  const accesToken = await accessTokenGenerator(savedUserInfo.id, email)
  const refreshToken = await refreshTokenGenerator(savedUserInfo.id, email)

  res
    .cookie('refeshToken', refreshToken, {
      // 유효기간: 일주일?
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })
    .status(201)
    .json({ userId: savedUserInfo.id, accesToken, loginType: savedUserInfo.signupType, message: '회원가입 성공' })
}
