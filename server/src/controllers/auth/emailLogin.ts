import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import { accessTokenGenerator } from '../../jwt/GenerateAccessToken'
import { refreshTokenGenerator } from '../../jwt/GenerateRefreshToken'

import { User } from '../../entity/User'

export const emailLogin = async (req: Request, res: Response) => {
  console.log('email 로그인 🕹')

  // 입력한 이메일 계정이 존재하하는지 확인
  const { email, password } = req.body
  const userInfo = await User.findOne({ email })

  // 이메일 계정이 없다면
  if (!userInfo) {
    return res.status(404).json({ message: '입력한 이메일 주소로 등록한 회원 정보가 없습니다. 회원가입 해주세요.' })
  }

  // 카카오 계정인 경우 email 로그인 차단
  if (userInfo.signupType === 'kakao') {
    return res
      .status(400)
      .json({ message: '카카오 연동 회원입니다. 카카오 소셜 로그인 또는 이메일 회원 가입을 진행해주세요.' })
  }

  // 비밀번호 검증
  try {
    const verifiedPassword = bcrypt.compare(password, userInfo.password)
  } catch (err: any) {
    console.log(err)
    return res.status(400).json({ message: err.message })
  }

  // 토큰 생성 후 전송
  const accessToken = await accessTokenGenerator(userInfo.id, userInfo.email)
  const refreshToken = await refreshTokenGenerator(userInfo.id, userInfo.email)

  res
    .status(200)
    .cookie('refreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })
    .json({ id: userInfo.id, accessToken, message: 'email 로그인 성공' })
}
