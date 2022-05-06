
import { Request, Response, NextFunction} from 'express';
import nodemailer from 'nodemailer';
import { resolve } from 'path';
import { createTextChangeRange } from 'typescript';

export const sendMail=async(req:Request,res:Response)=>{
  const {email}=req.body;

  const transPort=nodemailer.createTransport({
  service:'gmail',
  host:'smtp.gmail.com',
  port:587,
  secure:false,
  auth:{
    user:process.env.NODEMAILER_USER,
    pass:process.env.NODEMAILER_PASS
  }
});

const generateRandom = function(min:number,max:number){
  const randomNumber = Math.floor(Math.random()*(max-min+1))+min;
  return randomNumber;
}
const number=generateRandom(111111,999999);

const mailOptions={
  from:'puppynity',
  to:`${email}`,
  subject:'인증메일 ',
  text:'인증코드입니다'+number
};
transPort.sendMail(mailOptions,(err)=>{
  if(err){
    return res.status(500)
  }
  else res.status(200).json({message:'ok',data:{number}});
}
)}