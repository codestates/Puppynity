import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import { User } from '../../entity/User'

export const updateUserInfo = async (req: Request, res: Response) => {
  console.log('내 회원 정보 수정 🕹')

  //! 정보 수정 전 이메일 본인 인증 필요

  //! 추후 업로드 구현시 수정 필요
  const { password, name, nickname, mobile, avatarRef } = req.body

  // 바디에 아무 값도 없을 경우 early return
  if (!password && !name && !nickname && !mobile && avatarRef) {
    return res.sendStatus(200)
  }

  const paramId = Number(req.params.userId)

  // 본인 계정 삭제 요청이 아니면
  if (paramId !== req.userId) {
    res.status(403).json({ message: '다른 유저의 정보는 수정할 수 없습니다.' })
  }

  const userInfo = await User.findOne({
    where: { id: paramId },
  })

  if (userInfo === undefined) {
    // 요청한 회원 정보가 없는 경우 404
    console.log('회원 상세 조회할 유저 데이터가 없음!')
    return res.status(404).json({ message: '유저 정보가 없습니다.' })
  }

  if (password) {
    // 비밀번호 해쉬
    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS)).catch((err) => console.log(err))
    userInfo.password = hashedPassword as string
  }
  if (name) {
    userInfo.name = name
  }
  if (nickname) {
    userInfo.nickname = nickname
  }
  if (mobile) {
    userInfo.mobile = mobile
  }
  if (avatarRef || avatarRef === null) {
    userInfo.avatarRef = avatarRef
  }

  const savedUserInfo = await userInfo.save()
  savedUserInfo.password = ''

  res.status(200).json({ userInfo: savedUserInfo, message: 'ok' })
}
