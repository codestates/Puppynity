import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { User } from '../../entity/User';

export const editMyIinfo = async (req: Request, res: Response) => {
  console.log('내 회원 정보 수정 🕹');

  // req.id에 저장된 값을 이용하여 유저정보 find
  const userId = req.userId;
  const userInfo = await User.findOne({
    where: { id: userId },
  });

  // 바디에 아무 값도 없을 경우
  if (!req.body.password && !req.body.name && !req.body.nickname && !req.body.mobile) {
    return res.sendStatus(200);
  }

  if (userInfo === undefined) {
    // 요청한 회원 정보가 없는 경우 404
    console.log('회원 상세 조회할 유저 데이터가 없음!');
    return res.status(404).json({ message: '유저 정보가 없습니다.' });
  }

  //! 추후 업로드 구현시 수정 필요
  const { password, name, nickname, mobile } = req.body;

  if (password !== undefined) {
    // 비밀번호 해쉬
    const hashedPassword = await bcrypt
      .hash(password, Number(process.env.SALT_ROUNDS))
      .catch((err) => console.log(err));
    userInfo.password = hashedPassword as string;
  }
  if (name !== undefined) {
    userInfo.name = name;
  }
  if (nickname !== undefined) {
    userInfo.nickname = nickname;
  }
  if (mobile !== undefined) {
    userInfo.mobile = mobile;
  }

  const savedUserInfo = await userInfo.save();
  const updatedUserInfo = await User.findOne({
    select: ['id', 'email', 'name', 'nickname', 'mobile', 'mobile', 'avatarRef', 'createdAt'],
    where: { id: userId },
  });

  res.status(200).json({ updatedUserInfo, message: 'ok' });
};
