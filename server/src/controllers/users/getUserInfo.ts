import { Request, Response } from 'express'
import { User } from '../../entity/User'

export const getUserIinfo = async (req: Request, res: Response) => {
  console.log('내 회원 정보 확인 🕹')

  // req.id에 저장된 값을 이용하여 유저정보 find
  const userId = req.userId

  //! 추후 이미지 업로드 구현시 수정 필요
  const userInfo = await User.findOne({
    select: ['id', 'email', 'name', 'nickname', 'mobile', 'mobile', 'avatarRef', 'createdAt'],
    where: { id: userId },
  })

  // 요청한 회원 정보가 없는 경우 404
  if (userInfo === undefined) {
    console.log('회원 상세 조회할 유저 데이터가 없음!')
    return res.status(404).json({ message: '유저 정보가 없습니다.' })
  }

  res.status(200).json({ userInfo, message: 'ok' })
}
