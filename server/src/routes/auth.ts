import express from 'express';
import { body, CustomValidator } from 'express-validator';

import { validation } from '../middlewares/valdation';
import { authentication } from '../middlewares/authentcation';

import { emailLogin } from '../controllers/auth/emailLogin';
import { logout } from '../controllers/auth/logout';
import { sendMail } from '../controllers/auth/email-auth';

const authRouter = express.Router();

//! 이름, 닉네임, 모바일 valdation 강화 필요
// 비밀번호 validator
const isValidPassword: CustomValidator = (value: string) => {
  const pwValidator = (pw: string): boolean => {
    const pwRegExp = RegExp('^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)-_=+]).{8,20}$');
    return pwRegExp.test(pw);
  };

  if (pwValidator(value) === false) {
    return Promise.reject(
      '비밀번호는 영문, 숫자, 특수기호를 각각 1개이상 포함하고, 최소 8자 이상, 최대 20자 이하 여야 합니다.',
    );
  }
  return Promise.resolve(value);
};

// 로그인
authRouter.post(
  '/login',
  [
    body('email')
      .exists()
      .withMessage('body에 email field가 없음!')
      .notEmpty()
      .withMessage('email이 입력 되지 않았습니다.')
      .trim()
      .isEmail()
      .withMessage('올바른 이메일 형식이 아닙니다.'),
    body('password')
      .exists()
      .withMessage('body에 password field가 없음!')
      .notEmpty()
      .withMessage('password가 입력 되지 않았습니다.')
      .trim()
      .custom(isValidPassword),
  ],
  validation,
  emailLogin,
);
authRouter.post('/email-auth',sendMail);
// 로그아웃
authRouter.post('/logout', logout);
// 회원 정보 변경
// authRouter.patch(
//   '/',
//   authentication,
//   [
//     body('password').optional().custom(isValidPassword),
//     body('name').optional().isLength({ min: 2 }).withMessage('이름은 최소 2자 이상 입력해야 합니다.'),
//     body('nickname')
//       .optional()
//       .isLength({ min: 3, max: 12 })
//       .withMessage('닉네임은 최소 3자 이상 12자 이하 여야 합니다.'),
//     body('mobile').optional().isLength({ min: 11 }).withMessage('핸드폰 번호는 최소 11자 이상 이어야 합니다.'),
//   ],
//   validation,
//   editMyIinfo,
// );
module.exports = authRouter;
