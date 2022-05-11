import { Request, Response } from 'express'
import axios from 'axios'

import { User } from '../../entity/User'

export const deleteUserInfo = async (req: Request, res: Response) => {
  console.log('회원 정보 삭제 🕹')
  console.log(req.params)
  const paramId = Number(req.params.userId)
  // req.id에 저장된 값을 이용하여 유저정보 find

  // 본인 계정 삭제 요청이 아니면
  if (paramId !== req.userId) {
    res.status(403).json({ message: '다른 유저의 계정은 삭제할 수 없습니다.' })
  }

  const userInfo = await User.findOne({
    where: { id: paramId },
  })

  if (!userInfo) {
    // 요청한 회원 정보가 없는 경우 404
    console.log('회원 상세 조회할 유저 데이터가 없음!')
    return res.status(404).json({ message: '유저 정보가 없습니다.' })
  }

  const { signupType } = userInfo

  if (signupType === 'email') {
    //! delete 전 본인인증 api -> 이메일 인증 절차 필요
    const deletedUserInfo = await User.remove(userInfo)
    return res.status(200).json({ message: '회원 정보가 삭제되었습니다.' })
  }

  try {
    const accessToken = req.headers.authorization?.split(' ')[1]
    const kakaoInfoApiResp = await axios({
      method: 'post',
      url: 'https://kapi.kakao.com/v1/user/unlink',
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    if (!kakaoInfoApiResp) {
      return res.status(401).json({ message: '카카오 연결 해제 요청을 완료할 수 없습니다.' })
    }
    console.log(kakaoInfoApiResp)
    const deletedUserInfo = await User.remove(userInfo)
    return res.status(200).json({ message: '회원 정보가 삭제되었습니다.' })
  } catch (err) {
    res.status(500).json({ message: err })
  }
}
