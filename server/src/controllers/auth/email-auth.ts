
import { Request, Response, NextFunction} from 'express';
import nodemailer from 'nodemailer';
import ejs from 'ejs';
import dotenv from 'dotenv';
import { User } from '../../entity/User';

dotenv.config();

// const memoAuthCode: string[] = []; //? 코드 중복 검사용

const authEmail = async (req:Request, res:Response, next:NextFunction) => {
  const { email } = req.body;
  const vaildCheck = email.indexOf('@');
  if (!email || email.length === 0 || vaildCheck === -1) {
    return res.status(400).json({message: 'Need accurate informations'})
  };

  //? 랜덤 코드 생성 겹칠일이 없을거란 생각. 만약 겹친다면 memoization으로 검사.
  // const issueAuthCode = (): string => {
  //   const temp: string = String(Math.random().toString(36).slice(2));
  //   const valid: number = Number(memoAuthCode.indexOf(temp));
  //   if (valid === -1) {
  //     memoAuthCode.push(temp);
  //     setTimeout(() => {
  //       memoAuthCode.shift();
  //     }, 60 * 60 * 1000);
  //     return temp;
  //   } else {
  //     return issueAuthCode();
  //   }
  // }

  let authCode:string = String(Math.random().toString(36).slice(2)) //? 랜덤 문자열 생성
  let action = '';
  let endPoint = '';
  let display = '';
  //? 만약 이미 존재하는 유저라면 로그인 폼으로 아니라면 회원가입 폼으로.
  const isUser = await Users.findOne({where:{ email }}).then(async (data) => {
    if (data) {
      //? 존재하지만 회원가입이 완료 되지 않았을 떄 status code는 0
      const status = Number(data.getDataValue('status'));
      //? 0일 때 다시한번 authCode를 갱신하여 회원가입 이메일을 보내고
      if (status === 0) {
        await Users.update({ authCode }, {where: { email }});
        //? 1시간이 지나도 회원가입 완료하지 않을 시 자동으로 데이터베이스 파괴
        setTimeout(async () => {
          await Users.findOne({where: { authCode }}).then( async (data) => {
            if (data) {
              const status = Number(data.getDataValue('status'));
              const email = String(data.getDataValue('email'));
              if (status === 0) {
                await Users.destroy({where: { email }});
              }
            }
          });
        }, 60 * 60 * 1000);
        action = '회원가입';
        endPoint = 'signup';
        return false;
      } else {
        await Users.update({ authCode }, {where: {email}});
        //? 로그인 으로 진행할 때 1시간 후 자동으로 authCode -> null.
        setTimeout(async () => {
          await Users.update({ authCode: null }, {where: { email }})
        }, 60 * 60 * 1000);
        action = '로그인';
        endPoint = 'login';
        display= 'none'
        return true;
      }
    } else {
      //? 데이터베이스에 정보가 없을 때
      const nickName:string = '시인' + Math.random().toString(36).slice(2);
      //? 회원가입 전 임시 데이터 베이스를 만들어 준다. 
      //? 만약 링크를 누른다면 signUp 메소드에서 status -> 1(회원).
      await Users.create({ email, nickName, introduction: null, authCode, status: 0, avatarUrl: null });
      //? 1시간 안에 완료하지 않을 시 데이터베이스 자체를 파괴.
      setTimeout(async () => {
        await Users.findOne({where: { authCode }}).then( async (data) => {
          if (data) {
            const status = Number(data.getDataValue('status'));
            const email = String(data.getDataValue('email'));
            if (status === 0) {
              await Users.destroy({where: { email }});
            }
          }
        });
      }, 60 * 60 * 1000);
      action = '회원가입';
      endPoint = 'signup';
      return false;
    }
  });
  