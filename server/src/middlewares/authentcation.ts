import axios from 'axios'
import { error } from 'console'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { User } from '../entity/User'

require('dotenv').config()

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
  console.log('인증 미들웨어 🔒')

  // 토큰 정보 없을 때 early return
  if (req.headers.authorization === undefined) {
    return res.status(401).json({ message: '토큰 정보가 없습니다.' })
  }

  const { logintype } = req.headers
  const accessToken = req.headers.authorization.split(' ')[1]
  console.log(accessToken)
  // 이메일 회원인 경우
  if (logintype === 'email') {
    // decoded object interface
    interface TokenInterface {
      userId: number
      email: string
      iat: number
      exp: number
    }
    try {
      const decoded = (await jwt.verify(accessToken, process.env.ACCESS_SECRET as string)) as TokenInterface
      req.userId = decoded.userId
      req.userEmail = decoded.email
      console.log('인증 성공!')
      next()
    } catch (err: any) {
      console.log(err)
      res.status(401).json({ message: err.message })
    }
  }

  //! 추후 소셜 로그인 계정을 관리할 때는 효율적인 방법 고민해야함
  if (logintype === 'kakao') {
    // 카카오 회원인 경우
    try {
      const kakaoInfoApiResp = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/x-www-form-urlencoded;charset=utf-8',
        },
      })
      const { id: kakaoId } = kakaoInfoApiResp?.data
      console.log(kakaoId)
      const userInfo = await User.findOne({ kakaoId })

      if (!userInfo) {
        return res.status(404).json({ message: '카카오 연동 회원 정보가 없습니다.' })
      }
      req.userId = userInfo.id
      console.log('카카오 계정 인증 성공')
      next()
    } catch (err) {
      res.status(500).json({ message: err })
    }
  }
}
