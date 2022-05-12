//! 로그아웃은 일단 쿠키삭제만
//! 그러나 이후 DB에 토큰 정보를 저장하여, 로그아웃해서 만료댔던 토큰 전송이 아닌지 검증 해야함
import { Request, Response } from 'express'

export const logout = async (req: Request, res: Response) => {
  console.log('로그아웃 🕹')

  res
    .status(200)
    .cookie('refreshToken', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })
    .json({ message: '로그아웃 완료' })
}
