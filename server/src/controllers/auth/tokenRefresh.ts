import { Request, Response } from 'express'
import jwt, { VerifyErrors } from 'jsonwebtoken'
import { accessTokenGenerator } from '../../jwt/GenerateAccessToken'
import axios from 'axios'
import * as dotenv from 'dotenv'
import { refreshTokenGenerator } from '../../jwt/GenerateRefreshToken'
dotenv.config()

export const tokenRefresh = async (req: Request, res: Response) => {
  // 새로운 access token 발급하기
  console.log('토큰 갱신 🔒')

  const { refreshToken } = req.cookies
  const accessToken = req.headers.authorization?.split('Bearer ')[1]
  const loginType = req.headers.logintype as string

  console.log('리프레시 토큰--->', refreshToken, '액세스 토큰 ---->', accessToken)

  // 쿠키에 리프레시 토큰이 없는 경우
  if (!refreshToken) {
    return res.status(400).json({ message: '쿠키에 refreshToken이 없습니다.' })
  }
  // 헤더에 accessToken이 없는 경우

  try {
    if (loginType === 'kakao') {
      // 로그인 방식 - google
      // refresh token을 이용하여 새로운 access token을 발급받음

      const kakaoTokenRefeshResp = await axios({
        method: 'post',
        url: `https://kauth.kakao.com/oauth/token?grant_type=refresh_token&client_id=${process.env.KAKAO_REST_API_KEY}&refresh_token=${refreshToken}`,
      })
      const { access_token, expires_in } = kakaoTokenRefeshResp.data

      return res.status(200).json({ accessToken: access_token, message: '카카오 토큰 갱신 완료, 유효기간: 7199초' })
    }

    interface TokenInterface {
      userId: number
      email: string
      iat: number
      exp: number
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET as string) as TokenInterface

    // 만약 토큰 검증이 안되면.
    if (!decoded) {
      res.status(401).json({ message: '리프레시 토큰이 유효하지 않습니다.' })
    }

    const { userId, email } = decoded
    const accessToken = await accessTokenGenerator(userId, email)
    const refresh_token = await refreshTokenGenerator(userId, email)

    res
      .status(200)
      .cookie('refreshToken', refresh_token, {
        maxAge: 1000 * 60 * 60 * 24 * 30, // 한 달
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      .json({ accessToken, message: '퍼피니티 자체 토큰 갱신 완료, 유효 시간 : 15초' })
    // res.status(200).json({ accessToken, message: '퍼피니티 자체 토큰 갱신 완료, 유효 시간 : 15초' })
  } catch (err) {
    console.log(err)
    res.status(401).json({ message: err })
  }
}

// if (!refreshToken || !accessToken){
//   return res.status(400).json({
//     message: 'invalid token error',
//   })
// }
