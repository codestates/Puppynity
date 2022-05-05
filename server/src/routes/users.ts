import express, { NextFunction, Request, Response } from 'express';
import { body, CustomValidator } from 'express-validator';

import { validation } from '../middlewares/valdation';
import { authentication } from '../middlewares/authentcation';

import { createUserInfo } from '../controllers/users/createUserInfo';
import { getMyIinfo } from '../controllers/users/getMyInfo';
import { editMyIinfo } from '../controllers/users/editMyInfo';
import { deleteMyInfo } from '../controllers/users/deleteMyInfo';

const userRouter = express.Router();

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

// 회원 상세 정보 확인
userRouter.get('/', authentication, getMyIinfo);
// 회원 정보 생성(회원가입)
userRouter.post(
  '/',
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
    body('name')
      .exists()
      .withMessage('body에 name field가 없음!')
      .notEmpty()
      .withMessage('name이 입력 되지 않았습니다.')
      .trim()
      .isLength({ min: 2 })
      .withMessage('이름은 최소 2자 이상 입력해야 합니다.'),
    body('nickname')
      .exists()
      .withMessage('body에 nickname field가 없음!')
      .notEmpty()
      .withMessage('nickname이 입력 되지 않았습니다.')
      .trim()
      .isLength({ min: 3, max: 12 })
      .withMessage('닉네임은 최소 3자 이상 12자 이하 여야 합니다.'),
    body('mobile')
      .exists()
      .withMessage('body에 mobile field가 없음!')
      .notEmpty()
      .withMessage('mobile이 입력 되지 않았습니다.')
      .trim()
      .isLength({ min: 11 })
      .withMessage('핸드폰 번호는 최소 11자 이상 이어야 합니다.'),
  ],
  validation,
  createUserInfo,
);
// 회원 정보 변경
userRouter.patch(
  '/',
  authentication,
  [
    body('password').optional().custom(isValidPassword),
    body('name').optional().isLength({ min: 2 }).withMessage('이름은 최소 2자 이상 입력해야 합니다.'),
    body('nickname')
      .optional()
      .isLength({ min: 3, max: 12 })
      .withMessage('닉네임은 최소 3자 이상 12자 이하 여야 합니다.'),
    body('mobile').optional().isLength({ min: 11 }).withMessage('핸드폰 번호는 최소 11자 이상 이어야 합니다.'),
  ],
  validation,
  editMyIinfo,
);
// 회원 탈퇴
userRouter.delete('/', authentication, deleteMyInfo);

module.exports = userRouter;
