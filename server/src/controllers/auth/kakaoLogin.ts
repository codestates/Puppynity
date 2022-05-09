import { Request, Response } from 'express'
import axios from 'axios'

import { User } from '../../entity/User'

import dotenv from 'dotenv'
dotenv.config()

export const kakaoLogin = async (req: Request, res: Response) => {
  console.log('kako 로그인 🕹')
  const { authorizationCode } = req.body
  try {
    // 카카오에 토큰 발급 요청
    const kakaoTokenResp = await axios.post(
      `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&code=${authorizationCode}`,
    )
    const { access_token, refresh_token, expires_in, scope, refresh_token_expires_in } = kakaoTokenResp.data
    console.log(access_token)

    // 카카오에 유저 정보 조회
    const kakaoInfoApiResp = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: 'application/x-www-form-urlencoded;charset=utf-8',
      },
    })
    // 필수 동의 항목 체크시
    const { id: kakaoId } = kakaoInfoApiResp.data
    //! 사진 업로드 구현시 db에 프로필 사진도 업로드 되도록 해야함
    const { nickname, profile_image, thumbnail_image } = kakaoInfoApiResp.data.properties

    // DB에 이미 등록된 kakaoId가 있는지 확인
    const userInfo = await User.findOne({ kakaoId })

    // 이미 카카오 연동된 회원인 경우
    if (userInfo) {
      return res.status(200).json({
        id: userInfo.id,
        nickname: userInfo.nickname,
        accessToken: access_token,
        loginType: userInfo.signupType,
        message: '카카오 로그인 성공',
      })
    }

    // 회원 정보 저장
    const createdUser = new User()
    createdUser.nickname = nickname
    createdUser.kakaoId = kakaoId
    createdUser.signupType = 'kakao'
    createdUser.save()

    res
      .cookie('refreshToken', refresh_token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      .status(201)
      .json({
        id: createdUser.id,
        accessToken: access_token,
        nickname: createdUser.nickname,
        loginType: createdUser.signupType,
        message: '카카오 회원 정보 생성 및 로그인 성공',
      })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err })
  }
}
