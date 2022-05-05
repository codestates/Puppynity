import { Request, Response } from 'express';
import { User } from '../../entity/User';

export const checkDuplicateEmails = async (req: Request, res: Response) => {
  console.log('이메일 중복 체크 🕹');
  const { email } = req.body;

  try {
    const userInfo = await User.findOne({ email });

    if (!userInfo) {
      return res.status(200).json({ message: '사용 가능한 이메일입니다.' });
    }
    res.status(200).json({ message: '이미 회원가입한 이메일입니다.' });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
