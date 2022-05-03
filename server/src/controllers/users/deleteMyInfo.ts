import { Request, Response } from 'express';
import { User } from '../../entity/User';

export const deleteMyInfo = async (req: Request, res: Response) => {
  console.log('회원 정보 삭제 🕹');

  // req.id에 저장된 값을 이용하여 유저정보 find
  const userId = req.userId;
  const userInfo = await User.findOne({
    where: { id: userId },
  });

  if (userInfo === undefined) {
    // 요청한 회원 정보가 없는 경우 404
    console.log('회원 상세 조회할 유저 데이터가 없음!');
    return res.status(404).json({ message: '유저 정보가 없습니다.' });
  }

  const deletedUserInfo = await User.remove(userInfo);
  res.status(200).json({ message: '회원 정보가 삭제되었습니다.' });
};
